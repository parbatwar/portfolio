import { heroData } from '../../data/info'

export default function HeroCard() {
  return (
    <div className="hero-copy">
      <p className="eyebrow">{heroData.name} · Software & data</p>
      <h1>
        Thoughtful software.
        <span>From the inside out.</span>
      </h1>
      <p className="hero-description">{heroData.tagline}</p>
      <div className="flex flex-wrap items-center gap-4">
        <a className="button-primary" href="#work">
          Explore my work <span aria-hidden="true">↗</span>
        </a>
        <a className="button-text" href="#about">
          A little about me <span aria-hidden="true">↓</span>
        </a>
      </div>
      <p className="hero-location">
        <span aria-hidden="true">↗</span> Based in {heroData.location}
      </p>
    </div>
  )
}
