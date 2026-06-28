import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { scanUrl } from "@/lib/ai-visibility/scanner";
import { isPro } from "@/lib/pricing";

// Free plan: 3 scans per day
const FREE_DAILY_LIMIT = 3;

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Check plan
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();

    const userPlan = profile?.plan || "FREE";
    const userIsPro = isPro(userPlan);

    // Enforce free tier daily limit
    if (!userIsPro) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { count } = await supabase
        .from("ai_visibility_scans")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("created_at", today.toISOString());

      if ((count || 0) >= FREE_DAILY_LIMIT) {
        return NextResponse.json(
          {
            error: `Daily limit reached (${FREE_DAILY_LIMIT} scans/day on Free plan). Upgrade to Pro for unlimited scans.`,
            limitReached: true,
          },
          { status: 429 }
        );
      }
    }

    // Run the scan
    let result;
    try {
      result = await scanUrl(url);
    } catch (err) {
      return NextResponse.json(
        { error: err.message || "Scan failed" },
        { status: 400 }
      );
    }

    // Save scan to DB using admin client (to bypass RLS reliably)
    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data: saved, error: saveError } = await admin
      .from("ai_visibility_scans")
      .insert({
        user_id: user.id,
        url: result.url,
        domain: result.domain,
        overall_score: result.overall,
        scores: result.scores,
        signals: result.signals,
        recommendations: result.recommendations,
        raw_data: result.rawData,
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (saveError) {
      console.error("Save error:", saveError);
    }

    return NextResponse.json({
      success: true,
      scanId: saved?.id,
      result,
    });
  } catch (error) {
    console.error("Scan route error:", error);
    return NextResponse.json(
      { error: error.message || "Internal error" },
      { status: 500 }
    );
  }
}

// GET — list user's scans
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("ai_visibility_scans")
      .select("id, url, domain, overall_score, status, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) throw error;

    return NextResponse.json({ scans: data || [] });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch scans" },
      { status: 500 }
    );
  }
}

// DELETE — remove a scan
export async function DELETE(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Scan ID required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("ai_visibility_scans")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Delete failed" },
      { status: 500 }
    );
  }
}