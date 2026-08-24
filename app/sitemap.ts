import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { projects } from "@/content/projects";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://noafricanchildleftbehind.org";

const staticPaths = [
  "",
  "about",
  "our-work",
  "our-work/education",
  "our-work/nutrition",
  "our-work/healthcare",
  "projects",
  "impact",
  "where-we-work",
  "stories",
  "transparency",
  "donate",
  "volunteer",
  "partner",
  "contact",
  "privacy",
  "cookies",
  "terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${BASE_URL}/${locale}${path ? `/${path}` : ""}`,
        lastModified: new Date(),
      });
    }
    for (const project of projects) {
      entries.push({
        url: `${BASE_URL}/${locale}/projects/${project.slug[locale]}`,
        lastModified: new Date(),
      });
    }
  }

  return entries;
}
