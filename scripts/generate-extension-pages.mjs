#!/usr/bin/env node

/**
 * Generate documentation pages for all LNbits extensions by fetching
 * README.md content from each extension's GitHub repository.
 *
 * - Fetches README from GitHub (raw.githubusercontent.com)
 * - Strips H1, badges, and trailing whitespace
 * - Prepends ExtensionHeader component
 * - Appends standard footer (API link + Related Pages)
 * - Falls back to existing page if fetch fails
 * - API pages: only created if missing
 *
 * Env: GITHUB_TOKEN (optional, raises rate limit from 60 to 5000/hr)
 *
 * Usage: node scripts/generate-extension-pages.mjs
 */

import { writeFile, mkdir, readFile, access } from 'node:fs/promises'
import { join } from 'node:path'
import { EXTENSIONS } from '../docs/.vitepress/data/extensions.js'

const OUTPUT_DIR = 'docs/extensions'
const SPEC_PATH = 'docs/.vitepress/data/openapi.json'
const META_PATH = 'docs/.vitepress/data/extensions-meta.json'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''
const CONCURRENCY = 10

// ── Helpers ──

function buildHeader(ext) {
  return `<ExtensionHeader
  name="${ext.name}"
  description="${ext.description}"
  category="${ext.category}"
  icon="${ext.icon}"
  repo="${ext.repo}"
/>`
}

function buildFooter(ext) {
  return `
## API Reference

See the [${ext.name} API documentation](./api) for endpoint details.

## Related Pages

- [${ext.name} API Reference](./api): API endpoints for this extension
- [All Extensions](/extensions/): Browse all LNbits extensions
`
}

async function fileExists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

/**
 * Fetch raw README.md from a GitHub repo.
 * Tries main branch first, then master.
 */
async function fetchReadme(repo) {
  const headers = { 'User-Agent': 'lnbits-docs-generator' }
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`
  }

  for (const branch of ['main', 'master']) {
    const url = `https://raw.githubusercontent.com/${repo}/${branch}/README.md`
    try {
      const res = await fetch(url, { headers })
      if (res.ok) {
        return await res.text()
      }
    } catch {
      // network error, try next branch
    }
  }
  return null
}

/**
 * Fetch config.json from a GitHub repo and extract the tile image URL.
 * Returns the absolute raw GitHub URL to the tile image, or null.
 */
async function fetchConfig(repo) {
  const headers = { 'User-Agent': 'lnbits-docs-generator' }
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`
  }

  for (const branch of ['main', 'master']) {
    const url = `https://raw.githubusercontent.com/${repo}/${branch}/config.json`
    try {
      const res = await fetch(url, { headers })
      if (res.ok) {
        const config = await res.json()
        if (config.tile) {
          // tile is like "/tpos/static/image/tpos.png" - extract path after ext id
          const tilePath = config.tile.replace(/^\/[^/]+\//, '')
          return `https://raw.githubusercontent.com/${repo}/${branch}/${tilePath}`
        }
        return null
      }
    } catch {
      // try next branch
    }
  }
  return null
}

/**
 * Test whether a line is a GitHub badge / decorative HTML that should be removed.
 */
function isBadgeLine(line) {
  const t = line.trim()
  return (
    t.startsWith('[![') ||
    (t.startsWith('![') && t.includes('badge')) ||
    (t.startsWith('![') && t.includes('shield')) ||
    (t.startsWith('<img') && t.includes('badge')) ||
    (t.startsWith('<a') && (t.includes('badge') || t.includes('shields.io'))) ||
    t.includes('img.shields.io') ||
    t.startsWith('<p align') ||
    t === '</p>' ||
    t === '</a>'
  )
}

/**
 * Clean a GitHub README for use as a docs page:
 * - Strip everything before the first H2 (##) - this removes the logo block,
 *   badges, H1, and intro blurb which are all replaced by ExtensionHeader
 * - If no H2 exists, fall back to stripping just the H1 + badges
 * - Strip badge lines throughout the body
 * - Strip "Powered by LNbits" boilerplate section at the bottom
 */
