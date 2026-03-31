import { ref } from 'vue'

const isBrowser = typeof window !== 'undefined'

const messages = ref([])
const isLoading = ref(false)
const currentModel = ref(isBrowser ? (localStorage.getItem('lnbits-chat-model') || 'llama-70b') : 'llama-70b')
const availableModels = ref([])

// Same origin in dev (Vite plugin). For production, set VITE_CHAT_API_URL at build time.
const API_BASE = (isBrowser && import.meta.env.VITE_CHAT_API_URL) || ''

async function fetchModels() {
  try {
    const res = await fetch(`${API_BASE}/api/models`)
    if (!res.ok) return
    const data = await res.json()
    availableModels.value = data.models
    if (!data.models.find((m) => m.key === currentModel.value)) {
      currentModel.value = data.default
    }
  } catch {
    // Chat server not available
  }
}

if (isBrowser) fetchModels()

async function callBackend(allMessages) {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: allMessages.map(({ role, content }) => ({ role, content })),
      model: currentModel.value,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Server error (${res.status})`)
  }

  const data = await res.json()
  return { content: data.answer, sources: data.sources || [] }
}

export function useChatBackend() {
  function setModel(key) {
    currentModel.value = key
    localStorage.setItem('lnbits-chat-model', key)
  }

  async function sendMessage(text) {
    if (!text.trim() || isLoading.value) return

    messages.value = [...messages.value, { role: 'user', content: text }]
    isLoading.value = true

    try {
      const result = await callBackend([...messages.value])
      messages.value = [
        ...messages.value,
        { role: 'assistant', content: result.content, sources: result.sources },
      ]
    } catch (err) {
      const msg = err.message === 'Failed to fetch'
        ? 'Chat is not available. The docs server may not be running.'
        : err.message
      messages.value = [
        ...messages.value,
        { role: 'assistant', content: msg, sources: [] },
      ]
    } finally {
      isLoading.value = false
    }
  }

  function clearMessages() {
    messages.value = []
  }

  return { messages, isLoading, currentModel, availableModels, sendMessage, clearMessages, setModel }
}
