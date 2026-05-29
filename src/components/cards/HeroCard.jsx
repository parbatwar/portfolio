import { useRef } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { info, stack } from "../../data/info";

function HeroCard() {
  const ref = useRef(null)
  
  // Track spotlight position
  const spotlightX = useMotionValue(0)
  const spotlightY = useMotionValue(0)
  
  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    
    // Update spotlight position relative to card
    spotlightX.set(e.clientX - rect.left)
    spotlightY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    // Reset spotlight to corner when mouse leaves
    spotlightX.set(-999)
    spotlightY.set(-999)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden w-full h-full bg-[#0d0d14] border border-white/[0.04] rounded-2xl p-8 md:p-10 hover:border-emerald-500/20 transition-all duration-300 group"
    >
      {/* Spotlight Layer - Follows your mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${spotlightX}px ${spotlightY}px,
              rgba(16, 185, 129, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Status Badge */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-emerald-400 font-mono">
                {info.statusBadge}
              </span>
            </div>
            <span className="text-xs text-zinc-500 font-mono">{info.location}</span>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            <span className="text-white">{info.firstName}</span>
            <br />
            <span className="text-white/90">{info.lastName}</span>
          </h1>

            {/* Description */}
            <p className="text-sm text-zinc-400 max-w-xl mb-8 leading-relaxed">
                {info.tagline}
            </p>
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {stack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium font-mono text-zinc-400 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5 hover:border-emerald-500/40 hover:text-emerald-400 transition-all cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative Background Glows */}
      <div className="absolute -right-24 -top-24 w-72 h-72 bg-gradient-to-br from-emerald-500/15 to-transparent rounded-full blur-[100px] pointer-events-none group-hover:from-emerald-500/25 transition-all duration-700" />
      <div className="absolute -left-24 -bottom-24 w-72 h-72 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-full blur-[100px] pointer-events-none group-hover:from-indigo-500/20 transition-all duration-700" />
    </motion.div>
  )
}

export default HeroCard