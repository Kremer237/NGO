import { Pool } from "pg";

// A single pooled connection, reused across Route Handler invocations in
// the same server process. Returns null when DATABASE_URL isn't set so
// callers can fall back to static content instead of crashing — see
// lib/stories-repo.ts for the pattern this exists to support.
let pool: Pool | null = null;

export function getPool(): Pool | null {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return pool;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
