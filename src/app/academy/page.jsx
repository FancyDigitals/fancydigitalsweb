import { createClient as createAdminClient } from "@supabase/supabase-js";
import Link from "next/link";
import {
  BookOpen, Clock, Users, CheckCircle2, ArrowRight, Zap, Award,
  Flame, Star, Trophy, Play, ChevronRight, Unlock, Brain, Target,
  Sparkles, BarChart2, FileText, Layers, GraduationCap, Send,
} from "lucide-react";
import CourseCategoryGrid from "@/components/academy/CourseCategoryGrid";

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
    <main data-theme="light" className="min-h-screen bg-white text-[#0B1220]">
      {/* ================================================
          NAV
      ================================================ */}
      <nav className="border-b border-[#EDEFF2] bg-white/85 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/academy" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#075A01] to-[#0A8F01] shadow-sm">
              <img src="/logo.png" alt="" className="h-5 brightness-0 invert" />
            </div>
            <div className="leading-tight">
              <p className="font-black text-[#0B1220] text-sm leading-none tracking-tight">
                Fancy Academy
              </p>
              <p className="text-[10px] text-[#8892A0] leading-none mt-0.5 font-semibold">
                Learn. Earn. Grow.
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/academy/courses" className="text-sm font-semibold text-[#4A5468] hover:text-[#0B1220] transition">Courses</Link>
            <Link href="/pricing" className="text-sm font-semibold text-[#4A5468] hover:text-[#0B1220] transition">Pro</Link>
            <Link href="#instructor" className="text-sm font-semibold text-[#4A5468] hover:text-[#0B1220] transition">Teach</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="hidden sm:inline text-sm font-bold text-[#4A5468] hover:text-[#0B1220] transition"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#075A01] px-4 py-2 text-sm font-bold text-white hover:bg-[#0A8F01] transition shadow-lg shadow-[#075A01]/15"
            >
              Start Free
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ================================================
          HERO — Educax editorial
      ================================================ */}
      <section className="px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#DDF5E4] via-[#EAFBF0] to-[#F5FBF7] px-6 py-12 sm:px-12 sm:py-16 lg:p-20">
            {/* Decorative doodles */}
            <svg className="pointer-events-none absolute top-10 left-6 opacity-70" width="70" height="80" viewBox="0 0 70 80" fill="none">
              <g stroke="#FF914D" strokeWidth="2.2" strokeLinecap="round">
                <path d="M8 12 L12 8" /><path d="M20 6 L22 10" /><path d="M4 26 L10 24" />
                <path d="M28 18 L26 22" /><path d="M12 40 L16 38" /><path d="M6 52 L10 54" />
                <path d="M22 60 L20 64" /><path d="M32 44 L28 46" /><path d="M14 68 L18 72" />
              </g>
            </svg>

            <svg className="pointer-events-none absolute top-16 right-1/3 opacity-80 hidden md:block" width="100" height="60" viewBox="0 0 100 60" fill="none">
              <path d="M5 40 Q30 5, 55 30 T95 20" stroke="#FF914D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M88 14 L95 20 L88 27" stroke="#FF914D" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <svg className="pointer-events-none absolute bottom-8 right-12 opacity-60 hidden lg:block" width="60" height="60" viewBox="0 0 60 60" fill="none">
              <g stroke="#075A01" strokeWidth="2.2" strokeLinecap="round">
                <path d="M8 12 L12 8" /><path d="M20 6 L22 10" /><path d="M4 26 L10 24" />
                <path d="M28 18 L26 22" /><path d="M12 40 L16 38" /><path d="M6 52 L10 54" />
              </g>
            </svg>

            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12 items-center">
              {/* LEFT */}
              <div>
                <p className="text-sm font-bold text-[#075A01] mb-4 tracking-wide">
                  ✦ Start your favourite course
                </p>
                <h1 className="text-[38px] sm:text-[52px] lg:text-[64px] font-black leading-[1.02] tracking-[-0.03em] text-[#0B1220]">
                  Now learning from
                  <br />
                  anywhere, and build
                  <br />
                  your{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[#0A8F01]">bright career.</span>
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" preserveAspectRatio="none" height="10" fill="none">
                      <path d="M2 8 Q75 2, 150 6 T298 5" stroke="#0A8F01" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                    </svg>
                  </span>
                </h1>

                <p className="mt-6 max-w-lg text-base sm:text-lg text-[#4A5468] leading-relaxed">
                  Bite-sized lessons. Real quizzes. XP rewards. Streaks. Certificates.
                  Learn AI and freelancing from anywhere in the world.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/academy/courses"
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#075A01] px-7 py-4 text-base font-bold text-white shadow-xl shadow-[#075A01]/20 hover:bg-[#0A8F01] hover:-translate-y-0.5 transition-all"
                  >
                    <Play className="h-4 w-4 fill-white" />
                    Start A Course
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white border border-[#E2E5EA] px-6 py-4 text-base font-bold text-[#0B1220] hover:bg-[#FAFAF7] hover:-translate-y-0.5 transition-all"
                  >
                    View Pro Plans
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* RIGHT — hero image with floating badges */}
              <div className="relative">
                <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none">
                  {/* Photo frame */}
                  <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-[#FFE8D6]">
                    <img
                      src="/academy/hero-student.png"
                      alt="Student learning with Fancy Academy"
                      className="w-full h-full object-cover"
                    />
                    {/* Fallback if no image */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FFE8D6] to-[#DDF5E4] -z-10">
                      <GraduationCap className="h-32 w-32 text-white/60" />
                    </div>
                  </div>

                  {/* Floating stat badge — Educax "1,235 courses" style */}
                  <div className="absolute -top-2 -left-6 sm:-left-10 rotate-[-6deg]">
                    <div className="relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-[#075A01] shadow-xl shadow-[#075A01]/25">
                      <div className="text-center text-white">
                        <BookOpen className="h-4 w-4 mx-auto mb-1 opacity-90" />
                        <p className="text-xl sm:text-2xl font-black leading-none tabular-nums">
                          {courses?.length || 2}
                        </p>
                        <p className="text-[9px] font-bold uppercase tracking-widest mt-0.5 opacity-90">
                          Courses
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Floating rating badge */}
                  <div className="absolute top-4 -right-2 sm:-right-6">
                    <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-xl border border-[#EDEFF2]">
                      <Star className="h-4 w-4 fill-[#FF914D] text-[#FF914D]" />
                      <div className="leading-tight">
                        <p className="text-sm font-black text-[#0B1220]">4.9</p>
                        <p className="text-[9px] font-bold text-[#8892A0] uppercase tracking-wider">
                          rating
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Floating XP pill */}
                  <div className="absolute bottom-6 -left-4 sm:-left-8 rotate-[4deg]">
                    <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-xl border border-[#EDEFF2]">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFE8D6]">
                        <Zap className="h-4 w-4 text-[#FF914D]" />
                      </div>
                      <div className="leading-tight">
                        <p className="text-sm font-black text-[#0B1220]">+250 XP</p>
                        <p className="text-[10px] font-semibold text-[#8892A0]">
                          just earned
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Floating streak pill */}
                  <div className="absolute -bottom-2 -right-4 sm:-right-6 rotate-[-3deg] hidden sm:block">
                    <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-xl border border-[#EDEFF2]">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFE4E1]">
                        <Flame className="h-4 w-4 text-rose-500" />
                      </div>
                      <div className="leading-tight">
                        <p className="text-sm font-black text-[#0B1220]">7 day</p>
                        <p className="text-[10px] font-semibold text-[#8892A0]">
                          streak
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          TRUST BAR
      ================================================ */}
      <section className="px-4 sm:px-6 lg:px-10 pt-14 sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { value: "38+", label: "Free Lessons", Icon: BookOpen, tone: "bg-[#DDF5E4] text-[#075A01]" },
              { value: courses?.length || "2", label: "Expert Courses", Icon: Award, tone: "bg-[#E9E4FF] text-[#7c3aed]" },
              { value: "∞", label: "XP to Earn", Icon: Zap, tone: "bg-[#FFE8D6] text-[#FF914D]" },
              { value: "100%", label: "Free to Start", Icon: Trophy, tone: "bg-[#DDEEFF] text-[#0369a1]" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white border border-[#EDEFF2] p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl mb-3 ${s.tone}`}>
                  <s.Icon className="h-4 w-4" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-[#0B1220] tracking-tight tabular-nums">
                  {s.value}
                </p>
                <p className="text-xs font-bold text-[#4A5468] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          COURSES — filter + grid
      ================================================ */}
      <section className="px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-[3px] w-8 rounded-full bg-[#0A8F01]" />
                <p className="text-[11px] font-black text-[#075A01] uppercase tracking-[0.2em]">
                  Courses
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1220] leading-tight tracking-tight">
                All <span className="text-[#0A8F01]">Courses</span> of Fancy Academy
              </h2>
              <p className="mt-3 text-base text-[#4A5468] max-w-lg">
                Start free. Go at your own pace. Get certified.
              </p>
            </div>
            <Link
              href="/academy/courses"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-[#075A01] hover:text-[#0A8F01] transition group"
            >
              View all
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>

          <CourseCategoryGrid courses={courses || []} />
        </div>
      </section>

      {/* ================================================
          HOW IT WORKS
      ================================================ */}
      <section className="px-4 sm:px-6 lg:px-10 py-20 sm:py-28 bg-[#FAFAF7]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-[3px] w-8 rounded-full bg-[#FF914D]" />
              <p className="text-[11px] font-black text-[#FF914D] uppercase tracking-[0.2em]">
                How It Works
              </p>
              <span className="h-[3px] w-8 rounded-full bg-[#FF914D]" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1220] leading-tight tracking-tight">
              Learning that actually works
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#4A5468] leading-relaxed">
              We designed Fancy Academy to be the most engaging way to learn skills online.
              No boring lectures. No walls of text.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01", Icon: BookOpen, title: "Read & Learn",
                desc: "Short engaging lessons — 5 to 10 minutes each. AI personalizes the content to your age and level.",
                tone: { chip: "bg-[#DDF5E4] text-[#075A01]", num: "text-[#0A8F01]/15", bar: "bg-[#0A8F01]" },
              },
              {
                step: "02", Icon: Target, title: "Take the Quiz",
                desc: "Quiz after every lesson. Pass to unlock the next one. Every wrong answer teaches you why.",
                tone: { chip: "bg-[#DDEEFF] text-[#0369a1]", num: "text-[#0369a1]/15", bar: "bg-[#0369a1]" },
              },
              {
                step: "03", Icon: Zap, title: "Earn XP & Badges",
                desc: "Collect XP, maintain streaks, unlock badges. Every lesson feels like a win.",
                tone: { chip: "bg-[#FFE8D6] text-[#FF914D]", num: "text-[#FF914D]/15", bar: "bg-[#FF914D]" },
              },
              {
                step: "04", Icon: Award, title: "Get Certified",
                desc: "Complete the course, pass the final exam, and get a real certificate to share on LinkedIn.",
                tone: { chip: "bg-[#E9E4FF] text-[#7c3aed]", num: "text-[#7c3aed]/15", bar: "bg-[#7c3aed]" },
              },
            ].map((s) => (
              <div
                key={s.step}
                className="relative overflow-hidden rounded-3xl bg-white border border-[#EDEFF2] p-6 hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 ${s.tone.bar}`} />

                <div
                  className={`absolute top-2 right-4 text-6xl font-black leading-none pointer-events-none ${s.tone.num}`}
                >
                  {s.step}
                </div>

                <div className={`relative flex h-12 w-12 items-center justify-center rounded-2xl mb-5 ${s.tone.chip}`}>
                  <s.Icon className="h-6 w-6" />
                </div>

                <h3 className="relative font-black text-[#0B1220] text-lg mb-2 tracking-tight">
                  {s.title}
                </h3>
                <p className="relative text-sm text-[#4A5468] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          GAMIFICATION SHOWCASE
      ================================================ */}
      <section className="px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-[3px] w-8 rounded-full bg-[#FF914D]" />
                <p className="text-[11px] font-black text-[#FF914D] uppercase tracking-[0.2em]">
                  Gamified Learning
                </p>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1220] leading-tight tracking-tight">
                Learning feels like{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#FF914D]">a game</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 140 12" preserveAspectRatio="none" height="10" fill="none">
                    <path d="M2 8 Q35 2, 70 6 T138 5" stroke="#FF914D" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                  </svg>
                </span>
              </h2>

              <p className="mt-5 text-base sm:text-lg text-[#4A5468] leading-relaxed">
                We took the best parts of Duolingo — streaks, XP, badges, instant feedback —
                and combined them with real professional skills. Every lesson is a win.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { Icon: Flame, tone: "bg-[#FFE4E1] text-rose-500", title: "Daily Streaks", desc: "Study every day to keep your streak alive. Stay consistent." },
                  { Icon: Zap, tone: "bg-[#FFE8D6] text-[#FF914D]", title: "XP Points", desc: "Earn XP for every lesson, quiz, and course completed." },
                  { Icon: Trophy, tone: "bg-[#E9E4FF] text-[#7c3aed]", title: "Achievement Badges", desc: "Unlock badges for milestones — first lesson, perfect quiz score, and more." },
                  { Icon: FileText, tone: "bg-[#DDEEFF] text-[#0369a1]", title: "Real Certificates", desc: "Pass the final exam and get a certificate with a unique ID." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${item.tone}`}>
                      <item.Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-black text-[#0B1220] text-base tracking-tight">
                        {item.title}
                      </p>
                      <p className="text-sm text-[#4A5468] leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — live game preview card */}
            <div className="relative">
              <div className="absolute -top-6 -right-6 h-40 w-40 rounded-full bg-[#FFE8D6] blur-3xl opacity-70 -z-10" />
              <div className="absolute -bottom-6 -left-6 h-40 w-40 rounded-full bg-[#DDF5E4] blur-3xl opacity-70 -z-10" />

              <div className="rounded-[28px] bg-white border border-[#EDEFF2] p-6 shadow-xl shadow-[#0B1220]/[0.04] space-y-4">
                {/* Streak card */}
                <div className="rounded-2xl bg-gradient-to-br from-[#FFE8D6] to-[#FFF3E6] border border-[#FF914D]/20 p-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Flame className="h-6 w-6 text-[#FF914D]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-[#0B1220] text-lg tracking-tight">7 Day Streak!</p>
                    <p className="text-xs text-[#4A5468]">Keep going — you are on fire</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-[#FF914D]">+10 XP</p>
                    <p className="text-[10px] text-[#8892A0] font-semibold">bonus</p>
                  </div>
                </div>

                {/* XP bar */}
                <div className="rounded-2xl bg-[#FAFAF7] border border-[#EDEFF2] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#DDF5E4]">
                        <Sparkles className="h-3.5 w-3.5 text-[#075A01]" />
                      </div>
                      <span className="font-black text-[#0B1220] text-sm tracking-tight">Level 4</span>
                    </div>
                    <span className="text-xs font-bold text-[#4A5468] tabular-nums">245 / 500 XP</span>
                  </div>
                  <div className="h-3 rounded-full bg-white overflow-hidden border border-[#EDEFF2]">
                    <div className="h-full w-[49%] rounded-full bg-gradient-to-r from-[#075A01] to-[#4ade80]" />
                  </div>
                  <p className="text-[10px] text-[#8892A0] font-semibold mt-1.5">255 XP to Level 5</p>
                </div>

                {/* Recent badges */}
                <div className="rounded-2xl bg-[#FAFAF7] border border-[#EDEFF2] p-4">
                  <p className="text-[10px] font-black text-[#8892A0] uppercase tracking-[0.2em] mb-3">
                    Recent Badges
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { Icon: Target, tone: "bg-[#DDEEFF] text-[#0369a1]", label: "First Lesson" },
                      { Icon: Flame, tone: "bg-[#FFE4E1] text-rose-500", label: "3-Day Streak" },
                      { Icon: Star, tone: "bg-[#FFE8D6] text-[#FF914D]", label: "Perfect Quiz" },
                      { Icon: Layers, tone: "bg-[#E9E4FF] text-[#7c3aed]", label: "Module Done" },
                    ].map((b) => (
                      <div key={b.label} className="text-center">
                        <div className={`rounded-2xl p-2.5 mb-1.5 flex items-center justify-center ${b.tone}`}>
                          <b.Icon className="h-5 w-5" />
                        </div>
                        <p className="text-[9px] text-[#4A5468] font-bold leading-tight">
                          {b.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Latest achievement */}
                <div className="rounded-2xl bg-gradient-to-br from-[#DDF5E4] to-[#EAFBF0] border border-[#0A8F01]/15 p-4 flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Trophy className="h-5 w-5 text-[#075A01]" />
                  </div>
                  <div>
                    <p className="font-black text-[#0B1220] text-sm tracking-tight">Module 1 Complete</p>
                    <p className="text-xs text-[#4A5468]">AI Tools for Business · +50 XP earned</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          PRO UPSELL
      ================================================ */}
      <section className="px-4 sm:px-6 lg:px-10 py-20 sm:py-28 bg-[#FAFAF7]">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[36px] bg-white border border-[#EDEFF2] p-8 sm:p-12 lg:p-16 shadow-sm">
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#DDF5E4] blur-3xl opacity-70" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#FFE8D6] blur-3xl opacity-60" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FFE8D6] border border-[#FF914D]/25 px-3 py-1.5 text-xs font-black text-[#FF914D] mb-5 uppercase tracking-[0.15em]">
                  <Zap className="h-3 w-3" /> Pro Plan
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-[#0B1220] leading-tight tracking-tight mb-4">
                  Unlock the full learning experience
                </h2>
                <p className="text-base sm:text-lg text-[#4A5468] leading-relaxed mb-8 max-w-lg">
                  Free gives you a taste. Pro gives you everything.
                  All lessons, all modules, AI tutor chat, priority support, and more.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#FF914D] px-6 py-3.5 text-base font-bold text-white hover:bg-[#f97316] hover:-translate-y-0.5 shadow-xl shadow-[#FF914D]/20 transition-all"
                >
                  Upgrade to Pro
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { Icon: Unlock, tone: "bg-[#DDF5E4] text-[#075A01]", title: "All modules unlocked", desc: "Access every lesson in every course" },
                  { Icon: Brain, tone: "bg-[#E9E4FF] text-[#7c3aed]", title: "AI Tutor", desc: "Ask questions about any lesson, get instant answers" },
                  { Icon: BarChart2, tone: "bg-[#DDEEFF] text-[#0369a1]", title: "Progress analytics", desc: "Deep insights into your learning journey" },
                  { Icon: Zap, tone: "bg-[#FFE8D6] text-[#FF914D]", title: "2x XP boost", desc: "Earn double XP on every lesson and quiz" },
                  { Icon: Award, tone: "bg-[#FFF3E6] text-[#f59e0b]", title: "Premium certificates", desc: "Certificates with Pro badge and verified skills" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4 rounded-2xl bg-white border border-[#EDEFF2] p-4 hover:shadow-md hover:border-[#0A8F01]/20 transition-all">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.tone}`}>
                      <item.Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-[#0B1220] text-sm tracking-tight">{item.title}</p>
                      <p className="text-xs text-[#4A5468] leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-[#0A8F01] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          BECOME AN INSTRUCTOR — Educax banner
      ================================================ */}
      <section id="instructor" className="px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#DDF5E4] via-[#EAFBF0] to-[#F5FBF7] px-6 py-10 sm:px-12 sm:py-14 lg:p-16 border border-[#0A8F01]/10">
            {/* Doodles */}
            <svg className="pointer-events-none absolute top-8 right-8 opacity-60" width="60" height="60" viewBox="0 0 60 60" fill="none">
              <g stroke="#FF914D" strokeWidth="2.2" strokeLinecap="round">
                <path d="M8 12 L12 8" /><path d="M20 6 L22 10" /><path d="M4 26 L10 24" />
                <path d="M28 18 L26 22" /><path d="M12 40 L16 38" /><path d="M6 52 L10 54" />
              </g>
            </svg>
            <svg className="pointer-events-none absolute bottom-8 left-8 opacity-60 hidden md:block" width="80" height="50" viewBox="0 0 80 50" fill="none">
              <path d="M5 30 Q25 5, 45 25 T78 15" stroke="#075A01" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M70 8 L78 15 L70 22" stroke="#075A01" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-8 items-center">
              {/* Photo + label */}
              <div className="flex items-center gap-6">
                <div className="relative shrink-0">
                  <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full overflow-hidden bg-[#FFE8D6] border-4 border-white shadow-lg">
                    <img
                      src="/academy/instructor.png"
                      alt="Become an instructor"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FFE8D6] to-[#DDF5E4] -z-10">
                      <GraduationCap className="h-12 w-12 text-white/70" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#075A01] mb-1">Become An Instructor</p>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1220] leading-tight tracking-tight">
                    Teach with{" "}
                    <span className="text-[#0A8F01]">Fancy Academy</span>
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-[#4A5468] leading-relaxed max-w-md">
                    Share your expertise with thousands of learners worldwide. Build your brand while we handle the tech.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="lg:ml-auto">
                <Link
                  href="/contact?subject=instructor"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#075A01] px-7 py-4 text-base font-bold text-white shadow-xl shadow-[#075A01]/20 hover:bg-[#0A8F01] hover:-translate-y-0.5 transition-all"
                >
                  Apply Now
                  <Send className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          FINAL CTA
      ================================================ */}
      <section className="px-4 sm:px-6 lg:px-10 py-20 sm:py-28 bg-[#FAFAF7]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1220] tracking-tight leading-tight">
            Start your learning journey today
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5468] max-w-lg mx-auto leading-relaxed">
            Free. No credit card. Learn at your own pace.
            First module of every course is completely free.
          </p>
          <div className="mt-8">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#075A01] px-8 py-4 text-base font-bold text-white shadow-xl shadow-[#075A01]/20 hover:bg-[#0A8F01] hover:-translate-y-0.5 transition-all"
            >
              Create Free Account
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <p className="text-sm text-[#8892A0] mt-5">
            Already have an account?{" "}
            <Link href="/signin" className="text-[#075A01] hover:text-[#0A8F01] font-bold">
              Sign in
            </Link>
          </p>
        </div>
      </section>

      {/* ================================================
          FOOTER
      ================================================ */}
      <footer className="border-t border-[#EDEFF2] bg-white px-4 sm:px-6 lg:px-10 py-10">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#075A01] to-[#0A8F01]">
              <img src="/logo.png" alt="" className="h-4 brightness-0 invert" />
            </div>
            <span className="text-sm font-black text-[#0B1220] tracking-tight">Fancy Academy</span>
          </div>
          <p className="text-xs text-[#8892A0] font-semibold">
            Part of{" "}
            <Link href="https://fancydigitals.com.ng" className="text-[#075A01] font-black hover:text-[#0A8F01] transition">
              Fancy Digitals
            </Link>
          </p>
          <div className="flex items-center gap-6">
            <Link href="/academy/courses" className="text-xs font-bold text-[#4A5468] hover:text-[#0B1220] transition">Courses</Link>
            <Link href="/pricing" className="text-xs font-bold text-[#4A5468] hover:text-[#0B1220] transition">Pro</Link>
            <Link href="/contact" className="text-xs font-bold text-[#4A5468] hover:text-[#0B1220] transition">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}