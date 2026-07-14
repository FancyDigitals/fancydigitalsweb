"use client";

import { useEffect, useState } from "react";
import { PencilLine, Check, Eye, EyeOff, RotateCcw, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LessonBlock from "./LessonBlock";

export default function ExerciseBlock({ block }) {
  if (!block) return null;

  const storageKey = `exercise:${block.id || block.title || "default"}`;

  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore draft
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(storageKey);
    if (saved) setValue(saved);
    setHydrated(true);
  }, [storageKey]);

  // Persist draft (only after hydration so we don't overwrite with "")
  useEffect(() => {
    if (typeof window === "undefined" || !hydrated) return;
    window.localStorage.setItem(storageKey, value);
  }, [storageKey, value, hydrated]);

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;
  const canSubmit = value.trim().length >= 10;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    setRevealed(true);
  };

  const handleReset = () => {
    setValue("");
    setSubmitted(false);
    setRevealed(false);
  };

  return (
    <LessonBlock>
      <div className="relative overflow-hidden rounded-[32px] bg-white border border-[#EDEFF2] shadow-sm">
        {/* Pastel backdrop */}
        <div className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-[#DDF5E4] blur-3xl opacity-70" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#FFE8D6] blur-3xl opacity-50" />

        {/* Corner doodle */}
        <svg
          className="pointer-events-none absolute top-8 right-8 opacity-40"
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
        >
          <circle cx="17" cy="17" r="2.5" fill="#0A8F01" />
          <circle cx="6" cy="8" r="1.6" fill="#0A8F01" />
          <circle cx="28" cy="8" r="1.6" fill="#0A8F01" />
          <circle cx="6" cy="26" r="1.6" fill="#0A8F01" />
          <circle cx="28" cy="26" r="1.6" fill="#0A8F01" />
        </svg>

        <div className="relative p-8 sm:p-12 lg:p-14">
          {/* Header */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#DDF5E4] border border-[#0A8F01]/15 px-4 py-1.5 mb-6">
            <PencilLine className="h-3.5 w-3.5 text-[#075A01]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#075A01]">
              Your Turn
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-black text-[#0B1220] leading-[1.1] tracking-tight max-w-3xl">
            {block.title}
          </h2>

          {block.instruction && (
            <p className="mt-5 max-w-3xl text-base sm:text-lg leading-relaxed text-[#4A5468]">
              {block.instruction}
            </p>
          )}

          {/* Hints */}
          {Array.isArray(block.hints) && block.hints.length > 0 && (
            <div className="mt-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8892A0] mb-3">
                Hints
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {block.hints.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3 rounded-xl bg-[#FAFAF7] border border-[#EDEFF2] p-3.5 text-sm text-[#4A5468]"
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white border border-[#EDEFF2] text-[10px] font-black text-[#075A01]">
                      {i + 1}
                    </div>
                    <span className="leading-relaxed">{h}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Editor */}
          <div className="mt-10">
            <div className="relative rounded-3xl border-2 border-[#EDEFF2] bg-white transition-all focus-within:border-[#075A01] focus-within:shadow-lg focus-within:shadow-[#075A01]/5">
              {/* Toolbar row */}
              <div className="flex items-center justify-between border-b border-[#EDEFF2] px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#DDF5E4]">
                    <Sparkles className="h-3 w-3 text-[#075A01]" />
                  </div>
                  <span className="text-[11px] font-bold text-[#4A5468]">
                    Your response
                  </span>
                </div>
                {value.length > 0 && (
                  <span className="text-[10px] font-bold text-[#8892A0]">
                    Auto-saved
                  </span>
                )}
              </div>

              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={block.placeholder || "Write your answer here..."}
                className="min-h-[180px] w-full resize-y bg-transparent px-5 py-4 text-base sm:text-lg leading-relaxed text-[#0B1220] outline-none placeholder:text-[#8892A0] sm:min-h-[220px]"
              />

              {/* Footer meter */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#EDEFF2] px-5 py-3 text-[11px] font-semibold text-[#8892A0]">
                <div className="flex items-center gap-4">
                  <span className="tabular-nums">{wordCount} words</span>
                  <span className="tabular-nums">{charCount} chars</span>
                </div>
                {!canSubmit ? (
                  <span className="text-[#FF914D]">
                    {Math.max(0, 10 - value.trim().length)} more to submit
                  </span>
                ) : (
                  <span className="text-[#075A01] font-black">Ready to submit</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleSubmit}
                disabled={!canSubmit || submitted}
                className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-all ${
                  canSubmit && !submitted
                    ? "bg-[#075A01] text-white shadow-lg shadow-[#075A01]/15 hover:bg-[#0A8F01] hover:-translate-y-0.5"
                    : "bg-[#F5F7FA] text-[#8892A0] cursor-not-allowed"
                }`}
              >
                <Check className="h-4 w-4" />
                {submitted ? "Submitted" : "Submit Answer"}
              </button>

              <button
                onClick={() => setRevealed((r) => !r)}
                className="inline-flex items-center gap-2 rounded-2xl border border-[#E2E5EA] bg-white px-5 py-3 text-sm font-bold text-[#0B1220] hover:bg-[#F5F7FA] transition"
              >
                {revealed ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                {revealed ? "Hide" : "Show"} Expected Outcome
              </button>

              {(value || submitted) && (
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold text-[#8892A0] hover:text-[#0B1220] transition"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Expected Outcome */}
          <AnimatePresence initial={false}>
            {revealed && block.expectedOutcome && (
              <motion.div
                key="outcome"
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 10, height: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="mt-8 overflow-hidden"
              >
                <div className="rounded-2xl border border-[#0A8F01]/20 bg-gradient-to-br from-[#DDF5E4]/50 to-white p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#075A01]">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#075A01]">
                      Expected Outcome
                    </p>
                  </div>
                  <p className="text-base sm:text-lg leading-relaxed text-[#0B1220]">
                    {block.expectedOutcome}
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