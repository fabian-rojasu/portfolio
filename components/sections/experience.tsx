import { useFormatter, useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import { formatPeriod } from "@/lib/format";
import { SectionHeading } from "@/components/ui/section-heading";
import { TagList } from "@/components/ui/tag-list";

function GroupTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="border-b border-ink pb-2 font-mono text-sm font-medium">{children}</h3>;
}

export function Experience() {
  const t = useTranslations("experience");
  const format = useFormatter();

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto flex w-full max-w-6xl scroll-mt-8 flex-col gap-10 px-5 py-16 sm:px-10 lg:py-20"
    >
      <SectionHeading id="experience-title" label={t("label")} title={t("title")} />
      <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <GroupTitle>{t("groups.work")}</GroupTitle>
          <ol className="flex flex-col gap-10 border-l border-ink">
            {profile.experience.map((job) => (
              <li key={job.id} className="relative flex flex-col gap-3 pl-6">
                <span aria-hidden className="absolute top-1.5 -left-[5px] size-2.5 bg-accent" />
                <p className="font-mono text-xs text-muted">
                  {formatPeriod(format, job.period, t("present"))}
                </p>
                <h4 className="text-xl leading-snug">
                  {t(`items.${job.id}.role`)}
                  <span className="text-ink-dim"> · {job.company}</span>
                </h4>
                <ul className="flex list-[square] flex-col gap-2 pl-5 leading-relaxed text-ink-dim marker:text-accent">
                  {(t.raw(`items.${job.id}.bullets`) as string[]).map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <GroupTitle>{t("groups.education")}</GroupTitle>
            <ul className="flex flex-col gap-5">
              {profile.education.map((item) => (
                <li key={item.id} className="flex flex-col gap-1">
                  <p className="font-mono text-xs text-muted">
                    {formatPeriod(format, item.period, t("present"))}
                  </p>
                  <p className="leading-snug font-semibold">{t(`education.${item.id}`)}</p>
                  <p className="text-ink-dim">{item.institution}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <GroupTitle>{t("groups.certifications")}</GroupTitle>
            <TagList items={profile.certifications} />
          </div>
        </div>
      </div>
    </section>
  );
}
