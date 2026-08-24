import { test, expect } from "@playwright/test";

// Spec section 68. CSP is deliberately not asserted here — see proxy.ts for
// why a nonce-based CSP was tried and reverted after breaking every
// Next.js-injected script in a real browser test.
test("security headers are present on a page response", async ({ page }) => {
  const response = await page.goto("/en");
  const headers = response?.headers() ?? {};
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
  expect(headers["strict-transport-security"]).toContain("max-age=");
});

test("no console or page errors on a hydrated page", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await page.goto("/en", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "FR", exact: true }).click();
  expect(errors).toEqual([]);
});
