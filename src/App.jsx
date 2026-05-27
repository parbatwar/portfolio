import HeroCard from './components/cards/HeroCard'
import ContactCard from './components/cards/ContactCard'
import NavCard from './components/cards/NavCard'
import ProfilePictureCard from './components/cards/ProfilePictureCard' 
import AboutCard from './components/cards/AboutCard'
import ExperienceCard from './components/cards/ExperienceCard'
import FeaturedProjects from './components/cards/FeaturedProjects'

function App() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Navigation Bar */}
        <NavCard />

        {/* Master Bento Layout Container */}
        <div className="space-y-4">
          
          {/* ================= ROW 1: TOP ROW (5-3-4 Split) ================= */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            
            {/* 1. HERO CARD (Left side: 5 cols) */}
            <div className="md:col-span-5 flex">
              <HeroCard />
            </div>

            {/* 2. PROFILE PICTURE (Middle side: 3 cols) */}
            <div className="md:col-span-3 flex">
              <ProfilePictureCard />
            </div>

            {/* 3. PREMIUM CONTACT CARD (Right side: 4 cols) */}
            <div className="md:col-span-4 flex">
              <ContactCard />
            </div>

          </div>

          {/* ================= ROW 2: STAGGERED BOTTOM ROW (6-2-4 Split) ================= */}
          {/* By changing this to a 6-2-4 split, the vertical lines break up naturally */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            
            {/* 4. ABOUT/BIO CARD (Expands to 6 cols, stealing space from Email Me) */}
            <div className="md:col-span-4 flex">
              <AboutCard />
            </div>

            {/* 5. EMAIL ME CARD (Narrows to 2 cols for a tight, sleek square-ish look) */}
            <div className="md:col-span-4 flex bg-zinc-900 border border-white/10 rounded-3xl p-6 flex-col justify-between group cursor-pointer hover:border-white/20 transition-all min-h-[180px]">
              <div className="flex justify-between items-start w-full">
                <p className="text-[11px] text-zinc-400 uppercase tracking-wider leading-tight">Wanna get<br />in touch?</p>
                <span className="text-sm text-zinc-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </div>
              <h3 className="text-xl font-bold tracking-wider uppercase mt-6">Email Me</h3>
            </div>

            {/* 6. EXPERIENCE CARD (Remains at 4 cols to stay flush under the contact card) */}
            <div className="md:col-span-4 flex">
              <ExperienceCard />
            </div>

          </div>

        </div>

        {/* ================= NEW WORK SHOWCASE SECTION ================= */}
        {/* 2. Invoking the component beneath your profile layouts natively */}
        <FeaturedProjects />
      </div>
    </main>
  )
}

export default App;