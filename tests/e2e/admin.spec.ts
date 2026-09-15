import path from "node:path";
import { test, expect } from "@playwright/test";

// Requires a database with the admin schema applied and two bootstrapped
// accounts (see .github/workflows/ci.yml, which sets this up):
//   editor@e2e.test   / E2eTestPassword123! (content_editor)
//   super@e2e.test    / E2eTestPassword123! (super_admin)
// Skips locally when DATABASE_URL isn't set rather than failing — see
// db/README.md for how to stand up a local Postgres and run this for real.
test.skip(!process.env.DATABASE_URL, "requires DATABASE_URL — see db/README.md");

const PASSWORD = "E2eTestPassword123!";

test("wrong password is rejected with a generic error", async ({ page }) => {
  await page.goto("/admin/login");
  await page.getByLabel("Email").fill("editor@e2e.test");
  await page.getByLabel("Password").fill("not-the-password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText("Incorrect email or password.")).toBeVisible();
  await expect(page).toHaveURL(/\/admin\/login$/);
});

test("unauthenticated access to /admin redirects to login", async ({ page }) => {
  const response = await page.goto("/admin");
  expect(response?.url()).toContain("/admin/login");
});

test("content_editor can write, publish, and see a post go live — but cannot manage users", async ({ page }) => {
  const unique = Date.now();
  const slug = `e2e-post-${unique}`;
  const title = `E2E Test Post ${unique}`;

  await page.goto("/admin/login");
  await page.getByLabel("Email").fill("editor@e2e.test");
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("**/admin");

  // RBAC: a content_editor has no Users nav link and is redirected if they
  // navigate there directly.
  await expect(page.locator("header nav").getByRole("link", { name: "Users" })).toHaveCount(0);
  await page.goto("/admin/users");
  await page.waitForURL("**/admin?denied=1");
  await expect(page.getByText("You don't have access to that page.")).toBeVisible();

  // Write a post with an uploaded image.
  await page.goto("/admin/posts/new");
  await page.getByLabel("Title (English)").fill(title);
  await page.getByLabel("Title (French)").fill("Article de test E2E");
  await page.getByLabel("Slug (English)").fill(slug);
  await page.getByLabel("Slug (French)").fill(`${slug}-fr`);
  await page.getByLabel("Body (English)").fill("This post was created by an automated test.");
  await page.getByLabel("Body (French)").fill("Cet article a été créé par un test automatisé.");
  await page.locator("#featured-image").setInputFiles(path.join(__dirname, "fixtures", "sample-image.png"));
  await expect(page.locator('img[alt=""]')).toBeVisible();
  await page.getByRole("button", { name: "Create post" }).click();
  await page.waitForURL("**/admin/posts");
  await expect(page.getByText(title)).toBeVisible();

  // Draft -> review -> approved -> published.
  await page.getByRole("link", { name: title }).click();
  await expect(page.getByText("Status: draft")).toBeVisible();
  await page.getByRole("button", { name: "Submit for review" }).click();
  await expect(page.getByText("Status: review")).toBeVisible();
  await page.getByRole("button", { name: "Approve" }).click();
  await expect(page.getByText("Status: approved")).toBeVisible();
  await page.getByRole("button", { name: "Publish" }).click();
  await expect(page.getByText("Status: published")).toBeVisible();

  // Public site: fetch the API directly rather than the ISR-cached page,
  // since the public /stories list can lag up to `revalidate` seconds
  // behind a publish — that's expected caching behavior, not something
  // this test should wait out.
  const detail = await page.request.get(`/en/stories/${slug}`);
  expect(detail.ok()).toBe(true);
  expect(await detail.text()).toContain("This post was created by an automated test.");

  await page.getByRole("button", { name: "Sign out" }).click();
  await page.waitForURL("**/admin/login");
  await page.goto("/admin");
  await page.waitForURL("**/admin/login");
});

test("super_admin can create a personnel account with a role", async ({ page }) => {
  const email = `e2e-new-${Date.now()}@e2e.test`;

  await page.goto("/admin/login");
  await page.getByLabel("Email").fill("super@e2e.test");
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("**/admin");

  await page.goto("/admin/users");
  await page.getByLabel("Name").fill("E2E Marketing");
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByLabel("Role").selectOption("marketing");
  await page.getByLabel("Temporary password").fill("AnotherLongPassword123!");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByText(email)).toBeVisible();

  // The new account works and gets the marketing role's (lack of) access.
  await page.getByRole("button", { name: "Sign out" }).click();
  await page.waitForURL("**/admin/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill("AnotherLongPassword123!");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("**/admin");
  await expect(page.locator("header nav").getByRole("link", { name: "Posts" })).toHaveCount(0);
  await expect(page.locator("header nav").getByRole("link", { name: "Users" })).toHaveCount(0);
});
