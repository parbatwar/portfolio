const username = 'parbatwar'

function sortRepositories(repositories) {
  return [...repositories].sort(
    (a, b) => new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0),
  )
}

export async function fetchStarredRepos(signal) {
  // Prefer the cached server endpoint. Tokens remain on the server.
  try {
    const response = await fetch('/.netlify/functions/github-starred', {
      signal,
      headers: { Accept: 'application/json' },
    })
    const data = await response.json().catch(() => null)

    if (response.ok && Array.isArray(data)) {
      return sortRepositories(data)
    }
  } catch (error) {
    if (signal?.aborted) throw error
  }

  // Public stars also work in Vite and static hosting without a secret/API key.
  const repositories = []
  for (let page = 1; ; page++) {
    const response = await fetch(
      `https://api.github.com/users/${username}/starred?per_page=100&page=${page}`,
      {
        signal,
        headers: { Accept: 'application/vnd.github+json' },
      },
    )

    if (!response.ok) {
      throw new Error(
        response.status === 403 || response.status === 429
          ? 'GitHub’s public request limit was reached. Please try again later.'
          : 'Starred repositories are temporarily unavailable.',
      )
    }

    const batch = await response.json()
    if (!Array.isArray(batch)) throw new Error('Unexpected GitHub response.')
    repositories.push(...batch)
    if (batch.length < 100) break
  }

  return sortRepositories(repositories)
}
