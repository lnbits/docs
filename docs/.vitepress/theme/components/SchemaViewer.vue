<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  schema: { type: Object, required: true },
  title: { type: String, default: 'Schema' },
})

const expanded = ref(false)

const properties = computed(() => {
  if (!props.schema || !props.schema.properties) return []
  return Object.entries(props.schema.properties).map(([name, def]) => ({
    name,
    type: def.type || 'any',
    description: def.description || '',
    required: (props.schema.required || []).includes(name),
    default: def.default,
    example: def.example,
  }))
})
</script>

<template>
  <div class="schema">
    <div class="schema-header" @click="expanded = !expanded">
      <span class="schema-toggle">{{ expanded ? '▾' : '▸' }}</span>
      <span class="schema-title">{{ title }}</span>
      <span class="schema-count">{{ properties.length }} fields</span>
    </div>
    <div v-if="expanded" class="schema-body">
      <div v-for="prop in properties" :key="prop.name" class="schema-prop">
        <div class="schema-prop-header">
          <code class="schema-prop-name">{{ prop.name }}</code>
          <span class="schema-prop-type">{{ prop.type }}</span>
          <span v-if="prop.required" class="schema-prop-required">required</span>
        </div>
        <p v-if="prop.description" class="schema-prop-desc">{{ prop.description }}</p>
        <p v-if="prop.example !== undefined" class="schema-prop-example">
          Example: <code>{{ JSON.stringify(prop.example) }}</code>
        </p>
        <p v-if="prop.default !== undefined" class="schema-prop-default">
          Default: <code>{{ JSON.stringify(prop.default) }}</code>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.schema {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 8px 0;
}

.schema-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  cursor: pointer;
}

.schema-header:hover {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.schema-toggle {
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.schema-title {
  font-weight: 600;
  font-size: 14px;
}

.schema-count {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.schema-body {
  border-top: 1px solid var(--vp-c-divider);
  padding: 8px 14px;
}

.schema-prop {
  padding: 8px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.schema-prop:last-child {
  border-bottom: none;
}

.schema-prop-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.schema-prop-name {
  font-size: 13px;
  font-weight: 600;
  background: none;
}

.schema-prop-type {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.schema-prop-required {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(239, 83, 80, 0.1);
  color: #ef5350;
}

.schema-prop-desc {
  margin: 4px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.schema-prop-example,
.schema-prop-default {
  margin: 2px 0 0;
  font-size: 12px;
  color: var(--vp-c-text-3);
}
</style>
