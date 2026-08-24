import { localizedField, type SchemaType } from "./types";

// Singleton document — spec section 45 (Where Your Money Goes) and section
// 116 (org-level fields that must never be invented in code).
export const siteSettings: SchemaType = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "legalName", title: "Full legal name", type: "string" },
    { name: "arcRegistrationNumber", title: "ARC (CRA) registration number", type: "string" },
    { name: "legalAddress", title: "Registered legal address", type: "text" },
    {
      name: "allocationProgram",
      title: "Allocation — Programs (%)",
      type: "number",
      description: "Leave empty until the fiscal-period breakdown is finalized and verified.",
    },
    { name: "allocationAdministration", title: "Allocation — Administration (%)", type: "number" },
    { name: "allocationFundraising", title: "Allocation — Fundraising (%)", type: "number" },
    { name: "allocationPeriod", title: "Allocation fiscal period", type: "string" },
    localizedField("refundPolicy", "Refund policy", "text"),
    localizedField("financialPolicy", "Internal financial policy summary", "text"),
    { name: "receiptIssuanceProcedure", title: "Receipt issuance procedure", type: "text" },
    { name: "contactEmail", title: "Contact email", type: "string" },
    { name: "contactPhone", title: "Contact phone", type: "string" },
  ],
};
