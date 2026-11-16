import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { featuredProjects } from "@/content/projects";
import { formatPeriod } from "@/lib/format";
import { SectionHeading } from "@/components/ui/section-heading";
import { TagList } from "@/components/ui/tag-list";

export function Work() {
  const t = useTranslations("work");
  const tp = useTranslations("projects");
  const te = useTranslations("experience");
  const format = useFormatter();

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="mx-auto flex w-full max-w-6xl scroll-mt-8 flex-col gap-10 px-5 py-16 sm:px-10 lg:py-20"
    >
      <div className="flex flex-col gap-5">
        <SectionHeading id="work-title" label={t("label")} title={t("title")} />
        <p className="max-w-[62ch] text-lg leading-relaxed text-ink-dim">{t("intro")}</p>
      </div>
      <ul className="grid gap-8 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <li key={project.slug}>
            <article className="relative flex h-full flex-col gap-5 border border-ink bg-surface p-6 transition-shadow duration-200 focus-within:shadow-[8px_8px_0_var(--accent)] hover:shadow-[8px_8px_0_var(--accent)] sm:p-8">
              <p className="flex flex-wrap justify-between gap-2 font-mono text-xs text-muted">
                <span>
                  {project.company ?? t(`kinds.${project.kind}`)}
                </span>
                <span>{formatPeriod(format, project.period, te("present"))}</span>
              </p>
              <h3 className="text-2xl leading-snug font-light">
                {/* The stretched link makes the whole card clickable */}
                <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0">
                  {tp(`${project.slug}.title`)}
                </Link>
              </h3>
              <p className="leading-relaxed text-ink-dim">{tp(`${project.slug}.summary`)}</p>
              <TagList items={project.stack} />
              <p
                aria-hidden
                className="mt-auto pt-2 font-mono text-sm font-medium underline decoration-accent decoration-2 underline-offset-4"
              >
                {t("readCase")} →
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
