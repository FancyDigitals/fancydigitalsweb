import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateMetaAdsStrategy } from "@/lib/ai/meta-ads";

const ADMIN_EMAIL = "fancydigitalsng@gmail.com";

export async function POST(req) {
  try {
    // Auth check
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const {
      businessName,
      businessDescription,
      productService,
      targetAudience,
      budget,
      campaignGoal,
      pastResults,
      brandColor,
      location,
      additionalContext,
    } = body;

    if (!businessName?.trim() || !productService?.trim() || !targetAudience?.trim()) {
      return NextResponse.json(
        { error: "Business name, product/service, and target audience are required" },
        { status: 400 }
      );
    }

    console.log("[Meta Ads] Generating strategy for:", businessName);

    const strategy = await generateMetaAdsStrategy({
      businessName,
      businessDescription: businessDescription || "",
      productService,
      targetAudience,
      budget: budget || "Not specified",
      campaignGoal: campaignGoal || "Sales",
      pastResults,
      brandColor,
      location,
      additionalContext,
    });

    return NextResponse.json({
      success: true,
      strategy,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[Meta Ads] Generation error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to generate strategy" },
      { status: 500 }
    );
  }
}