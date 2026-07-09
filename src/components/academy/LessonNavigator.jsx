"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Brain,
  Eye,
  Building2,
  CircleHelp,
 PencilLine,
  Sparkles,
} from "lucide-react";

const ICONS = {
  story: BookOpen,
  concept: Brain,
  visual: Eye,
  business_case: Building2,
  checkpoint: CircleHelp,
  exercise: PencilLine,
  ai_prompt: Sparkles,
};

export default function LessonNavigator({ blocks = [] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(entry.target.dataset.index);
          setActive(index);
        });
      },
      {
        threshold: 0.4,
      }
    );

    document
      .querySelectorAll("[data-lesson-block]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="sticky top-24 hidden h-fit xl:block">

      <div className="w-72 rounded-3xl border border-white/10 bg-[#11151c]/90 backdrop-blur-xl p-5">

        <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-[#4ade80]">
          Lesson Flow
        </p>

        <div className="space-y-2">

          {blocks.map((block, index) => {
            const Icon = ICONS[block.type] || BookOpen;

            return (
              <button
                key={index}
                onClick={() => {
                  document
                    .querySelector(`[data-index="${index}"]`)
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition

                ${
                  active === index
                    ? "bg-[#075a01] text-white"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />

                <span className="line-clamp-1 text-sm font-semibold">
                  {block.title || block.type}
                </span>

              </button>
            );
          })}

        </div>

      </div>

    </aside>
  );
}