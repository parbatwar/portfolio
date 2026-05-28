// components/cards/AboutCard.jsx

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion'

function AboutCard() {
  const ref = useRef(null)
  
  // 3D tilt
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-6, 6])
  
  // Spotlight
  const spotlightX = useMotionValue(0)
  const spotlightY = useMotionValue(0)
  
  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5)
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5)
    spotlightX.set(e.clientX - rect.left)
    spotlightY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  const corePrinciples = [
    { label: 'Data Pipelines', icon: '🔄' },
    { label: 'DB Indexing', icon: '🗄️' },
    { label: 'API Endpoints', icon: '🔌' }
  ]

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="w-full h-full flex flex-col justify-between bg-[#0d0d14] border border-white/[0.04] rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300 glow-card group cursor-default"
    >
      {/* Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${spotlightX}px ${spotlightY}px,
              rgba(16, 185, 129, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      <div style={{ transform: 'translateZ(10px)' }}>
        <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase mb-4 block">
          // Focus Area
        </span>
        
        <h2 className="text-2xl font-bold font-display text-white mb-4 leading-tight">
          Optimizing backend storage and synchronizing pipelines.
        </h2>

        <p className="text-zinc-300 text-sm leading-relaxed mb-4">
          I'm <span className="text-white font-semibold">Parbat</span> — a Computer Science student focused on building fast APIs, automating database synchronizations, and tuning PostgreSQL queries.
        </p>

        <p className="text-zinc-400 text-xs leading-relaxed">
          I spend my time automating extract-transform-load (ETL) scripts, indexing database tables to shave off response times, and testing Docker environments.
        </p>
      </div>

      {/* Core values list */}
      <div 
        className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-white/[0.05]"
        style={{ transform: 'translateZ(15px)' }}
      >
        {corePrinciples.map((principle) => (
          <div 
            key={principle.label}
            className="flex flex-col items-center gap-1.5 p-2 bg-white/[0.02] border border-white/[0.04] rounded-xl hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] transition-colors group/item"
          >
            <span className="text-base group-hover/item:scale-110 transition-transform duration-300">{principle.icon}</span>
            <span className="text-[9px] font-semibold font-mono text-zinc-400 group-hover/item:text-emerald-400 transition-colors text-center">{principle.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default AboutCard