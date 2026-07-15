export async function POST(req) {
  try {
    const usage = await checkAndIncrementUsage("youtube-auditor");
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

    const {
      channelUrl,
      generateInsights = true,
      skipSave = false,
    } = await req.json();

    if (!channelUrl) {
      return NextResponse.json(
        { success: false, error: "Missing channelUrl" },
        { status: 400 }
      );
    }

    console.log(
      `[YT-Auditor] ${channelUrl} · plan=${usage.plan} · insights=${generateInsights}`
    );

    // ===== 1. FETCH DATA =====
    const { channel, videos } = await fetchFullChannelData(channelUrl);
    const enrichedChannel = calculateMetrics({ channel, videos });

    // ===== 2. AI INSIGHTS (only if requested) =====
    let insights = null;
    if (generateInsights) {
      try {
        insights = await generateAuditInsights({
          channel: enrichedChannel,
          videos,
        });
      } catch (err) {
        console.error("[YT-Auditor] Insight generation failed:", err.message);
        insights = { error: err.message };
      }
    }

    // ===== 3. SAVE (skip on insights-only call) =====
    if (!skipSave) {
      try {
        const supabase = await createClient();
        await supabase.from("projects").insert({
          user_id: usage.userId,
          tool_slug: "youtube-auditor",
          title: `${enrichedChannel.title} — YouTube Audit`,
          prompt: channelUrl,
          input_data: { channelUrl },
          output_data: {
            channel: enrichedChannel,
            videos: videos?.slice(0, 20),
            insights,
          },
        });
      } catch (saveErr) {
        console.warn("[YT-Auditor] Save failed (non-fatal):", saveErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      channel: enrichedChannel,
      videos,
      insights,
      usage: {
        used: usage.used,
        limit: usage.limit,
        plan: usage.plan,
      },
    });
  } catch (error) {
    console.error("[YT-Auditor]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}