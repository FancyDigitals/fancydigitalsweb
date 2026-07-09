import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

const admin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json({ error: "courseId required" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Check if already enrolled
    const { data: existing } = await admin
      .from("academy_enrollments")
      .select("id")
      .eq("user_id", user.id)
      .eq("course_id", courseId)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ success: true, alreadyEnrolled: true });
    }

    // Enroll
    await admin.from("academy_enrollments").insert({
      user_id: user.id,
      course_id: courseId,
    });

    // Update student count
    await admin.rpc("increment_student_count", { course_id_input: courseId });

    // Award enrollment XP
    await admin.from("academy_xp_log").insert({
      user_id: user.id,
      xp: 5,
      reason: "Enrolled in course",
      course_id: courseId,
    });

    await admin.rpc("increment_xp", {
      user_id_input: user.id,
      xp_amount: 5,
    });

    return NextResponse.json({ success: true, enrolled: true });
  } catch (error) {
    console.error("Enroll error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}