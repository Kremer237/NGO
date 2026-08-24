import type { Metadata } from "next";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";
import Section from "@/components/Section";
import Button from "@/components/Button";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  return { title: dict.programs.healthcare.name, description: dict.healthcare.title };
}

export default async function HealthcarePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);

  return (
    <Section tone="ivory" className="pt-20 md:pt-28">
      <span className="rounded-button border border-ochre px-3 py-1 text-xs font-medium text-ochre">
        {dict.healthcare.status}
      </span>
      <h1 className="mt-6 max-w-2xl font-heading text-3xl font-semibold leading-tight text-forest md:text-5xl">
        {dict.healthcare.title}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-charcoal/85">{dict.healthcare.text}</p>
      <p className="mt-4 max-w-xl text-sm italic text-slate">{dict.healthcare.note}</p>
      <Button href={`/${locale}/contact`} variant="secondary" className="mt-10">
        {dict.healthcare.cta}
      </Button>
    </Section>
  );
}
