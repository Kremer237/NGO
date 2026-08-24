import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "../globals.css";
import { locales, getDictionary, resolveLocale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkipNav from "@/components/SkipNav";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  return {
    title: { default: dict.meta.siteName, template: `%s — ${dict.meta.siteName}` },
    description: dict.meta.tagline,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      siteName: dict.meta.siteName,
      title: dict.meta.siteName,
      description: dict.meta.tagline,
      locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${manrope.variable} ${inter.variable}`}>
      <body className="bg-ivory font-body text-charcoal antialiased">
        <SkipNav label={dict.nav.skipToContent} />
        <Header locale={locale} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
