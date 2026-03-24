#!/usr/bin/env node

/**
 * Generate documentation pages for LNbits eCommerce plugins by fetching
 * README.md content from each plugin's GitHub repository.
 *
 * Usage: node scripts/generate-plugin-pages.mjs
 */

import { writeFile, mkdir, access } from 'node:fs/promises'
import { join } from 'node:path'

const OUTPUT_DIR = 'docs/plugins'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''

const PLUGINS = [
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    description: 'Accept Bitcoin on-chain and Lightning payments in your WooCommerce store via LNbits.',
    repo: 'lnbits/lnbits-bitcoin-onchain-and-lightning-payment-gateway',
    platform: 'WordPress / WooCommerce',
    icon: '🛒',
    links: {
      wordpress: 'https://wordpress.org/plugins/lnbits-bitcoin-onchain-and-lightning-payment-gateway/',
      news: 'https://news.lnbits.com/news/lnbits-woocommerce-plugin-for-bitcoin-payments',
    },
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

function cleanReadme(raw, repo) {
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
  // Fix relative image paths to absolute GitHub raw URLs
  content = content.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
    (_, alt, path) => `![${alt}](https://raw.githubusercontent.com/${repo}/main/${path})`
  )
  // Fix stray code fences (unclosed blocks)
  const fences = content.match(/```/g)
  if (fences && fences.length % 2 !== 0) {
    // Remove the last stray fence
    const lastIdx = content.lastIndexOf('```')
    content = content.slice(0, lastIdx) + content.slice(lastIdx + 3)
  }
  // Trim leading whitespace
  content = content.replace(/^\s+/, '')
  return content
}

function buildPage(plugin, readmeContent) {
  const header = `# ${plugin.name} Plugin

> ${plugin.description}

::: info eCommerce Plugin
This is an eCommerce plugin, not an LNbits extension. It runs inside ${plugin.platform} and connects to your LNbits server via its API.
:::

`

  const linksSection = []
  linksSection.push(`- [GitHub repository](https://github.com/${plugin.repo})`)
  linksSection.push(`- [Download latest release](https://github.com/${plugin.repo}/releases)`)
  if (plugin.links?.wordpress) {
    linksSection.push(`- [WordPress plugin page](${plugin.links.wordpress})`)
  }
  if (plugin.links?.news) {
    linksSection.push(`- [Announcement](${plugin.links.news})`)
  }

  const footer = `

## Links

${linksSection.join('\n')}

## Related Pages

- [Plugins Overview](/plugins/) - all eCommerce plugins
- [API Reference](/api/) - LNbits API that plugins connect to
- [Authentication](/api/authentication) - how to authenticate API calls
- [Fiat Payments](/guide/core/fiat-payments) - accepting fiat alongside Lightning
`

  return header + readmeContent + footer
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true })

  for (const plugin of PLUGINS) {
    const outPath = join(OUTPUT_DIR, `${plugin.id}.md`)

    console.log(`Fetching README for ${plugin.name} from ${plugin.repo}...`)
    const raw = await fetchReadme(plugin.repo)

    if (raw) {
      const cleaned = cleanReadme(raw, plugin.repo)
      const page = buildPage(plugin, cleaned)
      await writeFile(outPath, page, 'utf-8')
      console.log(`  Generated ${outPath}`)
    } else {
      if (await fileExists(outPath)) {
        console.log(`  Fetch failed, keeping existing ${outPath}`)
      } else {
        const fallback = buildPage(plugin, `Visit the [GitHub repository](https://github.com/${plugin.repo}) for documentation and setup instructions.\n`)
        await writeFile(outPath, fallback, 'utf-8')
        console.log(`  Fetch failed, wrote fallback ${outPath}`)
      }
    }
  }

  console.log(`\nGenerated ${PLUGINS.length} plugin page(s)`)
}

main().catch((err) => {
  console.error('Error generating plugin pages:', err.message)
  process.exit(1)
})
