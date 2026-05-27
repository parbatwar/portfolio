import { motion } from 'framer-motion'
import { info } from '../../data/info'

function ContactCard() {
  const { email, location, socials } = info

  return (
    <motion.div
      whileHover={{ borderColor: 'rgba(255,255,255,0.13)' }}
      className="w-full h-full bg-[#0e0e12] border border-white/[0.07] rounded-[10px] p-5 flex flex-col justify-between min-h-[280px]"
    >
      {/* Top */}
      <div>
        <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-zinc-600">
          Contact
        </span>

        {/* Email block */}
        <a
          href={`mailto:${email}`}
          className="group/email flex items-center justify-between mt-4 mb-3
                     bg-white/[0.03] border border-white/[0.06] rounded-[8px] 
                     px-3 py-2.5 hover:border-white/[0.12] transition-all"
        >
          <div>
            <p className="text-[8.5px] text-zinc-600 uppercase tracking-[0.1em] mb-0.5">
              Direct Email
            </p>
            <p className="text-[10.5px] font-medium text-zinc-300 group-hover/email:text-white transition-colors">
              {email}
            </p>
          </div>
          <span className="text-zinc-700 text-xs group-hover/email:text-zinc-400 
                           group-hover/email:translate-x-0.5 group-hover/email:-translate-y-0.5 
                           transition-all">↗</span>
        </a>

        {/* Social links */}
        <div className="flex flex-col gap-1.5">
          {[
            { label: 'GitHub',   href: socials?.github },
            { label: 'LinkedIn', href: socials?.linkedin },
            { label: 'Twitter',  href: socials?.twitter },
          ]
            .filter((s) => s.href)
            .map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between
                           bg-white/[0.03] border border-white/[0.06] rounded-[8px]
                           px-3 py-2 hover:border-white/[0.12] hover:bg-white/[0.05]
                           transition-all group/link"
              >
                <span className="text-[10px] font-medium text-zinc-400 group-hover/link:text-zinc-200 transition-colors">
                  {s.label}
                </span>
                <span className="text-[10px] text-zinc-700 group-hover/link:text-zinc-400
                                 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5
                                 transition-all">↗</span>
              </a>
            ))}
        </div>
      </div>

      {/* Footer — location */}
      {location && (
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.05] mt-4">
          <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-zinc-700">
            Location
          </span>
          <span className="text-[9px] font-medium text-zinc-500">{location}</span>
        </div>
      )}
    </motion.div>
  )
}

export default ContactCard