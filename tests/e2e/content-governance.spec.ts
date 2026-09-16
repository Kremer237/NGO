import { test, expect } from "@playwright/test";
import { impactMetrics } from "../../content/impact-metrics";

// Locks in the rule from spec section 89/90: a figure may only go public
// once someone has actually confirmed it — this checks the discipline
// itself (every public metric records who/when), not a specific snapshot
// of which metrics happen to be public today. Whichever metrics are
// public: true, none of them got there without attribution.
test("no impact metric is public without recorded verification", async () => {
  for (const metric of impactMetrics) {
    if (metric.public) {
      expect(metric.verified_by, `${metric.metric_id} is public but has no verified_by`).toBeTruthy();
      expect(metric.verified_at, `${metric.metric_id} is public but has no verified_at`).toBeTruthy();
    }
  }
});

test("public impact metrics render their real values on the live page", async ({ page }) => {
  await page.goto("/en/impact");
  for (const metric of impactMetrics.filter((m) => m.public)) {
    const card = page.getByText(metric.title.en, { exact: true }).locator("..");
    await expect(card).toContainText(metric.value!);
  }
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
