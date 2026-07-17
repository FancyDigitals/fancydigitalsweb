import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, platforms, topic, tone, audience, input_data, posts } = body;

    if (!posts) {
      return NextResponse.json(
        { error: "Posts data is required" },
        { status: 400 }
      );
    }

    const record = {
      user_id: user.id,
      title: title || `Social posts — ${topic || "Untitled"}`,
      platforms: platforms || [],
      topic: topic || "",
      tone: tone || "",
      audience: audience || "",
      input_data: input_data || {},
      posts: posts,
      updated_at: new Date().toISOString(),
    };

    let data, error;

    if (id) {
      // Update existing
      const result = await supabase
        .from("social_posts")
        .update(record)
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();
      data = result.data;
      error = result.error;
    } else {
      // Insert new
      const result = await supabase
        .from("social_posts")
        .insert(record)
        .select()
        .single();
      data = result.data;
      error = result.error;
    }

    if (error) {
      console.error("Save error:", error);
      return NextResponse.json(
        { error: "Failed to save posts" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Save route error:", error);
    return NextResponse.json(
      { error: "Failed to save posts" },
      { status: 500 }
    );
  }
}