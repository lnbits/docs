<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()

const platforms = [
  {
    group: 'One-Click Node Platforms',
    desc: 'Install LNbits with one click on your Bitcoin node. Auto-connects to your Lightning backend.',
    items: [
      {
        name: 'Umbrel',
        desc: 'App Store install',
        url: '/guide/installation/node-platforms#umbrel',
        dark: '/logos/backends/umbrel.png',
        light: '/logos/backends/umbrell.png',
        difficulty: 'Easy',
        features: 'Full',
      },
      {
        name: 'Start9',
        desc: 'Marketplace install',
        url: '/guide/installation/node-platforms#start9',
        dark: '/logos/backends/start9.png',
        light: '/logos/backends/start9l.png',
        difficulty: 'Easy',
        features: 'Full',
      },
      {
        name: 'RaspiBlitz',
        desc: 'Services menu',
        url: '/guide/installation/node-platforms#raspiblitz',
        dark: '/logos/backends/blitz.png',
        light: '/logos/backends/blitzl.png',
        difficulty: 'Easy',
        features: 'Full',
      },
      {
        name: 'myNode',
        desc: 'Premium feature',
        url: '/guide/installation/node-platforms#mynode',
        dark: '/logos/backends/mynode.png',
        light: '/logos/backends/mynodel.png',
        difficulty: 'Easy',
        features: 'Full',
        badge: 'Premium',
      },
      {
        name: 'Citadel',
        desc: 'App Store install',
        url: '/guide/installation/node-platforms#citadel',
        dark: '/logos/backends/citadel-dark.svg',
        light: '/logos/backends/citadel-light.svg',
        difficulty: 'Easy',
        features: 'Full',
      },
    ],
  },
  {
    group: 'Cloud & Hosted',
    desc: 'No hardware needed. Get LNbits running in minutes with a hosted solution.',
    items: [
      {
        name: 'LNbits SaaS',
        desc: 'Official hosted solution',
        url: '/guide/installation/saas',
        icon: '/logos/lnbits.svg',
        difficulty: 'Easiest',
        features: 'Full',
        badge: 'Fastest',
      },
      {
        name: 'Voltage',
        desc: 'Cloud dashboard',
        url: 'https://voltage.cloud',
        external: true,
        dark: '/logos/backends/voltage.png',
        light: '/logos/backends/voltagel.png',
        difficulty: 'Easy',
        features: 'Full',
      },
    ],
  },
  {
    group: 'Self-Hosted',
    desc: 'Full sovereignty. Run LNbits on your own server or VPS.',
    items: [
      {
        name: 'Docker',
        desc: 'Recommended for production',
        url: '/guide/installation/docker',
        icon: '/logos/backends/docker.svg',
        difficulty: 'Moderate',
        features: 'Full',
        badge: 'Production',
      },
      {
        name: 'uv',
        desc: 'Fastest Python install',
        url: '/guide/installation/uv',
        icon: '/logos/backends/python.svg',
        difficulty: 'Moderate',
        features: 'Full',
        badge: 'Dev',
      },
      {
        name: 'Poetry',
        desc: 'Traditional Python setup',
        url: '/guide/installation/poetry',
        icon: '/logos/backends/poetry.svg',
        difficulty: 'Moderate',
        features: 'Full',
      },
      {
        name: 'Nix',
        desc: 'Reproducible builds',
        url: '/guide/installation/nix',
        icon: '/logos/backends/nixos.svg',
        difficulty: 'Advanced',
        features: 'Full',
      },
      {
        name: 'AppImage',
        desc: 'Desktop app',
        url: '/guide/installation/appimage',
        icon: '/logos/backends/appimage.svg',
        difficulty: 'Easy',
        features: 'Full',
      },
      {
        name: 'Fly.io',
        desc: 'Cloud deployment',
        url: '/guide/installation/flyio',
        icon: '/logos/backends/flyio.svg',
        difficulty: 'Moderate',
        features: 'Full',
      },
    ],
  },
]

function logoSrc(item) {
  if (item.icon) return item.icon
  if (!item.dark && !item.light) return null
  return isDark.value ? item.dark : item.light
}
</script>

<template>
  <div class="dg">
    <div v-for="group in platforms" :key="group.group" class="dg-group">
      <h3 class="dg-group-title">{{ group.group }}</h3>
      <p class="dg-group-desc">{{ group.desc }}</p>
      <div class="dg-cards">
        <a
          v-for="item in group.items"
          :key="item.name"
          :href="item.url"
          :target="item.external ? '_blank' : undefined"
          :rel="item.external ? 'noopener' : undefined"
          class="dg-card"
        >
          <div class="dg-card-logo">
            <img v-if="logoSrc(item)" :src="logoSrc(item)" :alt="item.name" />
            <span v-else class="dg-card-icon">{{ item.name.charAt(0) }}</span>
          </div>
          <div class="dg-card-body">
            <span class="dg-card-name">
              {{ item.name }}
              <span v-if="item.badge" class="dg-badge">{{ item.badge }}</span>
              <span v-if="item.external" class="dg-external" aria-label="External link">&#x2197;</span>
            </span>
            <span class="dg-card-desc">{{ item.desc }}</span>
          </div>
          <span class="dg-card-diff" :class="'dg-diff--' + item.difficulty.toLowerCase()">{{ item.difficulty }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dg {
  margin: 24px 0;
}

.dg-group {
  margin-bottom: 32px;
}

.dg-group-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 4px;
  color: var(--vp-c-text-1);
  border: none;
  padding: 0;
}

.dg-group-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin: 0 0 14px;
}

.dg-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 10px;
}

.dg-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.dg-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transform: translateY(-1px);
}

.dark .dg-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.dg-card-logo {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dg-card-logo img {
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 6px;
}

.dg-card-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 700;
  font-size: 16px;
}

.dg-card-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.dg-card-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 6px;
}

.dg-card-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.dg-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 8px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  letter-spacing: 0.3px;
}

.dg-external {
  font-size: 11px;
  opacity: 0.4;
}

.dg-card-diff {
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 8px;
  letter-spacing: 0.3px;
}

.dg-diff--easiest {
  background: rgba(40, 200, 64, 0.1);
  color: #28c840;
}

.dg-diff--easy {
  background: rgba(40, 200, 64, 0.08);
  color: #2d9e3f;
}

.dark .dg-diff--easiest,
.dark .dg-diff--easy {
  background: rgba(40, 200, 64, 0.12);
  color: #5bd66a;
}

.dg-diff--moderate {
  background: rgba(249, 168, 37, 0.1);
  color: #c88a1e;
}

.dark .dg-diff--moderate {
  background: rgba(249, 168, 37, 0.12);
  color: #f9c84a;
}

.dg-diff--advanced {
  background: rgba(149, 117, 205, 0.1);
  color: #7c4dcc;
}

.dark .dg-diff--advanced {
  background: rgba(149, 117, 205, 0.12);
  color: #b39ddb;
}

@media (max-width: 640px) {
  .dg-cards {
    grid-template-columns: 1fr;
  }
}
</style>
