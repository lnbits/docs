#!/usr/bin/env node

/**
 * Generate the MCP Server documentation page by fetching README.md
 * from the LNbits MCP Server GitHub repository.
 *
 * Usage: node scripts/generate-mcp-page.mjs
 */

import { writeFile, mkdir, access } from 'node:fs/promises'
import { join } from 'node:path'

const OUTPUT_DIR = 'docs/llm'
const OUTPUT_FILE = join(OUTPUT_DIR, 'mcp-server.md')
const REPO = 'lnbits/LNbits-MCP-Server'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''

async function fileExists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function fetchReadme() {
  const headers = { 'User-Agent': 'lnbits-docs-generator' }
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`
  }

  for (const branch of ['main', 'master']) {
    const url = `https://raw.githubusercontent.com/${REPO}/${branch}/README.md`
    try {
      const res = await fetch(url, { headers })
      if (res.ok) {
        return await res.text()
      }
    } catch {
      // try next branch
    }
  }
  return null
}

function cleanReadme(raw) {
  let content = raw

  // Remove all HTML blocks: <a>, <picture>, <p>, <div> with nested content
  content = content.replace(/<a\s[^>]*>[\s\S]*?<\/a>\s*/gm, '')
  content = content.replace(/<picture>[\s\S]*?<\/picture>\s*/gm, '')
  content = content.replace(/<p\s+align[^>]*>[\s\S]*?<\/p>\s*/gm, '')
  content = content.replace(/<div\s+align[^>]*>[\s\S]*?<\/div>\s*/gm, '')
  // Remove standalone HTML img tags
  content = content.replace(/<img\s[^>]*\/?\s*>\s*/gm, '')

  // Remove H1 (we add our own)
  content = content.replace(/^#\s+.+\n*/m, '')

  // Remove standalone badge images (markdown syntax)
  content = content.replace(/^\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)\s*/gm, '')
  content = content.replace(/^!\[[^\]]*\]\([^)]*\)\s*/gm, '')

  // Replace em dashes
  content = content.replaceAll(' — ', ' - ')
  content = content.replaceAll('—', ' - ')

  // Strip emojis (Unicode emoji ranges)
  content = content.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1FA00}-\u{1FA9F}\u{200D}]+\s?/gu, '')

  // Fix relative image paths to absolute GitHub raw URLs
  content = content.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
    (_, alt, path) => `![${alt}](https://raw.githubusercontent.com/${REPO}/main/${path})`
  )

  // Fix relative links to point to GitHub
  content = content.replace(
    /\[([^\]]+)\]\((?!https?:\/\/|#)([^)]+)\)/g,
    (_, text, path) => `[${text}](https://github.com/${REPO}/blob/main/${path})`
  )

  // Trim leading whitespace
  content = content.replace(/^\s+/, '')

  return content
}

function buildPage(readmeContent) {
  const header = `# MCP Server

> Connect AI assistants like Claude directly to your LNbits instance. Create invoices, send payments, manage wallets, and control extensions through natural conversation.

::: tip What is MCP?
The [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) is an open standard that lets AI assistants use external tools. The LNbits MCP Server exposes 30+ Lightning wallet operations that Claude, Cursor, and other MCP-compatible agents can call directly.
:::

<SkillHeader repo="${REPO}" :official="true" source="https://github.com/${REPO}" />

<iframe width="560" height="315" src="https://rumble.com/embed/v6tquy6/?pub=4" title="LNbits MCP Server - LNbits in your AI" frameborder="0" allowfullscreen style="max-width: 100%; border-radius: 8px; margin: 16px 0;"></iframe>

## How it fits together

| Layer | What it does | Link |
|---|---|---|
| **Docs** (llms.txt) | Agents *read* about LNbits | [LLM Integration](/llm/) |
| **Skills** (.md files) | Agents *learn* LNbits patterns | [Skills Catalog](/llm/skills) |
| **MCP Server** (this page) | Agents *control* LNbits | You are here |

---

`

  const footer = `

## Related Pages

- [LLM Integration](/llm/) - how AI agents consume LNbits documentation
- [Skills Catalog](/llm/skills) - task-ready instruction files for agents
- [API Reference](/api/) - the REST API the MCP Server calls under the hood
- [Authentication](/api/authentication) - API key types and permissions
- [Extensions](/extensions/) - extensions the MCP Server can control (LNURLp, TPoS, SatsPay)
`

  return header + readmeContent + footer
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true })

  console.log(`Fetching README from ${REPO}...`)
  const raw = await fetchReadme()

  if (raw) {
    const cleaned = cleanReadme(raw)
    const page = buildPage(cleaned)
    await writeFile(OUTPUT_FILE, page, 'utf-8')
    console.log(`  Generated ${OUTPUT_FILE}`)
  } else {
    if (await fileExists(OUTPUT_FILE)) {
      console.log(`  Fetch failed, keeping existing ${OUTPUT_FILE}`)
    } else {
      const fallback = buildPage(`Visit the [GitHub repository](https://github.com/${REPO}) for documentation and setup instructions.\n`)
      await writeFile(OUTPUT_FILE, fallback, 'utf-8')
      console.log(`  Fetch failed, wrote fallback ${OUTPUT_FILE}`)
    }
  }
}

main().catch((err) => {
  console.error('Error generating MCP page:', err.message)
  process.exit(1)
})
