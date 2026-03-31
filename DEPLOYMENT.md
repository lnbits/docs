# Deployment

## Static docs

Build and deploy the static site:

```bash
npm run docs:build
```

Output is in `docs/.vitepress/dist/`. Serve with any static file host (Nginx, Caddy, Netlify, GitHub Pages, Cloudflare Pages).

## AI Chat Sidecar (Beta / Experimental)

The docs site includes a RAG-powered chat assistant. In development it runs as a Vite plugin inside `npm run docs:dev`. In production, the docs are static files — the chat needs a separate server to proxy LLM requests.

### How it works

1. Markdown docs are chunked into a BM25 search index at build time
2. User questions are matched against the index to find relevant sections
3. Matched sections are sent as context to an LLM provider
4. The answer is returned with source links back to the docs

### Providers

| Priority | Provider | Models | Setup |
|----------|----------|--------|-------|
| Primary | [Groq](https://groq.com) | Llama 3.3 70B, Llama 3.1 8B | Free signup, no credit card |
| Fallback | [mlvoca](https://mlvoca.github.io/free-llm-api/) | DeepSeek R1, TinyLlama | No signup needed |

With a Groq key you get fast responses (< 5s) from a 70B model that synthesizes docs into actionable guidance. Without a key, mlvoca provides a zero-config fallback (slower, smaller model).

### Development

```bash
npm run build:chunks

# With Groq (recommended)
GROQ_API_KEY=gsk_... npm run docs:dev

# Without any key (mlvoca fallback)
npm run docs:dev
```

### Production sidecar

The sidecar is a standalone Python HTTP server (`chat_server.py`). Zero pip dependencies — Python 3.10+ stdlib only. Written in Python since LNbits developers already have Python in their stack.

**Endpoints:** `/api/chat` (POST), `/api/models` (GET), `/api/health` (GET)

```bash
# 1. Build the search index
npm run build:chunks

# 2. Start the sidecar
GROQ_API_KEY=gsk_... python chat_server.py
# → Chat API listening on http://localhost:3141 — using Groq (70B)

# 3. Build docs pointing to the sidecar
VITE_CHAT_API_URL=https://chat.your-domain.com npm run docs:build
```

### Configuration

| Variable | Default | Where | Description |
|----------|---------|-------|-------------|
| `GROQ_API_KEY` | (none) | Server | Groq API key. Without it, falls back to mlvoca |
| `CHAT_PORT` | `3141` | Server | Port the sidecar listens on |
| `VITE_CHAT_API_URL` | (none) | Build | Tells the frontend where the sidecar lives |

### Graceful degradation

If the sidecar is not running, the chat panel still loads but shows a connection error when the user sends a message. The rest of the docs site works normally.

### Limitations

- **Groq free tier** — 30 requests/minute, 100K tokens/day for Llama 70B. Sufficient for moderate traffic.
- **mlvoca fallback** — 1.5B model, 20-60 second responses. Answers are less detailed.
- **No conversation memory** — each question is independent across sessions.
- **BM25 search** — keyword-based retrieval. Works well for docs but may miss semantically related content using different wording.
- **Heuristic guardrails** — off-topic detection uses regex patterns and search relevance scores. Edge cases exist.

### Architecture

```
docs/.vitepress/
  chat-plugin.mjs     Vite plugin (dev only) — ~100 lines
  chat-logic.mjs      BM25 search, guardrails, LLM providers — ~280 lines
  data/chunks.json     Built by scripts/build-doc-chunks.mjs

chat_server.py         Standalone production server (Python) — ~300 lines

scripts/
  build-doc-chunks.mjs Markdown → chunks.json with heading breadcrumbs
```
