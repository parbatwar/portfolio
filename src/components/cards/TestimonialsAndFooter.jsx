// components/cards/TestimonialsAndFooter.jsx

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion'

const testimonials = [
  {
    name: 'David Rodriguez',
    role: 'Senior Project Architect',
    text: 'The architectural clarity delivered on our system left us thoroughly impressed. Workflows scale smoothly without any traditional bottlenecks.',
    rating: 5,
  },
  {
    name: 'Jessica Parker',
    role: 'Operations Technical Director',
    text: 'Brought an incredible layer of modular performance and architectural precision to our data infrastructure. Exceptionally thorough.',
    rating: 5,
  },
  {
    name: 'James Connor',
    role: 'Lead Platform Engineer',
    text: 'Exceptional mastery of backend concurrency principles and system architecture. Complex data streams handled perfectly.',
    rating: 5,
  },
]

function TestimonialsAndFooter() {
  const [activeIdx, setActiveIdx] = useState(0)
  const ref = useRef(null)

  // 3D tilt
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [3, -3])
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-3, 3])
  
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

  // Auto-play the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Testimonials Card */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative bg-[#0d0d14] border border-white/[0.04] rounded-2xl p-6 md:p-8 hover:border-emerald-500/20 transition-all duration-300 glow-card group cursor-default overflow-hidden"
      >
        {/* Spotlight */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${spotlightX}px ${spotlightY}px,
                rgba(16, 185, 129, 0.08),
                transparent 80%
              )
            `,
          }}
        />

        <div className="relative z-10 flex flex-col justify-between min-h-[180px]">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase mb-6 block">
              // Client Endorsements
            </span>

            {/* Slider Container with AnimatePresence */}
            <div className="relative overflow-hidden w-full min-h-[100px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-4 w-full"
                >
                  <div className="flex gap-0.5">
                    {[...Array(testimonials[activeIdx].rating)].map((_, i) => (
                      <span key={i} className="text-emerald-400 text-xs">★</span>
                    ))}
                  </div>
                  <p className="text-sm md:text-base text-zinc-300 italic leading-relaxed font-sans font-light">
                    "{testimonials[activeIdx].text}"
                  </p>
                  <div>
                    <p className="text-sm font-bold text-white font-display">{testimonials[activeIdx].name}</p>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">{testimonials[activeIdx].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dots Navigation indicators */}
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/[0.04]">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className="relative w-7 h-2 rounded-full cursor-pointer transition-all duration-300"
              >
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${activeIdx === idx ? 'bg-emerald-400 opacity-100' : 'bg-white/10'}`} />
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modern Bento Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0d0d14] border border-white/[0.04] rounded-2xl px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-xs text-zinc-400 font-mono">
            © 2026 Parbat Sunuwar. Engineered in Kathmandu, NP.
          </p>
        </div>
        
        {/* Glowing Brand Social Links */}
        <div className="flex gap-4">
          {[
            { name: 'GitHub', url: 'https://github.com', hoverColor: 'hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]' },
            { name: 'LinkedIn', url: 'https://linkedin.com', hoverColor: 'hover:text-blue-400 hover:shadow-[0_0_15px_rgba(96,165,250,0.25)]' },
            { name: 'Twitter', url: 'https://twitter.com', hoverColor: 'hover:text-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.25)]' }
          ].map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              className={`text-xs text-zinc-500 font-mono bg-white/[0.02] border border-white/[0.04] px-3 py-1.5 rounded-lg transition-all duration-300 ${social.hoverColor}`}
            >
              {social.name}
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestimonialsAndFooter