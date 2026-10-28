import type { Metadata } from "next";

// Temporary review pages for Phase 3; deleted once a direction is chosen.
export const metadata: Metadata = {
  title: "Design directions",
  robots: { index: false, follow: false },
};

export default function DesignLayout({ children }: LayoutProps<"/design">) {
  return children;
}
