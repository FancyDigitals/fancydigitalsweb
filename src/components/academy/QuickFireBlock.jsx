"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Flame, RotateCcw } from "lucide-react";
import LessonBlock from "./LessonBlock";

const QUESTION_DURATION = 10000;
const BONUS_THRESHOLD_MS = 3500;

/* ==============================================================
   ADAPTER
============================================================== */
function normalizeQuickFire(block) {
  const src = block?.content || block || {};
  const raw = Array.isArray(src.questions) ? src.questions : [];

  const questions = raw.map((q) => {
    // Rich shape has options[]
    if (Array.isArray(q.options) && q.options.length > 0) {
      return {
        question: q.question || q.statement || "",
        options: q.options.map((o) => ({
          text: typeof o === "string" ? o : o.text || "",
          correct: typeof o === "string" ? false : Boolean(o.correct),
        })),
        difficulty: q.difficulty || null,
        explanation: q.explanation || "",
      };
    }
    // Generator true/false shape
    const isBool = typeof q.answer === "boolean";
    return {
      question: q.statement || q.question || "",
      options: isBool
        ? [
            { text: "True", correct: q.answer === true },
            { text: "False", correct: q.answer === false },
          ]
        : [],
      difficulty: q.difficulty || null,
      explanation: q.explanation || "",
    };
  });

  return {
    title: src.title || block?.title || "Quick Fire",
    description: src.description || "",
    icon: src.icon || "⚡",
    questions,
  };
}

/* ==============================================================
   Countdown hook
============================================================== */
function useCountdown(duration, active, onExpire) {
  const [remaining, setRemaining] = useState(duration);
  const startRef = useRef(null);
  const frameRef = useRef(null);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (!active) {
      setRemaining(duration);
      return;
    }
    startRef.current = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const left = Math.max(0, duration - elapsed);
      setRemaining(left);
      if (left === 0) {
        onExpireRef.current?.();
        return;
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, duration]);

  return remaining;
}

/* ==============================================================
   Timer ring
============================================================== */
function TimerRing({ remaining, total }) {
  const pct = remaining / total;
  const radius = 22;
  const circ = 2 * Math.PI * radius;
  const dash = circ * pct;
  const color = pct > 0.5 ? "#0A8F01" : pct > 0.25 ? "#FF914D" : "#e11d48";

  return (
    <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
      <svg
        className="absolute inset-0 -rotate-90"
        width="56"
        height="56"
        viewBox="0 0 56 56"
      >
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#F1F5F9"
          strokeWidth="4"
        />
        <motion.circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ - dash}
          style={{ transition: "stroke 0.3s ease" }}
        />
      </svg>
      <span className="text-sm font-black text-[#0B1220] relative z-10 tabular-nums">
        {Math.ceil(remaining / 1000)}
      </span>
    </div>
  );
}

