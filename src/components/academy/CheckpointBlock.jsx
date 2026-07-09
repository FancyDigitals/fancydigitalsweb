"use client";

import { useState } from "react";
import { CircleHelp, CheckCircle2 } from "lucide-react";

export default function CheckpointBlock({ block }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <section className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-[#101317] overflow-hidden">

      <div className="p-8 border-b border-white/10">

        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-4 py-2">

          <CircleHelp className="h-4 w-4 text-amber-400" />

          <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-400">
            Checkpoint
          </span>

        </div>

        <h2 className="mt-6 text-3xl font-black text-white">
          {block.question}
        </h2>

      </div>

      <div className="p-8">

        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            className="rounded-xl bg-[#075a01] px-6 py-3 font-bold text-white transition hover:bg-[#0a8f01]"
          >
            Reveal Answer
          </button>
        ) : (
          <div className="rounded-2xl border border-[#0a8f01]/30 bg-[#075a01]/10 p-6">

            <div className="mb-4 flex items-center gap-2">

              <CheckCircle2 className="h-5 w-5 text-[#4ade80]" />

              <span className="font-bold text-[#4ade80]">
                Correct Explanation
              </span>

            </div>

            <p className="leading-8 text-gray-300">
              {block.answer}
            </p>

          </div>
        )}

      </div>

    </section>
  );
}