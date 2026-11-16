import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { EntityTable } from "@/components/ui/entity-table";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-5 py-20 sm:px-10 md:grid-cols-2">
      <div className="flex flex-col gap-6">
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-tight font-light">{t("title")}</h1>
        <p className="text-lg text-ink-dim">{t("body")}</p>
        <Link
          href="/"
          className="w-fit bg-accent-strong px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink"
        >
          {t("home")}
        </Link>
      </div>
      <EntityTable
        entity={{
          name: "response",
          primary: true,
          fields: [
            ["status", "404"],
            ["rows", "0"],
            ["hint", "SELECT * FROM pages WHERE path = ?"],
          ],
        }}
      />
    </section>
  );
}
