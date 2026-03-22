<script setup>
import { ref } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const showMenu = ref(false)
const toast = ref('')
let closeTimer = null

function getContentEl() {
  return document.querySelector('.vp-doc > div') || document.querySelector('.vp-doc')
}

function getPageTitle() {
  return document.querySelector('h1')?.textContent?.trim() || document.title
}

function getPageUrl() {
  return window.location.href
}

function getMarkdownContent() {
  const el = getContentEl()
  if (!el) return ''
  const title = getPageTitle()
  const url = getPageUrl()
  return `# ${title}\nSource: ${url}\n\n${el.innerText}`
}

async function copyMarkdown() {
  await navigator.clipboard.writeText(getMarkdownContent())
  notify('Copied as Markdown')
}

async function copyPlaintext() {
  const el = getContentEl()
  if (!el) return
  await navigator.clipboard.writeText(`${getPageTitle()}\nSource: ${getPageUrl()}\n\n${el.innerText}`)
  notify('Copied as Plain Text')
}

function notify(msg) {
  toast.value = msg
  showMenu.value = false
  setTimeout(() => { toast.value = '' }, 2000)
}

function toggle() {
  showMenu.value = !showMenu.value
}

function hide() {
  closeTimer = setTimeout(() => { showMenu.value = false }, 200)
}

function cancelHide() {
  clearTimeout(closeTimer)
}

const isHome = ref(false)
import { computed } from 'vue'
const isDocPage = computed(() => {
  return route.path !== '/' && route.path !== '/index.html' && route.path !== '/contribute/'
})
</script>

<template>
  <div v-if="isDocPage" class="cpb" @mouseleave="hide" @mouseenter="cancelHide">
    <button class="cpb-btn" @click="toggle" title="Copy page content">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      <span>Copy page</span>
      <svg class="cpb-caret" :class="{ 'cpb-caret--open': showMenu }" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
    </button>
    <Transition name="cpb-menu">
      <div v-if="showMenu" class="cpb-menu">
        <button class="cpb-opt" @click="copyMarkdown">Markdown</button>
        <button class="cpb-opt" @click="copyPlaintext">Plain text</button>
      </div>
    </Transition>
    <Transition name="cpb-toast">
      <span v-if="toast" class="cpb-toast">{{ toast }}</span>
    </Transition>
  </div>
</template>

<style scoped>
.cpb {
  position: relative;
  float: right;
  margin: 0 0 16px 16px;
  z-index: 10;
}

.cpb-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color .2s, color .2s;
}

.cpb-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.cpb-caret {
  opacity: .5;
  transition: transform .15s;
}
.cpb-caret--open { transform: rotate(180deg); }

.cpb-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,.08);
  overflow: hidden;
  min-width: 140px;
}

:global(.dark) .cpb-menu {
  box-shadow: 0 4px 16px rgba(0,0,0,.3);
}

.cpb-opt {
  display: block;
  width: 100%;
  padding: 8px 14px;
  border: none;
  background: none;
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: background .15s;
}

.cpb-opt:hover {
  background: var(--vp-c-bg-soft);
}

.cpb-opt + .cpb-opt {
  border-top: 1px solid var(--vp-c-divider);
}

.cpb-toast {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  padding: 6px 14px;
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.cpb-menu-enter-active, .cpb-menu-leave-active { transition: opacity .15s, transform .15s; }
.cpb-menu-enter-from { opacity: 0; transform: translateY(-4px); }
.cpb-menu-leave-to { opacity: 0; }
.cpb-toast-enter-active, .cpb-toast-leave-active { transition: opacity .2s; }
.cpb-toast-enter-from, .cpb-toast-leave-to { opacity: 0; }
</style>
