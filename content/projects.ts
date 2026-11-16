import type { Entity } from "@/components/ui/entity-table";

// Language-neutral project data. Title, summary and case-study copy live in
// messages/{en,es}.json under projects.<slug>.
export type Project = {
  slug: string;
  kind: "work" | "personal";
  company?: string;
  stack: string[];
  period: { start: string; end?: string };
  links?: { repo?: string; demo?: string };
  featured: boolean;
  // Architecture-level diagram for the case study, drawn as a left-to-right flow
  architecture: Entity[];
};

export const projects: Project[] = [
  {
    slug: "softland-alerts",
    kind: "work",
    company: "Softland",
    stack: ["C#", "ASP.NET Core", ".NET 8", "Blazor", "DevExpress 24.2"],
    period: { start: "2025-06", end: "2025-12" },
    featured: true,
    architecture: [
      {
        name: "client",
        fields: [
          ["access", "web browser"],
          ["platforms", "cross-platform"],
          ["replaces", "desktop-only UI"],
        ],
      },
      {
        name: "alerts_module",
        primary: true,
        fields: [
          ["ui", "Blazor + DevExpress 24.2"],
          ["runtime", "ASP.NET Core / .NET 8"],
          ["migrated_from", ".NET Framework"],
        ],
      },
      {
        name: "report_store",
        fields: [
          ["format", "REPX"],
          ["storage", "database"],
          ["replaces", "file-based storage"],
        ],
      },
    ],
  },
  {
    slug: "plan21-agro-api",
    kind: "work",
    company: "Fundación Plan21",
    stack: ["REST APIs", "Relational databases"],
    period: { start: "2022-01", end: "2023-05" },
    featured: true,
    architecture: [
      {
        name: "platform",
        fields: [
          ["type", "farm management"],
          ["scope", "multiple farms"],
        ],
      },
      {
        name: "rest_api",
        primary: true,
        fields: [
          ["style", "REST"],
          ["features", "land use, planting time"],
        ],
      },
      {
        name: "calculations",
        fields: [
          ["carbon", "crop footprint"],
          ["water", "evapotranspiration"],
        ],
      },
      {
        name: "database",
        fields: [
          ["model", "relational"],
          ["holds", "farm and crop data"],
        ],
      },
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
