"use client";

import { BrainCircuit, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import LessonBlock from "./LessonBlock";

export default function ConceptBlock({ block }) {
  const paragraphs = (block.content || "")
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <LessonBlock>
      <div className="relative overflow-hidden rounded-[32px] bg-white border border-[#EDEFF2] shadow-sm">
        {/* Pastel accents */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#DDF5E4] blur-3xl opacity-70" />
        <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-[#E3F0FF] blur-3xl opacity-50" />

        {/* Doodle */}
        <svg
          className="pointer-events-none absolute top-8 right-8 opacity-50"
          width="40"
          height="20"
          viewBox="0 0 40 20"
          fill="none"
        >
          <path
            d="M2 10 Q10 2, 20 10 T38 10"
            stroke="#075A01"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative p-8 sm:p-12 lg:p-14">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#DDF5E4] border border-[#0A8F01]/15 px-4 py-1.5 mb-6">
            <BrainCircuit className="h-3.5 w-3.5 text-[#075A01]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#075A01]">
              Core Concept
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-black text-[#0B1220] leading-[1.1] tracking-tight max-w-3xl">
            {block.title}
          </h2>

          {/* Body */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_240px] lg:items-start">
            {/* Reading column */}
            <div className="max-w-2xl space-y-6">
              {paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`leading-[1.75] text-[#0B1220] ${
                    index === 0
                      ? "text-lg sm:text-xl font-medium"
                      : "text-base sm:text-lg text-[#4A5468]"
                  }`}
                >
                  {/* Drop cap on the very first paragraph */}
                  {index === 0 ? (
                    <>
                      <span className="float-left mr-2 mt-1 text-[52px] font-black leading-none text-[#075A01] tracking-tight">
                        {paragraph.charAt(0)}
                      </span>
                      {paragraph.slice(1)}
                    </>
                  ) : (
                    paragraph
                  )}
                </motion.p>
              ))}
            </div>

            {/* Side note / think-about-it card (visible on lg+) */}
            <motion.aside
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="hidden lg:block sticky top-24"
            >
              <div className="rounded-2xl bg-gradient-to-br from-[#FFF3E6] to-white border border-[#FF914D]/20 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Lightbulb className="h-4 w-4 text-[#FF914D]" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF914D]">
                    Think About It
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-[#4A5468]">
                  As you read, ask yourself:{" "}
                  <span className="font-semibold text-[#0B1220]">
                    where would this apply in your own work?
                  </span>
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </LessonBlock>
  );
}