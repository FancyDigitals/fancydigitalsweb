import { updateSession } from "./lib/supabase/middleware";
import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

const ROOT_DOMAIN = "fancydigitals.com.ng";

const RESERVED_SUBDOMAINS = [
  "www", "blog", "portal", "api", "admin", "app",
  "mail", "ftp", "cpanel", "webmail", "learn",
];

const admin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function middleware(request) {
  const url = request.nextUrl.clone();
  const hostname = (request.headers.get("host") || "").toLowerCase();
  const path = url.pathname;

    // Public API routes that must skip auth (needed by headless render)
  if (
  path.startsWith("/api/audio-proxy") ||
  path.startsWith("/api/media-proxy") ||
  path.startsWith("/music/")
) {
  return NextResponse.next();
}

  // Skip internal paths
  const isInternal =
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.includes(".");

  // CASE 1: Subdomain of fancydigitals.com.ng
  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    const subdomain = hostname.replace(`.${ROOT_DOMAIN}`, "");

    // Academy subdomain
    if (subdomain === "learn" && !isInternal) {
      url.pathname = `/academy${path === "/" ? "" : path}`;
      return NextResponse.rewrite(url);
    }

    if (subdomain && !RESERVED_SUBDOMAINS.includes(subdomain) && !isInternal) {
      url.pathname = `/p/${subdomain}${path === "/" ? "" : path}`;
      return NextResponse.rewrite(url);
    }
  }

  // CASE 2: Custom domain (not fancydigitals.com.ng at all)
  else if (hostname !== ROOT_DOMAIN && !hostname.includes("localhost") && !hostname.includes("vercel.app") && !isInternal) {
    try {
      const { data: customDomain } = await admin
        .from("custom_domains")
        .select("page_id, status")
        .eq("domain", hostname)
        .eq("status", "verified")
        .maybeSingle();

      if (customDomain) {
        const { data: page } = await admin
          .from("published_pages")
          .select("slug")
          .eq("id", customDomain.page_id)
          .eq("is_published", true)
          .maybeSingle();

        if (page?.slug) {
          url.pathname = `/p/${page.slug}${path === "/" ? "" : path}`;
          return NextResponse.rewrite(url);
        }
      }
    } catch (err) {
      console.error("[middleware-custom-domain]", err);
    }
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
    "/((?!_next/static|_next/image|favicon.ico|api/audio-proxy|api/media-proxy|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};