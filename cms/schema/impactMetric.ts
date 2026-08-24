import { localizedField, type SchemaType } from "./types";

// Mirrors lib/types.ts ImpactMetric and spec section 90. `public` gates
// whether the figure may render on the live site at all — see spec section
// 89 ("never publish without proof") and CONTENT-TODO.md.
export const impactMetric: SchemaType = {
  name: "impactMetric",
  title: "Impact Metric",
  type: "document",
  fields: [
    { name: "metricId", title: "Metric ID", type: "string", validation: "required, unique" },
    localizedField("title", "Title"),
    { name: "value", title: "Value", type: "string" },
    { name: "unit", title: "Unit", type: "string" },
    { name: "periodStart", title: "Period start", type: "date" },
    { name: "periodEnd", title: "Period end", type: "date" },
    localizedField("definition", "Definition", "text"),
    { name: "sourceInternal", title: "Internal source / note", type: "text" },
    { name: "verifiedBy", title: "Verified by", type: "string" },
    { name: "verifiedAt", title: "Verified at", type: "datetime" },
    {
      name: "public",
      title: "Public",
      type: "boolean",
      description: "Only renders on the live site once true. Defaults to false.",
      initialValue: false,
      validation: "required",
    },
  ],
};
