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
const isContributePage = computed(() => route.path.startsWith('/contribute'))

// ── Contribute page data ──
const contributeRoles = [
  { id: 'developer', title: 'Developer', tagline: 'Fix bugs, build features, get your code merged.' },
  { id: 'tester', title: 'Tester', tagline: 'Hunt bugs, test PRs, and file clear reports.' },
  { id: 'writer', title: 'Writer', tagline: 'Write docs, share stories, create tutorials, and get featured on our news page.' },
  { id: 'designer', title: 'Designer', tagline: 'Shape the UI with Vue and Quasar, create marketing material, and design visuals.' },
  { id: 'entrepreneur', title: 'Entrepreneur', tagline: 'Build products and run services on top of LNbits.' },
  { id: 'ambassador', title: 'Ambassador', tagline: 'Deploy LNbits for your community and onboard merchants to Lightning.' },
]

const contributeRoleContent = {
  developer: `# Contribute as a Developer

LNbits is Python + FastAPI (backend) and Vue 3 + Quasar (frontend). MIT licensed.

## Getting started
1. Clone the repo: https://github.com/lnbits/lnbits
2. Install with uv: https://docs.lnbits.com/guide/installation/uv
3. Set LNBITS_BACKEND_WALLET_CLASS=FakeWallet (no Lightning node needed)
4. Run lnbits and start coding

## What to work on
- Good first issues: https://github.com/lnbits/lnbits/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22
- Architecture overview: https://docs.lnbits.com/dev/architecture
- Build extensions: https://docs.lnbits.com/dev/building-extensions
- Extension Builder (no-code): https://docs.lnbits.com/guide/core/extension-builder
- Deploy to registry: https://docs.lnbits.com/dev/extensions/registry
- Extension monetization (pay-to-install): https://docs.lnbits.com/dev/extensions/monetization

## PR best practices
- Include screenshots or screen recordings
- Test locally with FakeWallet before requesting review
- Write clear description of what changed and why
- Keep PRs focused on one change
- Run make format before pushing

## Community
- Telegram: https://t.me/lnbits
- GitHub Discussions: https://github.com/lnbits/lnbits/discussions`,

  tester: `# Contribute as a Tester

No Lightning node needed. FakeWallet simulates payments locally.

## Getting a test instance
- Fastest: https://my.lnbits.com (full instance in 3 minutes)
- Demo server: https://demo.lnbits.com
- Local install with uv: https://docs.lnbits.com/guide/installation/uv
- Docker: https://docs.lnbits.com/guide/installation/docker
- FakeWallet: https://docs.lnbits.com/guide/wallets/fakewallet
- Polar for real Lightning testing: https://lightningpolar.com

## Where bugs hide
- Funding sources: connect different backends (LND, CLN, Phoenixd, NWC) and verify payments settle
- Node Manager: channel operations, peer connections, balance reporting
- Extension edge cases: two extensions sharing a wallet, data migration between versions
- Fiat providers: Stripe and PayPal checkout flows, webhook delivery
- Multi-user under load: shared wallets with concurrent payments, ACL token expiry
- Mobile in the field: test TPoS and Boltcards on real phones

## How to test a PR
1. git fetch origin pull/ID/head:pr-ID && git checkout pr-ID
2. uv sync && lnbits with FakeWallet
3. Follow the PR description, test what changed, screenshot/record results

## How to report a bug
- Include: LNbits version, wallet backend, browser/OS
- Describe: what you did, what happened, paste ERROR lines from logs
- File at: https://github.com/lnbits/lnbits/issues
- Security issues: https://github.com/lnbits/lnbits/security/advisories/new

## Community
- Telegram: https://t.me/lnbits`,

  writer: `# Contribute as a Writer

You do not need technical knowledge. If you can use LNbits, you can document it.

## Quick wins (10 minutes)
- Find an extension with a thin page: https://docs.lnbits.com/extensions/
- Check FAQ for unanswered questions: https://docs.lnbits.com/guide/faq/
- Fix a broken link or typo in the docs repo
- Add a missing "Related Pages" section

## Where docs live
- Docs repo: https://github.com/DoktorShift/docs_lnbits
- Pages are Markdown files in docs/
- Extension pages auto-generate from GitHub READMEs - improve a README, improve the docs

## Content ideas
- Deployment story: how you set up LNbits
- Merchant case study: TPoS + Boltcards in action
- Extension tutorial: step-by-step walkthrough
- Event recap: LNbits at a festival or meetup

## Tips
- Lead with what the reader gets, not what LNbits is
- Real numbers make stories stick ("onboarded 12 merchants in 3 weeks")
- Screenshots and short videos beat long paragraphs
- Link to docs.lnbits.com so readers can go deeper

## Get featured
Share your writing on X (tag @lnbits) or Telegram and the team will consider it for news.lnbits.com

## Community
- Telegram: https://t.me/lnbits
- News site: https://news.lnbits.com`,

  designer: `# Contribute as a Designer

LNbits uses Vue 3 + Quasar UI for the app, VitePress for docs. You can restyle components without writing backend code.

## The stack
- LNbits app: https://github.com/lnbits/lnbits (Vue + Quasar)
- Docs site: https://github.com/DoktorShift/docs_lnbits (VitePress)
- Quasar components: https://quasar.dev/vue-components
- Try LNbits live: https://my.lnbits.com

## What we need
### Product design
- UI improvements for admin panel, extension flows, mobile views
- Docs site pages, layouts, components

### Creative design
- Blog and news header images for articles at news.lnbits.com
- Illustrations for marketing
- Social media cards, infographics, announcements

## How to contribute
1. Post your mockup or concept in Telegram for quick feedback
2. For UI changes: open a GitHub issue with before/after screenshots
3. For visuals: share the file (Figma, SVG, PNG) in the issue or PR
4. Design for dark mode first, then adapt for light

## Open requests
- Design-tagged issues: https://github.com/lnbits/lnbits/issues?q=is%3Aissue+is%3Aopen+label%3Adesign

## Community
- Telegram: https://t.me/lnbits`,

  entrepreneur: `# Contribute as an Entrepreneur

LNbits is not just a wallet - it is a platform with REST API, extension system, and multi-user architecture for building Lightning-powered businesses.

## Understand the platform
- What is LNbits: https://docs.lnbits.com/guide/what-is-lnbits
- API quick reference: https://docs.lnbits.com/api/quick-reference
- 60+ extensions: https://docs.lnbits.com/extensions/
- Fiat payments (Stripe + PayPal): https://docs.lnbits.com/guide/core/fiat-payments

## Business models
- Build a paid extension and list it with pay-to-install in the registry
- Package TPoS + Inventory + Boltcards + SplitPayments into a turnkey merchant solution
- White-label LNbits under your own brand (MIT license allows it)
- Offer consulting: help businesses integrate Lightning via the LNbits API
- Run a multi-tenant instance for multiple clients

## Launch options
- LNbits SaaS (3 minutes): https://my.lnbits.com
- Docker (production): https://docs.lnbits.com/guide/installation/docker
- Extension monetization: https://docs.lnbits.com/dev/extensions/monetization
- Custom marketplace: https://docs.lnbits.com/dev/extensions/custom-list

## Community
- Telegram: https://t.me/lnbits
- GitHub Discussions: https://github.com/lnbits/lnbits/discussions`,

  ambassador: `# Contribute as an Ambassador

Deploy LNbits for your community and onboard merchants to Lightning.

## Deploy for your community
### One-click node platforms
- Umbrel: https://docs.lnbits.com/guide/installation/node-platforms#umbrel
- Start9: https://docs.lnbits.com/guide/installation/node-platforms#start9
- RaspiBlitz: https://docs.lnbits.com/guide/installation/node-platforms#raspiblitz
- myNode: https://docs.lnbits.com/guide/installation/node-platforms#mynode

### Cloud & hosted
- LNbits SaaS (live in 3 min): https://my.lnbits.com
- Docker + VPS: https://docs.lnbits.com/guide/installation/docker

## Onboard merchants
- TPoS (Point of Sale): https://docs.lnbits.com/extensions/tpos/
- Bolt Cards (NFC tap-to-pay): https://docs.lnbits.com/extensions/boltcards/
- LNURLp (Static QR codes): https://docs.lnbits.com/extensions/lnurlp/
- SatsPay (Payment pages): https://docs.lnbits.com/extensions/satspay/
- TPoS Wrapper Android App: https://docs.lnbits.com/apps/tpos-wrapper

## Build your local network
- Run a workshop at your local Bitcoin meetup
- Document your deployment as a case study or blog post
- Help merchants troubleshoot - you are their first line of support
- Offer hosting: run a multi-tenant LNbits instance for your community

## Spread the word
- X: https://x.com/lnbits (tag @lnbits)
- YouTube tutorials: https://www.youtube.com/@lnbits
- Reddit: https://reddit.com/r/lightningnetwork

## Community
- Telegram: https://t.me/lnbits`,
}

