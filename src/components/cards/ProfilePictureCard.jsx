import { useRef } from 'react'
import { motion } from 'framer-motion'

function ProfilePictureCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative w-full h-full min-h-[360px] bg-[#0d0d14] border border-white/[0.04] rounded-2xl overflow-hidden group cursor-pointer"
    >
      {/* Image */}
      <img
        src="/Parbat.webp"
        alt="Parbat Sunuwar"
        fetchPriority="high"
        loading="eager"
        className="w-full h-full object-cover object-center absolute inset-0
                   brightness-75 group-hover:brightness-95
                   transition-all duration-300 ease-out"
      />
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/20 to-transparent z-10" />

    </motion.div>
  )
}

export default ProfilePictureCard