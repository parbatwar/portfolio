import { useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { heroData } from '../../data/info'
import MagneticLink from './MagneticLink'

export default function HeroScene() {
  const scene = useRef(null)
  const reduced = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const { scrollYProgress } = useScroll({
    target: scene,
    offset: ['start start', 'end start'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30 })
  const portraitY = useTransform(progress, [0, 1], ['0%', '14%'])
  const titleX = useTransform(progress, [0, 1], ['0%', '-12%'])

  return (
    <section id="intro" ref={scene} className="immersive-hero" aria-label="Introduction">
      <motion.div className="immersive-photo" style={{ y: reduced ? 0 : portraitY }}>
        <img
          src="/Parbat.webp"
          alt={heroData.name}
          width="800"
          height="1000"
          fetchPriority="high"
        />
      </motion.div>
      <motion.div
        className="immersive-role"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <span aria-hidden="true">↘</span>
        <p className="hero-tagline">
          {heroData.tagline.map((word) => (
            <span key={word}>{word}</span>
          ))}
        </p>
      </motion.div>
      <motion.div className="name-marquee" style={{ x: reduced ? 0 : titleX }}>
        <h1 className={paused || reduced ? 'name-track is-paused' : 'name-track'}>
          <span>{heroData.name} —&nbsp;</span>
          <span aria-hidden="true">{heroData.name} —&nbsp;</span>
        </h1>
      </motion.div>
      <div className="immersive-bottom">
        <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
        </button>
      </div>
      <MagneticLink
        href="/resume.pdf"
        download="Parbat_Sunuwar_CV.pdf"
        className="hero-orbit"
        label="Download my resume"
      >
        Download
        <br />
        resume <span aria-hidden="true">↓</span>
      </MagneticLink>
    </section>
  )
}
