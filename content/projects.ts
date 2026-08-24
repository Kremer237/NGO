import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    project_id: "yaounde-school-expansion",
    slug: { en: "yaounde-school-expansion", fr: "agrandissement-scolaire-yaounde" },
    name: {
      en: "The Yaoundé School Expansion Project",
      fr: "Projet d'agrandissement scolaire de Yaoundé",
    },
    category: "education",
    location: "Yaoundé, Cameroon",
    status: "in-progress",
    summary: {
      en: "Expanding educational capacity in Yaoundé to create more space, improve learning conditions and support the long-term development of the school community.",
      fr: "Augmenter la capacité d'accueil d'un établissement scolaire à Yaoundé afin de créer davantage d'espace, améliorer les conditions d'apprentissage et soutenir son développement à long terme.",
    },
    description: {
      en: "Expanding educational capacity in Yaoundé to create more space, improve learning conditions and support the long-term development of the school community.",
      fr: "Augmenter la capacité d'accueil d'un établissement scolaire à Yaoundé afin de créer davantage d'espace, améliorer les conditions d'apprentissage et soutenir son développement à long terme.",
    },
    goal_amount: null,
    currency: null,
    amount_raised: null,
    amount_spent: null,
    start_date: null,
    target_completion_date: null,
    beneficiary_metric: null,
    featured_image: null,
    reports: [],
    data_pending: [
      "official school name",
      "total budget",
      "amount already committed",
      "amount remaining",
      "current capacity",
      "target capacity",
      "number of classrooms added",
      "timeline",
      "completion date",
      "contractor",
      "supporting documents",
    ],
  },
  {
    project_id: "healthcare-access-initiative",
    slug: { en: "healthcare-access-initiative", fr: "initiative-acces-aux-soins" },
    name: {
      en: "Healthcare Access Initiative",
      fr: "Initiative pour l'accès aux soins",
    },
    category: "healthcare",
    location: "Cameroon",
    status: "planning",
    summary: {
      en: "Develop collaborations that improve access to essential healthcare services for children and communities.",
      fr: "Développer des collaborations permettant d'améliorer l'accès aux soins essentiels pour les enfants et les communautés.",
    },
    description: {
      en: "Develop collaborations that improve access to essential healthcare services for children and communities.",
      fr: "Développer des collaborations permettant d'améliorer l'accès aux soins essentiels pour les enfants et les communautés.",
    },
    goal_amount: null,
    currency: null,
    amount_raised: null,
    amount_spent: null,
    start_date: null,
    target_completion_date: null,
    beneficiary_metric: null,
    featured_image: null,
    reports: [],
    data_pending: ["final partnership terms", "hospital partner identity", "program budget"],
  },
  {
    project_id: "community-food-support",
    slug: { en: "community-food-support", fr: "soutien-alimentaire-communautaire" },
    name: {
      en: "Community Food Support",
      fr: "Programme de soutien alimentaire communautaire",
    },
    category: "nutrition",
    location: "Cameroon",
    status: "ongoing",
    summary: {
      en: "Periodic food support initiatives designed to respond to food insecurity and support children and communities.",
      fr: "Des initiatives périodiques d'aide alimentaire destinées à répondre à l'insécurité alimentaire et à soutenir les enfants et les communautés.",
    },
    description: {
      en: "Periodic food support initiatives designed to respond to food insecurity and support children and communities.",
      fr: "Des initiatives périodiques d'aide alimentaire destinées à répondre à l'insécurité alimentaire et à soutenir les enfants et les communautés.",
    },
    goal_amount: null,
    currency: null,
    amount_raised: null,
    amount_spent: null,
    start_date: null,
    target_completion_date: null,
    beneficiary_metric: null,
    featured_image: null,
    reports: [],
    data_pending: ["exact meal count methodology", "reporting period", "supporting records"],
  },
];

export function getProjectBySlug(locale: "en" | "fr", slug: string): Project | undefined {
  return projects.find((p) => p.slug[locale] === slug);
}
