// src/components/academy/exam/ExamResults.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Sparkles,
  CheckCircle2,
  XCircle,
  MinusCircle,
  RotateCcw,
  Bot,
  ArrowLeft,
  Award,
  Target,
} from "lucide-react";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export default function ExamResults({
  questions = [],
  answers = {},
  xpPerCorrect = 25,
  onRetry,
  onReview,
  onExit,
  lessonTitle,
}) {
  /* ---------- COMPUTE ---------- */
  const stats = useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;
    const perTopic = {};

    questions.forEach((q, i) => {
      const selected = answers[i];
      const correctIndex = q.correctIndex ?? q.answer ?? q.correct;
      const topic = q.topic ?? "General";

      if (!perTopic[topic]) perTopic[topic] = { correct: 0, total: 0 };
      perTopic[topic].total += 1;

      if (selected === undefined || selected === null) {
        skipped += 1;
      } else if (selected === correctIndex) {
        correct += 1;
        perTopic[topic].correct += 1;
      } else {
        incorrect += 1;
      }
    });

    const total = questions.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    const xp = correct * xpPerCorrect;

    return { correct, incorrect, skipped, total, percentage, xp, perTopic };
  }, [questions, answers, xpPerCorrect]);

  const tier = getTier(stats.percentage);

  /* ---------- ANIMATED SCORE ---------- */
  const [displayScore, setDisplayScore] = useState(0);
  useEffect(() => {
    const duration = 1400;
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * stats.percentage));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stats.percentage]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#090b11] px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-[160px] ${tier.glow}`}
        />
        <div className="absolute bottom-[-200px] right-[-100px] h-[420px] w-[420px] rounded-full bg-cyan-500/5 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* HERO SCORE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#141a24] to-[#0d1117] shadow-[0_30px_100px_-30px_rgba(0,0,0,0.7)]"
        >
          <div
            className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${tier.accentLine} to-transparent`}
          />

          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[auto,1fr] lg:items-center">
            {/* RING */}
            <div className="relative mx-auto h-52 w-52 sm:h-60 sm:w-60">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  strokeWidth="4"
                  fill="none"
                  className="stroke-white/[0.06]"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="44"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  className={tier.stroke}
                  style={{ strokeDasharray: 2 * Math.PI * 44 }}
                  initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
                  animate={{
                    strokeDashoffset:
                      2 * Math.PI * 44 * (1 - stats.percentage / 100),
                  }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className={`text-[11px] font-bold uppercase tracking-[0.25em] ${tier.label}`}
                >
                  Score
                </span>
                <span className="mt-1 font-mono text-6xl font-black tabular-nums text-white sm:text-7xl">
                  {displayScore}
                </span>
                <span className="mt-1 text-sm font-semibold text-white/40">
                  out of 100
                </span>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] ${tier.badge}`}
              >
                <tier.Icon size={12} />
                {tier.label_text}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-5 text-4xl font-black leading-[1.1] text-white sm:text-5xl"
              >
                {tier.headline}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 text-base leading-7 text-gray-400"
              >
                {tier.subtext}
                {lessonTitle && (
                  <>
                    {" "}You completed{" "}
                    <span className="font-semibold text-white/80">
                      {lessonTitle}
                    </span>
                    .
                  </>
                )}
              </motion.p>

              {/* MINI STATS */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 grid grid-cols-3 gap-3"
              >
                <MiniStat
                  icon={<CheckCircle2 size={14} />}
                  value={stats.correct}
                  label="Correct"
                  tone="emerald"
                />
                <MiniStat
                  icon={<XCircle size={14} />}
                  value={stats.incorrect}
                  label="Incorrect"
                  tone="red"
                />
                <MiniStat
                  icon={<MinusCircle size={14} />}
                  value={stats.skipped}
                  label="Skipped"
                  tone="neutral"
                />
              </motion.div>

              {/* XP */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.06] px-5 py-3"
              >
                <div className="relative">
                  <Sparkles size={18} className="text-emerald-300" />
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0"
                  >
                    <Sparkles size={18} className="text-emerald-300/40" />
                  </motion.div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300/70">
                    XP Earned
                  </p>
                  <p className="font-mono text-xl font-black text-white">
                    +{stats.xp}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end"
        >
          {onExit && (
            <button
              onClick={onExit}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-white/80 transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <ArrowLeft size={15} />
              Back to Lesson
            </button>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-white/80 transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <RotateCcw size={15} />
              Retry Assessment
            </button>
          )}
          {onReview && (
            <button
              onClick={() => onReview({ stats, answers, questions })}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-400 px-6 py-3.5 text-sm font-bold text-black shadow-[0_10px_40px_-10px_rgba(16,185,129,0.6)] transition hover:shadow-[0_15px_50px_-10px_rgba(16,185,129,0.8)]"
            >
              <Bot size={15} />
              Review with AI Tutor
            </button>
          )}
        </motion.div>

        {/* TOPIC PERFORMANCE */}
        {Object.keys(stats.perTopic).length > 1 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-10 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#141a24] to-[#0d1117] p-8 sm:p-10"
          >
            <div className="flex items-center gap-3">
              <Target size={16} className="text-emerald-300" />
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                Topic Performance
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              {Object.entries(stats.perTopic).map(([topic, data]) => {
                const pct = Math.round((data.correct / data.total) * 100);
                return (
                  <div key={topic}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-white/90">
                        {topic}
                      </span>
                      <span className="font-mono text-white/50">
                        {data.correct}/{data.total} · {pct}%
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.05]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${barColor(pct)}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* REVIEW BREAKDOWN */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-10"
        >
          <div className="mb-6 flex items-center gap-3">
            <Award size={16} className="text-emerald-300" />
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">
              Question Review
            </h2>
          </div>

          <div className="space-y-4">
            {questions.map((q, i) => (
              <ReviewRow
                key={i}
                index={i}
                question={q}
                selected={answers[i]}
              />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

/* ---------- MINI STAT ---------- */
function MiniStat({ icon, value, label, tone }) {
  const tones = {
    emerald: "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-300",
    red: "border-red-500/20 bg-red-500/[0.06] text-red-300",
    neutral: "border-white/10 bg-white/[0.03] text-white/60",
  };
  return (
    <div
      className={`rounded-2xl border p-4 text-center ${tones[tone] ?? tones.neutral}`}
    >
      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
        {icon}
        {label}
      </div>
      <div className="mt-2 font-mono text-2xl font-black text-white tabular-nums">
        {value}
      </div>
    </div>
  );
}

/* ---------- REVIEW ROW ---------- */
function ReviewRow({ index, question, selected }) {
  const correctIndex =
    question.correctIndex ?? question.answer ?? question.correct;
  const prompt = question.prompt ?? question.question ?? "";
  const options = question.options ?? [];
  const explanation = question.explanation;

  const status =
    selected === undefined || selected === null
      ? "skipped"
      : selected === correctIndex
        ? "correct"
        : "incorrect";

  const styles = STATUS_STYLES[status];

  return (
    <article
      className={`overflow-hidden rounded-2xl border ${styles.border} bg-gradient-to-b from-[#141a24] to-[#0d1117]`}
    >
      <div className="flex items-start gap-4 border-b border-white/[0.06] p-5 sm:p-6">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-xs font-black ${styles.badge}`}
        >
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <div
            className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${styles.label}`}
          >
            <styles.Icon size={11} />
            {styles.text}
          </div>
          <h3 className="mt-2 text-base font-bold leading-6 text-white">
            {prompt}
          </h3>
        </div>
      </div>

      <div className="space-y-2 p-5 sm:p-6">
        {options.map((option, i) => {
          const label = typeof option === "string" ? option : option?.text ?? "";
          const isCorrect = i === correctIndex;
          const isSelected = i === selected;

          let cls =
            "border-white/[0.06] bg-white/[0.02] text-white/60";
          if (isCorrect)
            cls =
              "border-emerald-400/30 bg-emerald-500/[0.08] text-white";
          if (isSelected && !isCorrect)
            cls = "border-red-400/30 bg-red-500/[0.08] text-white";

          return (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-xl border p-3.5 text-sm ${cls}`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-xs font-black text-white/80">
                {LETTERS[i]}
              </span>
              <span className="flex-1 pt-0.5 leading-6">{label}</span>
              {isCorrect && (
                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />
              )}
              {isSelected && !isCorrect && (
                <XCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
              )}
            </div>
          );
        })}

        {explanation && (
          <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
              Explanation
            </p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              {explanation}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

/* ---------- HELPERS ---------- */
function getTier(pct) {
  if (pct >= 90)
    return {
      label_text: "Outstanding",
      headline: "You mastered it.",
      subtext:
        "Exceptional performance. You demonstrated deep understanding of the material.",
      Icon: Trophy,
      badge: "border-emerald-400/30 bg-emerald-500/[0.08] text-emerald-300",
      stroke: "stroke-emerald-400",
      label: "text-emerald-300",
      glow: "bg-emerald-500/10",
      accentLine: "via-emerald-400/40",
    };
  if (pct >= 75)
    return {
      label_text: "Great Work",
      headline: "Strong performance.",
      subtext:
        "You've got a solid grasp of the concepts. Review the ones you missed to reach mastery.",
      Icon: Award,
      badge: "border-cyan-400/30 bg-cyan-500/[0.08] text-cyan-300",
      stroke: "stroke-cyan-400",
      label: "text-cyan-300",
      glow: "bg-cyan-500/10",
      accentLine: "via-cyan-400/40",
    };
  if (pct >= 60)
    return {
      label_text: "Good Effort",
      headline: "You're getting there.",
      subtext:
        "You understand the fundamentals. Revisit the lesson and try again to strengthen your grasp.",
      Icon: Target,
      badge: "border-yellow-400/30 bg-yellow-500/[0.08] text-yellow-300",
      stroke: "stroke-yellow-400",
      label: "text-yellow-300",
      glow: "bg-yellow-500/10",
      accentLine: "via-yellow-400/40",
    };
  return {
    label_text: "Keep Practicing",
    headline: "Let's build this up.",
    subtext:
      "This one needs another pass. Review the lesson carefully — mastery comes with repetition.",
    Icon: Target,
    badge: "border-red-400/30 bg-red-500/[0.08] text-red-300",
    stroke: "stroke-red-400",
    label: "text-red-300",
    glow: "bg-red-500/10",
    accentLine: "via-red-400/40",
  };
}

function barColor(pct) {
  if (pct >= 75) return "bg-emerald-400";
  if (pct >= 50) return "bg-yellow-400";
  return "bg-red-400";
}

const STATUS_STYLES = {
  correct: {
    border: "border-emerald-500/15",
    badge:
      "border-emerald-400/30 bg-emerald-500/[0.08] text-emerald-300",
    label: "text-emerald-300",
    text: "Correct",
    Icon: CheckCircle2,
  },
  incorrect: {
    border: "border-red-500/15",
    badge: "border-red-400/30 bg-red-500/[0.08] text-red-300",
    label: "text-red-300",
    text: "Incorrect",
    Icon: XCircle,
  },
  skipped: {
    border: "border-white/[0.08]",
    badge: "border-white/10 bg-white/[0.03] text-white/60",
    label: "text-white/60",
    text: "Skipped",
    Icon: MinusCircle,
  },
};