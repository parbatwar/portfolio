import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ExperienceCard from './ExperienceCard'

export default function WorkHistory() {
  const section = useRef(null)
  const [height, setHeight] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.borderBoxSize[0].blockSize)
    })
    observer.observe(section.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={section}
      id="experience"
      className="work-history portfolio-section"
      aria-labelledby="experience-title"
      style={{
        position: reduced ? 'relative' : 'sticky',
        top: reduced ? undefined : `min(70px, calc(100svh - ${height}px))`,
      }}
    >
      <motion.div
        className="portfolio-shell"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="section-heading">
          <p className="eyebrow">Where I’ve worked</p>
          <h2 className="section-title" id="experience-title">
            Always building.
            <br />
            Always learning.
          </h2>
        </div>
        <ExperienceCard />
      </motion.div>
    </section>
  )
}
