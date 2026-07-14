"use client";

import { motion } from "framer-motion";

export default function LessonBlock({ children, tone = "default" }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      data-tone={tone}
      className="relative w-full"
    >
      <div className="mx-auto w-full max-w-5xl">
        {children}
      </div>
    </motion.section>
  );
}