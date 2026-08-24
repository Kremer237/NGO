import type { Metadata } from "next";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";
import Section from "@/components/Section";

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
      <p className="mt-12 max-w-md text-sm leading-relaxed text-slate">{dict.stories.empty}</p>
    </Section>
  );
}
