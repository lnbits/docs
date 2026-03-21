# Backlog: Mega Menu Navigation (Option B)

## Summary
Replace VitePress default nav dropdowns with a custom full-width mega menu panel. Multi-column grid layout with icons (Iconify/unplugin-icons) and short descriptions per link. Inspired by Stripe, SAP, and Vercel documentation navigation.

## Why
The grouped dropdowns (Option A, shipped) are better than the original flat lists but still constrained to a single narrow column. A mega menu surfaces more content at once, adds visual hierarchy with icons, and looks premium.

## Dependencies
- `unplugin-icons` + `@iconify/json` (Vite-native icon solution, tree-shakes to only used icons)
- Or: `@iconify/vue` for runtime loading (simpler setup, slightly larger bundle)
- VitePress theme override via `Layout` slot or custom nav component

## Implementation Plan

### 1. Install icon tooling
```bash
npm install -D unplugin-icons @iconify/json
```
Configure in `docs/.vitepress/config.mjs` under `vite.plugins`:
```js
import Icons from 'unplugin-icons/vite'
// ...
vite: {
  plugins: [Icons({ compiler: 'vue3' })]
}
```
Then import icons directly in components:
```vue
import IconTerminal from '~icons/lucide/terminal'
```

### 2. Create MegaMenu.vue component
Location: `docs/.vitepress/theme/components/MegaMenu.vue`

Structure:
```
<div class="mega-menu">
  <div class="mega-trigger" @mouseenter="open" @mouseleave="close">
    <span>Docs</span>
  </div>
  <div class="mega-panel" v-show="isOpen">
    <div class="mega-col" v-for="section in sections">
      <h3 class="mega-heading">{{ section.title }}</h3>
      <a v-for="item in section.items" class="mega-item">
        <component :is="item.icon" class="mega-icon" />
        <div>
          <span class="mega-name">{{ item.text }}</span>
          <span class="mega-desc">{{ item.desc }}</span>
        </div>
      </a>
    </div>
  </div>
</div>
```

### 3. Data structure
```js
const megaSections = [
  {
    title: 'Guide',
    items: [
      { text: 'Getting Started', desc: 'Overview & core concepts', link: '/guide/', icon: 'lucide:rocket' },
      { text: 'Installation', desc: 'uv, Docker, Nix, Fly.io', link: '/guide/installation/', icon: 'lucide:download' },
      { text: 'Wallet Backends', desc: '20+ funding sources', link: '/guide/wallets/', icon: 'lucide:wallet' },
      { text: 'Core Features', desc: 'Payments, LNURL, labels', link: '/guide/core/', icon: 'lucide:zap' },
      { text: 'Admin & Security', desc: 'Dashboard, users, roles', link: '/guide/admin-dashboard', icon: 'lucide:shield' },
      { text: 'FAQ', desc: '80+ common questions', link: '/guide/faq/', icon: 'lucide:help-circle' },
    ],
  },
  {
    title: 'API',
    items: [
      { text: 'Quick Reference', desc: 'All endpoints at a glance', link: '/api/quick-reference', icon: 'lucide:list' },
      { text: 'Authentication', desc: 'Keys & tokens', link: '/api/authentication', icon: 'lucide:key' },
      { text: 'Wallets', desc: 'Create, read, delete', link: '/api/core/wallets', icon: 'lucide:credit-card' },
      { text: 'Payments', desc: 'Send & receive', link: '/api/core/payments', icon: 'lucide:arrow-left-right' },
      { text: 'Admin API', desc: 'Settings & config', link: '/api/admin/', icon: 'lucide:settings' },
    ],
  },
  {
    title: 'Developers',
    items: [
      { text: 'Architecture', desc: 'System design & patterns', link: '/dev/architecture', icon: 'lucide:layers' },
      { text: 'Build Extensions', desc: 'Python + Vue guide', link: '/dev/building-extensions', icon: 'lucide:puzzle' },
      { text: 'Deploy Extensions', desc: 'Registry & marketplace', link: '/dev/extensions/', icon: 'lucide:upload' },
      { text: 'Database', desc: 'Models & migrations', link: '/dev/database', icon: 'lucide:database' },
      { text: 'Contributing', desc: 'PR workflow & standards', link: '/dev/contributing', icon: 'lucide:git-pull-request' },
    ],
  },
]
```

### 4. CSS design
- Full viewport width panel, max-height 480px
- 3-column grid (one per section)
- Dark background matching site theme (#0d0d1a dark / white light)
- Subtle top border or shadow to separate from nav
- Each item: icon (20px, accent color) + name (bold) + description (muted) in a row
- Hover: subtle background shift
- Smooth enter/leave transition (slide down + fade)
- Close on mouse leave, click outside, or Escape key

### 5. Theme integration
In `docs/.vitepress/theme/index.js`, override the nav slot:
```js
Layout() {
  return h(DefaultTheme.Layout, null, {
    'nav-bar-content-after': () => h(MegaMenu),
    'layout-bottom': () => h(PageToolbar),
  })
}
```
Or replace specific nav items with the mega menu trigger while keeping others as standard VitePress nav items.

### 6. Icon set
Use Lucide icons via Iconify (same icon set VitePress uses internally):
- lucide:rocket, lucide:download, lucide:wallet, lucide:zap
- lucide:shield, lucide:help-circle, lucide:list, lucide:key
- lucide:credit-card, lucide:arrow-left-right, lucide:settings
- lucide:layers, lucide:puzzle, lucide:upload, lucide:database
- lucide:git-pull-request

### 7. Accessibility
- `aria-expanded` on trigger
- `role="menu"` on panel
- Keyboard: Enter/Space to toggle, Escape to close, Tab to navigate items
- Focus trap when panel is open

### 8. Responsive
- Desktop (>960px): full mega menu
- Tablet/Mobile: fall back to VitePress default mobile nav (hamburger menu)

## Effort estimate
- Icon setup: 30 min
- MegaMenu component: 2-3 hours
- Theme integration: 30 min
- Testing & polish: 1 hour
- Total: ~4-5 hours

## Priority
Medium - the grouped dropdowns (Option A) work well enough. This is a polish/premium upgrade.
