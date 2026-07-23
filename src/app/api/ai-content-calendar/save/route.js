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
    const {
      id,
      title,
      brand_name,
      mode,
      industry,
      audience,
      tone,
      goal,
      platforms,
      start_date,
      duration_days,
      input_data,
      posts,
    } = body;

    const payload = {
      user_id: user.id,
      title: title || brand_name || "Untitled Calendar",
      brand_name,
      mode: mode || "planning",
      industry,
      audience,
      tone,
      goal,
      platforms: platforms || [],
      start_date,
      duration_days,
      input_data: input_data || {},
      posts: posts || [],
      updated_at: new Date().toISOString(),
    };

    let result;
    if (id) {
      const { data, error } = await supabase
        .from("content_calendars")
        .update(payload)
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await supabase
        .from("content_calendars")
        .insert(payload)
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Content calendar save error:", error);
    return NextResponse.json(
      { error: error.message || "Save failed" },
      { status: 500 }
    );
  }
}