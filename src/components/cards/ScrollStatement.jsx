import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const words = 'Behind every simple experience is a thoughtfully built system.'.split(' ')

function Word({ children, progress, index, total }) {
  const reduced = useReducedMotion()
  const color = useTransform(
    progress,
    [index / total, (index + 1) / total],
    ['#c3c3c9', '#1d1d1f'],
  )

  return (
    <motion.span style={{ color: reduced ? '#1d1d1f' : color }}>{children} </motion.span>
  )
}

export default function ScrollStatement() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 40%'] })

  return (
    <div className="scroll-statement portfolio-shell" ref={ref}>
      <p className="eyebrow">How I think about the work</p>
      <p className="statement-text">
        {words.map((word, index) => (
          <Word
            key={`${word}-${index}`}
            progress={scrollYProgress}
            index={index}
            total={words.length}
          >
            {word}
          </Word>
        ))}
      </p>
      <span className="statement-signature">That’s the part I love building.</span>
    </div>
  )
}
