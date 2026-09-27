const GITHUB_API = 'https://api.github.com'

export default async function handler() {
  const username = 'parbatwar'
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return new Response(
      JSON.stringify({
        error: 'GITHUB_TOKEN is missing on Netlify.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
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
        const body = await response.text()

        console.error(
          'GitHub API error:',
          response.status,
          body
        )

        return new Response(
          JSON.stringify({
            error: `GitHub API failed with status ${response.status}.`,
          }),
          {
            status: response.status,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
      }

      const batch = await response.json()

      repos.push(...batch)

      if (batch.length < 100) {
        break
      }
    }

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

    return new Response(
      JSON.stringify(cleanedRepos),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control':
            'public, max-age=300, s-maxage=300',
        },
      }
    )
  } catch (error) {
    console.error('Function error:', error)

    return new Response(
      JSON.stringify({
        error: 'GitHub function failed.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}