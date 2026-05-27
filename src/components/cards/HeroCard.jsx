import { motion } from 'framer-motion'

function HeroCard() {
  return (
    <motion.div
      whileHover={{ borderColor: 'rgba(255,255,255,0.13)' }}
      className="w-full bg-[#0e0e12] border border-white/[0.07] rounded-[10px] p-7 flex flex-col justify-between min-h-[280px]"
    >
      {/* Top — eyebrow */}
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-zinc-600">
          Full-Stack Developer · Nepal
        </span>
        <div className="inline-flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.07] rounded-full px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
          <span className="text-[9px] font-medium text-zinc-500">Open to work</span>
        </div>
      </div>

      {/* Bottom — name + tags */}
      <div>
        <h1 className="text-[52px] md:text-[60px] font-black leading-[0.95] tracking-[-0.04em] text-zinc-100 mb-5">
          Parbat<br />Sunuwar.
        </h1>

        <div className="flex flex-wrap gap-1.5">
          {['React', 'Django', '.NET', 'PostgreSQL'].map((t) => (
            <span
              key={t}
              className="text-[8.5px] font-medium text-zinc-500 bg-white/[0.04] border border-white/[0.07] rounded-[5px] px-2 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default HeroCard