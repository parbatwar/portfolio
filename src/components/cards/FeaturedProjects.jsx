import { useEffect, useRef, useState } from 'react'
import { socialsData } from '../../data/info'
import { fetchStarredRepos } from '../../data/github'

const cacheKey = 'starred-repos-v4'
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
          const cached = JSON.parse(sessionStorage.getItem(cacheKey) || 'null')

          if (Array.isArray(cached?.repos) && Date.now() - cached.time < CACHE_DURATION) {
            setRepos(cached.repos)
            setLoading(false)
            return
          }
        } catch {
          // Cache is optional
        }
      }

      try {
        const next = await fetchStarredRepos(controller.signal)
        if (controller.signal.aborted) return

        setRepos(next)
        setError('')

        try {
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({
              time: Date.now(),
              repos: next,
            }),
          )
        } catch {
          // Cache is optional
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Could not load repositories.')
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

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let frame
    let last = 0
    let direction = 1
    let restUntil = 0
    let position = el.scrollLeft
    let manuallyInteracting = false
    let visible = false
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    observer.observe(el)

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
      const delta = last ? Math.min(time - last, 50) : 0

      last = time

      const max = el.scrollWidth - el.clientWidth

      const shouldMove =
        !document.hidden &&
        visible &&
        !paused &&
        !manuallyInteracting &&
        !reducedMotion.matches &&
        time > restUntil &&
        max > 0

      if (shouldMove) {
        position += direction * delta * 0.025

        position = Math.max(0, Math.min(max, position))

        el.scrollLeft = position

        // Reverse direction when reaching an end
        if (position >= max || (direction < 0 && position <= 0)) {
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

    el.addEventListener('pointerdown', startManualInteraction)

    window.addEventListener('pointerup', stopManualInteraction)

    window.addEventListener('pointercancel', stopManualInteraction)

    el.addEventListener('wheel', userWheel, { passive: true })

    el.addEventListener('touchstart', startManualInteraction, { passive: true })

    el.addEventListener('touchend', stopManualInteraction, { passive: true })

    el.addEventListener('touchcancel', stopManualInteraction, { passive: true })

    el.addEventListener('scroll', syncPosition, { passive: true })

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()

      el.removeEventListener('pointerdown', startManualInteraction)

      window.removeEventListener('pointerup', stopManualInteraction)

      window.removeEventListener('pointercancel', stopManualInteraction)

      el.removeEventListener('wheel', userWheel)

      el.removeEventListener('touchstart', startManualInteraction)

      el.removeEventListener('touchend', stopManualInteraction)

      el.removeEventListener('touchcancel', stopManualInteraction)

      el.removeEventListener('scroll', syncPosition)
    }
  }, [repos, paused])

  return (
    <div className="github-feed">
      <div className="github-feed-top">
        <div>
          <span className="eyebrow">Some of my works</span>
            <h3>
            Projects<span className="accent-dot">.</span>
            </h3>
          <p>Things I've built. A live collection of projects worth a closer look.</p>
        </div>
        <button
          type="button"
          onClick={() => setPaused((current) => !current)}
          aria-pressed={paused}
          className="feed-control"
        >
        </button>
      </div>
      {loading && (
        <p role="status" className="feed-status">
          Loading repositories…
        </p>
      )}
      {error && !repos.length && (
        <div role="status" className="feed-status">
          {error}{' '}
          <button type="button" onClick={() => setAttempt((value) => value + 1)}>
            Try again
          </button>
        </div>
      )}
      {!loading && !error && !repos.length && (
        <p className="feed-status">No starred repositories yet.</p>
      )}
      {!!repos.length && (
        <div
          ref={viewport}
          className="repo-viewport"
          aria-label="Starred GitHub repositories"
          onFocusCapture={() => setPaused(true)}
        >
          {repos.map((repo, index) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card"
            >
              <div className="repo-art" aria-hidden="true">
                <span className="repo-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="repo-symbol">{repo.name.replace(/[-_]/g, ' ')}</span>
                <span className="repo-open">Explore ↗</span>
              </div>
              <span className="small-label">{repo.fork ? 'Fork' : 'Repository'} ↗</span>
              <h4>{repo.name}</h4>
              <p>{repo.description || 'Explore this project on GitHub.'}</p>
            </a>
          ))}
        </div>
      )}
      <div className="feed-footer">
        <span>
          {error && !repos.length
            ? 'Browse directly on GitHub'
            : `${repos.length} starred repositories`}
        </span>
        <a
          href={`${socialsData.github}?tab=stars`}
          target="_blank"
          rel="noopener noreferrer"
          className="button-text"
        >
          View GitHub ↗
        </a>
      </div>
    </div>
  )
}
