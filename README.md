# No African Child Left Behind

Bilingual (EN/FR) institutional site, built to the product/UX/technical spec (V1.0) for a
Canadian-registered charity operating in Cameroon. Stack: Next.js 16 (App Router) + TypeScript +
Tailwind CSS.

## What's in this repo

A front-end scaffold covering every MVP page from the spec (section 101), with the full design
system (colors, type, components) and bilingual copy wired up. It does **not** yet include the
backend services that require real third-party accounts — see `ARCHITECTURE.md` for what's next
and `CONTENT-TODO.md` for what content is intentionally left blank pending verification.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run lint
npm run test:e2e  # Playwright — builds, starts, and exercises the site
```

Visiting `/` redirects to `/en` (default) or `/fr` based on the browser's `Accept-Language`
header. Every page exists under both `/en/...` and `/fr/...`.

## Project structure

```
app/[locale]/        Route segments (one tree, two locales via generateStaticParams)
app/api/              Route Handlers (Contact, Volunteer — validated, not yet wired to an
                      email provider)
components/          Design-system components (Header, Footer, Button, cards, forms, ...)
content/             CMS-shaped content: dictionaries (en.json/fr.json), projects, impact
                      metrics, partners, stories — structured to be swapped for a headless CMS
cms/schema/          Sanity schema-as-code mirroring lib/types.ts (see cms/README.md)
db/migrations/       Postgres SQL for the donation data model (see db/README.md)
lib/                 i18n helpers, TypeScript types mirroring the future CMS schema, validation
tests/e2e/           Playwright smoke tests, including a check that unverified figures never
                      render as fact
```

## Content governance

No figure or claim listed in spec section 89/116 (children reached, meals provided, amount
invested, program/admin/fundraising split, hospital partnership status, charity registration,
tax-receipt eligibility, etc.) is hard-coded as fact anywhere in this codebase. Each one is
modeled as data with a `public: false` (or equivalent) flag in `content/`, and the UI renders a
"pending verification" state instead of a number until that flag is flipped after the
organization confirms the figure. See `CONTENT-TODO.md` for the full list and where each item
plugs in.

See `ARCHITECTURE.md` for the recommended path to production (CMS, payments, database, auth,
email, hosting) and what's already built vs. still to wire up.
