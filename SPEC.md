# Spec: Portfolio de Fabián Rojas Ugalde

> Estado: **APROBADO (2026-10-27)**. Documento vivo: se actualiza antes de cambiar el alcance o una decisión.

## Objetivo
Sitio personal que presente a Fabián como **Software Developer full-stack con enfoque backend** a reclutadores y equipos técnicos, sobre todo remotos internacionales y de Costa Rica.

En **menos de 30 segundos**, un reclutador debe poder saber:
- quién es y qué hace,
- en qué stack trabaja,
- qué ha construido,
- cómo contactarlo o descargar su CV.

Además, el sitio servirá como vitrina para los proyectos nuevos que Fabián construirá después. Añadir uno debe ser **editar un archivo de datos**, no tocar componentes.

**Público:** reclutadores (lectura rápida) e ingenieros que evalúan (casos de estudio con detalle técnico).

### Historias de usuario
- Como reclutador, veo nombre, rol, ubicación y disponibilidad ("Open to work: remoto / híbrido en CR") nada más entrar.
- Como reclutador, descargo el CV en el idioma de la página que estoy viendo.
- Como reclutador, cambio entre inglés y español sin perder la sección en la que estaba.
- Como ingeniero, abro un trabajo o proyecto y leo el problema, la arquitectura, las decisiones y los resultados.
- Como Fabián, agrego un proyecto nuevo editando `content/projects.ts` (y sus textos) y se publica al hacer push.

## Contenido (fuente: CV EN, octubre 2025)
- **Identidad:** Fabián Rojas Ugalde · Software Developer · Costa Rica · Open to work: remoto o híbrido en Costa Rica.
- **Contacto:**
  - Se muestra `rojasugaldefabian@gmail.com`, `linkedin.com/in/fabian-rojas-ugalde` y `github.com/fabian-rojasu`.
  - El teléfono **no** aparece en la web.
- **Resumen:** graduado de Ingeniería en Computadores (TEC), con experiencia en backend y web: APIs con Node.js, Python/FastAPI y C#/.NET; frontends con React y Vue.
- **Stack**, agrupado como en el CV:
  - Lenguajes: Python, TypeScript, JavaScript, C#, Java, SQL, HTML/CSS
  - Backend: Node.js, FastAPI, ASP.NET Core, .NET 8, REST
  - Frontend: React, Vue, Angular, Blazor
  - Bases de datos: PostgreSQL, SQL Server, Firebase
  - DevOps y herramientas: Git, Docker, NGINX, Linux, Postman
- **Experiencia:**
  - Softland — Backend / Web Developer (prácticas de graduación), jun 2025 – dic 2025:
    - migración del módulo de Alertas del ERP de .NET Framework a Blazor sobre .NET 8,
    - app web multiplataforma con DevExpress 24.2,
    - gestión de informes REPX en base de datos, con un 30 % menos de esfuerzo de despliegue.
  - Fundación Plan21 — Backend Developer, ene 2022 – may 2023:
    - APIs para planificación agrícola,
    - cálculo de huella de carbono y evapotranspiración.
- **Educación:**
  - B.Sc. Ingeniería en Computadores, ITCR (2022–2025)
  - Técnico en Soporte Informático, CTP de San Carlos (2018–2020)
- **Certificaciones:** Cisco CCNA 1 y 2 · IT Essentials · Introduction to Cybersecurity.
- **Idiomas:** español (nativo), inglés (nivel profesional).
- **Proyectos:** ver Open Questions #1. Los proyectos académicos (Health Data, Distributed Chat) **no** se destacan a largo plazo, por decisión de Fabián.

## Estructura del sitio
- `/en` (por defecto) y `/es` — home de una sola página con estas secciones:
  1. Hero (nombre, rol, ubicación, badge de disponibilidad, botones "Ver trabajo" y "Descargar CV")
  2. About (sobre mí)
  3. Stack
  4. Featured Work / Projects
  5. Experience (experiencia, educación y certificaciones)
  6. Contact (contacto)
- `/[locale]/work/[slug]` — caso de estudio: contexto, problema, arquitectura (diagrama), decisiones técnicas, resultados, stack y enlaces (si existen).
- Además: 404 personalizada, `sitemap.xml`, `robots.txt`, metadatos SEO por idioma con `hreflang` e imagen Open Graph.
- **Estilo:** minimalista técnico. Tema oscuro, Geist Sans + Geist Mono, acentos tipo terminal y animaciones sutiles que respetan `prefers-reduced-motion`.

