import { expect, test } from "@playwright/test";

test("a work card opens its case study", async ({ page }) => {
  await page.goto("/en");
  await page.locator("#work").getByRole("link", { name: /desktop to the web/ }).click();
  await expect(page).toHaveURL(/\/en\/work\/softland-alerts$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("desktop to the web");
});

for (const { locale, slug, headings } of [
  { locale: "en", slug: "softland-alerts", headings: ["Context", "Problem", "Architecture", "Technical decisions", "Results"] },
  { locale: "es", slug: "plan21-agro-api", headings: ["Contexto", "Problema", "Arquitectura", "Decisiones técnicas", "Resultados"] },
]) {
  test(`case study ${slug} renders in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}/work/${slug}`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    for (const name of headings) {
      await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
    }
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("language switch keeps the case study", async ({ page }) => {
  await page.goto("/en/work/plan21-agro-api");
  await page.getByRole("button", { name: "es" }).click();
  await expect(page).toHaveURL(/\/es\/work\/plan21-agro-api$/);
});

test("unknown case study returns 404", async ({ request }) => {
  expect((await request.get("/en/work/does-not-exist")).status()).toBe(404);
});
