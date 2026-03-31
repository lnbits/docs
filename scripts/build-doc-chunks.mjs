#!/usr/bin/env node

/**
 * Build a searchable chunk index from all docs markdown files.
 * Outputs docs/.vitepress/data/chunks.json for the chat plugin.
 *
 * Usage: node scripts/build-doc-chunks.mjs
 */

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, relative } from 'node:path'

const DOCS_DIR = 'docs'
const OUTPUT_FILE = 'docs/.vitepress/data/chunks.json'
const CHUNK_MAX_CHARS = 1200
const CHUNK_OVERLAP_CHARS = 150

async function walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name.startsWith('.') || entry.name === 'public' || entry.name === 'node_modules') continue
      files.push(...(await walkDir(fullPath)))
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }
  return files
}

function extractTitle(content) {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (fmMatch) {
    const titleMatch = fmMatch[1].match(/title:\s*['"]?(.+?)['"]?\s*$/m)
    if (titleMatch) return titleMatch[1]
  }
  const h1 = content.match(/^#\s+(.+)$/m)
  return h1 ? h1[1].trim() : null
}

function stripFrontmatter(content) {
  return content.replace(/^---\n[\s\S]*?\n---\n*/, '')
}

function stripVueComponents(content) {
  // Remove <script> blocks, Vue component tags, and HTML-heavy blocks
  return content
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[A-Z][a-zA-Z]*[^>]*\/>/g, '') // Self-closing Vue components
    .replace(/<[A-Z][a-zA-Z]*[^>]*>[\s\S]*?<\/[A-Z][a-zA-Z]*>/g, '') // Vue component blocks
}

function filePathToUrl(filePath) {
  let url = '/' + relative(DOCS_DIR, filePath)
    .replace(/\\/g, '/')
    .replace(/index\.md$/, '')
    .replace(/\.md$/, '')
  if (!url.endsWith('/')) url += '/'
  return url
}

/**
 * Split content into chunks by heading hierarchy.
 * Each chunk gets a breadcrumb path (e.g. "Installation > Docker > Updating")
 * so the search index can boost heading matches.
 */
function chunkContent(content) {
  const sections = []
  const headings = { 2: '', 3: '' }
  const parts = content.split(/^(#{2,3}\s+.+)$/m)

  let currentText = ''

  for (const part of parts) {
    const match = part.match(/^(#{2,3})\s+(.+)$/)
    if (match) {
      if (currentText.trim()) {
        sections.push({ breadcrumb: buildBreadcrumb(headings), text: currentText.trim() })
      }
      const level = match[1].length
      headings[level] = match[2].trim()
      if (level === 2) headings[3] = ''
      currentText = ''
    } else {
      currentText += part
    }
  }
  if (currentText.trim()) {
    sections.push({ breadcrumb: buildBreadcrumb(headings), text: currentText.trim() })
  }

  const chunks = []
  for (const { breadcrumb, text } of sections) {
    if (text.length <= CHUNK_MAX_CHARS) {
      chunks.push({ breadcrumb, text })
    } else {
      const paragraphs = text.split(/\n\n+/)
      let current = ''
      for (const para of paragraphs) {
        if (current.length + para.length > CHUNK_MAX_CHARS && current.length > 0) {
          chunks.push({ breadcrumb, text: current.trim() })
          const words = current.split(/\s+/)
          current = words.slice(-Math.ceil(CHUNK_OVERLAP_CHARS / 6)).join(' ') + '\n\n' + para
        } else {
          current += (current ? '\n\n' : '') + para
        }
      }
      if (current.trim()) chunks.push({ breadcrumb, text: current.trim() })
    }
  }

  return chunks
}

function buildBreadcrumb(headings) {
  return [headings[2], headings[3]].filter(Boolean).join(' > ')
}

async function main() {
  const files = await walkDir(DOCS_DIR)
  console.log(`Found ${files.length} markdown files`)

  const allChunks = []
  let id = 0

  for (const filePath of files) {
    const raw = await readFile(filePath, 'utf-8')
    const title = extractTitle(raw) || filePath
    const url = filePathToUrl(filePath)
    const content = stripVueComponents(stripFrontmatter(raw))

    if (content.trim().length < 50) continue // Skip near-empty files

    const chunks = chunkContent(content)
    for (const chunk of chunks) {
      allChunks.push({
        id: id++,
        title,
        breadcrumb: chunk.breadcrumb,
        url,
        text: chunk.text,
      })
    }
  }

  // Write output
  await mkdir('docs/.vitepress/data', { recursive: true })
  await writeFile(OUTPUT_FILE, JSON.stringify(allChunks, null, 2))
  console.log(`Built ${allChunks.length} chunks from ${files.length} files → ${OUTPUT_FILE}`)
}

main().catch(console.error)
