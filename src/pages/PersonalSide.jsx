import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion'
import { personal as p } from '../data/personalCompact'
import './personalCompact.css'
import PersonalityTypography from '../components/personal/PersonalityTypography'

function Photo({media, eager=false, className=''}) {
  const [failed,setFailed] = useState(false)
  return <div className={`pc-photo ${className}`}>
    {media.src && !failed ? <img src={media.src} alt={media.alt} width="1000" height="1200" loading={eager?'eager':'lazy'} decoding="async" onError={()=>setFailed(true)} /> : <div className="pc-placeholder" role="img" aria-label={media.placeholder}><span aria-hidden="true">↗</span><small>{media.placeholder}</small></div>}
  </div>
}

function OutLink({link}) {
  return link.href ? <a className="pc-link" href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a> : <span className="pc-missing-link">{link.label}<small>{link.placeholder}</small></span>
}

function Label({children}) {return <p className="pc-label">{children}</p>}

function PersonalHero() {
  return <section className="pc-hero pc-wrap" id="personal-top" aria-labelledby="pc-title">
    <div className="pc-hero-copy"><Label>{p.intro.label}</Label><h1 id="pc-title">{p.intro.title}</h1><p className="pc-intro-text">{p.intro.text}</p><p className="pc-location"><span aria-hidden="true">↗</span> {p.intro.location}</p><a className="pc-scroll" href="#personality">{p.intro.scroll}</a></div>
    <div className="pc-hero-visual"><Photo media={p.intro.photo} eager /><span className="pc-photo-note">{p.name} / 01</span><div className="pc-orbit" aria-hidden="true">{p.intro.fragments.map((word,i)=><span key={word} style={{'--i':i}}>{word}</span>)}</div></div>
  </section>
}

function FragmentVisual({type}) {
  return <div className={`pc-fragment-art pc-art-${type}`} aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i} style={{'--n':i}} />)}</div>
}

function LifeFragments() {
  const ref=useRef(null), strip=useRef(null), reduced=useReducedMotion()
  const manual=useRef(false)
  const [active,setActive]=useState(0)
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']})
  useMotionValueEvent(scrollYProgress,'change',value=>{
    if(reduced || manual.current || !window.matchMedia('(min-width: 901px)').matches || !strip.current)return
    strip.current.scrollLeft=(strip.current.scrollWidth-strip.current.clientWidth)*value
  })
  const item=p.life.items[active]
  return <section ref={ref} className="pc-life" aria-labelledby="pc-life-title"><div className="pc-wrap pc-life-top"><div><Label>{p.life.label}</Label><h2 id="pc-life-title">{p.life.title}</h2><p>{p.life.text}</p></div><div className="pc-fragment-preview"><FragmentVisual type={item.visual}/><p aria-live="polite">{item.detail}</p></div></div>
    <p className="pc-wrap pc-label pc-fragment-hint">{p.life.hint}</p><div className="pc-fragment-scroll" ref={strip} role="group" aria-label={p.ui.fragment} onPointerDown={()=>{manual.current=true}} onWheel={()=>{manual.current=true}} onFocus={()=>{manual.current=true}}><div className="pc-fragment-strip">{p.life.items.map((fragment,i)=><button key={fragment.id} aria-pressed={active===i} onPointerEnter={event=>{if(event.pointerType==='mouse')setActive(i)}} onFocus={()=>setActive(i)} onClick={()=>setActive(i)}><span>{fragment.symbol}</span>{fragment.name}</button>)}</div></div>
  </section>
}

function InterestMedia({item}) {
  const [playing,setPlaying]=useState(false)
  const reduced=useReducedMotion()
  return <div className={`pc-media pc-media-${item.id}`}>
    <div className="pc-interest-pictures">{item.media.map((media,i)=><figure key={media.placeholder}><Photo media={media}/>{item.media.length>1 && <figcaption>{item.notes[i]}</figcaption>}</figure>)}</div>
    {item.id==='music' && <div className={`pc-player ${playing&&!reduced?'is-playing':''}`}><button aria-pressed={playing} aria-label={playing?p.ui.pause:p.ui.play} onClick={()=>setPlaying(!playing)}>{playing?'Ⅱ':'▷'}</button><div aria-hidden="true">{Array.from({length:24},(_,i)=><i key={i} style={{'--n':i}}/>)}</div><span>Linkin Park</span></div>}
    {item.id==='football' && <span className="pc-media-stamp" aria-hidden="true">CFC / BLUE</span>}
  </div>
}

