import type { Metadata } from "next";
import { resolveLocale } from "@/lib/i18n";
import { termsOfUse } from "@/content/legal";
import LegalDocumentView from "@/components/LegalDocument";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  return { title: termsOfUse.title[locale] };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  return <LegalDocumentView doc={termsOfUse} locale={locale} />;
}
