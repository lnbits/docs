<script setup>
import extensionMeta from '../../data/extensions-meta.json'

const props = defineProps({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, default: '' },
  icon: { type: String, default: '🔌' },
  repo: { type: String, default: '' },
  features: { type: Array, default: () => [] },
  worksWell: { type: Array, default: () => [] },
})

const repoUrl = props.repo ? `https://github.com/${props.repo}` : ''
const starsImg = props.repo
  ? `https://img.shields.io/github/stars/${props.repo}?style=flat&color=8b5cf6&labelColor=1f2234`
  : ''

// Extract extension id from repo (e.g. "lnbits/tpos" → "tpos")
const extId = props.repo ? props.repo.split('/').pop().replace('_extension', '') : ''
const tileUrl = extId && extensionMeta[extId]?.tileUrl || null
</script>

<template>
  <div class="ext-header">
    <div class="ext-header-top">
      <div class="ext-header-icon">
        <img v-if="tileUrl" :src="tileUrl" :alt="name" class="ext-header-tile" />
        <span v-else>{{ icon }}</span>
      </div>
      <div class="ext-header-info">
        <div class="ext-header-title-row">
          <h1 class="ext-header-name">{{ name }}</h1>
          <a v-if="repoUrl" :href="repoUrl" target="_blank" rel="noopener noreferrer" class="ext-header-stars">
            <img :src="starsImg" alt="GitHub stars" />
          </a>
        </div>
        <p class="ext-header-desc">{{ description }}</p>
        <div class="ext-header-meta">
          <span class="ext-header-badge">{{ category }}</span>
          <span class="ext-header-badge ext-header-badge--open-source">Open Source</span>
        </div>
      </div>
    </div>

    <div class="ext-header-actions">
      <a v-if="repoUrl" :href="repoUrl" target="_blank" rel="noopener noreferrer" class="ext-action ext-action--primary">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
        Source
      </a>
      <a href="./api" class="ext-action">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        API Docs
      </a>
    </div>

    <div v-if="features.length" class="ext-header-features">
      <span v-for="f in features" :key="f" class="ext-feature-tag">{{ f }}</span>
    </div>

    <div v-if="worksWell.length" class="ext-header-works">
      <span class="ext-works-label">Works with</span>
      <a v-for="w in worksWell" :key="w.id" :href="`/extensions/${w.id}/`" class="ext-works-link">
        {{ w.icon }} {{ w.name }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.ext-header {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  background: var(--vp-c-bg-alt);
}

.ext-header-top {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.ext-header-icon {
  font-size: 48px;
  line-height: 1;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ext-header-tile {
  width: 56px;
  height: 56px;
  object-fit: contain;
  border-radius: 12px;
}

.ext-header-info {
  min-width: 0;
  flex: 1;
}

.ext-header-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.ext-header-name {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
}

.ext-header-stars img {
  display: block;
  height: 20px;
}

.ext-header-desc {
  margin: 8px 0 12px;
  font-size: 15px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.ext-header-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.ext-header-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.ext-header-badge--open-source {
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
}

.dark .ext-header-badge--open-source {
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
}

.ext-header-actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.ext-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  transition: border-color 0.15s, background 0.15s;
}

.ext-action:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.ext-action--primary {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-soft);
}

.ext-header-features {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.ext-feature-tag {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 12px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.ext-header-works {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.ext-works-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-right: 4px;
}

.ext-works-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 8px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  transition: background 0.15s;
}

.ext-works-link:hover {
  background: var(--vp-c-brand-soft);
}

@media (max-width: 640px) {
  .ext-header-top {
    flex-direction: column;
    gap: 12px;
  }

  .ext-header-icon {
    font-size: 40px;
  }

  .ext-header-tile {
    width: 44px;
    height: 44px;
  }

  .ext-header-name {
    font-size: 24px;
  }
}
</style>
