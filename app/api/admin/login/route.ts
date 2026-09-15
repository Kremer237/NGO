import { NextResponse } from "next/server";
import { findAdminByEmail, touchLastLogin } from "@/lib/admin-users-repo";
import { verifyPassword } from "@/lib/password";
import { signSession, SESSION_COOKIE } from "@/lib/auth";
import { logAdminAction } from "@/lib/audit-log";
import { isDatabaseConfigured } from "@/lib/db";

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  if (typeof body.email !== "string" || typeof body.password !== "string") {
    return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 400 });
  }

  const user = await findAdminByEmail(body.email);
  // Same generic response whether the email doesn't exist or the password
  // is wrong — never reveal which one to an unauthenticated caller.
  const genericFailure = () => NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });

  if (!user) return genericFailure();
  const valid = await verifyPassword(body.password, user.password_hash);
  if (!valid) return genericFailure();

  const token = await signSession({ sub: user.id, email: user.email, name: user.name, role: user.role });

  await touchLastLogin(user.id);
  await logAdminAction({
    adminUserId: user.id,
    action: "login",
    resource: "admin_users",
    resourceId: user.id,
    ip: request.headers.get("x-forwarded-for"),
  });

  const response = NextResponse.json({ ok: true, role: user.role });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
