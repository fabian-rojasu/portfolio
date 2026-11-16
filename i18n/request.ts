import * as rootParams from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// An explicit locale (e.g. getTranslations({ locale }) in metadata routes) wins over the root param
export default getRequestConfig(async ({ locale: requested }) => {
  const locale = requested ?? (await rootParams.locale());
  if (!hasLocale(routing.locales, locale)) notFound();

  return {
    locale,
    timeZone: "America/Costa_Rica",
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
