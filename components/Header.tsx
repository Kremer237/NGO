"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { otherLocale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";
import Container from "./Container";
import Button from "./Button";

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/our-work`, label: dict.nav.ourWork },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/impact`, label: dict.nav.impact },
    { href: `/${locale}/stories`, label: dict.nav.stories },
    { href: `/${locale}/volunteer`, label: dict.nav.getInvolved },
  ];

  const altHref = pathname?.replace(`/${locale}`, `/${otherLocale(locale)}`) || `/${otherLocale(locale)}`;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-ivory/95 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Image src="/brand/mark-color.svg" alt="" width={22} height={24} className="shrink-0" priority />
          <span className="font-heading text-lg font-semibold tracking-tight text-forest">
            No African Child Left Behind
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-charcoal hover:text-forest">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link href={altHref} className="text-sm font-medium text-slate hover:text-forest" aria-label="Switch language">
            {otherLocale(locale).toUpperCase()}
          </Link>
          <Button href={`/${locale}/donate`} variant="primary">
            {dict.nav.donate}
          </Button>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-6 bg-forest" />
            <span className="block h-0.5 w-6 bg-forest" />
            <span className="block h-0.5 w-6 bg-forest" />
          </div>
        </button>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-ivory lg:hidden">
          <Container className="flex flex-col gap-4 py-6">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-base font-medium text-charcoal" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href={altHref} className="text-base font-medium text-slate">
              {otherLocale(locale).toUpperCase()}
            </Link>
            <Button href={`/${locale}/donate`} variant="primary" className="w-full">
              {dict.nav.donate}
            </Button>
          </Container>
        </nav>
      )}
    </header>
  );
}
