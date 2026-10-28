import { Martian_Mono } from "next/font/google";

const martian = Martian_Mono({ subsets: ["latin"], display: "swap" });

// Tokens: ink #0E1A24, paper #E8E4DA, amber #F0B429, muted #7C8A99, rule #22313F
const profile: [string, string, "string" | "bool"][] = [
  ["role", "Software Developer", "string"],
  ["focus", "Backend, APIs, data", "string"],
  ["location", "Costa Rica", "string"],
  ["stack", "C#/.NET 8, Python/FastAPI, Node.js, PostgreSQL", "string"],
  ["open_to_work", "true", "bool"],
];

export default function ResponseDirection() {
  return (
    <div className={`${martian.className} flex flex-1 flex-col bg-[#0E1A24] text-[#E8E4DA]`}>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-10 px-5 py-20 sm:px-10">
        <p className="text-xs text-[#7C8A99] sm:text-sm">
          GET /fabian-rojas <span className="ml-3 text-[#F0B429]">200 OK</span>
        </p>

        <h1 className="text-[clamp(2.25rem,8vw,5.5rem)] leading-[0.95] font-extralight tracking-[-0.04em]">
          Fabián
          <br />
          <span className="font-semibold">Rojas Ugalde</span>
        </h1>

        <pre className="border-l whitespace-pre-wrap break-words border-[#22313F] pl-5 text-[0.8rem] leading-7 sm:text-sm">
          <code>
            <span className="text-[#7C8A99]">{"{"}</span>
            {profile.map(([key, value, type], i) => (
              <span key={key} className="block pl-5">
                <span className="text-[#7C8A99]">&quot;{key}&quot;: </span>
                {type === "bool" ? (
                  <span className="text-[#F0B429]">{value}</span>
                ) : (
                  <span>&quot;{value}&quot;</span>
                )}
                {i < profile.length - 1 && <span className="text-[#7C8A99]">,</span>}
              </span>
            ))}
            <span className="text-[#7C8A99]">{"}"}</span>
          </code>
        </pre>

        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href="#work"
            className="bg-[#F0B429] px-5 py-3 text-[#0E1A24] transition-colors hover:bg-[#E8E4DA] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F0B429]"
          >
            See my work
          </a>
          <a
            href="/cv/CV-Fabian-Rojas-EN.pdf"
            className="border border-[#22313F] px-5 py-3 transition-colors hover:border-[#E8E4DA] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F0B429]"
          >
            Download CV
          </a>
        </div>
      </main>
    </div>
  );
}
