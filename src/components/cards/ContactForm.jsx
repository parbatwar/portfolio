import { useRef, useState } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'

function ContactForm() {
  const ref = useRef(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const spotlightX = useMotionValue(-999)
  const spotlightY = useMotionValue(-999)
  
  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      spotlightX.set(e.clientX - rect.left)
      spotlightY.set(e.clientY - rect.top)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    const formData = new FormData(e.target)
    
    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        e.target.reset()
        setTimeout(() => setIsSubmitted(false), 3000)
      } else {
        const data = await response.json()
        if (data.errors) {
          setError(data.errors.map(err => err.message).join(', '))
        } else {
          setError('Something went wrong. Please try again.')
        }
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { spotlightX.set(-999); spotlightY.set(-999) }}
      className="w-full h-full bg-[#0d0d14] border border-white/[0.04] rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300 group relative overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${spotlightX}px ${spotlightY}px,
              rgba(16, 185, 129, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6">
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block mb-2">
            Send a Message
          </span>
          <h3 className="text-xl font-bold text-white">Get in Touch</h3>
          <p className="text-xs text-zinc-400 mt-1">I'll get back to you within 24 hours</p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
          <div>
            <label className="text-xs font-mono text-zinc-500 mb-1 block">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 bg-white/[0.02] border border-white/[0.06] rounded-lg text-sm text-white focus:border-emerald-500/50 focus:outline-none transition-all"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-500 mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 bg-white/[0.02] border border-white/[0.06] rounded-lg text-sm text-white focus:border-emerald-500/50 focus:outline-none transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-500 mb-1 block">Message</label>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full px-4 py-2 bg-white/[0.02] border border-white/[0.06] rounded-lg text-sm text-white focus:border-emerald-500/50 focus:outline-none transition-all resize-none"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 text-white font-semibold text-sm rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Send Message'}
            {!isLoading && <span>→</span>}
          </button>

          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-emerald-400 text-sm py-2"
            >
              ✓ Message sent successfully! I'll get back to you soon.
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-red-400 text-sm py-2"
            >
              {error}
            </motion.div>
          )}
        </form>
      </div>
    </motion.div>
  )
}

export default ContactForm