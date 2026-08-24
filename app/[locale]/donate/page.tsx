import type { Metadata } from "next";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";
import { projects } from "@/content/projects";
import Section from "@/components/Section";
import DonateForm from "@/components/DonateForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  return { title: dict.donate.heroTitle, description: dict.donate.heroText };
}

export default async function DonatePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);

  return (
    <Section tone="ivory" className="pt-20 md:pt-28">
      <div className="mx-auto max-w-xl">
        <h1 className="font-heading text-3xl font-semibold leading-tight text-forest md:text-4xl">
          {dict.donate.heroTitle}
        </h1>
        <p className="mt-4 text-lg text-charcoal/85">{dict.donate.heroText}</p>
        <div className="mt-10">
          <DonateForm dict={dict} locale={locale} projects={projects} />
        </div>
      </div>
    </Section>
  );
}
