import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion'
import { techStackData } from '../../data/info'

function TechStackCard() {
  const [activeTab, setActiveTab] = useState('Languages')
  const ref = useRef(null)
  
  // Spotlight only
  const spotlightX = useMotionValue(-999)
  const spotlightY = useMotionValue(-999)
  
  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      spotlightX.set(e.clientX - rect.left)
      spotlightY.set(e.clientY - rect.top)
    }
  }

  // Get all category names
  const tabs = Object.keys(techStackData)
  
  // Get skills for active tab
  const skills = techStackData[activeTab] || []

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
      <div className="relative z-10 flex flex-col h-full gap-4">
        {/* Header */}
        <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
          Tech Stack
        </span>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1.5 border-b border-white/[0.04] pb-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-2 py-1 rounded-md text-xs font-mono transition-all duration-200 cursor-pointer ${
                activeTab === tab 
                  ? 'text-emerald-400 font-semibold' 
                  : 'text-zinc-500 hover:text-zinc-300'
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

        {/* Skills */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-white/[0.03] border border-white/[0.06] rounded-md px-2 py-1 cursor-default"
                >
                  <i className={`${skill.icon} text-sm`} style={{ color: skill.color }} />
                  <span className="text-[11px]">{skill.name}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default TechStackCard