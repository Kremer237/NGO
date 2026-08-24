import { test, expect } from "@playwright/test";

test("contact form submits successfully with valid data", async ({ page }) => {
  await page.goto("/en/contact");
  await page.getByLabel("Name", { exact: true }).fill("Jane Doe");
  await page.getByLabel("Email", { exact: true }).fill("jane@example.com");
  await page.getByLabel("Message", { exact: true }).fill("Hello, I'd like to learn more.");
  await page.getByLabel("I consent to my information being used to respond to this message").check();
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByText("Thank you. Your message has been received.")).toBeVisible();
});

test("volunteer form submits successfully with required fields", async ({ page }) => {
  await page.goto("/en/volunteer");
  await page.getByLabel("First name").fill("Jane");
  await page.getByLabel("Last name").fill("Doe");
  await page.getByLabel("Email", { exact: true }).fill("jane@example.com");
  await page.getByLabel("Country").fill("Canada");
  await page.getByLabel("I confirm I am 18 years of age or older").check();
  await page.getByLabel("I consent to my information being used to process this application").check();
  await page.getByRole("button", { name: "Submit Application" }).click();
  await expect(page.getByText("Thank you. Your message has been received.")).toBeVisible();
});

test("donate form shows the honest pending-payment note instead of a fake success", async ({ page }) => {
  await page.goto("/en/donate");
  await page.getByRole("button", { name: "$50", exact: true }).click();
  await page.getByRole("button", { name: "Continue to Payment" }).click();
  await expect(page.getByText("Online payment processing is being finalized")).toBeVisible();
  await expect(page.getByText("Thank you for helping build a future.")).toHaveCount(0);
});
