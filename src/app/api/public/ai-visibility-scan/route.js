import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { scanUrl } from "@/lib/ai-visibility/scanner";

const ANON_DAILY_LIMIT = 1;

function getIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const ipAddress = getIp(request);
    if (!ipAddress || ipAddress === "unknown") {
      return NextResponse.json({ error: "Could not identify request" }, { status: 400 });
    }

    // Anonymous rate limiting using anonymous_usage table
    const supabaseAdmin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const today = new Date().toISOString().split("T")[0];
    const toolSlug = "ai-visibility-checker";
    const ipKey = `${ipAddress}_${toolSlug}_${today}`;

    const { data: existing } = await supabaseAdmin
      .from("anonymous_usage")
      .select("*")
      .eq("ip_key", ipKey)
      .maybeSingle();

    const currentCount = existing?.count || 0;

    if (currentCount >= ANON_DAILY_LIMIT) {
      return NextResponse.json(
        {
          error: "You've used your free scan today. Sign up free to scan more, or upgrade to Pro for unlimited.",
          requiresSignup: true,
        },
        { status: 429 }
      );
    }

    // Run scan
    let result;
    try {
      result = await scanUrl(url);
    } catch (err) {
      return NextResponse.json({ error: err.message || "Scan failed" }, { status: 400 });
    }

    // Increment usage
    if (existing) {
      await supabaseAdmin
        .from("anonymous_usage")
        .update({ count: currentCount + 1 })
        .eq("ip_key", ipKey);
    } else {
      await supabaseAdmin.from("anonymous_usage").insert({
        ip_key: ipKey,
        ip_address: ipAddress,
        tool_slug: toolSlug,
        date: today,
        count: 1,
      });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Public scan error:", error);
    return NextResponse.json(
      { error: error.message || "Internal error" },
      { status: 500 }
    );
  }
}