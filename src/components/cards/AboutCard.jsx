import { aboutData } from '../../data/info'

export default function AboutCard() {
  return (
    <div className="about-copy">
      <p className="eyebrow">About me</p>
      <h2 className="section-title">{aboutData.title}</h2>
      <div className="about-paragraphs">
        <p>{aboutData.description1}</p>
        <p>{aboutData.description2}</p>
      </div>
      <a className="button-text" href="/resume.pdf" download="Parbat_Sunuwar_CV.pdf">
        Download my resume <span aria-hidden="true">↓</span>
      </a>
    </div>
  )
}
