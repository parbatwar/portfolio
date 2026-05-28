// components/cards/ProfilePictureCard.jsx

import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

function ProfilePictureCard() {
  const ref = useRef(null)
  
  // 3D Tilt rotation
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-10, 10])

  // Subtly shift background image for parallax effect
  const imgTranslateX = useTransform(tiltX, [-0.5, 0.5], [-8, 8])
  const imgTranslateY = useTransform(tiltY, [-0.5, 0.5], [-8, 8])
  
  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    const relativeX = (e.clientX - rect.left) / width - 0.5
    const relativeY = (e.clientY - rect.top) / height - 0.5
    tiltX.set(relativeX)
    tiltY.set(relativeY)
  }

  const handleMouseLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
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
      className="relative w-full h-full min-h-[360px] bg-[#0d0d14] border border-white/[0.04] rounded-2xl overflow-hidden group cursor-pointer"
    >
      {/* Parallax Image */}
      <motion.img
        src="/bhattay_dai.jpg"
        alt="Parbat Sunuwar"
        style={{
          x: imgTranslateX,
          y: imgTranslateY,
          scale: 1.1, // Zoomed in slightly to allow safe translate borders
        }}
        className="w-full h-full object-cover object-center absolute inset-0
                   brightness-75 group-hover:brightness-95
                   transition-all duration-300 ease-out"
      />
      
      {/* Ambient shading layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/20 to-transparent z-10" />
      
      {/* Sci-Fi Camera Reticle Elements on Hover */}
      <div className="absolute inset-4 border border-white/[0.03] group-hover:border-emerald-500/10 pointer-events-none rounded-lg z-20 transition-colors duration-500">
        {/* Corner marks */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/20 group-hover:border-emerald-500/40 transition-colors duration-500" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/20 group-hover:border-emerald-500/40 transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/20 group-hover:border-emerald-500/40 transition-colors duration-500" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/20 group-hover:border-emerald-500/40 transition-colors duration-500" />
      </div>

      {/* Profile Details & Metadata */}
      <div 
        className="absolute bottom-6 left-6 right-6 z-20 flex flex-col gap-2"
        style={{ transform: 'translateZ(30px)' }}
      >
        <div className="flex justify-between items-end">
          <div>
            <div className="bg-black/60 border border-white/[0.08] backdrop-blur-md rounded-lg px-3 py-1 inline-block mb-1">
              <span className="text-xs font-semibold text-white tracking-wide font-display">Parbat Sunuwar</span>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded border border-white/[0.04] w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span>Full-Stack & Systems</span>
            </div>
          </div>

          <div className="text-right font-mono text-[9px] text-zinc-500 bg-black/40 px-2 py-1 rounded border border-white/[0.04]">
            <p>LAT: 27.7172° N</p>
            <p>LON: 85.3240° E</p>
          </div>
        </div>
      </div>

      {/* Scanline laser animation when hovered */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2.5s_linear_infinite] z-20" />
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>
    </motion.div>
  )
}

export default ProfilePictureCard