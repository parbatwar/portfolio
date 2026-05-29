import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion'
import { projectsData } from '../../data/projects'

function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const ref = useRef(null)

  // Spotlight only
  const spotlightX = useMotionValue(-999)
  const spotlightY = useMotionValue(-999)
  
  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      spotlightX.set(e.clientX - rect.left)
      spotlightY.set(e.clientY - rect.top)
    }
  }

  const handleClose = () => {
    setSelectedProject(null)
  }

  return (
    <>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { spotlightX.set(-999); spotlightY.set(-999) }}
        className="w-full h-full bg-[#0d0d14] border border-white/[0.04] rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300 group cursor-default relative overflow-hidden"
      >
        {/* Spotlight Layer */}
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

        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block mb-1">
                Projects
              </span>
              <h2 className="text-2xl font-bold font-display text-white">Featured Projects</h2>
            </div>
            <span className="text-xs font-mono text-zinc-500 bg-white/[0.03] border border-white/[0.05] rounded-full px-3 py-1">
              {projectsData.length} Repos
            </span>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projectsData.map((project, idx) => (
              <motion.div
                key={project.title}
                onClick={() => setSelectedProject(project)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
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

      {/* Modal Popup */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop - instant fade */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-zoom-out"
            />
            
            {/* Modal - smooth scale and fade */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.2,
                ease: "easeOut"
              }}
              className="relative w-full max-w-xl bg-[#0c0c12] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl z-10 p-6 md:p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">{selectedProject.category}</span>
                  <h3 className="text-3xl font-extrabold text-white font-display mt-1">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={handleClose}
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
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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