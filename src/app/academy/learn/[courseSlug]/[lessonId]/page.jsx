import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import LessonPlayer from "./client";

const admin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export default async function LessonPage({ params }) {
  const { courseSlug, lessonId } = await params;

  // Auth check
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  // Get lesson
  const { data: lesson } = await admin
    .from("academy_lessons")
    .select(`
      *,
      academy_modules (
        id, title, order_index,
        academy_courses (
          id, slug, title, total_lessons
        )
      )
    `)
    .eq("id", lessonId)
    .single();

  if (!lesson) notFound();

  // Get course
  const course = lesson.academy_modules?.academy_courses;
  if (!course || course.slug !== courseSlug) notFound();

  // Get all lessons for sidebar
  const { data: allModules } = await admin
    .from("academy_modules")
    .select(`
      id, title, order_index, is_free,
      academy_lessons (
        id, title, duration_minutes, order_index,
        is_free, has_quiz, xp_reward
      )
    `)
    .eq("course_id", course.id)
    .order("order_index");

  // Get user progress
  const { data: progressData } = await admin
    .from("academy_progress")
    .select("lesson_id, quiz_passed, quiz_score")
    .eq("user_id", user.id)
    .eq("course_id", course.id);

  const completedLessons = (progressData || [])
    .filter((p) => p.quiz_passed)
    .map((p) => p.lesson_id);

  // Get user profile
  const { data: profile } = await admin
    .from("profiles")
    .select("plan, total_xp, streak_days, full_name")
    .eq("id", user.id)
    .single();

  const isPro = profile?.plan !== "free";

  // Check access
  const isFree = lesson.is_free;
  const moduleIsFree = lesson.academy_modules?.is_free ?? false;
  const hasAccess = isFree || moduleIsFree || isPro;

  // Get quiz questions
  const { data: quizQuestions } = await admin
    .from("academy_quiz_questions")
    .select("id, question, options, order_index, explanation")
    .eq("lesson_id", lessonId)
    .order("order_index");

  // Find next lesson
  let nextLesson = null;
  const allLessons = (allModules || [])
    .flatMap((m) =>
      (m.academy_lessons || [])
        .sort((a, b) => a.order_index - b.order_index)
        .map((l) => ({ ...l, moduleTitle: m.title }))
    );

  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
    nextLesson = allLessons[currentIndex + 1];
  }

  return (
    <LessonPlayer
      lesson={lesson}
      course={course}
      allModules={allModules || []}
      completedLessons={completedLessons}
      quizQuestions={quizQuestions || []}
      nextLesson={nextLesson}
      profile={profile}
      isPro={isPro}
      hasAccess={hasAccess}
      userId={user.id}
    />
  );
}