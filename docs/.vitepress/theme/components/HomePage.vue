<script setup>
import { ref, onMounted, computed } from 'vue'
import { useData } from 'vitepress'
import { Code, SearchCheck, PenLine, Palette, Rocket, Megaphone } from 'lucide-vue-next'
import openaiIcon from '@lobehub/icons-static-svg/icons/openai.svg'
import claudeIcon from '@lobehub/icons-static-svg/icons/claude-color.svg'
import perplexityIcon from '@lobehub/icons-static-svg/icons/perplexity-color.svg'
import geminiIcon from '@lobehub/icons-static-svg/icons/gemini-color.svg'
import grokIcon from '@lobehub/icons-static-svg/icons/grok.svg'

const mounted = ref(false)
const toast = ref('')
const ghStars = ref('')
const contribVideoActive = ref(false)
const { isDark } = useData()

onMounted(() => {
  mounted.value = true
  fetch('https://api.github.com/repos/lnbits/lnbits', { headers: { Accept: 'application/vnd.github.v3+json' } })
    .then(r => r.ok ? r.json() : null)
    .then(d => { if (d?.stargazers_count) ghStars.value = (d.stargazers_count / 1000).toFixed(1) + 'k' })
    .catch(() => {})
})

const LNB_PROMPT = `You are the LNbits documentation assistant - a knowledgeable, direct, and honest guide.

LNbits is a free, open-source Lightning Network wallet and accounts system. It sits on top of any Lightning backend and provides multi-user wallets, a REST API, and 60+ extensions (Point of Sale, Bolt Cards, paywall, NWC, subscriptions, etc.). It supports 20+ wallet backends and accepts fiat via Stripe and PayPal.

Documentation: https://docs.lnbits.com/llms.txt (index) and https://docs.lnbits.com/llms-full.txt (all pages). Read these before answering.

System prompt with personality and rules: https://docs.lnbits.com/llm/system-prompt

Before giving advice, ask me:
1. What is your goal? (build an app, accept payments, run a service, learn, deploy for a community?)
2. What is your role? (developer, merchant, event organizer, student, sysadmin?)
3. Do you already have a Lightning node or LNbits instance running?

Based on my answers, guide me step by step. Be specific - name the exact extensions, API endpoints, env vars, and config options I need. Show code examples when they help. If LNbits SaaS (my.lnbits.com) is the fastest path, say so. If I need self-hosting, explain why. Challenge my assumptions if there is a better approach.`

const URL_CONTENT_LIMIT = 6000

function notify(msg) {
  toast.value = msg
  setTimeout(() => { toast.value = '' }, 2500)
}

async function openWithLLM(target) {
  try {
    await navigator.clipboard.writeText(LNB_PROMPT)
  } catch {}

  if (target === 'chatgpt') {
    window.open(`https://chatgpt.com/?q=${encodeURIComponent(LNB_PROMPT.slice(0, URL_CONTENT_LIMIT))}`, '_blank')
    notify('Opened ChatGPT with prompt')
  } else if (target === 'perplexity') {
    window.open(`https://www.perplexity.ai/?q=${encodeURIComponent(LNB_PROMPT.slice(0, URL_CONTENT_LIMIT))}`, '_blank')
    notify('Opened Perplexity with prompt')
  } else if (target === 'claude') {
    window.open('https://claude.ai/new', '_blank')
    notify('Copied - paste into Claude')
  } else if (target === 'gemini') {
    window.open('https://gemini.google.com/', '_blank')
    notify('Copied - paste into Gemini')
  } else if (target === 'grok') {
    window.open('https://grok.com/', '_blank')
    notify('Copied - paste into Grok')
  } else if (target === 'copy') {
    notify('Prompt copied to clipboard')
  }
}

function openSearch() {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
  window.dispatchEvent(new KeyboardEvent('keydown', {
    key: 'k',
    code: 'KeyK',
    metaKey: isMac,
    ctrlKey: !isMac,
    bubbles: true,
  }))
}

