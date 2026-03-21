<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vitepress'
import { useChatBackend } from '../composables/useChatBackend.js'
import openaiIcon from '@lobehub/icons-static-svg/icons/openai.svg'
import claudeIcon from '@lobehub/icons-static-svg/icons/claude-color.svg'
import perplexityIcon from '@lobehub/icons-static-svg/icons/perplexity-color.svg'
import geminiIcon from '@lobehub/icons-static-svg/icons/gemini-color.svg'
import grokIcon from '@lobehub/icons-static-svg/icons/grok.svg'
import cursorIcon from '@lobehub/icons-static-svg/icons/cursor.svg'
import codexIcon from '@lobehub/icons-static-svg/icons/codex-color.svg'

// ── Route: hide on home page ──
const route = useRoute()
const isHomePage = computed(() => route.path === '/' || route.path === '/index.html')

// ── Copy Page state ──
const showCopyMenu = ref(false)
const copyStep = ref('intent')
const selectedIntent = ref(null)
const notification = ref('')

// ── Chat state ──
const { messages, isLoading, sendMessage, clearMessages } = useChatBackend()
const isChatOpen = ref(false)
const inputText = ref('')
const messagesContainer = ref(null)
const inputEl = ref(null)
const isMobile = ref(false)
const router = useRouter()

const hasMessages = computed(() => messages.value.length > 0)

const suggestedQuestions = [
  'How do I install LNbits?',
  'Which wallet backends are supported?',
  'How do I build an extension?',
  'How do I set up a reverse proxy?',
]

const intents = [
  { key: 'explain', label: 'Explain this', desc: 'Break down the concepts', prompt: 'Explain the following documentation in clear, simple terms. Focus on the key concepts and how they relate to each other.\n\nDocumentation:' },
  { key: 'code', label: 'Write code for this', desc: 'Get working examples', prompt: 'Based on the following documentation, write a working code example that I can adapt. Include comments explaining each step.\n\nDocumentation:' },
  { key: 'troubleshoot', label: 'Help me troubleshoot', desc: 'Diagnose an issue', prompt: 'I\'m having an issue related to the following documentation. Help me diagnose and fix the problem. Start by asking me what error or unexpected behavior I\'m seeing.\n\nDocumentation for context:' },
  { key: 'guide', label: 'Guide me step by step', desc: 'Walkthrough from start to finish', prompt: 'Walk me through this step by step. Based on the following documentation, give me a clear numbered sequence of actions to follow.\n\nDocumentation:' },
]

const URL_CONTENT_LIMIT = 6000

// ── Copy Page logic ──
function toggleCopyMenu() {
  if (isChatOpen.value) return
  showCopyMenu.value = !showCopyMenu.value
  if (showCopyMenu.value) {
    copyStep.value = 'intent'
    selectedIntent.value = null
  }
}

function closeCopyMenu(e) {
  if (!e.target.closest('.pt-bar') && !e.target.closest('.pt-copy-menu')) {
    showCopyMenu.value = false
  }
}

function selectIntent(intent) {
  selectedIntent.value = intent
  copyStep.value = 'tool'
}

function goBack() {
  copyStep.value = 'intent'
  selectedIntent.value = null
}

function getContentEl() {
  return document.querySelector('.vp-doc div[class*="content"]')
    || document.querySelector('.vp-doc')
    || document.querySelector('.VPHome')
    || document.querySelector('main')
}

function getPageTitle() {
  const h1 = document.querySelector('.vp-doc h1')
    || document.querySelector('.VPHero .name')
  return h1 ? h1.textContent.trim() : document.title
}

function getPageUrl() {
  return window.location.href
}

