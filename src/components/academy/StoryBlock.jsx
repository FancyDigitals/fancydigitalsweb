"use client";

import { Quote, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import LessonBlock from "./LessonBlock";

export default function StoryBlock({ block }) {
  const body = block.story || block.quote || block.content || "";

  return (
    <LessonBlock>
      <div className="relative overflow-hidden rounded-[36px] bg-white border border-[#EDEFF2] shadow-sm">
        {/* Pastel decorative shapes */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#FFE4E1] blur-3xl opacity-60" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#FFE8D6] blur-3xl opacity-50" />

        {/* Doodle accent */}
        <svg
          className="pointer-events-none absolute top-8 right-8 opacity-60"
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
        >
          <path d="M21 4 L23 18 L38 21 L23 24 L21 38 L19 24 L4 21 L19 18 Z" fill="#FF914D" />
        </svg>

        <div className="relative grid lg:grid-cols-[380px_1fr]">
          {/* Visual Side — magazine feature image */}
          <div className="relative flex min-h-[280px] items-center justify-center border-b border-[#EDEFF2] p-10 lg:min-h-[520px] lg:border-b-0 lg:border-r bg-gradient-to-br from-[#FAFAF7] via-white to-[#FFF3E6]">
            {/* Blob backdrop */}
            <div className="absolute inset-8">
              <svg viewBox="0 0 300 300" className="w-full h-full" preserveAspectRatio="none">
                <path
                  d="M150,30 C230,30 270,90 270,165 C270,240 210,270 140,270 C70,270 30,225 30,150 C30,75 70,30 150,30 Z"
                  fill="#FFE8D6"
                  opacity="0.7"
                />
              </svg>
            </div>

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-[#FF914D] to-[#f97316] shadow-2xl shadow-[#FF914D]/30 lg:h-48 lg:w-48"
            >
              <Sparkles size={72} className="text-white" strokeWidth={1.8} />
            </motion.div>

            {/* Floating quote badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute top-8 left-8 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-[#EDEFF2] px-3 py-1.5 shadow-sm"
            >
              <Quote className="h-3.5 w-3.5 text-[#FF914D]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF914D]">
                A True Story
              </span>
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            {/* Section eyebrow */}
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-[#FFF3E6] border border-[#FF914D]/20 px-4 py-1.5 mb-6">
              <Quote className="h-3.5 w-3.5 text-[#FF914D]" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF914D]">
                Story
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black leading-[1.1] tracking-tight text-[#0B1220]">
              {block.title}
            </h2>

            {/* Pull quote — magazine style */}
            <blockquote className="relative mt-8">
              {/* Big quotation mark */}
              <span
                aria-hidden
                className="absolute -left-2 -top-6 text-7xl font-serif leading-none text-[#FF914D]/25 select-none"
              >
                “
              </span>

              <div className="relative border-l-[3px] border-[#FF914D] pl-6">
                <p className="text-xl sm:text-2xl font-bold italic leading-[1.4] text-[#0B1220] tracking-tight">
                  {body}
                </p>
              </div>
            </blockquote>

            {/* Explanation body */}
            {block.explanation && (
              <p className="mt-8 text-base sm:text-lg leading-relaxed text-[#4A5468]">
                {block.explanation}
              </p>
            )}

            {/* Takeaway callout */}
            {block.takeaway && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-10 flex items-start gap-4 rounded-2xl bg-gradient-to-br from-[#DDF5E4] to-[#EAFBF0] border border-[#0A8F01]/15 p-5"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#075A01] text-white">
                  <ArrowRight className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#075A01] mb-1">
                    Key Takeaway
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed text-[#0B1220] font-medium">
                    {block.takeaway}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </LessonBlock>
  );
}