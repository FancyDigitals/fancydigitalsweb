import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  Clock,
  Users,
  CheckCircle2,
  Lock,
  Play,
  Award,
  ArrowRight,
  Star,
  Zap,
  Flame,
  Target,
  Trophy,
  ChevronRight,
  BarChart2,
  Globe,
} from "lucide-react";

const admin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: course } = await admin
    .from("academy_courses")
    .select("title, subtitle")
    .eq("slug", slug)
    .single();
  if (!course) return { title: "Course Not Found" };
  return {
    title: `${course.title} — Fancy Academy`,
    description: course.subtitle,
  };
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;

  const { data: course, error: courseError } = await admin
    .from("academy_courses")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  console.log("═══════════════════════════════════════");
  console.log("[Course Page] slug param:", slug);
  console.log("[Course Page] SUPABASE_URL exists:", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("[Course Page] SERVICE_ROLE exists:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
  console.log("[Course Page] course found:", !!course);
  console.log("[Course Page] error:", courseError);
  console.log("═══════════════════════════════════════");

  if (!course) notFound();


  const { data: modules } = await admin
    .from("academy_modules")
    .select(`
      *,
      academy_lessons (
        id, title, duration_minutes, order_index,
        is_free, has_quiz, xp_reward
      )
    `)
    .eq("course_id", course.id)
    .order("order_index");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isEnrolled = false;
  let completedLessons = [];
  let isPro = false;

  if (user) {
    const [enrollResult, progressResult, profileResult] = await Promise.all([
      admin
        .from("academy_enrollments")
        .select("id")
        .eq("user_id", user.id)
        .eq("course_id", course.id)
        .maybeSingle(),
      admin
        .from("academy_progress")
        .select("lesson_id")
        .eq("user_id", user.id)
        .eq("course_id", course.id)
        .eq("completed", true),
      admin
        .from("profiles")
        .select("plan")
        .eq("id", user.id)
        .single(),
    ]);

    isEnrolled = !!enrollResult.data;
    completedLessons = (progressResult.data || []).map((p) => p.lesson_id);
    const plan = profileResult.data?.plan || "free";
    isPro = plan !== "free";
  }

  const totalLessons = modules?.reduce(
    (sum, m) => sum + (m.academy_lessons?.length || 0), 0
  ) || 0;

  const completedCount = completedLessons.length;
  const progressPercent = totalLessons > 0
    ? Math.round((completedCount / totalLessons) * 100)
    : 0;

  const firstLesson = modules?.[0]?.academy_lessons
    ?.sort((a, b) => a.order_index - b.order_index)?.[0];

  const totalXP = modules?.reduce((sum, m) =>
    sum + (m.academy_lessons?.reduce((s, l) => s + (l.xp_reward || 0), 0) || 0), 0
  ) || 0;

  return (
    <main className="min-h-screen bg-[#0f1117] text-white">

      {/* NAV */}
      <nav className="border-b border-white/10 bg-[#0f1117]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/academy" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
              <img src="/logo.png" alt="" className="h-5 brightness-0 invert" />
            </div>
            <div className="leading-tight">
              <p className="font-black text-white text-sm leading-none">Fancy Academy</p>
              <p className="text-[10px] text-gray-400 leading-none mt-0.5">Learn. Earn. Grow.</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link href="/signin" className="text-sm font-semibold text-gray-400 hover:text-white transition">Sign in</Link>
                <Link href="/signup" className="inline-flex items-center gap-1.5 rounded-xl bg-[#075a01] px-4 py-2 text-sm font-bold text-white hover:bg-[#0a8f01] transition">
                  Start Free <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </>
            ) : (
              <Link href="/dashboard" className="text-sm font-semibold text-[#0a8f01] hover:underline">
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* BREADCRUMB */}
      <div className="border-b border-white/5 px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-7xl flex items-center gap-2 text-xs text-gray-500">
          <Link href="/academy" className="hover:text-white transition">Academy</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/academy/courses" className="hover:text-white transition">Courses</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-300 line-clamp-1">{course.title}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0d1a0d] to-[#0f1117] px-4 py-14 sm:px-6 lg:px-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-[#075a01]/15 rounded-full blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

            {/* Left — Course Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#075a01]/30 text-green-400 border border-[#075a01]/30">
                  {course.level}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10">
                  {course.category}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#ff914d]/20 text-[#ff914d] border border-[#ff914d]/20">
                  Free to start
                </span>
              </div>

              <h1 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl mb-4 leading-tight">
                {course.title}
              </h1>

              <p className="text-sm text-gray-300 leading-relaxed mb-6 max-w-2xl">
                {course.description}
              </p>

              {/* Course stats */}
              <div className="flex flex-wrap items-center gap-5 mb-6 text-sm">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <BookOpen className="h-4 w-4 text-[#0a8f01]" />
                  <span>{totalLessons} lessons</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Clock className="h-4 w-4 text-[#0a8f01]" />
                  <span>{course.duration_hours} hours</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Users className="h-4 w-4 text-[#0a8f01]" />
                  <span>{course.total_students?.toLocaleString() || 0} students</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#ff914d]">
                  <Zap className="h-4 w-4" />
                  <span className="font-bold">{totalXP} XP available</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Globe className="h-4 w-4 text-[#0a8f01]" />
                  <span>{course.language}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Created by{" "}
                <span className="text-[#0a8f01] font-semibold">{course.instructor_name}</span>
              </p>

              {/* Progress bar if enrolled */}
              {isEnrolled && (
                <div className="mt-6 rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-white">Your progress</p>
                    <p className="text-xs font-bold text-[#0a8f01]">{progressPercent}% complete</p>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#075a01] to-[#4ade80] transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1.5">
                    {completedCount} of {totalLessons} lessons completed
                  </p>
                </div>
              )}
            </div>

            {/* Right — Enroll Card */}
            <div className="lg:col-span-1 lg:sticky lg:top-20">
              <div className="rounded-2xl border border-white/10 bg-[#0a0d11] overflow-hidden shadow-2xl">
                {/* Preview area */}
                <div className="relative bg-gradient-to-br from-[#075a01]/30 to-[#0a0d11] p-8 flex items-center justify-center border-b border-white/10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#075a01]/30 border border-[#075a01]/40">
                    <Play className="h-8 w-8 text-[#4ade80]" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#ff914d]/20 text-[#ff914d] border border-[#ff914d]/30">
                      FREE PREVIEW
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-center mb-4">
                    <p className="text-3xl font-black text-white">Free</p>
                    <p className="text-xs text-gray-400 mt-0.5">First module · Pro unlocks everything</p>
                  </div>

                  {!user ? (
                    <Link
                      href="/signup"
                      className="block w-full text-center rounded-xl bg-[#075a01] px-4 py-3.5 text-sm font-bold text-white hover:bg-[#0a8f01] transition mb-3 shadow-lg shadow-green-900/20"
                    >
                      Start Learning Free
                    </Link>
                  ) : isEnrolled ? (
                    <Link
                      href={`/academy/learn/${course.slug}/${firstLesson?.id}`}
                      className="block w-full text-center rounded-xl bg-[#075a01] px-4 py-3.5 text-sm font-bold text-white hover:bg-[#0a8f01] transition mb-3 shadow-lg shadow-green-900/20"
                    >
                      {completedCount > 0 ? "Continue Learning" : "Start Course"}
                    </Link>
                  ) : (
                    <Link
                      href={user ? `/academy/learn/${course.slug}/${firstLesson?.id}` : "/signup"}
                      className="block w-full text-center rounded-xl bg-[#075a01] px-4 py-3.5 text-sm font-bold text-white hover:bg-[#0a8f01] transition mb-3 shadow-lg shadow-green-900/20"
                    >
                      Enroll Free — Start Now
                    </Link>
                  )}

                  {!isPro && (
                    <Link
                      href="/pricing"
                      className="block w-full text-center rounded-xl border border-[#ff914d]/30 bg-[#ff914d]/10 px-4 py-2.5 text-sm font-bold text-[#ff914d] hover:bg-[#ff914d]/20 transition mb-5"
                    >
                      Upgrade to Pro — Unlock All
                    </Link>
                  )}

                  <div className="space-y-2.5">
                    {[
                      { Icon: BookOpen, text: `${totalLessons} lessons included` },
                      { Icon: Trophy, text: `${totalXP} XP to earn` },
                      { Icon: Target, text: "Quiz after every lesson" },
                      { Icon: Award, text: "Certificate on completion" },
                      { Icon: Zap, text: "AI-personalized content" },
                      { Icon: Flame, text: "Streak rewards" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-2.5 text-xs text-gray-300">
                        <item.Icon className="h-3.5 w-3.5 text-[#0a8f01] shrink-0" />
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU LEARN */}
      <section className="px-4 py-14 sm:px-6 lg:px-10 bg-[#0a0d11]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-black text-white mb-6">What you will learn</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {course.what_you_learn?.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 rounded-xl bg-white/5 border border-white/10 p-3.5">
                <CheckCircle2 className="h-4 w-4 text-[#0a8f01] shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-black text-white">Course curriculum</h2>
              <p className="text-sm text-gray-400 mt-1">
                {modules?.length} modules · {totalLessons} lessons · {course.duration_hours}h total
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {(modules || []).map((module, mi) => {
              const lessons = (module.academy_lessons || [])
                .sort((a, b) => a.order_index - b.order_index);
              const isModuleFree = module.is_free;
              const moduleCompleted = lessons.filter(
                (l) => completedLessons.includes(l.id)
              ).length;
              const moduleXP = lessons.reduce((s, l) => s + (l.xp_reward || 0), 0);

              return (
                <div
                  key={module.id}
                  className="rounded-2xl border border-white/10 overflow-hidden"
                >
                  {/* Module header */}
                  <div className="flex items-center justify-between p-4 bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#075a01]/30 border border-[#075a01]/30 text-[#4ade80] text-xs font-black">
                        {mi + 1}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{module.title}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <p className="text-[11px] text-gray-500">
                            {lessons.length} lessons
                          </p>
                          <p className="text-[11px] text-[#ff914d] font-bold">
                            +{moduleXP} XP
                          </p>
                          {isModuleFree && (
                            <span className="text-[10px] font-bold text-[#0a8f01] bg-[#075a01]/20 px-1.5 py-0.5 rounded">
                              Free
                            </span>
                          )}
                          {isEnrolled && (
                            <span className="text-[11px] text-gray-500">
                              {moduleCompleted}/{lessons.length} done
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {!isModuleFree && !isPro && (
                      <Lock className="h-4 w-4 text-gray-600 shrink-0" />
                    )}
                  </div>

                  {/* Lessons */}
                  <div className="divide-y divide-white/5">
                    {lessons.map((lesson) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      const canAccess = lesson.is_free || isPro || isEnrolled;

                      return (
                        <div
                          key={lesson.id}
                          className={`flex items-center gap-3 px-4 py-3 transition ${canAccess && isEnrolled ? "hover:bg-white/5" : ""}`}
                        >
                          <div className="shrink-0">
                            {isCompleted ? (
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#075a01]/30">
                                <CheckCircle2 className="h-4 w-4 text-[#0a8f01]" />
                              </div>
                            ) : canAccess ? (
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                                <Play className="h-3 w-3 text-gray-400" />
                              </div>
                            ) : (
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5">
                                <Lock className="h-3 w-3 text-gray-600" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            {canAccess && isEnrolled ? (
                              <Link
                                href={`/academy/learn/${course.slug}/${lesson.id}`}
                                className="text-sm text-gray-200 hover:text-[#4ade80] font-medium transition line-clamp-1"
                              >
                                {lesson.title}
                              </Link>
                            ) : (
                              <p className={`text-sm line-clamp-1 ${canAccess ? "text-gray-200" : "text-gray-500"}`}>
                                {lesson.title}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {lesson.has_quiz && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/20">
                                QUIZ
                              </span>
                            )}
                            <span className="text-[10px] text-gray-500">
                              {lesson.duration_minutes}m
                            </span>
                            <span className="text-[10px] font-bold text-[#ff914d]">
                              +{lesson.xp_reward}XP
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS + WHO IT'S FOR */}
      <section className="px-4 py-14 sm:px-6 lg:px-10 bg-[#0a0d11]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-black text-white mb-4">Requirements</h2>
            <div className="space-y-2">
              {course.requirements?.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#0a8f01] shrink-0 mt-2" />
                  <p className="text-sm text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-black text-white mb-4">Who this course is for</h2>
            <div className="space-y-2">
              {course.who_for?.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#0a8f01] shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section className="px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-black text-white mb-6">Your instructor</h2>
          <div className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-white font-black text-2xl">
              F
            </div>
            <div>
              <p className="font-black text-white text-lg">{course.instructor_name}</p>
              <p className="text-xs text-[#0a8f01] font-semibold mb-3">AI & Business Education</p>
              <p className="text-sm text-gray-400 leading-relaxed">{course.instructor_bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-10 bg-[#0a0d11]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-black text-white sm:text-3xl mb-3">
            Ready to start?
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            First module is completely free. No credit card required.
          </p>
          <Link
            href={user ? `/academy/learn/${course.slug}/${firstLesson?.id}` : "/signup"}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#075a01] px-8 py-4 text-base font-bold text-white shadow-xl shadow-green-900/30 hover:bg-[#0a8f01] active:scale-95 transition-all"
          >
            {isEnrolled ? "Continue Learning" : "Start Course Free"}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

    </main>
  );
}