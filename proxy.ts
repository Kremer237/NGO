import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

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

function withSecurityHeaders(response: NextResponse) {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

// /admin isn't locale-prefixed (it's an internal tool, English-only by
// design — spec section 65's admin panel isn't part of the bilingual
// public site) so it needs its own branch before the locale logic below,
// which would otherwise treat "/admin/..." as a path missing a locale
// prefix and redirect it to "/en/admin/...".
async function handleAdmin(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return withSecurityHeaders(NextResponse.next());
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  if (!session) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    return withSecurityHeaders(NextResponse.redirect(loginUrl));
  }

  if (pathname.startsWith("/admin/users") && session.role !== "super_admin") {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/admin";
    dashboardUrl.searchParams.set("denied", "1");
    return withSecurityHeaders(NextResponse.redirect(dashboardUrl));
  }

  return withSecurityHeaders(NextResponse.next());
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return handleAdmin(request);
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!pathnameHasLocale) {
    const acceptLanguage = request.headers.get("accept-language") ?? "";
    const preferredLocale = locales.find((locale) => acceptLanguage.toLowerCase().includes(locale));
    const locale = preferredLocale ?? defaultLocale;

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return withSecurityHeaders(NextResponse.redirect(url));
  }

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
