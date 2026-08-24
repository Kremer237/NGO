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
- **Interactive forms** (Donate, Volunteer, Contact) are fully functional client-side — state,
  validation, multi-field UI — but stop short of a real network call, since there's no backend or
  provider account to send to yet. Submitting shows an honest in-UI message rather than a fake
  success.
- **SEO/accessibility basics**: `sitemap.ts`, `robots.ts`, JSON-LD on the homepage, skip-nav link,
  visible focus states, `prefers-reduced-motion` support, semantic landmarks.

## What's deliberately not built, and why

These all require accounts, credentials, or organizational decisions this session doesn't have
access to. Building them against placeholder/fake credentials would produce something that looks
done but silently fails in production — worse than not building it.

| Area | Spec section | Needs |
|---|---|---|
| Headless CMS (Sanity) | 64 | A Sanity project + API tokens |
| Database (Postgres/Supabase) | 61, 66 | A provisioned database |
| Payments (Stripe) | 39, 42, 98 | A verified Stripe organization account |
| Auth (donor accounts, admin) | 43, 65 | An auth provider + MFA policy decision |
| Transactional email (Resend/Postmark/SES) | 78, 41 | A domain + DKIM/SPF/DMARC setup |
| Admin panel + RBAC | 65 | Built on top of the CMS/DB above |
| Analytics (GA4) | 74 | A GA4 property |
| Error monitoring (Sentry) | 99 | A Sentry project |
| Domain, DNS, Cloudflare, SSL | 77, 100 | A purchased domain |

## Recommended integration path

1. **CMS**: stand up Sanity, define schemas matching `lib/types.ts` (`Project`, `ImpactMetric`,
   `Partner`), then replace the static imports in `content/*.ts` with Sanity fetch calls. Page
   components don't change — they already consume these shapes.
2. **Database + Auth**: provision Postgres (Supabase is the path of least resistance), stand up
   the `Donor`/`Donation`/`RecurringDonation` tables from spec section 66, add an auth provider for
   admin + (later) donor accounts.
3. **Payments**: create the Stripe organization account, add Stripe Elements to `DonateForm.tsx`
   (`components/DonateForm.tsx`) behind a new `/api/donations` route, wire webhooks for
   success/failure/recurring events into the Donation table.
4. **Email**: pick a transactional provider, wire the Contact and Volunteer form submissions
   (`components/ContactForm.tsx`, `components/VolunteerForm.tsx`) to real endpoints, add the
   automated donation emails from spec section 41.
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
