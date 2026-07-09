"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DiagramBlock from "@/components/academy/DiagramBlock";
import StoryBlock from "@/components/academy/StoryBlock";
import ConceptBlock from "@/components/academy/ConceptBlock";
import BusinessCaseBlock from "@/components/academy/BusinessCaseBlock";
import CheckpointBlock from "@/components/academy/CheckpointBlock";
import ExerciseBlock from "@/components/academy/ExerciseBlock";
import AiPromptBlock from "@/components/academy/AiPromptBlock";
import LessonNavigator from "@/components/academy/LessonNavigator";
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Play,
  ArrowRight,
  ArrowLeft,
  Zap,
  Flame,
  Trophy,
  Target,
  ChevronDown,
  ChevronUp,
  X,
  MessageSquare,
  Send,
  Loader2,
  Star,
  Award,
  RotateCcw,
  Menu,
  Home,
} from "lucide-react";

function getEmbedUrl(url) {
  if (!url) return "";
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}

function XPCelebration({ xp, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="text-center animate-bounce">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#ff914d]/20 border-4 border-[#ff914d] mx-auto mb-4">
          <Zap className="h-12 w-12 text-[#ff914d]" />
        </div>
        <p className="text-4xl font-black text-white mb-2">+{xp} XP!</p>
        <p className="text-lg text-[#ff914d] font-bold">Lesson Complete!</p>
        <p className="text-sm text-gray-400 mt-1">Keep going — you are on fire!</p>
      </div>
    </div>
  );
}

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
  const options = Array.isArray(question?.options) ? question.options : JSON.parse(question?.options || "[]");

  function selectAnswer(idx) {
    if (submitted) return;
    setSelected(idx);
  }

  function confirmAnswer() {
    if (selected === null) return;
    setSubmitted(true);
    setShowExplanation(true);
  }

  function nextQuestion() {
    const newAnswers = [...answers, selected];
    if (isLast) {
      submitQuiz(newAnswers);
    } else {
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
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ passed: false, score: 0, error: true });
    }
    setLoading(false);
  }

  function retry() {
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setSubmitted(false);
    setShowExplanation(false);
    setResult(null);
  }

  if (result) {
    return (
      <div className="text-center py-8">
        {result.passed ? (
          <>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#075a01]/30 border-4 border-[#0a8f01] mx-auto mb-4">
              <Trophy className="h-10 w-10 text-[#4ade80]" />
            </div>
            <p className="text-2xl font-black text-white mb-1">You passed!</p>
            <p className="text-sm text-gray-400 mb-2">
              Score: <span className="text-[#4ade80] font-bold">{result.score}%</span> · {result.correct}/{result.total} correct
            </p>
            <p className="text-[#ff914d] font-bold text-sm mb-6">+{xpReward} XP earned!</p>
            <button
              onClick={() => onComplete(result)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#075a01] px-6 py-3 text-sm font-bold text-white hover:bg-[#0a8f01] transition"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20 border-4 border-red-500 mx-auto mb-4">
              <RotateCcw className="h-10 w-10 text-red-400" />
            </div>
            <p className="text-2xl font-black text-white mb-1">Not quite!</p>
            <p className="text-sm text-gray-400 mb-2">
              Score: <span className="text-red-400 font-bold">{result.score}%</span> · Need 70% to pass
            </p>
            <p className="text-sm text-gray-400 mb-6">Review the lesson and try again. You can do this!</p>
            <button
              onClick={retry}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition"
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
      <div className="text-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#0a8f01] mx-auto mb-3" />
        <p className="text-sm text-gray-400">Grading your quiz...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
            Question {currentQ + 1} of {questions.length}
          </p>
          <p className="text-xs text-[#ff914d] font-bold">+{xpReward} XP on pass</p>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#075a01] to-[#4ade80] transition-all duration-500"
            style={{ width: `${(currentQ / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <p className="text-base font-bold text-white mb-5 leading-relaxed">{question?.question}</p>

      <div className="space-y-3 mb-6">
        {options.map((option, idx) => {
          let style = "border-white/10 bg-white/5 text-gray-300 hover:border-white/30 hover:bg-white/10";
          if (submitted) {
            if (idx === question.correct_answer) style = "border-[#0a8f01] bg-[#075a01]/20 text-[#4ade80]";
            else if (idx === selected && idx !== question.correct_answer) style = "border-red-500 bg-red-500/10 text-red-400";
            else style = "border-white/5 bg-white/3 text-gray-500";
          } else if (selected === idx) {
            style = "border-[#075a01] bg-[#075a01]/20 text-white";
          }
          return (
            <button
              key={idx}
              onClick={() => selectAnswer(idx)}
              disabled={submitted}
              className={`w-full text-left rounded-xl border p-4 text-sm font-medium transition-all ${style}`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-black ${
                  submitted && idx === question.correct_answer ? "border-[#0a8f01] bg-[#0a8f01] text-white"
                  : submitted && idx === selected && idx !== question.correct_answer ? "border-red-500 bg-red-500 text-white"
                  : selected === idx ? "border-[#075a01] bg-[#075a01] text-white"
                  : "border-current"
                }`}>
                  {["A", "B", "C", "D"][idx]}
                </div>
                {option}
              </div>
            </button>
          );
        })}
      </div>

      {showExplanation && question?.explanation && (
        <div className={`rounded-xl p-4 mb-5 border ${
          selected === question.correct_answer ? "bg-[#075a01]/20 border-[#0a8f01]/40" : "bg-red-500/10 border-red-500/30"
        }`}>
          <p className="text-xs font-bold text-gray-300 uppercase tracking-wide mb-1">
            {selected === question.correct_answer ? "Correct!" : "Not quite —"}
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">{question.explanation}</p>
        </div>
      )}

      {!submitted ? (
        <button
          onClick={confirmAnswer}
          disabled={selected === null}
          className="w-full rounded-xl bg-[#075a01] py-3.5 text-sm font-bold text-white hover:bg-[#0a8f01] disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Check Answer
        </button>
      ) : (
        <button
          onClick={nextQuestion}
          className="w-full rounded-xl bg-[#075a01] py-3.5 text-sm font-bold text-white hover:bg-[#0a8f01] transition flex items-center justify-center gap-2"
        >
          {isLast ? "Submit Quiz" : "Next Question"} <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function AiTutor({ lessonTitle, courseTitle }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hi! I am your AI tutor for this lesson on "${lessonTitle}". Ask me anything about what you just learned.` },
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
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply || "I am not sure about that. Try rephrasing." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-3 p-4 min-h-0">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === "user" ? "bg-[#075a01] text-white rounded-br-sm" : "bg-white/10 text-gray-200 rounded-bl-sm"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask your tutor anything..."
            className="flex-1 rounded-xl bg-white/10 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#075a01]"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#075a01] text-white hover:bg-[#0a8f01] disabled:opacity-40 transition"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function LessonContent({ lesson, content, loading, error }) {
  const [readSections, setReadSections] = useState(new Set());

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-[#075a01]/30 border-t-[#075a01] animate-spin" />
          <Zap className="absolute inset-0 m-auto h-6 w-6 text-[#0a8f01]" />
        </div>
        <div className="text-center">
          <p className="font-bold text-white text-sm">Preparing your lesson...</p>
          <p className="text-xs text-gray-400 mt-1">AI is personalizing the content for you</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 font-bold mb-2">Failed to load lesson content</p>
        <p className="text-sm text-gray-500">Please refresh the page to try again.</p>
      </div>
    );
  }

  const totalSections = (content.sections?.length || 0) + 2;
  const progress = Math.round(((readSections.size + 1) / totalSections) * 100);

  function markRead(idx) {
    setReadSections((prev) => new Set([...prev, idx]));
  }

  return (
  <div className="grid gap-8 xl:grid-cols-[280px_1fr]">

    <LessonNavigator
      blocks={content.blocks || []}
    />

    <div className="space-y-6">
      {lesson.hero_image && (
        <div className="relative rounded-2xl overflow-hidden border border-white/10">
          <img src={lesson.hero_image} alt={lesson.title} className="w-full h-56 sm:h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117] via-transparent to-transparent" />
        </div>
      )}

      {lesson.video_embed && (
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video">
          <iframe
            src={getEmbedUrl(lesson.video_embed)}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <div className="sticky top-14 z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 bg-[#0f1117] border-b border-white/10">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Lesson Progress</p>
          <p className="text-[10px] font-bold text-[#0a8f01]">{progress}%</p>
        </div>
        <div className="h-1 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-[#075a01] to-[#4ade80] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-[#075a01]/40 bg-gradient-to-br from-[#075a01]/20 to-[#0a8f01]/10 p-6 sm:p-8">
        <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#0a8f01]/20 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0a8f01] text-white font-black text-xs">!</div>
            <p className="text-xs font-black text-[#4ade80] uppercase tracking-widest">The Big Idea</p>
          </div>
          <p className="text-lg sm:text-xl font-black text-white leading-relaxed">{content.hook}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#ff914d]/30 bg-[#ff914d]/5 p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ff914d]/20">
            <Flame className="h-4 w-4 text-[#ff914d]" />
          </div>
          <p className="text-xs font-black text-[#ff914d] uppercase tracking-wider">Why This Matters To You</p>
        </div>
        <p className="text-sm sm:text-base text-gray-100 leading-relaxed">{content.whyItMatters}</p>
      </div>

      {content.blocks?.map((block, i) => {
  switch (block.type) {
    case "story":
  return (
    <div
      key={i}
      data-lesson-block
      data-index={i}
    >
      <StoryBlock block={block} />
    </div>
  );

    case "concept":
  return (
    <div
      key={i}
      data-lesson-block
      data-index={i}
    >
      <ConceptBlock block={block} />
    </div>
  );

    case "visual":
  return (
    <div
      key={i}
      data-lesson-block
      data-index={i}
    >
      <DiagramBlock block={block} />
    </div>
  );

    case "business_case":
  return (
    <div
      key={i}
      data-lesson-block
      data-index={i}
    >
      <BusinessCaseBlock block={block} />
    </div>
  );

    case "checkpoint":
  return (
    <div
      key={i}
      data-lesson-block
      data-index={i}
    >
      <CheckpointBlock block={block} />
    </div>
  );

    case "exercise":
  return (
    <div
      key={i}
      data-lesson-block
      data-index={i}
    >
      <ExerciseBlock block={block} />
    </div>
  );

    case "ai_prompt":
  return (
    <div
      key={i}
      data-lesson-block
      data-index={i}
    >
      <AiPromptBlock block={block} />
    </div>
  );

    default:
      return (
        <div
          key={i}
          className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-5"
        >
          <p className="text-yellow-400 text-sm font-bold">
            Renderer not built yet for:
          </p>

          <p className="mt-2 text-white">
            {block.type}
          </p>
        </div>
      );
  }
})}

      {content.keyTakeaways?.length > 0 && (
        <div className="rounded-2xl border border-[#0a8f01]/30 bg-gradient-to-br from-[#075a01]/15 to-transparent p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0a8f01]/20">
              <Trophy className="h-4 w-4 text-[#4ade80]" />
            </div>
            <p className="text-xs font-black text-[#4ade80] uppercase tracking-widest">Remember These</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.keyTakeaways.map((point, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#075a01] text-white font-black text-xs">{i + 1}</div>
                <p className="text-sm text-gray-200 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {content.actionStep && (
        <div className="relative overflow-hidden rounded-2xl border-2 border-[#0a8f01] bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-6 sm:p-8">
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20">
                <Target className="h-4 w-4 text-white" />
              </div>
              <p className="text-xs font-black text-white uppercase tracking-widest">Do This Right Now</p>
            </div>
            <p className="text-lg sm:text-xl font-black text-white mb-3">{content.actionStep.title}</p>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">{content.actionStep.instruction}</p>
            <div className="flex items-start gap-2.5 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 p-3">
              <Zap className="h-4 w-4 text-white shrink-0 mt-0.5" />
              <p className="text-sm text-white font-semibold">{content.actionStep.whyNow}</p>
            </div>
          </div>
        </div>
      )}

      {content.proTip && (
        <div className="rounded-2xl border border-[#ff914d]/40 bg-gradient-to-br from-[#ff914d]/15 to-transparent p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ff914d]/20">
              <Zap className="h-4 w-4 text-[#ff914d]" />
            </div>
            <p className="text-xs font-black text-[#ff914d] uppercase tracking-widest">Insider Pro Tip</p>
          </div>
          <p className="text-base sm:text-lg font-bold text-white mb-2 leading-relaxed">{content.proTip.tip}</p>
          <p className="text-sm text-gray-400 leading-relaxed">{content.proTip.reason}</p>
        </div>
      )}

            {content.encouragement && (
        <div className="text-center py-6 px-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0a8f01]/10 border border-[#0a8f01]/20 px-4 py-2 mb-3">
            <Award className="h-4 w-4 text-[#4ade80]" />
            <p className="text-xs font-black text-[#4ade80] uppercase tracking-wider">
              You Made It!
            </p>
          </div>

          <p className="text-base sm:text-lg text-white font-semibold italic leading-relaxed max-w-xl mx-auto">
            "{content.encouragement}"
          </p>
        </div>
      )}

    </div>

  </div>
);
}

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
      } catch {
        setContentError(true);
      }
      setContentLoading(false);
    }
    load();
  }, [lesson.id]);

  function handleQuizComplete(result) {
    if (result.passed) {
      setQuizPassed(true);
      setShowXP(true);
    }
  }

  function handleXPDone() {
    setShowXP(false);
    if (nextLesson) router.push(`/academy/learn/${course.slug}/${nextLesson.id}`);
  }

  const allLessons = allModules.flatMap((m) => (m.academy_lessons || []).sort((a, b) => a.order_index - b.order_index));
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;

  return (
    <div className="min-h-screen bg-[#0f1117] flex flex-col">
      {showXP && <XPCelebration xp={lesson.xp_reward} onDone={handleXPDone} />}

      <nav className="border-b border-white/10 bg-[#0a0d11] h-14 flex items-center px-4 gap-3 sticky top-0 z-40">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-gray-400 hover:text-white lg:hidden transition"
        >
          <Menu className="h-4 w-4" />
        </button>
        <Link href="/academy" className="flex items-center gap-2 shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
            <img src="/logo.png" alt="" className="h-4 brightness-0 invert" />
          </div>
          <span className="hidden sm:block text-xs font-bold text-white">Fancy Academy</span>
        </Link>
        <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500 min-w-0">
          <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
          <Link href={`/academy/courses/${course.slug}`} className="hover:text-white transition truncate max-w-[150px]">
            {course.title}
          </Link>
          <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
          <span className="text-gray-300 truncate max-w-[150px]">{lesson.title}</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-lg bg-[#ff914d]/20 border border-[#ff914d]/30 px-2.5 py-1">
            <Zap className="h-3.5 w-3.5 text-[#ff914d]" />
            <span className="text-xs font-bold text-[#ff914d]">{profile?.total_xp || 0} XP</span>
          </div>
          {profile?.streak_days > 0 && (
            <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1">
              <Flame className="h-3.5 w-3.5 text-[#ff914d]" />
              <span className="text-xs font-bold text-white">{profile.streak_days}</span>
            </div>
          )}
        </div>
      </nav>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        <aside className={`fixed lg:relative inset-y-0 left-0 z-30 w-72 bg-[#0a0d11] border-r border-white/10 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} top-14 lg:top-0`}>
          <div className="p-4 border-b border-white/10 shrink-0">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-white uppercase tracking-wide">Course Content</p>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <Link href={`/academy/courses/${course.slug}`} className="text-xs text-[#0a8f01] hover:text-green-400 font-semibold transition line-clamp-1">
              {course.title}
            </Link>
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                <span>{completedLessons.length} completed</span>
                <span>{allLessons.length} total</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#075a01] to-[#4ade80]" style={{ width: `${allLessons.length > 0 ? (completedLessons.length / allLessons.length) * 100 : 0}%` }} />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            {allModules.map((module, mi) => {
              const lessons = (module.academy_lessons || []).sort((a, b) => a.order_index - b.order_index);
              return (
                <div key={module.id} className="mb-1">
                  <div className="px-4 py-2">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Module {mi + 1} — {module.title}</p>
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
                            className={`flex items-center gap-2.5 px-4 py-2.5 text-xs transition ${
                              isActive ? "bg-[#075a01]/20 border-r-2 border-[#0a8f01] text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <div className="shrink-0">
                              {isDone ? <CheckCircle2 className="h-4 w-4 text-[#0a8f01]" />
                              : isActive ? <Play className="h-4 w-4 text-[#0a8f01]" />
                              : <div className="h-4 w-4 rounded-full border border-gray-600" />}
                            </div>
                            <span className="flex-1 line-clamp-2 leading-tight">{l.title}</span>
                            <span className="text-[9px] text-[#ff914d] font-bold shrink-0">+{l.xp_reward}</span>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-600">
                            <Lock className="h-4 w-4 shrink-0" />
                            <span className="flex-1 line-clamp-1">{l.title}</span>
                            <span className="text-[9px] text-gray-600 shrink-0">Pro</span>
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

        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden top-14" onClick={() => setSidebarOpen(false)} />}

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6">
            <div className="mb-6">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">{lesson.academy_modules?.title}</p>
              <h1 className="text-2xl font-black text-white sm:text-3xl mb-3">{lesson.title}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <BookOpen className="h-3.5 w-3.5" /><span>{lesson.duration_minutes} min read</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#ff914d] font-bold">
                  <Zap className="h-3.5 w-3.5" /><span>+{lesson.xp_reward} XP on completion</span>
                </div>
                {quizPassed && (
                  <div className="flex items-center gap-1.5 text-xs text-[#0a8f01] font-bold">
                    <CheckCircle2 className="h-3.5 w-3.5" /><span>Completed</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 rounded-xl bg-white/5 border border-white/10 p-1 mb-6">
              {[
                { id: "lesson", label: "Lesson", Icon: BookOpen },
                { id: "quiz", label: `Quiz (${quizQuestions.length}Q)`, Icon: Target },
                { id: "tutor", label: "Tutor", Icon: MessageSquare },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-bold transition ${
                    activeTab === tab.id ? "bg-[#075a01] text-white shadow" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <tab.Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "lesson" && (
              <div>
                <LessonContent lesson={lesson} content={content} loading={contentLoading} error={contentError} />
                {!contentLoading && content && (
                  <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                    {prevLesson ? (
                      <Link href={`/academy/learn/${course.slug}/${prevLesson.id}`} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-gray-300 hover:text-white hover:bg-white/10 transition">
                        <ArrowLeft className="h-4 w-4" /><span className="hidden sm:block">Previous</span>
                      </Link>
                    ) : <div />}
                    {!quizPassed ? (
                      <button onClick={() => setActiveTab("quiz")} className="flex items-center gap-2 rounded-xl bg-[#075a01] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a8f01] transition">
                        Take the Quiz <Target className="h-4 w-4" />
                      </button>
                    ) : nextLesson ? (
                      <Link href={`/academy/learn/${course.slug}/${nextLesson.id}`} className="flex items-center gap-2 rounded-xl bg-[#075a01] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a8f01] transition">
                        Next Lesson <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <Link href={`/academy/courses/${course.slug}`} className="flex items-center gap-2 rounded-xl bg-[#075a01] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a8f01] transition">
                        <Trophy className="h-4 w-4" /> Course Complete!
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === "quiz" && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#075a01]/30 border border-[#075a01]/30">
                    <Target className="h-5 w-5 text-[#4ade80]" />
                  </div>
                  <div>
                    <p className="font-black text-white text-sm">Lesson Quiz</p>
                    <p className="text-xs text-gray-400">{quizQuestions.length} questions · Pass 70% to complete</p>
                  </div>
                </div>
                {quizQuestions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-sm mb-4">No quiz for this lesson yet.</p>
                    {nextLesson && (
                      <Link href={`/academy/learn/${course.slug}/${nextLesson.id}`} className="inline-flex items-center gap-2 rounded-xl bg-[#075a01] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a8f01] transition">
                        Next Lesson <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                ) : quizPassed ? (
                  <div className="text-center py-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#075a01]/30 border-4 border-[#0a8f01] mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-[#4ade80]" />
                    </div>
                    <p className="font-black text-white text-lg mb-1">Quiz Passed!</p>
                    <p className="text-sm text-gray-400 mb-5">You already completed this lesson.</p>
                    {nextLesson && (
                      <Link href={`/academy/learn/${course.slug}/${nextLesson.id}`} className="inline-flex items-center gap-2 rounded-xl bg-[#075a01] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a8f01] transition">
                        Next Lesson <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                ) : (
                  <QuizSystem questions={quizQuestions} lessonId={lesson.id} xpReward={lesson.xp_reward} onComplete={handleQuizComplete} />
                )}
              </div>
            )}

            {activeTab === "tutor" && (
              <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden" style={{ height: "500px" }}>
                <div className="flex items-center gap-3 p-4 border-b border-white/10">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#075a01]/30 border border-[#075a01]/30">
                    <MessageSquare className="h-5 w-5 text-[#4ade80]" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Tutor</p>
                    <p className="text-xs text-gray-400">Ask anything about this lesson</p>
                  </div>
                  {!isPro && (
                    <Link href="/pricing" className="ml-auto text-[10px] font-bold text-[#ff914d] bg-[#ff914d]/10 border border-[#ff914d]/20 px-2 py-1 rounded-full hover:bg-[#ff914d]/20 transition">
                      Pro feature
                    </Link>
                  )}
                </div>
                {isPro ? (
                  <AiTutor lessonTitle={lesson.title} courseTitle={course.title} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff914d]/20 border border-[#ff914d]/30">
                      <MessageSquare className="h-7 w-7 text-[#ff914d]" />
                    </div>
                    <div>
                      <p className="font-black text-white mb-1">Tutor is a Pro feature</p>
                      <p className="text-sm text-gray-400 mb-4">Upgrade to Pro to ask your tutor anything about any lesson.</p>
                      <Link href="/pricing" className="inline-flex items-center gap-2 rounded-xl bg-[#ff914d] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#f97316] transition">
                        Upgrade to Pro <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}