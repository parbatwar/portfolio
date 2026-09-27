import test from 'node:test'
import assert from 'node:assert/strict'
import { fetchStarredRepos, fetchReadme, readmeExcerpt } from '../src/data/github.js'

test('README preview removes markup and bounds long excerpts', () => {
  assert.equal(readmeExcerpt('# Project\n![badge](badge.png)\nA **useful** [tool](https://example.com).\n```js\ncode\n```'), 'Project A useful tool.')
  assert.equal(readmeExcerpt('x'.repeat(800)).length, 601)
  assert.ok(readmeExcerpt('x'.repeat(800)).endsWith('…'))
})

test('starred API follows pagination and never requests owned repositories', async t => {
  const calls = []
  t.mock.method(globalThis, 'fetch', async url => {
    calls.push(url)
    return Response.json(calls.length === 1 ? Array.from({ length: 100 }, (_, id) => ({ id })) : [{ id: 100 }])
  })
  const result = await fetchStarredRepos('parbatwar', new AbortController().signal)
  assert.equal(result.length, 101)
  assert.ok(calls.every(url => url.includes('/users/parbatwar/starred?')))
  assert.ok(calls[1].endsWith('page=2'))
})

test('missing README uses empty fallback; API failures stay distinct', async t => {
  const repo = { full_name: 'owner/repo', pushed_at: 'now' }
  const fetch = t.mock.method(globalThis, 'fetch', async () => new Response('', { status: 404 }))
  assert.equal(await fetchReadme(repo, new AbortController().signal), '')
  fetch.mock.mockImplementation(async () => new Response('', { status: 403 }))
  await assert.rejects(fetchReadme(repo, new AbortController().signal), /unavailable/)
  await assert.rejects(fetchStarredRepos('parbatwar', new AbortController().signal), /unavailable/)
})

test('README fetch returns readable text from raw content', async t => {
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.ok(url.endsWith('/repos/owner/repo/readme'))
    assert.equal(options.headers.Accept, 'application/vnd.github.raw+json')
    return new Response('# Hello\nA small project.')
  })
  assert.equal(await fetchReadme({ full_name: 'owner/repo' }, new AbortController().signal), 'Hello A small project.')
})