function htmlToMarkdown(el) {
  let md = ''
  const walk = (node) => {
    if (node.nodeType === 3) { md += node.textContent; return }
    if (node.nodeType !== 1) return
    const tag = node.tagName.toLowerCase()
    if (node.closest('.pt-bar') || node.closest('.pt-copy-menu') || node.closest('.dc-panel')) return
    if (node.closest('.VPNav') || node.closest('.VPSidebar') || node.closest('.VPFooter')) return
    if (['h1','h2','h3','h4','h5','h6'].includes(tag)) { md += '\n' + '#'.repeat(parseInt(tag[1])) + ' ' + node.textContent.trim() + '\n\n' }
    else if (tag === 'pre') { const code = node.querySelector('code'); const lang = (code?.className || '').match(/language-(\w+)/)?.[1] || ''; md += '```' + lang + '\n' + (code || node).textContent + '```\n\n' }
    else if (tag === 'code' && node.parentElement?.tagName !== 'PRE') { md += '`' + node.textContent + '`' }
    else if (tag === 'p') { node.childNodes.forEach(walk); md += '\n\n' }
    else if (tag === 'li') { const parent = node.parentElement; md += (parent?.tagName === 'OL' ? (Array.from(parent.children).indexOf(node) + 1) + '. ' : '- '); node.childNodes.forEach(walk); md += '\n' }
    else if (tag === 'ul' || tag === 'ol') { md += '\n'; node.childNodes.forEach(walk); md += '\n' }
    else if (tag === 'a') { md += '[' + node.textContent + '](' + (node.getAttribute('href') || '') + ')' }
    else if (tag === 'strong' || tag === 'b') { md += '**' + node.textContent + '**' }
    else if (tag === 'em' || tag === 'i') { md += '*' + node.textContent + '*' }
    else if (tag === 'table') { md += '\n'; node.querySelectorAll('tr').forEach((tr, i) => { const cells = [...tr.querySelectorAll('th,td')].map(c => c.textContent.trim()); md += '| ' + cells.join(' | ') + ' |\n'; if (i === 0) md += '| ' + cells.map(() => '---').join(' | ') + ' |\n' }); md += '\n' }
    else if (tag === 'blockquote') { md += node.textContent.trim().split('\n').map(l => '> ' + l.trim()).join('\n') + '\n\n' }
    else if (tag === 'br') { md += '\n' }
    else if (tag === 'hr') { md += '\n---\n\n' }
    else if (tag === 'img') { md += `![${node.getAttribute('alt') || ''}](${node.getAttribute('src') || ''})` }
    else { node.childNodes.forEach(walk) }
  }
  walk(el)
  return md.replace(/\n{3,}/g, '\n\n').trim()
}

function getMarkdownContent() {
  const el = getContentEl()
  if (!el) return ''
  return `# ${getPageTitle()}\n\nSource: ${getPageUrl()}\n\n${htmlToMarkdown(el)}`
}

function buildPromptContent(intent) {
  return `${intent.prompt}\n\n${getMarkdownContent()}`
}

function truncateForUrl(text) {
  return text.length <= URL_CONTENT_LIMIT ? text : text.slice(0, URL_CONTENT_LIMIT) + '\n\n[Content truncated - full page was copied to clipboard]'
}

function notify(msg) {
  notification.value = msg
  setTimeout(() => { notification.value = '' }, 2500)
}

function formatName(key) {
  return { claude: 'Claude', chatgpt: 'ChatGPT', gemini: 'Gemini', perplexity: 'Perplexity', grok: 'Grok', cursor: 'Cursor', codex: 'Codex' }[key] || key
}

async function openInLLM(target) {
  const fullContent = buildPromptContent(selectedIntent.value)
  await navigator.clipboard.writeText(fullContent)
  if (target === 'chatgpt' || target === 'perplexity') {
    const truncated = truncateForUrl(fullContent)
    const urls = { chatgpt: `https://chatgpt.com/?q=${encodeURIComponent(truncated)}`, perplexity: `https://www.perplexity.ai/?q=${encodeURIComponent(truncated)}` }
    window.open(urls[target], '_blank')
    notify(`Opened ${formatName(target)} with your question`)
  } else if (target === 'claude' || target === 'gemini' || target === 'grok') {
    const urls = { claude: 'https://claude.ai/new', gemini: 'https://gemini.google.com/', grok: 'https://grok.com/' }
    window.open(urls[target], '_blank')
    notify(`Copied - paste into ${formatName(target)}`)
  } else {
    notify(`Copied - paste into ${formatName(target)}`)
  }
  showCopyMenu.value = false
}

async function copyMarkdown() {
  await navigator.clipboard.writeText(getMarkdownContent())
  notify('Copied as Markdown')
  showCopyMenu.value = false
}

async function copyPlaintext() {
  const el = getContentEl()
  if (!el) return
  await navigator.clipboard.writeText(`${getPageTitle()}\nSource: ${getPageUrl()}\n\n${el.innerText}`)
  notify('Copied as Plain Text')
  showCopyMenu.value = false
}

