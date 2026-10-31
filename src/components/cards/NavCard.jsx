import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroData, navigationData } from '../../data/info'

export default function NavCard() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('intro')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    const sections = ['intro', ...navigationData.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-15% 0px -55% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <nav className="portfolio-shell nav-inner" aria-label="Main navigation">
        <a className="wordmark" href="#intro" onClick={() => setOpen(false)}>
          {heroData.firstName}
          <span>.</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="section-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close −' : 'Menu +'}
        </button>
        <div id="section-navigation" className={open ? 'nav-links is-open' : 'nav-links'}>
          {navigationData.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          {/* <Link to="/personal" onClick={() => setOpen(false)}>
            Beyond work ↗
          </Link> */}
        </div>
      </nav>
    </header>
  )
}
