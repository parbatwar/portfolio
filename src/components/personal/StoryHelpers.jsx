import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'
import { personalContent as content } from '../../data/personalContent'

export function Scene({ chapter, children, className = '', pinned = false }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const index = content.chapters.indexOf(chapter)
  const previous = content.chapters[Math.max(0, index - 1)].color
  const backgroundColor = useTransform(scrollYProgress, [0, 0.3, 1], [previous, chapter.color, chapter.color])
  return <motion.section ref={ref} id={chapter.id} aria-labelledby={`${chapter.id}-title`} className={`personal-scene ${pinned ? 'personal-pinned' : ''} ${className}`} style={{ backgroundColor: reduced ? chapter.color : backgroundColor, color: chapter.ink }}>
    {children}
  </motion.section>
}

export function Heading({ chapter, intro = false }) {
  const Tag = intro ? 'h1' : 'h2'
  const reduced = useReducedMotion()
  return <div className="personal-heading">
    <p className="personal-eyebrow">{chapter.label}</p>
    <Tag id={`${chapter.id}-title`}>
      {chapter.title.split('\n').map((line, index) => <motion.span key={line} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: index * 0.1 }}>{line}</motion.span>)}
    </Tag>
    {chapter.text && <p className="personal-lede">{chapter.text}</p>}
  </div>
}

export function Picture({ image, className = '', eager = false }) {
  const [failed, setFailed] = useState(false)
  return <figure className={`personal-picture ${className}`}>
    {image.src && !failed ? <img src={image.src} alt={image.alt} width="1200" height="1500" sizes="(max-width: 767px) 92vw, 50vw" loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} /> : <div className="personal-image-placeholder" role="img" aria-label={image.placeholder}><span className="personal-placeholder-mark" aria-hidden="true">＋</span><span>{image.placeholder}</span></div>}
  </figure>
}

export function ContentLink({ link }) {
  return link.href ? <a className="personal-link" href={link.href} target={link.href.startsWith('https:') ? '_blank' : undefined} rel={link.href.startsWith('https:') ? 'noopener noreferrer' : undefined}>{link.label}</a> : <span className="personal-link personal-todo">{link.label}<small>{link.placeholder}</small></span>
}

export function Shelf({ children, label }) {
  const ref = useRef(null)
  return <div className="personal-shelf-wrap">
    <div className="personal-shelf-controls"><span>{label}</span><div>
      <button aria-label={`${content.ui.previous}: ${label}`} onClick={() => ref.current?.scrollBy({left: -340, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'})}>←</button>
      <button aria-label={`${content.ui.next}: ${label}`} onClick={() => ref.current?.scrollBy({left: 340, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'})}>→</button>
    </div></div>
    <div ref={ref} className="personal-shelf" role="region" aria-label={label} tabIndex={0}>{children}</div>
  </div>
}

export function CursorGlow() {
  const reduced = useReducedMotion()
  const x = useMotionValue(-500), y = useMotionValue(-500)
  const smoothX = useSpring(x, { stiffness: 120, damping: 25 }), smoothY = useSpring(y, { stiffness: 120, damping: 25 })
  useEffect(() => {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const move = event => { x.set(event.clientX); y.set(event.clientY) }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [reduced, x, y])
  return reduced ? null : <motion.div className="personal-cursor" aria-hidden="true" style={{ x: smoothX, y: smoothY }} />
}
