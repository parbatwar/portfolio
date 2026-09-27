const GITHUB_API = 'https://api.github.com'

export default async function handler() {
  const username = 'parbatwar'
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return Response.json(
      {
        error: 'GitHub token is not configured.',
      },
      {
        status: 500,
      }
    )
  }

  try {
    const repos = []

    for (let page = 1; ; page++) {
      const response = await fetch(
        `${GITHUB_API}/users/${encodeURIComponent(
          username
        )}/starred?per_page=100&page=${page}`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${token}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        }
      )

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))

        return Response.json(
          {
            error:
              body?.message ||
              `GitHub request failed (${response.status}).`,
          },
          {
            status: response.status,
          }
        )
      }

      const batch = await response.json()

      repos.push(...batch)

      if (batch.length < 100) {
        break
      }
    }

    // Latest pushed/committed project first
    repos.sort((a, b) => {
      const aTime = a.pushed_at
        ? new Date(a.pushed_at).getTime()
        : 0

      const bTime = b.pushed_at
        ? new Date(b.pushed_at).getTime()
        : 0

      return bTime - aTime
    })

    const cleanedRepos = repos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      fork: repo.fork,
      archived: repo.archived,
      pushed_at: repo.pushed_at,
    }))

    return Response.json(cleanedRepos, {
      headers: {
        'Cache-Control':
          'public, max-age=300, s-maxage=300, stale-while-revalidate=3600',
      },
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        error: 'GitHub is temporarily unavailable.',
      },
      {
        status: 500,
      }
    )
  }
}

export const config = {
  path: '/api/github-starred',
}