const contributeFaqContent = `## Frequently Asked Questions

### General (all roles)
- **Where do I ask for help?** Telegram group (https://t.me/lnbits). Core devs, extension builders, and users are all there.
- **Can I get paid?** LNbits is volunteer open-source, but OpenSats and HRF fund contributors. Extension developers can monetize via pay-to-install.
- **What license?** MIT. Use it, fork it, sell it, remix it.

### Developer
- **Tech stack:** Python + FastAPI backend, Vue 3 + Quasar frontend.
- **Dev setup:** Clone, install with uv, set FakeWallet, run. No node needed.

### Tester
- **No node needed.** FakeWallet simulates payments. Or use my.lnbits.com for quick testing.
- **Good bug report:** Steps to reproduce, LNbits version, browser/OS, console errors.

### Writer
- **No tech knowledge needed.** FAQ improvements, merchant stories, and clear explanations are valuable.

### Designer
- **Needed:** UI improvements, blog headers, social media cards, infographics.

### Entrepreneur
- **Models:** Paid extensions, merchant solutions, white-labeling, consulting.

### Ambassador
- **Merchant onboarding:** TPoS for point-of-sale, Boltcards for tap-to-pay, LNURLp for QR codes.`

function getContributeRoleMarkdown(roleId) {
  return contributeRoleContent[roleId] || ''
}

