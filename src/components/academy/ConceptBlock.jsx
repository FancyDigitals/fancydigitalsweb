"use client";

import { BrainCircuit } from "lucide-react";

export default function ConceptBlock({ block }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#075a01]/30 bg-gradient-to-br from-[#075a01]/15 via-[#10161d] to-[#0f1117] p-8">

      <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#0a8f01]/10 blur-3xl" />

      <div className="relative">

        <div className="inline-flex items-center gap-2 rounded-full bg-[#075a01]/15 px-4 py-2">

          <BrainCircuit className="h-4 w-4 text-[#4ade80]" />

          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#4ade80]">
            Core Concept
          </span>

        </div>

        <h2 className="mt-6 text-3xl font-black text-white">
          {block.title}
        </h2>

        <div className="mt-8 space-y-6">

          {block.content
            .split("\n\n")
            .filter(Boolean)
            .map((paragraph, index) => (
              <p
                key={index}
                className="text-lg leading-9 text-gray-300"
              >
                {paragraph}
              </p>
            ))}

        </div>

      </div>

    </section>
  );
}