/* ============================================
   ANALYTICS HELPER
   Call these functions from any tool component
============================================ */

export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "undefined") return;

  window.gtag("event", eventName, {
    event_category: params.category || "Tools",
    event_label: params.label || "",
    value: params.value || 0,
    ...params,
  });
}

// Track when a tool is opened / viewed
export function trackToolView(toolName) {
  trackEvent("tool_view", {
    category: "Tools",
    label: toolName,
    tool_name: toolName,
  });
}

// Track when a tool generates output
export function trackToolUse(toolName, action = "generate") {
  trackEvent("tool_use", {
    category: "Tools",
    label: `${toolName} — ${action}`,
    tool_name: toolName,
    action,
  });
}

// Track when user copies result from a tool
export function trackToolCopy(toolName) {
  trackEvent("tool_copy", {
    category: "Tools",
    label: toolName,
    tool_name: toolName,
  });
}

// Track when user downloads from a tool
export function trackToolDownload(toolName, format = "unknown") {
  trackEvent("tool_download", {
    category: "Tools",
    label: `${toolName} — ${format}`,
    tool_name: toolName,
    format,
  });
}

// Track contact form / CTA clicks
export function trackCTA(label, destination) {
  trackEvent("cta_click", {
    category: "CTA",
    label,
    destination,
  });
}

// Track waitlist signups
export function trackWaitlist(toolName) {
  trackEvent("waitlist_join", {
    category: "Waitlist",
    label: toolName,
    tool_name: toolName,
  });
}