/* ==============================================================
   Question slide
============================================================== */
function QuestionSlide({ question, questionNum, total, onAnswer, onExpire }) {
  const [answered, setAnswered] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const answerTime = useRef(null);

  useEffect(() => {
    answerTime.current = Date.now();
  }, []);

  const handleAnswer = useCallback(
    (index) => {
      if (revealed) return;
      const responseTime = Date.now() - answerTime.current;
      setAnswered(index);
      setRevealed(true);
      const correct = question.options[index]?.correct === true;
      const bonus = responseTime < BONUS_THRESHOLD_MS && correct;
      setTimeout(() => onAnswer({ correct, bonus, responseTime, index }), 900);
    },
    [revealed, question, onAnswer]
  );

  const remaining = useCountdown(QUESTION_DURATION, !revealed, onExpire);
  const isTrueFalse = question.options.length === 2;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <TimerRing remaining={remaining} total={QUESTION_DURATION} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-[10px] font-black text-[#8892A0] uppercase tracking-[0.2em]">
              {questionNum} of {total}
            </span>
            {question.difficulty && (
              <span
                className={`text-[10px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                  question.difficulty === "hard"
                    ? "text-rose-600 bg-rose-50 border-rose-200"
                    : question.difficulty === "medium"
                    ? "text-[#FF914D] bg-[#FFF3E6] border-[#FF914D]/25"
                    : "text-[#075A01] bg-[#DDF5E4] border-[#0A8F01]/20"
                }`}
              >
                {question.difficulty}
              </span>
            )}
          </div>
          <p className="text-[#0B1220] text-lg sm:text-xl font-bold leading-snug tracking-tight">
            {question.question}
          </p>
        </div>
      </div>

      {/* Options */}
      <div className={`grid gap-2.5 ${isTrueFalse ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
        {question.options.map((option, i) => {
          const isChosen = answered === i;
          const isCorrect = option.correct;
          let state = "idle";
          if (revealed) {
            if (isCorrect) state = "correct";
            else if (isChosen) state = "wrong";
            else state = "dim";
          }

          const stateClass =
            state === "correct"
              ? "border-[#0A8F01] bg-[#DDF5E4]/60 text-[#075A01]"
              : state === "wrong"
              ? "border-rose-300 bg-rose-50 text-rose-700"
              : state === "dim"
              ? "border-[#EDEFF2] bg-white text-[#8892A0] opacity-50"
              : "border-[#EDEFF2] bg-white text-[#0B1220] hover:border-[#FF914D]/40 hover:bg-[#FFF3E6]/40 cursor-pointer";

          return (
            <motion.button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={revealed}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              whileHover={!revealed ? { scale: 1.02 } : {}}
              whileTap={!revealed ? { scale: 0.98 } : {}}
              className={`text-left px-4 py-4 rounded-2xl border-2 text-sm sm:text-base font-semibold transition-all ${stateClass}`}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-md text-[11px] font-black flex items-center justify-center border ${
                    state === "correct"
                      ? "border-[#0A8F01] bg-[#075A01] text-white"
                      : state === "wrong"
                      ? "border-rose-400 bg-rose-500 text-white"
                      : state === "dim"
                      ? "border-[#E2E5EA] text-[#8892A0]"
                      : "border-[#E2E5EA] text-[#4A5468]"
                  }`}
                >
                  {state === "correct"
                    ? "✓"
                    : state === "wrong"
                    ? "✗"
                    : isTrueFalse
                    ? option.text.charAt(0)
                    : String.fromCharCode(65 + i)}
                </span>
                {option.text}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Speed bonus */}
      {!revealed && remaining < BONUS_THRESHOLD_MS && remaining > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center gap-2 py-1"
        >
          <span className="text-[#FF914D] text-xs font-black animate-pulse flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5" /> Answer now for speed bonus
          </span>
        </motion.div>
      )}

      {/* Explanation flash */}
      <AnimatePresence>
        {revealed && question.explanation && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl bg-[#FAFAF7] border border-[#EDEFF2] p-4"
          >
            <p className="text-xs font-black text-[#8892A0] uppercase tracking-[0.15em] mb-1.5">
              Why
            </p>
            <p className="text-sm text-[#0B1220] leading-relaxed">
              {question.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ==============================================================
   Results
============================================================== */
function ResultsSummary({ results, questions, onRetry }) {
  const correct = results.filter((r) => r.correct).length;
  const bonuses = results.filter((r) => r.bonus).length;
  const pct = Math.round((correct / questions.length) * 100);
  const avgTime =
    results.reduce((a, r) => a + r.responseTime, 0) / results.length / 1000;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 py-2"
    >
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="text-5xl mb-2"
        >
          {pct >= 80 ? "🔥" : pct >= 60 ? "⭐" : "📚"}
        </motion.div>
        <div className="flex items-end justify-center gap-1">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-black text-[#0B1220] tracking-tight tabular-nums"
          >
            {pct}
          </motion.span>
          <span className="text-[#8892A0] text-2xl font-bold pb-1">%</span>
        </div>
        <p className="text-[#4A5468] text-sm">
          {correct} of {questions.length} correct
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Correct", value: correct, color: "text-[#075A01]", bg: "bg-[#DDF5E4]/60" },
          { label: "Speed", value: bonuses, color: "text-[#FF914D]", bg: "bg-[#FFF3E6]" },
          { label: "Avg Time", value: `${avgTime.toFixed(1)}s`, color: "text-[#0369a1]", bg: "bg-[#E3F0FF]" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.07 }}
            className={`${stat.bg} border border-[#EDEFF2] rounded-2xl p-4 text-center`}
          >
            <p className={`text-xl font-black tabular-nums ${stat.color}`}>{stat.value}</p>
            <p className="text-[10px] text-[#8892A0] font-black uppercase tracking-wider mt-1">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8892A0]">
          Review
        </p>
        {questions.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.05 }}
            className={`flex items-start gap-3 p-3.5 rounded-xl border ${
              results[i]?.correct
                ? "border-[#0A8F01]/20 bg-[#DDF5E4]/30"
                : "border-rose-200 bg-rose-50/50"
            }`}
          >
            <span
              className={`text-sm shrink-0 font-black ${
                results[i]?.correct ? "text-[#075A01]" : "text-rose-500"
              }`}
            >
              {results[i]?.correct ? "✓" : "✗"}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[#0B1220] text-xs sm:text-sm leading-snug font-medium line-clamp-2">
                {q.question}
              </p>
              {!results[i]?.correct && q.explanation && (
                <p className="text-[#4A5468] text-xs mt-1.5 leading-relaxed">
                  {q.explanation}
                </p>
              )}
            </div>
            {results[i]?.bonus && (
              <Zap className="h-3.5 w-3.5 text-[#FF914D] shrink-0" />
            )}
          </motion.div>
        ))}
      </div>

      <button
        onClick={onRetry}
        className="w-full py-3.5 rounded-2xl bg-white border border-[#E2E5EA] text-[#0B1220] hover:bg-[#F5F7FA] text-sm font-bold transition inline-flex items-center justify-center gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        Try Again
      </button>
    </motion.div>
  );
}

