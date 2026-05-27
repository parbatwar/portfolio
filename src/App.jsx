// src/App.jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import HeroCard from './components/cards/HeroCard'
import ContactCard from './components/cards/ContactCard'
import NavCard from './components/cards/NavCard'
import ProfilePictureCard from './components/cards/ProfilePictureCard'
import AboutCard from './components/cards/AboutCard'
import ExperienceCard from './components/cards/ExperienceCard'
import FeaturedProjects from './components/cards/FeaturedProjects'
import CapabilitiesAndContact from './components/cards/CapabilitiesAndContact'
import TestimonialsAndFooter from './components/cards/TestimonialsAndFooter'
import EmailMeCard from './components/cards/EmailMeCard'

function RevealRow({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: delay
      }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  return (
    <main className="min-h-screen bg-[#07070a] text-white relative overflow-hidden">

      {/* Ambient background orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#00ffa3] opacity-[0.055] blur-[120px] -top-32 -left-32" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#00e5c8] opacity-[0.045] blur-[100px] top-[35%] -right-24" />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-[#00c896] opacity-[0.04]  blur-[90px]  top-[70%] left-[10%]" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[#00ffa3] opacity-[0.035] blur-[80px]  top-[110%] right-[15%]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-5 space-y-3">

        {/* Nav */}
        <div className="relative z-50 w-full">
            <NavCard />
        </div>

        {/* Row 1 — Hero · Photo · Experience */}
        <div className="grid grid-cols-12 gap-3 items-stretch">
          <RevealRow delay={0.05} className="col-span-12 md:col-span-5 flex">
            <HeroCard />
          </RevealRow>
          <RevealRow delay={0.1} className="col-span-12 md:col-span-3 flex">
            <ProfilePictureCard />
          </RevealRow>
          <RevealRow delay={0.15} className="col-span-12 md:col-span-4 flex">
            <ExperienceCard />
          </RevealRow>
        </div>

        {/* Row 2 — About · Email Me · Contact */}
        <div className="grid grid-cols-12 gap-3 items-stretch">
          <RevealRow delay={0.05} className="col-span-12 md:col-span-4 flex">
            <AboutCard />
          </RevealRow>
          <RevealRow delay={0.1} className="col-span-12 md:col-span-4 flex">
            <EmailMeCard />
          </RevealRow>
          <RevealRow delay={0.15} className="col-span-12 md:col-span-4 flex">
            <ContactCard />
          </RevealRow>
        </div>

        {/* Featured Projects */}
        <RevealRow delay={0}>
          <FeaturedProjects />
        </RevealRow>

        {/* Capabilities */}
        <RevealRow delay={0}>
          <CapabilitiesAndContact />
        </RevealRow>

        {/* Testimonials + Footer */}
        <RevealRow delay={0}>
          <TestimonialsAndFooter />
        </RevealRow>

      </div>
    </main>
  )
}

export default App