import { useEffect, useState } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'

import NavCard from '../components/cards/NavCard'
import HeroCard from '../components/cards/HeroCard'
import AboutCard from '../components/cards/AboutCard' 
import ProfilePictureCard from '../components/cards/ProfilePictureCard'
import TechStackCard from '../components/cards/TechStackCard'
import EducationCard from '../components/cards/EducationCard'
import ExperienceCard from '../components/cards/ExperienceCard'
import FeaturedProjects from '../components/cards/FeaturedProjects'
import SocialsCard from '../components/cards/SocialsCard'
import ContactForm from '../components/cards/ContactForm'
import { socialsData } from '../data/info'

const SECTIONS = [
  { id: 'intro',   label: 'Overview'  },
  { id: 'about',   label: 'Expertise' },
  { id: 'work',    label: 'Projects'  },
  { id: 'contact', label: 'Contact'   },
]

// ─── Optimized Card Animation Variant ──────────────────────────────────────────
const cardVariant = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 45,
      damping: 14,    
      mass: 0.8,
    },
  },
}

function AnimatedCard({ className, children }) {
  return (
    <motion.div
      className={`${className} transform-gpu will-change-transform`} 
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      {children}
    </motion.div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────
function ProfessionalSide() {
  const [activeSection, setActiveSection] = useState('intro')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { root: null, rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen bg-[#050508] overflow-hidden selection:bg-emerald-500/25 text-white transform-gpu">

      {/* Soft corner glows - fully static */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[140px] -top-48 -left-48" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px] bottom-0 right-0" />
      </div>

      {/* Gentle center spotlight - converted to an elegant static design layer */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(600px circle at 50% 25%, rgba(16,185,129,0.04) 0%, transparent 100%)'
        }}
      />

      {/* Right-side nav */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6 items-end">
        {SECTIONS.map(({ id, label }) => {
          const isActive = activeSection === id
          return (
            <a key={id} href={`#${id}`} className="flex items-center gap-3 group relative cursor-pointer">
              <span
                className={`font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 bg-black/80 border border-white/[0.06] rounded backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-x-2 group-hover:translate-x-0 ${
                  isActive ? 'text-emerald-400 border-emerald-500/20' : 'text-zinc-500'
                }`}
              >
                {label}
              </span>
              <div className="relative w-4 h-4 flex items-center justify-center">
                {isActive && (
                  <motion.div
                    layoutId="navActiveRing"
                    className="absolute w-4 h-4 rounded-full border border-emerald-400/50 shadow-[0_0_8px_rgba(52,211,153,0.2)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-emerald-400 scale-125' : 'bg-zinc-600 group-hover:bg-zinc-300'
                  }`}
                />
              </div>
            </a>
          )
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="flex justify-center items-center mb-14">
          <NavCard />
        </div>

        <div className="space-y-6">

          {/* Section 1 — Intro */}
          <div
            id="intro"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch scroll-mt-28"
          >
            <AnimatedCard className="md:col-span-2">
              <HeroCard />
            </AnimatedCard>
            <AnimatedCard className="md:col-span-2 lg:col-span-1">
              <ProfilePictureCard />
            </AnimatedCard>
          </div>

          {/* Section 2 — About */}
          <div
            id="about"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch scroll-mt-28"
          >
            <AnimatedCard className="md:col-span-1">
              <AboutCard />
            </AnimatedCard>
            <AnimatedCard className="md:col-span-1">
              <TechStackCard />
            </AnimatedCard>
            <AnimatedCard className="md:col-span-2 lg:col-span-1">
              <EducationCard />
            </AnimatedCard>
          </div>

          {/* Section 3 — Work */}
          <div
            id="work"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch scroll-mt-28"
          >
            <AnimatedCard className="md:col-span-2 lg:col-span-1">
              <ExperienceCard />
            </AnimatedCard>
            <AnimatedCard className="md:col-span-2">
              <FeaturedProjects />
            </AnimatedCard>
          </div>

          {/* Section 4 — Contact */}
          <div
            id="contact"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch scroll-mt-28"
          >
            <AnimatedCard className="md:col-span-2">
              <ContactForm />
            </AnimatedCard>
            <AnimatedCard className="md:col-span-2 lg:col-span-1">
              <SocialsCard />
            </AnimatedCard>
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[10px] text-zinc-500 font-mono">
              © {new Date().getFullYear()} PARBAT SUNUWAR
            </span>
            <div className="flex items-center gap-4">
              <a href="/resume.pdf" download="Parbat_Sunuwar_CV.pdf"
                className="text-[10px] font-mono text-zinc-500 hover:text-emerald-400 transition-colors flex items-center gap-1">
                Resume
              </a>
              <a href={socialsData.github} target="_blank" rel="noopener noreferrer"
                className="text-[10px] font-mono text-zinc-500 hover:text-emerald-400 transition-colors">
                GitHub
              </a>
              <a href={socialsData.linkedin} target="_blank" rel="noopener noreferrer"
                className="text-[10px] font-mono text-zinc-500 hover:text-emerald-400 transition-colors">
                LinkedIn
              </a>
              <a href={`mailto:${socialsData.email}`}
                className="text-[10px] font-mono text-zinc-500 hover:text-emerald-400 transition-colors">
                Email
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default ProfessionalSide