# No African Child Left Behind

Bilingual (EN/FR) institutional site, built to the product/UX/technical spec (V1.0) for a
Canadian-registered charity operating in Cameroon. Stack: Next.js 16 (App Router) + TypeScript +
Tailwind CSS.

## What's in this repo

The full public bilingual site (every MVP page from spec section 101, design system, copy) plus a
**working admin panel** (`/admin`) with role-based accounts for NGO personnel to write and publish
blog posts with images — see "Admin panel" below. What's still missing is the third-party
accounts nobody here can create on the org's behalf (Stripe, a production database, Sanity if
wanted, a domain) — see `ARCHITECTURE.md` for what's next and `CONTENT-TODO.md` for what content
is intentionally left blank pending verification.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000 — public site works with no setup
npm run build     # production build
npm run lint
npm run test:e2e  # Playwright — builds, starts, and exercises the site
```

Visiting `/` redirects to `/en` (default) or `/fr` based on the browser's `Accept-Language`
header. Every page exists under both `/en/...` and `/fr/...`. `/admin` is English-only (spec
section 65 — the internal tool isn't part of the bilingual public site).

### Admin panel

Requires a Postgres database (`DATABASE_URL`) and `AUTH_SECRET`. Once set:

```bash
for f in db/migrations/*.sql; do psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$f"; done
npm run create-admin -- --email you@org.org --name "Your Name" --role super_admin
npm run dev
```

Sign in at `/admin/login`. Roles: `super_admin` (also manages personnel accounts at
`/admin/users`), `admin`, `content_editor` (both can write/publish posts at `/admin/posts`),
`finance`, `marketing`. Published posts appear on the public `/stories` pages within about a
minute (ISR caching). See `db/README.md` for details, including what's not built yet (MFA,
password reset).

## Project structure

```
app/[locale]/        Public route segments (one tree, two locales via generateStaticParams)
app/admin/            Admin panel — login, dashboard, Posts editor, Users management
app/api/              Route Handlers: Contact/Volunteer (validated, no email provider yet),
                      admin login/logout/posts/users/upload
components/          Design-system components (Header, Footer, Button, cards, forms, ...)
components/admin/     Admin-only components (nav, forms, image uploader, status controls)
content/             CMS-shaped content: dictionaries (en.json/fr.json), projects, impact
                      metrics, partners, legal policy drafts
cms/schema/          Sanity schema-as-code mirroring lib/types.ts (see cms/README.md) — an
                      alternative CMS path; the working blog editor is the Postgres one above
db/migrations/       Postgres SQL: donation data model + admin/RBAC/Stories (see db/README.md)
docs/                Drafted operational procedures (receipt issuance, refund/financial policy)
lib/                 i18n, auth (sessions, RBAC, password hashing), db access, image storage
scripts/              create-admin.ts — bootstraps the first admin account
tests/e2e/           Playwright tests: public site, admin panel (skips without a database),
                      accessibility, and a check that unverified figures never render as fact
```

## Content governance

No figure or claim listed in spec section 89/116 (children reached, meals provided, amount
invested, program/admin/fundraising split, hospital partnership status, charity registration,
tax-receipt eligibility, etc.) is hard-coded as fact anywhere in this codebase. Each one is
modeled as data with a `public: false` (or equivalent) flag in `content/`, and the UI renders a
"pending verification" state instead of a number until that flag is flipped after the
organization confirms the figure. See `CONTENT-TODO.md` for the full list and where each item
plugs in.

See `ARCHITECTURE.md` for the recommended path to production (production database, payments,
email, image storage, hosting) and what's already built vs. still to wire up.
