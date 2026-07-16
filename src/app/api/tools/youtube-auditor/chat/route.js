import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { openrouter } from "@/lib/ai/openrouter";
import { isPro } from "@/lib/pricing";

export const runtime = "edge";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const MODELS = ["google/gemini-2.5-flash", "openai/gpt-4o-mini"];

export async function POST(req) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();

    if (!isPro(profile?.plan)) {
      return NextResponse.json(
        {
          success: false,
          error: "AI Chat is a Pro feature",
          requiresUpgrade: true,
        },
        { status: 403 }
      );
    }

    const { message, auditData, history = [] } = await req.json();

    if (!message?.trim() || !auditData) {
      return NextResponse.json(
        { success: false, error: "Missing message or audit data" },
        { status: 400 }
      );
    }

    // Compact audit summary for AI context
    const context = buildContext(auditData);

    const systemPrompt = `You are a senior YouTube growth strategist embedded inside Fancy Digitals YouTube Auditor.

The user has already run a full audit on the channel below. Answer their questions using ONLY the audit data as context. Be specific, actionable, and reference actual numbers from the data. Never give generic advice.

If the user asks something you cannot determine from the audit data, say so honestly and suggest what data would be needed.

Keep answers concise (2-4 short paragraphs max) unless they ask for a plan or list. Use plain text, no markdown headers.

CHANNEL AUDIT DATA:
${context}`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.slice(-6), // last 3 exchanges
      { role: "user", content: message },
    ];

    let response = null;
    let usedModel = null;
    const errors = [];

    for (const model of MODELS) {
      try {
        const result = await openrouter.chat.completions.create({
          model,
          temperature: 0.7,
          max_tokens: 800,
          messages,
        });

        const content = result?.choices?.[0]?.message?.content;
        if (content && content.length > 20) {
          response = content;
          usedModel = model;
          break;
        }
      } catch (err) {
        errors.push(`${model}: ${err.message}`);
      }
    }

    if (!response) {
      throw new Error("All AI models failed: " + errors.join(" · "));
    }

    return NextResponse.json({
      success: true,
      reply: response,
      model: usedModel,
    });
  } catch (err) {
    console.error("[chat]", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

function buildContext(data) {
  const { channel, insights } = data;
  const m = channel?.metrics || {};

  const parts = [
    `Channel: ${channel.title} (@${channel.customUrl || "unknown"})`,
    `Since: ${new Date(channel.publishedAt).getFullYear()} · Country: ${channel.country || "unknown"}`,
    `Subscribers: ${channel.subscribers} · Total views: ${channel.totalViews} · Video count: ${channel.videoCount}`,
    `Avg views: ${m.avgViews} · Avg likes: ${m.avgLikes} · Avg comments: ${m.avgComments}`,
    `View/sub ratio: ${m.viewToSubRatio?.toFixed(2)} · Like ratio: ${m.likeRatio?.toFixed(2)}%`,
    `Uploads per month: ${m.uploadsPerMonth} · Avg video duration: ${m.avgDurationFormatted}`,
    `Days since latest upload: ${Math.round(m.daysSinceLatest || 0)}`,
    `Estimated watch hours: ${m.estimatedWatchHours}`,
    `Monetization: ${m.monetization?.monetizable ? "eligible" : "not yet eligible"} · ETA: ${m.monetization?.eta}`,
  ];

  if (m.topVideos?.length) {
    parts.push(
      `\nTOP 5 VIDEOS:\n${m.topVideos
        .map((v, i) => `${i + 1}. "${v.title}" — ${v.views} views`)
        .join("\n")}`
    );
  }

  if (insights?.summary) parts.push(`\nSUMMARY: ${insights.summary}`);
  if (insights?.strengths?.length)
    parts.push(`STRENGTHS: ${insights.strengths.join(" · ")}`);
  if (insights?.weaknesses?.length)
    parts.push(`WEAKNESSES: ${insights.weaknesses.join(" · ")}`);
  if (insights?.redFlags?.length)
    parts.push(`RED FLAGS: ${insights.redFlags.join(" · ")}`);
  if (insights?.contentStrategy?.niche)
    parts.push(`NICHE: ${insights.contentStrategy.niche}`);
  if (insights?.actionPlan?.length) {
    parts.push(
      `\nACTION PLAN:\n${insights.actionPlan
        .map((a, i) => `${i + 1}. [${a.priority}] ${a.action}`)
        .join("\n")}`
    );
  }

  return parts.join("\n");
}