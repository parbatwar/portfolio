// @ts-check
/**
 * All content for the compact Personal page. Empty image paths and URLs render
 * labelled placeholders. Put optimized images in public/personal/ and reference
 * them as /personal/name.webp. Existing portrait is reused from the portfolio.
 * @typedef {{src:string, alt:string, placeholder:string}} Media
 * @typedef {{label:string, href:string, placeholder:string}} Link
 * @typedef {{id:string, label:string, title:string, text:string, color:string, media:Media[], notes:string[], link?:Link}} Interest
 */
/** @param {string} label @returns {Media} */
const picture = label => ({src:'',alt:label,placeholder:`[${label}]`})
/** @param {string} label @param {string} placeholder @returns {Link} */
const link = (label, placeholder) => ({label,href:'',placeholder:`[${placeholder}]`})

export const personal = {
  name:'Parbat',
  intro:{label:'A little less work. A little more me.',title:'Hey, I’m Parbat.',text:'There’s the work I make. Then there’s the music, the football, and all the things I’ve ended up trying. This is a little of that.',location:'Nakhipot, Lalitpur, Nepal',photo:{src:'/Parbat.webp',alt:'Parbat Sunuwar',placeholder:'[PERSONAL PHOTO]'},fragments:['Chelsea','Music','Films','Coffee','Books','Travel','Coding','Email'],scroll:'A little further ↓'},
  personality:{label:'01 / Between the lines',title:'A little more me.',hint:'The small things usually say more.',words:['Quiet','Reserved','Hopeful','Curious','Adventurous','Observant','Calm','Private','Thoughtful','Restless','Patient','Dreamer','Independent','Nostalgic','Creative','Introverted','Playful','Sensitive','Soft-spoken','Spontaneous','Reflective','Loyal','Optimistic','Overthinker','Warm','Detail-oriented','Wanderer','Grounded','Romantic','Determined','Imaginative','Adaptable','Intentional','Uncertain','Growing','Present','Fearful','Excited','Learning','Searching','Becoming','Ambitious','Driven'],lines:[
    '[Hope is a good thing, maybe the best of things.]',
    '[PERSONALITY DETAIL · A tiny detail you tend to overthink.]',
    '[PERSONALITY DETAIL · A habit your friends would recognise.]',
    '[PERSONALITY DETAIL · Your most recent rabbit hole.]',
    '[PERSONALITY DETAIL · Something you keep coming back to.]',
    '[PERSONALITY DETAIL · A small contradiction about you.]',
  ]},
  life:{label:'02 / No particular order',title:'Somewhere along the way…',text:'I’ve made music, tried for the army, made coffee, gone back to being a student, coded, edited videos, and ended up in email marketing.',hint:'Pick a fragment.',items:[
    {id:'music',name:'Music production',symbol:'◒',detail:'Making music.',visual:'wave'},
    {id:'army',name:'Trying for the army',symbol:'↗',detail:'Trying for the army.',visual:'lines'},
    {id:'coffee',name:'Barista',symbol:'◡',detail:'Making coffee.',visual:'cup'},
    {id:'student',name:'Student, again',symbol:'↺',detail:'Back to being a student.',visual:'notebook'},
    {id:'code',name:'Coding',symbol:'⌘',detail:'Learning to code.',visual:'code'},
    {id:'video',name:'Video editing',symbol:'▷',detail:'Premiere Pro · DaVinci Resolve · CapCut',visual:'timeline'},
    {id:'email',name:'Email marketing',symbol:'↗',detail:'Email marketing.',visual:'email'},
  ]},
  interests:{label:'03 / Currently in my orbit',title:'Things I’m into.',hint:'Six doors. Pick one.',previous:'Previous interest',next:'Next interest',browse:'Choose an interest',
    /** @type {Interest[]} */
    items:[
      {id:'football',label:'Football',title:'Chelsea. Of course.',text:'A little blue in this corner of my life.',color:'#233b72',media:[picture('CHELSEA IMAGE')],notes:['[CHELSEA · Your one-line take on supporting the club.]']},
      {id:'music',label:'Music',title:'It started with Linkin Park.',text:'A big influence on my music taste. There’s room for a few other names here, too.',color:'#3d303f',media:[picture('FAVORITE ALBUM ARTWORK')],notes:['[FAVORITE ARTISTS]','[FAVORITE ALBUMS]'],link:link('Open the playlist ↗','SPOTIFY PLAYLIST URL')},
      {id:'films',label:'Films',title:'Stay for the credits.',text:'Four films from my corner of Letterboxd.',color:'#4b3430',media:[picture('Parasite poster'),picture('Memories of Murder poster'),picture('Inglourious Basterds poster'),picture('The Pianist poster')],notes:['Parasite','Memories of Murder','Inglourious Basterds','The Pianist'],link:link('View my Letterboxd ↗','LETTERBOXD LINK')},
      {id:'books',label:'Books',title:'A few pages at a time.',text:'[BOOKS · A short thought about what you’ve been reading.]',color:'#555244',media:[picture('BOOK COVER 1'),picture('BOOK COVER 2'),picture('BOOK COVER 3')],notes:['[BOOK 1 · Title / author / one-line take]','[BOOK 2 · Title / author / one-line take]','[BOOK 3 · Title / author / one-line take]']},
      {id:'food',label:'Food',title:'Important little things.',text:'[FOOD OPINION · One food take you’ll stand by.]',color:'#774635',media:[picture('FAVORITE FOOD PHOTO')],notes:['[FAVORITE / COMFORT FOOD]','[NEPALI FAVOURITE]','[COFFEE ORDER]']},
      {id:'travel',label:'Travel',title:'See it for myself.',text:'[TRAVEL · A short note about a place that stays on your mind.]',color:'#365b58',media:[picture('TRAVEL IMAGE')],notes:['[PLACES VISITED]','[TRAVEL WISHLIST · A few places and why]']},
    ]},
  internet:{label:'04 / A few open tabs',title:'My internet.',text:'A few rabbit holes, if you want to stay a little longer.',profiles:[
    {id:'spotify',name:'Spotify',text:'[CURRENT LISTENING · Playlist name and a short note.]',media:[picture('PLAYLIST ARTWORK')],link:link('Listen in ↗','SPOTIFY LINK')},
    {id:'youtube',name:'YouTube',text:'[YOUTUBE · What someone will find on your channel.]',media:[picture('YOUTUBE THUMBNAIL 1'),picture('YOUTUBE THUMBNAIL 2')],link:link('Watch a little ↗','YOUTUBE LINK')},
    {id:'letterboxd',name:'Letterboxd',text:'Four films. Plenty to talk about.',media:[picture('Parasite poster'),picture('Memories of Murder poster'),picture('Inglourious Basterds poster'),picture('The Pianist poster')],link:link('View my Letterboxd ↗','LETTERBOXD LINK')},
  ]},
  footer:{text:'A little of me, outside of work.',work:'View my work ↗',contact:'Contact me ↗',email:'mailto:parbatwar@gmail.com',name:'Parbat Sunuwar',socials:[{label:'Instagram ↗',href:'https://www.instagram.com/parbat_war/',placeholder:''},{label:'Dr.Py · dr_py',href:'',placeholder:'[DR_PY PROFILE URL]'}]},
  ui:{skip:'Skip to interests',media:'Image placeholder',back:'Back to top ↑',pause:'Pause visual',play:'Animate visual',fragment:'Life fragments'},
}
