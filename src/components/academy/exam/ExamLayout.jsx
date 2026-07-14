// src/components/academy/exam/ExamLayout.jsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LayoutGrid,
  X,
} from "lucide-react";
import ExamHeader from "./ExamHeader";
import ExamSidebar from "./ExamSidebar";
import ExamQuestion from "./ExamQuestion";

const STORAGE_PREFIX = "fancy-exam-";

export default function ExamLayout({
  lessonId,
  questions = [],
  onSubmit,
  onExit,
  title,
  durationSeconds,
}) {
  const STORAGE_KEY = `${STORAGE_PREFIX}${lessonId}`;
  const total = questions.length;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const duration = useMemo(
    () => durationSeconds ?? total * 90,
    [durationSeconds, total]
  );

  /* ---------- HYDRATE ---------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setCurrent(Math.min(data.current ?? 0, Math.max(total - 1, 0)));
        setAnswers(data.answers ?? {});
        setFlagged(data.flagged ?? []);
      }
    } catch {
      /* ignore corrupted cache */
    }
    setHydrated(true);
  }, [STORAGE_KEY, total]);

  /* ---------- AUTOSAVE ---------- */
  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ current, answers, flagged })
      );
    } catch {
      /* quota */
    }
  }, [STORAGE_KEY, current, answers, flagged, hydrated]);

  /* ---------- UNLOAD GUARD ---------- */
  useEffect(() => {
    function prevent(e) {
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", prevent);
    return () => window.removeEventListener("beforeunload", prevent);
  }, []);

  /* ---------- ACTIONS ---------- */
  const answer = useCallback(
    (index) => {
      setAnswers((prev) => ({ ...prev, [current]: index }));
    },
    [current]
  );

  const toggleFlag = useCallback(() => {
    setFlagged((prev) =>
      prev.includes(current)
        ? prev.filter((i) => i !== current)
        : [...prev, current]
    );
  }, [current]);

  const finalize = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
    onSubmit?.(answers);
  }, [STORAGE_KEY, answers, onSubmit]);

  const next = useCallback(() => {
    if (current < total - 1) {
      setCurrent((c) => c + 1);
      return;
    }
    const unanswered = total - Object.keys(answers).length;
    if (unanswered > 0) {
      setConfirmOpen(true);
      return;
    }
    finalize();
  }, [current, total, answers, finalize]);

  const previous = useCallback(() => {
    setCurrent((c) => (c === 0 ? 0 : c - 1));
  }, []);

  const jump = useCallback(
    (index) => {
      setCurrent(index);
      setPaletteOpen(false);
    },
    []
  );

  /* ---------- KEYBOARD ---------- */
  useEffect(() => {
    function isTyping(el) {
      if (!el) return false;
      const tag = el.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        el.isContentEditable
      );
    }

    function onKey(e) {
      if (isTyping(document.activeElement)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const map = { a: 0, b: 1, c: 2, d: 3 };
      const letter = e.key.toLowerCase();

      if (letter in map) {
        e.preventDefault();
        answer(map[letter]);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        previous();
      } else if (letter === "f") {
        e.preventDefault();
        toggleFlag();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answer, next, previous, toggleFlag]);

  /* ---------- EMPTY STATE ---------- */
  if (total === 0) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#090b11] px-6 text-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-400">
            Assessment
          </p>
          <h1 className="mt-3 text-3xl font-black text-white">
            No questions available
          </h1>
          <p className="mt-3 text-gray-400">
            This assessment has no questions yet. Please check back soon.
          </p>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const isLast = current === total - 1;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#090b11] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[160px]" />
        <div className="absolute bottom-[-200px] right-[-100px] h-[420px] w-[420px] rounded-full bg-cyan-500/5 blur-[140px]" />
      </div>

      <div className="relative z-10">
        <ExamHeader
          current={current}
          total={total}
          duration={duration}
          title={title}
          onExpire={finalize}
        />

        <div className="mx-auto flex w-full max-w-[1400px] gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          {/* MAIN */}
          <main className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <ExamQuestion
                  question={questions[current]}
                  answer={answers[current]}
                  onAnswer={answer}
                  onFlag={toggleFlag}
                  flagged={flagged.includes(current)}
                />
              </motion.div>
            </AnimatePresence>

            {/* NAV BAR */}
            <div className="mt-10 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={previous}
                disabled={current === 0}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white/90 transition hover:border-white/20 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowLeft
                  size={16}
                  className="transition group-hover:-translate-x-0.5"
                />
                Previous
              </button>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setPaletteOpen(true)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm font-semibold text-white/80 transition hover:border-white/20 hover:bg-white/[0.06] lg:hidden"
                >
                  <LayoutGrid size={16} />
                  {answeredCount}/{total}
                </button>

                <button
                  onClick={next}
                  className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl px-8 py-3.5 text-sm font-bold transition ${
                    isLast
                      ? "bg-gradient-to-r from-emerald-500 to-green-400 text-black shadow-[0_10px_40px_-10px_rgba(16,185,129,0.6)] hover:shadow-[0_15px_50px_-10px_rgba(16,185,129,0.8)]"
                      : "bg-white text-black hover:bg-white/90"
                  }`}
                >
                  {isLast ? (
                    <>
                      <CheckCircle2 size={16} />
                      Finish Assessment
                    </>
                  ) : (
                    <>
                      Next Question
                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* KEYBOARD HINTS */}
            <div className="mt-8 hidden items-center justify-center gap-2 text-[11px] uppercase tracking-widest text-white/30 sm:flex">
              <Kbd>A</Kbd>
              <Kbd>B</Kbd>
              <Kbd>C</Kbd>
              <Kbd>D</Kbd>
              <span className="mx-2">answer</span>
              <Kbd>←</Kbd>
              <Kbd>→</Kbd>
              <span className="mx-2">navigate</span>
              <Kbd>F</Kbd>
              <span>flag</span>
            </div>
          </main>

          {/* DESKTOP SIDEBAR */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <ExamSidebar
                questions={questions}
                current={current}
                answers={answers}
                flagged={flagged}
                onJump={jump}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE PALETTE DRAWER */}
      <AnimatePresence>
        {paletteOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPaletteOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm overflow-y-auto border-l border-white/10 bg-[#0d1117] lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <p className="text-sm font-bold uppercase tracking-widest text-white/70">
                  Questions
                </p>
                <button
                  onClick={() => setPaletteOpen(false)}
                  className="rounded-xl border border-white/10 p-2 text-white/70 hover:bg-white/5"
                >
                  <X size={16} />
                </button>
              </div>
              <ExamSidebar
                questions={questions}
                current={current}
                answers={answers}
                flagged={flagged}
                onJump={jump}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SUBMIT CONFIRM */}
      <AnimatePresence>
        {confirmOpen && (
          <div className="fixed inset-0 z-[60] grid place-items-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#141a24] to-[#0d1117] p-8 shadow-2xl"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
                Confirm Submission
              </p>
              <h3 className="mt-3 text-2xl font-black text-white">
                Submit assessment?
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-400">
                You have{" "}
                <span className="font-bold text-white">
                  {total - answeredCount}
                </span>{" "}
                unanswered {total - answeredCount === 1 ? "question" : "questions"}.
                You won&apos;t be able to change your answers after submitting.
              </p>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/[0.07]"
                >
                  Keep Working
                </button>
                <button
                  onClick={() => {
                    setConfirmOpen(false);
                    finalize();
                  }}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-400 px-5 py-3 text-sm font-bold text-black shadow-[0_10px_40px_-10px_rgba(16,185,129,0.6)] transition hover:shadow-[0_15px_50px_-10px_rgba(16,185,129,0.8)]"
                >
                  Submit Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- KEYBOARD HINT ---------- */
function Kbd({ children }) {
  return (
    <kbd className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-md border border-white/10 bg-white/[0.04] px-1.5 font-mono text-[10px] font-bold text-white/60">
      {children}
    </kbd>
  );
}