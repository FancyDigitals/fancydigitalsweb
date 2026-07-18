import { NextResponse } from "next/server";
import { generateJSON } from "@/lib/ai/gemini";
import { createClient } from "@/lib/supabase/server";

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { platform, caption, topic, tone, goal } = await request.json();

    const prompt = `You are a world-class visual director and AI image prompting expert. 
    Analyze this social media post and provide a professional image brief.

    Platform: ${platform}
    Topic: ${topic}
    Tone: ${tone}
    Goal: ${goal}
    Caption: ${caption}

    CRITICAL: Return PLAIN TEXT ONLY. Never use markdown.

    Return a JSON object with this exact structure:
    {
      "image_direction": "Detailed description of what the image should show",
      "composition": "Advice on framing, angles, and layout",
      "mood": "Color palette and emotional feel",
      "text_overlay": "Suggested text to put ON the image (keep it short)",
      "avoid": "What to stay away from to avoid looking unprofessional",
      "dimensions": "e.g., 1080x1080",
      "aspect_ratio": "e.g., 1:1",
      "ai_prompt": "A highly detailed, professional prompt for Midjourney, DALL-E, or Canva AI"
    }`;

    const result = await generateJSON(prompt);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Image brief error:", error);
    return NextResponse.json({ error: "Failed to generate brief" }, { status: 500 });
  }
}