function cleanReadme(raw) {
  const lines = raw.split('\n')

  // Find the first H2 line - everything before it is header boilerplate
  let firstH2 = -1
  for (let i = 0; i < lines.length; i++) {
    if (/^## /.test(lines[i])) {
      firstH2 = i
      break
    }
  }

  let start = 0
  if (firstH2 > 0) {
    // Start from the first H2
    start = firstH2
  } else {
    // No H2 found - strip leading blanks, badges, H1, blockquote manually
    while (start < lines.length && lines[start].trim() === '') start++
    // Skip badge/HTML lines
    while (start < lines.length) {
      const t = lines[start].trim()
      if (t === '' || isBadgeLine(t) || t.startsWith('<') || t.startsWith('![')) {
        start++
        continue
      }
      break
    }
    // Strip H1
    if (start < lines.length && lines[start].startsWith('# ')) {
      start++
      while (start < lines.length && lines[start].trim() === '') start++
    }
    // Strip blockquote
    while (start < lines.length && lines[start].startsWith('>')) start++
    while (start < lines.length && lines[start].trim() === '') start++
  }

  // Filter remaining lines: remove badge lines and "Powered by LNbits" boilerplate
  const filtered = []
  let skipSection = false

  for (let i = start; i < lines.length; i++) {
    const t = lines[i].trim()

    // Detect "Powered by LNbits" section - skip everything from there to end
    if (/^#{1,3}\s+Powered by/i.test(t)) {
      skipSection = true
      continue
    }
    if (skipSection) continue

    // Skip standalone badge lines in the body
    if (isBadgeLine(t) && !lines[i - 1]?.trim().startsWith('|')) {
      continue
    }

    filtered.push(lines[i])
  }

  let body = filtered.join('\n').trimEnd()

  return body
}

/**
 * Post-process a cleaned README body:
 * - Convert relative image/link paths to absolute GitHub URLs
 * - Remove orphaned closing HTML tags
 * - Collapse triple+ newlines
 */
function postProcess(body, repo) {
  const rawBase = `https://raw.githubusercontent.com/${repo}/main/`
  const repoBase = `https://github.com/${repo}/blob/main/`

  // Convert relative image paths: ![alt](./path) or <img src="./path">
  body = body.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/)(?!#)([^)]+)\)/g,
    (_, alt, path) => `![${alt}](${rawBase}${path.replace(/^\.\//, '')})`
  )
  body = body.replace(
    /<img\s+([^>]*?)src="(?!https?:\/\/)([^"]+)"/g,
    (match, pre, path) => `<img ${pre}src="${rawBase}${path.replace(/^\.\//, '')}"`
  )

  // Convert relative link paths (not anchors, not absolute)
  body = body.replace(
    /\[([^\]]+)\]\((?!https?:\/\/)(?!#)(?!mailto:)([^)]+)\)/g,
    (_, text, path) => {
      // Don't convert ./api or other docs-internal links
      if (path.startsWith('./api') || path.startsWith('/extensions/') || path.startsWith('/guide/')) {
        return `[${text}](${path})`
      }
      return `[${text}](${repoBase}${path.replace(/^\.\//, '')})`
    }
  )

  // Remove orphaned HTML closing tags (opener was in the stripped header)
  // Match </tag> on its own line where no matching <tag> exists before it
  for (const tag of ['details', 'summary', 'div', 'section']) {
    const closeRe = new RegExp(`^\\s*</${tag}>\\s*$`, 'gm')
    const openRe = new RegExp(`<${tag}[\\s>]`, 'i')
    if (closeRe.test(body) && !openRe.test(body)) {
      body = body.replace(closeRe, '')
    }
  }

  return body.replace(/\n{3,}/g, '\n\n').trimEnd()
}

/**
 * Generate a fallback page when README fetch fails.
 */
function generateFallbackPage(ext) {
  return `${buildHeader(ext)}

## Overview

${ext.name} is an LNbits extension in the **${ext.category}** category.

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Click on ${ext.name} in the sidebar to open it
3. Follow the extension-specific setup if required

## Use Cases

- Explore common workflows in the extension UI
- Integrate via the [API](./api)
${buildFooter(ext)}`
}

function generateApiMd(ext, endpoints) {
  let md = `# ${ext.name} API

API endpoints for the ${ext.name} extension.

## Authentication

All endpoints require an API key via the \`X-Api-Key\` header.

`

  if (endpoints && endpoints.length > 0) {
    for (const { method, path, op } of endpoints) {
      md += `### \`${method.toUpperCase()}\` \`${path}\`\n\n`
      if (op.summary) md += `${op.summary}\n\n`
      if (op.description) md += `${op.description}\n\n`
      md += '---\n\n'
    }
  } else {
    md += `::: tip
Run \`npm run sync:openapi\` and then \`npm run generate:extensions\` to populate this page with endpoints from the live API spec.
:::
`
  }

  return md
}

