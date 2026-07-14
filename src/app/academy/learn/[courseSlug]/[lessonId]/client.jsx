"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import DiagramBlock from "@/components/academy/DiagramBlock";
import StoryBlock from "@/components/academy/StoryBlock";
import LessonBlock from "@/components/academy/LessonBlock";
import ConceptBlock from "@/components/academy/ConceptBlock";
import BusinessCaseBlock from "@/components/academy/BusinessCaseBlock";
import CheckpointBlock from "@/components/academy/CheckpointBlock";
import ExerciseBlock from "@/components/academy/ExerciseBlock";
import AiPromptBlock from "@/components/academy/AiPromptBlock";
import LessonNavigator from "@/components/academy/LessonNavigator";
import PremiumLessonHero from "@/components/academy/PremiumLessonHero";
import IllustrationPanel from "@/components/academy/IllustrationPanel";
import InteractiveStoryBlock from "@/components/academy/InteractiveStoryBlock";
import ScenarioBlock from "@/components/academy/ScenarioBlock";
import QuickFireBlock from "@/components/academy/QuickFireBlock";
import TimelineBlock from "@/components/academy/TimelineBlock";
import ProcessFlowBlock from "@/components/academy/ProcessFlowBlock";
import ComparisonBlock from "@/components/academy/ComparisonBlock";

import {
  BookOpen, CheckCircle2, Lock, Play, ArrowRight, ArrowLeft,
  Zap, Flame, Trophy, Target, ChevronRight, X, MessageSquare,
  Send, Loader2, Award, RotateCcw, Menu, Sparkles,
} from "lucide-react";

/* Blocks that already wrap themselves in <LessonBlock> internally.
   We must NOT wrap them again to avoid double animation + double container. */
const SELF_WRAPPING_BLOCKS = new Set([
  "story", "concept", "business_case", "checkpoint", "exercise", "ai_prompt", "visual",
  "interactive_story", "scenario", "quick_fire",  // ← ADD THESE
]);

/* ========================================================
   Utilities
======================================================== */
function getEmbedUrl(url) {
  if (!url) return "";
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return url;
}

/* Stable per-block DOM id so LessonNavigator can scroll-spy */
function blockDomId(block, index) {
  return `lesson-block-${block?.type || "unknown"}-${index}`;
}

/* ========================================================
   XP Celebration
======================================================== */
function XPCelebration({ xp, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white/70 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.6, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-center"
      >
        <div className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0A8F01] to-[#4ade80] blur-2xl opacity-40" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#075A01] to-[#0A8F01] shadow-2xl">
            <Trophy className="h-12 w-12 text-white" />
          </div>
        </div>
        <p className="text-5xl font-black tracking-tight text-[#0B1220] mb-2">+{xp} XP</p>
        <p className="text-lg font-bold text-[#075A01]">Lesson Complete</p>
        <p className="mt-1 text-sm text-[#4A5468]">You are on a streak — keep going</p>
      </motion.div>
    </motion.div>
  );
}

