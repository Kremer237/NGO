-- Spec section 66 (Donation Data Model). Postgres dialect, matching the
-- Supabase-managed Postgres recommendation in spec section 61.
--
-- Note on `project_id` columns throughout this schema: project content
-- (name, description, budget, status) lives in the CMS (see cms/schema/),
-- not in this database. Donation tables reference the CMS project_id as
-- plain text rather than a foreign key, so the two systems can evolve
-- independently — the CMS is the source of truth for what a project *is*,
-- this database is the source of truth for what was *donated* to it.

create extension if not exists pgcrypto;

create table donors (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  last_name text,
  country text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table donors is 'Individual or organizational donors. No payment card data is ever stored here — see payments.provider_payment_id.';

create table campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  starts_at timestamptz,
  ends_at timestamptz,
  goal_amount numeric(12, 2),
  currency text check (currency in ('CAD', 'USD')),
  created_at timestamptz not null default now()
);
