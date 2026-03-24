<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vitepress'

const open = ref(false)
const route = useRoute()
let closeTimer = null

function show() {
  clearTimeout(closeTimer)
  open.value = true
}

function hide() {
  closeTimer = setTimeout(() => { open.value = false }, 200)
}

function onKeydown(e) {
  if (e.key === 'Escape') open.value = false
}

// Auto-close on route change
watch(() => route.path, () => { open.value = false })

const columns = [
  {
    title: 'Guide',
    groups: [
      {
        heading: 'Getting Started',
        items: [
          { name: 'Overview', desc: 'Introduction to LNbits', link: '/guide/', icon: 'book' },
          { name: 'What is LNbits?', desc: 'Core concepts explained', link: '/guide/what-is-lnbits', icon: 'info' },
          { name: 'Installation', desc: 'uv, Docker, Nix, Fly.io', link: '/guide/installation/', icon: 'download' },
          { name: 'First Setup', desc: 'Post-install configuration', link: '/guide/installation/first-setup', icon: 'play' },
        ],
      },
      {
        heading: 'Using LNbits',
        items: [
          { name: 'Wallet Backends', desc: '20+ funding sources', link: '/guide/wallets/', icon: 'wallet' },
          { name: 'Core Features', desc: 'Payments, LNURL, labels', link: '/guide/core/', icon: 'zap' },
          { name: 'Extensions', desc: '60+ plugins', link: '/guide/using-extensions', icon: 'puzzle' },
          { name: 'Admin Dashboard', desc: 'Server management', link: '/guide/admin-dashboard', icon: 'settings' },
          { name: 'User Management', desc: 'Roles & permissions', link: '/guide/core/user-management/', icon: 'users' },
          { name: 'FAQ', desc: '80+ common questions', link: '/guide/faq/', icon: 'help' },
        ],
      },
    ],
  },
  {
    title: 'API Reference',
    groups: [
      {
        heading: 'Essentials',
        items: [
          { name: 'Quick Reference', desc: 'All endpoints at a glance', link: '/api/quick-reference', icon: 'list' },
          { name: 'Authentication', desc: 'API keys & tokens', link: '/api/authentication', icon: 'key' },
        ],
      },
      {
        heading: 'Core Endpoints',
        items: [
          { name: 'Wallets', desc: 'Create & manage wallets', link: '/api/core/wallets', icon: 'wallet' },
          { name: 'Payments', desc: 'Send & receive sats', link: '/api/core/payments', icon: 'arrows' },
          { name: 'Users & Accounts', desc: 'User management', link: '/api/core/users', icon: 'users' },
          { name: 'LNURL', desc: 'Pay & withdraw links', link: '/api/core/lnurl', icon: 'link' },
          { name: 'Extensions', desc: 'Install & manage', link: '/api/core/extensions', icon: 'puzzle' },
          { name: 'WebSockets', desc: 'Real-time updates', link: '/api/core/websockets', icon: 'zap' },
        ],
      },
      {
        heading: 'Admin',
        items: [
          { name: 'Admin Endpoints', desc: 'Server configuration', link: '/api/admin/', icon: 'shield' },
          { name: 'Settings', desc: 'Runtime config', link: '/api/admin/settings', icon: 'settings' },
          { name: 'Top-up', desc: 'Fund wallets', link: '/api/admin/topup', icon: 'plus' },
        ],
      },
    ],
  },
  {
    title: 'Developers',
    groups: [
      {
        heading: 'Architecture',
        items: [
          { name: 'System Design', desc: 'How LNbits works', link: '/dev/architecture', icon: 'layers' },
          { name: 'Database', desc: 'Models & migrations', link: '/dev/database', icon: 'database' },
          { name: 'Decorators & Auth', desc: 'Middleware patterns', link: '/dev/decorators', icon: 'code' },
          { name: 'Background Tasks', desc: 'Async processing', link: '/dev/tasks', icon: 'clock' },
        ],
      },
      {
        heading: 'Extensions',
        items: [
          { name: 'Building', desc: 'Python + Vue guide', link: '/dev/building-extensions', icon: 'puzzle' },
          { name: 'Deploying', desc: 'Registry & marketplace', link: '/dev/extensions/', icon: 'upload' },
          { name: 'Wallet Backends', desc: 'Custom funding sources', link: '/dev/wallet-backends', icon: 'wallet' },
          { name: 'Fiat Integration', desc: 'Stripe & PayPal', link: '/dev/fiat-integration', icon: 'dollar' },
        ],
      },
      {
        heading: 'Contribute',
        items: [
          { name: 'Contributing', desc: 'PR workflow & standards', link: '/dev/contributing', icon: 'git' },
        ],
      },
    ],
  },
  {
    title: 'Community & Tools',
    groups: [
      {
        heading: 'Contribute',
        highlight: true,
        items: [
          { name: 'Contribute to LNbits', desc: 'Developer, Tester, Writer, Ambassador', link: '/contribute/', icon: 'heart' },
        ],
      },
      {
        heading: 'Extensions',
        items: [
          { name: 'Browse Extensions', desc: '60+ plugins ready to use', link: '/extensions/', icon: 'puzzle' },
        ],
      },
      {
        heading: 'Companion Apps',
        items: [
          { name: 'TPoS Wrapper', desc: 'Android Tap to Pay', link: '/apps/tpos-wrapper', icon: 'zap' },
        ],
      },
      {
        heading: 'LLM & AI',
        items: [
          { name: 'LLM Overview', desc: 'AI integration guides', link: '/llm/', icon: 'zap' },
          { name: 'Skills', desc: 'Claude Code skills', link: '/llm/skills', icon: 'code' },
        ],
      },
      {
        heading: 'Links',
        items: [
          { name: 'GitHub', desc: 'Source code', link: 'https://github.com/lnbits/lnbits', icon: 'git' },
          { name: 'Changelog', desc: 'Release notes', link: '/changelog', icon: 'list' },
        ],
      },
    ],
  },
]
</script>

