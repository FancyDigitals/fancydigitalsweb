import { updateSession } from "./lib/supabase/middleware";
import { NextResponse } from "next/server";

const ROOT_DOMAIN = "fancydigitals.com.ng";

// Subdomains that are NOT client landing pages — skip rewrite
const RESERVED_SUBDOMAINS = [
  "www",
  "blog",
  "portal",
  "api",
  "admin",
  "app",
  "mail",
  "ftp",
  "cpanel",
  "webmail",
];

export async function middleware(request) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";
  const path = url.pathname;

  // Extract subdomain
  let subdomain = null;

  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    subdomain = hostname.replace(`.${ROOT_DOMAIN}`, "");
  }

  // If subdomain exists and is not reserved, rewrite to /p/[slug]
  if (
    subdomain &&
    !RESERVED_SUBDOMAINS.includes(subdomain) &&
    !path.startsWith("/_next") &&
    !path.startsWith("/api") &&
    !path.includes(".")
  ) {
    url.pathname = `/p/${subdomain}${path === "/" ? "" : path}`;
    return NextResponse.rewrite(url);
  }

  // Client portal protection
  if (path.startsWith("/client/dashboard")) {
    const clientSession = request.cookies.get("fancy_client_session")?.value;
    if (!clientSession) {
      url.pathname = "/client/login";
      return NextResponse.redirect(url);
    }
  }

  if (path === "/client/login") {
    const clientSession = request.cookies.get("fancy_client_session")?.value;
    if (clientSession) {
      url.pathname = "/client/dashboard";
      return NextResponse.redirect(url);
    }
  }

  if (path.startsWith("/client")) {
    return NextResponse.next();
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};