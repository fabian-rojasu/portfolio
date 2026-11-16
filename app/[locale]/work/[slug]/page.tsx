import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProject, projects } from "@/content/projects";
import { alternates } from "@/lib/alternates";
import { CaseStudy } from "@/components/case-study/case-study";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!getProject(slug)) return {};
  const t = await getTranslations("projects");
  return {
    title: t(`${slug}.title`),
    description: t(`${slug}.summary`),
    alternates: alternates(locale, `/work/${slug}`),
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <CaseStudy project={project} />;
}
