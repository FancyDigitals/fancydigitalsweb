import { openrouter } from "@/lib/ai/openrouter";
import { CHAT_MODELS } from "./models";
import { buildStoryboardPrompt } from "./prompts/storyboard";

export async function generateStoryboard({
  creativeDirection,
  duration,
}) {
  const prompt = buildStoryboardPrompt({
    creativeDirection,
    duration,
  });

  const response = await openrouter.chat.completions.create({
    model: CHAT_MODELS.storyboard,
    temperature: 0.8,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content:
          "You are an award-winning commercial storyboard artist. Return valid JSON only.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = response.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Storyboard generation failed.");
  }

const cleaned = content
  .replace(/^```json/i, "")
  .replace(/^```/i, "")
  .replace(/```$/i, "")
  .trim();

return JSON.parse(cleaned);
}