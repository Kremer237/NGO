# Architecture

## What's built

- **Next.js 16 (App Router) + TypeScript + Tailwind CSS**, statically generated (`generateStaticParams`)
  for every page in both locales — 48 routes, all pre-rendered.
- **Bilingual routing**: `app/[locale]/...`, a `proxy.ts` (Next 16's renamed middleware convention)
  redirecting `/` to `/en` or `/fr` by `Accept-Language`, and `hreflang`/OpenGraph alternates in
  `generateMetadata`.
- **Design system**: color/type tokens in `tailwind.config.ts` matching spec section 10-11
  (Forest/Ivory/Ochre palette, Manrope/Inter), and reusable components in `components/`
  (Header with mobile nav, Footer, Button variants, Section, Metric, ProgramCard, ProjectCard,
  ProgressIndicator).
- **Content layer shaped like a future CMS schema** (`content/`, `lib/types.ts`): `Project`,
  `ImpactMetric`, `Partner` types mirror the field lists in spec sections 30/50/90, so swapping in
  Sanity (or any headless CMS) later means writing a fetch layer against the same shape, not
  redesigning the pages.
- **Contact and Volunteer forms** do a real round trip: client-side validation plus a server-side
  validated Route Handler (`app/api/contact`, `app/api/volunteer`, using `lib/validation.ts`) per
  spec section 79. They don't deliver anywhere yet (no email provider account exists), which is
  marked with a `TODO(email-provider)` comment at the one line that needs to change once one does.
- **Donate form** is fully interactive client-side (frequency/currency/amount/allocation) but
  deliberately does **not** call a payment endpoint — there is no Stripe account to charge against,
  and simulating a successful charge would be actively dangerous. Submitting shows the honest
  "payment processing is being finalized" message instead.
- **CMS schema-as-code** (`cms/schema/`): Sanity-shaped field definitions for `project`,
  `impactMetric`, `partner`, `story`, `report`, `siteSettings`, written without the `sanity`
  package as a dependency (see `cms/README.md` for why and how to activate). Mirrors
  `lib/types.ts` exactly, including the governance defaults (`impactMetric.public: false`,
  `partner.logoUsageAuthorized: false`, `story.status: "draft"`).
- **Database migrations** (`db/migrations/`): plain Postgres SQL for the donation data model from
  spec section 66 (`donors`, `campaigns`, `donations`, `recurring_donations`, `payments`,
  `receipts`, `impact_updates`) and the audit log from section 67. No card data is ever modeled —
  only provider reference ids. See `db/README.md`.
- **Playwright end-to-end tests** (`tests/e2e/`, `npm run test:e2e`): 26 tests covering locale
  routing, navigation, both forms, automated accessibility (`@axe-core/playwright`, WCAG 2 A/AA,
  across 11 pages in both locales), and — importantly — the content-governance rule itself
  (`tests/e2e/content-governance.spec.ts` asserts the unverified figures render as pending, never
  as invented numbers, and that the donate form never fakes a payment success). Wired into CI.
  The axe run caught two real bugs, both fixed: the accent color (`ochre`, spec section 10) failed
  WCAG text contrast at the sizes it's actually used at (~2.7:1 against a 4.5:1 requirement) and
  has been darkened to the same hue at ~4.6:1; the language-switcher link's `aria-label` was
  overriding its visible "FR"/"EN" text as the accessible name (WCAG 2.5.3). Manual checks from
  spec section 97 (keyboard-only, VoiceOver/NVDA, 200% zoom) still need a human — axe only covers
  what's mechanically detectable.
- **SEO/accessibility basics**: `sitemap.ts`, `robots.ts`, JSON-LD on the homepage, skip-nav link,
  visible focus states, `prefers-reduced-motion` support, semantic landmarks.
- **Brand placeholder**: a minimal geometric mark (`public/brand/`, see its `README.md`) so the
  site isn't shipping with zero identity — favicon, apple touch icon, and a per-locale dynamic
  OG/social-share image are wired up from it. This is explicitly not the final logo; spec section
  12 calls for a real design deliverable.
- **CI**: `.github/workflows/ci.yml` runs lint, type check, and build on every push/PR.
- **Error handling**: `app/[locale]/error.tsx` (in-app boundary) and `app/global-error.tsx`
  (catastrophic fallback) per spec section 68/96.
- **Admin panel with RBAC — actually built and tested, not just speced** (spec section 65):
  password login (`bcryptjs` + `jose`-signed JWT session cookie), five roles (`super_admin`,
  `admin`, `content_editor`, `finance`, `marketing`), and route protection enforced at the edge
  in `proxy.ts` — an unauthenticated request to `/admin/*` never reaches the page, and
  `/admin/users` redirects anyone who isn't `super_admin` before it renders. `/admin/posts` is a
  full Stories (blog post) editor — create/edit, an image uploader, and the Draft → Review →
  Approved → Published → Archived workflow from spec section 93 — and `/admin/users` lets a Super
  Admin create personnel accounts (never self-service signup). `npm run create-admin` bootstraps
  the first account. Every login, upload, post edit, status change, and account creation writes
  to `audit_log` (spec section 67). This was built against a real local Postgres in this session
  and verified end-to-end with a real browser — login, RBAC denial, post creation with an actual
  uploaded image, the full workflow, and the published result appearing on the live public
  `/stories` pages — not just typechecked. `tests/e2e/admin.spec.ts` re-runs that same
  verification in CI against a `postgres:16` service container
  (`.github/workflows/ci.yml`) and skips locally when `DATABASE_URL` isn't set.
- **Stories are DB-backed on the public site**: `app/[locale]/stories/*` reads published rows via
  `lib/stories-repo.ts` (ISR, `revalidate = 60` — a publish can take up to a minute to appear,
  which the admin UI tells the editor), falling back to the static (empty) `content/stories.ts`
  list when no database is configured, so the public site never crashes without one. The CMS
  schema-as-code (`cms/schema/story.ts`) still exists for a future Sanity migration, but the
  working blog today is this Postgres-backed one, not Sanity.
- **Image uploads** (`lib/storage.ts`): a small adapter interface with two implementations — local
  disk (writes to `public/uploads/`, tested and working in dev/a persistent Node server, but
  **not viable on Vercel or other serverless hosts** since their filesystem is read-only/ephemeral
  at runtime) and Vercel Blob (written against the real `@vercel/blob` SDK, selected automatically
  once `BLOB_READ_WRITE_TOKEN` is set, but untestable in this session — it needs a Vercel project
  with Blob storage enabled). Enable Blob storage before relying on image uploads in production.
- **What's explicitly not in the admin panel yet**: MFA (spec section 65/68 call for it;
  `admin_users.mfa_secret` exists but nothing enforces it — every login is password-only), a
  forced password change or self-service reset flow (a Super Admin sets a temporary password and
  shares it out of band; there's no "forgot password" since no email provider exists), and
  Finance/Marketing-specific screens (those roles can log in and see the dashboard, but there's no
  donation or campaign data yet for a dedicated screen to manage).
- **Security headers**: `proxy.ts` sets `X-Content-Type-Options`, `Referrer-Policy`,
  `Permissions-Policy`, and `Strict-Transport-Security` on every page response (spec section 68).
  A nonce-based Content-Security-Policy was attempted and reverted — tested against a real
  browser (not just a successful build), it blocked every Next.js/Turbopack-injected chunk
  script, which would have silently broken all client-side interactivity site-wide. See the
  comment in `proxy.ts` before re-attempting this; verify any future CSP the same way this one
  was disproven, by loading the production build in an actual browser and checking the console.
- **Legal and financial policy drafts**: Privacy Policy, Cookie Policy, Terms of Use, and Donation
  Terms are full working drafts (`content/legal.ts`, live at `/privacy`, `/cookies`, `/terms`,
  `/donation-terms`, each with a visible "not yet reviewed" banner), informed by current PIPEDA and
  CRA guidance. `docs/receipt-issuance-procedure.md` specs a CRA-compliant receipt number format
  and required fields; `docs/refund-and-financial-policy.md` specs the refund workflow and a
  proposed (not actual) Programs/Admin/Fundraising target and classification method. None of these
  invent the organization's actual legal identity or historical figures — see `CONTENT-TODO.md`
  for exactly what's drafted vs. what's a genuine unresolved fact.

## What's deliberately not built, and why

These all require accounts, credentials, or organizational decisions this session doesn't have
access to. Building them against placeholder/fake credentials would produce something that looks
done but silently fails in production — worse than not building it.

| Area | Spec section | Needs | What exists already |
|---|---|---|---|
| Headless CMS (Sanity) | 64 | A Sanity project + API tokens | Schema-as-code in `cms/schema/`, ready to paste in — not needed for the working Postgres-backed Stories editor |
| Production database (Postgres/Supabase) | 61, 66 | A provisioned database | Full schema in `db/migrations/`, tested end-to-end against a real Postgres, ready to run against production |
| Payments (Stripe) | 39, 42, 98 | A verified Stripe organization account | Donate form UI; no endpoint (see above) |
| Admin MFA | 65, 68 | A decision on TOTP vs. another factor | `admin_users.mfa_secret` column exists; nothing enforces it yet |
| Donor accounts | 43 | Depends on the above + a UX decision (V1.1 per spec) | — |
| Transactional email (Resend/Postmark/SES) | 78, 41 | A domain + DKIM/SPF/DMARC setup | Validated API routes with a `TODO` at the send call |
| Image storage in production | — | A Vercel Blob store (or S3) enabled on the hosting project | `lib/storage.ts` picks it up automatically via `BLOB_READ_WRITE_TOKEN`; local-disk fallback works but isn't viable on serverless |
| Analytics (GA4) | 74 | A GA4 property | — |
| Error monitoring (Sentry) | 99 | A Sentry project | `error.tsx`/`global-error.tsx` boundaries already log to console |
| Domain, DNS, Cloudflare, SSL | 77, 100 | A purchased domain | `.env.example` documents `NEXT_PUBLIC_SITE_URL` |

## Recommended integration path

1. **Database**: provision Postgres (Supabase is the path of least resistance), run
   `db/migrations/*.sql` in order (`for f in db/migrations/*.sql; do psql "$DATABASE_URL" -f "$f"; done`),
   set `DATABASE_URL` and `AUTH_SECRET` (`openssl rand -base64 32`) on the hosting project, then
   `npm run create-admin -- --email you@org.org --name "Your Name" --role super_admin` to
   bootstrap the first account. The admin panel and Stories editor work immediately at that point
   — this is the one step in this list that's already fully built and tested, not just speced.
2. **Image storage**: enable Vercel Blob on the project (or point `lib/storage.ts` at S3) and set
   `BLOB_READ_WRITE_TOKEN` — without it, uploaded images only work in local dev.
3. **Payments**: create the Stripe organization account, add Stripe Elements to `DonateForm.tsx`
   (`components/DonateForm.tsx`) behind a new `/api/donations` route, wire webhooks for
   success/failure/recurring events into the `donations`/`payments` tables (idempotent on
   `provider_payment_id` — spec section 98).
4. **Email**: pick a transactional provider and fill in the single `TODO(email-provider)` line in
   `app/api/contact/route.ts` and `app/api/volunteer/route.ts` — both already do full client +
   server validation (spec section 79) and just need the send call. Add the automated donation
   emails from spec section 41 once payments exist.
5. **Receipts**: only after the ARC (CRA) registration number and legal identity are confirmed —
   see `CONTENT-TODO.md`. Do not build receipt generation against placeholder legal data.
6. **CMS (optional)**: the admin panel's Postgres-backed Stories editor already covers spec
   section 64's core need (personnel writing/publishing content). Only migrate to Sanity
   (`cms/README.md`) if the org specifically wants a headless-CMS editorial workflow beyond what
   `/admin/posts` provides.
7. **MFA + donor accounts**: add TOTP enforcement to the admin login (spec section 65/68), then
   consider a donor-facing account system (spec section 43, V1.1) once payments exist.
8. **Ops**: domain purchase → DNS/Cloudflare → deploy to Vercel → GA4 + Search Console → Sentry →
   automated backups. This is the section 100 checklist; do it once the above are wired.

## Notes on decisions made without explicit sign-off

- **Next.js 16** rather than 14 (spec didn't pin a version): 14.2.5 had multiple known high/critical
  CVEs; 16.3.2 was the current stable release with zero `npm audit` findings at build time.
- **No Sanity/Postgres/Stripe stubs or mocked API routes**: a fake integration is worse than a
  documented gap, since it invites shipping against fabricated behavior.
- **"Where We Work" page** uses a labeled list instead of a geographic SVG map, since an
  inaccurate hand-drawn map risks the "no false geographic presence" rule in spec section 35 more
  than a plain list does. Worth revisiting once a designer produces the real stylized map asset.
- **Donor dashboard ("My Impact")** was left out entirely — spec section 102 explicitly allows
  deferring it to V1.1 if scope requires, and it depends on auth + the donation database anyway.
