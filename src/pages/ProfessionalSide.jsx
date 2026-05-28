// pages/ProfessionalSide.jsx

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'

// Imports
import NavCard from '../components/cards/NavCard'
import HeroCard from '../components/cards/HeroCard'
import AboutCard from '../components/cards/AboutCard'
import ProfilePictureCard from '../components/cards/ProfilePictureCard'
import TechStackCard from '../components/cards/TechStackCard'
import EducationCard from '../components/cards/EducationCard'
import ExperienceCard from '../components/cards/ExperienceCard'
import FeaturedProjects from '../components/cards/FeaturedProjects'
import SystemStatusCard from '../components/cards/SystemStatusCard'
import ResumeDownloadCard from '../components/cards/ResumeDownloadCard'
import FollowMeCard from '../components/cards/FollowMeCard'
import CapabilitiesAndContact from '../components/cards/CapabilitiesAndContact'

const SECTIONS = [
  { id: 'intro', label: 'Overview' },
  { id: 'about', label: 'Expertise' },
  { id: 'work', label: 'Projects' },
  { id: 'pipelines', label: 'Systems' },
  { id: 'contact', label: 'Contact' }
]

function ProfessionalSide() {
  const [activeSection, setActiveSection] = useState('intro')

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    }

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Standardized naming values across all shared motion contexts
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 18,
        mass: 0.8,
      }
    },
  }

  return (
    <div className="relative min-h-screen bg-[#050508] overflow-hidden pb-20 selection:bg-emerald-500/25 text-white">
      {/* Dynamic Cursor Spotlight Layer */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-45 mix-blend-screen"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              700px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.08) 0%,
              rgba(99, 102, 241, 0.04) 50%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Static Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute w-[700px] h-[700px] rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent blur-[160px] -top-64 -left-64" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-l from-indigo-500/10 via-purple-500/5 to-transparent blur-[140px] bottom-0 right-0" />
      </div>

      {/* Right Side Navigation */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6 items-end">
        {SECTIONS.map(({ id, label }) => {
          const isActive = activeSection === id
          return (
            <a
              key={id}
              href={`#${id}`}
              className="flex items-center gap-3 group relative cursor-pointer"
            >
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
                    layoutId="geminiNavActiveRing"
                    className="absolute w-4 h-4 rounded-full border border-emerald-400/50 shadow-[0_0_8px_rgba(52,211,153,0.2)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-emerald-400 scale-125'
                      : 'bg-zinc-600 group-hover:bg-zinc-300'
                  }`}
                />
              </div>
            </a>
          )
        })}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Navigation bar */}
        <div className="flex justify-center items-center mb-14">
          <NavCard />
        </div>

        {/* Master Bento Layout Structure */}
        <div className="space-y-6">
          
          {/* Section 1: Intro */}
          <motion.div 
            id="intro" 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch scroll-mt-28"
          >
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <HeroCard />
            </motion.div>
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <ProfilePictureCard />
            </motion.div>
          </motion.div>

          {/* Section 2: Bio & Tech Stack */}
          <motion.div 
            id="about" 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch scroll-mt-28"
          >
            <motion.div variants={itemVariants}>
              <AboutCard />
            </motion.div>
            <motion.div variants={itemVariants}>
              <TechStackCard />
            </motion.div>
            <motion.div variants={itemVariants}>
              <EducationCard />
            </motion.div>
          </motion.div>

          {/* Section 3: Experience & Featured Work */}
          <motion.div 
            id="work" 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch scroll-mt-28"
          >
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <ExperienceCard />
            </motion.div>
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <FeaturedProjects />
            </motion.div>
          </motion.div>

          {/* Section 4: Data Systems Monitor & Social/Resume */}
          <motion.div 
            id="pipelines" 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch scroll-mt-28"
          >
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <SystemStatusCard />
            </motion.div>
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <ResumeDownloadCard />
            </motion.div>
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <FollowMeCard />
            </motion.div>
          </motion.div>

          {/* Section 5: Capabilities & Contact Form */}
          <motion.div 
            id="contact" 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 gap-5 scroll-mt-28"
          >
            <motion.div variants={itemVariants}>
              <CapabilitiesAndContact />
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/[0.04] pt-8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <p className="text-[10px] text-zinc-500 font-mono">
              PARBAT SUNUWAR · BACKEND & DATA ENGINEERING · MMXXVI
            </p>
          </div>
          <p className="text-[10px] text-zinc-600 font-mono">
            BUILT WITH VITE + REACT + TAILWIND + FRAMER MOTION
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalSide