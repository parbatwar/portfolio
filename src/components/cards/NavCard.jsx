// components/cards/NavCard.jsx (removed the P logo)

import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

function NavCard() {
  const location = useLocation()
  const isWorkActive = location.pathname === '/' || location.pathname === ''
  const isPersonalActive = location.pathname === '/personal'

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      className="inline-flex items-center justify-between gap-5 rounded-full bg-[#0d0d14]/75 backdrop-blur-xl border border-white/[0.06] px-4 py-2 z-50 shadow-lg shadow-black/20"
      style={{ width: 'auto', margin: '0 auto' }}
    >
      {/* Nav Links with layoutId indicators - removed the P logo */}
      <div className="flex items-center gap-1 relative">
        <Link 
          to="/"
          className={`relative px-5 py-1.5 text-xs font-semibold font-mono rounded-full tracking-wide transition-colors duration-300 ${
            isWorkActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'
          }`}
        >
          {isWorkActive && (
            <motion.span
              layoutId="navActiveBubble"
              className="absolute inset-0 bg-white/[0.08] border border-white/[0.08] rounded-full -z-10"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          WORK
        </Link>
        <Link 
          to="/personal"
          className={`relative px-5 py-1.5 text-xs font-semibold font-mono rounded-full tracking-wide transition-colors duration-300 ${
            isPersonalActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'
          }`}
        >
          {isPersonalActive && (
            <motion.span
              layoutId="navActiveBubble"
              className="absolute inset-0 bg-white/[0.08] border border-white/[0.08] rounded-full -z-10"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          LIFE
        </Link>
      </div>
    </motion.nav>
  )
}

export default NavCard