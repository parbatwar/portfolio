export async function fetchStarredRepos(signal) {
  const response = await fetch(
    '/.netlify/functions/github-starred',
    {
      signal,
      headers: {
        Accept: 'application/json',
      },
    }
  )

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      data?.error ||
        `GitHub repositories are temporarily unavailable (${response.status}).`
    )
  }

  return data
}