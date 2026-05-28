// components/cards/SystemStatusCard.jsx

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion'

function SystemStatusCard() {
  const ref = useRef(null)
  
  // 3D tilt
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-6, 6])
  
  // Spotlight
  const spotlightX = useMotionValue(0)
  const spotlightY = useMotionValue(0)
  
  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5)
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5)
    spotlightX.set(e.clientX - rect.left)
    spotlightY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  // Simulated metrics
  const [pipelineData, setPipelineData] = useState({
    ingested: 342410,
    latency: 18,
    load: 42
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setPipelineData(prev => ({
        ingested: prev.ingested + Math.floor(Math.random() * 45) + 5,
        latency: Math.max(10, Math.min(45, prev.latency + Math.floor(Math.random() * 7) - 3)),
        load: Math.max(25, Math.min(85, prev.load + Math.floor(Math.random() * 11) - 5))
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const pipelines = [
    { name: 'ETL Pipeline (Raw Log Ingestion)', status: 'ACTIVE', color: 'bg-emerald-500' },
    { name: 'PostgreSQL DB Index Optimization', status: 'COMPLETED', color: 'bg-indigo-400' },
    { name: 'Redis Cache Warmup Service', status: 'STANDBY', color: 'bg-yellow-400' }
  ]

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="w-full h-full flex flex-col justify-between bg-[#0d0d14] border border-white/[0.04] rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300 glow-card group cursor-default"
    >
      {/* Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${spotlightX}px ${spotlightY}px,
              rgba(16, 185, 129, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      <div className="w-full" style={{ transform: 'translateZ(10px)' }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block">
            // Data Pipeline Monitor
          </span>
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[9px] text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span>LIVE</span>
          </div>
        </div>

        {/* Real-time Counter Stats */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-white/[0.01] border border-white/[0.04] p-3 rounded-xl">
            <span className="text-[9px] text-zinc-500 font-mono block mb-1">Records Ingested</span>
            <span className="text-sm font-bold text-white font-mono">{pipelineData.ingested.toLocaleString()}</span>
          </div>
          <div className="bg-white/[0.01] border border-white/[0.04] p-3 rounded-xl">
            <span className="text-[9px] text-zinc-500 font-mono block mb-1">Sync Latency</span>
            <span className="text-sm font-bold text-white font-mono">{pipelineData.latency}ms</span>
          </div>
          <div className="bg-white/[0.01] border border-white/[0.04] p-3 rounded-xl">
            <span className="text-[9px] text-zinc-500 font-mono block mb-1">CPU Load (Worker)</span>
            <span className="text-sm font-bold text-white font-mono">{pipelineData.load}%</span>
          </div>
        </div>

        {/* Pipeline Processes List */}
        <div className="space-y-3">
          <h4 className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase border-b border-white/[0.04] pb-1.5">// Pipeline Tasks</h4>
          {pipelines.map((pipe) => (
            <div key={pipe.name} className="flex justify-between items-center gap-4 text-xs font-mono">
              <span className="text-zinc-400 truncate max-w-[210px]">{pipe.name}</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className={`w-1.5 h-1.5 rounded-full ${pipe.color}`} />
                <span className="text-[9px] text-zinc-500">{pipe.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default SystemStatusCard
