#!/usr/bin/env node

/**
 * Parse the local OpenAPI spec and generate markdown files for each tag group.
 * Outputs to docs/api/core/
 *
 * Usage: node scripts/extract-endpoints.mjs
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'

const SPEC_PATH = 'docs/.vitepress/data/openapi.json'
const OUTPUT_DIR = 'docs/api/core'

function methodBadge(method) {
  return `\`${method.toUpperCase()}\``
}

function authString(security) {
  if (!security || security.length === 0) return 'None'
  const schemes = security.flatMap((s) => Object.keys(s))
  return schemes.join(', ')
}

function paramsTable(params) {
  if (!params || params.length === 0) return ''
  let md = '\n| Parameter | In | Type | Required | Description |\n'
  md += '| --- | --- | --- | --- | --- |\n'
  for (const p of params) {
    const type = p.schema ? p.schema.type || 'any' : 'any'
    md += `| \`${p.name}\` | ${p.in} | ${type} | ${p.required ? 'Yes' : 'No'} | ${p.description || '—'} |\n`
  }
  return md
}

function bodyExample(requestBody) {
  if (!requestBody) return ''
  const content = requestBody.content
  if (!content) return ''
  const json = content['application/json']
  if (!json || !json.schema) return ''

  const schema = json.schema
  if (schema.example) {
    return (
      '\n**Request body:**\n\n```json\n' +
      JSON.stringify(schema.example, null, 2) +
      '\n```\n'
    )
  }

  if (schema.properties) {
    const example = {}
    for (const [key, val] of Object.entries(schema.properties)) {
      example[key] = val.example || val.default || `<${val.type || 'any'}>`
    }
    return (
      '\n**Request body:**\n\n```json\n' +
      JSON.stringify(example, null, 2) +
      '\n```\n'
    )
  }

  return ''
}

function responseBlock(responses) {
  if (!responses) return ''
  let md = '\n**Responses:**\n\n'
  for (const [code, resp] of Object.entries(responses)) {
    md += `- **${code}** — ${resp.description || 'No description'}\n`
  }
  return md
}

function endpointBlock(method, path, op) {
  let md = `### ${methodBadge(method)} \`${path}\`\n\n`
  if (op.summary) md += `${op.summary}\n\n`
  if (op.description) md += `${op.description}\n\n`
  md += `**Auth:** ${authString(op.security)}\n`
  md += paramsTable(op.parameters)
  md += bodyExample(op.requestBody)
  md += responseBlock(op.responses)
  md += '\n---\n\n'
  return md
}

async function main() {
  let spec
  try {
    const raw = await readFile(SPEC_PATH, 'utf-8')
    spec = JSON.parse(raw)
  } catch {
    console.error(
      `Cannot read ${SPEC_PATH}. Run "npm run sync:openapi" first.`
    )
    process.exit(1)
  }

  // Group endpoints by first tag
  const groups = {}

  for (const [path, methods] of Object.entries(spec.paths || {})) {
    for (const [method, op] of Object.entries(methods)) {
      if (typeof op !== 'object' || !op.tags) continue
      const tag = (op.tags[0] || 'misc').toLowerCase().replace(/\s+/g, '-')
      if (!groups[tag]) groups[tag] = []
      groups[tag].push({ method, path, op })
    }
  }

  await mkdir(OUTPUT_DIR, { recursive: true })

  for (const [tag, endpoints] of Object.entries(groups)) {
    let md = `# ${tag.charAt(0).toUpperCase() + tag.slice(1)} API\n\n`
    md += `*Auto-generated from the OpenAPI spec.*\n\n`

    for (const { method, path, op } of endpoints) {
      md += endpointBlock(method, path, op)
    }

    const filename = `${OUTPUT_DIR}/${tag}.md`
    await writeFile(filename, md, 'utf-8')
    console.log(`Wrote ${endpoints.length} endpoints → ${filename}`)
  }

  console.log(
    `Done. ${Object.keys(groups).length} files generated in ${OUTPUT_DIR}/`
  )
}

main().catch((err) => {
  console.error('Error extracting endpoints:', err.message)
  process.exit(1)
})
