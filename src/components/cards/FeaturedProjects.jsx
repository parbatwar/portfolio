import { motion } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'One HRMS',
    category: 'Full Stack · MVT Architecture',
    description: 'A server-side rendered Human Resource Management System handling core organizational workflows with enterprise template engine architecture.',
    tags: ['Django', 'Python', 'PostgreSQL', 'Tailwind'],
    image: '/kitsilano-mock.jpg',
  },
  {
    id: 2,
    title: 'GearUP Portal',
    category: 'Backend Architecture · Web API',
    description: 'A high-performance vehicle parts storefront built around clean decoupling principles, repository patterns, and persistent data layers.',
    tags: ['React', '.NET Core', 'PostgreSQL', 'Clean Arch'],
    image: '/iphone-mock.jpg',
  },
  {
    id: 3,
    title: 'Nexus Core API',
    category: 'Distributed Services',
    description: 'High-throughput microservices for secure, low-latency API client data routing.',
    tags: ['Go', 'Redis', 'Docker', 'gRPC'],
    image: '/nexus-mock.jpg',
  },
  {
    id: 4,
    title: 'GearUP Mobile',
    category: 'Cross-Platform App',
    description: 'Reactive mobile experience for fluid vehicle ecosystem tracking and management.',
    tags: ['React Native', 'TypeScript', 'Zustand'],
    image: '/mobile-mock.jpg',
  },
]

function ProjectTag({ label }) {
  return (
    <span className="text-[8.5px] font-medium text-zinc-500 bg-white/[0.04] border border-white/[0.07] rounded-[5px] px-2 py-1">
      {label}
    </span>
  )
}

function LargeProjectCard({ project }) {
  return (
    <motion.div
      whileHover={{ borderColor: 'rgba(255,255,255,0.13)', y: -2 }}
      transition={{ duration: 0.2 }}
      className="w-full h-full bg-[#0e0e12] border border-white/[0.07] rounded-[10px] overflow-hidden flex flex-col cursor-pointer group"
    >
      {/* Image */}
      <div className="w-full aspect-[16/10] bg-[#141418] overflow-hidden relative flex-shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 
                     group-hover:scale-[1.02] transition-all duration-500"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between flex-1 gap-3">
        <div>
          <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-zinc-600 block mb-1">
            {project.category}
          </span>
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-bold tracking-[-0.02em] text-zinc-100">
              {project.title}
            </h3>
            <span className="text-zinc-700 text-xs group-hover:text-zinc-400 
                             group-hover:translate-x-0.5 group-hover:-translate-y-0.5 
                             transition-all">↗</span>
          </div>
          <p className="text-[10px] text-zinc-500 leading-relaxed font-light mt-1.5">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => <ProjectTag key={t} label={t} />)}
        </div>
      </div>
    </motion.div>
  )
}

function SmallProjectCard({ project }) {
  return (
    <motion.div
      whileHover={{ borderColor: 'rgba(255,255,255,0.13)', y: -2 }}
      transition={{ duration: 0.2 }}
      className="w-full bg-[#0e0e12] border border-white/[0.07] rounded-[10px] p-4 flex gap-3 items-start cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="w-[46px] h-[46px] rounded-[8px] bg-[#141418] overflow-hidden flex-shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-90 
                     group-hover:scale-[1.05] transition-all duration-500"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className="text-[8.5px] font-semibold tracking-[0.12em] uppercase text-zinc-600 block mb-0.5">
          {project.category}
        </span>
        <div className="flex items-center justify-between gap-1">
          <h3 className="text-[12px] font-bold tracking-[-0.01em] text-zinc-200 truncate">
            {project.title}
          </h3>
          <span className="text-zinc-700 text-[10px] flex-shrink-0 group-hover:text-zinc-400
                           group-hover:translate-x-0.5 group-hover:-translate-y-0.5 
                           transition-all">↗</span>
        </div>
        <p className="text-[9px] text-zinc-500 leading-relaxed font-light mt-1 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {project.tags.map((t) => <ProjectTag key={t} label={t} />)}
        </div>
      </div>
    </motion.div>
  )
}

function FeaturedProjects() {
  return (
    <div className="bg-[#0e0e12] border border-white/[0.07] rounded-[10px] p-5">

      {/* Header */}
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="text-[18px] font-black tracking-[-0.03em] text-zinc-100 italic">
          Featured Work
        </h2>
        <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-zinc-600">
          {projects.length} Builds
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">

        {/* Large — project 1 */}
        <div className="md:col-span-4 flex">
          <LargeProjectCard project={projects[0]} />
        </div>

        {/* Large — project 2 */}
        <div className="md:col-span-4 flex">
          <LargeProjectCard project={projects[1]} />
        </div>

        {/* Small stacked — projects 3 & 4 */}
        <div className="md:col-span-4 flex flex-col gap-3">
          <SmallProjectCard project={projects[2]} />
          <SmallProjectCard project={projects[3]} />
        </div>

      </div>
    </div>
  )
}

export default FeaturedProjects