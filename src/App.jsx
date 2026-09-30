import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import ProfessionalSide from './pages/ProfessionalSide'
import NavCard from './components/cards/NavCard'
const PersonalSide = lazy(() => import('./pages/PersonalSide'))

function App() {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname])

  return (
    <div className="bg-[#0a0a0f]">
      <header className="sticky top-0 z-50 flex justify-center bg-[#050508]/90 px-3 py-4 backdrop-blur-xl">
        <NavCard />
      </header>
        <Routes>
          <Route path="/" element={<ProfessionalSide />} />
          <Route path="/personal" element={<Suspense fallback={<main className="min-h-screen" aria-busy="true" />}><PersonalSide /></Suspense>} />
        </Routes>
    </div>
  )
}

export default App
