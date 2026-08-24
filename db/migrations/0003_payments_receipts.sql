-- Spec section 66 (Payment, Receipt) and section 39/68: "no complete card
-- data must transit through the application database" — this schema only
-- ever stores the payment provider's own reference id, never card details.

create table payments (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid references donations (id),
  recurring_donation_id uuid references recurring_donations (id),
  provider text not null default 'stripe',
  provider_payment_id text not null unique,
  amount numeric(12, 2) not null check (amount > 0),
  currency text not null check (currency in ('CAD', 'USD')),
  status text not null check (status in ('succeeded', 'failed', 'refunded')),
  failure_reason text,
  occurred_at timestamptz not null,
  created_at timestamptz not null default now(),
  constraint payments_belongs_to_a_donation check (
    donation_id is not null or recurring_donation_id is not null
  )
);

comment on table payments is
  'One row per provider charge event. A one-time donation has exactly one payment; a recurring donation gets one payment per billing cycle. Webhook handlers must be idempotent on provider_payment_id — spec section 98.';

create index payments_donation_id_idx on payments (donation_id);
create index payments_recurring_donation_id_idx on payments (recurring_donation_id);

-- Spec section 42/116: receipt numbering, cancellation and reissue policy
-- are not yet defined by the organization. This table is ready to receive
-- them but issues nothing until that policy exists — see CONTENT-TODO.md.
create table receipts (
  id uuid primary key default gen_random_uuid(),
  donor_id uuid not null references donors (id),
  donation_id uuid not null references donations (id),
  receipt_number text not null unique,
  eligible_amount numeric(12, 2) not null check (eligible_amount > 0),
  tax_year int not null,
  issued_at timestamptz not null default now(),
  pdf_url text,
  voided_at timestamptz,
  voided_reason text,
  created_at timestamptz not null default now()
);

create index receipts_donor_id_idx on receipts (donor_id);
create index receipts_tax_year_idx on receipts (tax_year);

create table impact_updates (
  id uuid primary key default gen_random_uuid(),
  project_id text not null,
  title text not null,
  body text,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create index impact_updates_project_id_idx on impact_updates (project_id);