function getContributeFullMarkdown() {
  const header = `# Contribute to LNbits\n\nSource: ${window.location.href}\n\n${contributeRoles.map(r => `- **${r.title}**: ${r.tagline}`).join('\n')}`
  const sections = contributeRoles.map(r => contributeRoleContent[r.id]).join('\n\n---\n\n')
  return `${header}\n\n${sections}\n\n${contributeFaqContent}`
}

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

const defaultIntents = [
  { key: 'explain', label: 'Explain this', desc: 'Break down the concepts', prompt: `<role>You are the LNbits documentation assistant - friendly, direct, and knowledgeable.</role>

<documentation>` , promptSuffix: `</documentation>

<additional_context>
Full docs index: https://docs.lnbits.com/llms.txt
LNbits SaaS (quickest start): https://my.lnbits.com
</additional_context>

<instructions>
Your job is to help me truly understand this feature, not repeat the docs back to me.
1. Summarize what this feature does and why it exists (2-3 sentences).
2. Ask me: what is my role? (developer, merchant, admin, new user)
3. Based on my answer, explain the parts most relevant to me. Use analogies. Connect it to other LNbits features.
4. Warn me about common mistakes.
5. Suggest what to look at next.
Before finishing, verify your explanation is accurate against the documentation provided.
</instructions>` },
  { key: 'code', label: 'Write code for this', desc: 'Get working examples', prompt: `<role>You are the LNbits documentation assistant - a hands-on coding partner.</role>

<documentation>` , promptSuffix: `</documentation>

<additional_context>
Full API reference: https://docs.lnbits.com/api/quick-reference
Full docs: https://docs.lnbits.com/llms.txt
</additional_context>

<instructions>
Your goal is to get me to a working implementation as fast as possible. Before writing any code, ask me all of these at once:
1. What language? (Python, JavaScript/Node, curl)
2. What am I building? (script, web app, extension, automation)
3. Admin key or invoice key? (explain the difference if I am unsure)
4. Do I have a running LNbits instance? (if not, suggest my.lnbits.com or FakeWallet)

Once I answer, provide a complete, copy-paste-ready example with: all imports, real endpoint paths, error handling for auth/connection/balance failures, comments, and a production note.
Before finishing, verify all endpoint paths and parameters match the documentation.
</instructions>` },
  { key: 'troubleshoot', label: 'Help me troubleshoot', desc: 'Diagnose an issue', prompt: `<role>You are the LNbits documentation assistant - a patient, methodical debugger.</role>

<documentation>` , promptSuffix: `</documentation>

<additional_context>
Common issues: https://docs.lnbits.com/guide/faq/
Full docs: https://docs.lnbits.com/llms.txt
</additional_context>

<instructions>
Your goal is to find and fix my issue quickly. Ask me all of these diagnostic questions at once:
1. What exactly goes wrong? (error message, unexpected behavior, nothing happens?)
2. LNbits version? (Admin > Server, or lnbits --version)
3. Wallet backend? (LND, CLN, Phoenixd, FakeWallet, etc.)
4. Did this work before, or has it never worked?
5. Any relevant server log lines? (look for ERROR or WARNING)

Based on my answers, narrow down the cause systematically. Start with the most likely fix. Give exact commands or config changes. If my setup has a fundamental issue (SQLite in production, missing HTTPS), say so directly.
Before finishing, verify your diagnosis is consistent with all the symptoms I described.
</instructions>` },
  { key: 'guide', label: 'Guide me step by step', desc: 'Walkthrough from start to finish', prompt: `<role>You are the LNbits documentation assistant - a hands-on guide.</role>

<documentation>` , promptSuffix: `</documentation>

<additional_context>
Full docs: https://docs.lnbits.com/llms.txt
LNbits SaaS (quickest start): https://my.lnbits.com
</additional_context>

<instructions>
Your goal is to get me from where I am now to a working result. Ask me two things first:
1. Do I already have LNbits running? (if not, recommend my.lnbits.com or Docker)
2. What is my end goal with this feature?

Then give me a numbered step-by-step walkthrough with: exact commands, config values, UI navigation paths (e.g. Admin > Server > Notifications), a verification check after each step, and what commonly goes wrong. Do not skip steps. State prerequisites upfront. Suggest faster alternatives if they exist.
Before finishing, verify each step is in the correct order and no prerequisites are missing.
</instructions>` },
]

