# Content to complete before production

Every item below is either drafted-but-unadopted (real, usable text that still needs a human
sign-off) or a genuine fact/account that nobody has supplied yet. Nothing is invented: no charity
registration number, no person's name, no historical financial figure appears anywhere in this
codebase that isn't real. See the "Researched, not found" note at the bottom for why the legal
identity section below is empty rather than filled with a guess.

## Organization / legal identity (spec section 116) — genuinely blocked, not draftable

These identify a real (or not-yet-existing) legal entity and real people. I can't verify or infer
them — only the organization can supply them, and a wrong or invented value here (especially a
charity registration number) is a real integrity problem, not a placeholder issue.

- [ ] ARC (CRA) registration number — searched publicly (see below); nothing found, so this is
      either not yet registered or registered under a different name
- [ ] Full legal name, if different from "No African Child Left Behind"
- [ ] Registered legal address
- [ ] Incorporating province (needed for `termsOfUse` section 7, `content/legal.ts`)
- [ ] Names of the three directors (currently shown only as role titles —
      `content/dictionaries/*.json` → `about.teamRoles`) — and who among them has board-approved
      signing authority for tax receipts (`docs/receipt-issuance-procedure.md` section 5)
- [ ] "Canadian registered charity" claim on the homepage hero currently reads "(pending)" —
      `home.heroMicrocopy` in both dictionaries — remove the qualifier only once registration is
      confirmed and live

**Researched, not found**: a web search for "No African Child Left Behind" (charity registration,
CRA number, general web presence) turned up no matching Canadian registered charity or public
organization — see the conversation this was checked in. That's consistent with this being a
new/planned organization, which is exactly why section 116 said not to invent these values.

## Now drafted — needs human review and adoption, not more content

These used to be blank "pending" pages. They're now full working drafts, informed by current
PIPEDA and CRA guidance (checked August 2026) and standard nonprofit practice — but a draft is not
a decision. Each carries a visible "not yet reviewed" banner on the live page and needs:

- [ ] **Privacy Policy, Cookie Policy, Terms of Use, Donation Terms**
      (`content/legal.ts`, rendered at `/privacy`, `/cookies`, `/terms`, `/donation-terms`) —
      needs review by a lawyer qualified in Canadian privacy/charity law, then the draft banner
      removed. Two fields inside are marked inline as still missing: the confirmed legal
      name/address (Terms references it implicitly via `content/legal.ts`'s org identity) and the
      incorporating province.
- [ ] **Official receipt numbering and issuance procedure**
      (`docs/receipt-issuance-procedure.md`) — needs finance-lead sign-off on the $20 threshold
      and the `NACLB-{year}-{sequence}` numbering format (both are proposals, freely
      changeable before the first receipt is ever issued), plus the ARC number/legal
      name/address it references from the section above.
- [ ] **Refund policy and internal financial policy**
      (`docs/refund-and-financial-policy.md`) — needs board adoption of the refund criteria, the
      Programs/Administration/Fundraising expense-classification rule, and the proposed 70%
      program-spending target (explicitly a recommendation, not a reported figure).
- [ ] **Impact-metric methodology** (`content/impact-metrics.ts` → each `definition` field) — a
      concrete, proposed counting definition now exists for "children reached," "meals provided,"
      and "invested in impact" (internal-only; not shown on the public site). Adopting a
      definition doesn't verify the number — see the next section.

## Impact metrics — status (spec section 89/90/116)

All in `content/impact-metrics.ts`. As of 2026-09-16, all four are `public: true`:

- [x] `children-reached-education` ("42,000+") — confirmed by the site administrator via chat
      during development (see `verified_by` on the record itself for the exact wording — this was
      a verbal confirmation, not an independent audit against enrollment records)
- [x] `meals-provided` ("1M+") — confirmed the same way, not yet reconciled against distribution
      records
- [x] `invested-in-impact` ("100M+ XAF") — confirmed the same way, not yet reconciled against
      finance records
- [x] `volunteers` ("50+") — organizational headcount per spec section 24, not a number requiring
      external proof

**If these ever need to hold up under real scrutiny** (a CRA inquiry, a major donor's due
diligence, an annual report audit), they should be reconciled against the actual underlying
records described in each metric's `definition` field before that happens — a chat confirmation
establishes that someone with authority stands behind the number today, not that it has been
independently verified against source documents.

## The Yaoundé School Expansion Project (spec section 31)

All in `content/projects.ts`, project `yaounde-school-expansion`, `data_pending` array — genuine
project facts nobody has supplied:

- [ ] Official school name
- [ ] Total budget
- [ ] Amount already committed / spent
- [ ] Amount remaining
- [ ] Current and target capacity
- [ ] Number of classrooms added
- [ ] Timeline / target completion date
- [ ] Contractor
- [ ] Supporting documents

## Healthcare partnership (spec section 32, 116)

- [ ] Hospital/partner identity
- [ ] Final partnership terms
- [ ] Program budget

The Healthcare page and the `healthcare-access-initiative` project both explicitly state no
partnership is final until signed — do not remove that language before it's true.

## Transparency — Program/Admin/Fundraising split (spec section 45-46, 116)

- [ ] Actual percentage breakdown, with fiscal period and source — a proposed *target* (70%
      programs) and the classification methodology behind it now exist in
      `docs/refund-and-financial-policy.md`, but `app/[locale]/transparency/page.tsx` still
      correctly renders three empty categories, because a target is not an actual result
- [ ] Annual reports, project reports, impact reports (none published yet — the CMS-shaped
      structure is ready, see `Reports` type in `lib/types.ts` and `cms/schema/report.ts`)

## Partners (spec section 50, 116)

- [ ] Authorization to use "Complexe scolaire Saint-Marc" name/logo —
      `content/partners.ts` → `logo_usage_authorized: false`. The partner section on `/partner`
      is hidden entirely until this is `true`.

## Contact details already in the spec (used as-is, not placeholders)

- Email: `noafricanchildleftbehind@outlook.com` — spec section 76 recommends moving to a domain
  address before launch (`hello@`, `donations@`, `volunteer@`, `partnerships@`, `finance@`)
- Phone/WhatsApp: `+1 416 833 7164`

These were given directly in the spec as current values, not flagged as pending, so they're live
on the Contact page as-is.