const mainCards = [
  {
    title: 'User Guide',
    desc: 'Install LNbits, configure wallets, manage users, and run your node.',
    link: '/guide/',
    icon: 'book',
  },
  {
    title: 'API Reference',
    desc: 'REST endpoints for wallets, payments, authentication, and admin.',
    link: '/api/',
    icon: 'code',
  },
  {
    title: 'Developer Guide',
    desc: 'Architecture, build extensions, deploy to the registry.',
    link: '/dev/architecture',
    icon: 'build',
  },
]

const backendsData = [
  { name: 'LND', dark: '/logos/backends/lnd.png', light: '/logos/backends/lnd.png' },
  { name: 'Core Lightning', dark: '/logos/backends/cln.png', light: '/logos/backends/clnl.png' },
  { name: 'Phoenixd', dark: '/logos/backends/phoenixd.png', light: '/logos/backends/phoenixdl.png' },
  { name: 'Breez', dark: '/logos/backends/breez.png', light: '/logos/backends/breezl.png' },
  { name: 'Alby', dark: '/logos/backends/alby.png', light: '/logos/backends/albyl.png' },
  { name: 'Greenlight', dark: '/logos/backends/greenlight.png', light: '/logos/backends/greenlightl.png' },
  { name: 'OpenNode', dark: '/logos/backends/opennode.png', light: '/logos/backends/opennodel.png' },
  { name: 'LNPay', dark: '/logos/backends/lnpay.png', light: '/logos/backends/lnpayl.png' },
  { name: 'Boltz', dark: '/logos/backends/boltz.svg', light: '/logos/backends/boltzl.svg' },
  { name: 'ZBD', dark: '/logos/backends/zbd.png', light: '/logos/backends/zbdl.png' },
  { name: 'Spark', dark: '/logos/backends/spark.png', light: '/logos/backends/sparkl.png' },
  { name: 'Voltage', dark: '/logos/backends/voltage.png', light: '/logos/backends/voltagel.png' },
  { name: 'Blink', dark: '/logos/backends/blink_logo.png', light: '/logos/backends/blink_logol.png' },
  { name: 'RaspiBlitz', dark: '/logos/backends/blitz.png', light: '/logos/backends/blitzl.png' },
]

const backends = computed(() =>
  backendsData.map(b => ({
    name: b.name,
    img: isDark.value ? b.dark : b.light,
  }))
)

const quickLinks = [
  { title: 'Installation', desc: 'uv, Poetry, Docker, Nix, Fly.io', link: '/guide/installation/', icon: 'download' },
  { title: 'Wallet Backends', desc: '20+ funding sources', link: '/guide/wallets/', icon: 'wallet' },
  { title: 'Extensions', desc: '60+ plugins ready to use', link: '/guide/using-extensions', icon: 'puzzle' },
  { title: 'Admin Dashboard', desc: 'Server config & user management', link: '/guide/admin-dashboard', icon: 'shield' },
  { title: 'Super User', desc: 'Full control & first-run setup', link: '/guide/core/super-user', icon: 'star' },
  { title: 'FAQ', desc: 'Common questions answered', link: '/guide/faq/', icon: 'help' },
]

</script>

