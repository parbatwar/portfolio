// components/cards/ExperienceCard.jsx

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion'

function ExperienceCard() {
  const ref = useRef(null)

  // 3D tilt
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-5, 5])
  
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

  const experience = {
    role: 'Python Backend Developer Intern',
    company: 'Tech Solutions Ltd.',
    period: '2025 – Present',
    details: [
      'Developed and optimized backend server modules using Python, FastAPI, and Django, lowering server response time by 25%.',
      'Created automated ETL scraping scripts to fetch and ingest large financial datasets into PostgreSQL databases.',
      'Designed and executed complex SQL queries and set indexes, improving data fetch speeds for user-facing API routes.',
      'Managed source control and repository versioning using Git, and participated in active code reviews.'
    ],
    tech: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'SQL', 'Git']
  }

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

      <div style={{ transform: 'translateZ(10px)' }} className="w-full">
        <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase mb-4 block">
          // Professional Experience
        </span>

        <div className="border border-white/[0.04] bg-white/[0.01] rounded-xl p-4">
          {/* Header */}
          <div className="flex justify-between items-start gap-2 border-b border-white/[0.04] pb-3 mb-3">
            <div>
              <h3 className="text-sm font-bold text-white font-display">{experience.role}</h3>
              <p className="text-xs text-emerald-400/80 font-mono mt-0.5">{experience.company}</p>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono bg-white/[0.02] border border-white/[0.04] px-1.5 py-0.5 rounded whitespace-nowrap">{experience.period}</span>
          </div>

          {/* Details list */}
          <ul className="space-y-2">
            {experience.details.map((detail, index) => (
              <li key={index} className="text-xs text-zinc-400 flex items-start gap-2 leading-relaxed">
                <span className="text-emerald-400 mt-0.5 shrink-0">▹</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/[0.04]">
            {experience.tech.map((t) => (
              <span key={t} className="text-[9px] font-mono text-zinc-400 bg-white/[0.04] border border-white/[0.04] rounded px-2 py-0.5">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ExperienceCard