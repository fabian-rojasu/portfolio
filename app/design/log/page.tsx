import { JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";

const schibsted = Schibsted_Grotesk({ subsets: ["latin"], weight: ["400", "800"], display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400"], display: "swap" });

// Tokens: black #000000, paper #F2EFE8, muted #8A8578, blue #5B8CFF, rule #26241F
const commits = [
  { hash: "a41f0c2", date: "Dec 2025", message: "Migrate the Softland ERP alerts module to .NET 8 and Blazor", head: true },
  { hash: "9be3d71", date: "Dec 2025", message: "Graduate in Computer Engineering, TEC" },
  { hash: "5c2e8aa", date: "May 2023", message: "Ship crop carbon footprint and irrigation APIs at Plan21" },
  { hash: "17d90f4", date: "Jan 2022", message: "Start as backend developer at Fundación Plan21" },
];

export default function LogDirection() {
  return (
    <div className={`${schibsted.className} flex flex-1 flex-col bg-black text-[#F2EFE8]`}>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-14 px-5 py-20 sm:px-10">
        <div className="flex flex-col gap-10">
          <h1 className="text-[clamp(3.75rem,11vw,9rem)] leading-[0.85] font-extrabold tracking-[-0.05em]">
            Fabián
            <br />
            Rojas
          </h1>
          <p className="max-w-[44ch] text-lg leading-relaxed text-[#B9B4A8]">
            Backend-focused software developer in Costa Rica. I build APIs with .NET, Python, and
            Node.js, and I&apos;m looking for my next team.
          </p>
        </div>

        <ol className={`${jetbrains.className} flex flex-col border-t border-[#26241F] text-[0.8rem] sm:text-sm`}>
          {commits.map((c) => (
            <li
              key={c.hash}
              className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-b border-[#26241F] py-4 sm:grid-cols-[5.5rem_6.5rem_1fr]"
            >
              <span className="text-[#5B8CFF]">{c.hash}</span>
              <span className="text-[#8A8578]">{c.date}</span>
              <span className="col-span-2 sm:col-span-1">
                {c.head && <span className="mr-2 text-[#5B8CFF]">(HEAD, open to work)</span>}
                {c.message}
              </span>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap gap-6 text-base">
          <a
            href="#work"
            className="underline decoration-[#5B8CFF] decoration-2 underline-offset-8 hover:text-[#5B8CFF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B8CFF]"
          >
            See my work
          </a>
          <a
            href="/cv/CV-Fabian-Rojas-EN.pdf"
            className="underline decoration-[#26241F] decoration-2 underline-offset-8 hover:decoration-[#F2EFE8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B8CFF]"
          >
            Download CV
          </a>
        </div>
      </main>
    </div>
  );
}