<template>
  <div class="home" :class="{ 'is-mounted': mounted }">

    <!-- ── Hero ── -->
    <section class="hero anim" style="--d:0s">
      <div class="hero-glow"></div>
      <h1 class="hero-title">LNbits Documentation</h1>
      <p class="hero-tagline">The open-source Lightning wallet with 60+ extensions, 20+ backends, and a full REST API.</p>

      <!-- LLM pills -->
      <div class="llm-pills">
        <span class="llm-pills-label">Explore with AI</span>
        <button class="llm-pill" @click="openWithLLM('chatgpt')" title="Open in ChatGPT">
          <img :src="openaiIcon" alt="OpenAI" width="18" height="18" />
        </button>
        <button class="llm-pill" @click="openWithLLM('claude')" title="Open in Claude">
          <img :src="claudeIcon" alt="Claude" width="18" height="18" />
        </button>
        <button class="llm-pill" @click="openWithLLM('perplexity')" title="Open in Perplexity">
          <img :src="perplexityIcon" alt="Perplexity" width="18" height="18" />
        </button>
        <button class="llm-pill" @click="openWithLLM('gemini')" title="Open in Gemini">
          <img :src="geminiIcon" alt="Gemini" width="18" height="18" />
        </button>
        <button class="llm-pill" @click="openWithLLM('grok')" title="Open in Grok">
          <img :src="grokIcon" alt="Grok" width="18" height="18" class="llm-logo--currentcolor" />
        </button>
        <button class="llm-pill llm-pill--copy" @click="openWithLLM('copy')" title="Copy prompt">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
      </div>

      <!-- Search -->
      <button class="search-trigger" @click="openSearch">
        <svg class="search-trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span>Search docs...</span>
        <kbd><span class="kbd-sym">&#8984;</span>K</kbd>
      </button>

      <!-- Funding Sources Carousel -->
      <div class="carousel-wrap" :key="isDark ? 'dark' : 'light'">
        <span class="carousel-label">Funding Sources</span>
        <div class="carousel">
          <div class="carousel-track">
            <div v-for="b in backends" :key="b.name + '-1'" class="carousel-item">
              <img :src="b.img" :alt="b.name" loading="lazy" />
            </div>
            <div v-for="b in backends" :key="b.name + '-2'" class="carousel-item" aria-hidden="true">
              <img :src="b.img" :alt="b.name" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Main Cards ── -->
    <section class="main-cards anim" style="--d:0.12s">
      <div class="cards-row">
        <a v-for="c in mainCards" :key="c.title" :href="c.link" class="mcard">
          <div class="mcard-banner">
            <!-- User Guide banner -->
            <svg v-if="c.icon==='book'" viewBox="0 0 280 80" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <rect x="20" y="12" width="52" height="56" rx="4" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".4"/>
              <rect x="28" y="22" width="28" height="3" rx="1.5" fill="var(--vp-c-brand-1)" opacity=".35"/>
              <rect x="28" y="29" width="36" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".3"/>
              <rect x="28" y="35" width="30" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".25"/>
              <rect x="28" y="41" width="33" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".2"/>
              <rect x="28" y="50" width="20" height="3" rx="1.5" fill="var(--vp-c-brand-1)" opacity=".25"/>
              <rect x="28" y="57" width="36" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".2"/>
              <rect x="90" y="18" width="44" height="44" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".25"/>
              <path d="M104 34l8 6-8 6" stroke="var(--vp-c-brand-1)" stroke-width="1.8" opacity=".4"/>
              <circle cx="112" cy="40" r="14" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".15"/>
              <rect x="150" y="24" width="60" height="32" rx="6" stroke="var(--vp-c-text-2)" stroke-width="1" opacity=".2"/>
              <rect x="158" y="32" width="20" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".2"/>
              <rect x="158" y="38" width="32" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".15"/>
              <rect x="158" y="44" width="26" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".12"/>
            </svg>
            <!-- API Reference banner -->
            <svg v-if="c.icon==='code'" viewBox="0 0 280 80" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <rect x="16" y="10" width="90" height="60" rx="6" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".35"/>
              <path d="M16 22h90" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".2"/>
              <circle cx="26" cy="16" r="2.5" fill="#ff5f57" opacity=".5"/><circle cx="34" cy="16" r="2.5" fill="#febc2e" opacity=".5"/><circle cx="42" cy="16" r="2.5" fill="#28c840" opacity=".5"/>
              <text x="24" y="34" fill="var(--vp-c-brand-1)" opacity=".45" font-size="8" font-family="monospace" font-weight="700">GET</text>
              <rect x="44" y="29" width="50" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".25"/>
              <text x="24" y="46" fill="var(--vp-c-brand-1)" opacity=".35" font-size="8" font-family="monospace" font-weight="700">POST</text>
              <rect x="48" y="41" width="44" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".2"/>
              <text x="24" y="58" fill="var(--vp-c-brand-1)" opacity=".3" font-size="8" font-family="monospace" font-weight="700">PUT</text>
              <rect x="44" y="53" width="38" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".15"/>
              <path d="M130 30c8-4 16 0 24 2s16-2 24 1" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".2"/>
              <path d="M130 44c10 2 18-3 26 0s14 4 22 1" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".15"/>
              <circle cx="140" cy="36" r="3" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".25"/>
              <circle cx="168" cy="38" r="2" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".2"/>
            </svg>
            <!-- Developer Guide banner -->
            <svg v-if="c.icon==='build'" viewBox="0 0 280 80" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <rect x="20" y="14" width="32" height="32" rx="6" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".35"/>
              <rect x="58" y="14" width="32" height="32" rx="6" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".28"/>
              <rect x="20" y="52" width="32" height="18" rx="4" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".22"/>
              <rect x="58" y="52" width="32" height="18" rx="4" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".18"/>
              <path d="M32 26l6 4-6 4" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".4"/>
              <rect x="66" y="22" width="16" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".25"/>
              <rect x="66" y="28" width="12" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".2"/>
              <path d="M110 30l30-8m-30 18l30 2m-30 14l30-6" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".18" stroke-dasharray="3 4"/>
              <circle cx="148" cy="24" r="6" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".22"/>
              <circle cx="148" cy="42" r="4" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".18"/>
              <circle cx="148" cy="56" r="5" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".2"/>
            </svg>
          </div>
          <div class="mcard-body">
            <span class="mcard-title">{{ c.title }}</span>
            <span class="mcard-desc">{{ c.desc }}</span>
          </div>
          <svg class="mcard-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </section>

    <!-- ── Quick Links ── -->
    <section class="quick-links anim" style="--d:0.22s">
      <h2 class="section-heading">Explore</h2>
      <div class="qlinks-grid">
        <a v-for="q in quickLinks" :key="q.title" :href="q.link" class="qlink">
          <div class="qlink-icon">
            <!-- Download -->
            <svg v-if="q.icon==='download'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <!-- Wallet -->
            <svg v-if="q.icon==='wallet'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 12h.01"/><path d="M2 10h20"/></svg>
            <!-- Puzzle -->
            <svg v-if="q.icon==='puzzle'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.315 8.685a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.61-1.61A2.404 2.404 0 0 1 12 2c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"/></svg>
            <!-- Shield -->
            <svg v-if="q.icon==='shield'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            <!-- Star -->
            <svg v-if="q.icon==='star'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <!-- Help -->
            <svg v-if="q.icon==='help'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <div class="qlink-text">
            <span class="qlink-title">{{ q.title }}</span>
            <span class="qlink-desc">{{ q.desc }}</span>
          </div>
        </a>
      </div>
    </section>

    <!-- ── Stats ── -->
    <section class="stats anim" style="--d:0.32s">
      <div class="stat-items">
        <div class="stat-item">
          <span class="stat-num">20+</span>
          <span class="stat-label">Wallet Backends</span>
        </div>
        <div class="stat-sep"></div>
        <div class="stat-item">
          <span class="stat-num">60+</span>
          <span class="stat-label">Extensions</span>
        </div>
        <div class="stat-sep"></div>
        <div v-if="ghStars" class="stat-item">
          <span class="stat-num">{{ ghStars }}</span>
          <span class="stat-label">GitHub Stars</span>
        </div>
        <div v-if="ghStars" class="stat-sep"></div>
        <div class="stat-item">
          <span class="stat-num">MIT</span>
          <span class="stat-label">License</span>
        </div>
      </div>
    </section>

    <!-- ── SaaS Promo ── -->
    <section class="saas anim" style="--d:0.42s">
      <div class="saas-inner">
        <div class="saas-video-wrap">
          <video
            class="saas-video"
            src="/SaaS/saas-demo.mp4"
            autoplay
            loop
            muted
            playsinline
          ></video>
        </div>
        <div class="saas-bottom">
          <div class="saas-copy">
            <span class="saas-eyebrow">No time to self-host?</span>
            <h2 class="saas-title">Deploy LNbits in 3 minutes</h2>
            <p class="saas-desc">
              No server, no CLI, no config files. <strong>myLNbits</strong> gives you a production-ready
              instance with all 60+ extensions, automatic updates, and backups.
            </p>
          </div>
          <div class="saas-right">
            <ul class="saas-features">
              <li>Pay with Lightning or PayPal</li>
              <li>All extensions pre-installed</li>
              <li>Custom domain support</li>
              <li>Migrate to self-hosted anytime</li>
            </ul>
            <div class="saas-actions">
              <a href="https://my.lnbits.com" target="_blank" rel="noopener noreferrer" class="saas-btn saas-btn--primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                Start now
              </a>
              <a href="/guide/installation/saas" class="saas-btn">Learn more</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Contribute Teaser ── -->
    <section class="contrib-teaser anim" style="--d:0.52s">
      <div class="contrib-header">
        <div>
          <span class="contrib-eyebrow">Open Source</span>
          <h2 class="contrib-title">Contribute to LNbits</h2>
          <p class="contrib-subtitle">LNbits is built by people like you. Find a task that matches your skills.</p>
        </div>
        <a href="/contribute/" class="contrib-cta">
          Find a task
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
      </div>
      <div class="contrib-video" @click="contribVideoActive = true">
        <iframe
          v-if="contribVideoActive"
          src="https://www.youtube-nocookie.com/embed/LCPt4bkHT7g?autoplay=1"
          title="Contributing to LNbits"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <template v-else>
          <img src="https://img.youtube.com/vi/LCPt4bkHT7g/maxresdefault.jpg" alt="Contributing to LNbits" class="contrib-video-thumb" loading="lazy"/>
          <button class="contrib-video-play" aria-label="Play video">
            <svg viewBox="0 0 68 48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#212121" opacity="0.8"/><path d="M45 24L27 14v20" fill="#fff"/></svg>
          </button>
        </template>
      </div>
      <div class="contrib-roles">
        <a href="/contribute/#developer" class="contrib-role">
          <Code :size="18" class="contrib-role-icon" />
          <div>
            <strong>Developers</strong>
            <span>Core features, extensions, bug fixes</span>
          </div>
        </a>
        <a href="/contribute/#tester" class="contrib-role">
          <SearchCheck :size="18" class="contrib-role-icon" />
          <div>
            <strong>Testers</strong>
            <span>QA, edge cases, bug reports</span>
          </div>
        </a>
        <a href="/contribute/#writer" class="contrib-role">
          <PenLine :size="18" class="contrib-role-icon" />
          <div>
            <strong>Writers</strong>
            <span>Docs, blogs, stories, tutorials</span>
          </div>
        </a>
        <a href="/contribute/#designer" class="contrib-role">
          <Palette :size="18" class="contrib-role-icon" />
          <div>
            <strong>Designers</strong>
            <span>UI, marketing visuals, graphics</span>
          </div>
        </a>
        <a href="/contribute/#entrepreneur" class="contrib-role">
          <Rocket :size="18" class="contrib-role-icon" />
          <div>
            <strong>Entrepreneurs</strong>
            <span>Build products, run services</span>
          </div>
        </a>
        <a href="/contribute/#ambassador" class="contrib-role">
          <Megaphone :size="18" class="contrib-role-icon" />
          <div>
            <strong>Ambassadors</strong>
            <span>Talks, meetups, community outreach</span>
          </div>
        </a>
      </div>
    </section>

    <!-- ── Community ── -->
    <section class="community anim" style="--d:0.6s">
      <h2 class="section-heading">Join the community</h2>
      <div class="community-links">
        <a href="https://t.me/lnbits" target="_blank" rel="noopener noreferrer" class="community-link">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          <div>
            <strong>Telegram</strong>
            <span>Chat with the community</span>
          </div>
        </a>
        <a href="https://github.com/lnbits/lnbits" target="_blank" rel="noopener noreferrer" class="community-link">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          <div>
            <strong>GitHub</strong>
            <span>Star, fork, contribute</span>
          </div>
        </a>
        <a href="https://x.com/lnbits" target="_blank" rel="noopener noreferrer" class="community-link">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          <div>
            <strong>X / Twitter</strong>
            <span>Updates and announcements</span>
          </div>
        </a>
        <a href="https://primal.net/p/npub10efcj7x65z2ak6vd69xr8f2hvqwuaqrhlygl3yqa4y63hfvc02mqwzaeh3" target="_blank" rel="noopener noreferrer" class="community-link">
          <svg viewBox="46 19 172 192" fill="currentColor"><path d="M210.8 199.4c0 3.1-2.5 5.7-5.7 5.7h-68c-3.1 0-5.7-2.5-5.7-5.7v-15.5c.3-19 2.3-37.2 6.5-45.5 2.5-5 6.7-7.7 11.5-9.1 9.1-2.7 24.9-.9 31.7-1.2 0 0 20.4.8 20.4-10.7s-9.1-8.6-9.1-8.6c-10 .3-17.7-.4-22.6-2.4-8.3-3.3-8.6-9.2-8.6-11.2-.4-23.1-34.5-25.9-64.5-20.1-32.8 6.2.4 53.3.4 116.1v8.4c0 3.1-2.6 5.6-5.7 5.6H57.7c-3.1 0-5.7-2.5-5.7-5.7v-144c0-3.1 2.5-5.7 5.7-5.7h31.7c3.1 0 5.7 2.5 5.7 5.7 0 4.7 5.2 7.2 9 4.5 11.4-8.2 26-12.5 42.4-12.5 36.6 0 64.4 21.4 64.4 68.7v83.2ZM150 99.3c0-6.7-5.4-12.1-12.1-12.1s-12.1 5.4-12.1 12.1 5.4 12.1 12.1 12.1S150 106 150 99.3Z"/></svg>
          <div>
            <strong>Nostr</strong>
            <span>Follow on the open protocol</span>
          </div>
        </a>
      </div>
    </section>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="toast" class="home-toast">{{ toast }}</div>
    </Transition>
  </div>
