import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function GET(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.email !== "fancydigitalsng@gmail.com") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "courseId required" }, { status: 400 });
    }

    const admin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data: modules } = await admin
      .from("academy_modules")
      .select(`
        id, title, order_index, is_free,
        academy_lessons (
          id, title, duration_minutes, order_index,
          is_free, has_quiz, xp_reward,
          hero_image, video_embed
        )
      `)
      .eq("course_id", courseId)
      .order("order_index");

    return NextResponse.json({ success: true, modules: modules || [] });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}