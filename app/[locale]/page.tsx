import type { Metadata } from "next";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";
import { impactMetrics } from "@/content/impact-metrics";
import { projects } from "@/content/projects";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Metric from "@/components/Metric";
import ProgramCard from "@/components/ProgramCard";
import ProgressIndicator from "@/components/ProgressIndicator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  return { title: dict.home.heroTitle, description: dict.home.heroText };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  const featured = projects[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: dict.meta.siteName,
    description: dict.meta.tagline,
    areaServed: "Cameroon",
    slogan: dict.home.heroTitle,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Section tone="ivory" className="pt-20 md:pt-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre">{dict.home.eyebrow}</p>
        <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-tight text-forest md:text-6xl">
          {dict.home.heroTitle}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/85">{dict.home.heroText}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href={`/${locale}/impact`} variant="primary">
            {dict.home.heroCtaPrimary}
          </Button>
          <Button href={`/${locale}/donate`} variant="secondary">
            {dict.home.heroCtaSecondary}
          </Button>
        </div>
        <p className="mt-6 text-xs text-slate">{dict.home.heroMicrocopy}</p>
      </Section>

      <Section tone="surface">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-semibold text-forest md:text-3xl">{dict.home.manifestoTitle}</h2>
          <div className="mt-6 flex flex-col gap-3 text-base leading-relaxed text-charcoal/85">
            {dict.home.manifesto.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="ivory">
        <h2 className="font-heading text-2xl font-semibold text-forest md:text-3xl">{dict.home.impactTitle}</h2>
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          {impactMetrics.map((m) => (
            <Metric key={m.metric_id} metric={m} locale={locale} pendingLabel={dict.home.impactPendingNote} />
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <h2 className="font-heading text-2xl font-semibold text-forest md:text-3xl">{dict.home.programsTitle}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <ProgramCard
            name={dict.programs.education.name}
            text={dict.programs.education.text}
            cta={dict.programs.education.cta}
            href={`/${locale}/our-work/education`}
          />
          <ProgramCard
            name={dict.programs.nutrition.name}
            text={dict.programs.nutrition.text}
            cta={dict.programs.nutrition.cta}
            href={`/${locale}/our-work/nutrition`}
          />
          <ProgramCard
            name={dict.programs.healthcare.name}
            text={dict.programs.healthcare.text}
            cta={dict.programs.healthcare.cta}
            href={`/${locale}/our-work/healthcare`}
            badge={dict.programs.healthcare.badge}
          />
        </div>
      </Section>

      <Section tone="ivory">
        <p className="text-xs font-semibold uppercase tracking-wide text-ochre">{dict.home.featuredProjectLabel}</p>
        <h2 className="mt-3 font-heading text-2xl font-semibold text-forest md:text-3xl">{featured.name[locale]}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal/85">{featured.summary[locale]}</p>
        <div className="mt-6 max-w-md">
          <ProgressIndicator
            raisedLabel={dict.projects.progress.raised}
            goalLabel={dict.projects.progress.goal}
            pendingNote={dict.projects.progress.pendingNote}
          />
        </div>
        <Button href={`/${locale}/projects/${featured.slug[locale]}`} variant="secondary" className="mt-6">
          {dict.home.featuredProjectCta}
        </Button>
      </Section>

      <Section tone="surface">
        <h2 className="font-heading text-2xl font-semibold text-forest md:text-3xl">{dict.home.whatsNextTitle}</h2>
        <p className="mt-3 max-w-xl text-sm text-slate">{dict.home.whatsNextIntro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {dict.home.whatsNextAreas.map((area) => (
            <span key={area} className="rounded-button border border-border px-4 py-2 text-sm text-slate">
              {area}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
