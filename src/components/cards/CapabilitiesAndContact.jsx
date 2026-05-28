// components/cards/CapabilitiesAndContact.jsx

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion'

const capabilities = [
  {
    icon: '🎨',
    title: 'Web / App Design',
    description: 'User-centered systems that blend technical layout grids with highly fluid, interactive user experiences.',
  },
  {
    icon: '⚙️',
    title: 'Full-Stack Architecture',
    description: 'Decoupled API endpoints, persistent query caching layers, and high-performance PostgreSQL query design.',
  },
  {
    icon: '🤖',
    title: 'Systems Engineering',
    description: 'Automated workflow pipelines, Docker microservice orchestration, and AI model server integration.',
  },
]

function CapabilitiesAndContact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [focusedField, setFocusedField] = useState(null)
  const [status, setStatus] = useState('idle') // idle | submitting | success
  
  const refCap = useRef(null)
  const refForm = useRef(null)

  // 3D tilt for Capabilities
  const tiltCapX = useMotionValue(0)
  const tiltCapY = useMotionValue(0)
  const rotateCapX = useTransform(tiltCapY, [-0.5, 0.5], [4, -4])
  const rotateCapY = useTransform(tiltCapX, [-0.5, 0.5], [-4, 4])
  const spotCapX = useMotionValue(0)
  const spotCapY = useMotionValue(0)

  // 3D tilt for Form
  const tiltFormX = useMotionValue(0)
  const tiltFormY = useMotionValue(0)
  const rotateFormX = useTransform(tiltFormY, [-0.5, 0.5], [4, -4])
  const rotateFormY = useTransform(tiltFormX, [-0.5, 0.5], [-4, 4])
  const spotFormX = useMotionValue(0)
  const spotFormY = useMotionValue(0)

  const handleMouseMoveCap = (e) => {
    if (!refCap.current) return
    const rect = refCap.current.getBoundingClientRect()
    tiltCapX.set((e.clientX - rect.left) / rect.width - 0.5)
    tiltCapY.set((e.clientY - rect.top) / rect.height - 0.5)
    spotCapX.set(e.clientX - rect.left)
    spotCapY.set(e.clientY - rect.top)
  }

  const handleMouseLeaveCap = () => {
    tiltCapX.set(0)
    tiltCapY.set(0)
  }

  const handleMouseMoveForm = (e) => {
    if (!refForm.current) return
    const rect = refForm.current.getBoundingClientRect()
    tiltFormX.set((e.clientX - rect.left) / rect.width - 0.5)
    tiltFormY.set((e.clientY - rect.top) / rect.height - 0.5)
    spotFormX.set(e.clientX - rect.left)
    spotFormY.set(e.clientY - rect.top)
  }

  const handleMouseLeaveForm = () => {
    tiltFormX.set(0)
    tiltFormY.set(0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('submitting')
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    }, 1500)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Capabilities / Expertise (Span 2) */}
      <motion.div
        ref={refCap}
        onMouseMove={handleMouseMoveCap}
        onMouseLeave={handleMouseLeaveCap}
        style={{
          rotateX: rotateCapX,
          rotateY: rotateCapY,
          transformStyle: 'preserve-3d',
        }}
        className="lg:col-span-2 bg-[#0d0d14] border border-white/[0.04] rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300 glow-card group cursor-default flex flex-col justify-between"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                250px circle at ${spotCapX}px ${spotCapY}px,
                rgba(16, 185, 129, 0.08),
                transparent 80%
              )
            `,
          }}
        />

        <div style={{ transform: 'translateZ(10px)' }}>
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase mb-4 block">
            // Core Expertise
          </span>
          
          <div className="space-y-6 mt-4">
            {capabilities.map((cap) => (
              <div key={cap.title} className="space-y-2 group/item">
                <div className="flex items-center gap-3">
                  <span className="text-xl p-2 bg-white/[0.02] border border-white/[0.04] rounded-lg group-hover/item:bg-emerald-500/10 group-hover/item:border-emerald-500/25 transition-all duration-300">
                    {cap.icon}
                  </span>
                  <h3 className="text-sm font-bold text-white font-display group-hover/item:text-emerald-400 transition-colors">
                    {cap.title}
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 pl-11 leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mini Stack Footnote */}
        <div 
          className="flex flex-wrap gap-1.5 mt-6 pt-5 border-t border-white/[0.04]"
          style={{ transform: 'translateZ(15px)' }}
        >
          {['DevOps', 'REST API', 'SPA', 'Relational DB'].map((tech) => (
            <span key={tech} className="text-[9px] font-mono text-zinc-500 bg-white/[0.02] border border-white/[0.04] rounded px-2 py-0.5">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Contact Form (Span 3) */}
      <motion.div
        ref={refForm}
        onMouseMove={handleMouseMoveForm}
        onMouseLeave={handleMouseLeaveForm}
        style={{
          rotateX: rotateFormX,
          rotateY: rotateFormY,
          transformStyle: 'preserve-3d',
        }}
        className="lg:col-span-3 bg-[#0d0d14] border border-white/[0.04] rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300 glow-card group/form cursor-default"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover/form:opacity-100 transition duration-300"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${spotFormX}px ${spotFormY}px,
                rgba(16, 185, 129, 0.08),
                transparent 80%
              )
            `,
          }}
        />

        <div style={{ transform: 'translateZ(10px)' }}>
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase mb-4 block">
            // Secure Dispatch
          </span>
          <h3 className="text-2xl font-bold font-display text-white mb-6">Send a Message</h3>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10"
            >
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mb-4 text-emerald-400">
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10 }}
                  className="text-3xl font-bold"
                >
                  ✓
                </motion.span>
              </div>
              <h3 className="text-lg font-bold text-white font-display mb-1">Message Dispatched!</h3>
              <p className="text-xs text-zinc-400 text-center font-mono">I'll respond within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  placeholder=" "
                  value={formData.name}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="peer w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder-transparent focus:border-emerald-500/50 focus:bg-emerald-500/[0.01] focus:outline-none transition-all"
                  required
                  disabled={status === 'submitting'}
                />
                <label className="absolute left-4 top-3 text-xs text-zinc-500 font-mono pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-emerald-400 peer-focus:bg-[#0d0d14] peer-focus:px-1.5 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-emerald-400 peer-[:not(:placeholder-shown)]:bg-[#0d0d14] peer-[:not(:placeholder-shown)]:px-1.5">
                  Your name
                </label>
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  placeholder=" "
                  value={formData.email}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="peer w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder-transparent focus:border-emerald-500/50 focus:bg-emerald-500/[0.01] focus:outline-none transition-all"
                  required
                  disabled={status === 'submitting'}
                />
                <label className="absolute left-4 top-3 text-xs text-zinc-500 font-mono pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-emerald-400 peer-focus:bg-[#0d0d14] peer-focus:px-1.5 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-emerald-400 peer-[:not(:placeholder-shown)]:bg-[#0d0d14] peer-[:not(:placeholder-shown)]:px-1.5">
                  Email address
                </label>
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  rows={4}
                  placeholder=" "
                  value={formData.message}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="peer w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder-transparent focus:border-emerald-500/50 focus:bg-emerald-500/[0.01] focus:outline-none transition-all resize-none"
                  required
                  disabled={status === 'submitting'}
                />
                <label className="absolute left-4 top-3 text-xs text-zinc-500 font-mono pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-emerald-400 peer-focus:bg-[#0d0d14] peer-focus:px-1.5 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-emerald-400 peer-[:not(:placeholder-shown)]:bg-[#0d0d14] peer-[:not(:placeholder-shown)]:px-1.5">
                  Describe your project...
                </label>
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-emerald-500/20 transition-all cursor-pointer font-mono text-sm relative overflow-hidden"
              >
                {status === 'submitting' ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>TRANSMITTING...</span>
                  </div>
                ) : (
                  <span>DISPATCH SIGNAL</span>
                )}
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default CapabilitiesAndContact