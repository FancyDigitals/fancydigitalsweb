import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

export async function POST(request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    // Check existing share token
    const { data: existing } = await supabase
      .from("content_calendars")
      .select("share_token")
      .eq("id", id)
      .eq("user_id", user.id)
      .maybeSingle();

    let shareToken = existing?.share_token;

    if (!shareToken) {
      shareToken = crypto.randomBytes(16).toString("hex");
      await supabase
        .from("content_calendars")
        .update({ share_token: shareToken, is_public: true })
        .eq("id", id)
        .eq("user_id", user.id);
    } else {
      await supabase
        .from("content_calendars")
        .update({ is_public: true })
        .eq("id", id)
        .eq("user_id", user.id);
    }

    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    const shareUrl = `${baseUrl}/content-calendar/${shareToken}`;

    return NextResponse.json({ success: true, shareUrl, shareToken });
  } catch (error) {
    console.error("Content calendar share error:", error);
    return NextResponse.json(
      { error: error.message || "Share failed" },
      { status: 500 }
    );
  }
}