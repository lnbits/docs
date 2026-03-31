/**
 * Vite plugin that serves the docs chat API during development.
 * Intercepts /api/chat and /api/models — no separate server needed.
 *
 * For production, use chat_server.py instead.
 */

import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadSearch, getModelsResponse, handleChat, setGroqKey } from './chat-logic.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CHUNKS_PATH = resolve(__dirname, 'data/chunks.json')

const RATE_WINDOW = 60_000
const RATE_MAX = 20

function readJSON(req) {
  return new Promise((resolve, reject) => {
    const parts = []
    let size = 0
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > 50_000) return reject(new Error('Body too large'))
      parts.push(chunk)
    })
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(parts).toString())) }
      catch { reject(new Error('Invalid JSON')) }
    })
    req.on('error', reject)
  })
}

export function chatPlugin() {
  let search = null
  const rates = new Map()

  function isRateLimited(ip) {
    const now = Date.now()
    const b = rates.get(ip)
    if (!b || now - b.start > RATE_WINDOW) { rates.set(ip, { start: now, count: 1 }); return false }
    b.count++
    return b.count > RATE_MAX
  }

  return {
    name: 'lnbits-chat',

    configureServer(server) {
      if (process.env.GROQ_API_KEY) setGroqKey(process.env.GROQ_API_KEY)

      try {
        search = loadSearch(CHUNKS_PATH)
        const mode = process.env.GROQ_API_KEY ? 'Groq (70B)' : 'mlvoca (1.5B)'
        console.log(`[chat] Loaded search index — using ${mode}`)
      } catch {
        console.log(`[chat] chunks.json not found — run "npm run build:chunks" to enable chat`)
      }

      // Periodic rate-limit cleanup
      const cleanup = setInterval(() => {
        const now = Date.now()
        for (const [ip, b] of rates) { if (now - b.start > RATE_WINDOW) rates.delete(ip) }
      }, RATE_WINDOW)
      cleanup.unref()

      server.middlewares.use('/api/models', (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(getModelsResponse()))
      })

      server.middlewares.use('/api/health', (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ status: search ? 'ok' : 'no index' }))
      })

      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        if (!search) {
          res.writeHead(503, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Chat not available. Run "npm run build:chunks" first.' }))
          return
        }

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        if (isRateLimited(ip)) {
          res.writeHead(429, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Too many requests.' }))
          return
        }

        try {
          const body = await readJSON(req)
          const result = await handleChat(search, body)
          res.writeHead(result.status, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(result.body))
        } catch (err) {
          console.error('[chat]', err.message)
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Internal server error' }))
        }
      })
    },
  }
}
