"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen, Clock, Users, CheckCircle2, ArrowRight, Star, GraduationCap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* Rotating pastel palette per course card — Educax feel */
const CARD_TONES = [
  { blob: "bg-[#FFE8D6]", accent: "text-[#FF914D]", bar: "bg-[#FF914D]" },
  { blob: "bg-[#DDF5E4]", accent: "text-[#075A01]", bar: "bg-[#0A8F01]" },
  { blob: "bg-[#E9E4FF]", accent: "text-[#7c3aed]", bar: "bg-[#7c3aed]" },
  { blob: "bg-[#DDEEFF]", accent: "text-[#0369a1]", bar: "bg-[#0369a1]" },
  { blob: "bg-[#FFE4E1]", accent: "text-rose-500", bar: "bg-rose-500" },
];

export default function CourseCategoryGrid({ courses }) {
  const categories = useMemo(() => {
    const set = new Set();
    courses.forEach((c) => c.category && set.add(c.category));
    return ["All", ...Array.from(set)];
  }, [courses]);

  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return courses;
    return courses.filter((c) => c.category === active);
  }, [courses, active]);

  return (
    <>
      {/* Category filter pills */}
      {categories.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-bold border transition-all ${
                active === cat
                  ? "bg-[#075A01] text-white border-[#075A01] shadow-md shadow-[#075A01]/15"
                  : "bg-white text-[#4A5468] border-[#E2E5EA] hover:border-[#0A8F01]/30 hover:text-[#0B1220]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((course, i) => {
            const tone = CARD_TONES[i % CARD_TONES.length];
            const imageSrc =
              course.thumbnail_url || `/academy/courses/${course.slug}.png`;

            return (
              <Link
                key={course.id}
                href={`/academy/courses/${course.slug}`}
                className="group relative overflow-hidden rounded-[24px] bg-white border border-[#EDEFF2] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Photo panel */}
                <div className={`relative aspect-[16/10] overflow-hidden ${tone.blob}`}>
                  <img
                    src={imageSrc}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Fallback illustration */}
                  <div className={`absolute inset-0 flex items-center justify-center ${tone.blob} -z-10`}>
                    <GraduationCap className={`h-16 w-16 ${tone.accent} opacity-40`} />
                  </div>

                  {/* Category chip on image */}
                  {course.category && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-[10px] font-black text-[#0B1220] uppercase tracking-wider shadow-sm">
                        {course.category}
                      </span>
                    </div>
                  )}

                  {/* Free badge */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#075A01] text-white px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm">
                      Free to start
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* Instructor row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#075A01] to-[#0A8F01] shadow-sm">
                        <img src="/logo.png" alt="" className="h-3 brightness-0 invert" />
                      </div>
                      <span className="text-xs font-bold text-[#4A5468]">
                        Fancy Academy
                      </span>
                    </div>
                    {course.level && (
                      <span className={`text-[10px] font-black uppercase tracking-wider ${tone.accent}`}>
                        {course.level}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-black text-[#0B1220] leading-tight tracking-tight group-hover:text-[#075A01] transition line-clamp-2 mb-2">
                    {course.title}
                  </h3>

                  {/* Subtitle */}
                  {course.subtitle && (
                    <p className="text-sm text-[#4A5468] leading-relaxed line-clamp-2 mb-4">
                      {course.subtitle}
                    </p>
                  )}

                  {/* What you'll learn — first item as teaser */}
                  {course.what_you_learn?.[0] && (
                    <div className="flex items-start gap-2 mb-5 rounded-xl bg-[#FAFAF7] border border-[#EDEFF2] p-3">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#0A8F01] shrink-0 mt-0.5" />
                      <p className="text-xs text-[#4A5468] leading-relaxed line-clamp-2">
                        {course.what_you_learn[0]}
                      </p>
                    </div>
                  )}

                  {/* Meta row */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#EDEFF2]">
                    <div className="flex items-center gap-3 text-xs text-[#4A5468] font-semibold">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5 text-[#8892A0]" />
                        <span className="tabular-nums">{course.total_lessons || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-[#8892A0]" />
                        <span className="tabular-nums">{course.duration_hours || 0}h</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-[#8892A0]" />
                        <span className="tabular-nums">
                          {(course.total_students || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-black ${tone.accent} group-hover:gap-2 transition-all`}>
                      Start
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#4A5468] text-sm">No courses in this category yet.</p>
        </div>
      )}
    </>
  );
}