</template>

<style scoped>
/* ═══════════════════════════════════
   Layout
   ═══════════════════════════════════ */
.home {
  max-width: 840px;
  margin: 0 auto;
  padding: 0 24px 96px;
  background-image:
    radial-gradient(circle, rgba(0, 0, 0, 0.15) 1.2px, transparent 1.2px);
  background-size: 28px 28px;
}

:global(.dark) .home {
  background-image:
    radial-gradient(circle, rgba(149, 117, 205, 0.12) 1.2px, transparent 1.2px);
}

/* Stagger entrance */
.anim {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--d);
}
.is-mounted .anim {
  opacity: 1;
  transform: none;
}

.section-heading {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--vp-c-text-3);
  margin: 0 0 20px;
}

/* ═══════════════════════════════════
   Hero
   ═══════════════════════════════════ */
.hero {
  text-align: center;
  padding: 56px 0 0;
  position: relative;
}

.hero-glow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, rgba(255, 31, 225, 0.10) 0%, transparent 65%);
  pointer-events: none;
  z-index: 0;
}

.dark .hero-glow {
  background: radial-gradient(circle, rgba(255, 31, 225, 0.15) 0%, rgba(149, 117, 205, 0.05) 40%, transparent 65%);
}

.hero-title {
  position: relative;
  z-index: 1;
  font-size: 2.4rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin: 0 0 10px;
  color: var(--vp-c-text-1);
}

