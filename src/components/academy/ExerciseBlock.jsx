"use client";

import { useState } from "react";
import { PencilLine } from "lucide-react";

export default function ExerciseBlock({ block }) {
  const [value, setValue] = useState("");

  return (
    <section className="rounded-3xl border border-[#075a01]/25 bg-[#11151c] p-8">

      <div className="flex items-center gap-3">

        <PencilLine className="h-5 w-5 text-[#4ade80]" />

        <span className="text-xs font-black uppercase tracking-[0.25em] text-[#4ade80]">
          Practice
        </span>

      </div>

      <h2 className="mt-5 text-3xl font-black text-white">
        {block.title}
      </h2>

      <p className="mt-5 text-gray-300 leading-8">
        {block.instruction}
      </p>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write your answer here..."
        className="mt-8 h-44 w-full rounded-2xl border border-white/10 bg-[#0f1117] p-5 text-white outline-none focus:border-[#0a8f01]"
      />

      <div className="mt-6 rounded-2xl border border-dashed border-[#0a8f01]/30 p-5">

        <p className="text-xs uppercase tracking-widest text-[#4ade80] mb-2">
          Expected Outcome
        </p>

        <p className="text-gray-300">
          {block.expectedOutcome}
        </p>

      </div>

    </section>
  );
}