import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { ADMIN_ROLES, hasPermission, type AdminRole } from "@/lib/auth";
import { createAdminUser, emailExists } from "@/lib/admin-users-repo";
import { hashPassword } from "@/lib/password";
import { logAdminAction } from "@/lib/audit-log";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false, error: "unauthenticated" }, { status: 401 });
  if (!hasPermission(session.role, "manageUsers")) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  let body: { email?: unknown; name?: unknown; role?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (
    typeof body.email !== "string" ||
    typeof body.name !== "string" ||
    typeof body.role !== "string" ||
    typeof body.password !== "string" ||
    !body.email.trim() ||
    !body.name.trim() ||
    !ADMIN_ROLES.includes(body.role as AdminRole) ||
    body.password.length < 12
  ) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  if (await emailExists(body.email)) {
    return NextResponse.json({ ok: false, error: "email_taken" }, { status: 409 });
  }

  const passwordHash = await hashPassword(body.password);
  const user = await createAdminUser({
    email: body.email,
    name: body.name,
    role: body.role as AdminRole,
    passwordHash,
  });

  await logAdminAction({
    adminUserId: session.sub,
    action: "create",
    resource: "admin_users",
    resourceId: user.id,
    metadata: { role: user.role },
  });

  return NextResponse.json({ ok: true, user });
}