/* ==============================================================
   Main
============================================================== */
export default function QuickFireBlock({ block }) {
  const { title, description, questions, icon } = useMemo(
    () => normalizeQuickFire(block),
    [block]
  );

  const [phase, setPhase] = useState("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [results, setResults] = useState([]);
  const [streak, setStreak] = useState(0);

  const handleAnswer = useCallback(
    (result) => {
      const newResults = [...results, result];
      setResults(newResults);
      setStreak((s) => (result.correct ? s + 1 : 0));
      if (currentQ + 1 >= questions.length) setPhase("results");
      else setCurrentQ((q) => q + 1);
    },
    [results, currentQ, questions.length]
  );

  const handleExpire = useCallback(() => {
    handleAnswer({
      correct: false,
      bonus: false,
      responseTime: QUESTION_DURATION,
      index: -1,
    });
  }, [handleAnswer]);

  const handleRetry = () => {
    setPhase("intro");
    setCurrentQ(0);
    setResults([]);
    setStreak(0);
  };

  if (!questions.length) return null;

  return (
    <LessonBlock>
      <div className="relative overflow-hidden rounded-[32px] bg-white border border-[#EDEFF2] shadow-sm">
        {/* Warm accents */}
        <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-[#FFF3E6] blur-3xl opacity-80" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#FFE8D6] blur-3xl opacity-60" />

        {/* Header */}
        <div className="relative border-b border-[#EDEFF2] p-6 sm:p-8 lg:p-10">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF914D] to-[#f97316] flex items-center justify-center text-xl shadow-md shadow-[#FF914D]/25">
              <span>{icon}</span>
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF3E6] border border-[#FF914D]/25 px-3 py-1 mb-2">
                <Zap className="h-3 w-3 text-[#FF914D]" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#FF914D]">
                  Quick Fire
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0B1220] tracking-tight leading-tight">
                {title}
              </h3>
              {description && (
                <p className="text-[#4A5468] text-sm sm:text-base mt-1.5 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            {phase === "playing" && streak > 1 && (
              <motion.div
                key={streak}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF3E6] border border-[#FF914D]/30 rounded-full shrink-0"
              >
                <Flame className="h-3.5 w-3.5 text-[#FF914D]" />
                <span className="text-[#FF914D] text-xs font-black tabular-nums">
                  {streak}
                </span>
              </motion.div>
            )}
          </div>

          {/* Progress dots */}
          {phase === "playing" && (
            <div className="flex gap-1.5 mt-5">
              {questions.map((_, i) => (
                <motion.div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    i < results.length
                      ? results[i]?.correct
                        ? "bg-[#0A8F01]"
                        : "bg-rose-400"
                      : i === currentQ
                      ? "bg-[#FF914D]"
                      : "bg-[#F1F5F9]"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="relative p-6 sm:p-8 lg:p-10">
          <AnimatePresence mode="wait">
            {phase === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-6 space-y-5"
              >
                <div className="text-5xl">⚡</div>
                <div>
                  <p className="text-[#0B1220] font-black text-lg mb-1 tracking-tight">
                    {questions.length} Questions
                  </p>
                  <p className="text-[#4A5468] text-sm">
                    {Math.ceil(QUESTION_DURATION / 1000)}s per question · Answer fast for bonus
                  </p>
                </div>
                <div className="flex items-center justify-center gap-4 text-[11px] text-[#8892A0] font-semibold">
                  <span className="inline-flex items-center gap-1">
                    <Zap className="h-3 w-3 text-[#FF914D]" /> Speed bonus
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Flame className="h-3 w-3 text-[#FF914D]" /> Build streaks
                  </span>
                </div>
                <motion.button
                  onClick={() => setPhase("playing")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF914D] to-[#f97316] text-white font-black text-sm shadow-xl shadow-[#FF914D]/25 hover:shadow-[#FF914D]/40 transition-all"
                >
                  Start Challenge
                </motion.button>
              </motion.div>
            )}

            {phase === "playing" && (
              <motion.div
                key={`q-${currentQ}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <QuestionSlide
                  question={questions[currentQ]}
                  questionNum={currentQ + 1}
                  total={questions.length}
                  onAnswer={handleAnswer}
                  onExpire={handleExpire}
                />
              </motion.div>
            )}

            {phase === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ResultsSummary
                  results={results}
                  questions={questions}
                  onRetry={handleRetry}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </LessonBlock>
  );
}