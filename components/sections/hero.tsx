import { useLocale, useTranslations } from "next-intl";
import { profile, type Locale } from "@/content/profile";
import { EntityTable, type Entity } from "@/components/ui/entity-table";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;

  const developer: Entity = {
    name: "developer",
    primary: true,
    fields: [
      ["name", profile.name],
      ["role", t("role")],
      ["location", profile.location],
      ["open_to_work", String(profile.openToWork)],
    ],
  };
  const related: Entity[] = [
    { name: "experience", fields: [["softland", ".NET 8, Blazor"], ["plan21", "REST APIs"]] },
    {
      name: "stack",
      fields: Object.entries(profile.stack).map(([group, items]) => [group, items.join(", ")]),
    },
  ];

  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 px-5 py-16 sm:px-10 lg:grid-cols-[1fr_1.25fr] lg:py-20"
    >
      <div className="flex flex-col gap-6">
        {profile.openToWork && (
          <p className="flex items-center gap-2 text-sm text-ink-dim">
            <span aria-hidden className="size-2 rounded-full bg-accent" />
            {t("availability")}
          </p>
        )}
        <h1
          id="hero-title"
          className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] font-light tracking-[-0.02em] text-ink"
        >
          {profile.name}
        </h1>
        <p className="max-w-[46ch] text-lg leading-relaxed text-ink-dim">{t("intro")}</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href="#work"
            className="bg-accent-strong px-5 py-3 font-semibold text-white transition-colors hover:bg-ink"
          >
            {t("seeWork")}
          </a>
          <a
            href={profile.cv[locale]}
            className="border border-ink px-5 py-3 font-semibold transition-colors hover:bg-ink hover:text-on-ink"
          >
            {t("downloadCv")}
          </a>
        </div>
      </div>

      <figure className="grid items-start gap-8 sm:grid-cols-[4fr_5fr] sm:gap-y-0">
        <figcaption className="sr-only">{t("diagramCaption")}</figcaption>
        <div className="sm:col-span-2 sm:mx-auto sm:w-3/4">
          <EntityTable entity={developer} />
        </div>
        {/* Relation lines: a subgrid row so each branch lands on its column's center */}
        <div aria-hidden className="relative col-span-2 hidden h-10 sm:grid sm:grid-cols-subgrid">
          <span className="absolute top-0 left-1/2 h-1/2 border-l border-ink" />
          <div className="relative">
            <span className="absolute top-1/2 bottom-0 left-1/2 border-l border-ink" />
            <span className="absolute top-1/2 -right-8 left-1/2 border-t border-ink" />
          </div>
          <div className="relative">
            <span className="absolute top-1/2 bottom-0 left-1/2 border-l border-ink" />
            <span className="absolute top-1/2 right-1/2 left-0 border-t border-ink" />
          </div>
        </div>
        {related.map((entity) => (
          <EntityTable key={entity.name} entity={entity} />
        ))}
      </figure>
    </section>
  );
}
