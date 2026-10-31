import { useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

export default function ProjectRow({ project, index }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 160, damping: 23 })
  const y = useSpring(pointerY, { stiffness: 160, damping: 23 })

  function move(event) {
    if (event.pointerType !== 'mouse' || reduced) return
    const rect = ref.current.getBoundingClientRect()
    pointerX.set(event.clientX - rect.left)
    pointerY.set(event.clientY - rect.top)
    setHovered(true)
  }

  return (
    <motion.article
      ref={ref}
      className="work-row"
      onPointerMove={move}
      onPointerLeave={() => setHovered(false)}
      initial={reduced ? false : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
    >
      <a
        href={project.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="work-row-link"
      >
        <span className="work-row-index">0{index + 1}</span>
        <h3>{project.title}</h3>
        <span className="work-row-category">{project.category}</span>
        <span className="work-row-arrow" aria-hidden="true">
          ↗
        </span>
      </a>
      <div className="work-row-bottom">
        <p>{project.description}</p>
        <details>
          <summary>
            Behind the build <span aria-hidden="true">+</span>
          </summary>
          <p>{project.longDescription}</p>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </details>
      </div>
      {!reduced && (
        <motion.span
          className="work-cursor"
          aria-hidden="true"
          style={{ x, y }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
        >
          View
          <br />
          project ↗
        </motion.span>
      )}
    </motion.article>
  )
}
