"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Trophy, TrendingUp } from "lucide-react";
import LessonBlock from "./LessonBlock";

/* ==============================================================
   ADAPTER
============================================================== */
function normalizeScenario(block) {
  const src = block?.content || block || {};

  let decisions = Array.isArray(src.decisions) ? src.decisions : null;

  if (!decisions && Array.isArray(src.choices)) {
    decisions = src.choices.map((c) => ({
      text: c.label || c.text || "",
      optimal:
        typeof c.optimal === "boolean"
          ? c.optimal
          : c.quality === "best",
      impact:
        c.impact ||
        (c.quality === "best"
          ? "high"
          : c.quality === "good"
          ? "medium"
          : "low"),
      analysis: c.analysis || c.outcome || "",
      insight: c.insight || null,
      metricImpact: c.metricImpact || null,
    }));
  }

  return {
    title: src.title || block?.title || "Scenario",
    situation: src.situation || src.setup || "",
    context: src.context || src.role || "",
    stakeholders: src.stakeholders || [],
    metrics: src.metrics || null,
    icon: src.icon || "🎯",
    decisions: decisions || [],
  };
}

const IMPACTS = {
  high: { label: "High Impact", chip: "bg-rose-50 text-rose-600 border-rose-200" },
  medium: { label: "Medium Impact", chip: "bg-[#FFF3E6] text-[#FF914D] border-[#FF914D]/25" },
  low: { label: "Low Impact", chip: "bg-[#DDF5E4] text-[#075A01] border-[#0A8F01]/20" },
};

