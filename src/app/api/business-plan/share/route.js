import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { randomBytes } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated." },
        { status: 401 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Plan ID is required." },
        { status: 400 }
      );
    }

    // Verify ownership
    const { data: existing, error: fetchError } = await supabase
      .from("business_plans")
      .select("id, share_token, is_public")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        { success: false, error: "Plan not found." },
        { status: 404 }
      );
    }

    // Reuse existing token or generate new one
    const shareToken = existing.share_token || randomBytes(16).toString("hex");

    const { error: updateError } = await supabase
      .from("business_plans")
      .update({
        share_token: shareToken,
        is_public: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id);

    if (updateError) throw updateError;

    const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/business-plan/${shareToken}`;

    return NextResponse.json({
      success: true,
      shareToken,
      shareUrl,
    });
  } catch (error) {
    console.error("[business-plan/share]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}