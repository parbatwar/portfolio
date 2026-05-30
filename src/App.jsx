import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import ProfessionalSide from './pages/ProfessionalSide'
import ConstructionPage from './pages/ConstructionPage'

function App() {
  const location = useLocation()
  const isPersonal = location.pathname === '/personal'

  return (
    <div className={isPersonal ? 'bg-white' : 'bg-[#0a0a0f]'}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<ProfessionalSide />} />
          <Route path="/personal" element={<ConstructionPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App