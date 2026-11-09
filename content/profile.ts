// Language-neutral profile data. Translatable copy lives in messages/{en,es}.json.
export const profile = {
  name: "Fabián Rojas Ugalde",
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
} as const;

export type Locale = keyof typeof profile.cv;
