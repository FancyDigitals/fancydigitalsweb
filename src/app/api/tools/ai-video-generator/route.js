import { NextResponse } from "next/server";
import { generateVideoProject } from "@/lib/video-ai/project";
import { checkAndIncrementUsage } from "@/lib/usage";

export const runtime = "nodejs";
export const maxDuration = 300;
export const dynamic = "force-dynamic";

/**
 * Read the entire request body as a string, bypassing Next.js's
 * built-in 10MB middleware body limit.
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
    // ============================================
    // AUTH + QUOTA GATE (before doing any AI work)
    // ============================================
    const usage = await checkAndIncrementUsage("ai-video-generator");

    if (!usage.allowed) {
      const status = usage.error === "Not authenticated" ? 401 : 429;
      return NextResponse.json(
        {
          success: false,
          error: usage.error,
          limit: usage.limit,
          used: usage.used,
          requiresUpgrade: status === 429,
        },
        { status }
      );
    }

    console.log(
      `[video-gen] User ${usage.userId} · ${usage.plan} · ${usage.used}/${usage.limit || "∞"}`
    );

    // ============================================
    // PARSE PAYLOAD (streamed to bypass 10MB limit)
    // ============================================
    const raw = await readFullBody(req);
    const sizeMb = (raw.length / (1024 * 1024)).toFixed(2);
    console.log(`[video-gen] Payload: ${sizeMb}MB`);

    let body;
    try {
      body = JSON.parse(raw);
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid JSON body (${sizeMb}MB). Try fewer or smaller images.`,
        },
        { status: 400 }
      );
    }

    // ============================================
    // GENERATE
    // ============================================
    const project = await generateVideoProject({
      ...body,
      aspectRatio: body.aspectRatio || "9:16",
      uploadedImages: body.uploadedImages || [],
      creativeBrief: body.creativeBrief || "",
      brand: body.brand || null,
      customVoiceover: body.customVoiceover || null,
      customMusic: body.customMusic || null,
      isPro: usage.isPro,
    });

    return NextResponse.json({
      success: true,
      project,
      usage: {
        used: usage.used,
        limit: usage.limit,
        plan: usage.plan,
      },
    });
  } catch (error) {
    console.error("[video-gen]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}