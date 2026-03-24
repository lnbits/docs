<script setup>
const props = defineProps({
  repo: { type: String, required: true },
  official: { type: Boolean, default: false },
  source: { type: String, default: '' },
})

const owner = props.repo.split('/')[0]
const repoName = props.repo.split('/').pop()
const repoUrl = `https://github.com/${props.repo}`
const avatarUrl = `https://github.com/${owner}.png?size=64`
const starsUrl = `https://img.shields.io/github/stars/${props.repo}?style=flat&label=stars&color=8b5cf6&labelColor=1f2234`
const updatedUrl = `https://img.shields.io/github/last-commit/${props.repo}?style=flat&label=updated&color=3b82f6&labelColor=1f2234`
</script>

<template>
  <div class="skh">
    <div class="skh-left">
      <img :src="avatarUrl" :alt="owner" class="skh-avatar" loading="lazy" />
      <div class="skh-info">
        <div class="skh-row">
          <a :href="repoUrl" target="_blank" rel="noopener noreferrer" class="skh-repo">{{ owner }}/{{ repoName }}</a>
          <span v-if="official" class="skh-badge skh-badge--official">Official</span>
          <span v-else class="skh-badge skh-badge--community">Community</span>
        </div>
        <div class="skh-shields">
          <a :href="repoUrl" target="_blank" rel="noopener noreferrer">
            <img :src="starsUrl" alt="Stars" class="skh-shield" loading="lazy" />
          </a>
          <a :href="`${repoUrl}/commits`" target="_blank" rel="noopener noreferrer">
            <img :src="updatedUrl" alt="Last updated" class="skh-shield" loading="lazy" />
          </a>
        </div>
      </div>
    </div>
    <a :href="source || repoUrl" target="_blank" rel="noopener noreferrer" class="skh-btn">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
      Source
    </a>
  </div>
</template>

<style scoped>
.skh {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 14px 18px; margin-bottom: 24px;
  border: 1px solid var(--vp-c-divider); border-radius: 10px;
  background: var(--vp-c-bg-alt);
}
.skh-left { display: flex; align-items: center; gap: 12px; min-width: 0; }
.skh-avatar {
  width: 36px; height: 36px; border-radius: 8px; object-fit: cover;
  border: 1px solid var(--vp-c-divider); flex-shrink: 0;
}
.skh-info { min-width: 0; }
.skh-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.skh-repo {
  font-size: 13px; font-weight: 600; color: var(--vp-c-text-1);
  text-decoration: none; white-space: nowrap;
}
.skh-repo:hover { color: var(--vp-c-brand-1); }
.skh-badge {
  font-size: 10px; font-weight: 700; padding: 1px 7px;
  border-radius: 8px; line-height: 1.5; text-transform: uppercase; letter-spacing: .3px;
}
.skh-badge--official { background: rgba(124, 58, 237, .1); color: #7c3aed; }
.dark .skh-badge--official { background: rgba(167, 139, 250, .15); color: #a78bfa; }
.skh-badge--community { background: rgba(59, 130, 246, .1); color: #3b82f6; }
.dark .skh-badge--community { background: rgba(96, 165, 250, .15); color: #60a5fa; }

.skh-shields { display: flex; gap: 8px; margin-top: 4px; }
.skh-shields a { display: flex; line-height: 0; }
.skh-shield { height: 18px; display: block; }

.skh-btn {
  display: inline-flex; align-items: center; gap: 5px; flex-shrink: 0;
  padding: 6px 14px; font-size: 12px; font-weight: 600;
  color: var(--vp-c-text-1); background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); border-radius: 7px;
  text-decoration: none; transition: border-color .15s;
}
.skh-btn:hover { border-color: var(--vp-c-brand-1); }

@media (max-width: 640px) {
  .skh { flex-direction: column; align-items: flex-start; gap: 12px; }
  .skh-avatar { width: 28px; height: 28px; }
  .skh-repo { font-size: 12px; }
}
</style>