.hero-tagline {
  position: relative;
  z-index: 1;
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin: 0 0 24px;
  line-height: 1.5;
}

/* ── LLM Pills ── */
.llm-pills {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 0 auto 32px;
}

.llm-pills-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--vp-c-text-3);
  margin-right: 6px;
}

.llm-pill {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-elv);
  cursor: pointer;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}

.llm-pill:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.dark .llm-pill:hover {
  box-shadow: 0 6px 16px rgba(149, 117, 205, 0.15);
}

.llm-pill img {
  display: block;
}

/* Icons using currentColor fill - need explicit color */
.llm-pill img[alt="OpenAI"],
.llm-logo--currentcolor {
  filter: brightness(0);
}

.dark .llm-pill img[alt="OpenAI"],
.dark .llm-logo--currentcolor {
  filter: brightness(0) invert(1);
}

.llm-pill--copy {
  color: var(--vp-c-text-3);
}

.llm-pill--copy:hover {
  color: var(--vp-c-brand-1);
}

/* ── Search trigger ── */
.search-trigger {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 480px;
  padding: 14px 20px;
  margin: 0 auto 28px;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-elv);
  cursor: pointer;
  font-size: 15px;
  color: var(--vp-c-text-3);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-trigger:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
}

.dark .search-trigger:hover {
  box-shadow: 0 2px 16px rgba(149, 117, 205, 0.1);
}

