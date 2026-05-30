import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

const ProfessionalSide = lazy(() => import('./pages/ProfessionalSide'))
const ConstructionPage = lazy(() => import('./pages/ConstructionPage'))

function App() {
  const location = useLocation()
  const isPersonal = location.pathname === '/personal'

  return (
    <div className={isPersonal ? 'bg-white' : 'bg-[#0a0a0f]'}>
      <AnimatePresence mode="wait">
        <Suspense fallback={
          <div className="fixed inset-0 bg-[#050508] flex items-center justify-center">
            <div style={{ display: 'flex', gap: '8px' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#10b981',
                  animation: `bounce 1.2s ${i * 0.2}s infinite ease-in-out`
                }} />
              ))}
            </div>
            <style>{`
              @keyframes bounce {
                0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
                40% { transform: scale(1); opacity: 1; }
              }
            `}</style>
          </div>
        }>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<ProfessionalSide />} />
            <Route path="personal" element={<ConstructionPage />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  )
}

export default App