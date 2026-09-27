import { useEffect, useRef, useState } from 'react'
import { socialsData } from '../../data/info'

const username = new URL(socialsData.github).pathname.split('/').filter(Boolean)[0]
const cacheKey = `public-repos:${username}`

export default function FeaturedProjects() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [paused, setPaused] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const viewport = useRef(null)

  useEffect(() => {
    const controller = new AbortController()
    async function refresh() {
      try {
        const cached = JSON.parse(sessionStorage.getItem(cacheKey) || 'null')
        if (cached && Date.now() - cached.time < 300000) {
          setRepos(cached.repos)
          setLoading(false)
          return
        }
      } catch { /* Storage is optional. */ }
      try {
        const next = []
        for (let page = 1; ; page++) {
          const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?type=owner&sort=updated&per_page=100&page=${page}`, {
            signal: controller.signal, headers: { Accept: 'application/vnd.github+json' },
          })
          if (!response.ok) throw new Error('GitHub is temporarily unavailable. Please try again later.')
          const batch = await response.json()
          next.push(...batch)
          if (batch.length < 100) break
        }
        setRepos(next)
        setError('')
        try { sessionStorage.setItem(cacheKey, JSON.stringify({ time: Date.now(), repos: next })) } catch { /* Optional cache. */ }
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    refresh()
    const timer = window.setInterval(refresh, 300000)
    return () => { controller.abort(); window.clearInterval(timer) }
  }, [attempt])

  useEffect(() => {
    const el = viewport.current
    if (!el || !repos.length) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame, last = 0, direction = 1, restUntil = 0, position = el.scrollLeft
    let interacting = false
    const enter = () => { interacting = true }
    const leave = () => { interacting = false; restUntil = performance.now() + 1500 }
    const wheel = () => { restUntil = performance.now() + 4000 }
    const tick = (time) => {
      const delta = last ? Math.min(time - last, 50) : 0
      last = time
      const max = el.scrollWidth - el.clientWidth
      if (!paused && !interacting && !reduced.matches && !el.contains(document.activeElement) && time > restUntil && max > 0) {
        position = Math.max(0, Math.min(max, position + direction * delta * 0.025))
        el.scrollLeft = position
        if (position >= max || (direction < 0 && position <= 0)) { direction *= -1; restUntil = time + 2000 }
      } else { position = el.scrollLeft }
      frame = requestAnimationFrame(tick)
    }
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    el.addEventListener('touchstart', wheel, { passive: true })
    el.addEventListener('wheel', wheel, { passive: true })
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointerleave', leave)
      el.removeEventListener('touchstart', wheel)
      el.removeEventListener('wheel', wheel)
    }
  }, [repos, paused])

  return (
    <section className="w-full min-w-0 h-full bg-[#0d0d14] border border-white/[0.04] rounded-2xl p-6 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">Projects</span>
          <h2 className="text-2xl font-bold text-white">Public repositories</h2>
          <p className="mt-1 text-xs text-zinc-500">Automatically updated from GitHub</p>
        </div>
        <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} className="text-xs text-zinc-300 border border-white/10 rounded-full px-3 py-2 hover:text-emerald-400">{paused ? 'Resume motion' : 'Pause motion'}</button>
      </div>
      {loading && <p role="status" className="text-sm text-zinc-400 py-12">Loading repositories…</p>}
      {error && <div role="status" className="text-sm text-zinc-400 mb-4">{error} <button className="text-emerald-400 underline" onClick={() => setAttempt(attempt + 1)}>Retry</button></div>}
      {!loading && !error && !repos.length && <p className="text-sm text-zinc-400 py-12">No public repositories yet.</p>}
      <div ref={viewport} className="repo-viewport flex gap-4 overflow-x-auto pb-4" aria-label="Public GitHub repositories" tabIndex={0}>
        {repos.map(repo => (
          <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex flex-col shrink-0 w-[min(270px,85vw)] max-w-full min-h-56 rounded-xl border border-white/[0.07] bg-gradient-to-br from-emerald-500/[0.06] to-transparent p-5 hover:border-emerald-500/40">
            <span className="text-[10px] font-mono text-emerald-400 mb-4">{repo.fork ? 'Fork' : 'Repository'} ↗</span>
            <h3 className="font-semibold text-white break-words mb-2">{repo.name}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-5">{repo.description || 'Explore this project on GitHub.'}</p>
            <div className="mt-auto flex flex-wrap gap-3 text-[10px] font-mono text-zinc-400"><span>{repo.language || 'Code'}</span><span>☆ {repo.stargazers_count}</span>{repo.archived && <span>Archived</span>}</div>
          </a>
        ))}
      </div>
      <div className="mt-4 flex justify-between text-xs text-zinc-500"><span>{repos.length} public repos</span><a href={`${socialsData.github}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">View GitHub ↗</a></div>
    </section>
  )
}