/* ========================================================
   Quiz System (light)
======================================================== */
function QuizSystem({ questions, lessonId, xpReward, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = questions[currentQ];
  const isLast = currentQ === questions.length - 1;
  const options = Array.isArray(question?.options)
    ? question.options
    : JSON.parse(question?.options || "[]");

  function selectAnswer(idx) { if (!submitted) setSelected(idx); }
  function confirmAnswer() {
    if (selected === null) return;
    setSubmitted(true);
    setShowExplanation(true);
  }
  function nextQuestion() {
    const newAnswers = [...answers, selected];
    if (isLast) submitQuiz(newAnswers);
    else {
      setAnswers(newAnswers);
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setSubmitted(false);
      setShowExplanation(false);
    }
  }
  async function submitQuiz(finalAnswers) {
    setLoading(true);
    try {
      const res = await fetch("/api/academy/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, answers: finalAnswers }),
      });
      setResult(await res.json());
    } catch {
      setResult({ passed: false, score: 0, error: true });
    }
    setLoading(false);
  }
  function retry() {
    setCurrentQ(0); setAnswers([]); setSelected(null);
    setSubmitted(false); setShowExplanation(false); setResult(null);
  }

  if (result) {
    return (
      <div className="text-center py-10 px-4">
        {result.passed ? (
          <>
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#075A01] to-[#0A8F01] shadow-lg"
            >
              <Trophy className="h-10 w-10 text-white" />
            </motion.div>
            <p className="text-2xl font-black text-[#0B1220] mb-1">You passed</p>
            <p className="text-sm text-[#4A5468] mb-2">
              Score: <span className="font-bold text-[#075A01]">{result.score}%</span> · {result.correct}/{result.total} correct
            </p>
            <p className="text-sm font-bold text-[#FF914D] mb-6">+{xpReward} XP earned</p>
            <button
              onClick={() => onComplete(result)}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#075A01] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#075A01]/20 hover:bg-[#0A8F01] hover:-translate-y-0.5 transition-all"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 border-4 border-rose-200">
              <RotateCcw className="h-10 w-10 text-rose-500" />
            </div>
            <p className="text-2xl font-black text-[#0B1220] mb-1">Not quite yet</p>
            <p className="text-sm text-[#4A5468] mb-2">
              Score: <span className="font-bold text-rose-500">{result.score}%</span> · Need 70% to pass
            </p>
            <p className="text-sm text-[#4A5468] mb-6">Review the lesson and try again — you have this.</p>
            <button
              onClick={retry}
              className="inline-flex items-center gap-2 rounded-2xl bg-white border border-[#E2E5EA] px-7 py-3.5 text-sm font-bold text-[#0B1220] hover:bg-[#F5F7FA] transition"
            >
              <RotateCcw className="h-4 w-4" /> Try Again
            </button>
          </>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-[#075A01] mx-auto mb-3" />
        <p className="text-sm text-[#4A5468]">Grading your quiz...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-bold text-[#8892A0] uppercase tracking-[0.15em]">
            Question {currentQ + 1} of {questions.length}
          </p>
          <p className="text-[11px] font-bold text-[#FF914D]">+{xpReward} XP on pass</p>
        </div>
        <div className="h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#075A01] to-[#4ade80]"
            initial={{ width: 0 }}
            animate={{ width: `${(currentQ / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <motion.p
        key={currentQ}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl sm:text-2xl font-black text-[#0B1220] mb-6 leading-tight tracking-tight"
      >
        {question?.question}
      </motion.p>

      <div className="space-y-3 mb-6">
        {options.map((option, idx) => {
          let style = "border-[#EDEFF2] bg-white text-[#0B1220] hover:border-[#075A01]/30 hover:bg-[#F5F7FA]";
          let badgeStyle = "border-[#E2E5EA] text-[#4A5468]";
          if (submitted) {
            if (idx === question.correct_answer) {
              style = "border-[#0A8F01] bg-[#DDF5E4] text-[#075A01]";
              badgeStyle = "bg-[#0A8F01] border-[#0A8F01] text-white";
            } else if (idx === selected) {
              style = "border-rose-300 bg-rose-50 text-rose-700";
              badgeStyle = "bg-rose-500 border-rose-500 text-white";
            } else {
              style = "border-[#EDEFF2] bg-white text-[#8892A0] opacity-60";
            }
          } else if (selected === idx) {
            style = "border-[#075A01] bg-[#DDF5E4]/40 text-[#0B1220]";
            badgeStyle = "bg-[#075A01] border-[#075A01] text-white";
          }
          return (
            <motion.button
              key={idx}
              whileHover={{ scale: submitted ? 1 : 1.01 }}
              whileTap={{ scale: submitted ? 1 : 0.99 }}
              onClick={() => selectAnswer(idx)}
              disabled={submitted}
              className={`w-full text-left rounded-2xl border-2 p-4 sm:p-5 text-sm sm:text-base font-medium transition-all ${style}`}
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-black ${badgeStyle}`}>
                  {["A", "B", "C", "D"][idx]}
                </div>
                <span className="leading-snug">{option}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {showExplanation && question?.explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`rounded-2xl p-5 mb-5 border-2 ${
              selected === question.correct_answer
                ? "bg-[#DDF5E4]/50 border-[#0A8F01]/30"
                : "bg-rose-50 border-rose-200"
            }`}
          >
            <p className="text-[11px] font-black uppercase tracking-[0.15em] mb-2 text-[#0B1220]">
              {selected === question.correct_answer ? "Correct" : "Not quite"}
            </p>
            <p className="text-sm sm:text-base text-[#4A5468] leading-relaxed">
              {question.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!submitted ? (
        <button
          onClick={confirmAnswer}
          disabled={selected === null}
          className="w-full rounded-2xl bg-[#075A01] py-4 text-base font-bold text-white shadow-lg shadow-[#075A01]/15 hover:bg-[#0A8F01] hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all"
        >
          Check Answer
        </button>
      ) : (
        <button
          onClick={nextQuestion}
          className="w-full rounded-2xl bg-[#075A01] py-4 text-base font-bold text-white shadow-lg shadow-[#075A01]/15 hover:bg-[#0A8F01] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
        >
          {isLast ? "Submit Quiz" : "Next Question"} <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

/* ========================================================
   AI Tutor (light)
======================================================== */
function AiTutor({ lessonTitle, courseTitle }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hi! I am your AI tutor for "${lessonTitle}". Ask me anything.` },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch("/api/academy/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, lessonTitle, courseTitle, history: messages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply || "Try rephrasing that." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Try again." }]);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 p-5 min-h-0">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-3xl px-5 py-3 text-sm leading-relaxed shadow-sm ${
                msg.role === "user"
                  ? "bg-[#075A01] text-white rounded-br-md"
                  : "bg-[#F5F7FA] text-[#0B1220] rounded-bl-md border border-[#EDEFF2]"
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#F5F7FA] border border-[#EDEFF2] rounded-3xl rounded-bl-md px-5 py-4">
              <Loader2 className="h-4 w-4 animate-spin text-[#8892A0]" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="border-t border-[#EDEFF2] p-4 bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask your tutor anything..."
            className="flex-1 rounded-2xl bg-[#F5F7FA] border border-[#EDEFF2] px-4 py-3 text-sm text-[#0B1220] placeholder:text-[#8892A0] focus:outline-none focus:border-[#075A01] focus:bg-white transition"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#075A01] text-white hover:bg-[#0A8F01] disabled:opacity-40 transition"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================================================
   Block Router — NO DOUBLE WRAP
======================================================== */
function BlockRouter({ block, index }) {
  const id = blockDomId(block, index);
  const isSelfWrap = SELF_WRAPPING_BLOCKS.has(block.type);

  let node = null;
  switch (block.type) {
    case "story":              node = <StoryBlock block={block} />; break;
    case "concept":            node = <ConceptBlock block={block} />; break;
    case "visual":             node = <DiagramBlock block={block} />; break;
    case "business_case":      node = <BusinessCaseBlock block={block} />; break;
    case "checkpoint":         node = <CheckpointBlock block={block} />; break;
    case "exercise":           node = <ExerciseBlock block={block} />; break;
    case "ai_prompt":          node = <AiPromptBlock block={block} />; break;
    case "interactive_story":  node = <InteractiveStoryBlock block={block} />; break;
    case "scenario":           node = <ScenarioBlock block={block} />; break;
    case "quick_fire":         node = <QuickFireBlock block={block} />; break;
    case "timeline":           node = <TimelineBlock block={block} />; break;
    case "process_flow":       node = <ProcessFlowBlock block={block} />; break;
    case "comparison":         node = <ComparisonBlock block={block} />; break;
    default:
      node = (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-5">
          <p className="text-amber-700 text-sm font-bold">Unknown block type:</p>
          <p className="mt-1 text-[#0B1220] text-sm">{block.type}</p>
        </div>
      );
  }

  /* If the block wraps itself in <LessonBlock>, just anchor with the DOM id.
     Otherwise, we provide the LessonBlock wrapper here. */
  if (isSelfWrap) {
    return <div id={id} data-block-type={block.type} className="scroll-mt-24">{node}</div>;
  }
  return (
    <div id={id} data-block-type={block.type} className="scroll-mt-24">
      <LessonBlock>{node}</LessonBlock>
    </div>
  );
}

/* ========================================================
   Lesson Content
======================================================== */
function LessonContent({ lesson, content, loading, error }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-5">
        <div className="relative">
          <div className="h-20 w-20 rounded-full border-4 border-[#DDF5E4] border-t-[#075A01] animate-spin" />
          <Sparkles className="absolute inset-0 m-auto h-7 w-7 text-[#0A8F01]" />
        </div>
        <div className="text-center">
          <p className="font-black text-[#0B1220] text-base">Preparing your lesson</p>
          <p className="text-sm text-[#4A5468] mt-1">AI is personalizing the content for you</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="text-center py-16">
        <p className="text-rose-600 font-bold mb-2">Failed to load lesson content</p>
        <p className="text-sm text-[#4A5468]">Please refresh the page to try again.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-10 xl:grid-cols-[240px_1fr]">
      <div className="hidden xl:block">
        <div className="sticky top-24">
          <LessonNavigator blocks={content.blocks || []} />
        </div>
      </div>

      <div className="space-y-16 sm:space-y-24 min-w-0">
        {/* Media */}
        {lesson.hero_image && (
          <div className="relative rounded-[28px] overflow-hidden border border-[#EDEFF2] shadow-sm">
            <img src={lesson.hero_image} alt={lesson.title} className="w-full h-64 sm:h-80 object-cover" />
          </div>
        )}
        {lesson.video_embed && (
          <div className="rounded-[28px] overflow-hidden border border-[#EDEFF2] bg-black aspect-video shadow-sm">
            <iframe
              src={getEmbedUrl(lesson.video_embed)}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Big Idea */}
        <LessonBlock>
          <div id="lesson-big-idea" className="scroll-mt-24 relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#DDF5E4] via-[#EAFBF0] to-white p-8 sm:p-14 border border-[#0A8F01]/10">
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[#0A8F01]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-[#FFE8D6] blur-3xl opacity-70" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-1.5 border border-[#0A8F01]/15 mb-6">
                <Sparkles className="h-3.5 w-3.5 text-[#075A01]" />
                <p className="text-[11px] font-black text-[#075A01] uppercase tracking-[0.2em]">The Big Idea</p>
              </div>
              <p className="text-2xl sm:text-4xl font-black text-[#0B1220] leading-[1.15] tracking-tight max-w-3xl">
                {content.hook}
              </p>
            </div>
          </div>
        </LessonBlock>

        {/* Why It Matters */}
        <LessonBlock>
          <div id="lesson-why-matters" className="scroll-mt-24 rounded-[28px] bg-white border border-[#EDEFF2] p-8 sm:p-12 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFE8D6]">
                <Flame className="h-5 w-5 text-[#FF914D]" />
              </div>
              <p className="text-[11px] font-black text-[#FF914D] uppercase tracking-[0.2em]">
                Why This Matters To You
              </p>
            </div>
            <p className="text-lg sm:text-xl text-[#0B1220] leading-relaxed max-w-3xl">
              {content.whyItMatters}
            </p>
          </div>
        </LessonBlock>

        {/* Blocks (each block manages its own wrapping) */}
        {content.blocks?.map((block, i) => (
          <BlockRouter key={i} block={block} index={i} />
        ))}

        {/* Key Takeaways */}
        {content.keyTakeaways?.length > 0 && (
          <LessonBlock>
            <div id="lesson-takeaways" className="scroll-mt-24 rounded-[28px] bg-[#FAFAF7] border border-[#EDEFF2] p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#DDF5E4]">
                  <Trophy className="h-5 w-5 text-[#075A01]" />
                </div>
                <div>
                  <p className="text-[11px] font-black text-[#075A01] uppercase tracking-[0.2em]">Remember These</p>
                  <p className="text-2xl font-black text-[#0B1220] mt-1 tracking-tight">Key Takeaways</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.keyTakeaways.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-4 rounded-2xl bg-white border border-[#EDEFF2] p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#075A01] text-white font-black text-xs">
                      {i + 1}
                    </div>
                    <p className="text-sm sm:text-base text-[#0B1220] leading-relaxed">{point}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </LessonBlock>
        )}

        {/* Action Step */}
        {content.actionStep && (
          <LessonBlock>
            <div id="lesson-action" className="scroll-mt-24 relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#075A01] to-[#0A8F01] p-8 sm:p-14 shadow-xl shadow-[#075A01]/20">
              <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-[#FF914D]/20 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur border border-white/20 px-4 py-1.5 mb-6">
                  <Target className="h-3.5 w-3.5 text-white" />
                  <p className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Do This Right Now</p>
                </div>
                <p className="text-2xl sm:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
                  {content.actionStep.title}
                </p>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-6 max-w-2xl">
                  {content.actionStep.instruction}
                </p>
                <div className="flex items-start gap-3 rounded-2xl bg-white/15 backdrop-blur border border-white/25 p-4 max-w-2xl">
                  <Zap className="h-5 w-5 text-white shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
                    {content.actionStep.whyNow}
                  </p>
                </div>
              </div>
            </div>
          </LessonBlock>
        )}

        {/* Pro Tip */}
        {content.proTip && (
          <LessonBlock>
            <div id="lesson-protip" className="scroll-mt-24 rounded-[28px] bg-gradient-to-br from-[#FFE8D6] via-[#FFF3E6] to-white border border-[#FF914D]/20 p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <Zap className="h-5 w-5 text-[#FF914D]" />
                </div>
                <p className="text-[11px] font-black text-[#FF914D] uppercase tracking-[0.2em]">Insider Pro Tip</p>
              </div>
              <p className="text-xl sm:text-2xl font-black text-[#0B1220] mb-3 leading-tight tracking-tight max-w-3xl">
                {content.proTip.tip}
              </p>
              <p className="text-base text-[#4A5468] leading-relaxed max-w-3xl">
                {content.proTip.reason}
              </p>
            </div>
          </LessonBlock>
        )}

        {/* Encouragement */}
        {content.encouragement && (
          <LessonBlock>
            <div className="text-center py-10 px-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#DDF5E4] border border-[#0A8F01]/20 px-5 py-2 mb-5">
                <Award className="h-4 w-4 text-[#075A01]" />
                <p className="text-[11px] font-black text-[#075A01] uppercase tracking-[0.2em]">You Made It</p>
              </div>
              <p className="text-xl sm:text-2xl text-[#0B1220] font-bold italic leading-relaxed max-w-2xl mx-auto tracking-tight">
                "{content.encouragement}"
              </p>
            </div>
          </LessonBlock>
        )}
      </div>
    </div>
  );
}

/* ========================================================
   Main Lesson Player
======================================================== */
export default function LessonPlayer({
  lesson, course, allModules, completedLessons, quizQuestions,
  nextLesson, profile, isPro, hasAccess, userId,
}) {
  const router = useRouter();
  const [content, setContent] = useState(null);
  const [contentLoading, setContentLoading] = useState(true);
  const [contentError, setContentError] = useState(false);
  const [activeTab, setActiveTab] = useState("lesson");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [quizPassed, setQuizPassed] = useState(completedLessons.includes(lesson.id));
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    async function load() {
      setContentLoading(true);
      setContentError(false);
      try {
        const res = await fetch("/api/academy/lesson-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lessonId: lesson.id, studentAge: null }),
        });
        const data = await res.json();
        if (data.success) setContent(data.content);
        else setContentError(true);
      } catch { setContentError(true); }
      setContentLoading(false);
    }
    load();
  }, [lesson.id]);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleQuizComplete(result) {
    if (result.passed) { setQuizPassed(true); setShowXP(true); }
  }
  function handleXPDone() {
    setShowXP(false);
    if (nextLesson) router.push(`/academy/learn/${course.slug}/${nextLesson.id}`);
  }

  const allLessons = allModules.flatMap((m) =>
    (m.academy_lessons || []).sort((a, b) => a.order_index - b.order_index)
  );
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;

  return (
    <div data-theme="light" className="min-h-screen bg-white flex flex-col">
      <AnimatePresence>
        {showXP && <XPCelebration xp={lesson.xp_reward} onDone={handleXPDone} />}
      </AnimatePresence>

      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-transparent z-[60]">
        <div
          className="h-full bg-gradient-to-r from-[#075A01] via-[#0A8F01] to-[#4ade80] transition-[width] duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Nav */}
      <nav className="border-b border-[#EDEFF2] bg-white/85 backdrop-blur-xl h-16 flex items-center px-4 sm:px-6 gap-3 sticky top-0 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F5F7FA] text-[#4A5468] hover:text-[#0B1220] lg:hidden transition"
        >
          <Menu className="h-4 w-4" />
        </button>

        <Link href="/academy" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#075A01] to-[#0A8F01] shadow-sm">
            <img src="/logo.png" alt="" className="h-4 brightness-0 invert" />
          </div>
          <span className="hidden sm:block text-sm font-black text-[#0B1220] tracking-tight">
            Fancy Academy
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1.5 text-xs text-[#8892A0] min-w-0 ml-2">
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href={`/academy/courses/${course.slug}`}
            className="hover:text-[#0B1220] transition truncate max-w-[180px] font-semibold"
          >
            {course.title}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#0B1220] truncate max-w-[220px] font-semibold">
            {lesson.title}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-[#FFF3E6] border border-[#FF914D]/20 px-3 py-1.5">
            <Zap className="h-3.5 w-3.5 text-[#FF914D]" />
            <span className="text-xs font-black text-[#FF914D]">{profile?.total_xp || 0}</span>
          </div>
          {profile?.streak_days > 0 && (
            <div className="flex items-center gap-1.5 rounded-full bg-[#FFE4E1] border border-rose-200 px-3 py-1.5">
              <Flame className="h-3.5 w-3.5 text-rose-500" />
              <span className="text-xs font-black text-rose-600">{profile.streak_days}</span>
            </div>
          )}
        </div>
      </nav>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky lg:top-16 inset-y-0 left-0 z-40 w-80 bg-white border-r border-[#EDEFF2] flex flex-col transition-transform duration-300 lg:h-[calc(100vh-4rem)] ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } top-16`}
        >
          <div className="p-5 border-b border-[#EDEFF2] shrink-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-black text-[#8892A0] uppercase tracking-[0.15em]">
                Course Content
              </p>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-[#8892A0] hover:text-[#0B1220]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Link
              href={`/academy/courses/${course.slug}`}
              className="text-sm text-[#075A01] hover:text-[#0A8F01] font-bold transition line-clamp-2 leading-tight"
            >
              {course.title}
            </Link>
            <div className="mt-4">
              <div className="flex justify-between text-[11px] text-[#8892A0] font-semibold mb-1.5">
                <span>{completedLessons.length} completed</span>
                <span>{allLessons.length} total</span>
              </div>
              <div className="h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#075A01] to-[#4ade80] transition-all"
                  style={{ width: `${allLessons.length > 0 ? (completedLessons.length / allLessons.length) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            {allModules.map((module, mi) => {
              const lessons = (module.academy_lessons || []).sort((a, b) => a.order_index - b.order_index);
              return (
                <div key={module.id} className="mb-2">
                  <div className="px-5 pt-4 pb-2">
                    <p className="text-[10px] font-black text-[#8892A0] uppercase tracking-[0.15em]">
                      Module {mi + 1}
                    </p>
                    <p className="text-xs font-bold text-[#0B1220] mt-0.5 leading-tight">
                      {module.title}
                    </p>
                  </div>
                  {lessons.map((l) => {
                    const isActive = l.id === lesson.id;
                    const isDone = completedLessons.includes(l.id);
                    const canAccess = l.is_free || module.is_free || isPro;
                    return (
                      <div key={l.id}>
                        {canAccess ? (
                          <Link
                            href={`/academy/learn/${course.slug}/${l.id}`}
                            onClick={() => setSidebarOpen(false)}
                            className={`group flex items-center gap-3 px-5 py-3 text-sm transition ${
                              isActive
                                ? "bg-[#DDF5E4]/40 border-r-2 border-[#075A01] text-[#0B1220]"
                                : "text-[#4A5468] hover:text-[#0B1220] hover:bg-[#F5F7FA]"
                            }`}
                          >
                            <div className="shrink-0">
                              {isDone ? (
                                <CheckCircle2 className="h-4 w-4 text-[#0A8F01]" />
                              ) : isActive ? (
                                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#075A01]">
                                  <Play className="h-2.5 w-2.5 text-white fill-white" />
                                </div>
                              ) : (
                                <div className="h-4 w-4 rounded-full border-2 border-[#E2E5EA]" />
                              )}
                            </div>
                            <span className={`flex-1 line-clamp-2 leading-snug ${isActive ? "font-bold" : "font-medium"}`}>
                              {l.title}
                            </span>
                            <span className="text-[10px] text-[#FF914D] font-black shrink-0">
                              +{l.xp_reward}
                            </span>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-3 px-5 py-3 text-sm text-[#8892A0]">
                            <Lock className="h-4 w-4 shrink-0" />
                            <span className="flex-1 line-clamp-1">{l.title}</span>
                            <span className="text-[10px] font-bold shrink-0">Pro</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-[#0B1220]/40 backdrop-blur-sm z-30 lg:hidden top-16"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
            <div className="mb-6">
              <p className="text-[11px] text-[#8892A0] font-black uppercase tracking-[0.2em]">
                {lesson.academy_modules?.title}
              </p>
            </div>

            <PremiumLessonHero lesson={lesson} content={content} />

            {/* Tabs */}
            <div className="mt-14 sm:mt-20 mb-10">
              <div className="inline-flex items-center gap-1 rounded-2xl bg-[#F5F7FA] border border-[#EDEFF2] p-1.5">
                {[
                  { id: "lesson", label: "Lesson", Icon: BookOpen },
                  { id: "quiz", label: `Quiz`, count: quizQuestions.length, Icon: Target },
                  { id: "tutor", label: "Tutor", Icon: MessageSquare },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-sm font-bold transition ${
                      activeTab === tab.id
                        ? "bg-white text-[#0B1220] shadow-sm"
                        : "text-[#4A5468] hover:text-[#0B1220]"
                    }`}
                  >
                    <tab.Icon className="h-4 w-4" />
                    {tab.label}
                    {tab.count !== undefined && (
                      <span className="text-[10px] font-bold text-[#8892A0]">
                        · {tab.count}Q
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div id="lesson-content">
              {activeTab === "lesson" && (
                <div>
                  <LessonContent lesson={lesson} content={content} loading={contentLoading} error={contentError} />
                  {!contentLoading && content && (
                    <div className="mt-16 pt-8 border-t border-[#EDEFF2] flex items-center justify-between gap-4">
                      {prevLesson ? (
                        <Link
                          href={`/academy/learn/${course.slug}/${prevLesson.id}`}
                          className="flex items-center gap-2 rounded-2xl border border-[#EDEFF2] bg-white px-5 py-3 text-sm font-bold text-[#0B1220] hover:bg-[#F5F7FA] transition"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          <span className="hidden sm:block">Previous</span>
                        </Link>
                      ) : <div />}
                      {!quizPassed ? (
                        <button
                          onClick={() => setActiveTab("quiz")}
                          className="flex items-center gap-2 rounded-2xl bg-[#075A01] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#075A01]/15 hover:bg-[#0A8F01] hover:-translate-y-0.5 transition-all"
                        >
                          Take the Quiz <Target className="h-4 w-4" />
                        </button>
                      ) : nextLesson ? (
                        <Link
                          href={`/academy/learn/${course.slug}/${nextLesson.id}`}
                          className="flex items-center gap-2 rounded-2xl bg-[#075A01] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#075A01]/15 hover:bg-[#0A8F01] hover:-translate-y-0.5 transition-all"
                        >
                          Next Lesson <ArrowRight className="h-4 w-4" />
                        </Link>
                      ) : (
                        <Link
                          href={`/academy/courses/${course.slug}`}
                          className="flex items-center gap-2 rounded-2xl bg-[#075A01] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#075A01]/15 hover:bg-[#0A8F01] transition-all"
                        >
                          <Trophy className="h-4 w-4" /> Course Complete
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "quiz" && (
                <div className="rounded-[28px] border border-[#EDEFF2] bg-white p-6 sm:p-12 shadow-sm">
                  <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#EDEFF2]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DDF5E4]">
                      <Target className="h-6 w-6 text-[#075A01]" />
                    </div>
                    <div>
                      <p className="font-black text-[#0B1220] text-lg tracking-tight">Lesson Quiz</p>
                      <p className="text-sm text-[#4A5468]">
                        {quizQuestions.length} questions · Pass 70% to complete
                      </p>
                    </div>
                  </div>
                  {quizQuestions.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-[#4A5468] text-sm mb-4">No quiz for this lesson yet.</p>
                      {nextLesson && (
                        <Link
                          href={`/academy/learn/${course.slug}/${nextLesson.id}`}
                          className="inline-flex items-center gap-2 rounded-2xl bg-[#075A01] px-5 py-3 text-sm font-bold text-white hover:bg-[#0A8F01] transition"
                        >
                          Next Lesson <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  ) : quizPassed ? (
                    <div className="text-center py-8">
                      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#075A01] to-[#0A8F01]">
                        <CheckCircle2 className="h-8 w-8 text-white" />
                      </div>
                      <p className="font-black text-[#0B1220] text-xl mb-1">Quiz Passed</p>
                      <p className="text-sm text-[#4A5468] mb-6">You already completed this lesson.</p>
                      {nextLesson && (
                        <Link
                          href={`/academy/learn/${course.slug}/${nextLesson.id}`}
                          className="inline-flex items-center gap-2 rounded-2xl bg-[#075A01] px-5 py-3 text-sm font-bold text-white hover:bg-[#0A8F01] transition"
                        >
                          Next Lesson <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  ) : (
                    <QuizSystem
                      questions={quizQuestions}
                      lessonId={lesson.id}
                      xpReward={lesson.xp_reward}
                      onComplete={handleQuizComplete}
                    />
                  )}
                </div>
              )}

              {activeTab === "tutor" && (
                <div className="rounded-[28px] border border-[#EDEFF2] bg-white overflow-hidden shadow-sm" style={{ height: "600px" }}>
                  <div className="flex items-center gap-3 p-5 border-b border-[#EDEFF2]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DDF5E4]">
                      <MessageSquare className="h-5 w-5 text-[#075A01]" />
                    </div>
                    <div>
                      <p className="font-black text-[#0B1220] text-base">AI Tutor</p>
                      <p className="text-xs text-[#4A5468]">Ask anything about this lesson</p>
                    </div>
                    {!isPro && (
                      <Link
                        href="/pricing"
                        className="ml-auto text-[10px] font-black text-[#FF914D] bg-[#FFF3E6] border border-[#FF914D]/20 px-3 py-1.5 rounded-full hover:bg-[#FFE8D6] transition"
                      >
                        Pro feature
                      </Link>
                    )}
                  </div>
                  {isPro ? (
                    <AiTutor lessonTitle={lesson.title} courseTitle={course.title} />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-4 p-10 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF3E6]">
                        <MessageSquare className="h-8 w-8 text-[#FF914D]" />
                      </div>
                      <div>
                        <p className="font-black text-[#0B1220] text-lg mb-1">AI Tutor is a Pro feature</p>
                        <p className="text-sm text-[#4A5468] mb-5 max-w-sm">
                          Upgrade to Pro to ask your tutor anything about any lesson, anytime.
                        </p>
                        <Link
                          href="/pricing"
                          className="inline-flex items-center gap-2 rounded-2xl bg-[#FF914D] px-6 py-3 text-sm font-bold text-white hover:bg-[#f97316] transition"
                        >
                          Upgrade to Pro <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}