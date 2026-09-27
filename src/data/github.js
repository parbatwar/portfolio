const API = 'https://api.github.com'

async function request(path, signal, accept = 'application/vnd.github+json') {
  return fetch(`${API}${path}`, {
    signal: AbortSignal.any([signal, AbortSignal.timeout(12000)]),
    headers: { Accept: accept },
  })
}

export async function fetchStarredRepos(username, signal) {
  const repos = []
  for (let page = 1; ; page++) {
    const response = await request(`/users/${encodeURIComponent(username)}/starred?sort=created&direction=desc&per_page=100&page=${page}`, signal)
    if (!response.ok) throw new Error('GitHub is temporarily unavailable. Please try again later.')
    const batch = await response.json()
    repos.push(...batch)
    if (batch.length < 100) return repos
  }
}

// Render README content as plain text, never execute repository HTML.
export function readmeExcerpt(markdown) {
  const text = markdown
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/!\[[^\]]*\]\[[^\]]*\]/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1')
    .replace(/^\s*\[[^\]]+\]:.*$/gm, '')
    .replace(/<[^>]*>/g, '')
    .replace(/^\s{0,3}(?:#{1,6}\s+|>\s*|[-*+]\s+|\d+\.\s+)/gm, '')
    .replace(/[*`~_]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return text.length > 600 ? `${text.slice(0, 600).trimEnd()}…` : text
}

export async function fetchReadme(repo, signal) {
  const key = `readme-v2:${repo.full_name}:${repo.pushed_at}`
  try {
    const cached = JSON.parse(sessionStorage.getItem(key) || 'null')
    if (cached && Date.now() - cached.time < 86400000) return cached.text
  } catch { /* Optional cache. */ }
  const path = repo.full_name.split('/').map(encodeURIComponent).join('/')
  const response = await request(`/repos/${path}/readme`, signal, 'application/vnd.github.raw+json')
  if (!response.ok && response.status !== 404) throw new Error('README preview unavailable')
  const text = response.status === 404 ? '' : readmeExcerpt(await response.text())
  try { sessionStorage.setItem(key, JSON.stringify({ time: Date.now(), text })) } catch { /* Optional cache. */ }
  return text
}
