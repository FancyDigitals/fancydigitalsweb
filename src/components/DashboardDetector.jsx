"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ROOT_DOMAIN = "fancydigitals.com.ng";
const RESERVED_SUBDOMAINS = ["www", "blog", "portal", "api", "admin", "app", "mail"];

export default function DashboardDetector({
  header,
  footer,
  float,
  lightbox,
  children,
}) {
  const pathname = usePathname();
  const [isSubdomain, setIsSubdomain] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const host = window.location.hostname;
    if (host.endsWith(`.${ROOT_DOMAIN}`)) {
      const sub = host.replace(`.${ROOT_DOMAIN}`, "");
      if (sub && !RESERVED_SUBDOMAINS.includes(sub)) {
        setIsSubdomain(true);
      }
    }
  }, []);

  const hideChrome =
    isSubdomain ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/p/") ||
    pathname.startsWith("/client") ||
    pathname.startsWith("/academy");

  if (hideChrome) {
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