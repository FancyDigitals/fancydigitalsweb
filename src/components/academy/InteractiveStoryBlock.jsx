"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, RotateCcw, Sparkles, ArrowRight } from "lucide-react";
import LessonBlock from "./LessonBlock";

/* ==============================================================
   ADAPTER — accepts rich schema OR generator schema
============================================================== */
function normalizeStory(block) {
  const src = block?.content || block || {};

  // Prefer rich schema
  let nodes = Array.isArray(src.nodes) ? src.nodes : null;

  // Fallback to generator's `scenes`
  if (!nodes && Array.isArray(src.scenes)) {
    nodes = src.scenes.map((s, i) => ({
      id: s.id || `s${i + 1}`,
      scene: s.scene || null,
      text: s.text || s.description || "",
      dialogue: s.dialogue || null,
      choices: (s.choices || []).map((c) => ({
        text: c.label || c.text || "",
        // Generator uses `feedback` for outcome text and no `correct` marker.
        // Treat every choice as neutral (correct=false) unless explicit.
        correct: typeof c.correct === "boolean" ? c.correct : false,
        outcome: c.outcome || c.feedback || "",
        nextNode: c.next || c.nextNode,
      })),
    }));
  }

  return {
    title: src.title || block?.title || "Interactive Story",
    description: src.description || block?.description || "",
    icon: src.icon || "📖",
    nodes: nodes || [],
  };
}

/* ==============================================================
   Choice button (light palette)
============================================================== */
const CHOICE_TONES = [
  { chip: "bg-[#EFEAFF] text-[#7c3aed]", ring: "border-[#7c3aed]/25 hover:border-[#7c3aed]/50 hover:bg-[#EFEAFF]/60" },
  { chip: "bg-[#E3F0FF] text-[#0369a1]", ring: "border-[#0369a1]/25 hover:border-[#0369a1]/50 hover:bg-[#E3F0FF]/60" },
  { chip: "bg-[#DDF5E4] text-[#075A01]", ring: "border-[#0A8F01]/25 hover:border-[#0A8F01]/50 hover:bg-[#DDF5E4]/60" },
  { chip: "bg-[#FFF3E6] text-[#FF914D]", ring: "border-[#FF914D]/25 hover:border-[#FF914D]/50 hover:bg-[#FFF3E6]/60" },
];

function ChoiceButton({ choice, index, onSelect, disabled, selected, wasCorrect }) {
  const tone = CHOICE_TONES[index % CHOICE_TONES.length];
  const isSelected = selected === index;

  let stateClass = `${tone.ring} bg-white`;
  let chipClass = tone.chip;
  let textClass = "text-[#0B1220]";

  if (isSelected) {
    if (wasCorrect) {
      stateClass = "border-[#0A8F01] bg-[#DDF5E4]/60";
      chipClass = "bg-[#075A01] text-white";
      textClass = "text-[#075A01] font-semibold";
    } else {
      stateClass = "border-[#FF914D] bg-[#FFF3E6]/70";
      chipClass = "bg-[#FF914D] text-white";
      textClass = "text-[#0B1220] font-semibold";
    }
  } else if (disabled) {
    stateClass = "border-[#EDEFF2] bg-white opacity-50";
    chipClass = "bg-[#F5F7FA] text-[#8892A0]";
  }

  return (
    <motion.button
      onClick={() => !disabled && onSelect(index)}
      disabled={disabled}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      whileHover={!disabled ? { scale: 1.005, x: 3 } : {}}
      whileTap={!disabled ? { scale: 0.995 } : {}}
      className={`w-full text-left rounded-2xl border-2 px-5 py-4 transition-all ${stateClass} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${chipClass}`}
        >
          {isSelected ? (wasCorrect ? "✓" : "•") : String.fromCharCode(65 + index)}
        </span>
        <span className={`text-sm sm:text-base leading-relaxed ${textClass}`}>
          {choice.text}
        </span>
      </div>
    </motion.button>
  );
}

