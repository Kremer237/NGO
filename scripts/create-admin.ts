#!/usr/bin/env -S npx tsx
// Bootstraps an admin account. Admin accounts are never self-service
// signup (spec section 65) — this script (or an existing Super Admin
// using /admin/users) is the only way one gets created.
//
// Usage:
//   DATABASE_URL=postgres://... npm run create-admin -- \
//     --email jane@example.org --name "Jane Doe" --role super_admin
//
// Omit --password to have one generated and printed once — it is not
// stored anywhere else, so save it before closing the terminal.

import { randomBytes } from "node:crypto";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const ROLES = ["super_admin", "admin", "content_editor", "finance", "marketing"];

function parseArgs(argv: string[]) {
  const out: Record<string, string> = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const value = argv[i + 1];
      out[key] = value;
      i += 1;
    }
  }
  return out;
}

function generatePassword(): string {
  return randomBytes(18).toString("base64url");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.email || !args.name || !args.role) {
    console.error("Usage: npm run create-admin -- --email <email> --name <name> --role <role> [--password <password>]");
    console.error(`Roles: ${ROLES.join(", ")}`);
    process.exit(1);
  }

  if (!ROLES.includes(args.role)) {
    console.error(`Invalid role "${args.role}". Must be one of: ${ROLES.join(", ")}`);
    process.exit(1);
  }

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Example:");
    console.error('  DATABASE_URL="postgres://user:pass@host/db" npm run create-admin -- --email ...');
    process.exit(1);
  }

  const password = args.password ?? generatePassword();
  if (password.length < 12) {
    console.error("Password must be at least 12 characters.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    const existing = await pool.query("select 1 from admin_users where email = $1", [args.email.toLowerCase()]);
    if (existing.rows.length > 0) {
      console.error(`An account with email ${args.email} already exists.`);
      process.exit(1);
    }

    const { rows } = await pool.query(
      `insert into admin_users (email, password_hash, name, role)
       values ($1, $2, $3, $4)
       returning id, email, name, role`,
      [args.email.toLowerCase(), passwordHash, args.name, args.role]
    );

    console.log("Admin account created:");
    console.log(`  id:    ${rows[0].id}`);
    console.log(`  email: ${rows[0].email}`);
    console.log(`  name:  ${rows[0].name}`);
    console.log(`  role:  ${rows[0].role}`);
    if (!args.password) {
      console.log(`  password: ${password}  (generated — save this now, it is not stored anywhere else)`);
    }
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
