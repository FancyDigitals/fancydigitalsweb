// src/components/academy/exam/ExamQuestion.jsx
"use client";

import { motion } from "framer-motion";
import { Flag, Sparkles } from "lucide-react";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export default function ExamQuestion({
  question,
  answer,
  onAnswer,
  onFlag,
  flagged,
}) {
  if (!question) return null;

  const {
    prompt,
    question: legacyPrompt, // backwards compatibility
    options = [],
    context,
    code,
    image,
    topic,
    difficulty,
  } = question;

  const questionText = prompt ?? legacyPrompt ?? "";

  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#141a24] to-[#0d1117] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]">
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      {/* HEADER META */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-6 py-5 sm:px-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-300">
            <Sparkles size={11} />
            Question
          </span>

          {topic && (
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/60">
              {topic}
            </span>
          )}

          {difficulty && (
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${difficultyStyle(
                difficulty
              )}`}
            >
              {difficulty}
            </span>
          )}
        </div>

        <button
          onClick={onFlag}
          aria-pressed={flagged}
          className={`group inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
            flagged
              ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-300"
              : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:bg-white/[0.06] hover:text-white/90"
          }`}
        >
          <Flag
            size={13}
            className={flagged ? "fill-yellow-300" : ""}
          />
          {flagged ? "Flagged" : "Flag for review"}
        </button>
      </div>

      {/* BODY */}
      <div className="px-6 py-8 sm:px-10 sm:py-10">
        {/* Optional context */}
        {context && (
          <div className="mb-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-sm leading-7 text-white/70">
            {context}
          </div>
        )}

        {/* Prompt */}
        <h2 className="text-2xl font-black leading-[1.3] text-white sm:text-3xl sm:leading-[1.25]">
          {questionText}
        </h2>

        {/* Optional code */}
        {code && (
          <pre className="mt-6 overflow-x-auto rounded-2xl border border-white/[0.06] bg-[#0a0d13] p-5 font-mono text-[13px] leading-6 text-white/80">
            <code>{code}</code>
          </pre>
        )}

        {/* Optional image */}
        {image && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt="Question illustration"
              className="w-full"
            />
          </div>
        )}

        {/* OPTIONS */}
        <div
          role="radiogroup"
          aria-label="Answer options"
          className="mt-8 grid gap-3"
        >
          {options.map((option, index) => (
            <Option
              key={index}
              index={index}
              option={option}
              selected={answer === index}
              onSelect={() => onAnswer(index)}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

/* ---------- OPTION ---------- */
function Option({ index, option, selected, onSelect }) {
  const label = typeof option === "string" ? option : option?.text ?? "";
  const letter = LETTERS[index] ?? String(index + 1);

  return (
    <motion.button
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.995 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`group relative flex w-full items-start gap-4 overflow-hidden rounded-2xl border p-5 text-left transition-colors sm:p-6 ${
        selected
          ? "border-emerald-400/40 bg-emerald-500/[0.08]"
          : "border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
      }`}
    >
      {/* Selected glow */}
      {selected && (
        <motion.div
          layoutId="option-glow"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500/[0.06] via-transparent to-emerald-500/[0.06]"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      {/* Letter badge */}
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-sm font-black transition ${
          selected
            ? "border-emerald-400/40 bg-emerald-400 text-black"
            : "border-white/10 bg-white/[0.03] text-white/70 group-hover:border-white/20 group-hover:text-white"
        }`}
      >
        {letter}
      </span>

      {/* Option label */}
      <span
        className={`min-w-0 flex-1 pt-1.5 text-base leading-6 transition ${
          selected ? "text-white" : "text-white/80 group-hover:text-white"
        }`}
      >
        {label}
      </span>

      {/* Selected indicator */}
      <span
        className={`mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
          selected
            ? "border-emerald-400 bg-emerald-400"
            : "border-white/20 bg-transparent"
        }`}
      >
        {selected && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="h-2 w-2 rounded-full bg-black"
          />
        )}
      </span>
    </motion.button>
  );
}

/* ---------- DIFFICULTY STYLE ---------- */
function difficultyStyle(level) {
  const key = String(level).toLowerCase();
  if (key === "easy" || key === "beginner")
    return "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300";
  if (key === "medium" || key === "intermediate")
    return "border border-yellow-500/20 bg-yellow-500/10 text-yellow-300";
  if (key === "hard" || key === "advanced" || key === "expert")
    return "border border-red-500/20 bg-red-500/10 text-red-300";
  return "border border-white/10 bg-white/[0.03] text-white/60";
}