const contributeIntents = [
  { key: 'find-role', label: 'Help me find my role', desc: 'What can I contribute?', prompt: `<role>You are the LNbits community guide - warm, encouraging, and practical.</role>

<contribute_page>` , promptSuffix: `</contribute_page>

<additional_context>
Full docs: https://docs.lnbits.com/llms.txt
Contribute page: https://docs.lnbits.com/contribute/
Telegram: https://t.me/lnbits
</additional_context>

<instructions>
Help me find the right way to contribute to LNbits. Ask me (all at once, keep it casual):
1. What is your background? (coding, design, writing, business, community building, or just curious?)
2. How much time can you give? (10 minutes, a few hours a week, or something bigger?)
3. Have you used LNbits before?

Based on my answers, recommend one of the six roles: Developer, Tester, Writer, Designer, Entrepreneur, or Ambassador. Then give me 2-3 concrete first actions with direct links.
</instructions>` },
  { key: 'first-steps', label: 'Get me started', desc: 'First actions for my role', prompt: `<role>You are the LNbits community guide - practical and action-oriented.</role>

<contribute_page>` , promptSuffix: `</contribute_page>

<additional_context>
Full docs: https://docs.lnbits.com/llms.txt
Good first issues: https://github.com/lnbits/lnbits/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22
Docs repo: https://github.com/DoktorShift/docs_lnbits
</additional_context>

<instructions>
Ask me: What role interests me? (Developer, Tester, Writer, Designer, Entrepreneur, Ambassador)
Then give a step-by-step onboarding plan: what to install, a specific first task for today, where to ask for help, and what to do after my first contribution. Keep it short and actionable.
</instructions>` },
  { key: 'explain', label: 'What is LNbits?', desc: 'Overview for newcomers', prompt: `<role>You are the LNbits community guide - enthusiastic but honest.</role>

<contribute_page>` , promptSuffix: `</contribute_page>

<additional_context>
What is LNbits: https://docs.lnbits.com/guide/what-is-lnbits
Try it: https://my.lnbits.com
</additional_context>

<instructions>
Explain LNbits to someone who found the contribute page but is not sure what the project is. Cover: what it is (plain language), what makes it special, who uses it, and why contribute. Then ask what sounds interesting and guide them to the right role.
</instructions>` },
  { key: 'faq', label: 'Common questions', desc: 'FAQ for contributors', prompt: `<role>You are the LNbits community guide - knowledgeable about the project and contribution process.</role>

<contribute_page>` , promptSuffix: `</contribute_page>

<additional_context>
Contributing guide: https://docs.lnbits.com/dev/contributing
Extension development: https://docs.lnbits.com/dev/building-extensions
</additional_context>

<instructions>
Answer my questions about contributing to LNbits using the FAQ and contributor info from the page. If not covered, say so and point me to Telegram (https://t.me/lnbits). Keep answers concise with links.
</instructions>` },
]

