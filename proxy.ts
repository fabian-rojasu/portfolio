import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { getProject } from "./content/projects";

const handleI18n = createMiddleware(routing);
const caseStudyPath = new RegExp(`^/(${routing.locales.join("|")})/work/([^/]+)/?$`);

export default function proxy(request: NextRequest) {
  // Partial prefetching streams the shell before the page can call notFound(),
  // so unknown case studies are rejected here to get a real 404 status
  const match = request.nextUrl.pathname.match(caseStudyPath);
  if (match && !getProject(match[2])) {
    return NextResponse.rewrite(new URL(`/${match[1]}/404`, request.url), { status: 404 });
  }
  return handleI18n(request);
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