/* ==============================================================
   Story node
============================================================== */
function StoryNode({ node, onChoice }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = useCallback(
    (index) => {
      setSelected(index);
      setRevealed(true);
      const choice = node.choices[index];
      setTimeout(() => onChoice(choice, index), 1200);
    },
    [node, onChoice]
  );

  const wasCorrect = selected !== null && node.choices[selected]?.correct;

  return (
    <motion.div
      key={node.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Scene divider */}
      {node.scene && (
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[#EDEFF2]" />
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#8892A0] px-2">
            {node.scene}
          </span>
          <div className="h-px flex-1 bg-[#EDEFF2]" />
        </div>
      )}

      {/* Story text */}
      {node.text && (
        <div className="relative">
          <div className="absolute -left-3 top-1 bottom-1 w-[3px] rounded-full bg-gradient-to-b from-[#7c3aed] via-[#7c3aed]/40 to-transparent" />
          <p className="text-[#0B1220] text-base sm:text-lg leading-relaxed pl-4">
            {node.text}
          </p>
        </div>
      )}

      {/* Dialogue */}
      {node.dialogue && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="flex gap-3 items-start"
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#6366f1] flex items-center justify-center text-base shadow-md">
            {node.dialogue.avatar || "🎭"}
          </div>
          <div className="flex-1 bg-[#FAFAF7] border border-[#EDEFF2] rounded-2xl rounded-tl-sm px-4 py-3">
            <p className="text-[11px] font-black text-[#7c3aed] mb-1 uppercase tracking-wider">
              {node.dialogue.character}
            </p>
            <p className="text-[#0B1220] text-sm sm:text-base leading-relaxed">
              "{node.dialogue.text}"
            </p>
          </div>
        </motion.div>
      )}

      {/* Choices */}
      {node.choices?.length > 0 && (
        <div className="space-y-2.5 pt-1">
          <p className="text-[10px] font-black tracking-[0.2em] uppercase text-[#8892A0]">
            What do you do?
          </p>
          {node.choices.map((choice, i) => (
            <ChoiceButton
              key={i}
              choice={choice}
              index={i}
              onSelect={handleSelect}
              disabled={revealed}
              selected={selected}
              wasCorrect={wasCorrect}
            />
          ))}
        </div>
      )}

      {/* Outcome */}
      <AnimatePresence>
        {revealed && selected !== null && node.choices[selected]?.outcome && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl border-2 px-5 py-4 ${
              wasCorrect
                ? "border-[#0A8F01]/25 bg-[#DDF5E4]/50"
                : "border-[#FF914D]/25 bg-[#FFF3E6]/60"
            }`}
          >
            <div className="flex gap-3 items-start">
              <span className="text-xl flex-shrink-0 mt-0.5">
                {wasCorrect ? "⚡" : "💡"}
              </span>
              <div>
                <p
                  className={`text-[11px] font-black mb-1 uppercase tracking-[0.2em] ${
                    wasCorrect ? "text-[#075A01]" : "text-[#FF914D]"
                  }`}
                >
                  {wasCorrect ? "Great decision" : "Here's what happened"}
                </p>
                <p className="text-[#0B1220] text-sm sm:text-base leading-relaxed">
                  {node.choices[selected].outcome}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ==============================================================
   Main
============================================================== */
export default function InteractiveStoryBlock({ block }) {
  const { title, description, nodes, icon } = useMemo(
    () => normalizeStory(block),
    [block]
  );

  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const currentNode = nodes[currentNodeIndex];

  const handleChoice = useCallback(
    (choice, choiceIndex) => {
      if (choice.correct) setScore((s) => s + 1);

      let nextIndex = currentNodeIndex + 1;
      if (choice.nextNode !== undefined && choice.nextNode !== null) {
        const found = nodes.findIndex((n) => n.id === choice.nextNode);
        if (found !== -1) nextIndex = found;
      }

      setHistory((h) => [...h, { nodeIndex: currentNodeIndex, choiceIndex }]);

      if (nextIndex >= nodes.length || nextIndex === -1) {
        setCompleted(true);
      } else {
        setCurrentNodeIndex(nextIndex);
      }
    },
    [currentNodeIndex, nodes]
  );

  const handleRestart = () => {
    setCurrentNodeIndex(0);
    setHistory([]);
    setCompleted(false);
    setScore(0);
  };

  const totalNodes = nodes.length;
  const progress = totalNodes > 0 ? (history.length / totalNodes) * 100 : 0;

  if (!totalNodes) return null;

  return (
    <LessonBlock>
      <div className="relative overflow-hidden rounded-[32px] bg-white border border-[#EDEFF2] shadow-sm">
        {/* Pastel violet accents */}
        <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-[#EFEAFF] blur-3xl opacity-70" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#FFE4E1] blur-3xl opacity-40" />

        {/* Header */}
        <div className="relative border-b border-[#EDEFF2] p-6 sm:p-8 lg:p-10">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#6366f1] flex items-center justify-center text-xl shadow-md shadow-[#7c3aed]/20">
              <span className="filter grayscale-0">{icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EFEAFF] border border-[#7c3aed]/20 px-3 py-1 mb-2">
                <Compass className="h-3 w-3 text-[#7c3aed]" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#7c3aed]">
                  Interactive Story
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0B1220] leading-tight tracking-tight">
                {title}
              </h3>
              {description && (
                <p className="text-[#4A5468] text-sm sm:text-base mt-1.5 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#7c3aed] to-[#6366f1] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <span className="text-[10px] text-[#8892A0] font-black tabular-nums">
              {history.length}/{totalNodes}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 sm:p-8 lg:p-10">
          <AnimatePresence mode="wait">
            {!completed ? (
              <motion.div
                key={`node-${currentNodeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {currentNode && (
                  <StoryNode node={currentNode} onChoice={handleChoice} />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-8 space-y-5"
              >
                <div className="text-5xl">
                  {score === totalNodes ? "🏆" : score >= totalNodes / 2 ? "⭐" : "📚"}
                </div>
                <div>
                  <h4 className="text-[#0B1220] font-black text-xl mb-1 tracking-tight">
                    Story Complete
                  </h4>
                  <p className="text-[#4A5468] text-sm">
                    You made {score} of {totalNodes} optimal decisions
                  </p>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  {Array.from({ length: totalNodes }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.07 }}
                      className={`w-2.5 h-2.5 rounded-full ${
                        i < score ? "bg-[#7c3aed]" : "bg-[#EDEFF2]"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-[#E2E5EA] text-[#0B1220] hover:bg-[#F5F7FA] text-sm font-bold transition"
                >
                  <RotateCcw className="h-4 w-4" />
                  Try different choices
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </LessonBlock>
  );
}