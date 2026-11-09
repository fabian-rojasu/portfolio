import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="mx-auto w-full max-w-6xl px-5 text-sm text-muted sm:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-edge py-6">
        <p>{t("builtWith")}</p>
        <ul className="flex gap-5">
          <li>
            <a href={profile.links.github} className="hover:text-chalk">GitHub</a>
          </li>
          <li>
            <a href={profile.links.linkedin} className="hover:text-chalk">LinkedIn</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
