import { motion } from 'framer-motion'

const reviews = [
  {
    id: 1,
    name: 'David Rodriguez',
    role: 'Senior Project Architect',
    company: 'Enterprise Workflow Systems',
    text: 'The architectural clarity delivered on our system left us thoroughly impressed. Workflows scale smoothly under load without any traditional synchronization blocks.',
    initial: 'DR',
  },
  {
    id: 2,
    name: 'Jessica Parker',
    role: 'Operations Technical Director',
    company: 'Logistics Core Group',
    text: 'Brought an incredible layer of modular performance and architectural precision to our data storefront. Database routing overhead dropped significantly after optimization.',
    initial: 'JP',
  },
  {
    id: 3,
    name: 'James Connor',
    role: 'Lead Platform Engineer',
    company: 'Automotive Core Systems',
    text: 'Exceptional mastery of backend concurrency principles and repo isolation layers. Complex data streams are processed securely and handled exactly as specified.',
    initial: 'JC',
  },
]

const socials = [
  { label: 'fb',  href: '#' },
  { label: 'ln',  href: '#' },
  { label: 'git', href: '#' },
  { label: '𝕏',  href: '#' },
]

function TestimonialsAndFooter() {
  return (
    <div className="flex flex-col gap-3">

      {/* ── Testimonials ── */}
      <div className="bg-[#0e0e12] border border-white/[0.07] rounded-[10px] p-5">

        <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-zinc-600">
          Testimonials
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              whileHover={{ borderColor: 'rgba(255,255,255,0.12)' }}
              className="bg-white/[0.02] border border-white/[0.05] rounded-[8px] p-4 flex flex-col justify-between gap-4"
            >
              {/* Quote */}
              <p className="text-[10px] text-zinc-500 font-light leading-[1.75]">
                "{rev.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-2.5 pt-3 border-t border-white/[0.05]">
                <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-white/[0.07] flex items-center justify-center flex-shrink-0">
                  <span className="text-[8px] font-bold text-zinc-400">{rev.initial}</span>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[-0.01em] text-zinc-300 leading-tight">
                    {rev.name}
                  </p>
                  <p className="text-[8.5px] text-zinc-600 font-light mt-0.5">
                    {rev.role} · {rev.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch">

        {/* Copyright */}
        <div className="flex-1 bg-[#0e0e12] border border-white/[0.07] rounded-[10px] px-5 py-3.5 flex items-center">
          <p className="text-[9px] font-medium text-zinc-700 tracking-[0.04em]">
            © {new Date().getFullYear()} Parbat Sunuwar. Designed & engineered with care.
          </p>
        </div>

        {/* Socials */}
        <div className="bg-[#0e0e12] border border-white/[0.07] rounded-[10px] px-3 py-2.5 flex items-center gap-2">
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              whileHover={{ borderColor: 'rgba(255,255,255,0.18)', color: '#f0f0f5' }}
              className="w-8 h-8 rounded-[7px] bg-white/[0.03] border border-white/[0.06] 
                         flex items-center justify-center text-zinc-600 
                         text-[9px] font-semibold font-mono transition-colors"
            >
              {s.label}
            </motion.a>
          ))}
        </div>

      </div>
    </div>
  )
}

export default TestimonialsAndFooter