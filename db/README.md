# Database schema

Plain, tool-agnostic SQL migrations for the donation data model (spec section 66) and the
admin audit log (spec section 67), targeting Postgres — Supabase is the path of least resistance
per spec section 61.

Files run in order (`0001_...` → `0004_...`). No migration tool is assumed yet; once a database
exists, apply them with `psql $DATABASE_URL -f db/migrations/0001_....sql` (repeat per file), or
import them into whichever migration runner the team picks (node-pg-migrate, Prisma, Drizzle —
these are plain SQL so any of them can adopt this as a baseline).

## Design notes

- **No card data**: every table only stores the payment provider's own reference id
  (`provider_payment_id`, `provider_subscription_id`). Full card numbers and CVCs never reach
  this database — Stripe Elements/Checkout keeps that entirely on Stripe's side.
- **Projects live in the CMS, not here**: `project_id` columns are plain text matching the CMS's
  `project_id` (see `lib/types.ts` / `cms/schema/project.ts`), not a foreign key. The CMS owns
  what a project *is*; this database owns what was *donated* to it.
- **Receipts table exists but issues nothing yet**: numbering scheme, cancellation/reissue policy,
  and the ARC-required fields on the receipt itself are still pending (see `CONTENT-TODO.md`).
  Don't start writing receipt-generation code against this table until that policy is confirmed.
