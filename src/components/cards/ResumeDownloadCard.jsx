// components/cards/ResumeDownloadCard.jsx

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion'

function ResumeDownloadCard() {
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

  return (
    <motion.a
      href="#" // Placeholder for resume PDF
      download="Parbat_Sunuwar_Resume.pdf"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="block w-full h-full bg-[#0d0d14] border border-white/[0.04] rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300 glow-card group cursor-pointer"
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

      <div className="flex flex-col justify-between h-full" style={{ transform: 'translateZ(10px)' }}>
        <div className="flex justify-between items-start w-full">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block mb-1">
              // Curriculum Vitae
            </span>
            <h3 className="text-xl font-bold font-display text-white mt-1 group-hover:text-emerald-400 transition-colors">Download Resume</h3>
          </div>
          <motion.div 
            className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white text-lg group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 group-hover:text-emerald-400 transition-all"
            whileHover={{ scale: 1.1 }}
          >
            <motion.span 
              animate={{ y: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              ↓
            </motion.span>
          </motion.div>
        </div>

        <div className="mt-8 flex justify-between items-center w-full">
          <span className="text-xs text-zinc-400 leading-normal">
            Get a copy of my detailed technical profile.
          </span>
          <div className="text-[9px] font-mono text-zinc-500 bg-white/[0.02] border border-white/[0.04] px-2 py-0.5 rounded whitespace-nowrap">
            PDF · 128 KB
          </div>
        </div>
      </div>
    </motion.a>
  )
}

export default ResumeDownloadCard
