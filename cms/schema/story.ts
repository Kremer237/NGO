import { localizedField, type SchemaType } from "./types";

// Mirrors lib/types.ts Story and spec section 36 (Stories & Impact).
export const story: SchemaType = {
  name: "story",
  title: "Story",
  type: "document",
  fields: [
    localizedField("slug", "Slug"),
    localizedField("title", "Title"),
    { name: "date", title: "Date", type: "date", validation: "required" },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["field-updates", "project-updates", "impact", "reports", "news", "calls-to-action"],
      },
      validation: "required",
    },
    { name: "featuredImage", title: "Featured image", type: "image" },
    localizedField("summary", "Summary", "text"),
    localizedField("body", "Body", "text"),
    {
      name: "relatedProject",
      title: "Related project",
      type: "reference",
      to: [{ type: "project" }],
    },
    {
      name: "status",
      title: "Workflow status",
      description: "Spec section 93 — financial/statistical claims need Admin/Finance approval before Published.",
      type: "string",
      options: { list: ["draft", "review", "approved", "published", "archived"] },
      initialValue: "draft",
      validation: "required",
    },
  ],
};
