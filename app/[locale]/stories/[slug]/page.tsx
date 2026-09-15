import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { getStoryBySlug as getStaticStoryBySlug } from "@/content/stories";
import { getPublishedStoryBySlug } from "@/lib/stories-repo";
import Section from "@/components/Section";

// New stories are created through /admin/posts after deploy, so slugs
// aren't known at build time — dynamicParams (default true) lets Next
// render any slug on demand and cache it for `revalidate` seconds.
export const revalidate = 60;

export async function generateStaticParams() {
  // Nothing to pre-render — every published story is fetched on demand.
  return [];
}

async function resolveStory(locale: "en" | "fr", slug: string) {
  return (await getPublishedStoryBySlug(locale, slug)) ?? getStaticStoryBySlug(locale, slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const story = await resolveStory(locale, slug);
  const dict = getDictionary(locale);
  if (!story) return { title: dict.stories.heroTitle };
  return { title: story.title[locale], description: story.summary[locale] };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const story = await resolveStory(locale, slug);
  if (!story) notFound();

  return (
    <Section tone="ivory" className="pt-20 md:pt-28">
      <p className="text-xs font-semibold uppercase tracking-wide text-ochre">{story.category}</p>
      <h1 className="mt-3 max-w-2xl font-heading text-3xl font-semibold leading-tight text-forest md:text-5xl">
        {story.title[locale]}
      </h1>
      <p className="mt-2 text-sm text-slate">{new Date(story.date).toLocaleDateString(locale)}</p>
      <div className="mt-8 max-w-2xl whitespace-pre-wrap text-base leading-relaxed text-charcoal/85">
        {story.body[locale]}
      </div>
    </Section>
  );
}
