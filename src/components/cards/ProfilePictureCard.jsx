import { heroData } from '../../data/info'

export default function ProfilePictureCard() {
  return (
    <figure className="portrait">
      <img
        src="/Parbat.webp"
        alt={heroData.name}
        width="600"
        height="760"
        fetchPriority="high"
      />
      <figcaption>
        <span>{heroData.firstName}</span>
        <span>Developer. Data enthusiast.</span>
      </figcaption>
    </figure>
  )
}
