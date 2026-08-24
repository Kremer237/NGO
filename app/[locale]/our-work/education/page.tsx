import type { Metadata } from "next";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";
import Section from "@/components/Section";
import Button from "@/components/Button";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  return { title: dict.programs.education.name, description: dict.education.title };
}

export default async function EducationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);

  return (
    <>
      <Section tone="ivory" className="pt-20 md:pt-28">
        <h1 className="max-w-2xl font-heading text-3xl font-semibold leading-tight text-forest md:text-5xl">
          {dict.education.title}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-charcoal/85">{dict.education.text}</p>
      </Section>

      <Section tone="surface">
        <div className="grid gap-8 md:grid-cols-3">
          {dict.education.sections.map((s) => (
            <div key={s.title} className="border-t border-border pt-4">
              <h3 className="font-heading text-lg font-semibold text-forest">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/80">{s.text}</p>
            </div>
          ))}
        </div>
        <Button href={`/${locale}/donate`} variant="primary" className="mt-10">
          {dict.education.cta}
        </Button>
      </Section>
    </>
  );
}
