// components/cards/EducationCard.jsx

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion'

const education = [
  {
    institution: 'Tribhuvan University',
    degree: 'Bachelor in Computer Science',
    year: '2023 - 2026',
    icon: '🎓'
  },
  {
    institution: 'National School of Sciences',
    degree: '+2 Science (Computer Science)',
    year: '2021 - 2023',
    icon: '🏫'
  },
  {
    institution: 'Valley Public School',
    degree: 'Secondary Education (SEE)',
    year: '2021',
    icon: '🎒'
  }
]

function EducationCard() {
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

  // Animation variants for timeline line
  const lineVariants = {
    hidden: { height: 0 },
    visible: { 
      height: '80%', 
      transition: { duration: 1.2, ease: 'easeInOut' } 
    }
  }

  // Animation variants for timeline nodes
  const nodeVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.2 + 0.3, type: 'spring', stiffness: 200 }
    })
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
      className="w-full h-full flex flex-col bg-[#0d0d14] border border-white/[0.04] rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300 glow-card group cursor-default"
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

      <div style={{ transform: 'translateZ(10px)' }} className="mb-4">
        <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block">
          // Education
        </span>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative flex-1 flex flex-col justify-between py-1 pl-4" style={{ transform: 'translateZ(15px)' }}>
        {/* Animated Connecting Vertical Line */}
        <motion.div 
          className="absolute left-[7px] top-[14px] w-[2px] bg-gradient-to-b from-emerald-500 via-indigo-500/40 to-transparent origin-top"
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />

        {education.map((edu, idx) => (
          <div key={edu.institution} className="relative pl-6 pb-4 last:pb-0 flex gap-4 items-start">
            {/* Animated Node Circle */}
            <motion.div 
              custom={idx}
              variants={nodeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute left-[-23px] top-[5px] w-3.5 h-3.5 rounded-full bg-[#0d0d14] border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_10px_rgba(52,211,153,0.3)] z-10 group-hover:border-indigo-400 group-hover:shadow-[0_0_10px_rgba(129,140,248,0.4)] transition-all duration-300"
            >
              <div className="w-1 h-1 rounded-full bg-emerald-400 group-hover:bg-indigo-400" />
            </motion.div>

            {/* Institution Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm">{edu.icon}</span>
                <h3 className="text-sm font-semibold text-white font-display group-hover:text-emerald-400/90 transition-colors">{edu.institution}</h3>
              </div>
              <p className="text-xs text-zinc-400 mt-1 font-mono">{edu.degree}</p>
              <p className="text-[10px] text-zinc-500 mt-1 font-mono bg-white/[0.02] border border-white/[0.04] px-1.5 py-0.5 rounded w-fit">{edu.year}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default EducationCard