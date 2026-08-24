import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

// Spec section 68: secure headers.
//
// A nonce-based Content-Security-Policy was attempted here and reverted —
// tested against a real browser, it blocked every Next.js/Turbopack chunk
// script (the framework's own injected <script src> tags don't pick up the
// middleware-set nonce the way Next's docs describe, at least on this
// Next.js 16 + Turbopack setup), which silently breaks all client-side
// interactivity: language switcher, every form, the mobile nav. Shipping
// that would have been worse than shipping no CSP at all. A real CSP needs
// either `output-based hashing (next build` emits per-chunk hashes you can
// collect) or a confirmed-working nonce setup, verified the same way this
// one was disproven: load the production build in an actual browser and
// check the console for CSP violations, not just that the build succeeds.
const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!pathnameHasLocale) {
    const acceptLanguage = request.headers.get("accept-language") ?? "";
    const preferredLocale = locales.find((locale) => acceptLanguage.toLowerCase().includes(locale));
    const locale = preferredLocale ?? defaultLocale;

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    const redirectResponse = NextResponse.redirect(url);
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      redirectResponse.headers.set(key, value);
    }
    return redirectResponse;
  }

  const response = NextResponse.next();
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
