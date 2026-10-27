export default function Home() {
  return (
    <main className="flex flex-1 flex-col justify-center gap-4 px-6 py-24 font-mono sm:px-16">
      <p className="text-sm text-emerald-400">~/portfolio $ status</p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
        Fabián Rojas Ugalde
      </h1>
      <p className="text-zinc-400">Software Developer · Costa Rica</p>
      <p className="text-sm text-zinc-500">
        Portfolio in progress<span className="animate-pulse">_</span>
      </p>
      <a
        href="/cv/CV-Fabian-Rojas-EN.pdf"
        className="w-fit text-sm text-zinc-300 underline underline-offset-4 hover:text-white"
      >
        Download CV (PDF)
      </a>
    </main>
  );
}