<template>
  <div class="mm" @mouseenter="show" @mouseleave="hide" @keydown="onKeydown">
    <button
      class="mm-trigger"
      :aria-expanded="open"
      aria-haspopup="true"
      aria-controls="mm-panel"
      @click="open = !open"
      @focus="show"
    >
      Documentation
      <svg class="mm-caret" :class="{ 'mm-caret--open': open }" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
    </button>

    <Transition name="mm-panel">
      <div v-show="open" id="mm-panel" class="mm-panel" role="menu">
        <div class="mm-inner">
          <div v-for="col in columns" :key="col.title" class="mm-col">
            <span class="mm-col-title">{{ col.title }}</span>
            <div v-for="group in col.groups" :key="group.heading" class="mm-group" :class="{ 'mm-group--highlight': group.highlight }">
              <span class="mm-group-heading">{{ group.heading }}</span>
              <a
                v-for="item in group.items"
                :key="item.link"
                :href="item.link"
                class="mm-item"
                role="menuitem"
                @click="open = false"
              >
                <span class="mm-icon">
                  <svg v-if="item.icon==='book'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
                  <svg v-if="item.icon==='info'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                  <svg v-if="item.icon==='download'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  <svg v-if="item.icon==='play'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  <svg v-if="item.icon==='wallet'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 12h.01"/><path d="M2 10h20"/></svg>
                  <svg v-if="item.icon==='zap'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  <svg v-if="item.icon==='puzzle'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 01-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 10-3.214 3.214c.446.166.855.497.925.968a.979.979 0 01-.276.837l-1.61 1.61a2.404 2.404 0 01-3.41 0l-1.568-1.568a1.026 1.026 0 00-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 11-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 00-.289-.877L1.998 12c0-.617.236-1.234.706-1.704L4.315 8.685a.98.98 0 01.837-.276c.47.07.802.48.968.925a2.501 2.501 0 103.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 01.276-.837l1.61-1.61A2.404 2.404 0 0112 2c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 113.237 3.237c-.464.18-.894.527-.967 1.02z"/></svg>
                  <svg v-if="item.icon==='settings'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4m0 14v4M4.22 4.22l2.83 2.83m9.9 9.9l2.83 2.83M1 12h4m14 0h4M4.22 19.78l2.83-2.83m9.9-9.9l2.83-2.83"/></svg>
                  <svg v-if="item.icon==='users'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                  <svg v-if="item.icon==='help'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  <svg v-if="item.icon==='list'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                  <svg v-if="item.icon==='key'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
                  <svg v-if="item.icon==='arrows'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8l4 4-4 4M6 16l-4-4 4-4"/><path d="M2 12h20"/></svg>
                  <svg v-if="item.icon==='link'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                  <svg v-if="item.icon==='shield'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <svg v-if="item.icon==='plus'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <svg v-if="item.icon==='layers'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                  <svg v-if="item.icon==='database'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                  <svg v-if="item.icon==='code'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  <svg v-if="item.icon==='clock'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <svg v-if="item.icon==='upload'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <svg v-if="item.icon==='dollar'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                  <svg v-if="item.icon==='git'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 012 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>
                  <svg v-if="item.icon==='heart'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                </span>
                <span class="mm-item-text">
                  <span class="mm-item-name">{{ item.name }}</span>
                  <span class="mm-item-desc">{{ item.desc }}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.mm { position: relative; display: none; align-items: center; order: 2; }

