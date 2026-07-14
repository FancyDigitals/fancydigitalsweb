// components/lesson/blocks/TimelineBlock.jsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const ERA_COLORS = {
  past: { dot: 'bg-slate-400', line: 'from-slate-500/40', label: 'text-slate-400', badge: 'bg-slate-500/10 border-slate-500/20 text-slate-400' },
  present: { dot: 'bg-cyan-400', line: 'from-cyan-500/60', label: 'text-cyan-400', badge: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' },
  future: { dot: 'bg-violet-400', line: 'from-violet-500/40', label: 'text-violet-400', badge: 'bg-violet-500/10 border-violet-500/20 text-violet-400' },
  milestone: { dot: 'bg-amber-400', line: 'from-amber-500/60', label: 'text-amber-400', badge: 'bg-amber-500/10 border-amber-500/20 text-amber-400' },
}

function TimelineItem({ item, index, isActive, onClick, isLast }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const era = ERA_COLORS[item.era] || ERA_COLORS.past

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="relative flex gap-4 group/item"
    >
      {/* Timeline track */}
      <div className="flex flex-col items-center flex-shrink-0 w-10">
        {/* Connector line above */}
        {index > 0 && (
          <div className={`w-0.5 h-4 bg-gradient-to-b ${era.line} to-transparent -mt-4 mb-0`} />
        )}

        {/* Dot */}
        <button
          onClick={onClick}
          className={`
            relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center text-base
            transition-all duration-300 cursor-pointer flex-shrink-0
            ${isActive
              ? `border-white/40 bg-[#0D0D12] shadow-lg`
              : 'border-white/10 bg-[#0D0D12] hover:border-white/25'
            }
          `}
        >
          {item.icon || (
            <div className={`w-2.5 h-2.5 rounded-full ${era.dot} ${isActive ? 'scale-125' : ''} transition-transform`} />
          )}
        </button>

        {/* Connector line below */}
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-white/10 to-white/[0.03] mt-1" />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 min-w-0 pb-8 ${isLast ? 'pb-2' : ''}`}>
        {/* Year / label */}
        <div className="flex items-center gap-2 mb-2 mt-2">
          {item.year && (
            <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full ${era.badge}`}>
              {item.year}
            </span>
          )}
          {item.era && (
            <span className={`text-[10px] font-semibold uppercase tracking-wider ${era.label} opacity-60`}>
              {item.era}
            </span>
          )}
        </div>

        {/* Title */}
        <button
          onClick={onClick}
          className="text-left w-full group/title"
        >
          <h4 className={`font-semibold text-sm leading-snug transition-colors duration-200 ${
            isActive ? 'text-white' : 'text-white/70 group-hover/title:text-white/90'
          }`}>
            {item.title}
          </h4>
        </button>

        {/* Summary always visible */}
        <p className="text-white/40 text-xs mt-1 leading-relaxed line-clamp-2">{item.summary}</p>

        {/* Expanded content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-3">
                {item.description && (
                  <p className="text-white/65 text-sm leading-relaxed">{item.description}</p>
                )}

                {/* Impact tags */}
                {item.impacts && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.impacts.map((impact, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 bg-white/[0.05] border border-white/[0.08] rounded-full text-white/50"
                      >
                        {impact}
                      </span>
                    ))}
                  </div>
                )}

                {/* Stats */}
                {item.stats && (
                  <div className="grid grid-cols-2 gap-2">
                    {item.stats.map((stat, i) => (
                      <div
                        key={i}
                        className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-2.5"
                      >
                        <p className="text-white font-bold text-base">{stat.value}</p>
                        <p className="text-white/35 text-[10px]">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quote */}
                {item.quote && (
                  <blockquote className="border-l-2 border-white/20 pl-3">
                    <p className="text-white/55 text-xs italic leading-relaxed">"{item.quote.text}"</p>
                    {item.quote.author && (
                      <p className="text-white/30 text-[10px] mt-1">— {item.quote.author}</p>
                    )}
                  </blockquote>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function TimelineBlock({ block }) {
  const { title, description, items = [], icon, mode = 'vertical' } = block.content || block
  const [activeItem, setActiveItem] = useState(0)

  const handleItemClick = (index) => {
    setActiveItem(prev => prev === index ? null : index)
  }

  return (
    <div className="group relative">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-slate-500/8 via-transparent to-cyan-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative border border-white/10 rounded-2xl overflow-hidden bg-[#0D0D12]">
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-white/[0.06]">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-slate-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-xl">
              {icon || '📅'}
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/35 bg-white/[0.05] border border-white/[0.08] px-2 py-0.5 rounded-full">
                Timeline
              </span>
              <h3 className="text-white font-semibold text-base mt-1">{title}</h3>
              {description && (
                <p className="text-white/40 text-sm mt-0.5 leading-relaxed">{description}</p>
              )}
            </div>
          </div>

          {/* Era legend */}
          <div className="flex flex-wrap gap-3 mt-4">
            {Object.entries(ERA_COLORS).map(([era, style]) => (
              <div key={era} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${style.dot}`} />
                <span className="text-[10px] text-white/30 capitalize font-medium">{era}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="px-6 py-6">
          <div className="space-y-0">
            {items.map((item, i) => (
              <TimelineItem
                key={i}
                item={item}
                index={i}
                isActive={activeItem === i}
                onClick={() => handleItemClick(i)}
                isLast={i === items.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}