#!/usr/bin/env node

/**
 * Generate documentation pages for LNbits companion apps by fetching
 * README.md content from each app's GitHub repository.
 *
 * Usage: node scripts/generate-app-pages.mjs
 */

import { writeFile, mkdir, readFile, access } from 'node:fs/promises'
import { join } from 'node:path'

const OUTPUT_DIR = 'docs/apps'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''

const APPS = [
  {
    id: 'tpos-wrapper',
    name: 'TPoS Wrapper',
    description: 'Tap to Pay on Android - accept credit cards, debit cards, Google Pay, and Apple Pay via Stripe alongside Lightning.',
    repo: 'lnbits/TPoS-Stripe-Tap-to-Pay-Wrapper',
    category: 'Merchant Tools',
    icon: '📱',
  },
]

async function fileExists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

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
      // try next branch
    }
  }
  return null
}

function cleanReadme(raw) {
  let content = raw
  // Remove H1 (we add our own)
  content = content.replace(/^#\s+.+\n*/m, '')
  // Remove HTML blocks at the top (badges, centered headers, etc.)
  content = content.replace(/^<p\s+align[^>]*>[\s\S]*?<\/p>\s*/m, '')
  // Remove standalone badge images
  content = content.replace(/^\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)\s*/gm, '')
  content = content.replace(/^!\[[^\]]*\]\([^)]*\)\s*/gm, '')
  // Replace em dashes
  content = content.replaceAll(' — ', ' - ')
  content = content.replaceAll('—', ' - ')
  // Trim leading whitespace
  content = content.replace(/^\s+/, '')
  return content
}

function buildPage(app, readmeContent) {
  const header = `# ${app.name}

> ${app.description}

::: info Companion App
${app.name} is a standalone application, not an LNbits extension. It works alongside your LNbits instance.
:::

`

  const footer = `

## Links

- [GitHub repository](https://github.com/${app.repo})
- [Download latest release](https://github.com/${app.repo}/releases)

## Related Pages

- [TPoS Extension](/extensions/tpos/) - the LNbits extension this app extends
- [Stripe Setup](/guide/core/fiat-stripe) - configure Stripe as fiat provider
- [PayPal Setup](/guide/core/fiat-paypal) - configure PayPal as fiat provider
- [All Extensions](/extensions/) - browse all LNbits extensions
`

  return header + readmeContent + footer
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true })

  for (const app of APPS) {
    const outPath = join(OUTPUT_DIR, `${app.id}.md`)

    console.log(`Fetching README for ${app.name} from ${app.repo}...`)
    const raw = await fetchReadme(app.repo)

    if (raw) {
      const cleaned = cleanReadme(raw)
      const page = buildPage(app, cleaned)
      await writeFile(outPath, page, 'utf-8')
      console.log(`  Generated ${outPath}`)
    } else {
      // Check if page already exists (fallback)
      if (await fileExists(outPath)) {
        console.log(`  Fetch failed, keeping existing ${outPath}`)
      } else {
        // Write a minimal page
        const fallback = buildPage(app, `Visit the [GitHub repository](https://github.com/${app.repo}) for documentation and setup instructions.\n`)
        await writeFile(outPath, fallback, 'utf-8')
        console.log(`  Fetch failed, wrote fallback ${outPath}`)
      }
    }
  }

  console.log(`\nGenerated ${APPS.length} app page(s)`)
}

main().catch((err) => {
  console.error('Error generating app pages:', err.message)
  process.exit(1)
})
