import { useRef } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { educationData } from '../../data/info'

function EducationCard() {
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

  // Simplified line animation - smoother
  const lineVariants = {
    hidden: { height: 0 },
    visible: { 
      height: '100%', 
      transition: { duration: 0.8, ease: 'easeOut' } 
    }
  }

  // Simplified node animations - no spring, just smooth fade/scale
  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.15, duration: 0.4, ease: 'easeOut' }
    })
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
        <div className="mb-4">
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block">
            Education
          </span>
        </div>

        {/* Timeline Wrapper */}
        <div className="relative flex-1 flex flex-col justify-between py-1 pl-4">
          {/* Animated Connecting Vertical Line */}
          <motion.div 
            className="absolute left-[7px] top-[12px] w-[2px] bg-gradient-to-b from-emerald-500 via-emerald-400/40 to-transparent origin-top rounded-full"
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          />

          {educationData.map((edu, idx) => (
            <div key={edu.institution} className="relative pl-6 pb-6 last:pb-0 flex gap-4 items-start">
              {/* Animated Node Circle - Smooth */}
              <motion.div 
                custom={idx}
                variants={nodeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="absolute left-[-23px] top-[6px] w-3 h-3 rounded-full bg-[#0d0d14] border-2 border-emerald-400 flex items-center justify-center z-10"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </motion.div>

              {/* Institution Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <i className={`${edu.icon} text-sm text-emerald-400`} />
                  <h3 className="text-sm font-semibold text-white">
                    {edu.institution}
                  </h3>
                </div>
                {edu.university && (
                  <p className="text-xs text-zinc-500 mt-0.5 font-mono">{edu.university}</p>
                )}
                <p className="text-xs text-zinc-400 mt-1 font-mono">{edu.degree}</p>
                <p className="text-[10px] text-zinc-500 mt-1 font-mono bg-white/[0.02] border border-white/[0.04] px-1.5 py-0.5 rounded w-fit">{edu.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default EducationCard