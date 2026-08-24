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
    definition: {
      en: "Methodology under review — precise definition (individually enrolled children, educational beneficiaries, cumulative participations, or children whose fees were funded) not yet finalized.",
      fr: "Méthodologie en cours de validation — définition précise (enfants scolarisés individuellement, bénéficiaires éducatifs, participations cumulées, ou enfants dont les frais ont été financés) non encore arrêtée.",
    },
    source_internal: null,
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
      en: "Pending supporting records and exact reporting period.",
      fr: "En attente des pièces justificatives et de la période exacte de référence.",
    },
    source_internal: null,
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
      en: "Pending finance-team verification against annual financial reporting.",
      fr: "En attente de vérification par l'équipe finance au regard des rapports financiers annuels.",
    },
    source_internal: null,
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
