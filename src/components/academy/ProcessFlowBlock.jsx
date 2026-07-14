// components/lesson/blocks/ProcessFlowBlock.jsx
'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEP_STATES = {
  locked: 'locked',
  active: 'active',
  complete: 'complete',
}

const STATUS_STYLES = {
  success: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', icon: '✓', color: 'text-emerald-400' },
  warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/25', icon: '⚠', color: 'text-amber-400' },
  info: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/25', icon: 'ℹ', color: 'text-cyan-400' },
  danger: { bg: 'bg-rose-500/10', border: 'border-rose-500/25', icon: '✗', color: 'text-rose-400' },
}

function StepConnector({ active }) {
  return (
    <div className="flex items-center justify-center w-full py-1">
      <div className="relative flex flex-col items-center">
        <div className="w-0.5 h-6 bg-white/10 rounded-full relative overflow-hidden">
          <motion.div
            className="absolute inset-x-0 top-0 bg-gradient-to-b from-violet-500 to-violet-500/0"
            initial={{ height: 0 }}
            animate={{ height: active ? '100%' : 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-white/20"
          animate={active ? { backgroundColor: 'rgb(139, 92, 246)', scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  )
}

function ProcessStep({ step, index, state, onActivate, onComplete }) {
  const isLocked = state === STEP_STATES.locked
  const isActive = state === STEP_STATES.active
  const isComplete = state === STEP_STATES.complete

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <button
        onClick={() => !isLocked && (isActive ? onComplete(index) : onActivate(index))}
        disabled={isLocked}
        className={`
          w-full text-left p-4 rounded-xl border transition-all duration-300
          ${isComplete ? 'border-emerald-500/30 bg-emerald-500/[0.06]' : ''}
          ${isActive ? 'border-violet-500/40 bg-violet-500/[0.08] shadow-lg shadow-violet-500/10' : ''}
          ${isLocked ? 'border-white/[0.05] bg-white/[0.01] opacity-50 cursor-not-allowed' : ''}
          ${!isActive && !isComplete && !isLocked ? 'border-white/10 bg-white/[0.02] hover:border-white/20 cursor-pointer' : ''}
        `}
      >
        <div className="flex items-start gap-4">
          {/* Step number / icon */}
          <div className={`
            flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border font-bold text-sm transition-all duration-300
            ${isComplete ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400' : ''}
            ${isActive ? 'border-violet-500/50 bg-violet-500/20 text-violet-300' : ''}
            ${isLocked ? 'border-white/[0.06] text-white/20' : ''}
            ${!isActive && !isComplete && !isLocked ? 'border-white/10 text-white/40' : ''}
          `}>
            {isComplete ? '✓' : isLocked ? '🔒' : step.icon || index + 1}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h4 className={`text-sm font-semibold transition-colors duration-200 ${
                isComplete ? 'text-emerald-300' : isActive ? 'text-white' : 'text-white/60'
              }`}>
                {step.title}
              </h4>
              {step.duration && !isLocked && (
                <span className="text-[10px] text-white/25 font-medium">{step.duration}</span>
              )}
            </div>
            <p className={`text-xs leading-relaxed transition-colors duration-200 ${
              isLocked ? 'text-white/20' : 'text-white/45'
            }`}>
              {step.description}
            </p>

            {/* Expanded active content */}
            <AnimatePresence>
              {isActive && step.details && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-3 pt-3 border-t border-violet-500/15">
                    {/* Substeps */}
                    {step.details.steps && (
                      <div className="space-y-1.5">
                        {step.details.steps.map((substep, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-4 h-4 rounded flex-shrink-0 bg-violet-500/15 border border-violet-500/25 flex items-center justify-center mt-0.5">
                              <div className="w-1 h-1 rounded-full bg-violet-400" />
                            </div>
                            <p className="text-white/60 text-xs leading-relaxed">{substep}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Notes or tips */}
                    {step.details.note && (
                      <div className="flex gap-2 bg-violet-500/[0.07] border border-violet-500/15 rounded-lg p-2.5">
                        <span className="text-violet-400 text-sm flex-shrink-0">💡</span>
                        <p className="text-violet-300/70 text-xs leading-relaxed">{step.details.note}</p>
                      </div>
                    )}

                    {/* Status indicator */}
                    {step.details.status && STATUS_STYLES[step.details.status] && (
                      <div className={`flex gap-2 rounded-lg p-2.5 border ${STATUS_STYLES[step.details.status].bg} ${STATUS_STYLES[step.details.status].border}`}>
                        <span className={`text-sm flex-shrink-0 ${STATUS_STYLES[step.details.status].color}`}>
                          {STATUS_STYLES[step.details.status].icon}
                        </span>
                        <p className={`text-xs leading-relaxed ${STATUS_STYLES[step.details.status].color}`}>
                          {step.details.statusMessage}
                        </p>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="pt-1">
                      <div className="inline-flex items-center gap-1.5 text-violet-400 text-xs font-semibold">
                        <span>Tap to mark complete</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* State indicator */}
          <div className="flex-shrink-0">
            {isActive && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-violet-400 mt-1"
              />
            )}
          </div>
        </div>
      </button>
    </motion.div>
  )
}

export default function ProcessFlowBlock({ block }) {
  const {
    title,
    description,
    steps = [],
    icon,
    sequential = true
  } = block.content || block

  const [stepStates, setStepStates] = useState(() =>
    steps.map((_, i) => i === 0 ? STEP_STATES.active : sequential ? STEP_STATES.locked : STEP_STATES.active)
  )
  const [completedCount, setCompletedCount] = useState(0)

  const handleActivate = useCallback((index) => {
    if (!sequential) {
      setStepStates(prev => prev.map((s, i) =>
        i === index ? STEP_STATES.active : s === STEP_STATES.active ? STEP_STATES.locked : s
      ))
    }
  }, [sequential])

  const handleComplete = useCallback((index) => {
    setStepStates(prev => {
      const next = [...prev]
      next[index] = STEP_STATES.complete
      if (sequential && index + 1 < steps.length) {
        next[index + 1] = STEP_STATES.active
      }
      return next
    })
    setCompletedCount(c => c + 1)
  }, [sequential, steps.length])

  const allComplete = stepStates.every(s => s === STEP_STATES.complete)
  const progress = (completedCount / steps.length) * 100

  const handleReset = () => {
    setStepStates(steps.map((_, i) => i === 0 ? STEP_STATES.active : sequential ? STEP_STATES.locked : STEP_STATES.active))
    setCompletedCount(0)
  }

  return (
    <div className="group relative">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-violet-500/8 via-transparent to-indigo-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative border border-white/10 rounded-2xl overflow-hidden bg-[#0D0D12]">
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-white/[0.06]">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20 flex items-center justify-center text-xl">
              {icon || '⚙️'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">
                  Process Flow
                </span>
                {sequential && (
                  <span className="text-[10px] text-white/25 font-medium">Sequential</span>
                )}
              </div>
              <h3 className="text-white font-semibold text-base mt-1">{title}</h3>
              {description && (
                <p className="text-white/40 text-sm mt-0.5">{description}</p>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <span className="text-[11px] text-white/30 font-mono tabular-nums">
              {completedCount}/{steps.length}
            </span>
          </div>
        </div>

        {/* Steps */}
        <div className="px-6 py-6 space-y-0">
          <AnimatePresence mode="wait">
            {allComplete ? (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="text-4xl">✅</div>
                <div>
                  <p className="text-white font-bold text-base">Process Complete</p>
                  <p className="text-white/40 text-sm mt-1">You've worked through all {steps.length} steps</p>
                </div>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 text-white/60 hover:text-white text-sm font-medium transition-all"
                >
                  ↺ Reset Process
                </button>
              </motion.div>
            ) : (
              <motion.div key="steps" className="space-y-0">
                {steps.map((step, i) => (
                  <div key={i}>
                    <ProcessStep
                      step={step}
                      index={i}
                      state={stepStates[i]}
                      onActivate={handleActivate}
                      onComplete={handleComplete}
                    />
                    {i < steps.length - 1 && (
                      <StepConnector active={stepStates[i] === STEP_STATES.complete} />
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}