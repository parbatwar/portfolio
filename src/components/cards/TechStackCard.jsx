// components/cards/TechStackCard.jsx

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion'

const techStack = {
  Languages: [
    { name: 'Python', icon: '🐍' },
    { name: 'SQL', icon: '💾' },
    { name: 'C#', icon: '🔷' },
    { name: 'JavaScript', icon: '🟡' },
    { name: 'TypeScript', icon: '⚡' }
  ],
  Backend: [
    { name: 'Django', icon: '💚' },
    { name: 'FastAPI', icon: '⚡' },
    { name: '.NET Core', icon: '🌐' }
  ],
  DataEngineering: [
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Redis', icon: '🔴' },
    { name: 'ETL Pipelines', icon: '🔄' },
    { name: 'Pandas', icon: '🐼' }
  ],
  Tools: [
    { name: 'Docker', icon: '🐳' },
    { name: 'Git', icon: '🐙' },
    { name: 'Linux', icon: '🐧' },
    { name: 'Postman', icon: '📯' }
  ]
}

function TechStackCard() {
  const [activeTab, setActiveTab] = useState('All')
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
    const width = rect.width
    const height = rect.height
    
    tiltX.set((e.clientX - rect.left) / width - 0.5)
    tiltY.set((e.clientY - rect.top) / height - 0.5)
    
    spotlightX.set(e.clientX - rect.left)
    spotlightY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  // Get skills based on active tab
  const getSkills = () => {
    if (activeTab === 'All') {
      return Object.values(techStack).flat()
    }
    if (activeTab === 'Data Eng') {
      return techStack['DataEngineering'] || []
    }
    return techStack[activeTab] || []
  }

  const tabs = ['All', 'Languages', 'Backend', 'Data Eng', 'Tools']

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

      <div className="flex-1 flex flex-col justify-between" style={{ transform: 'translateZ(10px)' }}>
        <div>
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase mb-4 block">
            // Tech Stack
          </span>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap gap-1.5 mb-5 border-b border-white/[0.04] pb-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-2 py-1 rounded-md text-xs font-mono transition-colors duration-200 cursor-pointer ${
                  activeTab === tab ? 'text-emerald-400 font-semibold' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="activeTechTab"
                    className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-md -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Badges Container with animation */}
        <div className="flex-1 flex flex-wrap gap-2 content-start py-1 overflow-hidden min-h-[140px]">
          <AnimatePresence mode="popLayout">
            {getSkills().map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 bg-white/[0.03] border border-white/[0.05] rounded-lg px-3 py-2 hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/[0.02] transition-colors cursor-default"
              >
                <span>{skill.icon}</span>
                <span>{skill.name}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default TechStackCard