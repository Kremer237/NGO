# Database schema

Plain, tool-agnostic SQL migrations for the donation data model (spec section 66) and the
admin audit log (spec section 67), targeting Postgres — Supabase is the path of least resistance
per spec section 61.

Files run in order (`0001_...` → `0007_...`). `0005`-`0007` add the admin/RBAC and Stories
(blog post) tables behind the actual working admin panel at `/admin` — see "Admin accounts and
Stories" below; `0001`-`0004` are the donation data model, still schema-only pending Stripe.

No migration tool is assumed; apply them with:

```bash
for f in db/migrations/*.sql; do psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$f"; done
```

or import them into whichever migration runner the team picks (node-pg-migrate, Prisma, Drizzle —
these are plain SQL so any of them can adopt this as a baseline).

## Admin accounts and Stories — actually working, tested against a real database

Unlike the donation tables below, `admin_users` and `stories` back real, tested functionality:

- **Roles** (spec section 65): `super_admin`, `admin`, `content_editor`, `finance`, `marketing`.
  No self-service signup — accounts are created via `npm run create-admin` (bootstrap) or by a
  Super Admin at `/admin/users`.
- **Stories** are DB-backed blog posts with the Draft → Review → Approved → Published → Archived
  workflow from spec section 93. Only `published` rows are ever readable by the public
  `/[locale]/stories` pages (`lib/stories-repo.ts`); everything else is admin-only.
- **MFA is not implemented** — `admin_users.mfa_secret` exists so the schema doesn't need a
  breaking migration later, but every login currently succeeds on password alone. Don't treat
  this as done; see spec section 65/68.
- This was built and verified end-to-end against a real local Postgres in the session that added
  it — login, RBAC gating, post creation, image upload, and the full editorial workflow all
  passed against actual data, not just typechecked. `tests/e2e/admin.spec.ts` re-runs that same
  verification in CI (see `.github/workflows/ci.yml`'s `postgres:16` service).

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
