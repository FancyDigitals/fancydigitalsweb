import { openrouter } from "./openrouter";
import { generateWithGemini } from "./gemini";
import { AI_MODELS } from "./models";

export async function generateAI({
  prompt,
  task = "chat",
  jsonMode = false,
  model,
  temperature = 0.2,
  maxTokens = 16000,
}) {
  const selectedModel =
    model ||
    AI_MODELS[task.toUpperCase()] ||
    AI_MODELS.CHAT;

  try {
    console.log(`[AI] OpenRouter → ${selectedModel}`);

    const completion = await openrouter.chat.completions.create({
      model: selectedModel,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature,
      max_tokens: maxTokens,
      response_format: jsonMode
        ? { type: "json_object" }
        : undefined,
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.warn("[AI] OpenRouter failed");
    console.warn(err.message);

    return generateWithGemini(prompt, {
      jsonMode,
    });
  }
}