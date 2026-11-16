import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-ink text-sm text-on-ink-dim">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 sm:px-10">
        <p>{t("builtWith")}</p>
        <ul className="flex gap-5">
          <li>
            <a href={profile.links.github} className="text-on-ink hover:text-accent">GitHub</a>
          </li>
          <li>
            <a href={profile.links.linkedin} className="text-on-ink hover:text-accent">LinkedIn</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