const intents = computed(() => isContributePage.value ? contributeIntents : defaultIntents)

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
  if (isContributePage.value) return getContributeFullMarkdown()
  const el = getContentEl()
  if (!el) return ''
  return `# ${getPageTitle()}\n\nSource: ${getPageUrl()}\n\n${htmlToMarkdown(el)}`
}

function buildPromptContent(intent) {
  const content = isContributePage.value ? getContributeFullMarkdown() : getMarkdownContent()
  if (intent.promptSuffix) {
    return `${intent.prompt}\n${content}\n${intent.promptSuffix}`
  }
  return `${intent.prompt}\n\n${content}`
}

async function copyContributeRole(roleId) {
  const role = contributeRoles.find(r => r.id === roleId)
  await navigator.clipboard.writeText(`${getContributeRoleMarkdown(roleId)}\n\nSource: ${window.location.href}#${roleId}`)
  notify(`Copied ${role.title} guide`)
  showCopyMenu.value = false
}

async function copyContributeAll() {
  await navigator.clipboard.writeText(getContributeFullMarkdown())
  notify('Copied all roles')
  showCopyMenu.value = false
}

function truncateForUrl(text) {
  return text.length <= URL_CONTENT_LIMIT ? text : text.slice(0, URL_CONTENT_LIMIT) + '\n\n[Content truncated - full page was copied to clipboard]'
}

function notify(msg, duration = 3500) {
  notification.value = msg
  setTimeout(() => { notification.value = '' }, duration)
}

function formatName(key) {
  return { claude: 'Claude', chatgpt: 'ChatGPT', gemini: 'Gemini', perplexity: 'Perplexity', grok: 'Grok', cursor: 'Cursor', codex: 'Codex' }[key] || key
}