## Tech Stack
Las versiones exactas se fijan en `package.json` al crear el proyecto, consultando Context7.
- Next.js 16.4.3 (App Router, TypeScript estricto), React 19.3
- Tailwind CSS v4
- next-intl (rutas `/en` y `/es`)
- motion (animaciones)
- @vercel/analytics y @vercel/speed-insights
- @playwright/test (pruebas e2e)
- Node 24 (nvm) y npm
- Hosting en Vercel (plan Hobby)

## Commands
```bash
npm run dev          # servidor local en http://localhost:3000
npm run build        # build de producción (lo mismo que ejecuta Vercel)
npm run start        # sirve el build localmente
npm run lint         # ESLint
npm run test:e2e     # Playwright (levanta el build y ejecuta las pruebas)
```

## Project Structure
```
app/[locale]/layout.tsx          → layout por idioma (fuentes, metadatos, nav)
app/[locale]/page.tsx            → home (compone las secciones)
app/[locale]/work/[slug]/page.tsx→ caso de estudio
app/sitemap.ts, app/robots.ts    → SEO
components/sections/*            → Hero, About, Stack, Work, Experience, Contact
components/ui/*                  → piezas reutilizables (Badge, Button, SectionHeading…)
content/profile.ts               → datos personales, stack, experiencia (tipados)
content/projects.ts              → trabajos y proyectos (tipados) ← lo mantiene Fabián
messages/en.json, messages/es.json → textos de la interfaz y del contenido traducible
i18n/                            → configuración de next-intl
public/cv/                       → CV-Fabian-Rojas-EN.pdf, CV-Fabian-Rojas-ES.pdf
e2e/                             → pruebas de Playwright
SPEC.md                          → este documento
```

## Code Style
- Componentes de servidor por defecto; `"use client"` solo donde haga falta interacción (selector de idioma, animaciones).
- Nombres en inglés en el código y comentarios escasos. Componentes en PascalCase y archivos en kebab-case.
- El contenido se guarda como datos, nunca escrito directamente en el JSX:
```ts
// content/projects.ts
export type Project = {
  slug: string;
  kind: "work" | "personal";
  stack: string[];
  period: { start: string; end?: string };
  links?: { repo?: string; demo?: string };
  featured: boolean;
};
// Título, resumen y cuerpo de cada proyecto viven en messages/{en,es}.json bajo projects.<slug>
```

## Testing Strategy
- **Siempre:** `npm run lint` y `npm run build` sin errores antes de cada commit o PR.
- **E2E con Playwright**, en `e2e/`, como smoke tests:
  - `/en` y `/es` cargan con todas las secciones,
  - el selector de idioma cambia de ruta,
  - el CV del idioma correcto responde con 200,
  - los casos de estudio cargan,
  - una ruta inexistente da 404.
- **Revisión visual** con Playwright MCP a 390px y 1440px antes de pedir aprobación de cada fase.
- Sin tests unitarios: es un sitio de contenido sin lógica de negocio.

## Boundaries
- **Always:**
  - Una fase o sección por rama y PR.
  - Lint, build y e2e en verde.
  - Capturas en móvil y escritorio.
  - Respetar la accesibilidad (contraste AA, navegación por teclado, `alt`).
  - `.playwright-mcp/` en `.gitignore`.
- **Ask first:**
  - Añadir dependencias fuera del stack listado.
  - Cambiar el diseño ya aprobado.
  - Publicar cualquier dato personal nuevo.
  - Pasar a la siguiente fase.
- **Never:**
  - Publicar el teléfono.
  - Incluir código, capturas o datos confidenciales de Softland o Plan21.
  - Hacer commit de secretos.
  - Hacer push o merge en nombre de Fabián (git, GitHub y Vercel los opera él).

## Success Criteria
- [ ] Desplegado en Vercel con URL `*.vercel.app`, con deploy automático al hacer push a `main` y Preview URL en cada PR.
- [ ] `/en` y `/es` completos. El selector conserva la sección y cada idioma ofrece su propio CV.
- [ ] Lighthouse ≥ 90 en Performance, Accessibility, Best Practices y SEO, en móvil y escritorio.
- [ ] Sin scroll horizontal a 360px y legible a 1440px. Respeta `prefers-reduced-motion`.
- [ ] Al menos un caso de estudio completo publicado.
- [ ] Añadir un proyecto requiere tocar solo `content/projects.ts` y `messages/*.json`.
- [ ] Analytics y Speed Insights activos en Vercel.

## Open Questions
1. ~~Featured Work al lanzar~~ → casos de estudio de Softland y Plan21 a nivel de arquitectura, sin información confidencial. Los proyectos académicos no se incluyen.
2. ~~CV en español~~ → `public/cv/CV-Fabian-Rojas-ES.pdf`.
3. Referencias visuales: ninguna por ahora. En la Fase 3 propongo 2-3 direcciones.
4. ~~Ubicación~~ → `~/projects/portfolio`.
