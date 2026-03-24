<script setup>
const props = defineProps({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  repo: { type: String, default: '' },
  link: { type: String, default: '' },
  status: { type: String, default: 'available' },
  official: { type: Boolean, default: false },
})

const owner = props.repo ? props.repo.split('/')[0] : ''
const repoUrl = props.repo ? `https://github.com/${props.repo}` : ''
const avatarUrl = owner ? `https://github.com/${owner}.png?size=80` : ''
const starsUrl = props.repo
  ? `https://img.shields.io/github/stars/${props.repo}?style=flat&label=stars&color=8b5cf6&labelColor=1f2234`
  : ''
const updatedUrl = props.repo
  ? `https://img.shields.io/github/last-commit/${props.repo}?style=flat&label=updated&color=3b82f6&labelColor=1f2234`
  : ''
</script>

<template>
  <div class="sk" :class="{ 'sk--official': official, 'sk--planned': status === 'planned' }">
    <div class="sk-top">
      <div class="sk-icon">
        <img v-if="avatarUrl" :src="avatarUrl" :alt="owner" class="sk-avatar" loading="lazy" />
        <span v-else class="sk-icon-fallback">🧩</span>
      </div>
      <div class="sk-info">
        <div class="sk-title-row">
          <component :is="link ? 'a' : 'span'" :href="link || undefined" class="sk-name">{{ name }}</component>
          <span v-if="official" class="sk-badge sk-badge--official">Official</span>
          <span v-else class="sk-badge sk-badge--community">Community</span>
          <span v-if="status === 'planned'" class="sk-badge sk-badge--planned">Planned</span>
        </div>
        <p class="sk-desc">{{ description }}</p>
      </div>
    </div>
    <div v-if="repo && status !== 'planned'" class="sk-meta">
      <a :href="repoUrl" target="_blank" rel="noopener noreferrer" class="sk-meta-link">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
        <span>{{ owner }}/{{ repo.split('/').pop() }}</span>
      </a>
      <img v-if="starsUrl" :src="starsUrl" alt="Stars" class="sk-shield" loading="lazy" />
      <img v-if="updatedUrl" :src="updatedUrl" alt="Last updated" class="sk-shield" loading="lazy" />
    </div>
    <div v-if="repo && status !== 'planned'" class="sk-author">
      <img :src="avatarUrl" :alt="owner" class="sk-author-avatar" loading="lazy" />
      <span class="sk-author-name">{{ owner }}</span>
    </div>
  </div>
</template>

<style scoped>
.sk {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  background: var(--vp-c-bg-alt);
  transition: border-color .2s;
}
.sk:hover { border-color: var(--vp-c-brand-soft); }
.sk--planned { opacity: .6; }

.sk-top { display: flex; gap: 14px; align-items: flex-start; }

.sk-icon { flex-shrink: 0; }
.sk-avatar {
  width: 40px; height: 40px; border-radius: 10px; object-fit: cover;
  border: 1px solid var(--vp-c-divider);
}
.sk-icon-fallback { font-size: 32px; line-height: 1; }

.sk-info { flex: 1; min-width: 0; }

.sk-title-row {
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
  margin-bottom: 4px;
}
.sk-name {
  font-size: 16px; font-weight: 700; color: var(--vp-c-text-1);
  text-decoration: none;
}
a.sk-name:hover { color: var(--vp-c-brand-1); }

.sk-badge {
  font-size: 11px; font-weight: 600; padding: 2px 8px;
  border-radius: 10px; line-height: 1.4;
}
.sk-badge--official {
  background: rgba(124, 58, 237, .1); color: #7c3aed;
}
.dark .sk-badge--official {
  background: rgba(167, 139, 250, .15); color: #a78bfa;
}
.sk-badge--community {
  background: rgba(59, 130, 246, .1); color: #3b82f6;
}
.dark .sk-badge--community {
  background: rgba(96, 165, 250, .15); color: #60a5fa;
}
.sk-badge--planned {
  background: var(--vp-c-bg-soft); color: var(--vp-c-text-3);
}

.sk-desc {
  font-size: 14px; color: var(--vp-c-text-2); line-height: 1.5;
  margin: 0;
}

.sk-meta {
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  margin-top: 14px; padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
}

.sk-meta-link {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 12px; font-weight: 500; color: var(--vp-c-text-2);
  text-decoration: none;
}
.sk-meta-link:hover { color: var(--vp-c-brand-1); }

.sk-shield { height: 18px; display: block; }

.sk-author {
  display: flex; align-items: center; gap: 8px;
  margin-top: 10px;
}
.sk-author-avatar {
  width: 20px; height: 20px; border-radius: 50%; object-fit: cover;
  border: 1px solid var(--vp-c-divider);
}
.sk-author-name {
  font-size: 12px; color: var(--vp-c-text-3); font-weight: 500;
}

@media (max-width: 640px) {
  .sk { padding: 16px; }
  .sk-avatar { width: 32px; height: 32px; }
  .sk-name { font-size: 15px; }
  .sk-meta { gap: 8px; }
}
</style>
