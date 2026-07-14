"use client";

import { GitBranch } from "lucide-react";
import LessonBlock from "./LessonBlock";
import DiagramRenderer from "./DiagramRenderer";

export default function DiagramBlock({ block }) {
  if (!block?.diagram) return null;

  return (
    <LessonBlock>
      <div className="relative overflow-hidden rounded-[32px] bg-white border border-[#EDEFF2] shadow-sm">
        {/* Soft pastel backdrop */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#DDEEFF] blur-3xl opacity-60" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#DDF5E4] blur-3xl opacity-50" />

        <div className="relative p-8 sm:p-12 lg:p-14">
          {/* Header */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E3F0FF] border border-[#0369a1]/15 px-4 py-1.5 mb-6">
            <GitBranch className="h-3.5 w-3.5 text-[#0369a1]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0369a1]">
              Visual Map
            </span>
          </div>

          {block.title && (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1220] leading-tight tracking-tight max-w-3xl">
              {block.title}
            </h2>
          )}

          {block.description && (
            <p className="mt-4 max-w-3xl text-base sm:text-lg text-[#4A5468] leading-relaxed">
              {block.description}
            </p>
          )}

          {/* Diagram canvas */}
          <div className="mt-10 rounded-[24px] bg-gradient-to-br from-[#FAFAF7] to-white border border-[#EDEFF2] p-6 sm:p-10 overflow-hidden">
            <DiagramRenderer diagram={block.diagram} />
          </div>
        </div>
      </div>
    </LessonBlock>
  );
}