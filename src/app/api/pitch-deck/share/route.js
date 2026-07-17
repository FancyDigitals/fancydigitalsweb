import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: "Not authenticated." }, { status: 401 });
    }

    const { deckId } = await req.json();
    if (!deckId) {
      return NextResponse.json({ success: false, error: "Missing deck ID." }, { status: 400 });
    }

    // Generate unique share token
    const shareToken = crypto.randomBytes(16).toString("hex");

    const { data, error } = await supabase
      .from("pitch_decks")
      .update({ share_token: shareToken, is_public: true })
      .eq("id", deckId)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) throw error;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fancydigitals.com.ng";
    const shareUrl = `${baseUrl}/pitch/${shareToken}`;

    return NextResponse.json({ success: true, shareUrl, shareToken });
  } catch (error) {
    console.error("[pitch-deck/share]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}