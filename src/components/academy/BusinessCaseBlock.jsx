"use client";

import { Building2, AlertCircle, Lightbulb, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import LessonBlock from "./LessonBlock";

const COLUMNS = [
  {
    key: "scenario",
    label: "The Problem",
    Icon: AlertCircle,
    tone: {
      chipBg: "bg-rose-50",
      chipText: "text-rose-600",
      iconBg: "bg-rose-100",
      iconText: "text-rose-600",
      card: "bg-white border-rose-100",
      bar: "bg-rose-400",
    },
  },
  {
    key: "solution",
    label: "The Solution",
    Icon: Lightbulb,
    tone: {
      chipBg: "bg-[#FFF3E6]",
      chipText: "text-[#FF914D]",
      iconBg: "bg-[#FFE8D6]",
      iconText: "text-[#FF914D]",
      card: "bg-white border-[#FF914D]/15",
      bar: "bg-[#FF914D]",
    },
  },
  {
    key: "result",
    label: "The Result",
    Icon: TrendingUp,
    tone: {
      chipBg: "bg-[#DDF5E4]",
      chipText: "text-[#075A01]",
      iconBg: "bg-[#CFF3D6]",
      iconText: "text-[#075A01]",
      card: "bg-gradient-to-br from-[#DDF5E4]/40 to-white border-[#0A8F01]/20",
      bar: "bg-[#0A8F01]",
    },
  },
];

export default function BusinessCaseBlock({ block }) {
  if (!block) return null;

  return (
    <LessonBlock>
      <div className="relative overflow-hidden rounded-[32px] bg-white border border-[#EDEFF2] shadow-sm">
        {/* Pastel accents */}
        <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-[#E9E4FF] blur-3xl opacity-40" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#DDF5E4] blur-3xl opacity-40" />

        {/* Header */}
        <div className="relative border-b border-[#EDEFF2] p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-[#FAFAF7] via-white to-white">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#EDEFF2] px-4 py-1.5 mb-5 shadow-sm">
                <Building2 className="h-3.5 w-3.5 text-[#0B1220]" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0B1220]">
                  Business Case
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-black text-[#0B1220] leading-[1.1] tracking-tight max-w-3xl">
                {block.title}
              </h2>

              {block.company && (
                <p className="mt-3 text-sm font-black uppercase tracking-[0.25em] text-[#8892A0]">
                  {block.company}
                </p>
              )}
            </div>

            {/* Editorial credit-style tag */}
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-[#FAFAF7] border border-[#EDEFF2] px-4 py-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#0A8F01]" />
              <span className="text-[11px] font-bold text-[#4A5468]">
                Case Study
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="relative grid gap-4 p-6 sm:gap-6 sm:p-10 lg:grid-cols-3 lg:p-12">
          {COLUMNS.map((col, i) => {
            const value = block[col.key];
            if (!value) return null;

            const { Icon, tone } = col;
            const isResult = col.key === "result";

            return (
              <motion.div
                key={col.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative overflow-hidden flex flex-col gap-4 rounded-2xl border p-6 sm:p-7 ${tone.card} hover:shadow-md transition-shadow`}
              >
                {/* Left accent bar */}
                <div className={`absolute top-0 left-0 h-full w-1 ${tone.bar}`} />

                {/* Chip */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone.iconBg}`}
                  >
                    <Icon className={`h-4 w-4 ${tone.iconText}`} />
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.25em] ${tone.chipText}`}
                  >
                    {col.label}
                  </span>
                </div>

                {/* Body */}
                <p
                  className={`leading-relaxed ${
                    isResult
                      ? "text-lg sm:text-xl font-bold text-[#0B1220]"
                      : "text-base sm:text-lg text-[#4A5468]"
                  }`}
                >
                  {value}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Optional metrics row */}
        {Array.isArray(block.metrics) && block.metrics.length > 0 && (
          <div className="relative grid gap-4 border-t border-[#EDEFF2] p-6 sm:grid-cols-3 sm:p-10 bg-[#FAFAF7]/60">
            {block.metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl bg-white border border-[#EDEFF2] p-5 hover:shadow-sm transition-shadow"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#8892A0]">
                  {m.label}
                </p>
                <p className="mt-2 text-2xl sm:text-3xl font-black text-[#0B1220] tracking-tight tabular-nums">
                  {m.value}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </LessonBlock>
  );
}