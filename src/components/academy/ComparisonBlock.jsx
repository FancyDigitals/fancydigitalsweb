// components/lesson/blocks/ComparisonBlock.jsx
'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VIEW_MODES = {
  side_by_side: 'side_by_side',
  attribute: 'attribute',
  verdict: 'verdict',
}

const RATING_COLORS = [
  'bg-rose-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-yellow-500',
  'bg-lime-500',
  'bg-emerald-500',
]

function RatingBar({ value, max = 10, color }) {
  const pct = (value / max) * 100
  const colorClass = RATING_COLORS[Math.floor((value / max) * (RATING_COLORS.length - 1))]

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colorClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      <span className="text-[11px] font-bold text-white/40 w-4 text-right">{value}</span>
    </div>
  )
}

function VoteButton({ label, color, votes, total, onVote, voted }) {
  const pct = total > 0 ? Math.round((votes / total) * 100) : 0

  return (
    <motion.button
      onClick={onVote}
      whileHover={!voted ? { scale: 1.02 } : {}}
      whileTap={!voted ? { scale: 0.98 } : {}}
      disabled={voted}
      className={`
        flex-1 relative overflow-hidden rounded-xl border p-4 text-center transition-all duration-300
        ${voted ? 'cursor-default' : 'cursor-pointer'}
        ${color}
      `}
    >
      {voted && (
        <motion.div
          className="absolute inset-0 bg-current opacity-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: pct / 100 }}
          style={{ transformOrigin: 'left' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}
      <div className="relative">
        <p className="text-sm font-semibold">{label}</p>
        {voted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-black mt-1"
          >
            {pct}%
          </motion.p>
        )}
      </div>
    </motion.button>
  )
}

function SideBySide({ options }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option, i) => (
        <div
          key={i}
          className="border border-white/10 rounded-xl overflow-hidden"
        >
          {/* Option header */}
          <div className={`px-4 py-3 border-b border-white/[0.06] ${
            i === 0
              ? 'bg-gradient-to-r from-violet-500/10 to-transparent'
              : 'bg-gradient-to-r from-cyan-500/10 to-transparent'
          }`}>
            <div className="flex items-center gap-2">
              {option.icon && <span className="text-lg">{option.icon}</span>}
              <div>
                <p className="text-white font-semibold text-sm leading-none">{option.name}</p>
                {option.subtitle && <p className="text-white/35 text-[10px] mt-0.5">{option.subtitle}</p>}
              </div>
            </div>
          </div>

          {/* Pros */}
          <div className="p-4 space-y-2">
            {option.pros?.map((pro, j) => (
              <div key={j} className="flex gap-2 items-start">
                <span className="text-emerald-400 text-xs flex-shrink-0 mt-0.5">✓</span>
                <p className="text-white/60 text-xs leading-relaxed">{pro}</p>
              </div>
            ))}
            {option.cons?.map((con, j) => (
              <div key={j} className="flex gap-2 items-start">
                <span className="text-rose-400 text-xs flex-shrink-0 mt-0.5">✗</span>
                <p className="text-white/60 text-xs leading-relaxed">{con}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function AttributeView({ options, attributes }) {
  return (
    <div className="space-y-0 border border-white/[0.07] rounded-xl overflow-hidden">
      {/* Header row */}
      <div className="grid border-b border-white/[0.07]" style={{ gridTemplateColumns: `1.5fr ${options.map(() => '1fr').join(' ')}` }}>
        <div className="px-4 py-3 bg-white/[0.02]">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/25">Attribute</span>
        </div>
        {options.map((option, i) => (
          <div key={i} className={`px-3 py-3 text-center border-l border-white/[0.07] ${
            i === 0 ? 'bg-violet-500/[0.05]' : 'bg-cyan-500/[0.05]'
          }`}>
            <div className="flex flex-col items-center gap-0.5">
              {option.icon && <span className="text-base">{option.icon}</span>}
              <span className="text-[11px] font-semibold text-white/70">{option.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Attribute rows */}
      {attributes.map((attr, i) => (
        <div
          key={i}
          className={`grid border-b border-white/[0.04] last:border-0 ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}
          style={{ gridTemplateColumns: `1.5fr ${options.map(() => '1fr').join(' ')}` }}
        >
          <div className="px-4 py-3 flex items-center gap-2">
            {attr.icon && <span className="text-sm">{attr.icon}</span>}
            <span className="text-white/55 text-xs font-medium">{attr.label}</span>
          </div>
          {options.map((option, j) => {
            const val = option.attributes?.[attr.key]
            return (
              <div key={j} className="px-3 py-3 border-l border-white/[0.04] flex flex-col items-center justify-center gap-1">
                {typeof val === 'number' ? (
                  <div className="w-full">
                    <RatingBar value={val} />
                  </div>
                ) : typeof val === 'boolean' ? (
                  <span className={val ? 'text-emerald-400 text-sm' : 'text-rose-400 text-sm'}>
                    {val ? '✓' : '✗'}
                  </span>
                ) : (
                  <span className="text-white/55 text-xs text-center">{val || '—'}</span>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default function ComparisonBlock({ block }) {
  const {
    title,
    description,
    options = [],
    attributes = [],
    icon,
    defaultMode = VIEW_MODES.attribute,
    verdict,
    showVoting = false,
  } = block.content || block

  const [viewMode, setViewMode] = useState(defaultMode)
  const [votes, setVotes] = useState(() => options.map(() => Math.floor(Math.random() * 40 + 10)))
  const [userVote, setUserVote] = useState(null)
  const [revealedVerdict, setRevealedVerdict] = useState(false)

  const totalVotes = votes.reduce((a, b) => a + b, 0)

  const handleVote = useCallback((index) => {
    if (userVote !== null) return
    setUserVote(index)
    setVotes(prev => {
      const next = [...prev]
      next[index] += 1
      return next
    })
  }, [userVote])

  const tabs = [
    { key: VIEW_MODES.side_by_side, label: 'Overview', icon: '⬛' },
    ...(attributes.length ? [{ key: VIEW_MODES.attribute, label: 'Compare', icon: '📊' }] : []),
    ...(verdict ? [{ key: VIEW_MODES.verdict, label: 'Verdict', icon: '⚖️' }] : []),
  ]

  return (
    <div className="group relative">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-violet-500/8 via-transparent to-cyan-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative border border-white/10 rounded-2xl overflow-hidden bg-[#0D0D12]">
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-white/[0.06]">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/20 flex items-center justify-center text-xl">
              {icon || '⚖️'}
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-bold tracking-widest uppercase text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">
                Comparison
              </span>
              <h3 className="text-white font-semibold text-base mt-1">{title}</h3>
              {description && (
                <p className="text-white/40 text-sm mt-0.5 leading-relaxed">{description}</p>
              )}
            </div>
          </div>

          {/* Option pills */}
          <div className="flex gap-2 mt-4">
            {options.map((opt, i) => (
              <div
                key={i}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${
                  i === 0
                    ? 'border-violet-500/30 bg-violet-500/10 text-violet-300'
                    : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300'
                }`}
              >
                {opt.icon && <span>{opt.icon}</span>}
                <span>{opt.name}</span>
              </div>
            ))}
            <div className="flex items-center gap-1 ml-auto">
              <span className="w-3 h-3 rounded-full bg-violet-500/60" />
              <span className="text-[10px] text-white/20">vs</span>
              <span className="w-3 h-3 rounded-full bg-cyan-500/60" />
            </div>
          </div>
        </div>

        {/* View mode tabs */}
        {tabs.length > 1 && (
          <div className="flex border-b border-white/[0.06] px-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setViewMode(tab.key)}
                className={`
                  flex items-center gap-1.5 px-4 py-3 text-xs font-semibold transition-all duration-200 border-b-2 -mb-px
                  ${viewMode === tab.key
                    ? 'border-violet-500 text-violet-300'
                    : 'border-transparent text-white/30 hover:text-white/60'
                  }
                `}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {viewMode === VIEW_MODES.side_by_side && (
                <SideBySide options={options} />
              )}

              {viewMode === VIEW_MODES.attribute && attributes.length > 0 && (
                <AttributeView options={options} attributes={attributes} />
              )}

              {viewMode === VIEW_MODES.verdict && verdict && (
                <div className="space-y-5">
                  <div className="border border-amber-500/20 bg-amber-500/[0.05] rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">⚖️</span>
                      <div className="flex-1">
                        <p className="text-amber-300 font-bold text-sm mb-2">{verdict.title || 'Expert Verdict'}</p>
                        <p className="text-white/65 text-sm leading-relaxed">{verdict.text}</p>
                        {verdict.recommendation && (
                          <div className="mt-3 pt-3 border-t border-amber-500/15">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/60 mb-1">Recommendation</p>
                            <p className="text-white/55 text-sm">{verdict.recommendation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Community vote */}
          {showVoting && (
            <div className="mt-5 pt-5 border-t border-white/[0.06] space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/30">
                Which would you choose?
              </p>
              <div className="flex gap-2">
                {options.map((option, i) => (
                  <VoteButton
                    key={i}
                    label={option.name}
                    color={i === 0
                      ? 'border-violet-500/30 text-violet-300'
                      : 'border-cyan-500/30 text-cyan-300'
                    }
                    votes={votes[i]}
                    total={totalVotes + (userVote !== null ? 0 : 0)}
                    onVote={() => handleVote(i)}
                    voted={userVote !== null}
                  />
                ))}
              </div>
              {userVote !== null && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[11px] text-white/30 text-center"
                >
                  {totalVotes} learners voted · Results shown above
                </motion.p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}