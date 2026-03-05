<script setup>
import { ref } from 'vue'

const props = defineProps({
  method: { type: String, required: true },
  path: { type: String, required: true },
  summary: { type: String, default: '' },
  auth: { type: String, default: 'API Key' },
  deprecated: { type: Boolean, default: false },
})

const expanded = ref(false)

const methodColors = {
  GET: '#4caf50',
  POST: '#2196f3',
  PUT: '#ff9800',
  DELETE: '#ef5350',
  PATCH: '#9c27b0',
}

const color = methodColors[props.method.toUpperCase()] || '#666'
</script>

<template>
  <div class="endpoint" :class="{ deprecated }" @click="expanded = !expanded">
    <div class="endpoint-header">
      <span class="endpoint-method" :style="{ background: color }">
        {{ method.toUpperCase() }}
      </span>
      <code class="endpoint-path">{{ path }}</code>
      <span v-if="auth" class="endpoint-auth">{{ auth }}</span>
      <span v-if="deprecated" class="endpoint-deprecated">Deprecated</span>
      <span class="endpoint-toggle">{{ expanded ? '▾' : '▸' }}</span>
    </div>
    <p v-if="summary" class="endpoint-summary">{{ summary }}</p>
    <div v-if="expanded" class="endpoint-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.endpoint {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 8px 0;
  cursor: pointer;
  transition: border-color 0.15s;
}

.endpoint:hover {
  border-color: var(--vp-c-brand-1);
}

.endpoint.deprecated {
  opacity: 0.6;
}

.endpoint-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
}

.endpoint-method {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  font-family: var(--vp-font-family-mono);
  flex-shrink: 0;
}

.endpoint-path {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  flex: 1;
  background: none;
}

.endpoint-auth {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.endpoint-deprecated {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(239, 83, 80, 0.1);
  color: #ef5350;
}

.endpoint-toggle {
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.endpoint-summary {
  margin: 0;
  padding: 0 14px 10px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.endpoint-body {
  padding: 0 14px 14px;
  border-top: 1px solid var(--vp-c-divider);
  cursor: default;
}
</style>