/* ==============================================================
   Metric bar
============================================================== */
function MetricBar({ label, value, change }) {
  const color =
    value >= 70 ? "bg-[#0A8F01]" : value >= 40 ? "bg-[#FF914D]" : "bg-rose-500";
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[#4A5468] font-semibold">{label}</span>
        <div className="flex items-center gap-2">
          {change !== undefined && (
            <motion.span
              initial={{ opacity: 0, x: 4 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-[10px] font-black tabular-nums ${
                change > 0
                  ? "text-[#075A01]"
                  : change < 0
                  ? "text-rose-500"
                  : "text-[#8892A0]"
              }`}
            >
              {change > 0 ? `+${change}` : change}
            </motion.span>
          )}
          <span className="text-xs font-black text-[#0B1220] tabular-nums">
            {value}%
          </span>
        </div>
      </div>
      <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/* ==============================================================
   Decision card
============================================================== */
function DecisionCard({ decision, index, onSelect, isSelected, disabled }) {
  const impact = IMPACTS[decision.impact] || IMPACTS.medium;

  let cardClass =
    "border-[#EDEFF2] bg-white hover:border-[#0369a1]/30 hover:bg-[#E3F0FF]/40";
  let badgeClass = "bg-[#F5F7FA] text-[#4A5468] border-[#E2E5EA]";

  if (isSelected) {
    if (decision.optimal) {
      cardClass = "border-[#0A8F01] bg-[#DDF5E4]/50";
      badgeClass = "bg-[#075A01] text-white border-[#075A01]";
    } else {
      cardClass = "border-[#FF914D] bg-[#FFF3E6]/60";
      badgeClass = "bg-[#FF914D] text-white border-[#FF914D]";
    }
  } else if (disabled) {
    cardClass = "border-[#EDEFF2] bg-white opacity-50";
  }

  return (
    <motion.button
      onClick={() => !disabled && onSelect(index)}
      disabled={disabled}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={!disabled ? { y: -2, scale: 1.005 } : {}}
      whileTap={!disabled ? { scale: 0.995 } : {}}
      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all ${cardClass} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black border-2 ${badgeClass}`}
        >
          {isSelected ? (decision.optimal ? "✓" : "•") : String.fromCharCode(65 + index)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm sm:text-base font-semibold leading-snug text-[#0B1220]">
            {decision.text}
          </p>
          {!disabled && decision.impact && (
            <span
              className={`inline-flex items-center gap-1 mt-2 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${impact.chip}`}
            >
              {impact.label}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}

/* ==============================================================
   Main
============================================================== */
export default function ScenarioBlock({ block }) {
  const {
    title,
    situation,
    context,
    stakeholders,
    metrics: initialMetrics,
    icon,
    decisions,
  } = useMemo(() => normalizeScenario(block), [block]);

  const [selectedDecision, setSelectedDecision] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [currentMetrics, setCurrentMetrics] = useState(initialMetrics || null);
  const [metricChanges, setMetricChanges] = useState({});

  const handleDecision = useCallback(
    (index) => {
      const decision = decisions[index];
      setSelectedDecision(index);
      setRevealed(true);

      if (decision.metricImpact && initialMetrics) {
        const changes = {};
        const newMetrics = {};
        Object.entries(initialMetrics).forEach(([key, val]) => {
          const change = decision.metricImpact[key] || 0;
          changes[key] = change;
          newMetrics[key] = Math.max(0, Math.min(100, val + change));
        });
        setMetricChanges(changes);
        setTimeout(() => setCurrentMetrics(newMetrics), 300);
      }
    },
    [decisions, initialMetrics]
  );

  const selectedData = selectedDecision !== null ? decisions[selectedDecision] : null;

  if (!decisions.length) return null;

  return (
    <LessonBlock>
      <div className="relative overflow-hidden rounded-[32px] bg-white border border-[#EDEFF2] shadow-sm">
        {/* Pastel sky accents */}
        <div className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-[#E3F0FF] blur-3xl opacity-70" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-[#DDF5E4] blur-3xl opacity-40" />

        {/* Header */}
        <div className="relative border-b border-[#EDEFF2] p-6 sm:p-8 lg:p-10">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0369a1] to-[#0284c7] flex items-center justify-center text-xl shadow-md shadow-[#0369a1]/20">
              <span>{icon}</span>
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E3F0FF] border border-[#0369a1]/20 px-3 py-1 mb-2">
                <Target className="h-3 w-3 text-[#0369a1]" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#0369a1]">
                  Scenario
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0B1220] tracking-tight leading-tight">
                {title}
              </h3>
            </div>
          </div>
        </div>

        <div className="relative p-6 sm:p-8 lg:p-10 space-y-8">
          {/* Situation */}
          {situation && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-[#E3F0FF] border border-[#0369a1]/25 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0369a1]" />
                </div>
                <span className="text-[10px] font-black text-[#8892A0] uppercase tracking-[0.2em]">
                  Situation Briefing
                </span>
              </div>
              <p className="text-[#0B1220] text-base sm:text-lg leading-relaxed pl-7">
                {situation}
              </p>
              {context && (
                <p className="text-[#4A5468] text-sm sm:text-base leading-relaxed pl-7 border-l-2 border-[#EDEFF2] ml-7">
                  {context}
                </p>
              )}
            </div>
          )}

          {/* Stakeholders */}
          {stakeholders.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {stakeholders.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAF7] border border-[#EDEFF2] rounded-full"
                >
                  <span className="text-sm">{s.avatar || "👤"}</span>
                  <span className="text-[11px] text-[#0B1220] font-bold">{s.name}</span>
                  {s.role && (
                    <span className="text-[10px] text-[#8892A0]">· {s.role}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Metrics */}
          {currentMetrics && (
            <div className="rounded-2xl bg-[#FAFAF7] border border-[#EDEFF2] p-5 space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5 text-[#0369a1]" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8892A0]">
                  Current State
                </p>
              </div>
              {Object.entries(currentMetrics).map(([key, val]) => (
                <MetricBar
                  key={key}
                  label={
                    key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")
                  }
                  value={val}
                  change={metricChanges[key]}
                />
              ))}
            </div>
          )}

          {/* Decisions */}
          <div className="space-y-3">
            <p className="text-[10px] font-black text-[#8892A0] uppercase tracking-[0.2em]">
              What is your decision?
            </p>
            <div className="space-y-2.5">
              {decisions.map((decision, i) => (
                <DecisionCard
                  key={i}
                  decision={decision}
                  index={i}
                  onSelect={handleDecision}
                  isSelected={selectedDecision === i}
                  disabled={revealed && selectedDecision !== i}
                />
              ))}
            </div>
          </div>

          {/* Outcome */}
          <AnimatePresence>
            {revealed && selectedData && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35 }}
                className={`rounded-2xl border-2 p-5 sm:p-6 space-y-4 ${
                  selectedData.optimal
                    ? "border-[#0A8F01]/25 bg-gradient-to-br from-[#DDF5E4]/50 to-white"
                    : "border-[#FF914D]/25 bg-gradient-to-br from-[#FFF3E6]/60 to-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      selectedData.optimal ? "bg-[#075A01]" : "bg-[#FF914D]"
                    }`}
                  >
                    {selectedData.optimal ? (
                      <Trophy className="h-5 w-5 text-white" />
                    ) : (
                      <span className="text-lg">💡</span>
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-black uppercase tracking-[0.15em] ${
                        selectedData.optimal ? "text-[#075A01]" : "text-[#FF914D]"
                      }`}
                    >
                      {selectedData.optimal ? "Optimal Decision" : "Learning Opportunity"}
                    </p>
                    <p className="text-[11px] text-[#8892A0] mt-0.5">
                      {selectedData.optimal
                        ? "This was the best strategic choice"
                        : "Here's what you should consider"}
                    </p>
                  </div>
                </div>
                {selectedData.analysis && (
                  <p className="text-[#0B1220] text-sm sm:text-base leading-relaxed">
                    {selectedData.analysis}
                  </p>
                )}
                {selectedData.insight && (
                  <div className="pt-3 border-t border-[#EDEFF2]">
                    <p className="text-[10px] font-black text-[#8892A0] uppercase tracking-[0.2em] mb-1">
                      Key Insight
                    </p>
                    <p className="text-[#4A5468] text-sm sm:text-base leading-relaxed">
                      {selectedData.insight}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </LessonBlock>
  );
}