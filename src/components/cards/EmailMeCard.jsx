// components/cards/EmailMeCard.jsx

import { motion } from 'framer-motion'

function EmailMeCard() {
  return (
    <motion.a
      href="mailto:hello@parbat.com"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="block w-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-500/40 transition-all group cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✉️</span>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Get in touch
          </span>
        </div>
        <span className="text-2xl text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
          →
        </span>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">Let's work together</h3>
      <p className="text-sm text-zinc-400">
        I'm always open to discussing new projects and opportunities.
      </p>
    </motion.a>
  )
}

export default EmailMeCard