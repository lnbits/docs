<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vitepress'
import { useChatBackend } from '../composables/useChatBackend.js'

const { messages, isLoading, sendMessage, clearMessages } = useChatBackend()

const isOpen = ref(false)
const inputText = ref('')
const messagesContainer = ref(null)
const inputEl = ref(null)
const isMobile = ref(false)

const suggestedQuestions = [
  'How do I install LNbits?',
  'Which wallet backends are supported?',
  'How do I build an extension?',
  'How do I set up a reverse proxy?',
]

const hasMessages = computed(() => messages.value.length > 0)

const router = useRouter()

function toggleChat() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => inputEl.value?.focus())
  }
}

function closeChat() {
  isOpen.value = false
}

function handleSend() {
  const text = inputText.value.trim()
  if (!text || isLoading.value) return
  inputText.value = ''
  sendMessage(text)
}

function handleSuggestion(question) {
  inputText.value = ''
  sendMessage(question)
}

function handleSourceClick(url, event) {
  event.preventDefault()
  closeChat()
  router.go(url)
}

function handleKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

function handleEscape(e) {
  if (e.key === 'Escape' && isOpen.value) {
    closeChat()
  }
}

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}

// Auto-scroll to bottom on new messages
watch(
  () => messages.value.length,
  () => {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    })
  }
)

// Also scroll when loading state changes (typing indicator appears)
watch(isLoading, () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
})

function openFromNav() {
  isOpen.value = true
  nextTick(() => {
    const el = document.querySelector('.dc-input')
    if (el) el.focus()
  })
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  document.addEventListener('keydown', handleEscape)
  window.addEventListener('open-doc-chat', openFromNav)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  document.removeEventListener('keydown', handleEscape)
  window.removeEventListener('open-doc-chat', openFromNav)
})

