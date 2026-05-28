// components/cards/ContactCard.jsx (updated with socials)

import { motion } from 'framer-motion'

function ContactCard() {
  const socials = [
    { name: 'GitHub', icon: '🐙', href: '#' },
    { name: 'LinkedIn', icon: '🔗', href: '#' },
    { name: 'Discord', icon: '💬', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'Facebook', icon: '📘', href: '#' },
  ]

  return (
    <motion.div
      whileHover={{ borderColor: 'rgba(255,255,255,0.13)' }}
      className="w-full h-full bg-[#0e0e12] border border-white/[0.07] rounded-[10px] p-5 flex flex-col justify-between min-h-[280px]"
    >
      <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-zinc-600">
        Connect
      </span>

      <a
        href="mailto:hello@parbat.com"
        className="block bg-white/[0.03] border border-white/[0.06] rounded-[8px] px-3 py-2 mb-3 hover:border-white/[0.12] transition-all"
      >
        <p className="text-[8px] text-zinc-600">Email</p>
        <p className="text-[10px] text-zinc-300">hello@parbat.com</p>
      </a>

      <div className="grid grid-cols-2 gap-1.5">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] rounded-[6px] px-2 py-1.5 hover:border-white/[0.12] transition-all"
          >
            <span className="text-[11px]">{social.icon}</span>
            <span className="text-[8px] text-zinc-400">{social.name}</span>
          </a>
        ))}
      </div>
    </motion.div>
  )
}

export default ContactCard