<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import openaiIcon from '@lobehub/icons-static-svg/icons/openai.svg'
import claudeIcon from '@lobehub/icons-static-svg/icons/claude-color.svg'
import perplexityIcon from '@lobehub/icons-static-svg/icons/perplexity-color.svg'
import geminiIcon from '@lobehub/icons-static-svg/icons/gemini-color.svg'
import grokIcon from '@lobehub/icons-static-svg/icons/grok.svg'
import cursorIcon from '@lobehub/icons-static-svg/icons/cursor.svg'
import codexIcon from '@lobehub/icons-static-svg/icons/codex-color.svg'

const showMenu = ref(false)
const notification = ref('')
const step = ref('intent') // 'intent' | 'tool'
const selectedIntent = ref(null)

const intents = [
  {
    key: 'explain',
    label: 'Explain this',
    desc: 'Break down the concepts',
    prompt: `<role>You are the LNbits documentation assistant - friendly, direct, and knowledgeable.</role>

<documentation>`,
    promptSuffix: `</documentation>

<additional_context>
Full docs index: https://docs.lnbits.com/llms.txt
</additional_context>

<instructions>
Help me truly understand this feature. Summarize it in 2-3 sentences, ask my role (developer, merchant, admin, new user?), then tailor the explanation. Warn about common mistakes. Suggest what to look at next.
</instructions>`,
  },
  {
    key: 'code',
    label: 'Write code for this',
    desc: 'Get working examples',
    prompt: `<role>You are the LNbits documentation assistant - a hands-on coding partner.</role>

<documentation>`,
    promptSuffix: `</documentation>

<additional_context>
API reference: https://docs.lnbits.com/api/quick-reference
</additional_context>

<instructions>
Before writing code, ask me (all at once): language, what I am building, admin vs invoice key, and whether I have a running instance. Then give a complete, copy-paste-ready example with imports, error handling, and comments.
</instructions>`,
  },
  {
    key: 'troubleshoot',
    label: 'Help me troubleshoot',
    desc: 'Diagnose an issue',
    prompt: `<role>You are the LNbits documentation assistant - a patient, methodical debugger.</role>

<documentation>`,
    promptSuffix: `</documentation>

<additional_context>
Common issues: https://docs.lnbits.com/guide/faq/
</additional_context>

<instructions>
Ask me all diagnostic questions at once: what goes wrong, LNbits version, wallet backend, worked before or never worked, server log lines. Then narrow down the cause and give exact fixes.
</instructions>`,
  },
  {
    key: 'guide',
    label: 'Guide me step by step',
    desc: 'Walkthrough from start to finish',
    prompt: `<role>You are the LNbits documentation assistant - a hands-on guide.</role>

<documentation>`,
    promptSuffix: `</documentation>

<additional_context>
Full docs: https://docs.lnbits.com/llms.txt
LNbits SaaS: https://my.lnbits.com
</additional_context>

<instructions>
Ask me: do I have LNbits running, and what is my end goal? Then give numbered steps with exact commands, config values, UI paths, verification checks, and common failure points.
</instructions>`,
  },
]

const URL_CONTENT_LIMIT = 6000

function toggle() {
  showMenu.value = !showMenu.value
  if (showMenu.value) {
    step.value = 'intent'
    selectedIntent.value = null
  }
}

function closeMenu(e) {
  if (!e.target.closest('.llm-share')) {
    showMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenu)
})

