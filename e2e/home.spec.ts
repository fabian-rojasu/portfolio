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

    const hero = page.locator("section[aria-labelledby=hero-title]");
    const link = hero.getByRole("link", { name: cta });
    await expect(link).toHaveAttribute("href", cv);
    expect((await request.get(cv)).status()).toBe(200);
  });
}

for (const { locale, about, stack } of [
  { locale: "en", about: "Backend first", stack: "Tools I work with" },
  { locale: "es", about: "Backend primero", stack: "Herramientas con las que trabajo" },
]) {
  test(`about and stack sections render in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("#about").getByRole("heading", { level: 2 })).toContainText(about);
    await expect(page.locator("#stack").getByRole("heading", { level: 2 })).toContainText(stack);
    await expect(page.locator("#stack").getByRole("heading", { level: 3 })).toHaveCount(5);
  });
}

test("language switcher keeps the current section", async ({ page }) => {
  await page.goto("/en#stack");
  await page.getByRole("button", { name: "es" }).click();
  await expect(page).toHaveURL(/\/es#stack$/);
});

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

test("sections render in order", async ({ page }) => {
  await page.goto("/en");
  const ids = await page.locator("main > section[id]").evaluateAll((els) => els.map((el) => el.id));
  expect(ids).toEqual(["about", "stack", "work", "experience", "contact"]);
});

test("contact offers email and CV", async ({ page }) => {
  await page.goto("/es");
  const contact = page.locator("#contact");
  await expect(contact.getByRole("link", { name: "Enviar un email" })).toHaveAttribute(
    "href",
    "mailto:rojasugaldefabian@gmail.com",
  );
  await expect(contact.getByRole("link", { name: "Descargar CV" })).toHaveAttribute(
    "href",
    "/cv/CV-Fabian-Rojas-ES.pdf",
  );
});

test("unknown locale returns 404", async ({ request }) => {
  expect((await request.get("/fr")).status()).toBe(404);
});

test("unknown path shows the localized 404 page", async ({ page }) => {
  const response = await page.goto("/es/no-existe");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("404");
  await expect(page.getByRole("link", { name: "Volver al inicio" })).toBeVisible();
});

test("sitemap, robots and social image are served", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("/es/work/plan21-agro-api");
  expect((await request.get("/robots.txt")).status()).toBe(200);

  const image = await request.get("/en/opengraph-image");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
});
