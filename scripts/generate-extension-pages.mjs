#!/usr/bin/env node

/**
 * Generate and migrate documentation pages for all LNbits extensions.
 *
 * - New extensions: creates full page with ExtensionHeader + template
 * - Existing pages: migrates old H1/badge/blockquote header → ExtensionHeader
 * - API pages: only created if missing
 *
 * Usage: node scripts/generate-extension-pages.mjs
 */

import { writeFile, mkdir, readFile, access } from 'node:fs/promises'
import { join } from 'node:path'
import { EXTENSIONS } from '../docs/.vitepress/data/extensions.js'

const OUTPUT_DIR = 'docs/extensions'
const SPEC_PATH = 'docs/.vitepress/data/openapi.json'

/**
 * Build the ExtensionHeader component tag for an extension.
 */
function buildHeader(ext) {
  return `<ExtensionHeader
  name="${ext.name}"
  description="${ext.description}"
  category="${ext.category}"
  icon="${ext.icon}"
  repo="${ext.repo}"
/>`
}

/**
 * Generate a new extension index page from scratch.
 */
function generateNewPage(ext) {
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

## API Reference

See the [${ext.name} API documentation](./api) for endpoint details.

## Related Pages

- [${ext.name} API Reference](./api): API endpoints for this extension
- [All Extensions](/extensions/): Browse all LNbits extensions
`
}

/**
 * Migrate an existing page: replace the old H1 + GitHub badge + blockquote
 * with the ExtensionHeader component.
 */
function migratePage(content, ext) {
  const lines = content.split('\n')
  let startCut = -1
  let endCut = -1

  // Find the H1 line (with or without GitHub badge)
  for (let i = 0; i < Math.min(lines.length, 5); i++) {
    if (lines[i].startsWith('# ')) {
      startCut = i
      break
    }
  }

  if (startCut === -1) return content // no H1 found, skip

  // Find end of header block: skip H1, blank lines, blockquote
  endCut = startCut + 1
  while (endCut < lines.length && lines[endCut].trim() === '') endCut++
  if (endCut < lines.length && lines[endCut].startsWith('>')) {
    endCut++ // skip the blockquote line
    while (endCut < lines.length && lines[endCut].trim() === '') endCut++
  }

  // Build new header
  const header = buildHeader(ext)
  const remaining = lines.slice(endCut).join('\n')

  return `${header}\n\n${remaining}`
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

async function fileExists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function main() {
  // Try to load OpenAPI spec for per-extension endpoints
  let spec = null
  try {
    const raw = await readFile(SPEC_PATH, 'utf-8')
    spec = JSON.parse(raw)
  } catch {
    console.log('No OpenAPI spec found — generating pages without API details.')
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

  let created = 0
  let migrated = 0

  for (const ext of EXTENSIONS) {
    const dir = join(OUTPUT_DIR, ext.id)
    await mkdir(dir, { recursive: true })

    const indexPath = join(dir, 'index.md')
    const apiPath = join(dir, 'api.md')
    const endpoints = tagEndpoints[ext.id] || null

    // Handle index page
    if (await fileExists(indexPath)) {
      const existing = await readFile(indexPath, 'utf-8')
      // Only migrate if it still has the old H1 pattern (not already using ExtensionHeader)
      if (!existing.includes('<ExtensionHeader') && existing.startsWith('#')) {
        const updated = migratePage(existing, ext)
        await writeFile(indexPath, updated, 'utf-8')
        migrated++
      }
    } else {
      await writeFile(indexPath, generateNewPage(ext), 'utf-8')
      created++
    }

    // API pages: only create if missing
    if (!(await fileExists(apiPath))) {
      await writeFile(apiPath, generateApiMd(ext, endpoints), 'utf-8')
    }
  }

  console.log(`Extensions: ${created} created, ${migrated} migrated, ${EXTENSIONS.length} total`)
}

main().catch((err) => {
  console.error('Error generating extension pages:', err.message)
  process.exit(1)
})
