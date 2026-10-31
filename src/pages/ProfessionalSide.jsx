import { motion, MotionConfig, useReducedMotion } from 'framer-motion'
import NavCard from '../components/cards/NavCard'
import HeroScene from '../components/cards/HeroScene'
import AboutCard from '../components/cards/AboutCard'
import FeaturedProjects from '../components/cards/FeaturedProjects'
import WorkHistory from '../components/cards/WorkHistory'
import ContactScene from '../components/cards/ContactScene'
import './professional.css'
import './immersive.css'

function Reveal({ children, delay = 0 }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export default function ProfessionalSide() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="portfolio">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <NavCard />
        <main id="main-content">
          <HeroScene />
          <section
            id="about"
            className="portfolio-shell portfolio-section"
            aria-label="About me"
          >
            <Reveal>
              <AboutCard />
            </Reveal>
          </section>
          <section
            id="work"
            className="work-section portfolio-section"
            aria-label="Projects"
          >
            <div className="portfolio-shell">
              <Reveal>
                <FeaturedProjects />
              </Reveal>
            </div>
          </section>
          <WorkHistory />
          <ContactScene />
        </main>
      </div>
    </MotionConfig>
  )
}
