import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { resume } = await request.json();

    if (!resume) {
      return NextResponse.json({ error: "Resume required" }, { status: 400 });
    }

    // Find the most recent resume project for this user
    const { data: latestProject } = await supabase
      .from("projects")
      .select("id")
      .eq("user_id", user.id)
      .eq("tool_slug", "ai-resume-builder")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (latestProject) {
      // Update the existing project with edited resume
      await supabase
        .from("projects")
        .update({ output_data: resume })
        .eq("id", latestProject.id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update resume error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}