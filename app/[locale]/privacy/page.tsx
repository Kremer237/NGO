import type { Metadata } from "next";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";
import Section from "@/components/Section";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  return { title: dict.legal.privacyTitle };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);

  return (
    <Section tone="ivory" className="pt-20 md:pt-28">
      <h1 className="font-heading text-3xl font-semibold text-forest md:text-4xl">{dict.legal.privacyTitle}</h1>
      <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate">{dict.legal.pendingNotice}</p>
    </Section>
  );
}
