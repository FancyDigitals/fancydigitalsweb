"use client";

import { usePathname } from "next/navigation";

const TOOL_SHELL_PATHS = ["/tools/"];

export default function LayoutShell({ children, header, footer, float, lightbox }) {
  const pathname = usePathname();

  const isToolPage =
    TOOL_SHELL_PATHS.some((p) => pathname.startsWith(p)) &&
    pathname !== "/tools";

  return (
    <>
      {!isToolPage && header}
      {children}
      {!isToolPage && footer}
      {!isToolPage && float}
      {lightbox}
    </>
  );
}