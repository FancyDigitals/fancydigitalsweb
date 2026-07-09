"use client";

import { Building2 } from "lucide-react";

export default function BusinessCaseBlock({ block }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 to-[#11151c]">

      <div className="border-b border-white/10 p-8">

        <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/15 px-4 py-2">

          <Building2 className="h-4 w-4 text-sky-400" />

          <span className="text-xs font-black uppercase tracking-[0.25em] text-sky-400">
            Business Case
          </span>

        </div>

        <h2 className="mt-6 text-3xl font-black text-white">
          {block.title}
        </h2>

      </div>

      <div className="grid gap-6 p-8 lg:grid-cols-3">

        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-widest text-gray-500">
            Problem
          </p>

          <p className="leading-8 text-gray-300">
            {block.scenario}
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-widest text-gray-500">
            Solution
          </p>

          <p className="leading-8 text-gray-300">
            {block.solution}
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-widest text-[#4ade80]">
            Result
          </p>

          <p className="text-lg font-semibold leading-8 text-white">
            {block.result}
          </p>
        </div>

      </div>

    </section>
  );
}