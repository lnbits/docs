#!/usr/bin/env node

/**
 * Fetch the LNbits OpenAPI spec and save locally.
 * Usage: node scripts/sync-openapi.mjs [url]
 */

import { writeFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

const OPENAPI_URL =
  process.argv[2] || 'https://demo.lnbits.com/openapi.json'
const OUTPUT_PATH = 'docs/.vitepress/data/openapi.json'

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_URL}...`)

  const res = await fetch(OPENAPI_URL)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  }

  const spec = await res.json()

  await mkdir(dirname(OUTPUT_PATH), { recursive: true })
  await writeFile(OUTPUT_PATH, JSON.stringify(spec, null, 2), 'utf-8')

  const paths = Object.keys(spec.paths || {}).length
  console.log(`Saved ${paths} paths to ${OUTPUT_PATH}`)
}

main().catch((err) => {
  console.error('Error syncing OpenAPI spec:', err.message)
  process.exit(1)
})
