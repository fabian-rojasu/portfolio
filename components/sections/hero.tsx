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
    { name: "stack", fields: [["backend", "C#, Python, Node"], ["data", "PostgreSQL, SQL Server"]] },
  ];

  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 px-5 py-16 sm:px-10 lg:grid-cols-[1fr_1.1fr] lg:py-24"
    >
      <div className="flex flex-col gap-6">
        {profile.openToWork && (
          <p className="flex items-center gap-2 text-sm text-chalk-dim">
            <span aria-hidden className="size-2 rounded-full bg-signal" />
            {t("availability")}
          </p>
        )}
        <h1
          id="hero-title"
          className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] font-light tracking-[-0.02em]"
        >
          {profile.name}
        </h1>
        <p className="max-w-[46ch] text-lg leading-relaxed text-chalk-dim">{t("intro")}</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href={profile.cv[locale]}
            className="bg-signal px-5 py-3 font-semibold text-graphite transition-colors hover:bg-chalk"
          >
            {t("downloadCv")}
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="border border-edge px-5 py-3 transition-colors hover:border-chalk"
          >
            {t("email")}
          </a>
        </div>
      </div>

      <figure className="relative grid gap-8 sm:grid-cols-2">
        <figcaption className="sr-only">{t("diagramCaption")}</figcaption>
        {/* Relation lines sit behind the tables, which paint over their own segments */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path
            d="M50 42 V50 H25 V58 M50 50 H75 V58"
            fill="none"
            stroke="var(--edge)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="sm:col-span-2 sm:mx-auto sm:w-3/4">
          <EntityTable entity={developer} />
        </div>
        {related.map((entity) => (
          <EntityTable key={entity.name} entity={entity} />
        ))}
      </figure>
    </section>
  );
}
