import { useTranslations } from "next-intl";
import { EntityTable } from "@/components/ui/entity-table";
import { SectionHeading } from "@/components/ui/section-heading";

const factKeys = ["education", "focus", "languages"] as const;

export function About() {
  const t = useTranslations("about");
  const body = t.raw("body") as string[];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto flex w-full max-w-6xl scroll-mt-8 flex-col gap-10 px-5 py-16 sm:px-10 lg:py-20"
    >
      <SectionHeading id="about-title" label={t("label")} title={t("title")} />
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="flex max-w-[62ch] flex-col gap-5 text-lg leading-relaxed text-ink-dim">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <figure className="lg:mt-1.5">
          <figcaption className="sr-only">{t("factsCaption")}</figcaption>
          <EntityTable
            entity={{
              name: "profile",
              fields: factKeys.map((key) => [key, t(`facts.${key}`)]),
            }}
          />
        </figure>
      </div>
    </section>
  );
}
