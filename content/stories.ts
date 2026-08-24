import type { Story } from "@/lib/types";

// Empty on purpose — see lib/types.ts. Populate via the CMS once the first
// field update, project update, or report is approved for publication.
export const stories: Story[] = [];

export function getStoryBySlug(locale: "en" | "fr", slug: string): Story | undefined {
  return stories.find((s) => s.slug[locale] === slug);
}