.search-trigger-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  opacity: 0.5;
}

.search-trigger span {
  flex: 1;
  text-align: left;
}

.search-trigger kbd {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  background: var(--vp-c-bg-soft);
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  line-height: 1;
  color: var(--vp-c-text-3);
}

.kbd-sym { font-size: 13px; }

/* ── Carousel ── */
.carousel-wrap {
  position: relative;
  z-index: 1;
  margin: 0 auto 48px;
  max-width: 640px;
}

.carousel-label {
  display: block;
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--vp-c-text-3);
  margin-bottom: 16px;
}

.carousel {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
}

.carousel-track {
  display: flex;
  gap: 36px;
  width: max-content;
  animation: scroll-carousel 40s linear infinite;
}

.carousel-item {
  flex-shrink: 0;
}

.carousel-item img {
  width: 72px;
  height: 72px;
  object-fit: contain;
}

@keyframes scroll-carousel {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ═══════════════════════════════════
   Main Cards (3-col)
   ═══════════════════════════════════ */
.main-cards {
  margin-bottom: 56px;
}

.cards-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.mcard {
  display: flex;
  flex-direction: column;
  padding: 28px 22px 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-elv);
  text-decoration: none;
  position: relative;
  transition: border-color 0.2s, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s;
}

.mcard:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.07);
}

