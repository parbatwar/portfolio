function NavCard(){
  return (
    <div className="bg-zinc-900 border border-white/10 p-4 px-6 rounded-2xl flex items-center justify-between">
      <h2 className="text-md font-bold tracking-wider uppercase">BentoPortfolio</h2>
      <nav>
        <ul className="flex items-center gap-6 text-sm font-medium text-zinc-400">
          <li><a href="#about" className="hover:text-white transition-colors">ABOUT</a></li>
          <li><a href="#work" className="hover:text-white transition-colors">WORK</a></li>
          <li><a href="#contact" className="hover:text-white transition-colors">CONTACT</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default NavCard;