// components/cards/FollowMeCard.jsx (updated with more socials, no emojis)

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion'

function FollowMeCard() {
  const ref = useRef(null)
  
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-6, 6])
  
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

  const socialLinks = [
    { name: 'GitHub', handle: '@parbatsunuwar', url: 'https://github.com' },
    { name: 'LinkedIn', handle: '/in/parbat-sunuwar', url: 'https://linkedin.com' },
    { name: 'Twitter / X', handle: '@parbatsunuwar', url: 'https://twitter.com' },
    { name: 'Instagram', handle: '@parbat.sunuwar', url: 'https://instagram.com' },
    { name: 'Facebook', handle: '/parbat.sunuwar', url: 'https://facebook.com' },
    { name: 'Discord', handle: 'parbat._', url: 'https://discord.com' }
  ]

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
          // Digital Channels
        </span>
        <h3 className="text-xl font-bold font-display text-white mb-4">Connect everywhere</h3>

        {/* Social links grid - 2 columns for cleaner layout */}
        <div className="grid grid-cols-2 gap-2">
          {socialLinks.map((social, idx) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ x: 2, scale: 1.02 }}
              className="flex justify-between items-center p-2.5 border border-white/[0.03] bg-white/[0.01] rounded-xl hover:border-white/[0.1] hover:bg-white/[0.03] transition-all group/item"
            >
              <div>
                <p className="text-xs font-semibold text-white font-display">{social.name}</p>
                <p className="text-[8px] text-zinc-500 font-mono mt-0.5">{social.handle}</p>
              </div>
              <span className="text-xs text-zinc-600 group-hover/item:text-emerald-400 transition-colors">→</span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default FollowMeCard