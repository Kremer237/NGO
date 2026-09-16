import type { ImpactMetric } from "@/lib/types";

// Per spec section 89/90/116: a figure may only render publicly once its
// methodology and source are verified. Until `public` is true, the UI shows
// a "pending verification" state instead of the number — never a fabricated one.
//
// The three metrics below were flipped to public on 2026-09-16 on the site
// administrator's explicit confirmation, given directly in the session that
// built this feature (not derived, inferred, or defaulted to by this code).
// That confirmation is a verbal one, not an independent audit against the
// underlying records — `verified_by` says so honestly. If this ever needs to
// hold up under CRA scrutiny or a donor's question, back it with the actual
// enrollment/distribution/finance records described in each `definition`.
export const impactMetrics: ImpactMetric[] = [
  {
    metric_id: "children-reached-education",
    title: { en: "Children reached through education", fr: "Enfants touchés par les actions éducatives" },
    value: "42,000+",
    unit: "children",
    period_start: null,
    period_end: null,
    definition: {
      en: "Cumulative count, to date, of individual children directly enrolled in, or whose school fees were funded by, an NACLB-supported education program. Counted once regardless of terms/activities attended; excludes indirect beneficiaries (e.g. siblings) not themselves enrolled.",
      fr: "Nombre cumulatif, à ce jour, d'enfants directement scolarisés dans un programme éducatif soutenu par NACLB, ou dont les frais de scolarité ont été financés. Compté une seule fois, peu importe le nombre de trimestres ou d'activités suivis; exclut les bénéficiaires indirects (p. ex. la fratrie) non eux-mêmes scolarisés.",
    },
    source_internal: "Confirmed by site administrator via chat during development — not independently audited against enrollment records.",
    verified_by: "Site administrator (chat confirmation, not an independent audit)",
    verified_at: "2026-09-16",
    public: true,
  },
  {
    metric_id: "meals-provided",
    title: { en: "Meals provided", fr: "Repas distribués" },
    value: "1M+",
    unit: "meals",
    period_start: null,
    period_end: null,
    definition: {
      en: "Cumulative count, to date, of individual meals distributed through NACLB-supported nutrition activities, counted per meal served (not per recipient, since one recipient may receive many meals).",
      fr: "Nombre cumulatif, à ce jour, de repas individuels distribués par les activités nutritionnelles soutenues par NACLB, comptés par repas servi (et non par bénéficiaire, un même bénéficiaire pouvant recevoir plusieurs repas).",
    },
    source_internal: "Confirmed by site administrator via chat during development — not independently audited against distribution records.",
    verified_by: "Site administrator (chat confirmation, not an independent audit)",
    verified_at: "2026-09-16",
    public: true,
  },
  {
    metric_id: "invested-in-impact",
    title: { en: "Invested in impact", fr: "Investis dans les actions" },
    value: "100M+ XAF",
    unit: "XAF",
    period_start: null,
    period_end: null,
    definition: {
      en: "Cumulative cash expenditure, to date, classified as \"Programs\" (see docs/refund-and-financial-policy.md section 2) — excludes administration and fundraising costs.",
      fr: "Dépenses en espèces cumulatives, à ce jour, classées comme « Programmes » (voir docs/refund-and-financial-policy.md, section 2) — exclut les frais d'administration et de collecte de fonds.",
    },
    source_internal: "Confirmed by site administrator via chat during development — not independently audited against finance records.",
    verified_by: "Site administrator (chat confirmation, not an independent audit)",
    verified_at: "2026-09-16",
    public: true,
  },
  {
    metric_id: "volunteers",
    title: { en: "Volunteers", fr: "Bénévoles" },
    value: "50+",
    unit: "volunteers",
    period_start: null,
    period_end: null,
    definition: {
      en: "Volunteers contributing time, expertise and energy in Canada and Cameroon.",
      fr: "Bénévoles qui contribuent par leur temps, leur expertise et leur énergie au Canada et au Cameroun.",
    },
    source_internal: "Internal volunteer network headcount — organizational copy per spec section 24, not a claim requiring external proof.",
    verified_by: "Site administrator (organizational headcount, not an audited figure)",
    verified_at: "2026-09-16",
    public: true,
  },
];

export function getPublicMetrics(): ImpactMetric[] {
  return impactMetrics.filter((m) => m.public);
}
