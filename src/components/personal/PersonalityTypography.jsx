import { useRef, useSyncExternalStore } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { personal } from '../../data/personalCompact'
import './personalityTypography.css'

// Art-directed coordinates: left %, top %, type size, initial angle.
// No random values or time-based animation: each frame is a pure function of scroll.
const premiumLayout = {
  Quiet:[6,23,90,0], Reserved:[25,17,16,0], Hopeful:[76,25,40,0],
  Curious:[20,40,245,0], Observant:[7,52,18,0], Calm:[85,54,32,0],
  Private:[62,17,14,0], Thoughtful:[45,27,20,0], Restless:[9,69,26,0],
  Patient:[84,40,15,0], Dreamer:[76,68,47,0], Introverted:[30,73,15,0],
  Playful:[88,89,17,0], 'Soft-spoken':[6,92,16,0],
  Overthinker:[45,18,23,0], Warm:[60,70,18,0], Grounded:[38,91,14,0],
  Growing:[9,83,48,0], Learning:[69,34,16,0], Becoming:[51,81,94,0],
  Searching:[8,42,14,0], Uncertain:[44,68,14,0],
}

// Fewer words, deliberately re-composed rather than shrinking the desktop canvas.
const mobileLayout = {
  Quiet:[7,23,51,0], Reserved:[66,21,12,0], Hopeful:[62,33,23,0],
  Curious:[4,44,98,0], Observant:[8,38,12,0], Calm:[75,65,24,0],
  Thoughtful:[38,29,13,0], Restless:[6,68,22,0],
  Dreamer:[51,75,29,0], 'Soft-spoken':[8,95,12,0],
  Grounded:[66,94,12,0], Growing:[7,82,29,0], Becoming:[27,87,48,0],
  Learning:[48,63,12,0], Uncertain:[10,60,12,0],
}

function subscribeViewport(callback) {
  const mobile = window.matchMedia('(max-width: 600px)')
  const tablet = window.matchMedia('(max-width: 900px)')
  mobile.addEventListener('change', callback)
  tablet.addEventListener('change', callback)
  return () => { mobile.removeEventListener('change', callback); tablet.removeEventListener('change', callback) }
}
function viewportSnapshot() {
  return window.matchMedia('(max-width: 600px)').matches ? 'mobile' : window.matchMedia('(max-width: 900px)').matches ? 'tablet' : 'desktop'
}

const connections = [
  ['Quiet','Reserved'], ['Reserved','Overthinker'], ['Overthinker','Private'],
  ['Private','Hopeful'], ['Reserved','Thoughtful'], ['Thoughtful','Learning'],
  ['Learning','Patient'], ['Patient','Calm'], ['Calm','Dreamer'],
  ['Observant','Restless'], ['Restless','Growing'], ['Growing','Grounded'],
  ['Grounded','Becoming'], ['Becoming','Playful'], ['Dreamer','Playful'],
  ['Uncertain','Warm'], ['Warm','Dreamer'], ['Searching','Observant'],
]

function Constellation({positions, words, progress, reduced}) {
  const opacity = useTransform(progress, [0,0.08,0.3], [1,1,0])
  const available = new Set(words)
  return <motion.svg className="pc-identity-constellation" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true" style={{opacity:reduced ? 1 : opacity}}>
    {connections.map(([from,to]) => {
      if(!available.has(from) || !available.has(to))return null
      const a=positions[from], b=positions[to]
      return <line key={`${from}-${to}`} x1={a[0]*10-9} y1={a[1]*10-6} x2={b[0]*10-9} y2={b[1]*10-6} vectorEffect="non-scaling-stroke" />
    })}
    {words.map(word => <ellipse key={word} cx={positions[word][0]*10-9} cy={positions[word][1]*10-6} rx="1.15" ry="1.6" />)}
  </motion.svg>
}

function DriftingWord({ word, index, position, progress, compact, reduced }) {
  const [left, top, size, angle] = position
  const linger = ['Growing','Becoming','Curious'].includes(word)
  const delay = 0.08 + (index % 7) * 0.018
  const strength = compact ? 0.48 : 1
  const dx = ((index * 37) % 83 - 41) * strength
  const dy = ((index * 53) % 97 - 48) * strength
  const turn = ((index * 29) % 91 - 45) * (compact ? 0.4 : 0.7)
  const fadeStart = linger ? 0.82 : 0.42 + (index % 6) * 0.045
  const fadeEnd = linger ? 0.985 : fadeStart + 0.2
  const restingOpacity = size > 60 ? 1 : size > 30 ? 0.8 : 0.48 + (index % 3) * 0.07
  const displace = value => {
    const t = Math.max(0, Math.min(1, (value - delay) / (0.95 - delay)))
    return t * t // Slow initial slip, then wider separation; exactly reversible.
  }
  const x = useTransform(progress, value => `${dx * displace(value)}vw`)
  const y = useTransform(progress, value => `${dy * displace(value)}svh`)
  const rotate = useTransform(progress, value => angle + turn * displace(value))
  const scale = useTransform(progress, value => 1 + ((index % 5) - 2) * 0.09 * displace(value))
  const opacity = useTransform(progress, [0,fadeStart,fadeEnd,1], [restingOpacity,restingOpacity,0,0])
  // Only selected small words get mild blur; no layout-affecting letter spacing.
  const filter = useTransform(progress, [0,0.35,0.8], ['blur(0px)','blur(0px)',`blur(${index % 11 === 0 && size < 45 ? 1.4 : 0}px)`])
  return <motion.span className="pc-identity-word" style={{
    left:`${left}%`,top:`${top}%`,'--word-size':size,
    fontWeight: size > 60 ? 600 : size > 30 ? 500 : 400,
    ...(reduced ? {rotate:angle,opacity:restingOpacity} : {x,y,rotate,scale,opacity,filter:index % 11 === 0 && size < 45 ? filter : undefined}),
  }}>{word}</motion.span>
}

export default function PersonalityTypography() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const viewport = useSyncExternalStore(subscribeViewport, viewportSnapshot, () => 'desktop')
  const {scrollYProgress} = useScroll({target:ref,offset:['start 76px','end end']})
  const positions=viewport==='mobile'?mobileLayout:premiumLayout
  const visibleWords=personal.personality.words.filter((word,index)=>positions[word] && (viewport!=='tablet'||index<=31||['Growing','Becoming'].includes(word)))
  return <section ref={ref} id="personality" className={`pc-identity ${reduced ? 'pc-identity-static' : ''}`} aria-labelledby="pc-personality-title">
    <div className="pc-identity-stage"><div className="pc-wrap pc-identity-inner">
      <header className="pc-identity-heading"><p className="pc-label">{personal.personality.label}</p><h2 id="pc-personality-title" className="pc-identity-readable">{personal.personality.title}</h2></header>
      <div className="pc-identity-canvas" aria-hidden="true">
        <Constellation positions={positions} words={visibleWords} progress={scrollYProgress} reduced={reduced}/>
        {personal.personality.words.map((word,index) => {
          const mobilePosition = mobileLayout[word]
          if (!premiumLayout[word]) return null
          if (viewport === 'mobile' && !mobilePosition) return null
          if (viewport === 'tablet' && index > 31 && !['Growing','Becoming'].includes(word)) return null
          return <DriftingWord key={`${word}-${index}`} word={word} index={index} position={viewport === 'mobile' ? mobilePosition : premiumLayout[word]} progress={scrollYProgress} compact={viewport !== 'desktop'} reduced={reduced}/>
        })}
      </div>
      <p className="pc-identity-readable">{personal.personality.words.join(', ')}.</p>
    </div></div>
  </section>
}
