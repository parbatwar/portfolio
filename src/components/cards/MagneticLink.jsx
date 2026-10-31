import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

export default function MagneticLink({ href, download, className, label, children }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const offsetX = useMotionValue(0)
  const offsetY = useMotionValue(0)
  const x = useSpring(offsetX, { stiffness: 240, damping: 24 })
  const y = useSpring(offsetY, { stiffness: 240, damping: 24 })

  function move(event) {
    if (reduced || event.pointerType !== 'mouse') return
    const rect = ref.current.getBoundingClientRect()
    offsetX.set((event.clientX - rect.left - rect.width / 2) * 0.25)
    offsetY.set((event.clientY - rect.top - rect.height / 2) * 0.25)
  }

  function reset() {
    offsetX.set(0)
    offsetY.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      className={className}
      aria-label={label}
      style={{ x, y }}
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onBlur={reset}
    >
      {children}
    </motion.a>
  )
}
