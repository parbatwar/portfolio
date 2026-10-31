import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { socialsData } from '../../data/info'

export default function SocialsCard() {
  return (
    <div className="contact-links">
      <a href={socialsData.github} target="_blank" rel="noopener noreferrer">
        <FaGithub aria-hidden="true" /> GitHub <span aria-hidden="true">↗</span>
      </a>
      <a href={socialsData.linkedin} target="_blank" rel="noopener noreferrer">
        <FaLinkedinIn aria-hidden="true" /> LinkedIn <span aria-hidden="true">↗</span>
      </a>
    </div>
  )
}
