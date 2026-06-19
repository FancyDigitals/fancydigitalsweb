"use client";

import { useEffect } from "react";

export default function ToolAnalytics({ toolName }) {
  useEffect(() => {
    if (!toolName) return;
    if (typeof window === "undefined") return;
    if (typeof window.gtag === "undefined") return;

    window.gtag("event", "tool_view", {
      event_category: "Tools",
      event_label: toolName,
      tool_name: toolName,
    });
  }, [toolName]);

  return null;
}