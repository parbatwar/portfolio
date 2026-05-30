import { useRef } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { socialsData } from '../../data/info'
import { FaGithub, FaLinkedinIn, FaYoutube, FaInstagram, FaSoundcloud, FaFacebookF } from 'react-icons/fa'

function SocialsCard() {
  const ref = useRef(null)
  const spotlightX = useMotionValue(-999)
  const spotlightY = useMotionValue(-999)

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      spotlightX.set(e.clientX - rect.left)
      spotlightY.set(e.clientY - rect.top)
    }
  }

  const socialLinks = [
    { name: 'GitHub',      Icon: FaGithub,      url: socialsData.github,           color: '#ffffff', brandBg: 'rgba(255,255,255,0.03)', span: 'col-span-2' },
    { name: 'LinkedIn',    Icon: FaLinkedinIn,  url: socialsData.linkedin,         color: '#0077B5', brandBg: 'rgba(0,119,181,0.1)',    span: 'col-span-1' },
    { name: 'MaachaTime', Icon: FaYoutube,     url: socialsData.youtube,          color: '#FF0000', brandBg: 'rgba(255,0,0,0.1)',      span: 'col-span-1' },
    { name: 'parbat_war', Icon: FaInstagram,   url: socialsData.instagramPersonal,color: '#E1306C', brandBg: 'rgba(225,48,108,0.1)',   span: 'col-span-1' },
    { name: 'bythehill_', Icon: FaInstagram,   url: socialsData.instagramBrand,   color: '#FCAF45', brandBg: 'rgba(252,175,69,0.1)',   span: 'col-span-1' },
    { name: 'warbatmusic',Icon: FaSoundcloud,  url: socialsData.soundcloud,       color: '#FF5500', brandBg: 'rgba(255,85,0,0.1)',     span: 'col-span-1' },
    { name: 'Facebook',   Icon: FaFacebookF,   url: socialsData.facebook,         color: '#1877F2', brandBg: 'rgba(24,119,242,0.1)',   span: 'col-span-1' },
  ]

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
          background: useMotionTemplate`radial-gradient(300px circle at ${spotlightX}px ${spotlightY}px, rgba(16,185,129,0.05), transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block mb-1">Follow Me</span>
          <h3 className="text-xl font-bold text-white tracking-tight">Connect Channels</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Explore my creations across platforms.</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 my-auto">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/social flex items-center gap-3 p-3 bg-white/[0.01] border border-white/[0.04] rounded-xl transition-all duration-300 ease-out hover:-translate-y-0.5 ${social.span}`}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = social.color
                e.currentTarget.style.backgroundColor = social.brandBg
                e.currentTarget.style.boxShadow = `0 10px 20px -10px ${social.color}20`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-transform duration-300 group-hover/social:scale-110" style={{ color: social.color }}>
                <social.Icon />
              </div>
              <span className="text-xs font-medium text-zinc-400 group-hover/social:text-white transition-colors duration-200 truncate">
                {social.name}
              </span>
            </a>
          ))}
        </div>

        <div className="pt-3 border-t border-white/[0.03] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] text-zinc-500 font-mono">Inquiries open</span>
          </div>
          <a href={`mailto:${socialsData.email}`} className="text-[11px] font-mono text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1 group/mail">
            {socialsData.email}
            <span className="transition-transform group-hover/mail:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default SocialsCard