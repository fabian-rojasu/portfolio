import { useLocale, useTranslations } from "next-intl";
import { profile, type Locale } from "@/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";

export function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;

  const links = [
    { key: "github", label: "GitHub", href: profile.links.github, text: "github.com/fabian-rojasu" },
    { key: "linkedin", label: "LinkedIn", href: profile.links.linkedin, text: "in/fabian-rojas-ugalde" },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-8 bg-ink text-on-ink">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:px-10 lg:grid-cols-[1.4fr_1fr] lg:py-24">
        <div className="flex flex-col gap-8">
          <SectionHeading id="contact-title" label={t("label")} title={t("title")} inverted />
          <p className="max-w-[52ch] text-lg leading-relaxed text-on-ink-dim">{t("body")}</p>
          <a
            href={`mailto:${profile.email}`}
            className="w-fit font-mono text-[clamp(1.05rem,2.6vw,1.6rem)] break-all underline decoration-accent decoration-2 underline-offset-8 hover:text-accent"
          >
            {profile.email}
          </a>
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="bg-accent-strong px-5 py-3 font-semibold text-white transition-colors hover:bg-on-ink hover:text-ink"
            >
              {t("emailCta")}
            </a>
            <a
              href={profile.cv[locale]}
              className="border border-on-ink px-5 py-3 font-semibold transition-colors hover:bg-on-ink hover:text-ink"
            >
              {t("cv")}
            </a>
          </div>
        </div>
        <ul className="self-end border border-ink-line font-mono text-[0.8rem]">
          {links.map((link) => (
            <li key={link.key} className="border-b border-ink-line last:border-b-0">
              <a
                href={link.href}
                className="grid grid-cols-[6rem_1fr_auto] items-center gap-3 px-4 py-4 transition-colors hover:bg-ink-line"
              >
                <span className="text-on-ink-dim">{link.key}</span>
                <span className="truncate">{link.text}</span>
                <span aria-hidden className="text-accent">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