function notify(msg) {
  notification.value = msg
  setTimeout(() => { notification.value = '' }, 2500)
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
    if (node.nodeType === 3) {
      md += node.textContent
      return
    }
    if (node.nodeType !== 1) return

    const tag = node.tagName.toLowerCase()

    // Skip the LLM share widget itself
    if (node.closest('.llm-share')) return
    // Skip nav, sidebar, footer
    if (node.closest('.VPNav') || node.closest('.VPSidebar') || node.closest('.VPFooter')) return

    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
      md += '\n' + '#'.repeat(parseInt(tag[1])) + ' ' + node.textContent.trim() + '\n\n'
    } else if (tag === 'pre') {
      const code = node.querySelector('code')
      const langClass = code?.className || ''
      const lang = langClass.match(/language-(\w+)/)?.[1] || ''
      md += '```' + lang + '\n' + (code || node).textContent + '```\n\n'
    } else if (tag === 'code' && node.parentElement?.tagName !== 'PRE') {
      md += '`' + node.textContent + '`'
    } else if (tag === 'p') {
      node.childNodes.forEach(walk)
      md += '\n\n'
    } else if (tag === 'li') {
      const parent = node.parentElement
      const prefix = parent?.tagName === 'OL'
        ? (Array.from(parent.children).indexOf(node) + 1) + '. '
        : '- '
      md += prefix
      node.childNodes.forEach(walk)
      md += '\n'
    } else if (tag === 'ul' || tag === 'ol') {
      md += '\n'
      node.childNodes.forEach(walk)
      md += '\n'
    } else if (tag === 'a') {
      const href = node.getAttribute('href') || ''
      md += '[' + node.textContent + '](' + href + ')'
    } else if (tag === 'strong' || tag === 'b') {
      md += '**' + node.textContent + '**'
    } else if (tag === 'em' || tag === 'i') {
      md += '*' + node.textContent + '*'
    } else if (tag === 'table') {
      md += '\n'
      const rows = node.querySelectorAll('tr')
      rows.forEach((tr, i) => {
        const cells = [...tr.querySelectorAll('th,td')].map((c) => c.textContent.trim())
        md += '| ' + cells.join(' | ') + ' |\n'
        if (i === 0) md += '| ' + cells.map(() => '---').join(' | ') + ' |\n'
      })
      md += '\n'
    } else if (tag === 'blockquote') {
      const lines = node.textContent.trim().split('\n')
      md += lines.map((l) => '> ' + l.trim()).join('\n') + '\n\n'
    } else if (tag === 'br') {
      md += '\n'
    } else if (tag === 'hr') {
      md += '\n---\n\n'
    } else if (tag === 'img') {
      const alt = node.getAttribute('alt') || ''
      const src = node.getAttribute('src') || ''
      md += `![${alt}](${src})`
    } else {
      node.childNodes.forEach(walk)
    }
  }

  walk(el)
  return md.replace(/\n{3,}/g, '\n\n').trim()
}

function getMarkdownContent() {
  const el = getContentEl()
  if (!el) return ''
  const title = getPageTitle()
  const url = getPageUrl()
  const md = htmlToMarkdown(el)
  return `# ${title}\n\nSource: ${url}\n\n${md}`
}

function buildPromptContent(intent) {
  const content = getMarkdownContent()
  if (intent.promptSuffix) {
    return `${intent.prompt}\n${content}\n${intent.promptSuffix}`
  }
  return `${intent.prompt}\n\n${content}`
}

function truncateForUrl(text) {
  if (text.length <= URL_CONTENT_LIMIT) return text
  return text.slice(0, URL_CONTENT_LIMIT) + '\n\n[Content truncated - full page was copied to clipboard]'
}

function selectIntent(intent) {
  selectedIntent.value = intent
  step.value = 'tool'
}

function goBack() {
  step.value = 'intent'
  selectedIntent.value = null
}

function supportsUrlPrefill(target) {
  return target === 'chatgpt' || target === 'perplexity'
}

async function openInLLM(target) {
  const fullContent = buildPromptContent(selectedIntent.value)

  // Always copy to clipboard (full content, no truncation)
  await navigator.clipboard.writeText(fullContent)

  if (supportsUrlPrefill(target)) {
    // Build URL with ?q= param
    const truncated = truncateForUrl(fullContent)
    const encoded = encodeURIComponent(truncated)
    const urls = {
      chatgpt: `https://chatgpt.com/?q=${encoded}`,
      perplexity: `https://www.perplexity.ai/?q=${encoded}`,
    }
    window.open(urls[target], '_blank')
    notify(`Opened ${formatName(target)} with your question`)
  } else if (target === 'claude' || target === 'gemini' || target === 'grok') {
    const urls = {
      claude: 'https://claude.ai/new',
      gemini: 'https://gemini.google.com/',
      grok: 'https://grok.com/',
    }
    window.open(urls[target], '_blank')
    notify(`Copied - paste into ${formatName(target)}`)
  } else {
    // IDE tools: clipboard only
    notify(`Copied - paste into ${formatName(target)}`)
  }

  showMenu.value = false
}

async function copyMarkdown() {
  const content = getMarkdownContent()
  await navigator.clipboard.writeText(content)
  notify('Copied as Markdown')
  showMenu.value = false
}

async function copyPlaintext() {
  const el = getContentEl()
  if (!el) return
  const title = getPageTitle()
  const url = getPageUrl()
  const text = `${title}\nSource: ${url}\n\n${el.innerText}`
  await navigator.clipboard.writeText(text)
  notify('Copied as Plain Text')
  showMenu.value = false
}

function formatName(key) {
  const names = {
    claude: 'Claude',
    chatgpt: 'ChatGPT',
    gemini: 'Gemini',
    perplexity: 'Perplexity',
    grok: 'Grok',
    cursor: 'Cursor',
    codex: 'Codex',
  }
  return names[key] || key
}
</script>

