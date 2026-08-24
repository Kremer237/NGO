-- Spec section 67: mandatory logging of critical administrative actions
-- (login, admin creation, permission changes, budget/statistic edits,
-- report publication, receipt issuance/cancellation, financial config
-- changes). `admin_user_id` intentionally has no foreign key yet — the
-- admin/auth user table doesn't exist until an auth provider is chosen
-- (spec section 65); add the constraint once it does.

create table audit_log (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid,
  action text not null,
  resource text not null,
  resource_id text,
  occurred_at timestamptz not null default now(),
  ip_address inet,
  metadata jsonb
);

create index audit_log_admin_user_id_idx on audit_log (admin_user_id);
create index audit_log_resource_idx on audit_log (resource, resource_id);
create index audit_log_occurred_at_idx on audit_log (occurred_at);
