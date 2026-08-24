import { localizedField, type SchemaType } from "./types";

// Mirrors lib/types.ts Partner and spec section 50. A logo only renders on
// the live site when logoUsageAuthorized is explicitly true.
export const partner: SchemaType = {
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    { name: "partnerName", title: "Partner name", type: "string", validation: "required" },
    { name: "website", title: "Website", type: "url" },
    { name: "logo", title: "Logo", type: "image" },
    {
      name: "logoUsageAuthorized",
      title: "Logo/name usage authorized",
      type: "boolean",
      description: "Must be explicitly granted by the partner before the logo (or name) appears publicly.",
      initialValue: false,
      validation: "required",
    },
    localizedField("description", "Description", "text"),
    { name: "partnershipType", title: "Partnership type", type: "string" },
    { name: "active", title: "Active", type: "boolean", initialValue: true },
  ],
};