/**
 * Process a single extension: fetch README + config, build page, write file.
 * Returns { status, tileUrl }.
 */
async function processExtension(ext, tagEndpoints) {
  const dir = join(OUTPUT_DIR, ext.id)
  await mkdir(dir, { recursive: true })

  const indexPath = join(dir, 'index.md')

  // Fetch README and config in parallel
  const [readme, tileUrl] = await Promise.all([
    fetchReadme(ext.repo),
    fetchConfig(ext.repo),
  ])

  if (readme) {
    const body = postProcess(cleanReadme(readme), ext.repo)
    const page = `${buildHeader(ext)}\n\n${body}\n${buildFooter(ext)}`
    await writeFile(indexPath, page, 'utf-8')
    return { status: 'fetched', tileUrl }
  }

  // Fetch failed - only write if no page exists yet
  if (!(await fileExists(indexPath))) {
    await writeFile(indexPath, generateFallbackPage(ext), 'utf-8')
    return { status: 'fallback', tileUrl }
  }

  return { status: 'skipped', tileUrl }
}

/**
 * Run promises with limited concurrency.
 */
async function runWithConcurrency(items, limit, fn) {
  const results = []
  let i = 0

  async function worker() {
    while (i < items.length) {
      const idx = i++
      results[idx] = await fn(items[idx])
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker())
  await Promise.all(workers)
  return results
}

async function main() {
  console.log(`Generating extension pages for ${EXTENSIONS.length} extensions...`)
  console.log(`GitHub token: ${GITHUB_TOKEN ? 'set' : 'not set (rate limit: 60/hr)'}`)

  // Try to load OpenAPI spec for per-extension endpoints
  let spec = null
  try {
    const raw = await readFile(SPEC_PATH, 'utf-8')
    spec = JSON.parse(raw)
  } catch {
    console.log('No OpenAPI spec found - generating pages without API details.')
  }

  // Group endpoints by tag
  const tagEndpoints = {}
  if (spec) {
    for (const [path, methods] of Object.entries(spec.paths || {})) {
      for (const [method, op] of Object.entries(methods)) {
        if (typeof op !== 'object' || !op.tags) continue
        for (const tag of op.tags) {
          const key = tag.toLowerCase().replace(/\s+/g, '')
          if (!tagEndpoints[key]) tagEndpoints[key] = []
          tagEndpoints[key].push({ method, path, op })
        }
      }
    }
  }

  const counts = { fetched: 0, fallback: 0, skipped: 0 }
  const extensionMeta = {}

  const results = await runWithConcurrency(EXTENSIONS, CONCURRENCY, async (ext) => {
    const { status, tileUrl } = await processExtension(ext, tagEndpoints)
    const icon = status === 'fetched' ? '✓' : status === 'fallback' ? '+' : '–'
    const tileInfo = tileUrl ? ' (tile ✓)' : ''
    console.log(`  ${icon} ${ext.id} (${status})${tileInfo}`)
    return { ext, status, tileUrl }
  })

  for (const { ext, status, tileUrl } of results) {
    counts[status]++
    if (tileUrl) {
      extensionMeta[ext.id] = { tileUrl }
    }
  }

  // Write extensions metadata (tile URLs) for Vue components
  await writeFile(META_PATH, JSON.stringify(extensionMeta, null, 2) + '\n', 'utf-8')
  console.log(`\nWrote ${Object.keys(extensionMeta).length} tile URLs to ${META_PATH}`)

  // API pages - only create if missing
  for (const ext of EXTENSIONS) {
    const apiPath = join(OUTPUT_DIR, ext.id, 'api.md')
    const endpoints = tagEndpoints[ext.id] || null
    if (!(await fileExists(apiPath))) {
      await writeFile(apiPath, generateApiMd(ext, endpoints), 'utf-8')
    }
  }

  console.log(
    `Done: ${counts.fetched} fetched from GitHub, ${counts.fallback} fallback created, ${counts.skipped} skipped (fetch failed, existing page kept)`
  )
}

main().catch((err) => {
  console.error('Error generating extension pages:', err.message)
  process.exit(1)
})
