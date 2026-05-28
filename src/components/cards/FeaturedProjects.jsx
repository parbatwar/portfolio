// components/cards/FeaturedProjects.jsx

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'Data Sync ETL Engine',
    category: 'Data Pipeline',
    description: 'Automated Python-based ETL pipeline fetching financial APIs and loading cleaned records into Postgres.',
    longDescription: 'A multi-threaded data extraction and synchronization tool written in Python. Extracts real-time financial logging records from public REST endpoints, cleanses duplicate entries, handles rate limit exceptions, and loads formatted transaction data into indexed PostgreSQL database tables.',
    tags: ['Python', 'SQL', 'PostgreSQL', 'Git', 'Pandas'],
    gradient: 'from-blue-500/10 via-cyan-500/5 to-transparent',
    borderColor: 'group-hover:border-blue-500/30'
  },
  {
    id: 2,
    title: 'One HRMS Backend',
    category: 'Backend Portal',
    description: 'Full-stack employee management engine using Django MVT structure and automated session workflows.',
    longDescription: 'An administrative employee directory portal built with Django. Manages automated leave approvals, employee metadata storage, role-based user controls (RBAC), and session validation keys. Connected to a PostgreSQL DB storage layer for quick indexing.',
    tags: ['Django', 'Python', 'PostgreSQL', 'Docker'],
    gradient: 'from-purple-500/10 via-pink-500/5 to-transparent',
    borderColor: 'group-hover:border-purple-500/30'
  },
  {
    id: 3,
    title: 'Telemetry Log Gateway',
    category: 'FastAPI Service',
    description: 'Telemetry log routing API gateway managing token-bucket rate limiting and log syncs.',
    longDescription: 'A high-speed microservices gateway built using FastAPI. Manages rate limiting for client ingress log feeds, stores session validation tokens in Redis caches, and writes system status metadata directly into database systems with microsecond latency.',
    tags: ['FastAPI', 'Python', 'Redis', 'Docker'],
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    borderColor: 'group-hover:border-emerald-500/30'
  }
]

function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const ref = useRef(null)

  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [3, -3])
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-3, 3])
  
  const spotlightX = useMotionValue(0)
  const spotlightY = useMotionValue(0)
  
  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5)
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5)
    spotlightX.set(e.clientX - rect.left)
    spotlightY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="w-full h-full bg-[#0d0d14] border border-white/[0.04] rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300 glow-card group cursor-default"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${spotlightX}px ${spotlightY}px,
                rgba(16, 185, 129, 0.08),
                transparent 80%
              )
            `
          }}
        />

        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block mb-1">
                // Case Studies
              </span>
              <h2 className="text-2xl font-bold font-display text-white">Featured Projects</h2>
            </div>
            <span className="text-xs font-mono text-zinc-500 bg-white/[0.03] border border-white/[0.05] rounded-full px-3 py-1">
              3 Repos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                onClick={() => setSelectedProject(project)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-gradient-to-br ${project.gradient} border border-white/[0.04] rounded-xl p-5 hover:bg-white/[0.02] ${project.borderColor} transition-all cursor-pointer group/item flex flex-col justify-between h-full`}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] font-mono font-semibold text-emerald-400/90">{project.category}</span>
                    <span className="text-zinc-500 group-hover/item:text-emerald-400 group-hover/item:translate-x-1 transition-all duration-300">
                      →
                    </span>
                  </div>
                  
                  <h3 className="text-base font-bold text-white mb-2 font-display">{project.title}</h3>
                  <p className="text-xs text-zinc-400 mb-4 leading-relaxed">{project.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[9px] font-mono text-zinc-500 bg-white/[0.04] rounded px-1.5 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 cursor-zoom-out"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl bg-[#0c0c12] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl z-10 p-6 md:p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">{selectedProject.category}</span>
                  <h3 className="text-3xl font-extrabold text-white font-display mt-1">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer font-mono"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-6 mb-8">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {selectedProject.longDescription}
                </p>
                <div>
                  <h4 className="text-xs font-mono text-zinc-500 mb-2 uppercase tracking-widest">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono text-emerald-400 bg-emerald-400/5 border border-emerald-400/10 rounded-lg px-2.5 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 border-t border-white/[0.06] pt-6">
                <a 
                  href="#"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2"
                >
                  <span>View Code Source</span>
                  <span>→</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FeaturedProjects