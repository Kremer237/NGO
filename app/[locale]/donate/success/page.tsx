import type { Metadata } from "next";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";
import Section from "@/components/Section";
import Button from "@/components/Button";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  return { title: dict.donateSuccess.title };
}

export default async function DonateSuccessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);

  return (
    <Section tone="ivory" className="pt-20 md:pt-28">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="font-heading text-3xl font-semibold text-forest md:text-4xl">{dict.donateSuccess.title}</h1>
        <p className="mt-4 text-lg text-charcoal/85">{dict.donateSuccess.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href={`/${locale}/impact`} variant="primary">
            {dict.donateSuccess.ctaWork}
          </Button>
        </div>
      </div>
    </Section>
  );
}
