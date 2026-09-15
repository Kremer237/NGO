import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";
import { getPublishedStories } from "@/lib/stories-repo";
import Section from "@/components/Section";

// Story content is admin-managed (app/admin/posts) — revalidate periodically
// rather than serving a build-time snapshot forever.
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  return { title: dict.stories.heroTitle };
}

export default async function StoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  const stories = await getPublishedStories();

  return (
    <Section tone="ivory" className="pt-20 md:pt-28">
      <h1 className="max-w-2xl font-heading text-3xl font-semibold leading-tight text-forest md:text-5xl">
        {dict.stories.heroTitle}
      </h1>
      <div className="mt-6 flex flex-wrap gap-3">
        {dict.stories.categories.map((c) => (
          <span key={c} className="rounded-button border border-border px-4 py-2 text-sm text-slate">
            {c}
          </span>
        ))}
      </div>

      {stories.length === 0 ? (
        <p className="mt-12 max-w-md text-sm leading-relaxed text-slate">{dict.stories.empty}</p>
      ) : (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <Link
              key={story.slug[locale]}
              href={`/${locale}/stories/${story.slug[locale]}`}
              className="border border-border bg-surface p-6 hover:border-forest"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-ochre">{story.category}</p>
              <h2 className="mt-2 font-heading text-lg font-semibold text-forest">{story.title[locale]}</h2>
              <p className="mt-2 text-sm text-slate">{story.summary[locale]}</p>
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}
