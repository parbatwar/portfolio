import { experienceData } from '../../data/info'

export default function ExperienceCard() {
  return (
    <div className="work-history-list">
      {experienceData.map((experience) => (
        <article key={experience.company} className="experience surface">
          <div className="work-history-role">
            <p className="eyebrow">{experience.company}</p>
            <h3>{experience.role}</h3>
          </div>
          <ul>
            {experience.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}
