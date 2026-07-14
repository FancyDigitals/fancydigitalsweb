function truncate(str, max = 80) {
  if (typeof str !== "string") return str;
  if (str.startsWith("data:")) return `[base64 data: ${str.length} chars]`;
  if (str.length > max) return str.slice(0, max) + `...[${str.length} chars total]`;
  return str;
}

function sanitize(obj, seen = new WeakSet()) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "string") return truncate(obj, 200);
  if (typeof obj !== "object") return obj;

  if (seen.has(obj)) return "[circular]";
  seen.add(obj);

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitize(item, seen));
  }

  const out = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];

    // Strip known heavy fields entirely
    if (key === "image" || key === "logo" || key === "logoData") {
      out[key] = typeof val === "string" ? `[image: ${val.length} chars]` : "[image]";
      continue;
    }
    if (key === "voiceoverAudio") {
      out[key] = typeof val === "string" ? `[audio: ${val.length} chars]` : "[audio]";
      continue;
    }
    if (key === "mediaUrl" && typeof val === "string" && val.startsWith("data:")) {
      out[key] = `[base64 mediaUrl: ${val.length} chars]`;
      continue;
    }

    out[key] = sanitize(val, seen);
  }
  return out;
}

export function debugProject(project) {
  console.log("");
  console.log("============== VIDEO PROJECT (sanitized) ==============");
  console.log(JSON.stringify(sanitize(project), null, 2));
  console.log("=======================================================");
  return project;
}