"use client";

import { useState } from "react";
import {
  Copy, Check, Sparkles, Wand2, ExternalLink, Tag,
} from "lucide-react";
import { motion } from "framer-motion";
import LessonBlock from "./LessonBlock";

export default function AiPromptBlock({ block }) {
  const [copied, setCopied] = useState(false);

  if (!block?.prompt) return null;

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(block.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — silently fail */
    }
  }

  function openInChatGPT() {
    const url = `https://chat.openai.com/?q=${encodeURIComponent(block.prompt)}`;
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <LessonBlock>
      <div className="relative overflow-hidden rounded-[32px] bg-white border border-[#EDEFF2] shadow-sm">
        {/* Pastel violet accents (AI tone) */}
        <div className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-[#EFEAFF] blur-3xl opacity-80" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#E3F0FF] blur-3xl opacity-50" />

        {/* Corner sparkle doodle */}
        <svg
          className="pointer-events-none absolute top-8 right-8 opacity-60"
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
        >
          <path
            d="M17 3 L19 14 L30 17 L19 20 L17 31 L15 20 L4 17 L15 14 Z"
            fill="#7c3aed"
          />
        </svg>

        <div className="relative p-8 sm:p-12 lg:p-14">
          {/* Header */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EFEAFF] border border-[#7c3aed]/20 px-4 py-1.5 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-[#7c3aed]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#7c3aed]">
              AI Prompt
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-black text-[#0B1220] leading-[1.15] tracking-tight max-w-3xl">
            {block.title}
          </h2>

          {block.description && (
            <p className="mt-4 max-w-3xl text-base sm:text-lg text-[#4A5468] leading-relaxed">
              {block.description}
            </p>
          )}

          {/* Prompt window — code-editor feel */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#EDEFF2] bg-[#FAFAF7] shadow-inner">
            {/* Window chrome bar */}
            <div className="flex items-center justify-between gap-3 border-b border-[#EDEFF2] bg-white px-4 sm:px-5 py-3">
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Traffic lights */}
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#4A5468] uppercase tracking-[0.15em] min-w-0">
                  <Wand2 className="h-3.5 w-3.5 text-[#7c3aed] shrink-0" />
                  <span className="truncate">Prompt</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={openInChatGPT}
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-[#E2E5EA] bg-white px-3 py-1.5 text-[11px] font-bold text-[#0B1220] hover:bg-[#F5F7FA] transition"
                  title="Open in ChatGPT"
                >
                  <ExternalLink className="h-3 w-3" />
                  Open
                </button>
                <button
                  onClick={copyPrompt}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold transition ${
                    copied
                      ? "bg-[#075A01] text-white"
                      : "bg-[#7c3aed] text-white hover:bg-[#6d28d9]"
                  }`}
                >
                  {copied ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            {/* Prompt body */}
            <pre className="whitespace-pre-wrap p-5 sm:p-6 font-mono text-sm sm:text-[15px] leading-7 text-[#0B1220] max-h-[420px] overflow-y-auto">
{block.prompt}
            </pre>
          </div>

          {/* Variables */}
          {Array.isArray(block.variables) && block.variables.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-3.5 w-3.5 text-[#7c3aed]" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8892A0]">
                  Variables to Customize
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {block.variables.map((v, i) => {
                  const label = typeof v === "string" ? v : v.name;
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#7c3aed]/20 bg-[#EFEAFF] px-3 py-1.5 text-xs font-bold text-[#7c3aed]"
                    >
                      <span className="opacity-60">{`{{`}</span>
                      {label}
                      <span className="opacity-60">{`}}`}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Why it works */}
          {block.whyItWorks && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mt-8 rounded-2xl border border-[#EDEFF2] bg-gradient-to-br from-[#FAFAF7] to-white p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7c3aed]">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7c3aed]">
                  Why This Works
                </p>
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-[#0B1220]">
                {block.whyItWorks}
              </p>
            </motion.div>
          )}

          {/* Mobile-only footer action row (Open in ChatGPT is hidden in chrome on mobile) */}
          <div className="sm:hidden mt-6">
            <button
              onClick={openInChatGPT}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-[#E2E5EA] bg-white px-5 py-3 text-sm font-bold text-[#0B1220] hover:bg-[#F5F7FA] transition"
            >
              <ExternalLink className="h-4 w-4" />
              Open in ChatGPT
            </button>
          </div>
        </div>
      </div>
    </LessonBlock>
  );
}