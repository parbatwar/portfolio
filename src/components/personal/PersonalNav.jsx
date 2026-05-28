// components/personal/PersonalNav.jsx

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function PersonalNav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">PS</span>
          </div>
          <span className="text-xs font-serif text-white/60 tracking-wide">Parbat</span>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-white/20" />

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          <Link 
            to="/"
            className="px-3 py-1 text-xs font-serif rounded-full text-white/50 hover:text-white/90 transition-all"
          >
            Work
          </Link>
          <Link 
            to="/personal"
            className="px-3 py-1 text-xs font-serif rounded-full text-white bg-white/10"
          >
            Life
          </Link>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-white/20" />

        {/* Back to top / act indicator */}
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-[9px] font-serif text-white/40">VI</span>
        </div>
      </div>
    </motion.nav>
  )
}

export default PersonalNav