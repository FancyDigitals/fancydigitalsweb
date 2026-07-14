import { NextResponse } from "next/server";
import { openrouter } from "@/lib/ai/openrouter";

export async function GET() {
  try {
    const completion = await openrouter.chat.completions.create({
      model: "anthropic/claude-sonnet-4.6",
      messages: [
        {
          role: "user",
          content: "Reply with only: OpenRouter works",
        },
      ],
    });

    return NextResponse.json({
      success: true,
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}