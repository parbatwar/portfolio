import test from 'node:test'
import assert from 'node:assert/strict'
import { fetchStarredRepos } from '../src/data/github.js'

test('prefers the server response and sorts by latest activity', async (t) => {
  const fetch = t.mock.method(globalThis, 'fetch', async () => Response.json([
    { id: 1, pushed_at: '2025-01-01' },
    { id: 2, pushed_at: '2026-01-01' },
  ]))

  assert.deepEqual((await fetchStarredRepos()).map((repo) => repo.id), [2, 1])
  assert.equal(fetch.mock.callCount(), 1)
})

test('falls back from a static HTML response and paginates public stars', async (t) => {
  const urls = []
  t.mock.method(globalThis, 'fetch', async (url) => {
    urls.push(url)
    if (urls.length === 1) return new Response('<html>Vite</html>')
    if (urls.length === 2) return Response.json(Array.from({ length: 100 }, (_, id) => ({ id })))
    return Response.json([{ id: 100 }])
  })

  assert.equal((await fetchStarredRepos()).length, 101)
  assert.match(urls[1], /users\/parbatwar\/starred\?per_page=100&page=1$/)
  assert.match(urls[2], /page=2$/)
})

test('does not start a fallback after cancellation', async (t) => {
  const controller = new AbortController()
  const fetch = t.mock.method(globalThis, 'fetch', async () => {
    controller.abort()
    throw new DOMException('Aborted', 'AbortError')
  })

  await assert.rejects(fetchStarredRepos(controller.signal), { name: 'AbortError' })
  assert.equal(fetch.mock.callCount(), 1)
})

test('reports a public API rate limit instead of returning invalid data', async (t) => {
  let calls = 0
  t.mock.method(globalThis, 'fetch', async () => {
    calls++
    return Response.json({}, { status: calls === 1 ? 404 : 403 })
  })

  await assert.rejects(fetchStarredRepos(), /request limit/)
})
