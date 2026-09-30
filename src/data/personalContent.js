/**
 * Personal page content. This is the only file to edit for copy, images and links.
 * Empty image src / link href values intentionally render visible TODOs.
 * Image paths can be /personal/name.webp (place files in public/personal/).
 * Spotify: paste an https://open.spotify.com/embed/playlist/... URL.
 * @typedef {{src: string, alt: string, placeholder: string}} PersonalImage
 * @typedef {{label: string, href: string, placeholder?: string}} PersonalLink
 * @typedef {{title: string, text: string, image?: PersonalImage, badges?: string[], icon?: string}} PersonalItem
 * @typedef {{id: string, label: string, title: string, text: string, color: string, ink: string, image?: PersonalImage, items?: PersonalItem[], links?: PersonalLink[]}} PersonalChapter
 */

/** @param {string} label @returns {PersonalImage} */
const image = label => ({ src: '', alt: label, placeholder: `TODO · ${label}` })

/** @type {{ui: Record<string,string>, chapters: PersonalChapter[], intro: {location:string,tagline:string}, chelsea: string[], music: {artists:string[], playlist:PersonalLink}, books: {current:string}, places:{origin:string}, facts:string[], closing:PersonalLink[]}} */
export const personalContent = {
  ui: {
    pageLabel: 'Parbat, the human version', skip: 'Skip to the closing chapter', scroll: 'Keep scrolling',
    index: 'A few things that make me, me.', number: 'Chapter', previous: 'Previous', next: 'Next',
    shelf: 'Scroll the shelf', current: 'Currently reading', fun: 'One more thing',
    cursor: 'Explore', home: 'Home', destination: 'Dream destination',
    filmsHint: 'Hover, focus, or tap a poster for my take.', hatsHint: 'Different roles. Different lessons.',
    playlistTitle: 'The soundtrack', playlistNote: 'A little more of what is in my headphones.',
    factButton: 'Tell me a fun fact', mapLabel: 'Postcards from places I want to go',
    footer: 'Parbat Sunuwar · Personal', back: 'Back to the beginning ↑',
  },
  intro: { location: 'Nakhipot, Lalitpur, Nepal', tagline: 'TODO · Add a one-line personal tagline.' },
  chapters: [
    { id:'human', label:'01 / A proper introduction', title:"Hey, I’m Parbat,\nthe human version.", text:'', color:'#e9e4da', ink:'#22251f', image:image('Soft portrait of Parbat') },
    { id:'chelsea', label:'02 / Blue is a feeling', title:'Some things\nare always blue.', text:'Chelsea FC', color:'#073ab8', ink:'#f4f6ff', image:image('Chelsea stadium or crest image') },
    { id:'music', label:'03 / The volume goes up', title:'It started\nwith Linkin Park.', text:'My music taste, and my editing rhythm, started here.', color:'#19171c', ink:'#f3eee8', image:image('Linkin Park image') },
    { id:'screen', label:'04 / Stay for the credits', title:'A different\nkind of screen time.', text:'', color:'#351f29', ink:'#fff0dd', items:[
      {title:'Parasite',text:'TODO · Your one-line take on Parasite.',image:image('Parasite poster')},
      {title:'Memories of Murder',text:'TODO · Your one-line take on Memories of Murder.',image:image('Memories of Murder poster')},
      {title:'Inglourious Basterds',text:'TODO · Your one-line take on Inglourious Basterds.',image:image('Inglourious Basterds poster')},
      {title:'The Pianist',text:'TODO · Your one-line take on The Pianist.',image:image('The Pianist poster')},
    ],links:[{label:'Letterboxd ↗',href:'',placeholder:'TODO · Letterboxd profile URL'},{label:'YouTube ↗',href:'',placeholder:'TODO · YouTube URL'}]},
    { id:'hats', label:'05 / The many hats', title:'Never just\none thing.', text:'', color:'#e1d9ce', ink:'#282522', items:[
      {title:'Barista',text:'TODO · What being a barista taught you.',icon:'coffee'},
      {title:'Video Editor',text:'TODO · What editing taught you.',icon:'film',badges:['Premiere Pro','DaVinci Resolve','CapCut']},
      {title:'Coder',text:'TODO · What coding taught you.',icon:'code'},
      {title:'Email Marketer',text:'TODO · What email marketing taught you.',icon:'mail'},
    ]},
    { id:'roots', label:'06 / Where I come from', title:'Before the code,\nthere were flowers.', text:'I code by day, but I grew up around flowers.', color:'#203d2d', ink:'#f2dfad', image:image('Plants and flowers at the family nursery'), items:[{title:'TTR Banglamukhi Nursery',text:'My family’s plant and flower nursery. Nakhipot, Lalitpur.'}] },
    { id:'books', label:'07 / A slower kind of scroll', title:'One more\nchapter.', text:'', color:'#d9ceb8', ink:'#302c27', items:[
      {title:'TODO · Book 1 title',text:'TODO · Author and one-line take.',image:image('Book 1 cover')},
      {title:'TODO · Book 2 title',text:'TODO · Author and one-line take.',image:image('Book 2 cover')},
      {title:'TODO · Book 3 title',text:'TODO · Author and one-line take.',image:image('Book 3 cover')},
    ]},
    { id:'food', label:'08 / Always room for this', title:'Good food.\nFull heart.', text:'', color:'#5b261e', ink:'#ffe8ce', items:[
      {title:'Comfort food',text:'TODO · Your comfort food and why.',image:image('Comfort food photo')},
      {title:'Nepali favourites',text:'TODO · Your Nepali favourites.',image:image('Nepali food photo')},
      {title:'Guilty pleasures',text:'TODO · Your guilty pleasure food.',image:image('Guilty pleasure food photo')},
    ]},
    { id:'places', label:'09 / Not there. Yet.', title:'Rooted here.\nCurious everywhere.', text:'', color:'#bfcfd5', ink:'#1e3540', items:[
      {title:'TODO · Destination 1',text:'TODO · Why you want to go.',image:image('Destination 1 postcard')},
      {title:'TODO · Destination 2',text:'TODO · Why you want to go.',image:image('Destination 2 postcard')},
      {title:'TODO · Destination 3',text:'TODO · Why you want to go.',image:image('Destination 3 postcard')},
    ]},
    { id:'offscreen', label:'10 / The little things', title:'Away from\nthe keyboard.', text:'', color:'#d7d8c9', ink:'#29332d', items:[
      {title:'Home dumbbell workouts',text:'TODO · Your workout routine or favourite exercise.',icon:'strength'},
      {title:'Goals',text:'TODO · A personal goal you are working toward.',icon:'goal'},
      {title:'Coffee order',text:'TODO · Your go-to coffee order.',icon:'coffee'},
      {title:'Quirks',text:'TODO · A small, very-you habit.',icon:'spark'},
    ]},
    { id:'closing', label:'11 / Over to you', title:'That’s me.\nYour turn.', text:'', color:'#141b19', ink:'#f1eddf' },
  ],
  chelsea: ['TODO · Why you support Chelsea.', 'TODO · Your favourite players and era.', 'My dream? To work for Chelsea as a data engineer one day.'],
  music: {artists:['TODO · Artist 1','TODO · Artist 2','TODO · Artist 3','TODO · Artist 4'],playlist:{label:'Spotify playlist',href:'',placeholder:'TODO · Spotify playlist embed URL'}},
  books: {current:'TODO · Currently reading: book title, author, and a short note.'},
  places: {origin:'Nepal · where the story starts'},
  facts: ['TODO · Fun fact 1 about you.', 'TODO · Fun fact 2 about you.', 'TODO · Fun fact 3 about you.'],
  closing: [
    {label:'Instagram ↗',href:'https://www.instagram.com/parbat_war/'},
    {label:'Dr.Py · @dr_py ↗',href:'',placeholder:'TODO · Dr.Py social profile URL (handle dr_py)'},
    {label:'GitHub ↗',href:'https://github.com/parbatwar'},
    {label:'Let’s talk ↗',href:'mailto:parbatwar@gmail.com'},
  ],
}
