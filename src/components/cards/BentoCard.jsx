// components/cards/BentoCard.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function BentoCard({ children, className = '', ...props }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  function handleMouseMove(e) {
    const { currentTarget, clientX, clientY } = e
    const { left, top } = currentTarget.getBoundingClientRect()
    setMousePos({ x: clientX - left, y: clientY - top })
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.13)' }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full h-full bg-[#0e0e12] border border-white/[0.07] rounded-[12px] p-5 overflow-hidden relative group transition-colors duration-300 ${className}`}
      {...props}
    >
      {/* ── Dynamic High-End Spotlight Layer ── */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300 z-0"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.045), transparent 80%)`,
        }}
      />

      {/* ── Card Content ── */}
      {/* We add relative z-10 so your buttons, texts, and links stay clickable above the spotlight layer */}
      <div className="relative z-10 h-full w-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  )
}