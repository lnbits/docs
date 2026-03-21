<script setup>
function openChat() {
  window.dispatchEvent(new CustomEvent('open-doc-chat'))
}
</script>

<template>
  <button class="nav-ai" @click="openChat" title="Ask AI about LNbits" aria-label="Open AI chat">
    <svg class="nav-ai-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
    <span class="nav-ai-label">Ask AI</span>
  </button>
</template>

<style scoped>
.nav-ai {
  display: none;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 12px 0 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
  order: 1;
  margin-right: auto;
  transition: color .2s, border-color .2s, background .2s;
}

@media (min-width: 768px) { .nav-ai { display: flex; } }

.nav-ai:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.nav-ai-ico { width: 16px; height: 16px; flex-shrink: 0; }
.nav-ai-label { font-size: 13px; font-weight: 500; }
</style>
