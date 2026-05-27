import { motion } from 'framer-motion' // Make sure this line is here!

function AboutCard() {
  return (
    <motion.div 
      whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.12)' }}
      transition={{ duration: 0.3 }}
      className="w-full h-full bg-[#0e0e12] border border-white/[0.07] rounded-[12px] p-6 flex flex-col justify-between min-h-[200px] transition-colors"
    >
      <div>
        <span className="text-xs font-bold tracking-[0.16em] uppercase text-zinc-500 block mb-4">
          About
        </span>

        <p className="text-sm text-zinc-400 leading-relaxed font-normal antialiased">
          Hey, I'm <span className="text-zinc-100 font-medium">Parbat</span> — a full-stack engineer and designer. I specialize in building resilient backend architectures, fluid interactive applications, and clean data systems.
        </p>
      </div>

      <div className="flex items-center gap-6 mt-6 pt-5 border-t border-white/[0.05]">
        {[
          { n: '3+',  l: 'Years Exp' },
          { n: '12+', l: 'Builds' },
          { n: '5+',  l: 'Clients'  },
        ].map(({ n, l }) => (
          <div key={l} className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-zinc-100 leading-none">
              {n}
            </span>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-500 mt-1">
              {l}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default AboutCard