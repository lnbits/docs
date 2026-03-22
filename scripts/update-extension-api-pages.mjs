#!/usr/bin/env node
/**
 * Updates all extension api.md files with endpoint tables.
 * Reads extension name from index.md <ExtensionHeader>.
 * Run: node scripts/update-extension-api-pages.mjs
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const extDir = join(import.meta.dirname, '..', 'docs', 'extensions')
const dirs = readdirSync(extDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name)

let updated = 0
let skipped = 0

for (const ext of dirs) {
  const apiPath = join(extDir, ext, 'api.md')
  const indexPath = join(extDir, ext, 'index.md')

  if (!existsSync(apiPath)) { skipped++; continue }

  // Extract display name from index.md ExtensionHeader
  let displayName = ext.charAt(0).toUpperCase() + ext.slice(1)
  if (existsSync(indexPath)) {
    const indexContent = readFileSync(indexPath, 'utf-8')
    const nameMatch = indexContent.match(/name="([^"]+)"/)
    if (nameMatch) displayName = nameMatch[1]
  }

  const template = `# ${displayName} API

> API endpoints for the ${displayName} extension.

::: tip Live API Explorer
If you have a running LNbits instance, the interactive API docs are the fastest way to explore and test:
- **Swagger UI**: \`https://your-lnbits.com/docs\`
- **ReDoc**: \`https://your-lnbits.com/redoc\`

These are auto-generated from your running version and always up to date.
:::

## Base URL

\`\`\`
https://your-lnbits.com/${ext}/api/v1/
\`\`\`

## Authentication

| Key Type | Header | Access |
|---|---|---|
| **Admin key** | \`X-Api-Key\` | Full access (create, update, delete) |
| **Invoice key** | \`X-Api-Key\` | Read-only access (list, get) |

## Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| \`GET\` | \`/${ext}/api/v1/\` | Invoice | List all items |
| \`GET\` | \`/${ext}/api/v1/{id}\` | Invoice | Get a specific item |
| \`POST\` | \`/${ext}/api/v1/\` | Admin | Create a new item |
| \`PUT\` | \`/${ext}/api/v1/{id}\` | Admin | Update an item |
| \`DELETE\` | \`/${ext}/api/v1/{id}\` | Admin | Delete an item |

::: info Note
This is the standard CRUD pattern. The actual resource names and additional endpoints may vary. Check the **Swagger UI** on your instance for the exact paths and request/response schemas.
:::

## Example

\`\`\`bash
# List items
curl https://your-lnbits.com/${ext}/api/v1/ \\
  -H "X-Api-Key: YOUR_INVOICE_KEY"

# Create item
curl -X POST https://your-lnbits.com/${ext}/api/v1/ \\
  -H "X-Api-Key: YOUR_ADMIN_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "example"}'
\`\`\`

::: tip For AI Agents
Fetch the full OpenAPI spec from any running instance:
\`\`\`
GET https://your-lnbits.com/openapi.json
\`\`\`
Filter for paths starting with \`/${ext}/\` to isolate this extension's endpoints.
:::

## Related Pages

- [${displayName} Overview](./): Extension features and setup guide
- [API Authentication](/api/authentication): API key types and usage
- [Quick Reference](/api/quick-reference): All core LNbits endpoints
- [All Extensions](/extensions/): Browse the full extension catalog
`

  writeFileSync(apiPath, template)
  console.log(`UPDATE ${ext}/api.md -> ${displayName}`)
  updated++
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped`)
