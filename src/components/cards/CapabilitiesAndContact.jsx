import { motion } from 'framer-motion'
import { useState } from 'react'

const capabilities = [
  {
    num: '①',
    title: 'Web / App Design',
    desc: 'User-centered systems that blend structured technical layouts with fluid, intuitive interfaces across modern cross-platform devices.',
  },
  {
    num: '②',
    title: 'Full-Stack Architecture',
    desc: 'Deeply decoupled backend logic pipelines, persistent data repository patterns, and robust templates built for secure data handling.',
  },
  {
    num: '③',
    title: 'Systems Engineering',
    desc: 'AI-driven semantic text parsing pipelines, state engines, and custom microservice controllers optimized for processing performance.',
  },
]

function CapabilitiesAndContact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">

      {/* ── Col 1: Expertise ── */}
      <div className="md:col-span-4 bg-[#0e0e12] border border-white/[0.07] rounded-[10px] p-5 flex flex-col justify-between">
        <div>
          <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-zinc-600">
            Expertise
          </span>

          <div className="mt-4 flex flex-col">
            {capabilities.map((cap, i) => (
              <div
                key={cap.num}
                className={`py-4 ${i !== capabilities.length - 1 ? 'border-b border-white/[0.05]' : ''}`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[9px] font-mono text-zinc-700">{cap.num}</span>
                  <h3 className="text-[11px] font-bold tracking-[-0.01em] text-zinc-200">
                    {cap.title}
                  </h3>
                </div>
                <p className="text-[9.5px] text-zinc-500 leading-relaxed font-light pl-4">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer tags */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.05]">
          {['Django', '.NET', 'React', 'Postgres'].map((t) => (
            <span
              key={t}
              className="text-[8.5px] font-medium text-zinc-500 bg-white/[0.04] border border-white/[0.07] rounded-[5px] px-2 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Col 2: Contact Form ── */}
      <div className="md:col-span-4 flex flex-col gap-3">

        {/* Availability badge */}
        <div className="bg-[#0e0e12] border border-white/[0.07] rounded-[10px] px-4 py-3 flex items-center gap-2.5">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[9px] font-semibold tracking-[0.12em] uppercase text-zinc-400">
            Available for Freelance
          </span>
        </div>

        {/* Form */}
        <div className="bg-[#0e0e12] border border-white/[0.07] rounded-[10px] p-5 flex-1 flex flex-col">
          <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-zinc-600 mb-4">
            Get in Touch
          </span>

          {sent ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-400 text-sm">✓</span>
              </div>
              <p className="text-[11px] font-medium text-zinc-300">Message sent!</p>
              <p className="text-[9.5px] text-zinc-600">I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 flex-1">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-[7px] 
                           px-3 py-2.5 text-[10px] text-zinc-300 placeholder-zinc-700
                           focus:outline-none focus:border-white/[0.15] transition-all"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-[7px] 
                           px-3 py-2.5 text-[10px] text-zinc-300 placeholder-zinc-700
                           focus:outline-none focus:border-white/[0.15] transition-all"
              />
              <textarea
                rows={4}
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-[7px] 
                           px-3 py-2.5 text-[10px] text-zinc-300 placeholder-zinc-700
                           focus:outline-none focus:border-white/[0.15] transition-all resize-none flex-1"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-zinc-100 hover:bg-white text-zinc-950 text-[9px] font-bold 
                           uppercase tracking-[0.1em] py-2.5 rounded-[7px] transition-colors mt-1"
              >
                Send Message
              </motion.button>
            </form>
          )}
        </div>
      </div>

      {/* ── Col 3: Philosophy + Milestones ── */}
      <div className="md:col-span-4 flex flex-col gap-3">

        {/* Philosophy */}
        <div className="bg-[#0e0e12] border border-white/[0.07] rounded-[10px] p-5 flex-1 flex flex-col justify-between">
          <div>
            <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-zinc-600">
              Philosophy
            </span>
            <p className="text-[10.5px] text-zinc-400 font-light leading-[1.75] mt-3">
              Driven by a genuine passion for clean software design patterns and system
              architecture. Code isn't just logic — it's about engineering resilient
              systems that solve real production bottlenecks while scaling elegantly
              under load.
            </p>
          </div>
          <span className="text-[10px] font-light italic text-zinc-600 text-right mt-4 block">
            — Technical Focus
          </span>
        </div>

        {/* Milestones */}
        <div className="bg-[#0e0e12] border border-white/[0.07] rounded-[10px] p-5 flex-1">
          <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-zinc-600">
            Milestones
          </span>

          <div className="mt-4 flex flex-col">
            {[
              {
                title: 'Information Technology Systems',
                desc: 'Consistently building modular enterprise solutions and framework tooling.',
              },
              {
                title: 'Open Source & Project Leadership',
                desc: 'Managing sprints, orchestrating deployments, and repository pipelines.',
              },
            ].map((m, i) => (
              <div
                key={m.title}
                className={`py-3.5 ${i === 0 ? 'border-b border-white/[0.05]' : ''}`}
              >
                <h4 className="text-[11px] font-bold tracking-[-0.01em] text-zinc-300 mb-1">
                  {m.title}
                </h4>
                <p className="text-[9.5px] text-zinc-600 font-light leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default CapabilitiesAndContact