import { motion } from 'framer-motion'

function HeroCard() {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-900 border border-white/10 rounded-3xl p-8 w-full h-full flex flex-col justify-end min-h-[380px]"
    >
      <h1 className="text-6xl md:text-7xl font-bold leading-none tracking-tighter uppercase">
        Parbat <br /> Sunuwar
      </h1>
    </motion.div>
  )
}

export default HeroCard;