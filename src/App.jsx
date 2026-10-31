import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import ProfessionalSide from './pages/ProfessionalSide'
import PersonalSide from './pages/PersonalSide'

function App() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div>
      <Routes>
        <Route path="/" element={<ProfessionalSide />} />
        <Route path="/personal" element={<PersonalSide />} />
      </Routes>
    </div>
  )
}

export default App
