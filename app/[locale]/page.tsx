import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { alternates } from "@/lib/alternates";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Stack } from "@/components/sections/stack";
import { Work } from "@/components/sections/work";

export async function generateMetadata(): Promise<Metadata> {
  return { alternates: alternates(await getLocale()) };
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stack />
      <Work />
      <Experience />
      <Contact />
    </>
  );
}
