// pages/PersonalSide.jsx - Fixed with NavCard

import { motion } from 'framer-motion'
import NavCard from '../components/cards/NavCard'  // ← ADD THIS IMPORT

function ConstructionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050508] via-[#0a0a15] to-[#050508] flex flex-col items-center justify-center px-4 relative">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-transparent blur-[120px] -top-64 -left-64" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-l from-indigo-500/5 via-purple-500/5 to-transparent blur-[120px] -bottom-64 -right-64" />
      </div>

      {/* NavCard at top */}
      <div className="absolute top-8 left-0 right-0 flex justify-center z-20">
        <NavCard />
      </div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-2xl"
      >
        {/* Animated construction icon */}
        <motion.div 
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-7xl mb-8"
        >
          🚧
        </motion.div>

        {/* Main text */}
        <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-4">
          Under Construction
        </h1>
        
        <p className="text-xl text-zinc-400 mb-3 font-mono">
          Coming soon!
        </p>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-mono text-emerald-400">IN PROGRESS</span>
        </div>

        <p className="text-sm text-zinc-500 font-mono max-w-md mx-auto">
          I'm currently working on this page. Check back soon for my personal blog, creative projects, and more!
        </p>

        {/* Decorative dots */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500/40 animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 rounded-full bg-emerald-500/40 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 rounded-full bg-emerald-500/40 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Link back to professional side */}
        <a 
          href="/"
          className="inline-flex items-center gap-2 mt-8 text-sm font-mono text-zinc-500 hover:text-emerald-400 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Portfolio
        </a>
      </motion.div>
    </div>
  )
}

export default ConstructionPage