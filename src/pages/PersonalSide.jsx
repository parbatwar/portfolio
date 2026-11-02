import { useEffect } from 'react'
import { motion, MotionConfig, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FaSpotify,
  FaYoutube,
  FaInstagram,
  FaSoundcloud,
  FaPinterestP,
} from 'react-icons/fa'
import { SiLetterboxd } from 'react-icons/si'
import { personalData } from '../data/personal'
import './personal.css'

const platformIcons = {
  listening: FaSpotify,
  films: SiLetterboxd,
  vlogs: FaYoutube,
  making: FaYoutube,
  soundcloud: FaSoundcloud,
  snapshots: FaInstagram,
  pinterest: FaPinterestP,
}

function InterestTile({ interest, index }) {
  const reduced = useReducedMotion()
  const Icon = platformIcons[interest.id]

  return (
    <motion.article
      className={`personal-tile personal-tile-${interest.id}`}
      style={{ '--platform-color': interest.color }}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.45,
        delay: reduced ? 0 : index * 0.045,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <a
        className="personal-tile-link"
        href={interest.links[0].url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${interest.label} — ${interest.links[0].label} (opens in a new tab)`}
      >
        {interest.image ? (
          <img
            className="personal-platform-icon personal-club-crest"
            src={interest.image}
            alt=""
            width="64"
            height="64"
          />
        ) : (
          <Icon className="personal-platform-icon" aria-hidden="true" />
        )}
        <div>
          <span className="personal-tile-platform">{interest.platform}</span>
          <h2>{interest.label}</h2>
        </div>
        <span className="personal-tile-arrow" aria-hidden="true">
          ↗
        </span>
      </a>
    </motion.article>
  )
}

export default function PersonalSide() {
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
          <section className="personal-intro" aria-labelledby="personal-title">
            <div>
              <p className="personal-label">Let’s connect outside of work</p>
              <h1 id="personal-title">
                Beyond
                <span>
                  work<span className="personal-period">.</span>
                </span>
              </h1>
            </div>
          </section>
          <section className="personal-bento" aria-label="My interests and channels">
            {personalData.interests.map((interest, index) => (
              <InterestTile key={interest.id} interest={interest} index={index} />
            ))}
          </section>
        </main>
      </div>
    </MotionConfig>
  )
}
