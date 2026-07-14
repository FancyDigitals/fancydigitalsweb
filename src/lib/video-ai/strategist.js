import { openrouter } from "@/lib/ai/openrouter";
import { CHAT_MODELS } from "./models";
import { buildStrategyPrompt } from "./prompts/strategy";

export async function generateStrategy(input) {
  const prompt = buildStrategyPrompt(input);

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
          "You are a world-class Creative Strategist. Return JSON only.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content);
}