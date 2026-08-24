import { localizedField, type SchemaType } from "./types";

// Mirrors spec section 46 (Annual Report / Project Report / Impact Report).
export const report: SchemaType = {
  name: "report",
  title: "Report",
  type: "document",
  fields: [
    localizedField("title", "Title"),
    { name: "year", title: "Year", type: "number", validation: "required" },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["annual", "project", "impact"] },
      validation: "required",
    },
    { name: "language", title: "Language", type: "string", options: { list: ["en", "fr", "both"] } },
    { name: "file", title: "PDF file", type: "url", description: "Link to the uploaded PDF asset." },
    localizedField("summary", "Summary", "text"),
    { name: "date", title: "Publication date", type: "date" },
  ],
};
