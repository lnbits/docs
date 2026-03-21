<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const sections = [
  { text: 'Guide', link: '/guide/', match: '/guide' },
  { text: 'API', link: '/api/', match: '/api' },
  { text: 'Extensions', link: '/extensions/', match: '/extensions' },
  { text: 'Developers', link: '/dev/', match: '/dev' },
  { text: 'Contribute', link: '/contribute/', match: '/contribute' },
  { text: 'LLM', link: '/llm/', match: '/llm' },
]

const activeSection = computed(() => {
  for (const s of sections) {
    if (route.path.startsWith(s.match)) return s.match
  }
  return null
})

const isIndex = computed(() => route.path === '/' || route.path === '/index.html')
</script>

<template>
  <nav v-if="!isIndex" class="st" aria-label="Section navigation">
    <a
      v-for="s in sections"
      :key="s.link"
      :href="s.link"
      class="st-tab"
      :class="{ 'st-tab--on': activeSection === s.match }"
      :aria-current="activeSection === s.match ? 'true' : undefined"
    >{{ s.text }}</a>
  </nav>
</template>

<style scoped>
.st {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 0 0 20px;
  margin: 0 0 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.st-tab {
  padding: 4px 10px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-decoration: none;
  border-radius: 6px;
  transition: color .2s, background .2s;
}

.st-tab:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.st-tab--on {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  background: var(--vp-c-bg-soft);
}
</style>
