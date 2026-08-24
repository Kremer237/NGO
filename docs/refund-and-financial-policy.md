# Refund policy and internal financial policy (draft)

**Status: draft, pending board adoption. Nothing here is an actual reported figure — see the
"what this is not" note in section 3 before using any number from this document publicly.**

## 1. Refund policy (operational detail)

The public-facing summary is `content/legal.ts` → `donationTerms` (section 2) and
`app/[locale]/donation-terms`. This is the internal procedure behind it:

1. A refund request (donor email, or a card dispute notification from Stripe) is logged and
   reviewed within 5 business days.
2. Eligible cases: processing error, duplicate charge, fraudulent use of a payment method, or a
   clear administrative error — matching `donationTerms` section 2. A donor changing their mind
   about a completed gift is not, by itself, grounds for a refund (this preserves the gift's
   status as a genuine, irrevocable donation for receipting purposes).
3. Approved refunds are processed through Stripe back to the original payment method — never as
   cash or e-transfer, to keep the audit trail intact (`payments.status = 'refunded'`,
   `db/migrations/0003_payments_receipts.sql`).
4. If a receipt was already issued, it is voided per `docs/receipt-issuance-procedure.md` section 4
   **before** the refund is marked complete, not after.
5. Every refund is logged in `audit_log` (`db/migrations/0004_audit_log.sql`) with the approving
   admin's identity — refunds should require a second person's approval once more than one admin
   exists (four-eyes principle), not be self-approved by whoever processes it.

## 2. Expense classification methodology (Programs / Administration / Fundraising)

Before any percentage can be reported, expenses need a consistent classification rule. Proposed:

- **Programs**: direct costs of running education, nutrition, and healthcare activities —
  construction/materials for the Yaoundé project, food purchased for distribution, program staff
  and volunteer-coordinator time spent directly delivering activities, monitoring and evaluation
  of programs.
- **Administration**: governance and back-office costs not attributable to a specific program —
  board governance, accounting/audit fees, general insurance, the portion of any shared salary
  spent on organization-wide administration rather than a program.
- **Fundraising**: costs of raising money — payment processing fees on donations, donor
  communications, the portion of any shared salary spent soliciting gifts or grants.
- **Shared costs** (e.g., a director who does both program oversight and fundraising) should be
  allocated by a documented, consistent method — commonly time-tracking or a fixed pre-agreed
  ratio — not guessed after the fact each year.

This classification should be applied consistently once real expense data exists, then reported
via `impactMetric`-shaped entries (`cms/schema/impactMetric.ts`) with `public: true` only once a
finance-approved figure exists for a named fiscal period. **Never round or estimate a percentage
to fill the transparency page** — `app/[locale]/transparency/page.tsx` renders an em dash until
that happens, by design.

## 3. Proposed target allocation (a recommendation, not a reported fact)

Independent charity evaluators (e.g., Charity Intelligence Canada) commonly treat direct program
spending in the roughly 65-75%+ range as a reasonable efficiency benchmark for a small operating
charity, though there's no single correct number and it depends heavily on organization size and
stage. A reasonable starting commitment for the board to consider adopting:

> NACLB aims to direct at least 70% of total annual expenditures to programs, with the remainder
> split between administration and fundraising — reviewed annually against actual results and
> disclosed on the Transparency page once a full fiscal year of real data exists.

**What this is not**: this is a proposed forward-looking target for the board to adopt or amend —
not NACLB's actual historical spending, which doesn't exist as verified data yet. It must never be
substituted for the real percentage breakdown on the public Transparency page.

## 4. A separate, real CRA obligation: the disbursement quota

Distinct from the Programs/Admin/Fundraising split above, CRA requires registered charities to
spend a minimum percentage of the average value of their *investment property* each year (3.5% up
to $1M, 5% above that, as of 2026) — this is about not warehousing an endowment, not about the
Programs/Admin/Fundraising split. For an operating charity like NACLB that spends what it raises
rather than holding a large investment portfolio, this quota is likely immaterial, but it should
be checked against actual year-end financials once they exist, since CRA enforcement of it has
increased in 2026. Source: [CRA — disbursement quota
calculation](https://www.canada.ca/en/revenue-agency/services/charities-giving/charities/operating-a-registered-charity/annual-spending-requirement-disbursement-quota/disbursement-quota-calculation.html).

## 5. Operating reserve (recommendation)

Common nonprofit-sector guidance suggests holding 3-6 months of operating expenses in reserve
before committing to new multi-year program spending — worth the board setting an explicit target
once there's a full year of real expense data to base "3-6 months" on.
