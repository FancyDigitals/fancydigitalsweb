"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Edit3 } from "lucide-react";

const PLATFORM_COLORS = {
  instagram: { bg: "bg-pink-100",   text: "text-pink-800",   dot: "bg-pink-500" },
  twitter:   { bg: "bg-sky-100",    text: "text-sky-800",    dot: "bg-sky-500" },
  linkedin:  { bg: "bg-blue-100",   text: "text-blue-800",   dot: "bg-blue-600" },
  youtube:   { bg: "bg-red-100",    text: "text-red-800",    dot: "bg-red-500" },
  facebook:  { bg: "bg-indigo-100", text: "text-indigo-800", dot: "bg-indigo-500" },
  tiktok:    { bg: "bg-gray-100",   text: "text-gray-800",   dot: "bg-gray-700" },
};

function getWeekDates(referenceDate) {
  const d   = new Date(referenceDate);
  const day = d.getDay();
  const monday = new Date(d);
  monday.setDate(d.getDate() - day + (day === 0 ? -6 : 1));
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date;
  });
}

export default function WeekView({ posts, onEditPost, startDate }) {
  const base = startDate ? new Date(startDate + "T00:00:00") : new Date();
  const [weekStart, setWeekStart] = useState(base);

  const weekDates = getWeekDates(weekStart);

  const postsByDate = posts.reduce((acc, post) => {
    if (!post.date) return acc;
    if (!acc[post.date]) acc[post.date] = [];
    acc[post.date].push(post);
    return acc;
  }, {});

  const prev = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d);
  };
  const next = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
  };

  const fmt = (d) => d.toLocaleDateString("default", { month: "short", day: "numeric" });
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  return (
    <div className="p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="rounded-xl border border-gray-200 p-2 hover:bg-gray-50 transition">
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </button>
        <span className="text-sm font-black text-gray-800">
          {fmt(weekDates[0])} — {fmt(weekDates[6])}
        </span>
        <button onClick={next} className="rounded-xl border border-gray-200 p-2 hover:bg-gray-50 transition">
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* 7-column grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {weekDates.map((date) => {
          const dateStr   = date.toISOString().split("T")[0];
          const dayPosts  = postsByDate[dateStr] || [];
          const isToday   = dateStr === todayStr;
          const dayName   = date.toLocaleDateString("default", { weekday: "short" });
          const dayNum    = date.getDate();

          return (
            <div key={dateStr} className={`rounded-xl border p-2 min-h-[120px] ${isToday ? "border-[#075a01] bg-[#075a01]/5" : "border-gray-100 bg-white"}`}>
              {/* Day label */}
              <div className={`text-center mb-2 ${isToday ? "text-[#075a01]" : "text-gray-500"}`}>
                <div className="text-[9px] font-black uppercase">{dayName}</div>
                <div className={`text-sm font-black rounded-full h-6 w-6 flex items-center justify-center mx-auto ${isToday ? "bg-[#075a01] text-white" : ""}`}>
                  {dayNum}
                </div>
              </div>

              {/* Posts */}
              <div className="space-y-1">
                {dayPosts.map((post) => {
                  const pc = PLATFORM_COLORS[post.platform] || PLATFORM_COLORS.tiktok;
                  return (
                    <button
                      key={post.id}
                      onClick={() => onEditPost(post)}
                      className={`w-full rounded-lg px-1.5 py-1 text-left transition hover:opacity-80 ${pc.bg}`}
                    >
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className={`h-1 w-1 rounded-full ${pc.dot} shrink-0`} />
                        <span className={`text-[9px] font-bold uppercase ${pc.text}`}>{post.platform?.slice(0, 2)}</span>
                      </div>
                      <p className={`text-[9px] leading-tight truncate ${pc.text}`}>
                        {post.hook?.slice(0, 22) || post.caption?.slice(0, 22) || "—"}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}