import { motion } from 'framer-motion'

function FeaturedProjects() {
  const projects = [
    {
      id: 1,
      title: "One HRMS",
      category: "Full Stack Development / MVT Architecture",
      description: "A comprehensive, server-side rendered Human Resource Management System utilizing enterprise template engine architectures to handle core organizational workflows smoothly.",
      tags: ["Django", "Python", "PostgreSQL", "Tailwind CSS"],
      link: "#",
      image: "/kitsilano-mock.jpg" 
    },
    {
      id: 2,
      title: "GearUP Portal",
      category: "Backend Architecture & Web API",
      description: "A high-performance vehicle parts inventory storefront engineered around clean decoupling principles, repository patterns, and persistent data layers.",
      tags: ["React", ".NET Core", "PostgreSQL", "Clean Arch"],
      link: "#",
      image: "/iphone-mock.jpg" 
    },
    {
      id: 3,
      title: "Nexus Core API",
      category: "Distributed Services",
      description: "High-throughput microservices engineered for secure, low-latency API client data routing.",
      tags: ["Go", "Redis", "Docker", "gRPC"],
      link: "#",
      image: "/nexus-mock.jpg" 
    },
    {
      id: 4,
      title: "GearUP Mobile Companion",
      category: "Cross-Platform Application",
      description: "Reactive mobile experience built for fluid vehicle ecosystem tracking and management hooks.",
      tags: ["React Native", "TypeScript", "Zustand"],
      link: "#",
      image: "/mobile-mock.jpg" 
    }
  ]

  return (
    <div className="space-y-4 pt-4">
      
      {/* ================= FEATURED WORK TITLE BANNER ================= */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 bg-zinc-900 border border-white/10 rounded-3xl p-6 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold tracking-wider italic uppercase text-zinc-100">
            Featured Work
          </h2>
          <span className="text-xs tracking-widest text-zinc-500 uppercase font-semibold">
            Selected Builds ({projects.length})
          </span>
        </div>
      </div>

      {/* ================= REFINED MESH GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        
        {/* ---------------- COLUMN A: PROJECT 1 (LEFT SIDE) ---------------- */}
        {/* We use max-h to prevent the tall container stretch effect */}
        <div className="col-span-12 md:col-span-4 flex">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden flex flex-col w-full h-full justify-between group hover:border-white/20 transition-all cursor-pointer"
          >
            {/* Swapped aspect ratio to [16/10] and added a hard max-height container to stop vertical stretching */}
            <div className="w-full aspect-[16/10] md:max-h-[220px] bg-zinc-950 overflow-hidden relative flex items-center justify-center p-4 border-b border-white/5">
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-transparent to-zinc-950 opacity-60 z-0" />
              <img src={projects[0].image} alt={projects[0].title} className="w-full h-full object-cover rounded-xl shadow-2xl transform group-hover:scale-[1.01] transition-transform duration-500 z-10" onError={(e)=>{e.target.style.display='none'}} />
            </div>
            
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-medium tracking-wider text-zinc-500 uppercase block mb-0.5">{projects[0].category}</span>
                <h3 className="text-lg font-bold text-zinc-100 flex justify-between items-center">
                  {projects[0].title} <span className="text-xs text-zinc-500 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed mt-1">{projects[0].description}</p>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {projects[0].tags.map(t => <span key={t} className="text-[9px] font-mono text-zinc-400 bg-zinc-950 border border-white/5 px-2 py-0.5 rounded">{t}</span>)}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ---------------- COLUMN B: PROJECT 2 (CENTER SIDE) ---------------- */}
        <div className="col-span-12 md:col-span-4 flex">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden flex flex-col w-full h-full justify-between group hover:border-white/20 transition-all cursor-pointer"
          >
            {/* Locked this image height step down as well for symmetrical proportions */}
            <div className="w-full aspect-[16/10] md:max-h-[220px] bg-zinc-950 overflow-hidden relative flex items-center justify-center p-4 border-b border-white/5">
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-transparent to-zinc-950 opacity-60 z-0" />
              <img src={projects[1].image} alt={projects[1].title} className="w-full h-full object-cover rounded-xl shadow-2xl transform group-hover:scale-[1.01] transition-transform duration-500 z-10" onError={(e)=>{e.target.style.display='none'}} />
            </div>
            
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-medium tracking-wider text-zinc-500 uppercase block mb-0.5">{projects[1].category}</span>
                <h3 className="text-lg font-bold text-zinc-100 flex justify-between items-center">
                  {projects[1].title} <span className="text-xs text-zinc-500 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed mt-1">{projects[1].description}</p>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {projects[1].tags.map(t => <span key={t} className="text-[9px] font-mono text-zinc-400 bg-zinc-950 border border-white/5 px-2 py-0.5 rounded">{t}</span>)}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ---------------- COLUMN C: PROJECTS 3 & 4 (RIGHT SIDE STACKED) ---------------- */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
          {[projects[2], projects[3]].map((proj, i) => (
            <motion.div 
              key={proj.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="flex-1 bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all cursor-pointer p-5"
            >
              <div className="flex gap-4 items-start">
                <div className="w-16 h-16 rounded-xl bg-zinc-950 border border-white/5 overflow-hidden flex-shrink-0 relative flex items-center justify-center">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" onError={(e)=>{e.target.style.display='none'}} />
                </div>
                
                <div className="space-y-0.5 min-w-0 flex-1">
                  <span className="text-[9px] font-medium tracking-wider text-zinc-500 uppercase block">{proj.category}</span>
                  <h3 className="text-base font-bold text-zinc-100 flex justify-between items-center gap-1">
                    <span className="truncate">{proj.title}</span> 
                    <span className="text-xs text-zinc-500 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0">↗</span>
                  </h3>
                  <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed">{proj.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 pt-2">
                {proj.tags.map(t => <span key={t} className="text-[9px] font-mono text-zinc-400 bg-zinc-950 border border-white/5 px-2 py-0.5 rounded">{t}</span>)}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default FeaturedProjects