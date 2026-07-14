"use client";

import { useState } from "react";
import {
  CircleHelp, CheckCircle2, XCircle, Eye, RotateCcw, Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LessonBlock from "./LessonBlock";

export default function CheckpointBlock({ block }) {
  if (!block) return null;

  const hasChoices = Array.isArray(block.choices) && block.choices.length > 0;

  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const correctIndex =
    typeof block.correctIndex === "number"
      ? block.correctIndex
      : hasChoices
      ? block.choices.findIndex((c) => c.correct)
      : -1;

  const isCorrect = submitted && selected === correctIndex;

  const handleReset = () => {
    setSelected(null);
    setSubmitted(false);
    setRevealed(false);
  };

  return (
    <LessonBlock>
      <div className="relative overflow-hidden rounded-[32px] bg-white border border-[#EDEFF2] shadow-sm">
        {/* Pastel accents (amber tone for challenge) */}
        <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-[#FFE8D6] blur-3xl opacity-70" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#FFF3E6] blur-3xl opacity-60" />

        {/* Corner doodle */}
        <svg
          className="pointer-events-none absolute top-8 right-8 opacity-50"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
        >
          <path
            d="M18 4 L20 15 L31 18 L20 21 L18 32 L16 21 L5 18 L16 15 Z"
            fill="#FF914D"
          />
        </svg>

        <div className="relative p-8 sm:p-12 lg:p-14">
          {/* Header */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FFF3E6] border border-[#FF914D]/25 px-4 py-1.5 mb-6">
            <CircleHelp className="h-3.5 w-3.5 text-[#FF914D]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF914D]">
              Checkpoint
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-black text-[#0B1220] leading-[1.15] tracking-tight max-w-3xl">
            {block.question || block.title}
          </h2>

          {block.description && (
            <p className="mt-4 max-w-3xl text-base sm:text-lg text-[#4A5468] leading-relaxed">
              {block.description}
            </p>
          )}

          {/* Multiple choice */}
          {hasChoices && (
            <div className="mt-8 grid gap-3">
              {block.choices.map((choice, i) => {
                const label = typeof choice === "string" ? choice : choice.text;
                const isSelected = selected === i;
                const isRight = submitted && i === correctIndex;
                const isWrong = submitted && isSelected && i !== correctIndex;

                let cardClass =
                  "border-[#EDEFF2] bg-white hover:border-[#FF914D]/40 hover:bg-[#FFF3E6]/40";
                let badgeClass = "bg-[#F5F7FA] text-[#4A5468] border-[#E2E5EA]";
                let textClass = "text-[#0B1220]";

                if (isRight) {
                  cardClass = "border-[#0A8F01] bg-[#DDF5E4]/50";
                  badgeClass = "bg-[#075A01] text-white border-[#075A01]";
                  textClass = "text-[#075A01] font-semibold";
                } else if (isWrong) {
                  cardClass = "border-rose-300 bg-rose-50";
                  badgeClass = "bg-rose-500 text-white border-rose-500";
                  textClass = "text-rose-700 font-semibold";
                } else if (isSelected) {
                  cardClass = "border-[#FF914D] bg-[#FFF3E6]/60";
                  badgeClass = "bg-[#FF914D] text-white border-[#FF914D]";
                } else if (submitted) {
                  cardClass = "border-[#EDEFF2] bg-white opacity-50";
                }

                return (
                  <motion.button
                    key={i}
                    whileHover={submitted ? {} : { scale: 1.005 }}
                    whileTap={submitted ? {} : { scale: 0.995 }}
                    disabled={submitted}
                    onClick={() => setSelected(i)}
                    className={`group flex w-full items-start gap-4 rounded-2xl border-2 p-4 sm:p-5 text-left transition-all ${cardClass}`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 text-sm font-black transition ${badgeClass}`}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>

                    <p
                      className={`flex-1 pt-1 text-base sm:text-lg leading-snug ${textClass}`}
                    >
                      {label}
                    </p>

                    {isRight && (
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0A8F01]" />
                    )}
                    {isWrong && (
                      <XCircle className="mt-1 h-5 w-5 shrink-0 text-rose-500" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {hasChoices ? (
              <>
                <button
                  onClick={() => setSubmitted(true)}
                  disabled={selected === null || submitted}
                  className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-all ${
                    selected !== null && !submitted
                      ? "bg-[#075A01] text-white shadow-lg shadow-[#075A01]/15 hover:bg-[#0A8F01] hover:-translate-y-0.5"
                      : "bg-[#F5F7FA] text-[#8892A0] cursor-not-allowed"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Check Answer
                </button>

                {submitted && (
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-2xl border border-[#E2E5EA] bg-white px-4 py-3 text-sm font-bold text-[#0B1220] hover:bg-[#F5F7FA] transition"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Try Again
                  </button>
                )}
              </>
            ) : (
              !revealed && (
                <button
                  onClick={() => setRevealed(true)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#075A01] text-white px-5 py-3 text-sm font-bold shadow-lg shadow-[#075A01]/15 hover:bg-[#0A8F01] hover:-translate-y-0.5 transition-all"
                >
                  <Eye className="h-4 w-4" />
                  Reveal Answer
                </button>
              )
            )}
          </div>

          {/* Answer / Explanation */}
          <AnimatePresence initial={false}>
            {(revealed || submitted) && block.answer && (
              <motion.div
                key="answer"
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 10, height: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="mt-8 overflow-hidden"
              >
                <div
                  className={`rounded-2xl border-2 p-6 ${
                    hasChoices && submitted
                      ? isCorrect
                        ? "border-[#0A8F01]/25 bg-gradient-to-br from-[#DDF5E4]/50 to-white"
                        : "border-rose-200 bg-rose-50/70"
                      : "border-[#0A8F01]/25 bg-gradient-to-br from-[#DDF5E4]/50 to-white"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                        hasChoices && submitted && !isCorrect
                          ? "bg-rose-500"
                          : "bg-[#075A01]"
                      }`}
                    >
                      {hasChoices && submitted && !isCorrect ? (
                        <XCircle className="h-4 w-4 text-white" />
                      ) : (
                        <Sparkles className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-black uppercase tracking-[0.2em] ${
                        hasChoices && submitted && !isCorrect
                          ? "text-rose-600"
                          : "text-[#075A01]"
                      }`}
                    >
                      {hasChoices && submitted
                        ? isCorrect
                          ? "Correct!"
                          : "Not quite"
                        : "Explanation"}
                    </span>
                  </div>

                  <p className="text-base sm:text-lg leading-relaxed text-[#0B1220]">
                    {block.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </LessonBlock>
  );
}