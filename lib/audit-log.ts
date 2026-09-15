import { getPool } from "./db";

// Spec section 67: log critical admin actions. Best-effort — a logging
// failure should never block the action itself, so callers fire-and-forget
// this rather than awaiting it inline with request handling.
export async function logAdminAction(entry: {
  adminUserId: string | null;
  action: string;
  resource: string;
  resourceId?: string | null;
  ip?: string | null;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  const pool = getPool();
  if (!pool) return;
  try {
    await pool.query(
      `insert into audit_log (admin_user_id, action, resource, resource_id, ip_address, metadata)
       values ($1, $2, $3, $4, $5, $6)`,
      [
        entry.adminUserId,
        entry.action,
        entry.resource,
        entry.resourceId ?? null,
        entry.ip ?? null,
        entry.metadata ? JSON.stringify(entry.metadata) : null,
      ]
    );
  } catch (err) {
    console.error("audit log write failed", err);
  }
}
