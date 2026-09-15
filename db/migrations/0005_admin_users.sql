-- Admin accounts and RBAC roles per spec section 65:
-- Super Admin | Admin | Content Editor | Finance | Marketing.
-- No self-service signup — rows are created only via scripts/create-admin.ts
-- (bootstrap) or by a Super Admin through /admin/users.

create table admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  name text not null,
  role text not null check (role in ('super_admin', 'admin', 'content_editor', 'finance', 'marketing')),
  active boolean not null default true,
  -- TOTP secret for MFA (spec section 65/68). Column exists so the schema
  -- doesn't need a breaking migration later, but enrollment/verification is
  -- not implemented yet — see ARCHITECTURE.md. Every login currently
  -- succeeds on password alone.
  mfa_secret text,
  created_at timestamptz not null default now(),
  last_login_at timestamptz
);

comment on table admin_users is
  'Internal NGO personnel accounts. Never store plaintext passwords — password_hash is bcrypt.';

create index admin_users_role_idx on admin_users (role);
