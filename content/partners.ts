import type { Partner } from "@/lib/types";

// Logo only renders when logo_usage_authorized is explicitly true (spec section 50).
export const partners: Partner[] = [
  {
    partner_name: "Complexe scolaire Saint-Marc",
    website: null,
    logo: null,
    logo_usage_authorized: false,
    description: {
      en: "School partner in Cameroon.",
      fr: "Partenaire scolaire au Cameroun.",
    },
    partnership_type: "education",
    active: true,
  },
];

export function getAuthorizedPartners(): Partner[] {
  return partners.filter((p) => p.active && p.logo_usage_authorized);
}
