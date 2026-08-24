import { localizedField, type SchemaType } from "./types";

// Mirrors lib/types.ts Project and spec section 30's required CMS field list.
export const project: SchemaType = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "projectId", title: "Project ID", type: "string", validation: "required, unique" },
    localizedField("slug", "Slug"),
    localizedField("name", "Name"),
    {
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["education", "nutrition", "healthcare"] },
      validation: "required",
    },
    { name: "location", title: "Location", type: "string" },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["planning", "fundraising", "in-progress", "completed", "ongoing"] },
      validation: "required",
    },
    localizedField("summary", "Summary"),
    localizedField("description", "Description", "text"),
    { name: "goalAmount", title: "Goal amount", type: "number" },
    { name: "currency", title: "Currency", type: "string", options: { list: ["CAD", "USD", "XAF"] } },
    { name: "amountRaised", title: "Amount raised", type: "number" },
    { name: "amountSpent", title: "Amount spent", type: "number" },
    { name: "startDate", title: "Start date", type: "date" },
    { name: "targetCompletionDate", title: "Target completion date", type: "date" },
    { name: "beneficiaryMetric", title: "Beneficiary metric", type: "string" },
    { name: "featuredImage", title: "Featured image", type: "image" },
    {
      name: "reports",
      title: "Reports",
      type: "array",
      of: [{ type: "reference", to: [{ type: "report" }] }],
    },
    {
      name: "dataPending",
      title: "Data pending verification",
      description: "Fields intentionally left blank pending confirmation — never populate with invented figures.",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};
