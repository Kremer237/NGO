import type { Metadata } from "next";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";
import Section from "@/components/Section";
import Button from "@/components/Button";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  return { title: dict.programs.nutrition.name, description: dict.nutrition.title };
}

export default async function NutritionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);

  return (
    <Section tone="ivory" className="pt-20 md:pt-28">
      <h1 className="max-w-2xl font-heading text-3xl font-semibold leading-tight text-forest md:text-5xl">
        {dict.nutrition.title}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-charcoal/85">{dict.nutrition.text}</p>
      <Button href={`/${locale}/donate`} variant="primary" className="mt-10">
        {dict.nutrition.cta}
      </Button>
    </Section>
  );
}
