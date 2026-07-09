"use client";

import { Eye } from "lucide-react";
import DiagramRenderer from "./DiagramRenderer";

export default function DiagramBlock({ block }) {
  if (!block?.diagram) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#11151c] to-[#0f1117]">

      <div className="border-b border-white/10 p-8">

        <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-4 py-2">

          <Eye className="h-4 w-4 text-cyan-400" />

          <span className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
            Visual Explanation
          </span>

        </div>

        <h2 className="mt-6 text-3xl font-black text-white">
          {block.title}
        </h2>

        {block.description && (
          <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-300">
            {block.description}
          </p>
        )}

      </div>

      <div className="p-8">
        <DiagramRenderer diagram={block.diagram} />
      </div>

    </section>
  );
}