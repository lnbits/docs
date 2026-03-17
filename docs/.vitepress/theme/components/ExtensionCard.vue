<script setup>
import extensionMeta from '../../data/extensions-meta.json'

const props = defineProps({
  id: { type: String, default: '' },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, default: '' },
  icon: { type: String, default: '🔌' },
  link: { type: String, default: '' },
})

const tileUrl = props.id && extensionMeta[props.id]?.tileUrl || null
</script>

<template>
  <a :href="link" class="ext-card">
    <div class="ext-card-icon">
      <img v-if="tileUrl" :src="tileUrl" :alt="name" class="ext-card-tile" />
      <span v-else>{{ icon }}</span>
    </div>
    <div class="ext-card-body">
      <h3 class="ext-card-title">{{ name }}</h3>
      <span v-if="category" class="ext-card-category">{{ category }}</span>
      <p class="ext-card-desc">{{ description }}</p>
    </div>
  </a>
</template>

<style scoped>
.ext-card {
  display: flex;
  gap: 12px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}

.ext-card:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.dark .ext-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.ext-card-icon {
  font-size: 28px;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ext-card-tile {
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 8px;
}

.ext-card-body {
  min-width: 0;
}

.ext-card-title {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
}

.ext-card-category {
  display: inline-block;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
}

.ext-card-desc {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
