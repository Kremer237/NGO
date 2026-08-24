import { test, expect } from "@playwright/test";

test("redirects / to a locale root", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/(en|fr)\/?$/);
});

test("homepage renders in English", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Every Child Deserves a Future.");
});

test("homepage renders in French", async ({ page }) => {
  await page.goto("/fr");
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Chaque enfant mérite un avenir.");
});

test("language switcher moves from English to French on the same page", async ({ page }) => {
  await page.goto("/en/about");
  await page.getByRole("link", { name: "FR", exact: true }).click();
  await expect(page).toHaveURL(/\/fr\/about$/);
});

test("primary nav reaches About", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/en\/about$/);
});

test("unknown project slug 404s", async ({ page }) => {
  const response = await page.goto("/en/projects/does-not-exist");
  expect(response?.status()).toBe(404);
});

test("footer legal links resolve", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("link", { name: "Privacy", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/privacy$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Privacy Policy");
});
