// ExperienceCard.jsx
import { motion } from 'framer-motion'

function ExperienceCard() {
  return (
    <motion.div
      whileHover={{ borderColor: 'rgba(255,255,255,0.13)' }}
      className="w-full h-full bg-[#0e0e12] border border-white/[0.07] rounded-[10px] p-5 flex flex-col justify-between min-h-[180px]"
    >
      <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-zinc-600">
        Experience
      </span>

      {/* Timeline */}
      <div className="flex gap-3 mt-4 flex-1">
        <div className="flex flex-col items-center">
          <div className="w-[7px] h-[7px] rounded-full bg-zinc-100 flex-shrink-0 mt-0.5" />
          <div className="w-px bg-white/[0.07] flex-grow mt-1" />
        </div>
        <div className="flex flex-col gap-1 pb-2">
          <span className="text-[12px] font-bold tracking-[-0.01em] text-zinc-200 leading-tight">
            Software Engineer Intern
          </span>
          <span className="text-[9px] font-medium text-zinc-600">
            Development Team Lead
          </span>
          <span className="text-[9px] font-semibold tracking-[0.08em] text-zinc-700 mt-0.5">
            2025 – Present
          </span>

          <ul className="mt-3 space-y-1.5 list-none">
            {[
              'Designed decoupled backend services with persistent data layers.',
              'Built AI-driven NLP pipelines for document processing.',
              'Managed source repos, branching strategy, and CI integrations.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-zinc-700 mt-0.5 text-[10px]">—</span>
                <span className="text-[9.5px] text-zinc-500 leading-relaxed font-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.05]">
        {['React', '.NET', 'Django', 'PostgreSQL', 'Git'].map((t) => (
          <span
            key={t}
            className="text-[8.5px] font-medium text-zinc-500 bg-white/[0.04] border border-white/[0.07] rounded-[5px] px-2 py-1"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default ExperienceCard