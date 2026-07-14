import { openrouter } from "@/lib/ai/openrouter";
import { CHAT_MODELS } from "./models";
import { buildDirectorPrompt } from "./prompts/director";

export async function generateCreativeDirection(data) {
  console.log("========== DIRECTOR START ==========");

  const prompt = buildDirectorPrompt(data);

  console.log("MODEL:", CHAT_MODELS.director);
  console.log("PROMPT LENGTH:", prompt.length);

  try {
    const response = await openrouter.chat.completions.create({
      model: CHAT_MODELS.director,
      response_format: {
        type: "json_object",
      },
      temperature: 0.8,
      messages: [
        {
          role: "system",
          content:
            "You are an award-winning Creative Director. Return valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log("OPENROUTER RESPONSE:");
    console.dir(response, { depth: 5 });

    const content = response?.choices?.[0]?.message?.content;

    console.log("CONTENT:");
    console.log(content);

    if (!content) {
      throw new Error("No content returned.");
    }

    const cleaned = content
  .replace(/^```json/i, "")
  .replace(/^```/i, "")
  .replace(/```$/i, "")
  .trim();

return JSON.parse(cleaned);
  } catch (err) {
    console.error("DIRECTOR ERROR:");
    console.error(err);
    throw err;
  }
}