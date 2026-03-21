#!/usr/bin/env node

/**
 * Generate llms.txt and llms-full.txt for LLM-friendly documentation access.
 *
 * llms.txt - index of all pages with titles and paths
 * llms-full.txt - full concatenated content of all pages
 *
 * Usage: node scripts/generate-llm-files.mjs
 */

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, relative } from 'node:path'

const DOCS_DIR = 'docs'
const OUTPUT_DIR = 'docs/public'
const SITE_URL = 'https://docs.lnbits.com'

async function walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      // Skip .vitepress, public, node_modules
      if (entry.name.startsWith('.') || entry.name === 'public' || entry.name === 'node_modules') {
        continue
      }
      files.push(...(await walkDir(fullPath)))
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : null
}

function extractFrontmatterTitle(content) {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (!fmMatch) return null
  const titleMatch = fmMatch[1].match(/title:\s*['"]?(.+?)['"]?\s*$/m)
  return titleMatch ? titleMatch[1] : null
}

function mdPathToUrl(filePath) {
  let rel = relative(DOCS_DIR, filePath)
  // index.md -> directory URL
  rel = rel.replace(/index\.md$/, '')
  // other .md -> drop extension
  rel = rel.replace(/\.md$/, '')
  // clean trailing slash
  if (rel.endsWith('/')) rel = rel.slice(0, -1)
  return rel ? `${SITE_URL}/${rel}` : SITE_URL
}

async function main() {
  const files = (await walkDir(DOCS_DIR)).sort()

  // Build llms.txt (index)
  const indexLines = [
    '# LNbits Documentation',
    '',
    '> Free and open-source Lightning Network wallet and accounts system',
    '',
  ]

  // Build llms-full.txt (concatenated)
  const fullParts = [
    '# LNbits Documentation - Full Content',
    '',
    '> Auto-generated from all documentation pages.',
    '',
  ]

  for (const filePath of files) {
    const content = await readFile(filePath, 'utf-8')
    const title =
      extractTitle(content) ||
      extractFrontmatterTitle(content) ||
      relative(DOCS_DIR, filePath)
    const url = mdPathToUrl(filePath)

    // Index entry
    indexLines.push(`- [${title}](${url})`)

    // Full content entry - strip frontmatter
    const stripped = content.replace(/^---\n[\s\S]*?\n---\n*/, '')
    fullParts.push(`---\n\nSource: ${url}\n\n${stripped.trim()}\n`)
  }

  await mkdir(OUTPUT_DIR, { recursive: true })

  // Only generate llms-full.txt - llms.txt is curated manually
  await writeFile(
    join(OUTPUT_DIR, 'llms-full.txt'),
    fullParts.join('\n'),
    'utf-8'
  )

  console.log(`Generated llms-full.txt (${files.length} pages)`)
  console.log('Note: llms.txt is maintained manually in docs/public/llms.txt')
}

main().catch((err) => {
  console.error('Error generating LLM files:', err.message)
  process.exit(1)
})
