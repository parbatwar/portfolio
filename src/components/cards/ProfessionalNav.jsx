// components/cards/ProfessionalNav.jsx

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function ProfessionalNav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="inline-flex items-center justify-center gap-6 rounded-full bg-[#12121a]/80 backdrop-blur-xl border border-white/[0.06] px-6 py-2.5"
      style={{ width: 'auto', margin: '0 auto' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
          <span className="text-white text-xs font-bold">PS</span>
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-1">
        <Link 
          to="/"
          className="px-4 py-1.5 text-sm font-medium rounded-full text-white bg-white/10"
        >
          Work
        </Link>
        <Link 
          to="/personal"
          className="px-4 py-1.5 text-sm font-medium rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
        >
          Life
        </Link>
      </div>

      {/* Resume Button */}
      <motion.a
        href="/resume.pdf"
        download
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-black text-xs font-medium px-3 py-1.5 rounded-full hover:bg-gray-100 transition-all"
      >
        Resume
      </motion.a>
    </motion.nav>
  )
}

export default ProfessionalNav