import { motion } from 'framer-motion'

function TechStackCard({ stack }) {  // stack is an array from info.js
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-zinc-900 border border-white/10 rounded-3xl p-6"
    >
      <h3 className="text-xl font-bold mb-4">Tech Stack</h3>
      <div className="flex flex-wrap gap-2">
        {/* .map() loops through the array and returns JSX for each item */}
        {stack.map((tech, index) => (
          <span 
            key={index}  // React needs a unique key for each item in a list
            className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default TechStackCard