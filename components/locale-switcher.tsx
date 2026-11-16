"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const t = useTranslations("header");
  const current = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav aria-label={t("language")} className="flex gap-1 font-mono text-xs">
      {routing.locales.map((locale) => (
        <button
          key={locale}
          type="button"
          lang={locale}
          aria-current={locale === current ? "true" : undefined}
          // Keep the section the reader is on when switching language
          onClick={() => router.replace(`${pathname}${window.location.hash}`, { locale })}
          className="px-2 py-1 text-muted uppercase decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-ink aria-[current]:text-ink aria-[current]:underline"
        >
          {locale}
        </button>
      ))}
    </nav>
  );
}
