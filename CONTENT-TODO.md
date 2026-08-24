# Content to complete before production

Nothing below has been invented. Each item is either absent from the live site or rendered as an
explicit "pending verification" state. Insert real values via the future CMS once validated —
never by editing placeholder copy directly in the page components.

## Organization / legal (spec section 116)

- [ ] ARC (CRA) registration number
- [ ] Full legal name, if different from "No African Child Left Behind"
- [ ] Registered legal address
- [ ] Names of the three directors (currently shown only as role titles — `content/dictionaries/*.json` → `about.teamRoles`)
- [ ] "Canadian registered charity" claim on the homepage hero currently reads "(pending)" —
      `home.heroMicrocopy` in both dictionaries — remove the qualifier only once the registration
      is confirmed and live

## The Yaoundé School Expansion Project (spec section 31)

All in `content/projects.ts`, project `yaounde-school-expansion`, `data_pending` array:

- [ ] Official school name
- [ ] Total budget
- [ ] Amount already committed / spent
- [ ] Amount remaining
- [ ] Current and target capacity
- [ ] Number of classrooms added
- [ ] Timeline / target completion date
- [ ] Contractor
- [ ] Supporting documents

## Impact metrics (spec section 89/90/116)

All in `content/impact-metrics.ts`. Each has `public: false` — the site shows an em dash and a
"pending verification" note instead of the number. Flip to `public: true` only once each is true:

- [ ] `children-reached-education` ("42,000+") — methodology not yet defined (individually
      enrolled? cumulative participations? funded fees? see spec section 18)
- [ ] `meals-provided` ("1M+") — proof and exact reporting period needed
- [ ] `invested-in-impact` ("100M+ XAF") — needs finance-team verification against annual reporting

`volunteers` ("50+") is treated as already-public organizational copy per spec section 24, not a
number requiring external proof.

## Healthcare partnership (spec section 32, 116)

- [ ] Hospital/partner identity
- [ ] Final partnership terms
- [ ] Program budget

The Healthcare page and the `healthcare-access-initiative` project both explicitly state no
partnership is final until signed — do not remove that language before it's true.

## Transparency (spec section 45-46, 116)

- [ ] Program / Administration / Fundraising percentage breakdown, with fiscal period and source
      — `app/[locale]/transparency/page.tsx` currently renders three empty categories
- [ ] Annual reports, project reports, impact reports (none published yet — the CMS-shaped
      structure is ready, see `Reports` type in `lib/types.ts`)
- [ ] Internal financial policy
- [ ] Refund policy
- [ ] Exact receipt-issuance procedure

## Partners (spec section 50, 116)

- [ ] Authorization to use "Complexe scolaire Saint-Marc" name/logo —
      `content/partners.ts` → `logo_usage_authorized: false`. The partner section on `/partner`
      is hidden entirely until this is `true`.

## Legal pages (spec section 72)

- [ ] Privacy Policy, Cookie Policy, Terms of Use — currently placeholder pages
      (`app/[locale]/privacy`, `/cookies`, `/terms`) stating the policy is pending. Draft these
      with Canadian compliance counsel per the ARC retention-period requirements (do not apply a
      blanket 7-year rule — spec section 72 requires a retention matrix by document category).

## Contact details already in the spec (used as-is, not placeholders)

- Email: `noafricanchildleftbehind@outlook.com` — spec section 76 recommends moving to a domain
  address before launch (`hello@`, `donations@`, `volunteer@`, `partnerships@`, `finance@`)
- Phone/WhatsApp: `+1 416 833 7164`

These were given directly in the spec as current values, not flagged as pending, so they're live
on the Contact page as-is.
