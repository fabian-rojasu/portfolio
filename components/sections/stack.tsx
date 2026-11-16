import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";

type Group = keyof typeof profile.stack;

export function Stack() {
  const t = useTranslations("stack");
  const groups = Object.entries(profile.stack) as [Group, readonly string[]][];

  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="mx-auto flex w-full max-w-6xl scroll-mt-8 flex-col gap-10 px-5 py-16 sm:px-10 lg:py-20"
    >
      <div className="flex flex-col gap-5">
        <SectionHeading id="stack-title" label={t("label")} title={t("title")} />
        <p className="max-w-[62ch] text-lg leading-relaxed text-ink-dim">{t("intro")}</p>
      </div>
      <ul className="border border-ink bg-surface font-mono text-[0.8rem]">
        {groups.map(([group, items]) => (
          <li
            key={group}
            className="grid border-b border-ink last:border-b-0 sm:grid-cols-[16rem_1fr]"
          >
            <h3 className="flex items-baseline justify-between gap-3 border-b border-grid px-4 py-3 font-medium sm:border-r sm:border-b-0 sm:border-ink">
              {t(`groups.${group}`)}
              <span className="text-muted">[{items.length}]</span>
            </h3>
            <ul className="flex flex-wrap gap-2 px-4 py-3">
              {items.map((item) => (
                <li key={item} className="border border-grid bg-canvas px-2 py-1">
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
