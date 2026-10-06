#!/usr/bin/env node
// Exercise catalog destinations, compatibility links, and generation without network access.
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { EXTENSIONS } from '../docs/.vitepress/data/extensions.js'

const root = fileURLToPath(new URL('../', import.meta.url))
const ids = new Set()
for (const ext of EXTENSIONS) {
  assert.ok(['wasm', 'python'].includes(ext.extensionType), `Missing type: ${ext.id}`)
  assert.ok(!ids.has(ext.id), `Duplicate catalog ID: ${ext.id}`)
  ids.add(ext.id)
  assert.ok((await readFile(join(root, 'docs/extensions', ext.id, 'index.md'), 'utf8')).length)
  assert.ok((await readFile(join(root, 'docs/extensions', ext.id, 'api.md'), 'utf8')).length)
}
assert.equal(EXTENSIONS.find(ext => ext.id === 'paidtasks').runtime, 'legacy-host')
assert.equal(EXTENSIONS.find(ext => ext.id === 'battleshipswasm').runtime, 'core')
for (const type of ['python', 'wasm']) {
  const page = await readFile(join(root, `docs/extensions/${type}/index.md`), 'utf8')
  assert.ok(page.includes(`extension-type="${type}"`))
}
for (const name of ['local', 'manifest', 'registry', 'custom-list', 'auto-install', 'forked', 'monetization', 'upgrades', 'reference']) {
  const old = await readFile(join(root, `docs/dev/extensions/${name}.md`), 'utf8')
  assert.ok(old.includes(`/dev/extensions/python/${name}`), `Missing compatibility link: ${name}`)
  assert.ok((await readFile(join(root, `docs/dev/extensions/python/${name}.md`), 'utf8')).length)
}
assert.ok((await readFile(join(root, 'docs/dev/building-extensions.md'), 'utf8')).includes('/dev/extensions/python/building'))

const fixture = await mkdtemp(join(tmpdir(), 'lnbits-extension-docs-'))
try {
  const dataPath = join(fixture, 'docs/.vitepress/data/extensions-meta.json')
  await mkdir(dirname(dataPath), {recursive: true})
  await writeFile(dataPath, JSON.stringify({tpos: {tileUrl: 'https://example.com/existing-tile.png'}}))
  // Curated pages must survive both generators, byte for byte.
  for (const ext of EXTENSIONS.filter(ext => ext.curated)) {
    const folder = join(fixture, 'docs/extensions', ext.id)
    await mkdir(folder, {recursive: true})
    await writeFile(join(folder, 'index.md'), `CURATED ${ext.id}\n`)
    await writeFile(join(folder, 'api.md'), `VERIFIED API ${ext.id}\n`)
  }
  const runner = join(fixture, 'run.mjs')
  await writeFile(runner, `
    globalThis.fetch = async url => {
      if (url.includes('/tpos/')) return {ok: false};
      if (url.endsWith('/config.json')) return {ok: true, json: async () => ({tile: '/ext-assets/battleshipswasm/assets/icon.png'})};
      return {ok: true, text: async () => '# Example\\n\\nA small extension README.'};
    };
    await import(${JSON.stringify(new URL('./generate-extension-pages.mjs', import.meta.url).href)});
  `)
  const generated = spawnSync(process.execPath, [runner], {cwd: fixture, encoding: 'utf8'})
  assert.equal(generated.status, 0, generated.stderr)
  const meta = JSON.parse(await readFile(dataPath, 'utf8'))
  assert.equal(meta.tpos.tileUrl, 'https://example.com/existing-tile.png', 'Preserve tiles when fetch fails')
  assert.equal(meta.battleshipswasm.tileUrl, 'https://raw.githubusercontent.com/lnbits/battleshipswasm/main/static/assets/icon.png')
  for (const ext of EXTENSIONS) assert.equal(meta[ext.id].extensionType, ext.extensionType)
  for (const ext of EXTENSIONS.filter(ext => ext.curated)) {
    assert.equal(await readFile(join(fixture, 'docs/extensions', ext.id, 'index.md'), 'utf8'), `CURATED ${ext.id}\n`)
    assert.equal(await readFile(join(fixture, 'docs/extensions', ext.id, 'api.md'), 'utf8'), `VERIFIED API ${ext.id}\n`)
  }
  assert.ok((await readFile(join(fixture, 'docs/extensions/tpos/index.md'), 'utf8')).includes('extension-type="python"'))

  // Copy the API updater beside a minimal typed catalog so its normal relative paths work.
  const updater = join(fixture, 'scripts/update-extension-api-pages.mjs')
  await mkdir(dirname(updater), {recursive: true})
  await writeFile(updater, await readFile(join(root, 'scripts/update-extension-api-pages.mjs')))
  await writeFile(join(fixture, 'docs/.vitepress/data/extensions.js'), `export const EXTENSIONS = ${JSON.stringify(EXTENSIONS)};`)
  const updated = spawnSync(process.execPath, [updater], {cwd: fixture, encoding: 'utf8'})
  assert.equal(updated.status, 0, updated.stderr)
  for (const ext of EXTENSIONS.filter(ext => ext.extensionType === 'wasm')) {
    assert.equal(await readFile(join(fixture, 'docs/extensions', ext.id, 'api.md'), 'utf8'), `VERIFIED API ${ext.id}\n`)
  }
  console.log(`Checked ${EXTENSIONS.length} typed catalog entries, compatibility destinations, and both generators.`)
} finally {
  await rm(fixture, {recursive: true, force: true})
}
