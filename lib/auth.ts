import { SignJWT, jwtVerify } from "jose";

// Roles per spec section 65. Order matters for nothing except readability —
// permissions are looked up explicitly below, never inferred from position.
export type AdminRole = "super_admin" | "admin" | "content_editor" | "finance" | "marketing";

export const ADMIN_ROLES: AdminRole[] = ["super_admin", "admin", "content_editor", "finance", "marketing"];

export interface SessionPayload {
  sub: string; // admin_users.id
  email: string;
  name: string;
  role: AdminRole;
}

export const SESSION_COOKIE = "naclb_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "AUTH_SECRET is not set. Generate one with `openssl rand -base64 32` and add it to your environment before using admin auth."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (
      typeof payload.sub === "string" &&
      typeof payload.email === "string" &&
      typeof payload.name === "string" &&
      typeof payload.role === "string" &&
      ADMIN_ROLES.includes(payload.role as AdminRole)
    ) {
      return { sub: payload.sub, email: payload.email, name: payload.name, role: payload.role as AdminRole };
    }
    return null;
  } catch {
    return null;
  }
}

// Coarse permission matrix matching what actually exists in the admin UI
// today (spec section 65 defines finance/marketing screens this codebase
// doesn't build yet — those roles can still log in and see the dashboard,
// they just have nothing role-specific to do until that content exists).
const PERMISSIONS = {
  manageUsers: ["super_admin"],
  manageStories: ["super_admin", "admin", "content_editor"],
} as const satisfies Record<string, AdminRole[]>;

export function hasPermission(role: AdminRole, permission: keyof typeof PERMISSIONS): boolean {
  return (PERMISSIONS[permission] as readonly AdminRole[]).includes(role);
}