// ── Chat logic ──
function toggleChat() {
  showCopyMenu.value = false
  isChatOpen.value = !isChatOpen.value
  if (isChatOpen.value) nextTick(() => inputEl.value?.focus())
}

function closeChat() { isChatOpen.value = false }

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
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
}

function handleEscape(e) {
  if (e.key === 'Escape') {
    if (isChatOpen.value) closeChat()
    if (showCopyMenu.value) showCopyMenu.value = false
  }
}

function checkMobile() { isMobile.value = window.innerWidth <= 768 }

watch(() => messages.value.length, () => { nextTick(() => { if (messagesContainer.value) messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight }) })
watch(isLoading, () => { nextTick(() => { if (messagesContainer.value) messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight }) })

function openFromNav() {
  isChatOpen.value = true
  nextTick(() => inputEl.value?.focus())
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  document.addEventListener('keydown', handleEscape)
  document.addEventListener('click', closeCopyMenu)
  window.addEventListener('open-doc-chat', openFromNav)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  document.removeEventListener('keydown', handleEscape)
  document.removeEventListener('click', closeCopyMenu)
  window.removeEventListener('open-doc-chat', openFromNav)
})

function renderMarkdown(text) {
  if (!text) return ''
  let html = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => `<pre class="dc-code-block"><code class="language-${lang}">${code.trim()}</code></pre>`)
  html = html.replace(/((?:\|.*\|[ \t]*\n){2,})/g, (tableBlock) => {
    const rows = tableBlock.trim().split('\n'); if (rows.length < 2) return tableBlock
    let table = '<table class="dc-table">'; rows.forEach((row, i) => { if (i === 1 && /^\|[\s\-:|]+\|$/.test(row.trim())) return; const tag = i === 0 ? 'th' : 'td'; const cells = row.split('|').filter((c, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim()); table += '<tr>' + cells.map(c => `<${tag}>${c}</${tag}>`).join('') + '</tr>' }); return table + '</table>'
  })
  html = html.replace(/`([^`]+)`/g, '<code class="dc-inline-code">$1</code>')
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="dc-link" target="_blank" rel="noopener">$1</a>')
  html = html.replace(/((?:^\d+\.\s+.*$\n?)+)/gm, (block) => '<ol class="dc-list">' + block.trim().split('\n').map(l => `<li>${l.replace(/^\d+\.\s+/, '').trim()}</li>`).join('') + '</ol>')
  html = html.replace(/((?:^[-*]\s+.*$\n?)+)/gm, (block) => '<ul class="dc-list">' + block.trim().split('\n').map(l => `<li>${l.replace(/^[-*]\s+/, '').trim()}</li>`).join('') + '</ul>')
  html = html.split(/\n\n+/).map(block => { block = block.trim(); if (!block) return ''; if (block.startsWith('<pre') || block.startsWith('<table') || block.startsWith('<ol') || block.startsWith('<ul')) return block; return `<p>${block.replace(/\n/g, '<br>')}</p>` }).join('')
  return html
}
</script>

<template>
  <!-- ── Unified Floating Toolbar (hidden on home page) ── -->
  <div v-if="!isHomePage" class="pt-bar" :class="{ 'pt-bar--chat-open': isChatOpen }">
    <!-- Copy Page segment -->
    <button class="pt-seg pt-seg--copy" @click.stop="toggleCopyMenu" title="Copy this page for AI tools">
      <svg class="pt-seg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
      </svg>
      <span class="pt-seg-label">Copy Page</span>
    </button>

    <div class="pt-divider"></div>

    <!-- Ask AI segment -->
    <button class="pt-seg pt-seg--ai" @click.stop="toggleChat" title="Ask AI about LNbits">
      <svg class="pt-seg-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 2l1.5 4.5L16 8l-4.5 1.5L10 14l-1.5-4.5L4 8l4.5-1.5L10 2z"/>
        <path d="M17 12l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/>
        <path d="M7 16l.75 2.25L10 19l-2.25.75L7 22l-.75-2.25L4 19l2.25-.75L7 16z" opacity="0.7"/>
      </svg>
      <span class="pt-seg-label">Ask AI</span>
    </button>
  </div>

  <!-- ── Copy Page Menu (opens upward) ── -->
  <Transition name="pt-menu">
    <div v-if="showCopyMenu && !isHomePage" class="pt-copy-menu">
      <!-- Step 1: Intent Picker -->
      <template v-if="copyStep === 'intent'">
        <div class="pt-section-label">What do you need?</div>
        <button v-for="intent in intents" :key="intent.key" class="pt-intent" @click.stop="selectIntent(intent)">
          <span class="pt-intent-icon">
            <svg v-if="intent.key === 'explain'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 1 4 12.7V17H8v-2.3A7 7 0 0 1 12 2z"/></svg>
            <svg v-else-if="intent.key === 'code'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            <svg v-else-if="intent.key === 'troubleshoot'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 8a3 3 0 0 0-2.1.9"/></svg>
            <svg v-else-if="intent.key === 'guide'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
          </span>
          <span class="pt-intent-text">
            <span class="pt-intent-label">{{ intent.label }}</span>
            <span class="pt-intent-desc">{{ intent.desc }}</span>
          </span>
          <svg class="pt-arrow" viewBox="0 0 6 10" fill="currentColor"><path d="M1 1l4 4-4 4"/></svg>
        </button>
        <div class="pt-menu-divider"></div>
        <div class="pt-raw-links">
          <button class="pt-raw-link" @click.stop="copyMarkdown">Copy as Markdown</button>
          <span class="pt-raw-sep">&middot;</span>
          <button class="pt-raw-link" @click.stop="copyPlaintext">Plain Text</button>
        </div>
      </template>

      <!-- Step 2: Tool Picker -->
      <template v-if="copyStep === 'tool'">
        <button class="pt-back" @click.stop="goBack">
          <svg class="pt-back-icon" viewBox="0 0 6 10" fill="currentColor"><path d="M5 1L1 5l4 4"/></svg>
          {{ selectedIntent?.label }}
        </button>
        <div class="pt-section-label">Open in AI</div>
        <button class="pt-option" @click.stop="openInLLM('chatgpt')"><span class="pt-option-icon"><img :src="openaiIcon" alt="OpenAI" width="16" height="16" class="pt-logo pt-logo--mono" /></span><span>ChatGPT</span><span class="pt-badge pt-badge--auto">Auto</span></button>
        <button class="pt-option" @click.stop="openInLLM('perplexity')"><span class="pt-option-icon"><img :src="perplexityIcon" alt="Perplexity" width="16" height="16" class="pt-logo" /></span><span>Perplexity</span><span class="pt-badge pt-badge--auto">Auto</span></button>
        <button class="pt-option" @click.stop="openInLLM('claude')"><span class="pt-option-icon"><img :src="claudeIcon" alt="Claude" width="16" height="16" class="pt-logo" /></span><span>Claude</span><span class="pt-badge">Web</span></button>
        <button class="pt-option" @click.stop="openInLLM('gemini')"><span class="pt-option-icon"><img :src="geminiIcon" alt="Gemini" width="16" height="16" class="pt-logo" /></span><span>Gemini</span><span class="pt-badge">Web</span></button>
        <button class="pt-option" @click.stop="openInLLM('grok')"><span class="pt-option-icon"><img :src="grokIcon" alt="Grok" width="16" height="16" class="pt-logo pt-logo--mono" /></span><span>Grok</span><span class="pt-badge">Web</span></button>
        <div class="pt-menu-divider"></div>
        <div class="pt-section-label">Copy for IDE</div>
        <button class="pt-option" @click.stop="openInLLM('cursor')"><span class="pt-option-icon"><img :src="cursorIcon" alt="Cursor" width="16" height="16" class="pt-logo pt-logo--mono" /></span><span>Cursor</span><span class="pt-badge">Clipboard</span></button>
        <button class="pt-option" @click.stop="openInLLM('codex')"><span class="pt-option-icon"><img :src="codexIcon" alt="Codex" width="16" height="16" class="pt-logo" /></span><span>Codex / CLI</span><span class="pt-badge">Clipboard</span></button>
      </template>
    </div>
  </Transition>

  <!-- ── Toast ── -->
  <Transition name="pt-fade">
    <div v-if="notification" class="pt-toast">{{ notification }}</div>
  </Transition>

  <!-- ── Chat Backdrop (mobile) ── -->
  <Transition name="dc-backdrop">
    <div v-if="isChatOpen && isMobile" class="dc-backdrop" @click="closeChat"></div>
  </Transition>

  <!-- ── Chat Panel ── -->
  <Transition :name="isMobile ? 'dc-panel-mobile' : 'dc-panel'">
    <div v-if="isChatOpen" class="dc-panel" :class="{ 'dc-panel--mobile': isMobile }">
      <div class="dc-header">
        <div class="dc-header-left">
          <svg class="dc-header-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 2l1.5 4.5L16 8l-4.5 1.5L10 14l-1.5-4.5L4 8l4.5-1.5L10 2z"/>
            <path d="M17 12l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/>
          </svg>
          <span class="dc-header-title">LNbits Assistant</span>
          <span class="dc-header-badge">Beta</span>
        </div>
        <div class="dc-header-actions">
          <button v-if="hasMessages" class="dc-header-btn" @click="clearMessages" title="Clear conversation" aria-label="Clear conversation">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14H7L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
          </button>
          <button class="dc-header-btn" @click="closeChat" title="Close" aria-label="Close chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      <div class="dc-messages" ref="messagesContainer">
        <div v-if="!hasMessages && !isLoading" class="dc-welcome">
          <div class="dc-welcome-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 2l1.5 4.5L16 8l-4.5 1.5L10 14l-1.5-4.5L4 8l4.5-1.5L10 2z"/>
              <path d="M17 12l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/>
            </svg>
          </div>
          <h3 class="dc-welcome-title">Ask anything about LNbits</h3>
          <p class="dc-welcome-text">Get help with installation, configuration, extensions, API usage, and more.</p>
          <div class="dc-suggestions">
            <button v-for="question in suggestedQuestions" :key="question" class="dc-suggestion" @click="handleSuggestion(question)">
              <svg class="dc-suggestion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              {{ question }}
            </button>
          </div>
        </div>

        <template v-for="(msg, i) in messages" :key="i">
          <div v-if="msg.role === 'user'" class="dc-msg dc-msg--user">
            <div class="dc-msg-bubble dc-msg-bubble--user">{{ msg.content }}</div>
          </div>
          <div v-else class="dc-msg dc-msg--assistant">
            <div class="dc-msg-content" v-html="renderMarkdown(msg.content)"></div>
            <div v-if="msg.sources?.length" class="dc-sources">
              <a v-for="source in msg.sources" :key="source.url" :href="source.url" class="dc-source-chip" @click="handleSourceClick(source.url, $event)">
                <svg class="dc-source-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                {{ source.title }}
              </a>
            </div>
          </div>
        </template>

        <div v-if="isLoading" class="dc-msg dc-msg--assistant">
          <div class="dc-typing"><span class="dc-typing-dot"></span><span class="dc-typing-dot"></span><span class="dc-typing-dot"></span></div>
        </div>
      </div>

      <div class="dc-input-bar">
        <div class="dc-input-wrap">
          <textarea ref="inputEl" v-model="inputText" class="dc-input" placeholder="Ask about LNbits..." rows="1" @keydown="handleKeydown" :disabled="isLoading"></textarea>
          <button class="dc-send" :class="{ 'dc-send--active': inputText.trim() && !isLoading }" @click="handleSend" :disabled="!inputText.trim() || isLoading" aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
        <div class="dc-input-hint">Press Enter to send</div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* ══════════════════════════════════════
   Unified Floating Toolbar
   ══════════════════════════════════════ */
.pt-bar {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 210;
  display: flex;
  align-items: center;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: opacity 0.2s, transform 0.2s;
}

.pt-bar--chat-open {
  opacity: 0;
  pointer-events: none;
  transform: translateY(8px);
}

.dark .pt-bar {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
}

.pt-seg {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 16px;
  border: none;
  background: none;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
  white-space: nowrap;
}

.pt-seg:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.pt-seg-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.pt-divider {
  width: 1px;
  height: 24px;
  background: var(--vp-c-divider);
  flex-shrink: 0;
}

/* ── Copy Menu (dropdown upward) ── */
.pt-copy-menu {
  position: fixed;
  bottom: 72px;
  right: 24px;
  z-index: 211;
  width: 260px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 6px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
}

.dark .pt-copy-menu {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.pt-section-label {
  padding: 8px 12px 4px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--vp-c-text-3);
}

.pt-menu-divider {
  height: 1px;
  background: var(--vp-c-divider);
  margin: 4px 8px;
}

/* ── Intent rows ── */
.pt-intent {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-left: 3px solid transparent;
  border-radius: 8px;
  background: none;
  color: var(--vp-c-text-1);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
}

.pt-intent:hover {
  background: var(--vp-c-bg-soft);
  border-left-color: var(--vp-c-brand-1);
}

.pt-intent-icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  padding: 5px;
}

.pt-intent-icon svg { width: 16px; height: 16px; }

.pt-intent-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
}

.pt-intent-label { font-weight: 600; font-size: 13px; line-height: 1.3; }
.pt-intent-desc { font-size: 11px; color: var(--vp-c-text-3); line-height: 1.3; }

.pt-arrow {
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  opacity: 0.3;
  transition: opacity 0.15s;
}

.pt-intent:hover .pt-arrow { opacity: 0.6; }

/* ── Raw copy links ── */
.pt-raw-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px 8px;
}

.pt-raw-link {
  border: none;
  background: none;
  color: var(--vp-c-text-3);
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s;
}

.pt-raw-link:hover { color: var(--vp-c-brand-1); }

.pt-raw-sep { color: var(--vp-c-text-3); font-size: 11px; opacity: 0.5; }

/* ── Back button ── */
.pt-back {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: none;
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.1s;
}

.pt-back:hover { background: var(--vp-c-bg-soft); }
.pt-back-icon { width: 8px; height: 8px; flex-shrink: 0; }

/* ── Option rows ── */
.pt-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: none;
  color: var(--vp-c-text-1);
  font-size: 14px;
  cursor: pointer;
  transition: background 0.1s;
  text-align: left;
}

.pt-option:hover { background: var(--vp-c-bg-soft); }

.pt-option-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  flex-shrink: 0;
}

.pt-logo { display: block; }

.pt-logo--mono { filter: brightness(0); }
.dark .pt-logo--mono { filter: brightness(0) invert(1); }

.pt-badge {
  margin-left: auto;
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  font-weight: 500;
}

.pt-badge--auto {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.dark .pt-badge--auto {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}

/* ── Toast ── */
.pt-toast {
  position: fixed;
  top: 24px;
  right: 24px;
  background: var(--vp-c-brand-1);
  color: #fff;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  z-index: 9999;
}

/* ── Menu transitions ── */
.pt-menu-enter-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.pt-menu-leave-active { transition: opacity 0.1s ease, transform 0.1s ease; }
.pt-menu-enter-from { opacity: 0; transform: translateY(8px) scale(0.96); }
.pt-menu-leave-to { opacity: 0; transform: translateY(4px) scale(0.98); }

.pt-fade-enter-active, .pt-fade-leave-active { transition: opacity 0.3s; }
.pt-fade-enter-from, .pt-fade-leave-to { opacity: 0; }

/* ══════════════════════════════════════
   Chat Panel (carried from DocChat)
   ══════════════════════════════════════ */
.dc-backdrop {
  position: fixed;
  inset: 0;
  z-index: 299;
  background: rgba(0, 0, 0, 0.5);
}

.dc-backdrop-enter-active, .dc-backdrop-leave-active { transition: opacity 0.25s ease; }
.dc-backdrop-enter-from, .dc-backdrop-leave-to { opacity: 0; }

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

.dark .dc-panel { box-shadow: -4px 0 24px rgba(0, 0, 0, 0.4); }

.dc-panel--mobile {
  width: 100vw;
  border-left: none;
  box-shadow: none;
}

.dc-panel-enter-active { transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
.dc-panel-leave-active { transition: transform 0.2s ease-in; }
.dc-panel-enter-from { transform: translateX(100%); }
.dc-panel-leave-to { transform: translateX(100%); }

.dc-panel-mobile-enter-active { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.dc-panel-mobile-leave-active { transition: transform 0.2s ease-in; }
.dc-panel-mobile-enter-from { transform: translateY(100%); }
.dc-panel-mobile-leave-to { transform: translateY(100%); }

/* ── Header ── */
.dc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
}

.dc-header-left { display: flex; align-items: center; gap: 8px; }

.dc-header-icon {
  width: 20px;
  height: 20px;
  color: var(--vp-c-brand-1);
}

.dc-header-title { font-size: 15px; font-weight: 700; color: var(--vp-c-text-1); }

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

.dc-header-actions { display: flex; gap: 4px; }

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

.dc-header-btn:hover { background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); }
.dc-header-btn svg { width: 18px; height: 18px; }

/* ── Messages ── */
.dc-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  scroll-behavior: smooth;
}

.dc-messages::-webkit-scrollbar { width: 4px; }
.dc-messages::-webkit-scrollbar-track { background: transparent; }
.dc-messages::-webkit-scrollbar-thumb { background: var(--vp-c-divider); border-radius: 4px; }

/* ── Welcome ── */
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

.dc-welcome-icon svg { width: 28px; height: 28px; }
.dc-welcome-title { font-size: 17px; font-weight: 700; color: var(--vp-c-text-1); margin: 0 0 6px; }
.dc-welcome-text { font-size: 13px; color: var(--vp-c-text-3); margin: 0 0 24px; line-height: 1.5; max-width: 280px; }

/* ── Suggestions ── */
.dc-suggestions { display: flex; flex-direction: column; gap: 6px; width: 100%; max-width: 320px; }

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

.dc-suggestion:hover { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }

.dc-suggestion-icon { width: 14px; height: 14px; flex-shrink: 0; color: var(--vp-c-brand-1); opacity: 0.6; }
.dc-suggestion:hover .dc-suggestion-icon { opacity: 1; }

/* ── Messages ── */
.dc-msg { margin-bottom: 16px; }
.dc-msg--user { display: flex; justify-content: flex-end; }

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

.dc-msg--assistant { display: flex; flex-direction: column; align-items: flex-start; }

.dc-msg-content {
  max-width: 100%;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  word-break: break-word;
}

.dc-msg-content :deep(p) { margin: 0 0 8px; }
.dc-msg-content :deep(p:last-child) { margin-bottom: 0; }
.dc-msg-content :deep(strong) { font-weight: 600; color: var(--vp-c-text-1); }
.dc-msg-content :deep(.dc-inline-code) { padding: 2px 5px; border-radius: 4px; background: var(--vp-c-bg-soft); color: var(--vp-c-brand-1); font-size: 12px; font-family: var(--vp-font-family-mono); }
.dc-msg-content :deep(.dc-code-block) { margin: 8px 0; padding: 12px 14px; border-radius: 8px; background: var(--vp-c-bg-soft); overflow-x: auto; font-size: 12px; line-height: 1.6; }
.dc-msg-content :deep(.dc-code-block code) { font-family: var(--vp-font-family-mono); color: var(--vp-c-text-1); }
.dc-msg-content :deep(.dc-table) { width: 100%; margin: 8px 0; border-collapse: collapse; font-size: 12px; }
.dc-msg-content :deep(.dc-table th), .dc-msg-content :deep(.dc-table td) { padding: 6px 10px; border: 1px solid var(--vp-c-divider); text-align: left; }
.dc-msg-content :deep(.dc-table th) { background: var(--vp-c-bg-soft); font-weight: 600; }
.dc-msg-content :deep(.dc-list) { margin: 6px 0; padding-left: 20px; }
.dc-msg-content :deep(.dc-list li) { margin-bottom: 3px; }
.dc-msg-content :deep(.dc-link) { color: var(--vp-c-brand-1); text-decoration: none; }
.dc-msg-content :deep(.dc-link:hover) { text-decoration: underline; }

/* ── Sources ── */
.dc-sources { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }

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

.dc-source-chip:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.dc-source-icon { width: 13px; height: 13px; flex-shrink: 0; }

/* ── Typing ── */
.dc-typing { display: flex; align-items: center; gap: 4px; padding: 10px 0; }

.dc-typing-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  animation: dc-bounce 1.2s infinite;
}

.dc-typing-dot:nth-child(2) { animation-delay: 0.15s; }
.dc-typing-dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes dc-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-6px); opacity: 1; }
}

/* ── Input ── */
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

.dc-input-wrap:focus-within { border-color: var(--vp-c-brand-1); }

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

.dc-input::placeholder { color: var(--vp-c-text-3); }

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

.dc-send--active { background: var(--vp-c-brand-1); color: #fff; }
.dc-send--active:hover { opacity: 0.9; }
.dc-send svg { width: 16px; height: 16px; }

.dc-input-hint {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-top: 6px;
  text-align: center;
  opacity: 0.6;
}

/* ══════════════════════════════════════
   Responsive
   ══════════════════════════════════════ */
@media (max-width: 640px) {
  .pt-bar {
    bottom: 16px;
    right: 16px;
  }

  .pt-seg-label { display: none; }

  .pt-seg { padding: 10px 12px; }

  .pt-copy-menu {
    bottom: 64px;
    right: 16px;
    width: 240px;
  }
}

@media (max-width: 768px) {
  .dc-header {
    padding-top: max(14px, env(safe-area-inset-top));
  }
}
</style>
