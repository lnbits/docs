import { readFile } from 'node:fs/promises'
import { EXTENSIONS } from '../docs/.vitepress/data/extensions.js'

const spec = JSON.parse(await readFile('docs/.vitepress/data/openapi.json', 'utf-8'))

// Build tag set from OpenAPI
const tags = new Set()
const tagEndpoints = {}
for (const [path, methods] of Object.entries(spec.paths || {})) {
  for (const [method, op] of Object.entries(methods)) {
    if (typeof op !== 'object' || !op.tags) continue
    for (const tag of op.tags) {
      const key = tag.toLowerCase().replace(/\s+/g, '')
      tags.add(key)
      if (!tagEndpoints[key]) tagEndpoints[key] = []
      tagEndpoints[key].push({ method, path, summary: op.summary || '' })
    }
  }
}

const found = []
const missing = []
for (const ext of EXTENSIONS) {
  const id = ext.id
  const altId = id.replace(/_/g, '')
  const matchKey = tags.has(id) ? id : tags.has(altId) ? altId : null
  if (matchKey) {
    found.push({ id, name: ext.name, count: tagEndpoints[matchKey].length })
  } else {
    missing.push({ id, name: ext.name, repo: ext.repo })
  }
}

console.log(`=== FOUND IN OPENAPI (${found.length}) ===`)
for (const f of found) console.log(`  ${f.id} — ${f.count} endpoints`)
console.log()
console.log(`=== MISSING FROM OPENAPI (${missing.length}) ===`)
for (const m of missing) console.log(`  ${m.id} — ${m.repo}`)
