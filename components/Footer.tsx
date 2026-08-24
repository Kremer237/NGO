import Link from "next/link";
import Image from "next/image";
import type { Locale, Dictionary } from "@/lib/i18n";
import Container from "./Container";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  const columns = [
    {
      title: dict.footer.organization,
      links: [
        { href: `/${locale}/about`, label: dict.nav.about },
        { href: `/${locale}/impact`, label: dict.nav.impact },
        { href: `/${locale}/projects`, label: dict.nav.projects },
        { href: `/${locale}/stories`, label: dict.nav.stories },
      ],
    },
    {
      title: dict.footer.getInvolved,
      links: [
        { href: `/${locale}/donate`, label: dict.nav.donate },
        { href: `/${locale}/volunteer`, label: dict.nav.volunteer },
        { href: `/${locale}/partner`, label: dict.nav.partner },
      ],
    },
    {
      title: dict.footer.transparency,
      links: [
        { href: `/${locale}/transparency`, label: dict.transparency.sections.whereMoneyGoes },
        { href: `/${locale}/transparency`, label: dict.transparency.sections.annualReports },
        { href: `/${locale}/transparency`, label: dict.transparency.sections.policies },
      ],
    },
    {
      title: dict.footer.legal,
      links: [
        { href: `/${locale}/privacy`, label: dict.footer.privacy },
        { href: `/${locale}/cookies`, label: dict.footer.cookies },
        { href: `/${locale}/terms`, label: dict.footer.terms },
        { href: `/${locale}/donation-terms`, label: dict.footer.donationTerms },
      ],
    },
  ];

  return (
    <footer className="bg-forest text-ivory">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <Image src="/brand/mark-ivory.svg" alt="" width={26} height={28} className="mb-3" />
            <p className="font-heading text-lg font-semibold">No African Child Left Behind</p>
            <p className="mt-2 text-sm text-ivory/70">{dict.footer.tagline}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold uppercase tracking-wide text-ivory/60">{col.title}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link, i) => (
                  <li key={col.title + i}>
                    <Link href={link.href} className="text-sm text-ivory/85 hover:text-ivory">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-ivory/15 pt-6 text-xs text-ivory/60">
          © {year} {dict.footer.copyright}
        </div>
      </Container>
    </footer>
  );
}