<template>
  <div class="llm-share">
    <button class="llm-share-btn" @click.stop="toggle" title="Share this page with an AI">
      <svg class="llm-share-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 2l1.5 4.5L16 8l-4.5 1.5L10 14l-1.5-4.5L4 8l4.5-1.5L10 2z"/>
        <path d="M17 12l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/>
        <path d="M7 16l.75 2.25L10 19l-2.25.75L7 22l-.75-2.25L4 19l2.25-.75L7 16z" opacity="0.7"/>
      </svg>
      <span class="llm-share-label">Ask AI</span>
      <svg class="llm-share-caret" viewBox="0 0 10 6" fill="currentColor">
        <path d="M1 1l4 4 4-4"/>
      </svg>
    </button>

    <Transition name="menu">
      <div v-if="showMenu" class="llm-share-menu">
        <!-- Step 1: Intent Picker -->
        <template v-if="step === 'intent'">
          <div class="llm-share-section-label">What do you need?</div>

          <button
            v-for="intent in intents"
            :key="intent.key"
            class="llm-share-intent"
            @click.stop="selectIntent(intent)"
          >
            <span class="llm-share-intent-icon">
              <!-- Explain: lightbulb -->
              <svg v-if="intent.key === 'explain'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18h6"/><path d="M10 22h4"/>
                <path d="M12 2a7 7 0 0 1 4 12.7V17H8v-2.3A7 7 0 0 1 12 2z"/>
              </svg>
              <!-- Code: brackets -->
              <svg v-else-if="intent.key === 'code'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
              </svg>
              <!-- Troubleshoot: search/magnifier with question -->
              <svg v-else-if="intent.key === 'troubleshoot'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                <path d="M11 8a3 3 0 0 0-2.1.9"/>
              </svg>
              <!-- Guide: compass -->
              <svg v-else-if="intent.key === 'guide'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
              </svg>
            </span>
            <span class="llm-share-intent-text">
              <span class="llm-share-intent-label">{{ intent.label }}</span>
              <span class="llm-share-intent-desc">{{ intent.desc }}</span>
            </span>
            <svg class="llm-share-arrow" viewBox="0 0 6 10" fill="currentColor">
              <path d="M1 1l4 4-4 4"/>
            </svg>
          </button>

          <div class="llm-share-divider"></div>
          <div class="llm-share-raw-links">
            <button class="llm-share-raw-link" @click.stop="copyMarkdown">Copy as Markdown</button>
            <span class="llm-share-raw-sep">·</span>
            <button class="llm-share-raw-link" @click.stop="copyPlaintext">Plain Text</button>
          </div>
        </template>

        <!-- Step 2: Tool Picker -->
        <template v-if="step === 'tool'">
          <button class="llm-share-back" @click.stop="goBack">
            <svg class="llm-share-back-icon" viewBox="0 0 6 10" fill="currentColor">
              <path d="M5 1L1 5l4 4"/>
            </svg>
            {{ selectedIntent?.label }}
          </button>

          <div class="llm-share-section-label">Open in AI</div>

          <button class="llm-share-option" @click.stop="openInLLM('chatgpt')">
            <span class="llm-share-option-icon"><img :src="openaiIcon" alt="OpenAI" width="16" height="16" class="llm-logo llm-logo--openai" /></span>
            <span>ChatGPT</span>
            <span class="llm-share-badge llm-share-badge--auto">Auto</span>
          </button>

          <button class="llm-share-option" @click.stop="openInLLM('perplexity')">
            <span class="llm-share-option-icon"><img :src="perplexityIcon" alt="Perplexity" width="16" height="16" class="llm-logo" /></span>
            <span>Perplexity</span>
            <span class="llm-share-badge llm-share-badge--auto">Auto</span>
          </button>

          <button class="llm-share-option" @click.stop="openInLLM('claude')">
            <span class="llm-share-option-icon"><img :src="claudeIcon" alt="Claude" width="16" height="16" class="llm-logo" /></span>
            <span>Claude</span>
            <span class="llm-share-badge">Web</span>
          </button>

          <button class="llm-share-option" @click.stop="openInLLM('gemini')">
            <span class="llm-share-option-icon"><img :src="geminiIcon" alt="Gemini" width="16" height="16" class="llm-logo" /></span>
            <span>Gemini</span>
            <span class="llm-share-badge">Web</span>
          </button>

          <button class="llm-share-option" @click.stop="openInLLM('grok')">
            <span class="llm-share-option-icon"><img :src="grokIcon" alt="Grok" width="16" height="16" class="llm-logo llm-logo--mono" /></span>
            <span>Grok</span>
            <span class="llm-share-badge">Web</span>
          </button>

          <div class="llm-share-divider"></div>
          <div class="llm-share-section-label">Copy for IDE</div>

          <button class="llm-share-option" @click.stop="openInLLM('cursor')">
            <span class="llm-share-option-icon"><img :src="cursorIcon" alt="Cursor" width="16" height="16" class="llm-logo llm-logo--mono" /></span>
            <span>Cursor</span>
            <span class="llm-share-badge">Clipboard</span>
          </button>

          <button class="llm-share-option" @click.stop="openInLLM('codex')">
            <span class="llm-share-option-icon"><img :src="codexIcon" alt="Codex" width="16" height="16" class="llm-logo" /></span>
            <span>Codex / CLI</span>
            <span class="llm-share-badge">Clipboard</span>
          </button>
        </template>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="notification" class="llm-share-toast">
        {{ notification }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.llm-share {
  position: fixed;
  bottom: 24px;
  right: 88px;
  z-index: 200;
}

/* ── Main Button ── */
.llm-share-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 12px;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  transition: all 0.2s ease;
}

