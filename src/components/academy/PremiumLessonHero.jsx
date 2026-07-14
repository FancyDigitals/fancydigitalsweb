"use client";

import { motion } from "framer-motion";
import {
  BookOpen, Clock3, Trophy, Target, ArrowDown, Sparkles,
} from "lucide-react";
import IllustrationPanel from "./IllustrationPanel";

export default function PremiumLessonHero({ lesson, content }) {
  const objectives = (
    content?.learningObjectives ||
    content?.objectives ||
    []
  ).slice(0, 4);

  function scrollToLesson() {
    const el = document.getElementById("lesson-content");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#FAFAF7] via-white to-[#F5F7FA] border border-[#EDEFF2]">
      {/* Decorative Educax-style pastel shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[#FFE4E1] blur-3xl opacity-70" />
        <div className="absolute top-40 right-0 h-64 w-64 rounded-full bg-[#E9E4FF] blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-[#DDF5E4] blur-3xl opacity-70" />

        {/* Doodle accents (SVG) */}
        <svg className="absolute top-10 left-8 opacity-40" width="46" height="46" viewBox="0 0 46 46" fill="none">
          <path d="M23 4 L26 20 L42 23 L26 26 L23 42 L20 26 L4 23 L20 20 Z" fill="#FF914D" />
        </svg>
        <svg className="absolute top-24 right-16 opacity-30" width="60" height="30" viewBox="0 0 60 30" fill="none">
          <path d="M2 15 Q15 2, 30 15 T58 15" stroke="#075A01" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
        <svg className="absolute bottom-16 right-10 opacity-40" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="3" fill="#FF914D" />
          <circle cx="8" cy="10" r="2" fill="#FF914D" />
          <circle cx="32" cy="10" r="2" fill="#FF914D" />
          <circle cx="8" cy="30" r="2" fill="#FF914D" />
          <circle cx="32" cy="30" r="2" fill="#FF914D" />
        </svg>
      </div>

      <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:p-16">
        {/* LEFT — editorial */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-[#FF914D]/25 px-4 py-1.5 self-start mb-6 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#FF914D]" />
            <p className="text-[11px] font-black text-[#FF914D] uppercase tracking-[0.2em]">
              Start Learning Today
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-[40px] sm:text-[56px] lg:text-[64px] font-black leading-[1.02] tracking-[-0.03em] text-[#0B1220] max-w-2xl"
          >
            {lesson.title}
          </motion.h1>

          {content?.hook && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-lg sm:text-xl leading-relaxed text-[#4A5468] max-w-xl"
            >
              {content.hook}
            </motion.p>
          )}

          {/* Meta chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-2.5"
          >
            <HeroBadge icon={<Clock3 className="h-4 w-4" />} label={`${lesson.duration_minutes} min`} tone="neutral" />
            <HeroBadge icon={<BookOpen className="h-4 w-4" />} label={lesson.difficulty || "Beginner"} tone="neutral" />
            <HeroBadge icon={<Trophy className="h-4 w-4" />} label={`+${lesson.xp_reward} XP`} tone="gold" />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={scrollToLesson}
              className="group inline-flex items-center gap-3 rounded-2xl bg-[#075A01] px-7 py-4 text-base font-bold text-white shadow-xl shadow-[#075A01]/20 hover:bg-[#0A8F01] hover:-translate-y-0.5 transition-all"
            >
              Start Learning
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>
            <a
              href="#lesson-content"
              onClick={(e) => { e.preventDefault(); scrollToLesson(); }}
              className="inline-flex items-center gap-2 rounded-2xl bg-white border border-[#E2E5EA] px-6 py-4 text-base font-bold text-[#0B1220] hover:bg-[#F5F7FA] hover:-translate-y-0.5 transition-all"
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* RIGHT — illustration + objectives */}
        <div className="relative">
          {/* Illustration frame with pastel blob backdrop (Educax style) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 -m-4">
              <svg viewBox="0 0 400 400" className="w-full h-full" preserveAspectRatio="none">
                <path
                  d="M200,40 C310,40 360,120 360,220 C360,320 280,360 190,360 C100,360 40,300 40,200 C40,100 90,40 200,40 Z"
                  fill="#FFE8D6"
                  opacity="0.7"
                />
              </svg>
            </div>
            <div className="relative rounded-[28px] overflow-hidden bg-white/60 backdrop-blur-sm border border-white/60 shadow-sm">
              <IllustrationPanel title={lesson.title} />
            </div>
          </motion.div>

          {/* Objectives card */}
          {objectives.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 rounded-[24px] bg-white border border-[#EDEFF2] p-6 shadow-lg shadow-[#0B1220]/[0.04]"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DDF5E4]">
                  <Target className="h-5 w-5 text-[#075A01]" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#075A01] uppercase tracking-[0.2em]">
                    Today's Mission
                  </p>
                  <h3 className="text-lg font-black text-[#0B1220] tracking-tight">
                    You will learn
                  </h3>
                </div>
              </div>
              <ul className="space-y-2.5">
                {objectives.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.06 }}
                    className="flex items-start gap-3 group"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#075A01] text-white text-[11px] font-black">
                      {i + 1}
                    </div>
                    <p className="text-sm text-[#0B1220] leading-relaxed font-medium">
                      {item}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function HeroBadge({ icon, label, tone = "neutral" }) {
  const tones = {
    neutral: "bg-white border-[#E2E5EA] text-[#0B1220]",
    gold: "bg-[#FFF3E6] border-[#FF914D]/25 text-[#FF914D]",
    green: "bg-[#DDF5E4] border-[#0A8F01]/20 text-[#075A01]",
  };
  return (
    <div className={`flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm ${tones[tone]}`}>
      <span className="opacity-90">{icon}</span>
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
}