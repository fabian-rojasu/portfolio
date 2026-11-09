import { expect, test } from "@playwright/test";

test("root redirects to the default locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

for (const { locale, cv, cta } of [
  { locale: "en", cv: "/cv/CV-Fabian-Rojas-EN.pdf", cta: "Download CV" },
  { locale: "es", cv: "/cv/CV-Fabian-Rojas-ES.pdf", cta: "Descargar CV" },
]) {
  test(`hero renders in ${locale} and links the matching CV`, async ({ page, request }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.getByRole("heading", { level: 1, name: "Fabián Rojas Ugalde" })).toBeVisible();

    const link = page.getByRole("link", { name: cta });
    await expect(link).toHaveAttribute("href", cv);
    expect((await request.get(cv)).status()).toBe(200);
  });
}

test("language switcher changes the route", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("button", { name: "es" }).click();
  await expect(page).toHaveURL(/\/es$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});

test("page has no horizontal overflow", async ({ page }) => {
  await page.goto("/en");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("unknown locale returns 404", async ({ request }) => {
  expect((await request.get("/fr")).status()).toBe(404);
});
