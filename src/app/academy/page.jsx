import { createClient as createAdminClient } from "@supabase/supabase-js";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  Zap,
  Award,
  Flame,
  Star,
  Trophy,
  Play,
  ChevronRight,
  Lock,
  Unlock,
  Brain,
  Target,
  TrendingUp,
  Sparkles,
  Shield,
  BarChart2,
  MessageSquare,
  FileText,
  Layers,
} from "lucide-react";

export const metadata = {
  title: "Fancy Academy — Learn AI & Freelancing Online Free",
  description:
    "Free online courses on AI tools and freelancing. Bite-sized lessons, quizzes, XP rewards, streaks, and real certificates. Learn at your own pace.",
};

const admin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export default async function AcademyHomePage() {
  const { data: courses } = await admin
    .from("academy_courses")
    .select("*")
    .eq("is_published", true)
    .order("order_index");

  return (
    <main className="min-h-screen bg-[#0f1117] text-white">

      {/* NAV */}
      <nav className="border-b border-white/10 bg-[#0f1117]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/academy" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] shadow-lg shadow-green-900/30">
              <img src="/logo.png" alt="" className="h-5 brightness-0 invert" />
            </div>
            <div className="leading-tight">
              <p className="font-black text-white text-sm leading-none">Fancy Academy</p>
              <p className="text-[10px] text-gray-400 leading-none mt-0.5">Learn. Earn. Grow.</p>
            </div>
          </Link>

          <div className="hidden sm:flex items-center gap-6">
            <Link href="/academy/courses" className="text-sm text-gray-400 hover:text-white transition">Courses</Link>
            <Link href="/pricing" className="text-sm text-gray-400 hover:text-white transition">Pro</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="text-sm font-semibold text-gray-400 hover:text-white transition"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#075a01] px-4 py-2 text-sm font-bold text-white hover:bg-[#0a8f01] transition shadow-lg shadow-green-900/30"
            >
              Start Free
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden px-4 pt-20 pb-24 sm:pt-28 sm:pb-32 sm:px-6 lg:px-10">
        {/* BG effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#075a01]/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#ff914d]/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#075a01]/40 bg-[#075a01]/20 px-4 py-2 mb-8">
            <Flame className="h-4 w-4 text-[#ff914d]" />
            <span className="text-xs font-bold text-[#ff914d] uppercase tracking-wider">
              Free to start — No credit card needed
            </span>
          </div>

          <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-7xl mb-6">
            Learn skills that
            <br />
            <span className="bg-gradient-to-r from-[#0a8f01] to-[#4ade80] bg-clip-text text-transparent">
              actually pay
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-base text-gray-400 leading-relaxed sm:text-lg mb-10">
            Bite-sized lessons. Real quizzes. XP rewards. Streaks.
            Certificates. Learn AI and freelancing from anywhere in the world.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link
              href="/academy/courses"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-[#075a01] px-8 py-4 text-base font-bold text-white shadow-xl shadow-green-900/30 hover:bg-[#0a8f01] active:scale-95 transition-all"
            >
              <Play className="h-5 w-5" />
              Start Learning Free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition"
            >
              View Pro Plans
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "38", label: "Free Lessons", icon: BookOpen },
              { value: "2", label: "Expert Courses", icon: Award },
              { value: "∞", label: "XP to Earn", icon: Zap },
              { value: "100%", label: "Free to Start", icon: Trophy },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
              >
                <s.icon className="h-5 w-5 text-[#0a8f01] mx-auto mb-2" />
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 py-20 sm:px-6 lg:px-10 bg-[#0a0d11]">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
              Learning that actually works
            </h2>
            <p className="mt-3 text-sm text-gray-400 max-w-lg mx-auto">
              We designed Fancy Academy to be the most engaging way to learn skills online.
              No boring lectures. No walls of text.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
  {
    step: "01",
    Icon: BookOpen,
    title: "Read & Learn",
    desc: "Short engaging lessons — 5 to 10 minutes each. AI personalizes the content to your age and level.",
    color: "#075a01",
  },
  {
    step: "02",
    Icon: Target,
    title: "Take the Quiz",
    desc: "Quiz after every lesson. Pass to unlock the next one. Every wrong answer teaches you why.",
    color: "#0ea5e9",
  },
  {
    step: "03",
    Icon: Zap,
    title: "Earn XP & Badges",
    desc: "Collect XP, maintain streaks, unlock badges. Every lesson feels like a win.",
    color: "#ff914d",
  },
  {
    step: "04",
    Icon: Award,
    title: "Get Certified",
    desc: "Complete the course, pass the final exam, and get a real certificate to share on LinkedIn.",
    color: "#8b5cf6",
  },
            ].map((s) => (
              <div
                key={s.step}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-6 overflow-hidden group hover:border-white/20 transition"
              >
                <div
                  className="absolute top-0 right-0 text-6xl font-black opacity-5 group-hover:opacity-10 transition leading-none p-4"
                  style={{ color: s.color }}
                >
                  {s.step}
                </div>
                <div
  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
  style={{ backgroundColor: `${s.color}20` }}
>
  <s.Icon className="h-6 w-6" style={{ color: s.color }} />
</div>
                <h3 className="font-bold text-white text-sm mb-2">{s.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-black text-white sm:text-3xl">
                Available courses
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Start free. Go at your own pace. Get certified.
              </p>
            </div>
            <Link
              href="/academy/courses"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-[#0a8f01] hover:text-green-400 transition"
            >
              All courses <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {(courses || []).map((course) => (
              <Link
                key={course.id}
                href={`/academy/courses/${course.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-[#075a01]/50 hover:bg-white/8 transition-all duration-300"
              >
                {/* Color top bar */}
                <div className="h-1.5 bg-gradient-to-r from-[#075a01] to-[#4ade80]" />

                <div className="p-6">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#075a01]/30 text-green-400 border border-[#075a01]/30">
                      {course.level}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10">
                      {course.category}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#ff914d]/20 text-[#ff914d] border border-[#ff914d]/20">
                      Free to start
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white mb-2 group-hover:text-[#4ade80] transition">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-5 line-clamp-2">
                    {course.subtitle}
                  </p>

                  {/* What you learn */}
                  <div className="space-y-1.5 mb-5">
                    {course.what_you_learn?.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#0a8f01] shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-300">{item}</p>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-xs text-gray-400">{course.total_lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-xs text-gray-400">{course.duration_hours}h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-xs text-gray-400">{course.total_students?.toLocaleString() || 0} students</span>
                    </div>
                    <div className="ml-auto flex items-center gap-1 text-[#0a8f01] group-hover:gap-2 transition-all">
                      <span className="text-xs font-bold">Start</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GAMIFICATION SHOWCASE */}
      <section className="px-4 py-20 sm:px-6 lg:px-10 bg-[#0a0d11]">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl mb-4">
                Learning feels like
                <span className="text-[#ff914d]"> a game</span>
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-8">
                We took the best parts of Duolingo — streaks, XP, badges, instant feedback —
                and combined them with real professional skills you can use immediately.
                Every lesson is a win. Every quiz teaches you something. Every day you learn, you grow.
              </p>
              <div className="space-y-4">
                {[
  { Icon: Flame, color: "#ff914d", title: "Daily Streaks", desc: "Study every day to keep your streak alive. Miss a day and it resets. Stay consistent." },
  { Icon: Zap, color: "#fbbf24", title: "XP Points", desc: "Earn XP for every lesson, quiz, and course completed. Climb the leaderboard." },
  { Icon: Trophy, color: "#8b5cf6", title: "Achievement Badges", desc: "Unlock badges for milestones — first lesson, 7-day streak, perfect quiz score, and more." },
  { Icon: FileText, color: "#0ea5e9", title: "Real Certificates", desc: "Pass the final exam and get a certificate with a unique ID. Share it on LinkedIn." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div
  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
  style={{ backgroundColor: `${item.color}20` }}
>
  <item.Icon className="h-5 w-5" style={{ color: item.color }} />
</div>
                    <div>
                      <p className="font-bold text-white text-sm">{item.title}</p>
                      <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* XP Preview Card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
              {/* Streak */}
              <div className="rounded-xl bg-[#ff914d]/10 border border-[#ff914d]/20 p-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff914d]/20 shrink-0">
  <Flame className="h-6 w-6 text-[#ff914d]" />
</div>
                <div>
                  <p className="font-black text-white text-lg">7 Day Streak!</p>
                  <p className="text-xs text-gray-400">Keep going — you are on fire!</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs font-bold text-[#ff914d]">+10 XP</p>
                  <p className="text-[10px] text-gray-500">streak bonus</p>
                </div>
              </div>

              {/* XP Bar */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-[#ff914d]" />
                    <span className="font-bold text-white text-sm">Level 4</span>
                  </div>
                  <span className="text-xs text-gray-400">245 / 500 XP</span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[49%] rounded-full bg-gradient-to-r from-[#075a01] to-[#4ade80]" />
                </div>
                <p className="text-[10px] text-gray-500 mt-1">255 XP to Level 5</p>
              </div>

              {/* Recent badges */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Recent Badges</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { Icon: Target, color: "#0ea5e9", label: "First Lesson" },
  { Icon: Flame, color: "#ff914d", label: "3-Day Streak" },
  { Icon: Star, color: "#fbbf24", label: "Perfect Quiz" },
  { Icon: Layers, color: "#8b5cf6", label: "Module Done" },
                  ].map((b) => (
                    <div key={b.label} className="text-center">
                      <div
  className="rounded-xl p-2 mb-1 flex items-center justify-center"
  style={{ backgroundColor: `${b.color}20` }}
>
  <b.Icon className="h-5 w-5" style={{ color: b.color }} />
</div>
<p className="text-[9px] text-gray-400">{b.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Latest achievement */}
              <div className="rounded-xl bg-[#075a01]/20 border border-[#075a01]/30 p-4 flex items-center gap-3">
                <Trophy className="h-8 w-8 text-[#0a8f01] shrink-0" />
                <div>
                  <p className="font-bold text-white text-sm">Module 1 Complete!</p>
                  <p className="text-xs text-gray-400">AI Tools for Business · +50 XP earned</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET WITH PRO */}
      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-12 overflow-hidden relative">
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#075a01]/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-[#ff914d]/10 blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff914d]/20 border border-[#ff914d]/30 px-3 py-1 text-xs font-bold text-[#ff914d] mb-4">
                  <Zap className="h-3 w-3" /> Pro Plan
                </span>
                <h2 className="text-2xl font-black text-white sm:text-3xl mb-3">
                  Unlock the full learning experience
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Free gives you a taste. Pro gives you everything.
                  All lessons, all modules, AI tutor chat, priority support, and more.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#ff914d] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#f97316] transition"
                >
                  Upgrade to Pro
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { Icon: Unlock, color: "#0a8f01", title: "All modules unlocked", desc: "Access every lesson in every course" },
  { Icon: Brain, color: "#8b5cf6", title: "AI Tutor", desc: "Ask questions about any lesson, get instant answers" },
  { Icon: BarChart2, color: "#0ea5e9", title: "Progress analytics", desc: "Deep insights into your learning journey" },
  { Icon: Zap, color: "#ff914d", title: "2x XP boost", desc: "Earn double XP on every lesson and quiz" },
  { Icon: Award, color: "#fbbf24", title: "Premium certificates", desc: "Certificates with Pro badge and verified skills" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3">
                    <div
  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
  style={{ backgroundColor: `${item.color}20` }}
>
  <item.Icon className="h-4 w-4" style={{ color: item.color }} />
</div>
                    <div>
                      <p className="font-bold text-white text-xs">{item.title}</p>
                      <p className="text-[11px] text-gray-400">{item.desc}</p>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-[#0a8f01] shrink-0 ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-10 bg-[#0a0d11]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl mb-4">
            Start your learning journey today
          </h2>
          <p className="text-sm text-gray-400 mb-8 max-w-md mx-auto">
            Free. No credit card. Learn at your own pace.
            First module of every course is completely free.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#075a01] px-8 py-4 text-base font-bold text-white shadow-xl shadow-green-900/30 hover:bg-[#0a8f01] active:scale-95 transition-all"
          >
            Create Free Account
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="text-xs text-gray-500 mt-4">
            Already have an account?{" "}
            <Link href="/signin" className="text-[#0a8f01] hover:underline font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
              <img src="/logo.png" alt="" className="h-4 brightness-0 invert" />
            </div>
            <span className="text-sm font-bold text-white">Fancy Academy</span>
          </div>
          <p className="text-xs text-gray-500">
            Part of{" "}
            <Link href="https://fancydigitals.com.ng" className="text-[#0a8f01] font-semibold hover:underline">
              Fancy Digitals
            </Link>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/academy/courses" className="text-xs text-gray-500 hover:text-white transition">Courses</Link>
            <Link href="/pricing" className="text-xs text-gray-500 hover:text-white transition">Pro</Link>
            <Link href="/contact" className="text-xs text-gray-500 hover:text-white transition">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}