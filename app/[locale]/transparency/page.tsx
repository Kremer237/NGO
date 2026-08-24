import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";
import Section from "@/components/Section";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  return { title: dict.transparency.heroTitle };
}

export default async function TransparencyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  const sections = dict.transparency.sections;

  return (
    <>
      <Section tone="ivory" className="pt-20 md:pt-28">
        <h1 className="max-w-2xl font-heading text-3xl font-semibold leading-tight text-forest md:text-5xl">
          {dict.transparency.heroTitle}
        </h1>
      </Section>

      <Section tone="surface">
        <h2 className="font-heading text-xl font-semibold text-forest">{sections.whereMoneyGoes}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {["Programs", "Administration", "Fundraising"].map((cat) => (
            <div key={cat} className="border border-border bg-surface p-6 text-center">
              <p className="font-heading text-2xl font-semibold text-slate">—</p>
              <p className="mt-2 text-sm text-slate">{cat}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-xl text-sm italic text-slate">{dict.transparency.allocationNote}</p>
      </Section>

      <Section tone="ivory">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-heading text-lg font-semibold text-forest">{sections.annualReports}</h2>
            <p className="mt-2 text-sm text-slate">{dict.impact.reportsEmpty}</p>
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-forest">{sections.projectReports}</h2>
            <p className="mt-2 text-sm text-slate">{dict.impact.reportsEmpty}</p>
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-forest">{sections.methodology}</h2>
            <p className="mt-2 text-sm text-slate">{dict.transparency.allocationNote}</p>
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-forest">{sections.policies}</h2>
            <p className="mt-2 text-sm text-slate">{dict.transparency.policiesPending}</p>
            <ul className="mt-3 flex flex-col gap-1 text-sm">
              {[
                { href: "donation-terms", label: dict.footer.donationTerms },
                { href: "privacy", label: dict.footer.privacy },
                { href: "terms", label: dict.footer.terms },
              ].map((p) => (
                <li key={p.href}>
                  <Link href={`/${locale}/${p.href}`} className="text-forest underline underline-offset-2 hover:text-ochre">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
