// components/cards/ExperienceCard.jsx - Simplified, no 3D tilt

import { useRef } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { experienceData } from '../../data/info'

function ExperienceCard() {
  const ref = useRef(null)
  
  // Spotlight
  const spotlightX = useMotionValue(-999)
  const spotlightY = useMotionValue(-999)
  
  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      spotlightX.set(e.clientX - rect.left)
      spotlightY.set(e.clientY - rect.top)
    }
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { spotlightX.set(-999); spotlightY.set(-999) }}
      className="w-full h-full flex flex-col bg-[#0d0d14] border border-white/[0.04] rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300 group cursor-default relative overflow-hidden"
    >
      {/* Spotlight Layer */}
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

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase mb-4 block">
            Professional Experience
        </span>

        {/* Experience Card */}
        <div className="border border-white/[0.04] bg-white/[0.01] rounded-xl p-4">
          {/* Header */}
          <div className="flex justify-between items-start gap-2 border-b border-white/[0.04] pb-3 mb-3">
            <div>
              <h3 className="text-sm font-bold text-white">{experienceData.role}</h3>
              <p className="text-xs text-emerald-400/80 font-mono mt-0.5">{experienceData.company}</p>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono bg-white/[0.02] border border-white/[0.04] px-1.5 py-0.5 rounded whitespace-nowrap">
              {experienceData.period}
            </span>
          </div>

          {/* Details list */}
          <ul className="space-y-2">
            {experienceData.details.map((detail, index) => (
              <li key={index} className="text-xs text-zinc-400 flex items-start gap-2 leading-relaxed">
                <span className="text-emerald-400 mt-0.5 shrink-0">▹</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
          
        </div>
      </div>
    </motion.div>
  )
}

export default ExperienceCard