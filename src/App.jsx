import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import ProfessionalSide from './pages/ProfessionalSide'
import ConstructionPage from './pages/ConstructionPage'

function App() {
  const location = useLocation()

  return (
    <div className="bg-[#0a0a0f]">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><ProfessionalSide /></PageWrapper>} />
          <Route path="/personal" element={<PageWrapper><ConstructionPage /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

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