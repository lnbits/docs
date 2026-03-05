import { ref } from 'vue'

const messages = ref([])
const isLoading = ref(false)

let backendHandler = null

// Stub responses for demo/testing
const stubResponses = [
  {
    content:
      'You can install LNbits using several methods:\n\n1. **uv** (recommended) — fastest setup, handles Python automatically\n2. **Poetry** — traditional Python dependency management\n3. **Docker** — containerized, good for production\n4. **Nix** — reproducible builds\n5. **AppImage** — single-file desktop app\n6. **Node platforms** — Voltage, Fly.io, Embassy, Citadel\n\nFor most users, **uv** is the quickest path:\n\n```bash\ngit clone https://github.com/lnbits/lnbits.git\ncd lnbits\nuv sync\nuv run lnbits\n```\n\nThen open `http://localhost:5000` in your browser.',
    sources: [
      { title: 'Installation Overview', url: '/guide/installation/' },
      { title: 'uv (Recommended)', url: '/guide/installation/uv' },
      { title: 'Docker', url: '/guide/installation/docker' },
    ],
  },
  {
    content:
      'LNbits supports **20+ wallet backends** as funding sources. The most popular options:\n\n| Backend | Type | Best for |\n|---------|------|----------|\n| **LND** | Local node | Full control |\n| **CLN** | Local node | Advanced users |\n| **Alby** | Service | Quick start |\n| **Strike** | Service | Fiat on-ramp |\n| **FakeWallet** | Testing | Development |\n\nConfigure your backend in `.env`:\n\n```bash\nLNBITS_BACKEND_WALLET_CLASS=LndWallet\nLND_GRPC_ENDPOINT=https://127.0.0.1\nLND_GRPC_MACAROON=your_macaroon_hex\n```',
    sources: [
      { title: 'Wallet Backends', url: '/guide/wallets/' },
      { title: 'Backend Comparison', url: '/guide/wallets/comparison' },
    ],
  },
  {
    content:
      'To build a LNbits extension:\n\n1. **Scaffold** — use the example extension as a template\n2. **Define models** in `models.py` using Pydantic\n3. **Create migrations** in `migrations/` for database tables\n4. **Build API routes** in `views_api.py`\n5. **Add the frontend** with Vue 3 + Quasar in `templates/`\n\nKey files in every extension:\n\n```\nmy_extension/\n├── __init__.py        # Extension metadata\n├── config.json        # Name, version, description\n├── models.py          # Pydantic models\n├── crud.py            # Database operations\n├── views.py           # Page routes\n├── views_api.py       # API endpoints\n├── migrations/        # DB migrations\n└── templates/         # Vue frontend\n```\n\nStart with `make ext` to scaffold a new extension.',
    sources: [
      { title: 'Building Extensions', url: '/dev/extensions/' },
      { title: 'Architecture', url: '/dev/architecture' },
      { title: 'Contributing', url: '/dev/contributing' },
    ],
  },
]

let stubIndex = 0

async function stubHandler(_messages) {
  await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800))
  const resp = stubResponses[stubIndex % stubResponses.length]
  stubIndex++
  return resp
}

export function useChatBackend() {
  function setBackendHandler(handler) {
    backendHandler = handler
  }

  async function sendMessage(text) {
    if (!text.trim() || isLoading.value) return

    messages.value = [...messages.value, { role: 'user', content: text }]
    isLoading.value = true

    try {
      const handler = backendHandler || stubHandler
      const result = await handler([...messages.value])
      messages.value = [
        ...messages.value,
        {
          role: 'assistant',
          content: result.content,
          sources: result.sources || [],
        },
      ]
    } catch (err) {
      messages.value = [
        ...messages.value,
        {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
          sources: [],
        },
      ]
    } finally {
      isLoading.value = false
    }
  }

  function clearMessages() {
    messages.value = []
    stubIndex = 0
  }

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    setBackendHandler,
  }
}
