import Link from "next/link";

const directions = [
  { href: "/design/response", name: "A. Response", idea: "Your profile as an API response" },
  { href: "/design/schema", name: "B. Schema", idea: "Your career as a data model" },
  { href: "/design/log", name: "C. Log", idea: "Your career as a commit history" },
] as const;

export default function DesignIndex() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-6 py-24">
      <h1 className="text-2xl font-semibold">Pick a direction</h1>
      <ul className="flex flex-col gap-4">
        {directions.map((d) => (
          <li key={d.href}>
            <Link href={d.href} className="underline underline-offset-4 hover:text-white">
              {d.name}
            </Link>
            <p className="text-sm text-zinc-400">{d.idea}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
