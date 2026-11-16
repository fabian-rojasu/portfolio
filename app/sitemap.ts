import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...projects.map((project) => `/work/${project.slug}`)];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${profile.url}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${profile.url}/${l}${path}`])),
      },
    })),
  );
}
