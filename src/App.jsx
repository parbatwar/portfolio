import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import ProfessionalSide from './pages/ProfessionalSide'
import NavCard from './components/cards/NavCard'

function App() {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname])

  return (
    <div className="bg-[#0a0a0f]">
      <header className="sticky top-0 z-50 flex justify-center bg-[#050508]/90 px-3 py-4 backdrop-blur-xl">
        <NavCard />
      </header>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><ProfessionalSide /></PageWrapper>} />
          <Route path="/personal" element={<main aria-label="Personal" className="min-h-[calc(100svh-80px)] bg-[#050508]" />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

// a wrapper component to apply the same animation to all pages
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export default App
