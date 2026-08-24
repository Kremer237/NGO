import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { stories, getStoryBySlug } from "@/content/stories";
import Section from "@/components/Section";

export function generateStaticParams() {
  // No stories are published yet — nothing to pre-render. New entries in
  // content/stories.ts (or a future CMS) will be picked up automatically.
  return stories.flatMap((s) => [
    { locale: "en", slug: s.slug.en },
    { locale: "fr", slug: s.slug.fr },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const story = getStoryBySlug(locale, slug);
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
  const story = getStoryBySlug(locale, slug);
  if (!story) notFound();

  return (
    <Section tone="ivory" className="pt-20 md:pt-28">
      <p className="text-xs font-semibold uppercase tracking-wide text-ochre">{story.category}</p>
      <h1 className="mt-3 max-w-2xl font-heading text-3xl font-semibold leading-tight text-forest md:text-5xl">
        {story.title[locale]}
      </h1>
      <p className="mt-2 text-sm text-slate">{story.date}</p>
      <div className="mt-8 max-w-2xl text-base leading-relaxed text-charcoal/85">{story.body[locale]}</div>
    </Section>
  );
}
