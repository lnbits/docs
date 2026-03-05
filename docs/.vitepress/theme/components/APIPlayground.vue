<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  baseUrl: { type: String, default: 'https://demo.lnbits.com' },
})

const method = ref('GET')
const path = ref('/api/v1/wallet')
const apiKey = ref('')
const body = ref('')
const response = ref(null)
const loading = ref(false)
const error = ref(null)

const fullUrl = computed(() => `${props.baseUrl}${path.value}`)

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']

async function send() {
  loading.value = true
  error.value = null
  response.value = null

  const headers = { 'Content-Type': 'application/json' }
  if (apiKey.value) {
    headers['X-Api-Key'] = apiKey.value
  }

  const opts = { method: method.value, headers }
  if (['POST', 'PUT', 'PATCH'].includes(method.value) && body.value.trim()) {
    opts.body = body.value
  }

  try {
    const res = await fetch(fullUrl.value, opts)
    const text = await res.text()
    let data
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
    response.value = {
      status: res.status,
      statusText: res.statusText,
      data,
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="playground">
    <div class="playground-row">
      <select v-model="method" class="playground-method">
        <option v-for="m in methods" :key="m" :value="m">{{ m }}</option>
      </select>
      <input v-model="path" class="playground-path" placeholder="/api/v1/..." />
      <button class="playground-send" :disabled="loading" @click="send">
        {{ loading ? 'Sending...' : 'Send' }}
      </button>
    </div>

    <div class="playground-row">
      <input
        v-model="apiKey"
        class="playground-key"
        type="password"
        placeholder="X-Api-Key (optional)"
      />
    </div>

    <div v-if="['POST', 'PUT', 'PATCH'].includes(method)" class="playground-row">
      <textarea
        v-model="body"
        class="playground-body"
        rows="4"
        placeholder='{"key": "value"}'
      />
    </div>

    <div v-if="error" class="playground-error">
      Error: {{ error }}
    </div>

    <div v-if="response" class="playground-response">
      <div class="playground-status" :class="{ ok: response.status < 400 }">
        {{ response.status }} {{ response.statusText }}
      </div>
      <pre class="playground-output">{{ typeof response.data === 'string' ? response.data : JSON.stringify(response.data, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped>
.playground {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  background: var(--vp-c-bg-alt);
}

.playground-row {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.playground-method {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-weight: 600;
  font-size: 13px;
}

.playground-path,
.playground-key {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
}

.playground-send {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
}

.playground-send:hover {
  opacity: 0.9;
}

.playground-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.playground-body {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  resize: vertical;
}

.playground-error {
  padding: 8px 12px;
  border-radius: 6px;
  background: rgba(239, 83, 80, 0.1);
  color: #ef5350;
  font-size: 13px;
  margin-top: 8px;
}

.playground-response {
  margin-top: 12px;
}

.playground-status {
  font-size: 13px;
  font-weight: 600;
  color: #ef5350;
  margin-bottom: 8px;
}

.playground-status.ok {
  color: #4caf50;
}

.playground-output {
  padding: 12px;
  border-radius: 6px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-size: 12px;
  overflow-x: auto;
  max-height: 400px;
  overflow-y: auto;
}
</style>
