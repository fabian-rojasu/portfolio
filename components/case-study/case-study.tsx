import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { projects, type Project } from "@/content/projects";
import { formatPeriod } from "@/lib/format";
import { EntityTable } from "@/components/ui/entity-table";
import { FlowDiagram } from "@/components/ui/flow-diagram";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2 font-mono text-sm font-medium">
        <span aria-hidden className="size-2 bg-accent" />
        {title}
      </h2>
      {children}
    </section>
  );
}

export function CaseStudy({ project }: { project: Project }) {
  const t = useTranslations("caseStudy");
  const tp = useTranslations(`projects.${project.slug}`);
  const te = useTranslations("experience");
  const format = useFormatter();

  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const decisions = tp.raw("decisions") as string[];
  const results = tp.raw("results") as string[];

  return (
    <article className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-5 py-12 sm:px-10 lg:py-16">
      <header className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <div className="flex flex-col gap-6">
          <Link href="/#work" className="w-fit font-mono text-xs text-muted hover:text-ink">
            ← {t("back")}
          </Link>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] font-light tracking-[-0.02em]">
            {tp("title")}
          </h1>
          <p className="max-w-[60ch] text-lg leading-relaxed text-ink-dim">{tp("summary")}</p>
        </div>
        <EntityTable
          entity={{
            name: project.slug.replaceAll("-", "_"),
            primary: true,
            fields: [
              ...(project.company ? [[t("meta.company"), project.company] as [string, string]] : []),
              [t("meta.role"), tp("role")],
              [t("meta.period"), formatPeriod(format, project.period, te("present"))],
              [t("meta.stack"), project.stack.join(", ")],
            ],
          }}
        />
      </header>

      <div className="grid gap-12 md:grid-cols-2">
        <Block title={t("context")}>
          <p className="leading-relaxed text-ink-dim">{tp("context")}</p>
        </Block>
        <Block title={t("problem")}>
          <p className="leading-relaxed text-ink-dim">{tp("problem")}</p>
        </Block>
      </div>

      <Block title={t("architecture")}>
        <FlowDiagram entities={project.architecture} caption={t("architectureNote")} />
      </Block>

      <Block title={t("decisions")}>
        <ol className="grid gap-6 md:grid-cols-3">
          {decisions.map((decision, index) => (
            <li key={decision} className="flex flex-col gap-3 border-t border-ink pt-4">
              <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
              <p className="leading-relaxed text-ink-dim">{decision}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block title={t("results")}>
        <ul className="flex list-[square] flex-col gap-2 pl-5 text-lg leading-relaxed marker:text-accent">
          {results.map((result) => (
            <li key={result}>{result}</li>
          ))}
        </ul>
      </Block>

      {next !== project && (
        <nav className="border-t border-ink pt-8">
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between"
          >
            <span className="font-mono text-xs text-muted">{t("next")}</span>
            <span className="text-2xl font-light underline decoration-accent decoration-2 underline-offset-8 group-hover:text-accent-strong">
              <TitleOf slug={next.slug} /> →
            </span>
          </Link>
        </nav>
      )}
    </article>
  );
}

function TitleOf({ slug }: { slug: string }) {
  const t = useTranslations("projects");
  return t(`${slug}.title`);
}
