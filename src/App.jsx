import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

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
        <Routes>
          <Route path="/" element={<ProfessionalSide />} />
          <Route path="/personal" element={<PersonalPage />} />
        </Routes>
    </div>
  )
}

function PersonalPage() {
  return (
    <main aria-label="Personal" className="min-h-[calc(100svh-80px)] bg-[#050508] px-6 py-20 text-white">
      <section className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#0d0d14] p-8 sm:p-12">
        <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">Beyond the work</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight">A little more personal.</h1>
        <p className="mt-5 text-sm leading-relaxed text-zinc-400">A small space for life outside of code. More soon.</p>
        <div aria-hidden="true" className="mt-10 h-px w-16 bg-emerald-400/60" />
      </section>
    </main>
  )
}

export default App
