<script setup>
import { ref, computed } from 'vue'
import ExtensionCard from './ExtensionCard.vue'
import { EXTENSIONS as ALL_EXTENSIONS } from '../../data/extensions.js'

const props = defineProps({
  extensions: { type: Array, default: null },
})

// Use provided extensions or fall back to the shared data file
const extensionList = computed(() => {
  if (props.extensions && props.extensions.length) return props.extensions
  return ALL_EXTENSIONS.map(ext => ({
    ...ext,
    link: `/extensions/${ext.id}/`,
  }))
})

const search = ref('')
const activeCategory = ref('All')

const categories = computed(() => {
  const cats = new Set(extensionList.value.map((e) => e.category).filter(Boolean))
  return ['All', ...Array.from(cats).sort()]
})

const filtered = computed(() => {
  let list = extensionList.value
  if (activeCategory.value !== 'All') {
    list = list.filter((e) => e.category === activeCategory.value)
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
    )
  }
  return list
})
</script>

<template>
  <div class="ext-grid-controls">
    <input
      v-model="search"
      type="text"
      placeholder="Search extensions..."
      class="ext-grid-search"
    />
    <div class="ext-grid-tabs">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="['ext-grid-tab', { active: activeCategory === cat }]"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </button>
    </div>
  </div>
  <div class="ext-grid">
    <ExtensionCard
      v-for="ext in filtered"
      :key="ext.name"
      v-bind="ext"
    />
  </div>
  <p v-if="filtered.length === 0" class="ext-grid-empty">
    No extensions match your search.
  </p>
</template>

<style scoped>
.ext-grid-controls {
  margin-bottom: 20px;
}

.ext-grid-search {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  outline: none;
  margin-bottom: 12px;
}

.ext-grid-search:focus {
  border-color: var(--vp-c-brand-1);
}

.ext-grid-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.ext-grid-tab {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.ext-grid-tab:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.ext-grid-tab.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.ext-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

.ext-grid-empty {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 40px 0;
}
</style>
