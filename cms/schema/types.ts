// Minimal shape mirroring Sanity's `defineField`/`defineType` so this schema
// can be authored and type-checked without adding the `sanity` package as a
// dependency of the Next.js app. Once a Sanity Studio project exists, these
// fields map directly onto `defineField({ ...field })` calls — see
// cms/README.md for the wiring steps.
export interface SchemaField {
  name: string;
  title: string;
  type:
    | "string"
    | "text"
    | "number"
    | "boolean"
    | "date"
    | "datetime"
    | "slug"
    | "image"
    | "url"
    | "array"
    | "object"
    | "reference";
  description?: string;
  of?: SchemaField[] | { type: string; to?: { type: string }[] }[];
  to?: { type: string }[];
  fields?: SchemaField[];
  options?: Record<string, unknown>;
  validation?: string;
  initialValue?: unknown;
}

export interface SchemaType {
  name: string;
  title: string;
  type: "document" | "object";
  fields: SchemaField[];
}

// A field pair for bilingual (EN/FR) text, matching every `{ en, fr }` shape
// used throughout lib/types.ts and content/*.ts.
export function localizedField(name: string, title: string, type: "string" | "text" = "string"): SchemaField {
  return {
    name,
    title,
    type: "object",
    fields: [
      { name: "en", title: "English", type },
      { name: "fr", title: "Français", type },
    ],
  };
}
