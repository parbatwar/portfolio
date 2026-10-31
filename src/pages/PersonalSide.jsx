import { useEffect, useState } from 'react'
import { motion, MotionConfig, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { personalData } from '../data/personal'
import './personal.css'

function Keepsake({ id }) {
  if (id === 'listening') {
    return (
      <div className="desk-vinyl">
        <div className="vinyl-label">
          <span>ON REPEAT</span>
          <strong>P.</strong>
          <span>SIDE A / SPOTIFY</span>
        </div>
      </div>
    )
  }
  if (id === 'films') {
    return (
      <div className="desk-ticket">
        <div className="ticket-main">
          <span>ADMIT ONE / LETTERBOXD</span>
          <strong>
            After the
            <br />
            credits.
          </strong>
          <span>PARBAT’S WATCHLIST</span>
        </div>
        <div className="ticket-stub">
          <span>SEAT</span>
          <strong>01</strong>
          <div className="ticket-barcode" />
        </div>
      </div>
    )
  }
  if (id === 'vlogs') {
    return (
      <div className="desk-video">
        <div className="video-top">
          <span>MAACHA PRODUCTIONS</span>
          <span>REC ●</span>
        </div>
        <div className="video-screen">
          <span className="video-play">▶</span>
          <strong>
            Life,
            <br />
            recorded.
          </strong>
        </div>
        <div className="video-bottom">
          <span>OUTSIDE THE FRAME</span>
          <span>↗</span>
        </div>
      </div>
    )
  }
  if (id === 'making') {
    return (
      <div className="desk-tape">
        <div className="tape-label">
          <span>WARBAT MUSIC</span>
          <strong>Made by me.</strong>
          <div className="tape-reels">
            <i />
            <span />
            <i />
          </div>
        </div>
        <div className="tape-bottom">
          <span>A</span>
          <span>ORIGINAL SOUNDS</span>
          <span>♫</span>
        </div>
      </div>
    )
  }
  return (
    <div className="desk-photo">
      <img src="/Parbat.webp" width="800" height="1000" alt="" loading="lazy" />
      <span>the bits in between. ↗</span>
    </div>
  )
}

export default function PersonalSide() {
  const [activeId, setActiveId] = useState(null)
  const reduced = useReducedMotion()
  const active = personalData.interests.find((interest) => interest.id === activeId)

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Parbat Sunuwar | Beyond work'
    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="personal-page">
        <a className="skip-link" href="#personal-content">
          Skip to content
        </a>
        <header className="personal-nav">
          <Link to="/" className="wordmark">
            Parbat.
          </Link>
          <Link to="/">Back to work ↗</Link>
        </header>
        <main id="personal-content" className="personal-room">
          <div className="personal-intro">
            <div>
              <p className="personal-label">BEYOND WORK</p>
              <h1>
                A few things
                <br />
                that feel like <em>me.</em>
              </h1>
            </div>
            <p>
              Less of a bio.
              <br />
              More of a collection.
              <br />
              <span>Pick something up ↘</span>
            </p>
          </div>
          <div className="personal-desk" aria-label="My personal collection">
            <span className="desk-scribble" aria-hidden="true">
              a little of everything.
            </span>
            {personalData.interests.map((interest, index) => (
              <motion.article
                key={interest.id}
                className={`desk-item desk-item-${interest.id}`}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: reduced ? 0 : index * 0.06 }}
                onPointerEnter={() => setActiveId(interest.id)}
                onPointerLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(interest.id)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget))
                    setActiveId(null)
                }}
              >
                <a
                  className="keepsake-link"
                  href={interest.links[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${interest.links[0].label} (opens in a new tab)`}
                >
                  <div className="keepsake-art" aria-hidden="true">
                    <Keepsake id={interest.id} />
                  </div>
                  <span className="keepsake-caption">
                    <span>{interest.label}</span>
                    <span>{interest.links[0].label} ↗</span>
                  </span>
                </a>
                {interest.links.slice(1).map((link) => (
                  <a
                    className="keepsake-extra"
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Or {link.label} ↗
                  </a>
                ))}
              </motion.article>
            ))}
          </div>
          <div className="desk-note">
            <span aria-hidden="true">↳</span>
            <p>
              {active?.note ||
                'A soundtrack, a watchlist, a camera. A few ways into my world.'}
            </p>
          </div>
        </main>
        <footer className="personal-footer">
          <span>Same person. Different tabs.</span>
          <Link to="/">Back to the professional side ↗</Link>
        </footer>
      </div>
    </MotionConfig>
  )
}
