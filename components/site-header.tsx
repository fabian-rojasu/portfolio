import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { profile, type Locale } from "@/content/profile";
import { LocaleSwitcher } from "@/components/locale-switcher";

export function SiteHeader() {
  const t = useTranslations("header");
  const locale = useLocale() as Locale;

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-10">
      <Link href="/" aria-label={t("home")} className="font-mono text-sm">
        fabian-rojas
      </Link>
      <div className="flex items-center gap-4">
        <LocaleSwitcher />
        <a href={profile.cv[locale]} className="font-mono text-xs text-chalk-dim hover:text-chalk">
          {t("cv")}
        </a>
      </div>
    </header>
  );
}
