import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Spec section 97: automated tools (Lighthouse, axe) plus manual checks
// (keyboard-only, screen readers, 200% zoom, reduced motion) — this covers
// the automated half across the main content pages, in both locales.
const pages = [
  "/en",
  "/en/about",
  "/en/our-work",
  "/en/projects",
  "/en/impact",
  "/en/donate",
  "/en/volunteer",
  "/en/contact",
  "/fr",
  "/fr/about",
  "/fr/donate",
];

for (const path of pages) {
  test(`no automatic WCAG 2 AA violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

test("reduced-motion preference collapses button transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  const seconds = await page.evaluate(() => {
    const el = document.querySelector("a, button");
    const raw = el ? getComputedStyle(el).transitionDuration : null;
    // Parses "0s", "1e-06s", "0.001ms", etc. into a plain number of seconds.
    if (!raw) return null;
    const match = raw.match(/^([\d.e+-]+)(m?s)$/);
    if (!match) return null;
    const value = parseFloat(match[1]);
    return match[2] === "ms" ? value / 1000 : value;
  });
  // globals.css forces transition-duration to 0.001ms !important under
  // prefers-reduced-motion — effectively zero, well under a real transition's duration.
  expect(seconds).not.toBeNull();
  expect(seconds!).toBeLessThan(0.01);
});
