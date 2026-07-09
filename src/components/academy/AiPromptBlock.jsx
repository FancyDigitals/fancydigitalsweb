"use client";

import { Copy, Sparkles } from "lucide-react";

export default function AiPromptBlock({ block }) {
  async function copyPrompt() {
    await navigator.clipboard.writeText(block.prompt);
  }

  return (
    <section className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-[#11151c] p-8">

      <div className="flex items-center gap-3">

        <Sparkles className="h-5 w-5 text-violet-400" />

        <span className="text-xs font-black uppercase tracking-[0.25em] text-violet-400">
          AI Prompt
        </span>

      </div>

      <h2 className="mt-5 text-3xl font-black text-white">
        {block.title}
      </h2>

      <div className="mt-6 rounded-2xl bg-[#0f1117] border border-white/10 p-6">

        <pre className="whitespace-pre-wrap text-sm leading-7 text-gray-300">
{block.prompt}
        </pre>

      </div>

      <button
        onClick={copyPrompt}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#075a01] px-5 py-3 font-bold text-white hover:bg-[#0a8f01]"
      >
        <Copy className="h-4 w-4" />
        Copy Prompt
      </button>

      <p className="mt-6 text-gray-400 leading-7">
        {block.whyItWorks}
      </p>

    </section>
  );
}