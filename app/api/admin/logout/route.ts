import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";
import { getSession } from "@/lib/session";
import { logAdminAction } from "@/lib/audit-log";

export async function POST() {
  const session = await getSession();
  if (session) {
    await logAdminAction({ adminUserId: session.sub, action: "logout", resource: "admin_users", resourceId: session.sub });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}
