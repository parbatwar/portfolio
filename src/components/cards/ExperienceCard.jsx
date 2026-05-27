import { motion } from 'framer-motion'

function ExperienceCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-zinc-900 border border-white/10 rounded-3xl p-6 h-full flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-6">
          Experience
        </h3>

        {/* Core Timeline Item */}
        <div className="relative pl-4 border-l border-white/10">
          <div className="absolute w-2 h-2 bg-white rounded-full -left-[4.5px] top-1.5" />
          
          <div className="flex flex-wrap items-baseline justify-between gap-x-2 mb-1">
            <h4 className="text-lg font-bold text-zinc-100">Software Engineer Intern</h4>
            <span className="text-xs text-zinc-500 font-medium">2025 - Present</span>
          </div>
          
          <p className="text-sm font-medium text-zinc-400 mb-4">
            Development Team Lead
          </p>

          {/* Highlights of technical domain competencies inside your internship */}
          <div className="space-y-2 mt-4">
            <div className="text-xs text-zinc-500 font-semibold tracking-wider uppercase mb-2">
              Key Contributions
            </div>
            <ul className="text-xs text-zinc-400 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li>Designed and decoupled architectural backend services utilizing persistent data layers.</li>
              <li>Engineered AI-driven natural language parsing and text-analysis pipelines for document processing.</li>
              <li>Managed core project source repositories, repository branch mapping, and code integrations.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tech Stack micro tags at the bottom */}
      <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
        {['React', '.NET', 'Django', 'PostgreSQL', 'Git'].map((tech) => (
          <span 
            key={tech} 
            className="text-[10px] tracking-wider text-zinc-400 bg-zinc-950 border border-white/5 px-2 py-1 rounded-md"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default ExperienceCard