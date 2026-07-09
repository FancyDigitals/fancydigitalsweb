"use client";

import { BookOpen } from "lucide-react";

export default function StoryBlock({ block }) {
  return (
    <section className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#171b22] via-[#11151c] to-[#0d1016] p-8 transition-all duration-500 hover:border-[#0a8f01]/40">

      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#0a8f01]/10 blur-3xl transition-all duration-700 group-hover:scale-125" />

      <div className="relative">

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0a8f01]/20 bg-[#075a01]/10 px-4 py-2">

          <BookOpen className="h-4 w-4 text-[#4ade80]" />

          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#4ade80]">
            Story
          </span>

        </div>

        <h2 className="max-w-3xl text-3xl font-black leading-tight text-white">
          {block.title}
        </h2>

        <div className="mt-8 space-y-6">

          {block.content
            .split("\n\n")
            .filter(Boolean)
            .map((paragraph, index) => (
              <p
                key={index}
                className="max-w-3xl text-lg leading-9 text-gray-300"
              >
                {paragraph}
              </p>
            ))}

        </div>

      </div>

    </section>
  );
}