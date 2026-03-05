<script setup>
import { ref, onMounted, computed } from 'vue'
import { useData } from 'vitepress'
import openaiIcon from '@lobehub/icons-static-svg/icons/openai.svg'
import claudeIcon from '@lobehub/icons-static-svg/icons/claude-color.svg'
import perplexityIcon from '@lobehub/icons-static-svg/icons/perplexity-color.svg'
import geminiIcon from '@lobehub/icons-static-svg/icons/gemini-color.svg'
import grokIcon from '@lobehub/icons-static-svg/icons/grok.svg'

const mounted = ref(false)
const toast = ref('')
const { isDark } = useData()

onMounted(() => {
  mounted.value = true
})

const LNB_PROMPT = `I want to understand how LNbits can help me build Lightning-powered applications.

LNbits is a free, open-source Lightning Network wallet and accounts system. It offers 50+ extensions (Point of Sale, paywall, Nostr Wallet Connect, IoT, etc.), 20+ wallet backends, a REST API, and multi-user account management.

The full documentation is available as LLM-ready files at https://docs.lnbits.com/llms.txt (index) and https://docs.lnbits.com/llms-full.txt (complete docs).

Explain what LNbits could do for my project and give me concrete examples of what I could build with it.`

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
    notify('Copied — paste into Claude')
  } else if (target === 'gemini') {
    window.open('https://gemini.google.com/', '_blank')
    notify('Copied — paste into Gemini')
  } else if (target === 'grok') {
    window.open('https://grok.com/', '_blank')
    notify('Copied — paste into Grok')
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
  { title: 'Extensions', desc: '50+ plugins ready to use', link: '/guide/using-extensions', icon: 'puzzle' },
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

      <!-- LLM pills — replaces tagline -->
      <div class="llm-pills">
        <span class="llm-pills-label">Ask AI</span>
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
      <div class="carousel-wrap">
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
          <div class="mcard-icon-wrap">
            <!-- Book -->
            <svg v-if="c.icon==='book'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="9" y1="7" x2="16" y2="7"/><line x1="9" y1="11" x2="14" y2="11"/></svg>
            <!-- Code -->
            <svg v-if="c.icon==='code'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>
            <!-- Build -->
            <svg v-if="c.icon==='build'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/><rect x="2" y="13" width="9" height="9" rx="1"/><path d="M17.5 13v4m0 0v4m0-4h-4m4 0h4"/></svg>
          </div>
          <div class="mcard-text">
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
          <span class="stat-num">50+</span>
          <span class="stat-label">Extensions</span>
        </div>
        <div class="stat-sep"></div>
        <div class="stat-item">
          <span class="stat-num">9+</span>
          <span class="stat-label">Themes + Custom</span>
        </div>
        <div class="stat-sep"></div>
        <div class="stat-item">
          <span class="stat-num">MIT</span>
          <span class="stat-label">License</span>
        </div>
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
  margin: 0 0 20px;
  color: var(--vp-c-text-1);
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

/* Icons using currentColor fill — need explicit color */
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

.mcard-icon-wrap {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin-bottom: 18px;
  color: var(--vp-c-brand-1);
}

.dark .mcard-icon-wrap {
  background: rgba(149, 117, 205, 0.1);
  color: #b39ddb;
}

.mcard-icon-wrap svg {
  width: 22px;
  height: 22px;
}

.mcard-text {
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

  .mcard-icon-wrap {
    margin-bottom: 0;
    width: 40px;
    height: 40px;
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
