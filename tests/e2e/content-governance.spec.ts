import { test, expect } from "@playwright/test";

// Locks in the rule from spec section 89/90: unverified figures must never
// render as fact. If someone flips a metric to `public: true` without real
// data, or hardcodes a number back in, this test should catch it.
test("unverified impact metrics render as pending, not as numbers", async ({ page }) => {
  await page.goto("/en/impact");

  const childrenMetric = page.getByText("Children reached through education");
  await expect(childrenMetric).toBeVisible();
  const childrenCard = childrenMetric.locator("..");
  await expect(childrenCard).not.toContainText("42,000");
  await expect(childrenCard.getByText("—")).toBeVisible();

  const mealsMetric = page.getByText("Meals provided");
  const mealsCard = mealsMetric.locator("..");
  await expect(mealsCard).not.toContainText("1M+");
});

test("the one verified metric (volunteers) does render its value", async ({ page }) => {
  await page.goto("/en/impact");
  const volunteersCard = page.getByText("Volunteers", { exact: true }).locator("..");
  await expect(volunteersCard).toContainText("50+");
});

test("transparency page shows no invented allocation percentages", async ({ page }) => {
  await page.goto("/en/transparency");
  await expect(page.getByText("Programs", { exact: true })).toBeVisible();
  const body = page.locator("main");
  await expect(body).not.toContainText("%");
});

test("partner section is hidden until logo usage is authorized", async ({ page }) => {
  await page.goto("/en/partner");
  await expect(page.getByText("Complexe scolaire Saint-Marc")).toHaveCount(0);
});
