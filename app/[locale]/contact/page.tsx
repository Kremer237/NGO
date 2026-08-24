import type { Metadata } from "next";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  return { title: dict.contact.heroTitle };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);

  return (
    <Section tone="ivory" className="pt-20 md:pt-28">
      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <h1 className="font-heading text-3xl font-semibold leading-tight text-forest md:text-5xl">
            {dict.contact.heroTitle}
          </h1>
          <dl className="mt-10 flex flex-col gap-6">
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate">{dict.contact.email}</dt>
              <dd className="mt-1 text-base text-charcoal">
                <a href="mailto:noafricanchildleftbehind@outlook.com" className="hover:underline">
                  noafricanchildleftbehind@outlook.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate">{dict.contact.phone}</dt>
              <dd className="mt-1 text-base text-charcoal">
                <a href="tel:+14168337164" className="hover:underline">
                  +1 416 833 7164
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <ContactForm dict={dict} locale={locale} />
      </div>
    </Section>
  );
}
