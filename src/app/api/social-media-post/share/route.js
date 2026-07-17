import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { randomBytes } from "crypto";

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
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Verify ownership
    const { data: existing } = await supabase
      .from("social_posts")
      .select("id, share_token, is_public")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (!existing) {
      return NextResponse.json(
        { error: "Post set not found" },
        { status: 404 }
      );
    }

    // Reuse existing token or create new one
    const shareToken =
      existing.share_token || randomBytes(16).toString("hex");

    const { error } = await supabase
      .from("social_posts")
      .update({
        share_token: shareToken,
        is_public: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Share error:", error);
      return NextResponse.json(
        { error: "Failed to create share link" },
        { status: 500 }
      );
    }

    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/social-post/${shareToken}`;

    return NextResponse.json({ success: true, shareToken, shareUrl });
  } catch (error) {
    console.error("Share route error:", error);
    return NextResponse.json(
      { error: "Failed to create share link" },
      { status: 500 }
    );
  }
}