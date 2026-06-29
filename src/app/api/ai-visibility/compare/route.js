import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { scanUrl } from "@/lib/ai-visibility/scanner";
import { isPro } from "@/lib/pricing";

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { yourUrl, competitorUrl } = body;

    if (!yourUrl || !competitorUrl) {
      return NextResponse.json({ error: "Both URLs are required" }, { status: 400 });
    }

    // Gate: Pro only feature
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();

    const userPlan = profile?.plan || "FREE";
    if (!isPro(userPlan)) {
      return NextResponse.json(
        { error: "Competitor comparison is a Pro feature. Upgrade to compare." },
        { status: 403 }
      );
    }

    // Run both scans in parallel
    let yourScan, competitorScan;
    try {
      [yourScan, competitorScan] = await Promise.all([
        scanUrl(yourUrl),
        scanUrl(competitorUrl),
      ]);
    } catch (err) {
      return NextResponse.json(
        { error: err.message || "One or both URLs could not be scanned" },
        { status: 400 }
      );
    }

    // Generate insights
    const insights = generateInsights(yourScan, competitorScan);

    return NextResponse.json({
      success: true,
      you: yourScan,
      competitor: competitorScan,
      insights,
    });
  } catch (error) {
    console.error("Compare error:", error);
    return NextResponse.json(
      { error: error.message || "Comparison failed" },
      { status: 500 }
    );
  }
}

function generateInsights(you, competitor) {
  const yourScores = you.scores;
  const compScores = competitor.scores;

  const wins = [];
  const losses = [];
  const ties = [];

  for (const key of Object.keys(yourScores)) {
    const diff = yourScores[key] - compScores[key];
    if (diff > 5) wins.push({ key, yourScore: yourScores[key], compScore: compScores[key], diff });
    else if (diff < -5) losses.push({ key, yourScore: yourScores[key], compScore: compScores[key], diff });
    else ties.push({ key, yourScore: yourScores[key], compScore: compScores[key], diff });
  }

  // Sort losses by biggest gap (most urgent fixes)
  losses.sort((a, b) => a.diff - b.diff);
  wins.sort((a, b) => b.diff - a.diff);

  const overallDiff = you.overall - competitor.overall;
  let verdict;
  if (overallDiff >= 10) verdict = "winning";
  else if (overallDiff <= -10) verdict = "losing";
  else verdict = "close";

  return {
    overallDiff,
    verdict,
    wins,
    losses,
    ties,
    biggestGap: losses[0] || null,
    biggestStrength: wins[0] || null,
  };
}