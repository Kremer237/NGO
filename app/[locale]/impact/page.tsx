import type { Metadata } from "next";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";
import { impactMetrics } from "@/content/impact-metrics";
import Section from "@/components/Section";
import Metric from "@/components/Metric";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  return { title: dict.nav.impact, description: dict.impact.heroText };
}

export default async function ImpactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);

  return (
    <>
      <Section tone="ivory" className="pt-20 md:pt-28">
        <h1 className="max-w-2xl font-heading text-3xl font-semibold leading-tight text-forest md:text-5xl">
          {dict.impact.heroTitle}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-charcoal/85">{dict.impact.heroText}</p>
      </Section>

      <Section tone="surface">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {impactMetrics.map((m) => (
            <Metric key={m.metric_id} metric={m} locale={locale} pendingLabel={dict.home.impactPendingNote} />
          ))}
        </div>
      </Section>

      <Section tone="ivory">
        <div className="flex flex-wrap gap-3">
          {dict.impact.sections.map((s) => (
            <span key={s} className="rounded-button border border-border px-4 py-2 text-sm text-slate">
              {s}
            </span>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <h2 className="font-heading text-2xl font-semibold text-forest">{dict.impact.reportsTitle}</h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate">{dict.impact.reportsEmpty}</p>
      </Section>
    </>
  );
}
