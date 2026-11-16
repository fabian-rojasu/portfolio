import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { profile, type Locale } from "@/content/profile";
import { LocaleSwitcher } from "@/components/locale-switcher";

const sections = ["about", "work", "experience", "contact"] as const;

export function SiteHeader() {
  const t = useTranslations("header");
  const locale = useLocale() as Locale;

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-10">
      <Link href="/" aria-label={t("home")} className="font-mono text-sm font-medium">
        fabian-rojas
      </Link>
      <nav aria-label={t("navLabel")} className="hidden md:block">
        <ul className="flex gap-6 text-sm text-ink-dim">
          {sections.map((section) => (
            <li key={section}>
              <Link href={`/#${section}`} className="transition-colors hover:text-ink">
                {t(`nav.${section}`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <LocaleSwitcher />
        <a
          href={profile.cv[locale]}
          className="bg-ink px-3 py-1.5 font-mono text-xs text-on-ink transition-colors hover:bg-accent-strong hover:text-white"
        >
          {t("cv")}
        </a>
      </div>
    </header>
  );
}
