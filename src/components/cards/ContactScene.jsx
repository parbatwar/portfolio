import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { heroData, socialsData } from '../../data/info'
import MagneticLink from './MagneticLink'
import ContactForm from './ContactForm'
import SocialsCard from './SocialsCard'

export default function ContactScene() {
  const section = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start end', 'start start'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30 })
  const curve = useTransform(progress, [0, 0.65], [1, 0])
  const rise = useTransform(progress, [0, 1], [45, 0])
  const orbit = useTransform(progress, [0, 1], ['-30%', '0%'])

  return (
    <section
      ref={section}
      id="contact"
      className="contact-scene"
      aria-labelledby="contact-title"
    >
      <motion.div
        aria-hidden="true"
        className="contact-curve"
        style={{ scaleY: reduced ? 0 : curve }}
      />
      <motion.div className="portfolio-shell" style={{ y: reduced ? 0 : rise }}>
        <p className="eyebrow">Have something in mind?</p>
        <h2 id="contact-title" className="contact-headline">
          Let’s make
          <br />
          <span>something matter.</span>
        </h2>
        <div className="contact-divider">
          <motion.div style={{ x: reduced ? 0 : orbit }}>
            <MagneticLink
              href={`mailto:${heroData.email}`}
              className="contact-orbit"
              label="Email Parbat"
            >
              Get in touch <span aria-hidden="true">↗</span>
            </MagneticLink>
          </motion.div>
        </div>
        <div className="contact-grid">
          <div className="contact-copy">
            <p>
              A project, an opportunity, or a good conversation. I’d love to hear from
              you.
            </p>
            <a className="contact-email" href={`mailto:${heroData.email}`}>
              {heroData.email} ↗
            </a>
            <SocialsCard />
          </div>
          <ContactForm />
        </div>
        <footer className="site-footer">
          <span>
            © {new Date().getFullYear()} {heroData.name}
          </span>
          <div>
            <a href={socialsData.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a href="#intro">Back to top ↑</a>
          </div>
        </footer>
      </motion.div>
    </section>
  )
}
