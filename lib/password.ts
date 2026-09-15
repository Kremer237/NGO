import bcrypt from "bcryptjs";

// Node-only (used by the login route and scripts/create-admin.ts) —
// never imported from proxy.ts, which runs on the edge and only needs
// verifySession() from lib/auth.ts.
const SALT_ROUNDS = 12;

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
