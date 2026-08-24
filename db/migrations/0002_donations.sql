-- Spec section 66. Field list matches the example `Donation` entity given in
-- the spec verbatim: id, donor_id, provider_payment_id, amount, currency,
-- frequency, campaign_id, project_id, allocation_type,
-- transaction_fee_contribution, eligible_receipt_amount, status,
-- donated_at, created_at.

create table donations (
  id uuid primary key default gen_random_uuid(),
  donor_id uuid not null references donors (id),
  provider_payment_id text unique, -- Stripe PaymentIntent/Charge id; null until payment confirmed
  amount numeric(12, 2) not null check (amount > 0),
  currency text not null check (currency in ('CAD', 'USD')),
  frequency text not null check (frequency in ('one-time', 'monthly')),
  campaign_id uuid references campaigns (id),
  project_id text, -- CMS project_id; null means "where the need is greatest"
  allocation_type text not null check (
    allocation_type in ('greatest-need', 'education', 'nutrition', 'healthcare', 'project')
  ),
  transaction_fee_contribution numeric(12, 2) not null default 0 check (transaction_fee_contribution >= 0),
  eligible_receipt_amount numeric(12, 2),
  status text not null check (status in ('pending', 'succeeded', 'failed', 'refunded', 'cancelled')),
  donated_at timestamptz,
  created_at timestamptz not null default now()
);

comment on column donations.eligible_receipt_amount is
  'The tax-receipt-eligible portion of the donation. Populate only per the finalized receipt-issuance procedure — see CONTENT-TODO.md.';

create index donations_donor_id_idx on donations (donor_id);
create index donations_project_id_idx on donations (project_id);
create index donations_status_idx on donations (status);

create table recurring_donations (
  id uuid primary key default gen_random_uuid(),
  donor_id uuid not null references donors (id),
  provider_subscription_id text unique,
  amount numeric(12, 2) not null check (amount > 0),
  currency text not null check (currency in ('CAD', 'USD')),
  allocation_type text not null check (
    allocation_type in ('greatest-need', 'education', 'nutrition', 'healthcare', 'project')
  ),
  project_id text,
  status text not null check (status in ('active', 'paused', 'cancelled', 'payment_failed')),
  started_at timestamptz not null default now(),
  cancelled_at timestamptz,
  created_at timestamptz not null default now()
);

create index recurring_donations_donor_id_idx on recurring_donations (donor_id);
