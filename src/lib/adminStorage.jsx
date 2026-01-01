const PREFIX = "fd_cms_override_v1:";

export function readOverride(key) {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeOverride(key, value) {
  if (typeof window === "undefined") return;

  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}

export function clearOverride(key) {
  if (typeof window === "undefined") return;

  localStorage.removeItem(PREFIX + key);
}
