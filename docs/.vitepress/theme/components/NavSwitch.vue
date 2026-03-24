<script setup>
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vitepress'
import MegaMenu from './MegaMenu.vue'

const route = useRoute()
const isIndex = computed(() => route.path === '/' || route.path === '/index.html')
const isContribute = computed(() => route.path.startsWith('/contribute'))

const sections = [
  { text: 'Guide', link: '/guide/', match: '/guide' },
  { text: 'API', link: '/api/', match: '/api' },
  { text: 'Extensions', link: '/extensions/', match: '/extensions' },
  { text: 'Apps', link: '/apps/', match: '/apps' },
  { text: 'Plugins', link: '/plugins/', match: '/plugins' },
  { text: 'Developers', link: '/dev/architecture', match: '/dev' },
  { text: 'LLM', link: '/llm/', match: '/llm' },
  { text: 'Contribute', link: '/contribute/', match: '/contribute' },
]

const activeSection = computed(() => {
  for (const s of sections) {
    if (route.path.startsWith(s.match)) return s.match
  }
  return null
})

function syncClass() {
  document.body.classList.toggle('has-section-bar', !isIndex.value && !isContribute.value)
}

watch([isIndex, isContribute], syncClass)
onMounted(syncClass)
onUnmounted(() => document.body.classList.remove('has-section-bar'))
</script>

<template>
  <!-- Index: mega menu -->
  <MegaMenu v-if="isIndex" />

  <!-- Doc pages: section bar below header -->
  <Teleport to="body">
    <nav v-if="!isIndex && !isContribute" class="sb" aria-label="Section navigation">
      <div class="sb-inner">
        <a
          v-for="s in sections"
          :key="s.link"
          :href="s.link"
          class="sb-tab"
          :class="{ 'sb-tab--on': activeSection === s.match }"
          :aria-current="activeSection === s.match ? 'true' : undefined"
        >{{ s.text }}</a>
      </div>
    </nav>
  </Teleport>
</template>

<style scoped>
/* ═══ Section bar ═══ */
.sb {
  display: none;
  position: fixed;
  top: var(--vp-nav-height, 64px);
  left: 0;
  right: 0;
  height: 40px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  z-index: 29;
}

@media (min-width: 960px) {
  .sb { display: block; }
}

.sb-inner {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 32px;
  overflow-x: auto;
  scrollbar-width: none;
}
.sb-inner::-webkit-scrollbar { display: none; }

.sb-tab {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-decoration: none;
  white-space: nowrap;
  position: relative;
  transition: color .2s;
}
.sb-tab:hover { color: var(--vp-c-text-1); }
.sb-tab--on { color: var(--vp-c-text-1); font-weight: 600; }
.sb-tab--on::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
  height: 2px;
  background: var(--vp-c-brand-1);
  border-radius: 1px;
}
</style>

<style>
/*
 * Offset VitePress layout when section bar is visible.
 * These must be non-scoped to target VitePress internals.
 * Uses body.has-section-bar toggled by the component.
 *
 * VitePress desktop sidebar: position:fixed, top:0, padding-top: var(--vp-nav-height)
 * VitePress desktop content:  padding-top: var(--vp-nav-height)
 * We add 40px to both.
 */
@media (min-width: 960px) {
  body.has-section-bar .VPSidebar {
    top: calc(var(--vp-nav-height, 64px) + 40px) !important;
    padding-top: 16px !important;
    border-right: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg);
  }

  body.has-section-bar .VPContent {
    padding-top: calc(var(--vp-nav-height, 64px) + 40px) !important;
  }

  body.has-section-bar .VPLocalNav {
    top: calc(var(--vp-nav-height, 64px) + 40px) !important;
  }

  body.has-section-bar .aside-container {
    padding-top: calc(
      var(--vp-nav-height, 64px) +
      var(--vp-layout-top-height, 0px) +
      var(--vp-doc-top-height, 0px) +
      88px
    ) !important;
  }
}

/* Nav bar ordering + grouping */
@media (min-width: 960px) {
  .VPNavBar .content-body {
    gap: 8px !important;
  }

  .VPNavBarSearch { order: 0 !important; margin: 0 !important; flex-grow: 0 !important; }
  .VPNavBarMenu { order: 5 !important; }
  .VPNavBarAppearance { order: 10 !important; }
  .VPNavBarSocialLinks { order: 11 !important; }
  .VPNavBarExtra { order: 12 !important; }

  .VPNavBarMenu > * { display: none !important; }
  .VPNavBarMenu > *:last-child { display: flex !important; }
}

/* Sidebar curtain fix - hide the gradient overlay that bleeds color */
@media (min-width: 960px) {
  body.has-section-bar .VPSidebar .curtain {
    display: none !important;
  }
}
</style>
