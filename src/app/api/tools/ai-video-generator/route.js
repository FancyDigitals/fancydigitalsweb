import { NextResponse } from "next/server";
import { generateVideoProject } from "@/lib/video-ai/project";

export const runtime = "nodejs";
export const maxDuration = 600;
export const dynamic = "force-dynamic";

/**
 * Read the entire request body as a string, bypassing Next.js's
 * built-in 10MB middleware body limit. Streams raw bytes then parses.
 */
async function readFullBody(req) {
  const reader = req.body?.getReader();
  if (!reader) return "";

  const decoder = new TextDecoder();
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value, { stream: true });
  }
  result += decoder.decode();
  return result;
}

export async function POST(req) {
  try {
    const raw = await readFullBody(req);
    const sizeMb = (raw.length / (1024 * 1024)).toFixed(2);
    console.log(`[generate] Payload size: ${sizeMb}MB`);

    let body;
    try {
      body = JSON.parse(raw);
    } catch (err) {
      console.error("[generate] JSON parse failed:", err.message);
      return NextResponse.json(
        {
          success: false,
          error: `Invalid JSON body (${sizeMb}MB). Try fewer or smaller images.`,
        },
        { status: 400 }
      );
    }

    const project = await generateVideoProject({
      ...body,
      aspectRatio: body.aspectRatio || "9:16",
      uploadedImages: body.uploadedImages || [],
      creativeBrief: body.creativeBrief || "",
      brand: body.brand || null,
      customVoiceover: body.customVoiceover || null,
      customMusic: body.customMusic || null,
      isPro: body.isPro || false,
    });

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("[generate]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}