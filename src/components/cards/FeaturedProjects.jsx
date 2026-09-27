import { useEffect, useRef, useState } from 'react'
import { socialsData } from '../../data/info'
import { fetchStarredRepos } from '../../data/github'

const cacheKey = 'starred-repos-v3'
const CACHE_DURATION = 5 * 60 * 1000

export default function FeaturedProjects() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [paused, setPaused] = useState(false)
  const [attempt, setAttempt] = useState(0)

  const viewport = useRef(null)

  useEffect(() => {
    const controller = new AbortController()

    async function refresh(useCache = true) {
      if (useCache) {
        try {
          const cached = JSON.parse(
            sessionStorage.getItem(cacheKey) || 'null'
          )

          if (
            cached &&
            Date.now() - cached.time < CACHE_DURATION
          ) {
            setRepos(cached.repos)
            setLoading(false)
            return
          }
        } catch {
          // Cache is optional
        }
      }

      try {
        const next = await fetchStarredRepos(
          controller.signal
        )

        setRepos(next)
        setError('')

        try {
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({
              time: Date.now(),
              repos: next,
            })
          )
        } catch {
          // Cache is optional
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Could not load repositories.'
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    refresh(true)

    const timer = window.setInterval(() => {
      refresh(false)
    }, CACHE_DURATION)

    return () => {
      controller.abort()
      window.clearInterval(timer)
    }
  }, [attempt])

  useEffect(() => {
    const el = viewport.current

    if (!el || !repos.length) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    let frame
    let last = 0
    let direction = 1
    let restUntil = 0
    let position = el.scrollLeft
    let manuallyInteracting = false

    const startManualInteraction = () => {
      manuallyInteracting = true
    }

    const stopManualInteraction = () => {
      manuallyInteracting = false

      // Wait briefly before auto-scroll resumes
      restUntil = performance.now() + 1500
    }

    const userWheel = () => {
      position = el.scrollLeft

      // Give the user time to manually browse
      restUntil = performance.now() + 2000
    }

    const syncPosition = () => {
      position = el.scrollLeft
    }

    const tick = (time) => {
      const delta = last
        ? Math.min(time - last, 50)
        : 0

      last = time

      const max =
        el.scrollWidth - el.clientWidth

      const shouldMove =
        !document.hidden &&
        !paused &&
        !manuallyInteracting &&
        !reducedMotion.matches &&
        time > restUntil &&
        max > 0

      if (shouldMove) {
        position += direction * delta * 0.025

        position = Math.max(
          0,
          Math.min(max, position)
        )

        el.scrollLeft = position

        // Reverse direction when reaching an end
        if (
          position >= max ||
          (direction < 0 && position <= 0)
        ) {
          direction *= -1

          // Pause briefly at each end
          restUntil = time + 2000
        }
      } else {
        position = el.scrollLeft
      }

      frame = requestAnimationFrame(tick)
    }

    // Only actual interaction pauses movement.
    // Hovering does NOT pause the carousel.

    el.addEventListener(
      'pointerdown',
      startManualInteraction
    )

    window.addEventListener(
      'pointerup',
      stopManualInteraction
    )

    window.addEventListener(
      'pointercancel',
      stopManualInteraction
    )

    el.addEventListener(
      'wheel',
      userWheel,
      { passive: true }
    )

    el.addEventListener(
      'touchstart',
      startManualInteraction,
      { passive: true }
    )

    el.addEventListener(
      'touchend',
      stopManualInteraction,
      { passive: true }
    )

    el.addEventListener(
      'touchcancel',
      stopManualInteraction,
      { passive: true }
    )

    el.addEventListener(
      'scroll',
      syncPosition,
      { passive: true }
    )

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)

      el.removeEventListener(
        'pointerdown',
        startManualInteraction
      )

      window.removeEventListener(
        'pointerup',
        stopManualInteraction
      )

      window.removeEventListener(
        'pointercancel',
        stopManualInteraction
      )

      el.removeEventListener(
        'wheel',
        userWheel
      )

      el.removeEventListener(
        'touchstart',
        startManualInteraction
      )

      el.removeEventListener(
        'touchend',
        stopManualInteraction
      )

      el.removeEventListener(
        'touchcancel',
        stopManualInteraction
      )

      el.removeEventListener(
        'scroll',
        syncPosition
      )
    }
  }, [repos, paused])

  return (
    <section className="w-full min-w-0 h-full bg-[#0d0d14] border border-white/[0.04] rounded-2xl p-6 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
            Projects
          </span>

          <h2 className="text-2xl font-bold text-white">
            Starred repositories
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            My GitHub picks · latest activity first
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setPaused((current) => !current)
          }
          aria-pressed={paused}
          className="text-xs text-zinc-300 border border-white/10 rounded-full px-3 py-2 hover:text-emerald-400 transition-colors"
        >
          {paused
            ? 'Resume motion'
            : 'Pause motion'}
        </button>
      </div>

      {loading && (
        <p
          role="status"
          className="text-sm text-zinc-400 py-12"
        >
          Loading repositories…
        </p>
      )}

      {error && !repos.length && (
        <div
          role="status"
          className="text-sm text-zinc-400 mb-4"
        >
          {error}{' '}

          <button
            type="button"
            className="text-emerald-400 underline"
            onClick={() =>
              setAttempt((value) => value + 1)
            }
          >
            Retry
          </button>
        </div>
      )}

      {!loading &&
        !error &&
        !repos.length && (
          <p className="text-sm text-zinc-400 py-12">
            No starred repositories yet.
          </p>
        )}

      {!!repos.length && (
        <div
          ref={viewport}
          className="repo-viewport flex gap-4 overflow-x-auto pb-4"
          aria-label="Starred GitHub repositories"
        >
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col shrink-0 w-[min(270px,85vw)] max-w-full min-h-56 rounded-xl border border-white/[0.07] bg-gradient-to-br from-emerald-500/[0.06] to-transparent p-5 hover:border-emerald-500/40 transition-colors"
            >
              <span className="text-[10px] font-mono text-emerald-400 mb-4">
                {repo.fork
                  ? 'Fork'
                  : 'Repository'}{' '}
                ↗
              </span>

              <h3 className="font-semibold text-white break-words mb-2">
                {repo.name}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 break-words mb-5">
                {repo.description ||
                  'Explore this project on GitHub.'}
              </p>

              <div className="mt-auto flex flex-wrap gap-3 text-[10px] font-mono text-zinc-400">
                <span>
                  {repo.language || 'Code'}
                </span>

                <span>
                  ☆ {repo.stargazers_count}
                </span>

                {repo.archived && (
                  <span>Archived</span>
                )}
              </div>
            </a>
          ))}
        </div>
      )}

      <div className="mt-4 flex justify-between text-xs text-zinc-500">
        <span>
          {error && !repos.length
            ? 'Repositories unavailable'
            : `${repos.length} starred ${
                repos.length === 1
                  ? 'repo'
                  : 'repos'
              }`}
        </span>

        <a
          href={`${socialsData.github}?tab=stars`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 hover:underline"
        >
          View GitHub ↗
        </a>
      </div>
    </section>
  )
}