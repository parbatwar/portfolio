import { motion } from 'framer-motion'
import { info } from '../../data/info'

function ContactCard() {
  const { email, location, socials } = info
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-zinc-900 border border-white/10 rounded-3xl p-6 w-full h-full flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-6">
          Contact Details
        </h3>
        
        {/* Email Block */}
        <a
          href={`mailto:${email}`}
          className="group block p-4 bg-zinc-950 border border-white/5 rounded-2xl mb-6 hover:border-white/20 transition-all"
        >
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Direct Email</p>
          <p className="text-sm font-medium text-zinc-200 break-all group-hover:text-white transition-colors">
            {email}
          </p>
        </a>
        
        {/* Social Links Block */}
        <div className="space-y-3">
          <p className="text-xs text-zinc-500 uppercase tracking-wider">Profiles</p>
          
          <div className="flex flex-col gap-2">
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-zinc-950 border border-white/5 rounded-xl hover:border-white/15 transition-all text-sm text-zinc-300 hover:text-white"
              >
                <span className="font-medium">GitHub</span>
                <span className="text-xs text-zinc-600">↗</span>
              </a>
            )}
            
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-zinc-950 border border-white/5 rounded-xl hover:border-white/15 transition-all text-sm text-zinc-300 hover:text-white"
              >
                <span className="font-medium">LinkedIn</span>
                <span className="text-xs text-zinc-600">↗</span>
              </a>
            )}
            
            {socials.twitter && (
              <a
                href={socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-zinc-950 border border-white/5 rounded-xl hover:border-white/15 transition-all text-sm text-zinc-300 hover:text-white"
              >
                <span className="font-medium">Twitter</span>
                <span className="text-xs text-zinc-600">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Location footer block */}
      {location && (
        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
          <span className="tracking-wider uppercase">Location</span>
          <span className="text-zinc-400 font-medium">{location}</span>
        </div>
      )}
    </motion.div>
  )
}

export default ContactCard