.dark .mcard:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
}

.mcard-banner {
  width: 100%;
  margin-bottom: 16px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 8px 0;
  overflow: hidden;
}

.dark .mcard-banner {
  background: rgba(149, 117, 205, 0.06);
}

.mcard-banner svg {
  width: 100%;
  height: auto;
  display: block;
}

.mcard-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.mcard-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.mcard-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.55;
}

.mcard-arrow {
  width: 18px;
  height: 18px;
  color: var(--vp-c-text-3);
  margin-top: 16px;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s, transform 0.2s;
}

.mcard:hover .mcard-arrow {
  opacity: 0.6;
  transform: translateX(0);
}

/* ═══════════════════════════════════
   Quick Links (2x3 grid)
   ═══════════════════════════════════ */
.quick-links {
  margin-bottom: 56px;
}

.qlinks-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.qlink {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-elv);
  text-decoration: none;
  transition: border-color 0.2s, background 0.2s;
}

.qlink:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.qlink-icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.dark .qlink-icon {
  background: rgba(149, 117, 205, 0.08);
  color: #b39ddb;
}

.qlink:hover .qlink-icon {
  color: var(--vp-c-brand-1);
}

.qlink-icon svg {
  width: 17px;
  height: 17px;
}

.qlink-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.qlink-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.qlink-desc {
  font-size: 12px;
  color: var(--vp-c-text-3);
  line-height: 1.4;
}

/* ═══════════════════════════════════
   Stats
   ═══════════════════════════════════ */
.stats {
  text-align: center;
  padding: 36px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.stat-items {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-num {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
}

.stat-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.stat-sep {
  width: 1px;
  height: 36px;
  background: var(--vp-c-divider);
}

/* ═══════════════════════════════════
   SaaS Promo
   ═══════════════════════════════════ */
.saas {
  margin-bottom: 56px;
}

.saas-inner {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-elv);
  overflow: hidden;
}

.saas-video-wrap {
  background: #000;
}

.saas-video {
  display: block;
  width: 100%;
  height: auto;
}

.saas-bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 28px 32px;
  align-items: start;
}

.saas-copy {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.saas-eyebrow {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--vp-c-brand-1);
}

.saas-title {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
  margin: 0;
  line-height: 1.2;
}

.saas-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 4px 0 0;
}

.saas-right {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.saas-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.saas-features li {
  font-size: 13px;
  color: var(--vp-c-text-2);
  padding-left: 20px;
  position: relative;
}

.saas-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--vp-c-brand-1);
  font-weight: 700;
  font-size: 13px;
}

