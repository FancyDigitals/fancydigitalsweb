// src/components/academy/exam/ExamTimer.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock, AlertTriangle } from "lucide-react";

export default function ExamTimer({ duration, onExpire }) {
  const [remaining, setRemaining] = useState(duration);
  const startRef = useRef(null);
  const expiredRef = useRef(false);

  useEffect(() => {
    startRef.current = Date.now();
    expiredRef.current = false;
    setRemaining(duration);

    const tick = () => {
      const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
      const left = Math.max(duration - elapsed, 0);
      setRemaining(left);

      if (left === 0 && !expiredRef.current) {
        expiredRef.current = true;
        onExpire?.();
      }
    };

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [duration, onExpire]);

  const percentage = duration > 0 ? (remaining / duration) * 100 : 0;
  const state = getState(percentage);
  const { minutes, seconds } = format(remaining);

  const styles = STATE_STYLES[state];

  return (
    <div
      role="timer"
      aria-live={state === "critical" ? "assertive" : "polite"}
      className={`inline-flex items-center gap-3 rounded-2xl border px-3 py-2 transition-colors sm:px-4 sm:py-2.5 ${styles.container}`}
    >
      {/* Ring */}
      <div className="relative h-9 w-9 shrink-0 sm:h-10 sm:w-10">
        <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90">
          <circle
            cx="20"
            cy="20"
            r="17"
            strokeWidth="3"
            className={styles.trackClass}
            fill="none"
          />
          <motion.circle
            cx="20"
            cy="20"
            r="17"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            className={styles.progressClass}
            style={{
              strokeDasharray: 2 * Math.PI * 17,
            }}
            animate={{
              strokeDashoffset:
                2 * Math.PI * 17 * (1 - percentage / 100),
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </svg>

        <motion.div
          animate={
            state === "critical"
              ? { scale: [1, 1.15, 1] }
              : { scale: 1 }
          }
          transition={
            state === "critical"
              ? { duration: 1, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 }
          }
          className="absolute inset-0 grid place-items-center"
        >
          {state === "critical" ? (
            <AlertTriangle size={12} className={styles.iconClass} />
          ) : (
            <Clock size={12} className={styles.iconClass} />
          )}
        </motion.div>
      </div>

      {/* Digital */}
      <div className="flex flex-col leading-none">
        <span
          className={`text-[9px] font-bold uppercase tracking-[0.2em] ${styles.labelClass}`}
        >
          {state === "critical"
            ? "Ending soon"
            : state === "warning"
              ? "Time low"
              : "Time left"}
        </span>
        <span
          className={`mt-1 font-mono text-lg font-black tabular-nums sm:text-xl ${styles.timeClass}`}
        >
          {String(minutes).padStart(2, "0")}
          <span className={styles.colonClass}>:</span>
          {String(seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

/* ---------- HELPERS ---------- */
function format(totalSeconds) {
  return {
    minutes: Math.floor(totalSeconds / 60),
    seconds: totalSeconds % 60,
  };
}

function getState(percentage) {
  if (percentage <= 10) return "critical";
  if (percentage <= 25) return "warning";
  return "normal";
}

/* ---------- STATE STYLES ---------- */
const STATE_STYLES = {
  normal: {
    container: "border-white/10 bg-white/[0.03]",
    trackClass: "stroke-white/10",
    progressClass: "stroke-emerald-400",
    iconClass: "text-emerald-300",
    labelClass: "text-white/50",
    timeClass: "text-white",
    colonClass: "text-white/40",
  },
  warning: {
    container: "border-yellow-500/25 bg-yellow-500/[0.06]",
    trackClass: "stroke-yellow-500/15",
    progressClass: "stroke-yellow-400",
    iconClass: "text-yellow-300",
    labelClass: "text-yellow-300/70",
    timeClass: "text-yellow-100",
    colonClass: "text-yellow-300/50",
  },
  critical: {
    container: "border-red-500/30 bg-red-500/[0.08]",
    trackClass: "stroke-red-500/15",
    progressClass: "stroke-red-400",
    iconClass: "text-red-300",
    labelClass: "text-red-300/80",
    timeClass: "text-red-100",
    colonClass: "text-red-300/50",
  },
};