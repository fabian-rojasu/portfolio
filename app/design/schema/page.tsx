import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["300", "400", "600"], display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

// Tokens: graphite #11161C, grid #1D252E, chalk #DCE3EA, signal #7FB7FF, muted #75818E
type Entity = { name: string; fields: [string, string][]; highlight?: boolean };

const developer: Entity = {
  name: "developer",
  highlight: true,
  fields: [
    ["name", "Fabián Rojas Ugalde"],
    ["role", "Software Developer"],
    ["location", "Costa Rica"],
    ["open_to_work", "true"],
  ],
};

const related: Entity[] = [
  { name: "experience", fields: [["softland", ".NET 8, Blazor"], ["plan21", "REST APIs"]] },
  { name: "stack", fields: [["backend", "C#, Python, Node"], ["data", "PostgreSQL, SQL Server"]] },
];

function EntityTable({ entity }: { entity: Entity }) {
  return (
    <div
      className={`${plexMono.className} w-full border bg-[#11161C] text-[0.8rem] ${
        entity.highlight ? "border-[#7FB7FF]" : "border-[#2A3542]"
      }`}
    >
      <p
        className={`border-b px-4 py-2 font-medium ${
          entity.highlight ? "border-[#7FB7FF] text-[#7FB7FF]" : "border-[#2A3542] text-[#DCE3EA]"
        }`}
      >
        {entity.name}
      </p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 px-4 py-3">
        {entity.fields.map(([key, value]) => (
          <div key={key} className="contents">
            <dt className="text-[#75818E]">{key}</dt>
            <dd className="text-[#DCE3EA]">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function SchemaDirection() {
  return (
    <div
      className={`${plexSans.className} flex flex-1 flex-col bg-[#11161C] text-[#DCE3EA]`}
      style={{
        backgroundImage: "radial-gradient(#1D252E 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <main className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 px-5 py-20 sm:px-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-6">
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] font-light tracking-[-0.02em]">
            Fabián Rojas Ugalde
          </h1>
          <p className="max-w-[46ch] text-lg leading-relaxed text-[#A9B4BF]">
            I design and build backend systems: APIs, data models, and the migrations that keep
            them running. Computer Engineer from TEC, based in Costa Rica.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href="#work"
              className="bg-[#7FB7FF] px-5 py-3 font-semibold text-[#11161C] transition-colors hover:bg-[#DCE3EA] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7FB7FF]"
            >
              See my work
            </a>
            <a
              href="/cv/CV-Fabian-Rojas-EN.pdf"
              className="border border-[#2A3542] px-5 py-3 transition-colors hover:border-[#DCE3EA] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7FB7FF]"
            >
              Download CV
            </a>
          </div>
        </div>

        <div aria-label="Profile shown as a data model" className="relative grid gap-8 sm:grid-cols-2">
          <div className="sm:col-span-2 sm:mx-auto sm:w-3/4">
            <EntityTable entity={developer} />
          </div>
          {/* Relation lines from the main entity to its related entities */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <path d="M50 42 V50 H25 V58 M50 50 H75 V58" fill="none" stroke="#2A3542" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
          </svg>
          {related.map((entity) => (
            <EntityTable key={entity.name} entity={entity} />
          ))}
        </div>
      </main>
    </div>
  );
}