.saas-actions {
  display: flex;
  gap: 10px;
}

.saas-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  transition: border-color 0.2s, background 0.2s, transform 0.2s;
}

.saas-btn:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

.saas-btn--primary {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}

.saas-btn--primary:hover {
  opacity: 0.9;
  border-color: var(--vp-c-brand-1);
}

/* ═══════════════════════════════════
   Contribute Teaser
   ═══════════════════════════════════ */
.contrib-teaser {
  margin-bottom: 56px;
  padding: 32px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-elv);
}

.contrib-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.contrib-eyebrow {
  display: block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--vp-c-brand-1);
  margin-bottom: 6px;
}

.contrib-title {
  font-size: 22px;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin: 0 0 4px 0;
  letter-spacing: -0.02em;
}

.contrib-subtitle {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
}

.contrib-video {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  margin-bottom: 24px;
}

.contrib-video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.contrib-video-thumb {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

.contrib-video-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 68px;
  height: 48px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform .2s;
}

.contrib-video-play svg {
  width: 100%;
  height: 100%;
}

.contrib-video:hover .contrib-video-play {
  transform: translate(-50%, -50%) scale(1.1);
}

.contrib-roles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px 24px;
}

.contrib-role {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  transition: background 0.2s;
  text-decoration: none !important;
  color: inherit;
}

.contrib-role:hover {
  background: var(--vp-c-bg-alt);
}

.contrib-role strong {
  display: block;
  font-size: 13px;
  color: var(--vp-c-text-1);
  font-weight: 600;
  margin-bottom: 2px;
}

.contrib-role span:last-child {
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.4;
}

.contrib-role-icon {
  flex-shrink: 0;
  color: var(--vp-c-brand-1);
  margin-top: 1px;
}

.contrib-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: var(--vp-c-brand-1);
  color: #fff !important;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
  text-decoration: none !important;
  transition: opacity 0.2s, transform 0.2s;
  white-space: nowrap;
}

.contrib-cta:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .contrib-teaser {
    padding: 20px;
  }
  .contrib-header {
    flex-direction: column;
    gap: 16px;
  }
  .contrib-roles {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .contrib-roles {
    grid-template-columns: 1fr;
  }
}

/* ═══════════════════════════════════
   Community
   ═══════════════════════════════════ */
.community {
  margin-bottom: 0;
  padding: 48px 0 0;
  border-top: 1px solid var(--vp-c-divider);
}

.community-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.community-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-elv);
  text-decoration: none;
  transition: border-color .2s, background .2s;
}

.community-link:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.community-link svg {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: var(--vp-c-text-2);
  opacity: .7;
}

.community-link strong {
  display: block;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.community-link span {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

/* ═══════════════════════════════════
   Toast
   ═══════════════════════════════════ */
.home-toast {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  padding: 10px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  white-space: nowrap;
}

.toast-enter-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-leave-active {
  transition: opacity 0.2s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(12px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%);
}

/* ═══════════════════════════════════
   Responsive
   ═══════════════════════════════════ */
@media (max-width: 768px) {
  .home {
    padding: 0 16px 72px;
  }

  .hero {
    padding: 36px 0 0;
  }

  .hero-title {
    font-size: 1.8rem;
    margin-bottom: 16px;
  }

  .llm-pills {
    gap: 5px;
  }

  .cards-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .mcard {
    flex-direction: row;
    align-items: center;
    gap: 16px;
    padding: 18px 16px;
  }

  .mcard-banner {
    display: none;
  }

  .mcard-arrow {
    margin-top: 0;
    opacity: 0.3;
    transform: none;
  }

  .qlinks-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .stat-items {
    gap: 20px;
  }

  .stat-sep {
    display: none;
  }

  .stat-num {
    font-size: 22px;
  }

  .saas-bottom {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 20px;
  }

  .saas-title {
    font-size: 19px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.55rem;
  }

  .qlinks-grid {
    grid-template-columns: 1fr;
  }

  .llm-pill {
    width: 36px;
    height: 36px;
  }

  .llm-pills-label {
    display: none;
  }
}
</style>
