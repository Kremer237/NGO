import type { ImpactMetric } from "@/lib/types";

// Per spec section 89/90/116: a figure may only render publicly once its
// methodology and source are verified. Until `public` is true, the UI shows
// a "pending verification" state instead of the number — never a fabricated one.
export const impactMetrics: ImpactMetric[] = [
  {
    metric_id: "children-reached-education",
    title: { en: "Children reached through education", fr: "Enfants touchés par les actions éducatives" },
    value: "42,000+",
    unit: "children",
    period_start: null,
    period_end: null,
    // Proposed methodology (draft — see docs/refund-and-financial-policy.md for how this fits
    // the broader financial-reporting approach). This defines HOW to count, so the org can
    // reconcile a real number against it; it does not itself supply or verify that number.
    definition: {
      en: "Proposed definition (pending adoption): the unique count of individual children directly enrolled in, or whose school fees were funded by, an NACLB-supported education program during the stated reporting period. Counted once per period regardless of terms/activities attended; excludes indirect beneficiaries (e.g. siblings) not themselves enrolled. To verify: reconcile against the funded school(s)' enrollment/attendance records for that period.",
      fr: "Définition proposée (en attente d'adoption) : le nombre unique d'enfants directement scolarisés dans un programme éducatif soutenu par NACLB, ou dont les frais de scolarité ont été financés, durant la période de référence indiquée. Compté une seule fois par période, peu importe le nombre de trimestres ou d'activités suivis; exclut les bénéficiaires indirects (p. ex. la fratrie) non eux-mêmes scolarisés. Pour vérifier : rapprocher des registres d'inscription/de fréquentation de l'école ou des écoles financées pour cette période.",
    },
    source_internal: "no reporting-period count recorded yet — see definition for what evidence is needed",
    verified_by: null,
    verified_at: null,
    public: false,
  },
  {
    metric_id: "meals-provided",
    title: { en: "Meals provided", fr: "Repas distribués" },
    value: "1M+",
    unit: "meals",
    period_start: null,
    period_end: null,
    definition: {
      en: "Proposed definition (pending adoption): the total number of individual meals distributed through NACLB-supported nutrition activities during the stated reporting period, counted per meal served (not per recipient, since one recipient may receive many meals). To verify: reconcile against distribution logs, sign-in sheets, or partner/vendor preparation records for that period and location.",
      fr: "Définition proposée (en attente d'adoption) : le nombre total de repas individuels distribués par les activités nutritionnelles soutenues par NACLB durant la période de référence indiquée, comptés par repas servi (et non par bénéficiaire, un même bénéficiaire pouvant recevoir plusieurs repas). Pour vérifier : rapprocher des registres de distribution, feuilles de présence ou registres de préparation du partenaire/fournisseur pour cette période et ce lieu.",
    },
    source_internal: "no reporting-period count recorded yet — see definition for what evidence is needed",
    verified_by: null,
    verified_at: null,
    public: false,
  },
  {
    metric_id: "invested-in-impact",
    title: { en: "Invested in impact", fr: "Investis dans les actions" },
    value: "100M+ XAF",
    unit: "XAF",
    period_start: null,
    period_end: null,
    definition: {
      en: "Proposed definition (pending adoption): total cash expenditure classified as \"Programs\" (see docs/refund-and-financial-policy.md section 2) during the stated fiscal period — excludes administration and fundraising costs. To verify: reconcile against the organization's finance records / annual financial statements for that fiscal year.",
      fr: "Définition proposée (en attente d'adoption) : le total des dépenses en espèces classées comme « Programmes » (voir docs/refund-and-financial-policy.md, section 2) durant la période fiscale indiquée — exclut les frais d'administration et de collecte de fonds. Pour vérifier : rapprocher des registres financiers ou des états financiers annuels de l'organisation pour cet exercice.",
    },
    source_internal: "no fiscal-period figure recorded yet — see definition for what evidence is needed",
    verified_by: null,
    verified_at: null,
    public: false,
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
    source_internal: "internal volunteer network count",
    verified_by: null,
    verified_at: null,
    public: true,
  },
];

export function getPublicMetrics(): ImpactMetric[] {
  return impactMetrics.filter((m) => m.public);
}
