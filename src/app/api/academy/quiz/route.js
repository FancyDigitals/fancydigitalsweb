import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

const admin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// GET — fetch quiz questions for a lesson
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lessonId = searchParams.get("lessonId");

    if (!lessonId) {
      return NextResponse.json({ error: "lessonId required" }, { status: 400 });
    }

    const { data: questions } = await admin
      .from("academy_quiz_questions")
      .select("id, question, options, order_index, explanation")
      .eq("lesson_id", lessonId)
      .order("order_index");

    return NextResponse.json({ success: true, questions: questions || [] });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST — submit quiz attempt
export async function POST(request) {
  try {
    const body = await request.json();
    const { lessonId, answers } = body;

    if (!lessonId || !answers) {
      return NextResponse.json({ error: "lessonId and answers required" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Fetch correct answers
    const { data: questions } = await admin
      .from("academy_quiz_questions")
      .select("id, correct_answer, explanation, question, options")
      .eq("lesson_id", lessonId)
      .order("order_index");

    if (!questions || questions.length === 0) {
      return NextResponse.json({ error: "No questions found" }, { status: 404 });
    }

    // Grade the quiz
    let correct = 0;
    const results = questions.map((q, i) => {
      const studentAnswer = answers[i];
      const isCorrect = studentAnswer === q.correct_answer;
      if (isCorrect) correct++;
      return {
        questionId: q.id,
        question: q.question,
        options: q.options,
        studentAnswer,
        correctAnswer: q.correct_answer,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const score = Math.round((correct / questions.length) * 100);
    const passed = score >= 70;

    // Save attempt
    await admin.from("academy_quiz_attempts").insert({
      user_id: user.id,
      lesson_id: lessonId,
      answers,
      score,
      passed,
    });

    // If passed — update progress and award XP
    if (passed) {
      // Get lesson info
      const { data: lesson } = await admin
        .from("academy_lessons")
        .select("course_id, xp_reward")
        .eq("id", lessonId)
        .single();

      if (lesson) {
        // Upsert progress
        const { data: existing } = await admin
          .from("academy_progress")
          .select("id, quiz_passed")
          .eq("user_id", user.id)
          .eq("lesson_id", lessonId)
          .maybeSingle();

        if (existing) {
          await admin
            .from("academy_progress")
            .update({
              completed: true,
              completed_at: new Date().toISOString(),
              quiz_passed: true,
              quiz_score: score,
            })
            .eq("id", existing.id);
        } else {
          await admin.from("academy_progress").insert({
            user_id: user.id,
            lesson_id: lessonId,
            course_id: lesson.course_id,
            completed: true,
            completed_at: new Date().toISOString(),
            quiz_passed: true,
            quiz_score: score,
          });
        }

        // Award XP if first time passing
        if (!existing?.quiz_passed) {
          const xpAmount = lesson.xp_reward + (score === 100 ? 25 : 0);

          await admin.from("academy_xp_log").insert({
            user_id: user.id,
            xp: xpAmount,
            reason: `Passed quiz: ${lessonId}`,
            lesson_id: lessonId,
            course_id: lesson.course_id,
          });

          // Update total XP on profile
          await admin.rpc("increment_xp", {
            user_id_input: user.id,
            xp_amount: xpAmount,
          });
        }

        // Check if course is complete
        const { count: totalLessons } = await admin
          .from("academy_lessons")
          .select("id", { count: "exact", head: true })
          .eq("course_id", lesson.course_id);

        const { count: completedLessons } = await admin
          .from("academy_progress")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("course_id", lesson.course_id)
          .eq("completed", true);

        if (completedLessons >= totalLessons) {
          // Issue certificate
          const { data: course } = await admin
            .from("academy_courses")
            .select("title")
            .eq("id", lesson.course_id)
            .single();

          const { data: profile } = await admin
            .from("profiles")
            .select("full_name")
            .eq("id", user.id)
            .single();

          await admin
            .from("academy_certificates")
            .upsert({
              user_id: user.id,
              course_id: lesson.course_id,
              student_name: profile?.full_name || user.email,
              course_title: course?.title,
              issued_at: new Date().toISOString(),
            }, { onConflict: "user_id,course_id" });

          // Award completion XP
          await admin.from("academy_xp_log").insert({
            user_id: user.id,
            xp: 200,
            reason: "Course completed",
            course_id: lesson.course_id,
          });

          await admin.rpc("increment_xp", {
            user_id_input: user.id,
            xp_amount: 200,
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      score,
      passed,
      correct,
      total: questions.length,
      results,
    });
  } catch (error) {
    console.error("Quiz submit error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}