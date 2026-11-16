// Language-neutral profile data. Translatable copy lives in messages/{en,es}.json.
export const profile = {
  name: "Fabián Rojas Ugalde",
  url: "https://fabian-rojas.vercel.app",
  email: "rojasugaldefabian@gmail.com",
  location: "Costa Rica",
  links: {
    github: "https://github.com/fabian-rojasu",
    linkedin: "https://www.linkedin.com/in/fabian-rojas-ugalde",
  },
  cv: {
    en: "/cv/CV-Fabian-Rojas-EN.pdf",
    es: "/cv/CV-Fabian-Rojas-ES.pdf",
  },
  openToWork: true,
  stack: {
    languages: ["Python", "TypeScript", "JavaScript", "C#", "Java", "SQL", "HTML/CSS"],
    backend: ["Node.js", "FastAPI", "ASP.NET Core", ".NET 8", "REST"],
    frontend: ["React", "Vue", "Angular", "Blazor"],
    databases: ["PostgreSQL", "SQL Server", "Firebase"],
    devops: ["Git", "Docker", "NGINX", "Linux", "Postman"],
  },
  // Roles and bullet points live in messages/{en,es}.json under experience.items.<id>
  experience: [
    { id: "softland", company: "Softland", period: { start: "2025-06", end: "2025-12" } },
    { id: "plan21", company: "Fundación Plan21", period: { start: "2022-01", end: "2023-05" } },
  ],
  education: [
    { id: "itcr", institution: "Instituto Tecnológico de Costa Rica", period: { start: "2022", end: "2025" } },
    { id: "ctp", institution: "CTP de San Carlos", period: { start: "2018", end: "2020" } },
  ],
  certifications: [
    "Cisco CCNA 1 & CCNA 2",
    "Cisco IT Essentials",
    "Cisco: Introduction to Cybersecurity",
  ],
} as const;

export type Locale = keyof typeof profile.cv;
