"use client";

import { usePathname } from "next/navigation";

export default function DashboardDetector({
  header,
  footer,
  float,
  lightbox,
  children,
}) {
  const pathname = usePathname();
    const isDashboard =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/p/");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      {children}
      {footer}
      {float}
      {lightbox}
    </>
  );
}