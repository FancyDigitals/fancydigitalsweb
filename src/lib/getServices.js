import { services as baseServices } from "@/content/services";
import { readOverride } from "@/lib/adminStorage";

export function getServices() {
  if (typeof window === "undefined") return baseServices;

  const override = readOverride("content.services");

  if (!override || !Array.isArray(override)) {
    return baseServices;
  }

  return override;
}

export function getPublishedServices() {
  return getServices().filter((s) => s.published !== false);
}
