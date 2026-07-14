"use client";

import { motion } from "framer-motion";
import {
  Cpu, Brain, Sparkles, Workflow, Database, Bot,
  Lightbulb, Rocket, Target, MessageSquare,
} from "lucide-react";

const ICONS = [Cpu, Brain, Sparkles, Workflow, Database, Bot, Lightbulb, Rocket, Target, MessageSquare];

/* Pastel palettes rotated by title so each lesson feels distinct */
const PALETTES = [
  { blob1: "#FFE4E1", blob2: "#DDF5E4", ring: "from-[#FF914D] to-[#f97316]", ringGlow: "shadow-[#FF914D]/30" },
  { blob1: "#E9E4FF", blob2: "#DDEEFF", ring: "from-[#7c3aed] to-[#6366f1]", ringGlow: "shadow-[#7c3aed]/30" },
  { blob1: "#DDF5E4", blob2: "#FFF3E6", ring: "from-[#075A01] to-[#0A8F01]", ringGlow: "shadow-[#0A8F01]/30" },
  { blob1: "#FFE8D6", blob2: "#E3F0FF", ring: "from-[#0369a1] to-[#0284c7]", ringGlow: "shadow-[#0369a1]/30" },
];

export default function IllustrationPanel({ title = "" }) {
  const seed = (title || "lesson").length;
  const Icon = ICONS[seed % ICONS.length];
  const palette = PALETTES[seed % PALETTES.length];

  return (
    <div className="relative flex h-full min-h-[380px] items-center justify-center overflow-hidden rounded-[28px] bg-[#FAFAF7]">
      {/* Pastel blobs */}
      <div
        className="pointer-events-none absolute -left-16 -top-10 h-64 w-64 rounded-full blur-3xl opacity-80"
        style={{ background: palette.blob1 }}
      />
      <div
        className="pointer-events-none absolute -right-16 -bottom-10 h-64 w-64 rounded-full blur-3xl opacity-80"
        style={{ background: palette.blob2 }}
      />

      {/* Subtle grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.04]" viewBox="0 0 500 500">
        <defs>
          <pattern id="illGrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="#0B1220" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="500" height="500" fill="url(#illGrid)" />
      </svg>

      {/* Doodle accents (Educax style) */}
      <svg className="absolute top-6 left-8 opacity-70" width="34" height="34" viewBox="0 0 34 34" fill="none">
        <path d="M17 3 L19 14 L30 17 L19 20 L17 31 L15 20 L4 17 L15 14 Z" fill="#FF914D" />
      </svg>
      <svg className="absolute top-10 right-10 opacity-60" width="50" height="24" viewBox="0 0 50 24" fill="none">
        <path d="M2 12 Q13 2, 25 12 T48 12" stroke="#075A01" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
      <svg className="absolute bottom-8 left-10 opacity-70" width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="3" fill="#7c3aed" />
        <circle cx="6" cy="8" r="1.8" fill="#7c3aed" />
        <circle cx="28" cy="8" r="1.8" fill="#7c3aed" />
        <circle cx="6" cy="26" r="1.8" fill="#7c3aed" />
        <circle cx="28" cy="26" r="1.8" fill="#7c3aed" />
      </svg>
      <svg className="absolute bottom-14 right-6 opacity-60" width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path d="M6 6 L24 24 M24 6 L6 24" stroke="#FF914D" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* Center composition */}
      <div className="relative">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br ${palette.ring} shadow-2xl ${palette.ringGlow}`}
        >
          <Icon size={72} className="text-white" strokeWidth={1.8} />

          {/* Slow rotating orbit ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dashed border-white/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Floating pill cards */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute -left-14 -top-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg border border-[#EDEFF2]"
        >
          <Brain className="h-5 w-5 text-[#075A01]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute -right-12 top-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg border border-[#EDEFF2]"
        >
          <Bot className="h-5 w-5 text-[#7c3aed]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute -left-10 bottom-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg border border-[#EDEFF2]"
        >
          <Database className="h-5 w-5 text-[#0369a1]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="absolute -right-8 -bottom-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg border border-[#EDEFF2]"
        >
          <Workflow className="h-5 w-5 text-[#FF914D]" />
        </motion.div>
      </div>
    </div>
  );
}