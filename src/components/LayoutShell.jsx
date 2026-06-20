"use client";

import { usePathname } from "next/navigation";

const TOOL_SHELL_PATHS = ["/tools/"];
const APP_SHELL_PATHS = ["/dashboard", "/signin", "/signup"];

export default function LayoutShell({ children, header, footer, float, lightbox }) {
  const pathname = usePathname();

  const isToolPage =
    TOOL_SHELL_PATHS.some((p) => pathname.startsWith(p)) &&
    pathname !== "/tools";

  const isAppPage = APP_SHELL_PATHS.some((p) => pathname.startsWith(p));
  const hideShell = isToolPage || isAppPage;

  return (
    <>
      {!hideShell && header}
      {children}
      {!hideShell && footer}
      {!hideShell && float}
      {!isAppPage && lightbox}
    </>
  );
}