async function openInLLM(target) {
  const fullContent = buildPromptContent(selectedIntent.value)
  await navigator.clipboard.writeText(fullContent)
  showCopyMenu.value = false

  if (target === 'chatgpt' || target === 'perplexity') {
    const truncated = truncateForUrl(fullContent)
    const urls = { chatgpt: `https://chatgpt.com/?q=${encodeURIComponent(truncated)}`, perplexity: `https://www.perplexity.ai/?q=${encodeURIComponent(truncated)}` }
    window.open(urls[target], '_blank')
    notify(`Opened ${formatName(target)} with your prompt`)
  } else if (target === 'claude' || target === 'gemini' || target === 'grok') {
    const urls = { claude: 'https://claude.ai/new', gemini: 'https://gemini.google.com/', grok: 'https://grok.com/' }
    notify(`Prompt copied to clipboard. Paste it into ${formatName(target)} with Ctrl+V / Cmd+V`)
    setTimeout(() => { window.open(urls[target], '_blank') }, 1200)
  } else {
    notify(`Prompt copied to clipboard. Paste with Ctrl+V / Cmd+V`)
  }
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
        <div class="pt-section-label">{{ isContributePage ? 'How can we help?' : 'What do you need?' }}</div>
        <button v-for="intent in intents" :key="intent.key" class="pt-intent" @click.stop="selectIntent(intent)">
          <span class="pt-intent-icon">
            <!-- Default page icons -->
            <svg v-if="intent.key === 'explain' && !isContributePage" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 1 4 12.7V17H8v-2.3A7 7 0 0 1 12 2z"/></svg>
            <svg v-else-if="intent.key === 'code'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            <svg v-else-if="intent.key === 'troubleshoot'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 8a3 3 0 0 0-2.1.9"/></svg>
            <svg v-else-if="intent.key === 'guide'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
            <!-- Contribute page icons -->
            <svg v-else-if="intent.key === 'find-role'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <svg v-else-if="intent.key === 'first-steps'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <svg v-else-if="intent.key === 'explain' && isContributePage" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 1 4 12.7V17H8v-2.3A7 7 0 0 1 12 2z"/></svg>
            <svg v-else-if="intent.key === 'faq'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </span>
          <span class="pt-intent-text">
            <span class="pt-intent-label">{{ intent.label }}</span>
            <span class="pt-intent-desc">{{ intent.desc }}</span>
          </span>
          <svg class="pt-arrow" viewBox="0 0 6 10" fill="currentColor"><path d="M1 1l4 4-4 4"/></svg>
        </button>
        <div class="pt-menu-divider"></div>
        <!-- Contribute page: per-role copy -->
        <template v-if="isContributePage">
          <div class="pt-section-label">Copy by role</div>
          <div class="pt-role-grid">
            <button v-for="role in contributeRoles" :key="role.id" class="pt-role-btn" @click.stop="copyContributeRole(role.id)">{{ role.title }}</button>
          </div>
          <div class="pt-raw-links">
            <button class="pt-raw-link" @click.stop="copyContributeAll">Copy all roles</button>
          </div>
        </template>
        <!-- Default: markdown/plaintext -->
        <template v-else>
          <div class="pt-raw-links">
            <button class="pt-raw-link" @click.stop="copyMarkdown">Copy as Markdown</button>
            <span class="pt-raw-sep">&middot;</span>
            <button class="pt-raw-link" @click.stop="copyPlaintext">Plain Text</button>
          </div>
        </template>
      </template>

      <!-- Step 2: Tool Picker -->
      <template v-if="copyStep === 'tool'">
        <button class="pt-back" @click.stop="goBack">
          <svg class="pt-back-icon" viewBox="0 0 6 10" fill="currentColor"><path d="M5 1L1 5l4 4"/></svg>
          {{ selectedIntent?.label }}
        </button>
        <div class="pt-section-label">Opens with prompt ready</div>
        <button class="pt-option" @click.stop="openInLLM('chatgpt')"><span class="pt-option-icon"><img :src="openaiIcon" alt="OpenAI" width="16" height="16" class="pt-logo pt-logo--mono" /></span><span>ChatGPT</span><span class="pt-badge pt-badge--auto">Auto-fill</span></button>
        <button class="pt-option" @click.stop="openInLLM('perplexity')"><span class="pt-option-icon"><img :src="perplexityIcon" alt="Perplexity" width="16" height="16" class="pt-logo" /></span><span>Perplexity</span><span class="pt-badge pt-badge--auto">Auto-fill</span></button>
        <div class="pt-menu-divider"></div>
        <div class="pt-section-label">Opens app, you paste</div>
        <button class="pt-option" @click.stop="openInLLM('claude')"><span class="pt-option-icon"><img :src="claudeIcon" alt="Claude" width="16" height="16" class="pt-logo" /></span><span>Claude</span><span class="pt-badge">Ctrl+V</span></button>
        <button class="pt-option" @click.stop="openInLLM('gemini')"><span class="pt-option-icon"><img :src="geminiIcon" alt="Gemini" width="16" height="16" class="pt-logo" /></span><span>Gemini</span><span class="pt-badge">Ctrl+V</span></button>
        <button class="pt-option" @click.stop="openInLLM('grok')"><span class="pt-option-icon"><img :src="grokIcon" alt="Grok" width="16" height="16" class="pt-logo pt-logo--mono" /></span><span>Grok</span><span class="pt-badge">Ctrl+V</span></button>
        <div class="pt-menu-divider"></div>
        <div class="pt-section-label">Copy for IDE</div>
        <button class="pt-option" @click.stop="openInLLM('cursor')"><span class="pt-option-icon"><img :src="cursorIcon" alt="Cursor" width="16" height="16" class="pt-logo pt-logo--mono" /></span><span>Cursor</span><span class="pt-badge">Ctrl+V</span></button>
        <button class="pt-option" @click.stop="openInLLM('codex')"><span class="pt-option-icon"><img :src="codexIcon" alt="Codex" width="16" height="16" class="pt-logo" /></span><span>Codex / CLI</span><span class="pt-badge">Ctrl+V</span></button>
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

.pt-role-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4px;
  padding: 4px 10px 6px;
}

.pt-role-btn {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 11px;
  padding: 5px 4px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
}

.pt-role-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

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
