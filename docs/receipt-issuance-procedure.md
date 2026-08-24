# Official donation receipt — issuance procedure (draft)

**Status: draft, pending finance-lead and legal review. Do not issue real receipts against this
procedure until (a) the organization's CRA registration is active, and (b) a person with signing
authority has been designated (section 5).**

Sourced from current CRA guidance on [issuing complete and accurate donation
receipts](https://www.canada.ca/en/revenue-agency/services/charities-giving/charities/checklists-charities/issuing-complete-accurate-donation-receipts.html)
and CRA's [books-and-records retention
rules](https://www.canada.ca/en/revenue-agency/services/charities-giving/charities/checklists-charities/keeping-adequate-books-records.html)
(both checked August 2026). This procedure is the operational counterpart to the numbering and
retention commitments described publicly in `content/legal.ts` (`donationTerms`, sections 5 and 7).

## 1. When a receipt is issued

An official donation receipt is issued for every eligible cash gift of $20 CAD/USD or more once
payment succeeds (Stripe webhook `payment_intent.succeeded` or equivalent — see
`db/migrations/0003_payments_receipts.sql`). $20 is a chosen operational threshold, not a CRA
minimum; a donor may request a receipt for a smaller gift. A gift that provided the donor an
advantage (e.g., an event ticket) is receipted only for the eligible amount (gift value minus
advantage value), per CRA's split-receipting rules.

## 2. Receipt number format

```
NACLB-{tax_year}-{sequence}
```

- `tax_year`: the four-digit calendar year the gift was received (CRA receipts the calendar year
  of receipt, not the processing date, if they differ).
- `sequence`: a six-digit, zero-padded, strictly sequential number **that resets to `000001` at
  the start of each `tax_year`** and is never reused, even for a voided receipt.
- Example: `NACLB-2027-000001`.

This satisfies CRA's requirement for a unique serial number per receipt (an ordered database
sequence per `donations.id` is sufficient — see `receipts.receipt_number unique` in
`db/migrations/0003_payments_receipts.sql`) without requiring a specific format; the format above
is a design choice, freely adjustable before the first receipt is ever issued.

## 3. Required fields on every receipt

Per CRA's checklist, every receipt must show:

1. "Official receipt for income tax purposes"
2. The charity's name and address **exactly as registered with CRA** — placeholder until
   confirmed, see `CONTENT-TODO.md`
3. The charity's CRA registration (BN) number — placeholder until confirmed
4. The receipt's serial number (section 2)
5. The place (city/province) the receipt was issued from
6. The date the gift was received, and the issue date if different
7. The donor's full name and address
8. The eligible amount of the gift, in the currency donated
9. The value and description of any advantage provided to the donor (or "nil")
10. The signature of an individual authorized by the organization to acknowledge donations
    (section 5)
11. CRA's name and website address (`canada.ca/charities-giving`)

A receipt template (PDF) implementing these fields does not yet exist in this repo — it should be
built once fields 2, 3, and 5 are confirmed, as a PDF generation step in the `/api/donations`
webhook handler described in `ARCHITECTURE.md`.

## 4. Voiding and reissuing

- **Refunded donation**: if a refund is issued after a receipt was sent (see `donationTerms`
  section 2 in `content/legal.ts`), the receipt is voided — `receipts.voided_at` /
  `voided_reason` are set (`db/migrations/0003_payments_receipts.sql`) — and the donor is
  notified by email that the receipt is no longer valid for tax purposes.
- **Correction** (e.g., wrong donor name): void the original, issue a new one with the next
  sequence number. Never edit an issued receipt's PDF in place.
- A voided receipt's number is never reused (section 2).

## 5. Signing authority

CRA requires the signature of "an individual who is authorized by the charity to acknowledge
donations." This must be a named person or role with board-approved signing authority — currently
undetermined (see `CONTENT-TODO.md`, "names of the three directors"). Until assigned, no receipt
should be issued, even in a test/staging environment with real donor data.

## 6. Retention

Per CRA: copies of issued receipts are kept **2 years from the end of the calendar year the gift
was received**; the underlying financial ledger entries are kept **6 years from the end of the
relevant tax year**. See `donationTerms` section 7 for the donor-facing summary and
`db/README.md` for how this maps to the `receipts` table.
