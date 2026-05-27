function ProfilePictureCard() {
  return (
    <div className="w-full h-full min-h-[280px] bg-[#0e0e12] border border-white/[0.07] rounded-[10px] overflow-hidden relative group">
      
      {/* Photo */}
      <img
        src="/bhattay_dai.jpg"
        alt="Parbat Sunuwar"
        className="w-full h-full object-cover object-top absolute inset-0
                   grayscale group-hover:grayscale-0 
                   scale-100 group-hover:scale-[1.03]
                   transition-all duration-700 ease-out"
      />

      {/* Bottom fade overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#07070a]/80 to-transparent z-10" />

      {/* Name tag bottom-left */}
      <div className="absolute bottom-3 left-3 z-20">
        <span className="text-[9px] font-semibold tracking-[0.12em] uppercase text-zinc-500">
          Parbat Sunuwar
        </span>
      </div>

    </div>
  )
}

export default ProfilePictureCard