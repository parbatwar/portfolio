function EmailMeCard() {
  return (
    <div className="w-full bg-[#0e0e12] border border-white/[0.07] rounded-[10px] p-5 flex flex-col justify-between group cursor-pointer hover:border-white/[0.13] transition-all min-h-[180px]">
      <div className="flex justify-between items-start w-full">
        <p className="text-[10px] text-zinc-600 leading-relaxed">Want to<br />collaborate?</p>
        <span className="text-sm text-zinc-700 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
      </div>
      <div>
        <div className="inline-flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.07] rounded-full px-2.5 py-1 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
          <span className="text-[9px] font-medium text-zinc-500">Available for freelance</span>
        </div>
        <h3 className="text-xl font-bold tracking-tight text-zinc-100">Email Me</h3>
      </div>
    </div>
  )
}

export default EmailMeCard