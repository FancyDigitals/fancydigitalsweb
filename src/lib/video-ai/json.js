export function parseAIJSON(text = "") {
  text = String(text);

  text = text
    .replace(/^```json/i, "")
    .replace(/^```/i, "")
    .replace(/```$/i, "")
    .trim();

  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");

  if (first !== -1 && last !== -1) {
    text = text.slice(first, last + 1);
  }

  return JSON.parse(text);
}