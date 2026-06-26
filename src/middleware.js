import { updateSession } from "./lib/supabase/middleware";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Client portal protection
  if (path.startsWith("/client/dashboard")) {
    const clientSession = request.cookies.get("fancy_client_session")?.value;
    if (!clientSession) {
      const url = request.nextUrl.clone();
      url.pathname = "/client/login";
      return NextResponse.redirect(url);
    }
  }

  // Redirect logged-in clients away from login page
  if (path === "/client/login") {
    const clientSession = request.cookies.get("fancy_client_session")?.value;
    if (clientSession) {
      const url = request.nextUrl.clone();
      url.pathname = "/client/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // Skip Supabase session for client routes
  if (path.startsWith("/client")) {
    return NextResponse.next();
  }

  // Normal Supabase auth for everything else
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};