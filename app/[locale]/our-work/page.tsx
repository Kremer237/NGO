import type { Metadata } from "next";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";
import Section from "@/components/Section";
import ProgramCard from "@/components/ProgramCard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  return { title: dict.nav.ourWork, description: dict.ourWork.heroTitle };
}

export default async function OurWorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);

  return (
    <>
      <Section tone="ivory" className="pt-20 md:pt-28">
        <h1 className="max-w-2xl font-heading text-3xl font-semibold leading-tight text-forest md:text-5xl">
          {dict.ourWork.heroTitle}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-charcoal/85">{dict.ourWork.intro}</p>
      </Section>

      <Section tone="surface">
        <div className="grid gap-6 md:grid-cols-3">
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
    </>
  );
}
