import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { generateLessonContent } from "@/lib/ai/lesson-generator";

export async function POST(request) {
  try {
    const body = await request.json();
    const { lessonId, studentAge } = body;

    if (!lessonId) {
      return NextResponse.json({ error: "Lesson ID required" }, { status: 400 });
    }

    const admin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Fetch lesson with module and course info
    const { data: lesson, error } = await admin
      .from("academy_lessons")
      .select(`
        *,
        academy_modules (
          title,
          order_index,
          course_id,
          academy_courses (
            title,
            description,
            total_lessons
          )
        )
      `)
      .eq("id", lessonId)
      .single();

    if (error || !lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    // TEMP: Disable cache while rebuilding the lesson engine.
// We'll restore caching after the new lesson format is stable.

    // Get lesson number
    const { count: lessonsBefore } = await admin
      .from("academy_lessons")
      .select("id", { count: "exact", head: true })
      .eq("course_id", lesson.course_id)
      .lte("order_index", lesson.order_index);

    // Generate fresh content
    const content = await generateLessonContent({
      lessonTitle: lesson.title,
      moduleTitle: lesson.academy_modules?.title,
      courseTitle: lesson.academy_modules?.academy_courses?.title,
      courseDescription: lesson.academy_modules?.academy_courses?.description,
      lessonNumber: lessonsBefore || lesson.order_index,
      totalLessons: lesson.academy_modules?.academy_courses?.total_lessons || 18,
      studentAge: studentAge || null,
    });

    // Cache it (only cache if no custom age — age-specific content is not cached)
    if (!studentAge) {
      await admin
        .from("academy_lessons")
        .update({
          content_cache: content,
          content_cached_at: new Date().toISOString(),
        })
        .eq("id", lessonId);
    }

    return NextResponse.json({
      success: true,
      content,
      cached: false,
    });
  } catch (error) {
    console.error("Lesson content error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate lesson content" },
      { status: 500 }
    );
  }
}