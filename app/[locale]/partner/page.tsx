import type { Metadata } from "next";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";
import { getAuthorizedPartners } from "@/content/partners";
import Section from "@/components/Section";
import Button from "@/components/Button";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  return { title: dict.nav.partner, description: dict.partner.heroTitle };
}

export default async function PartnerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  const partners = getAuthorizedPartners();

  return (
    <>
      <Section tone="ivory" className="pt-20 md:pt-28">
        <h1 className="max-w-2xl font-heading text-3xl font-semibold leading-tight text-forest md:text-5xl">
          {dict.partner.heroTitle}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-charcoal/85">{dict.partner.heroText}</p>
        <Button href={`/${locale}/contact`} variant="primary" className="mt-8">
          {dict.partner.cta}
        </Button>
      </Section>

      {partners.length > 0 && (
        <Section tone="surface">
          <h2 className="font-heading text-xl font-semibold text-forest">{dict.partner.currentPartnersTitle}</h2>
          <div className="mt-6 flex flex-wrap gap-6">
            {partners.map((p) => (
              <span key={p.partner_name} className="border border-border px-6 py-4 text-sm text-charcoal">
                {p.partner_name}
              </span>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
