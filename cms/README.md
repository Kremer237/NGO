# CMS schema (Sanity)

This folder is schema-as-code, authored without a live Sanity project or the `sanity` package as
a dependency (see `schema/types.ts` for why). It mirrors `lib/types.ts` and `content/*.ts` field
for field, so wiring it up later is mechanical rather than a redesign.

## To activate

1. `npx sanity@latest init` in a separate `studio/` directory (or wherever the team wants the
   Studio to live — it doesn't need to be in this repo).
2. For each file in `schema/`, translate the plain-object `SchemaType`/`SchemaField` shape into a
   real `defineType({ ...})` / `defineField({ ...})` call from the `sanity` package. The `name`,
   `title`, `type`, `options`, and `to` values carry over directly; `validation` strings here are
   notes to translate into Sanity's `Rule` builder (e.g. `"required, unique"` →
   `(Rule) => Rule.required()` plus a unique-slug validator).
3. Point `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` (see `.env.example`) at
   the new project.
4. Replace the static arrays in `content/projects.ts`, `content/impact-metrics.ts`,
   `content/partners.ts`, `content/stories.ts` with Sanity fetch calls (`@sanity/client` +
   GROQ queries) returning the same shapes from `lib/types.ts`. Page components don't change.
5. Keep the governance defaults from the schema: `impactMetric.public` defaults to `false`,
   `partner.logoUsageAuthorized` defaults to `false`, `story.status` defaults to `"draft"`. Don't
   flip any of these in bulk migration scripts — each one should be a deliberate editorial
   decision inside the Studio.
