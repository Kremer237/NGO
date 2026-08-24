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
- **Playwright end-to-end tests** (`tests/e2e/`, `npm run test:e2e`): 14 tests covering locale
  routing, navigation, both forms, and — importantly — the content-governance rule itself
  (`tests/e2e/content-governance.spec.ts` asserts the unverified figures render as pending, never
  as invented numbers, and that the donate form never fakes a payment success). Wired into CI.
- **SEO/accessibility basics**: `sitemap.ts`, `robots.ts`, JSON-LD on the homepage, skip-nav link,
  visible focus states, `prefers-reduced-motion` support, semantic landmarks.
- **Brand placeholder**: a minimal geometric mark (`public/brand/`, see its `README.md`) so the
  site isn't shipping with zero identity — favicon, apple touch icon, and a per-locale dynamic
  OG/social-share image are wired up from it. This is explicitly not the final logo; spec section
  12 calls for a real design deliverable.
- **CI**: `.github/workflows/ci.yml` runs lint, type check, and build on every push/PR.
- **Error handling**: `app/[locale]/error.tsx` (in-app boundary) and `app/global-error.tsx`
  (catastrophic fallback) per spec section 68/96.
- **Stories architecture**: `content/stories.ts` and `lib/types.ts` (`Story`) mirror the article
  model from spec section 36; the list is empty because nothing has cleared the content workflow
  (Draft → Review → Approved → Published) yet, not because the route is missing.

## What's deliberately not built, and why

These all require accounts, credentials, or organizational decisions this session doesn't have
access to. Building them against placeholder/fake credentials would produce something that looks
done but silently fails in production — worse than not building it.

| Area | Spec section | Needs | What exists already |
|---|---|---|---|
| Headless CMS (Sanity) | 64 | A Sanity project + API tokens | Schema-as-code in `cms/schema/`, ready to paste in |
| Database (Postgres/Supabase) | 61, 66 | A provisioned database | SQL migrations in `db/migrations/`, ready to run |
| Payments (Stripe) | 39, 42, 98 | A verified Stripe organization account | Donate form UI; no endpoint (see above) |
| Auth (donor accounts, admin) | 43, 65 | An auth provider + MFA policy decision | — |
| Transactional email (Resend/Postmark/SES) | 78, 41 | A domain + DKIM/SPF/DMARC setup | Validated API routes with a `TODO` at the send call |
| Admin panel + RBAC | 65 | Built on top of the CMS/DB above | — |
| Analytics (GA4) | 74 | A GA4 property | — |
| Error monitoring (Sentry) | 99 | A Sentry project | `error.tsx`/`global-error.tsx` boundaries already log to console |
| Domain, DNS, Cloudflare, SSL | 77, 100 | A purchased domain | `.env.example` documents `NEXT_PUBLIC_SITE_URL` |

## Recommended integration path

1. **CMS**: stand up Sanity, follow `cms/README.md` to turn `cms/schema/*.ts` into real
   `defineType` calls, then replace the static imports in `content/*.ts` with Sanity fetch calls.
   Page components don't change — they already consume these shapes.
2. **Database + Auth**: provision Postgres (Supabase is the path of least resistance), run
   `db/migrations/*.sql` in order, add an auth provider for admin + (later) donor accounts.
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
6. **Admin panel**: once the CMS and DB exist, this becomes mostly Sanity Studio (content) +
   a thin custom panel for finance/donation data with the RBAC roles from spec section 65.
7. **Ops**: domain purchase → DNS/Cloudflare → deploy to Vercel → GA4 + Search Console → Sentry →
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
