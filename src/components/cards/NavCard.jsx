// src/components/cards/NavCard.jsx
export default function NavCard() {
  return (
    <div className="bg-[#0e0e12] border border-white/[0.07] rounded-[10px] px-5 py-3 flex items-center justify-between">

      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-80 flex-shrink-0 animate-pulse" />
        <span className="text-xs font-bold tracking-[-0.01em] text-zinc-100">
          Parbat Sunuwar
        </span>
      </div>

      {/* Links - We upgraded font slightly to text-xs for premium readability */}
      <nav>
        <ul className="flex items-center gap-1 list-none m-0 p-0">
          {['About', 'Work', 'Contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-xs font-medium tracking-[0.03em] text-zinc-400 
                           px-3 py-1.5 rounded-[7px] border border-transparent 
                           hover:text-zinc-100 hover:border-white/[0.07] hover:bg-white/[0.04] 
                           transition-all block"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

    </div>
  )
}