function InterestExplorer() {
  const ref=useRef(null), reduced=useReducedMotion()
  const [active,setActive]=useState(0)
  const manual=useRef(false)
  const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']})
  useMotionValueEvent(scrollYProgress,'change',value=>{
    if(reduced || manual.current || !window.matchMedia('(min-width: 901px)').matches)return
    setActive(Math.min(p.interests.items.length-1,Math.floor(value*p.interests.items.length)))
  })
  const select=index=>{manual.current=true;setActive((index+p.interests.items.length)%p.interests.items.length)}
  const keySelect=(event,index)=>{
    const delta=event.key==='ArrowRight'||event.key==='ArrowDown'?1:event.key==='ArrowLeft'||event.key==='ArrowUp'?-1:0
    const next=event.key==='Home'?0:event.key==='End'?p.interests.items.length-1:delta?(index+delta+p.interests.items.length)%p.interests.items.length:null
    if(next!==null){event.preventDefault();select(next);document.getElementById(`interest-tab-${next}`)?.focus()}
  }
  const item=p.interests.items[active]
  return <section className="pc-explorer" id="interests" ref={ref} aria-labelledby="pc-interests-title"><div className="pc-explorer-stage" style={{backgroundColor:item.color}}><div className="pc-wrap"><div className="pc-explorer-heading"><div><Label>{p.interests.label}</Label><h2 id="pc-interests-title">{p.interests.title}</h2></div><p>{p.interests.hint}</p></div><div className="pc-explorer-grid">
    <div className="pc-tabs" role="tablist" aria-label={p.interests.browse}>{p.interests.items.map((interest,i)=><button key={interest.id} id={`interest-tab-${i}`} role="tab" aria-selected={active===i} aria-controls="interest-panel" tabIndex={active===i?0:-1} onClick={()=>select(i)} onKeyDown={event=>keySelect(event,i)}><span>0{i+1}</span>{interest.label}<span className="pc-tab-arrow" aria-hidden="true">↗</span></button>)}</div>
    <div id="interest-panel" role="tabpanel" aria-labelledby={`interest-tab-${active}`} tabIndex={0} className="pc-interest-panel"><motion.div key={item.id} initial={reduced?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.22}}><InterestMedia item={item}/><div className="pc-interest-description"><div><h3>{item.title}</h3><p>{item.text}</p></div><div>{item.media.length===1&&item.notes.map(note=><p className="pc-note" key={note}>{note}</p>)}{item.link&&<OutLink link={item.link}/>}</div></div></motion.div></div>
  </div><div className="pc-explorer-controls"><span>0{active+1} / 0{p.interests.items.length}</span><div><button onClick={()=>select(active-1)} aria-label={p.interests.previous}>←</button><button onClick={()=>select(active+1)} aria-label={p.interests.next}>→</button></div></div></div></div></section>
}

function InternetProfiles() {
  return <section className="pc-internet pc-wrap" aria-labelledby="pc-internet-title"><div className="pc-internet-heading"><div><Label>{p.internet.label}</Label><h2 id="pc-internet-title">{p.internet.title}</h2></div><p>{p.internet.text}</p></div><div className="pc-internet-profiles">{p.internet.profiles.map(profile=><article className={`pc-profile pc-profile-${profile.id}`} key={profile.id}><div className="pc-profile-media">{profile.media.map(media=><Photo key={media.placeholder} media={media}/>)}</div><div><h3>{profile.name}</h3><p>{profile.text}</p><OutLink link={profile.link}/></div></article>)}</div></section>
}

function PersonalFooter() {
  return <footer className="pc-footer pc-wrap"><h2>{p.footer.text}</h2><div className="pc-footer-main"><Link to="/">{p.footer.work}</Link><a href={p.footer.email}>{p.footer.contact}</a></div><div className="pc-footer-small"><span>{p.footer.name}</span><div>{p.footer.socials.map(link=><OutLink key={link.label} link={link}/>)}</div><a href="#personal-top">{p.ui.back}</a></div></footer>
}

export default function PersonalSide() {
  return <main className="pc-page"><a href="#interests" className="pc-skip">{p.ui.skip}</a><PersonalHero/><PersonalityTypography/><LifeFragments/><InterestExplorer/><InternetProfiles/><PersonalFooter/></main>
}
