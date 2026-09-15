import { getPool } from "./db";
import type { AdminRole } from "./auth";

export interface AdminUserRecord {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: AdminRole;
  active: boolean;
  created_at: string;
  last_login_at: string | null;
}

export type AdminUserPublic = Omit<AdminUserRecord, "password_hash">;

function requirePool() {
  const pool = getPool();
  if (!pool) throw new Error("DATABASE_URL is not set — admin accounts require a database.");
  return pool;
}

export async function findAdminByEmail(email: string): Promise<AdminUserRecord | null> {
  const pool = requirePool();
  const { rows } = await pool.query<AdminUserRecord>(
    "select * from admin_users where email = $1 and active = true",
    [email.toLowerCase().trim()]
  );
  return rows[0] ?? null;
}

export async function touchLastLogin(id: string): Promise<void> {
  const pool = requirePool();
  await pool.query("update admin_users set last_login_at = now() where id = $1", [id]);
}

export async function createAdminUser(input: {
  email: string;
  passwordHash: string;
  name: string;
  role: AdminRole;
}): Promise<AdminUserPublic> {
  const pool = requirePool();
  const { rows } = await pool.query<AdminUserRecord>(
    `insert into admin_users (email, password_hash, name, role)
     values ($1, $2, $3, $4)
     returning id, email, password_hash, name, role, active, created_at, last_login_at`,
    [input.email.toLowerCase().trim(), input.passwordHash, input.name, input.role]
  );
  const { password_hash: _unused, ...publicRecord } = rows[0];
  void _unused;
  return publicRecord;
}

export async function listAdminUsers(): Promise<AdminUserPublic[]> {
  const pool = requirePool();
  const { rows } = await pool.query<AdminUserPublic>(
    "select id, email, name, role, active, created_at, last_login_at from admin_users order by created_at asc"
  );
  return rows;
}

export async function emailExists(email: string): Promise<boolean> {
  const pool = requirePool();
  const { rows } = await pool.query("select 1 from admin_users where email = $1", [email.toLowerCase().trim()]);
  return rows.length > 0;
}