// Simple markdown to HTML (lightweight, no external deps)
function renderMarkdown(text) {
  if (!text) return ''

  let html = text
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="dc-code-block"><code class="language-${lang}">${code.trim()}</code></pre>`
  })

  // Tables
  html = html.replace(
    /((?:\|.*\|[ \t]*\n){2,})/g,
    (tableBlock) => {
      const rows = tableBlock.trim().split('\n')
      if (rows.length < 2) return tableBlock
      let table = '<table class="dc-table">'
      rows.forEach((row, i) => {
        // Skip separator row
        if (i === 1 && /^\|[\s\-:|]+\|$/.test(row.trim())) return
        const tag = i === 0 ? 'th' : 'td'
        const cells = row
          .split('|')
          .filter((c, idx, arr) => idx > 0 && idx < arr.length - 1)
          .map((c) => c.trim())
        table += '<tr>' + cells.map((c) => `<${tag}>${c}</${tag}>`).join('') + '</tr>'
      })
      table += '</table>'
      return table
    }
  )

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="dc-inline-code">$1</code>')

  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')

  // Italic
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="dc-link" target="_blank" rel="noopener">$1</a>'
  )

  // Ordered lists
  html = html.replace(/((?:^\d+\.\s+.*$\n?)+)/gm, (block) => {
    const items = block
      .trim()
      .split('\n')
      .map((line) => line.replace(/^\d+\.\s+/, '').trim())
      .map((item) => `<li>${item}</li>`)
      .join('')
    return `<ol class="dc-list">${items}</ol>`
  })

  // Unordered lists
  html = html.replace(/((?:^[-*]\s+.*$\n?)+)/gm, (block) => {
    const items = block
      .trim()
      .split('\n')
      .map((line) => line.replace(/^[-*]\s+/, '').trim())
      .map((item) => `<li>${item}</li>`)
      .join('')
    return `<ul class="dc-list">${items}</ul>`
  })

  // Paragraphs (double newline)
  html = html
    .split(/\n\n+/)
    .map((block) => {
      block = block.trim()
      if (!block) return ''
      if (
        block.startsWith('<pre') ||
        block.startsWith('<table') ||
        block.startsWith('<ol') ||
        block.startsWith('<ul')
      )
        return block
      return `<p>${block.replace(/\n/g, '<br>')}</p>`
    })
    .join('')

  return html
}
</script>

<template>
  <!-- Backdrop (mobile only) -->
  <Transition name="dc-backdrop">
    <div v-if="isOpen && isMobile" class="dc-backdrop" @click="closeChat"></div>
  </Transition>

  <!-- Trigger Button -->
  <button
    class="dc-trigger"
    :class="{ 'dc-trigger--open': isOpen }"
    @click="toggleChat"
    :title="isOpen ? 'Close chat' : 'Ask about LNbits'"
    aria-label="Toggle LNbits assistant chat"
  >
    <!-- Chat icon -->
    <svg v-if="!isOpen" class="dc-trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
    <!-- Close icon -->
    <svg v-else class="dc-trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  </button>

  <!-- Chat Panel -->
  <Transition :name="isMobile ? 'dc-panel-mobile' : 'dc-panel'">
    <div v-if="isOpen" class="dc-panel" :class="{ 'dc-panel--mobile': isMobile }">
      <!-- Header -->
      <div class="dc-header">
        <div class="dc-header-left">
          <svg class="dc-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          <span class="dc-header-title">LNbits Assistant</span>
          <span class="dc-header-badge">Beta</span>
        </div>
        <div class="dc-header-actions">
          <button
            v-if="hasMessages"
            class="dc-header-btn"
            @click="clearMessages"
            title="Clear conversation"
            aria-label="Clear conversation"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-2 14H7L5 6"/>
              <path d="M10 11v6"/>
              <path d="M14 11v6"/>
            </svg>
          </button>
          <button
            class="dc-header-btn"
            @click="closeChat"
            title="Close"
            aria-label="Close chat"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Messages Area -->
      <div class="dc-messages" ref="messagesContainer">
        <!-- Welcome State -->
        <div v-if="!hasMessages && !isLoading" class="dc-welcome">
          <div class="dc-welcome-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </div>
          <h3 class="dc-welcome-title">Ask anything about LNbits</h3>
          <p class="dc-welcome-text">
            Get help with installation, configuration, extensions, API usage, and more.
          </p>
          <div class="dc-suggestions">
            <button
              v-for="question in suggestedQuestions"
              :key="question"
              class="dc-suggestion"
              @click="handleSuggestion(question)"
            >
              <svg class="dc-suggestion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
              {{ question }}
            </button>
          </div>
        </div>

        <!-- Messages -->
        <template v-for="(msg, i) in messages" :key="i">
          <!-- User message -->
          <div v-if="msg.role === 'user'" class="dc-msg dc-msg--user">
            <div class="dc-msg-bubble dc-msg-bubble--user">
              {{ msg.content }}
            </div>
          </div>

          <!-- Assistant message -->
          <div v-else class="dc-msg dc-msg--assistant">
            <div class="dc-msg-content" v-html="renderMarkdown(msg.content)"></div>
            <!-- Source chips -->
            <div v-if="msg.sources?.length" class="dc-sources">
              <a
                v-for="source in msg.sources"
                :key="source.url"
                :href="source.url"
                class="dc-source-chip"
                @click="handleSourceClick(source.url, $event)"
              >
                <svg class="dc-source-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                {{ source.title }}
              </a>
            </div>
          </div>
        </template>

        <!-- Typing indicator -->
        <div v-if="isLoading" class="dc-msg dc-msg--assistant">
          <div class="dc-typing">
            <span class="dc-typing-dot"></span>
            <span class="dc-typing-dot"></span>
            <span class="dc-typing-dot"></span>
          </div>
        </div>
      </div>

      <!-- Input Bar -->
      <div class="dc-input-bar">
        <div class="dc-input-wrap">
          <textarea
            ref="inputEl"
            v-model="inputText"
            class="dc-input"
            placeholder="Ask about LNbits..."
            rows="1"
            @keydown="handleKeydown"
            :disabled="isLoading"
          ></textarea>
          <button
            class="dc-send"
            :class="{ 'dc-send--active': inputText.trim() && !isLoading }"
            @click="handleSend"
            :disabled="!inputText.trim() || isLoading"
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        <div class="dc-input-hint">
          Press Enter to send
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* ── Trigger Button ── */
.dc-trigger {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 210;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  background: var(--vp-c-brand-1);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.dc-trigger:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 28px rgba(0, 0, 0, 0.25);
}

.dc-trigger--open {
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.dc-trigger--open:hover {
  color: var(--vp-c-text-1);
}

.dark .dc-trigger:not(.dc-trigger--open) {
  box-shadow: 0 4px 20px rgba(149, 117, 205, 0.3);
}

.dark .dc-trigger:not(.dc-trigger--open):hover {
  box-shadow: 0 6px 28px rgba(149, 117, 205, 0.4);
}

.dc-trigger-icon {
  width: 24px;
  height: 24px;
}

/* ── Backdrop ── */
.dc-backdrop {
  position: fixed;
  inset: 0;
  z-index: 299;
  background: rgba(0, 0, 0, 0.5);
}

.dc-backdrop-enter-active,
.dc-backdrop-leave-active {
  transition: opacity 0.25s ease;
}

.dc-backdrop-enter-from,
.dc-backdrop-leave-to {
  opacity: 0;
}

/* ── Panel ── */
.dc-panel {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 300;
  width: 420px;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg);
  border-left: 1px solid var(--vp-c-divider);
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
}

.dark .dc-panel {
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.4);
}

.dc-panel--mobile {
  width: 100vw;
  border-left: none;
  box-shadow: none;
}

/* Panel transitions - desktop slide */
.dc-panel-enter-active {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.dc-panel-leave-active {
  transition: transform 0.2s ease-in;
}
.dc-panel-enter-from {
  transform: translateX(100%);
}
.dc-panel-leave-to {
  transform: translateX(100%);
}

/* Panel transitions - mobile slide up */
.dc-panel-mobile-enter-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.dc-panel-mobile-leave-active {
  transition: transform 0.2s ease-in;
}
.dc-panel-mobile-enter-from {
  transform: translateY(100%);
}
.dc-panel-mobile-leave-to {
  transform: translateY(100%);
}

/* ── Header ── */
.dc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
}

.dc-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dc-header-icon {
  width: 20px;
  height: 20px;
  color: var(--vp-c-brand-1);
}

.dc-header-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.dc-header-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dc-header-actions {
  display: flex;
  gap: 4px;
}

.dc-header-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  transition: all 0.15s ease;
}

.dc-header-btn:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.dc-header-btn svg {
  width: 18px;
  height: 18px;
}

/* ── Messages Area ── */
.dc-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  scroll-behavior: smooth;
}

.dc-messages::-webkit-scrollbar {
  width: 4px;
}

.dc-messages::-webkit-scrollbar-track {
  background: transparent;
}

.dc-messages::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 4px;
}

/* ── Welcome State ── */
.dc-welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px 16px;
}

.dc-welcome-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.dc-welcome-icon svg {
  width: 28px;
  height: 28px;
}

.dc-welcome-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 6px;
}

.dc-welcome-text {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin: 0 0 24px;
  line-height: 1.5;
  max-width: 280px;
}

/* ── Suggested Questions ── */
.dc-suggestions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  max-width: 320px;
}

.dc-suggestion {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  font-size: 13px;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
}

.dc-suggestion:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.dc-suggestion-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  color: var(--vp-c-brand-1);
  opacity: 0.6;
}

.dc-suggestion:hover .dc-suggestion-icon {
  opacity: 1;
}

/* ── Messages ── */
.dc-msg {
  margin-bottom: 16px;
}

.dc-msg--user {
  display: flex;
  justify-content: flex-end;
}

.dc-msg-bubble--user {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 14px 14px 4px 14px;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
}

.dc-msg--assistant {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.dc-msg-content {
  max-width: 100%;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  word-break: break-word;
}

/* Markdown elements inside assistant messages */
.dc-msg-content :deep(p) {
  margin: 0 0 8px;
}

.dc-msg-content :deep(p:last-child) {
  margin-bottom: 0;
}

.dc-msg-content :deep(strong) {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.dc-msg-content :deep(.dc-inline-code) {
  padding: 2px 5px;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-family: var(--vp-font-family-mono);
}

.dc-msg-content :deep(.dc-code-block) {
  margin: 8px 0;
  padding: 12px 14px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.6;
}

.dc-msg-content :deep(.dc-code-block code) {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
}

.dc-msg-content :deep(.dc-table) {
  width: 100%;
  margin: 8px 0;
  border-collapse: collapse;
  font-size: 12px;
}

.dc-msg-content :deep(.dc-table th),
.dc-msg-content :deep(.dc-table td) {
  padding: 6px 10px;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
}

.dc-msg-content :deep(.dc-table th) {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

.dc-msg-content :deep(.dc-list) {
  margin: 6px 0;
  padding-left: 20px;
}

.dc-msg-content :deep(.dc-list li) {
  margin-bottom: 3px;
}

.dc-msg-content :deep(.dc-link) {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.dc-msg-content :deep(.dc-link:hover) {
  text-decoration: underline;
}

/* ── Source Chips ── */
.dc-sources {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.dc-source-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-2);
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.dc-source-chip:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.dc-source-icon {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

/* ── Typing Indicator ── */
.dc-typing {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 0;
}

.dc-typing-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  animation: dc-bounce 1.2s infinite;
}

.dc-typing-dot:nth-child(2) {
  animation-delay: 0.15s;
}

.dc-typing-dot:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes dc-bounce {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-6px);
    opacity: 1;
  }
}

/* ── Input Bar ── */
.dc-input-bar {
  flex-shrink: 0;
  padding: 12px 16px;
  padding-bottom: max(12px, env(safe-area-inset-bottom));
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.dc-input-wrap {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 8px 8px 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-elv);
  transition: border-color 0.15s ease;
}

.dc-input-wrap:focus-within {
  border-color: var(--vp-c-brand-1);
}

.dc-input {
  flex: 1;
  border: none;
  outline: none;
  background: none;
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-family: inherit;
  line-height: 1.5;
  resize: none;
  max-height: 100px;
}

.dc-input::placeholder {
  color: var(--vp-c-text-3);
}

.dc-send {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 9px;
  background: var(--vp-c-divider);
  color: var(--vp-c-text-3);
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.dc-send--active {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.dc-send--active:hover {
  opacity: 0.9;
}

.dc-send svg {
  width: 16px;
  height: 16px;
}

.dc-input-hint {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-top: 6px;
  text-align: center;
  opacity: 0.6;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .dc-trigger {
    bottom: 16px;
    right: 16px;
    width: 48px;
    height: 48px;
  }

  .dc-trigger-icon {
    width: 22px;
    height: 22px;
  }

  .dc-header {
    padding-top: max(14px, env(safe-area-inset-top));
  }
}
</style>