.llm-share-btn:hover {
  background: var(--vp-c-brand-1);
  color: #fff;
  box-shadow: 0 6px 28px rgba(0, 0, 0, 0.18);
  transform: translateY(-1px);
}

.dark .llm-share-btn {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
}

.dark .llm-share-btn:hover {
  box-shadow: 0 6px 28px rgba(149, 117, 205, 0.3);
}

.llm-share-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.llm-share-label {
  white-space: nowrap;
}

.llm-share-caret {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  opacity: 0.6;
}

/* ── Dropdown Menu ── */
.llm-share-menu {
  position: absolute;
  bottom: calc(100% + 8px);
  right: 0;
  width: 260px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 6px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
  overflow: hidden;
}

.dark .llm-share-menu {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.llm-share-section-label {
  padding: 8px 12px 4px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--vp-c-text-3);
}

.llm-share-divider {
  height: 1px;
  background: var(--vp-c-divider);
  margin: 4px 8px;
}

/* ── Intent Cards (Step 1) ── */
.llm-share-intent {
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

.llm-share-intent:hover {
  background: var(--vp-c-bg-soft);
  border-left-color: var(--vp-c-brand-1);
}

.llm-share-intent-icon {
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

.llm-share-intent-icon svg {
  width: 16px;
  height: 16px;
}

.llm-share-intent-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
}

.llm-share-intent-label {
  font-weight: 600;
  font-size: 13px;
  line-height: 1.3;
}

.llm-share-intent-desc {
  font-size: 11px;
  color: var(--vp-c-text-3);
  line-height: 1.3;
}

.llm-share-arrow {
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  opacity: 0.3;
  transition: opacity 0.15s;
}

.llm-share-intent:hover .llm-share-arrow {
  opacity: 0.6;
}

/* ── Raw copy links (bottom of step 1) ── */
.llm-share-raw-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px 8px;
}

.llm-share-raw-link {
  border: none;
  background: none;
  color: var(--vp-c-text-3);
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s;
}

.llm-share-raw-link:hover {
  color: var(--vp-c-brand-1);
}

.llm-share-raw-sep {
  color: var(--vp-c-text-3);
  font-size: 11px;
  opacity: 0.5;
}

/* ── Back Button (Step 2) ── */
.llm-share-back {
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

.llm-share-back:hover {
  background: var(--vp-c-bg-soft);
}

.llm-share-back-icon {
  width: 8px;
  height: 8px;
  flex-shrink: 0;
}

/* ── Option Rows ── */
.llm-share-option {
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

.llm-share-option:hover {
  background: var(--vp-c-bg-soft);
}

.llm-share-option-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 800;
  flex-shrink: 0;
}

.llm-logo {
  display: block;
}

/* OpenAI, Grok, Cursor use currentColor - force visible */
.llm-logo--openai,
.llm-logo--mono {
  filter: brightness(0);
}

.dark .llm-logo--openai,
.dark .llm-logo--mono {
  filter: brightness(0) invert(1);
}

.llm-share-badge {
  margin-left: auto;
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  font-weight: 500;
}

.llm-share-badge--auto {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.dark .llm-share-badge--auto {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}

/* ── Toast Notification ── */
.llm-share-toast {
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

/* ── Transitions ── */
.menu-enter-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.menu-leave-active {
  transition: opacity 0.1s ease, transform 0.1s ease;
}
.menu-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.96);
}
.menu-leave-to {
  opacity: 0;
  transform: translateY(4px) scale(0.98);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .llm-share {
    bottom: 16px;
    right: 76px;
  }

  .llm-share-label {
    display: none;
  }

  .llm-share-btn {
    padding: 10px 14px;
  }

  .llm-share-menu {
    width: 240px;
  }
}
</style>
