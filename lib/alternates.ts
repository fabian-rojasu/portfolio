import { routing } from "@/i18n/routing";

// Canonical URL plus hreflang links for a path below the locale ("" for home)
export function alternates(locale: string, path = "") {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
      "x-default": `/${routing.defaultLocale}${path}`,
    },
  };
}
