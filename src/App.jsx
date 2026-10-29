import { useEffect } from 'react'
import { Navigate, Routes, Route, useLocation } from 'react-router-dom'

import ProfessionalSide from './pages/ProfessionalSide'

function App() {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname])

  return (
    <div className="bg-[#0a0a0f]">
        <Routes>
          <Route path="/" element={<ProfessionalSide />} />
          <Route path="/personal" element={<Navigate to="/" replace />} />
        </Routes>
    </div>
  )
}

export default App