@media (min-width: 768px) {
  .mm { display: flex; }
}


/* Trigger */
.mm-trigger {
  display: flex; align-items: center; gap: 4px;
  padding: 0 12px; height: 32px;
  border: none; border-radius: 8px;
  background: transparent; color: var(--vp-c-text-1);
  font-size: 14px; font-weight: 500; font-family: inherit;
  cursor: pointer; transition: color .2s;
  white-space: nowrap;
}
.mm-trigger:hover { color: var(--vp-c-brand-1); }

.mm-caret {
  transition: transform .2s ease;
  opacity: .5;
}
.mm-caret--open { transform: rotate(180deg); }

/* Panel */
.mm-panel {
  position: fixed;
  top: var(--vp-nav-height, 64px);
  left: 50%;
  transform: translateX(-50%);
  width: min(1060px, calc(100vw - 32px));
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0,0,0,.1), 0 0 0 1px rgba(0,0,0,.03);
  z-index: 100;
  padding: 24px 28px;
  max-height: calc(100vh - var(--vp-nav-height, 64px) - 24px);
  overflow-y: auto;
  overscroll-behavior: contain;
}

:global(.dark) .mm-panel {
  box-shadow: 0 12px 40px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.04);
}

.mm-inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 1100px) {
  .mm-inner { grid-template-columns: repeat(2, 1fr); }
}

/* Column */
.mm-col-title {
  display: block;
  font-size: 13px; font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-bottom: 12px;
  letter-spacing: .5px;
}

/* Group */
.mm-group { margin-bottom: 16px; }
.mm-group:last-child { margin-bottom: 0; }
.mm-group-heading {
  display: block;
  font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1.2px;
  color: var(--vp-c-text-3);
  margin-bottom: 6px;
  padding-left: 4px;
}

/* Item */
.mm-item {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 7px 8px;
  border-radius: 8px;
  text-decoration: none; color: var(--vp-c-text-1);
  transition: background .15s;
}
.mm-item:hover { background: var(--vp-c-bg-soft); }

.mm-icon {
  width: 18px; height: 18px; flex-shrink: 0;
  margin-top: 2px;
  color: var(--vp-c-text-3);
  transition: color .15s;
}
.mm-icon svg { width: 100%; height: 100%; }
.mm-item:hover .mm-icon { color: var(--vp-c-brand-1); }

.mm-item-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.mm-item-name { font-size: 13px; font-weight: 600; line-height: 1.3; }
.mm-item-desc { font-size: 11px; color: var(--vp-c-text-3); line-height: 1.3; }

/* Panel transition */
.mm-panel-enter-active { transition: opacity .2s ease, transform .2s ease; }
.mm-panel-leave-active { transition: opacity .2s ease, transform .2s ease; }
.mm-panel-enter-from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
.mm-panel-leave-to { opacity: 0; transform: translateX(-50%) translateY(-3px); }

/* Highlight group (contribute) */
.mm-group--highlight {
  padding: 8px 10px;
  margin: -4px -10px 12px;
  background: rgba(124, 77, 255, .06);
  border: 1px solid rgba(124, 77, 255, .12);
  border-radius: 10px;
}
.mm-group--highlight .mm-group-heading { color: var(--vp-c-brand-1); }
.mm-group--highlight .mm-icon { color: var(--vp-c-brand-1); }
</style>
