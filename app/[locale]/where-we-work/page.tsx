import type { Metadata } from "next";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";
import Section from "@/components/Section";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  return { title: dict.whereWeWork.heroTitle, description: dict.whereWeWork.heroText };
}

export default async function WhereWeWorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);

  return (
    <>
      <Section tone="ivory" className="pt-20 md:pt-28">
        <h1 className="max-w-2xl font-heading text-3xl font-semibold leading-tight text-forest md:text-5xl">
          {dict.whereWeWork.heroTitle}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-charcoal/85">{dict.whereWeWork.heroText}</p>
      </Section>

      <Section tone="surface">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex items-center justify-between border border-forest bg-forest/5 px-5 py-4">
            <span className="font-medium text-forest">Cameroon</span>
            <span className="rounded-button bg-forest px-2 py-0.5 text-xs font-medium text-ivory">
              {dict.whereWeWork.activeLabel}
            </span>
          </div>
          {["Central African Republic", "Chad", "Republic of the Congo", "Gabon", "Equatorial Guinea", "Nigeria"].map(
            (country) => (
              <div key={country} className="flex items-center justify-between border border-border px-5 py-4">
                <span className="text-charcoal/70">{country}</span>
                <span className="rounded-button border border-border px-2 py-0.5 text-xs text-slate">
                  {dict.whereWeWork.futureLabel}
                </span>
              </div>
            )
          )}
        </div>
      </Section>
    </>
  );
}
