import { useRef } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { aboutData } from '../../data/info'

function AboutCard() {
  const ref = useRef(null)
  
  // Spotlight
  const spotlightX = useMotionValue(0)
  const spotlightY = useMotionValue(0)
  
  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    spotlightX.set(e.clientX - rect.left)
    spotlightY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    spotlightX.set(-999)
    spotlightY.set(-999)
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
      className="w-full h-full flex flex-col justify-between bg-[#0d0d14] border border-white/[0.04] rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300 group cursor-default relative overflow-hidden"
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
      <div className="relative z-10">
        <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase mb-4 block">
            About Me
        </span>
        
        <h2 className="text-2xl font-bold text-white mb-4 leading-tight">
          {aboutData.title}
        </h2>

        <p className="text-zinc-300 text-sm leading-relaxed mb-4">
          {aboutData.description1}
        </p>

        <p className="text-zinc-400 text-xs leading-relaxed">
          {aboutData.description2}
        </p>
      </div>
    </motion.div>
  )
}

export default AboutCard