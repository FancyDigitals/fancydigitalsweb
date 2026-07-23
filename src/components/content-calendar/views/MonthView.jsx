"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Edit3 } from "lucide-react";

const PLATFORM_DOTS = {
  instagram: "bg-pink-500",
  twitter:   "bg-sky-500",
  linkedin:  "bg-blue-600",
  youtube:   "bg-red-500",
  facebook:  "bg-indigo-500",
  tiktok:    "bg-gray-800",
};

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MonthView({ posts, onEditPost, startDate }) {
  const base    = startDate ? new Date(startDate + "T00:00:00") : new Date();
  const [month, setMonth] = useState(base.getMonth());
  const [year,  setYear]  = useState(base.getFullYear());

  const firstDay  = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Map posts to date strings
  const postsByDate = posts.reduce((acc, post) => {
    if (!post.date) return acc;
    if (!acc[post.date]) acc[post.date] = [];
    acc[post.date].push(post);
    return acc;
  }, {});

  const monthName = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });

  const prev = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };
  const next = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  const cells = [];
  // Empty cells before month start
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const today = new Date();

  return (
    <div className="p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="rounded-xl border border-gray-200 p-2 hover:bg-gray-50 transition">
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </button>
        <h3 className="text-sm font-black text-gray-800">{monthName}</h3>
        <button onClick={next} className="rounded-xl border border-gray-200 p-2 hover:bg-gray-50 transition">
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map((d) => (
          <div key={d} className="py-1.5 text-center text-[10px] font-black uppercase tracking-wider text-gray-400">
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;

          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dayPosts = postsByDate[dateStr] || [];
          const isToday  = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;

          return (
            <div
              key={dateStr}
              className={`min-h-[72px] rounded-xl border p-1.5 transition ${
                isToday ? "border-[#075a01] bg-[#075a01]/5" : "border-gray-100 hover:border-gray-200 bg-white"
              }`}
            >
              <div className={`text-xs font-bold mb-1 ${isToday ? "text-[#075a01]" : "text-gray-600"}`}>
                {day}
              </div>
              <div className="space-y-0.5">
                {dayPosts.slice(0, 3).map((post) => (
                  <button
                    key={post.id}
                    onClick={() => onEditPost(post)}
                    className="w-full flex items-center gap-1 rounded-md px-1 py-0.5 hover:bg-gray-100 transition text-left group"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${PLATFORM_DOTS[post.platform] || "bg-gray-400"}`} />
                    <span className="text-[9px] text-gray-600 truncate leading-tight group-hover:text-[#075a01]">
                      {post.hook?.slice(0, 18) || post.caption?.slice(0, 18) || post.platform}
                    </span>
                  </button>
                ))}
                {dayPosts.length > 3 && (
                  <p className="text-[9px] text-gray-400 pl-1">+{dayPosts.length - 3} more</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}