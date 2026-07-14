"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen, Sparkles, Brain, GitBranch, Building2, CircleHelp,
  PencilLine, Wand2, Compass, Target, Zap, CalendarDays,
  Workflow, GitCompare, Flame, Trophy, Award,
} from "lucide-react";

/* Inline the id helper so we don't cross-import from the route file */
function blockDomId(block, index) {
  return `lesson-block-${block?.type || "unknown"}-${index}`;
}
/* ------------------------------------------------------------------
   ⚠️ Import note:
   The `blockDomId` import above assumes client.jsx lives at
   `app/academy/learn/[slug]/[lessonId]/client.jsx`.
   If your path differs, adjust the import — or replace with the
   inline helper below and remove the import.
------------------------------------------------------------------ */

const BLOCK_META = {
  story:             { label: "Story",         Icon: Sparkles, tone: "amber"   },
  concept:           { label: "Concept",       Icon: Brain,    tone: "green"   },
  visual:            { label: "Visual",        Icon: GitBranch,tone: "sky"     },
  business_case:     { label: "Case Study",    Icon: Building2,tone: "slate"   },
  checkpoint:        { label: "Checkpoint",    Icon: CircleHelp,tone:"amber"   },
  exercise:          { label: "Practice",      Icon: PencilLine,tone:"green"   },
  ai_prompt:         { label: "AI Prompt",     Icon: Wand2,    tone: "violet"  },
  interactive_story: { label: "Story Path",    Icon: Compass,  tone: "violet"  },
  scenario:          { label: "Scenario",      Icon: Target,   tone: "sky"     },
  quick_fire:        { label: "Quick Fire",    Icon: Zap,      tone: "amber"   },
  timeline:          { label: "Timeline",      Icon: CalendarDays, tone:"slate"},
  process_flow:      { label: "Process",       Icon: Workflow, tone: "violet"  },
  comparison:        { label: "Compare",       Icon: GitCompare, tone: "sky"   },
};

const TONE_STYLES = {
  green:  { chip: "bg-[#DDF5E4] text-[#075A01]", dot: "bg-[#0A8F01]" },
  amber:  { chip: "bg-[#FFF3E6] text-[#FF914D]", dot: "bg-[#FF914D]" },
  violet: { chip: "bg-[#EFEAFF] text-[#7c3aed]", dot: "bg-[#7c3aed]" },
  sky:    { chip: "bg-[#E3F0FF] text-[#0369a1]", dot: "bg-[#0369a1]" },
  slate:  { chip: "bg-[#F1F5F9] text-[#334155]", dot: "bg-[#475569]" },
  rose:   { chip: "bg-[#FFE4E1] text-rose-600",  dot: "bg-rose-500"  },
};

/* Static entries that live outside `content.blocks` */
const STATIC_ENTRIES = [
  { id: "lesson-big-idea",   label: "The Big Idea",    Icon: Sparkles, tone: "green" },
  { id: "lesson-why-matters",label: "Why It Matters",  Icon: Flame,    tone: "amber" },
];

const TAIL_ENTRIES = [
  { id: "lesson-takeaways", label: "Key Takeaways", Icon: Trophy, tone: "green" },
  { id: "lesson-action",    label: "Action Step",   Icon: Target, tone: "green" },
  { id: "lesson-protip",    label: "Pro Tip",       Icon: Zap,    tone: "amber" },
];

export default function LessonNavigator({ blocks = [] }) {
  const items = useMemo(() => {
    const dynamic = blocks.map((b, i) => {
      const meta = BLOCK_META[b.type] || { label: b.type, Icon: BookOpen, tone: "slate" };
      return {
        id: blockDomId(b, i),
        label: b.title || b.question || meta.label,
        Icon: meta.Icon,
        tone: meta.tone,
        typeLabel: meta.label,
      };
    });
    return [...STATIC_ENTRIES, ...dynamic, ...TAIL_ENTRIES];
  }, [blocks]);

  const [activeId, setActiveId] = useState(items[0]?.id);
  const [completed, setCompleted] = useState(() => new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            setCompleted((prev) => {
              const next = new Set(prev);
              /* Mark all items above the newly active one as completed */
              const idx = items.findIndex((it) => it.id === entry.target.id);
              for (let i = 0; i < idx; i++) next.add(items[i].id);
              return next;
            });
          }
        });
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0,
      }
    );

    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  function jump(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const progressPct = items.length
    ? Math.round((completed.size / items.length) * 100)
    : 0;

  return (
    <nav
      aria-label="Lesson sections"
      className="rounded-[24px] bg-white border border-[#EDEFF2] p-5 shadow-sm"
    >
      <div className="mb-4">
        <p className="text-[10px] font-black text-[#8892A0] uppercase tracking-[0.2em]">
          On This Lesson
        </p>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-[#F1F5F9] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#075A01] to-[#4ade80]"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <span className="text-[10px] font-black text-[#8892A0] tabular-nums">
            {progressPct}%
          </span>
        </div>
      </div>

      <ul className="space-y-0.5 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1 -mr-1">
        {items.map((it) => {
          const isActive = it.id === activeId;
          const isDone = completed.has(it.id) && !isActive;
          const tone = TONE_STYLES[it.tone] || TONE_STYLES.slate;

          return (
            <li key={it.id}>
              <button
                onClick={() => jump(it.id)}
                className={`group relative w-full text-left rounded-xl px-3 py-2.5 flex items-start gap-3 transition-all ${
                  isActive
                    ? "bg-[#FAFAF7]"
                    : "hover:bg-[#F5F7FA]"
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <motion.span
                    layoutId="lesson-nav-active"
                    className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-[#075A01]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <div className={`shrink-0 flex h-7 w-7 items-center justify-center rounded-lg transition ${
                  isActive || isDone ? tone.chip : "bg-[#F5F7FA] text-[#8892A0]"
                }`}>
                  <it.Icon className="h-3.5 w-3.5" />
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <p className={`text-[13px] leading-snug line-clamp-2 ${
                    isActive
                      ? "font-bold text-[#0B1220]"
                      : isDone
                        ? "font-medium text-[#4A5468]"
                        : "font-medium text-[#4A5468] group-hover:text-[#0B1220]"
                  }`}>
                    {it.label}
                  </p>
                  {it.typeLabel && !isActive && (
                    <p className="text-[10px] text-[#8892A0] font-semibold mt-0.5 uppercase tracking-wider">
                      {it.typeLabel}
                    </p>
                  )}
                </div>

                {isDone && (
                  <span className="shrink-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#0A8F01] text-white text-[9px] font-black mt-1">
                    ✓
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 pt-4 border-t border-[#EDEFF2] flex items-center gap-2 text-[10px] text-[#8892A0] font-semibold">
        <Award className="h-3 w-3 text-[#FF914D]" />
        Scroll to unlock XP
      </div>
    </nav>
  );
}