<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const activeType = ref('All')

const sources = [
  { name: 'LND (REST)', type: 'Local Node', protocol: 'REST', createInvoice: true, payInvoice: true, holdInvoice: true, nodeManagement: true, envClass: 'LndRestWallet' },
  { name: 'LND (gRPC)', type: 'Local Node', protocol: 'gRPC', createInvoice: true, payInvoice: true, holdInvoice: true, nodeManagement: true, envClass: 'LndWallet' },
  { name: 'CLNRest', type: 'Local Node', protocol: 'REST', createInvoice: true, payInvoice: true, holdInvoice: false, nodeManagement: true, envClass: 'CoreLightningRestWallet' },
  { name: 'CLN (RPC)', type: 'Local Node', protocol: 'RPC', createInvoice: true, payInvoice: true, holdInvoice: false, nodeManagement: true, envClass: 'CoreLightningWallet' },
  { name: 'Eclair', type: 'Local Node', protocol: 'REST', createInvoice: true, payInvoice: true, holdInvoice: false, nodeManagement: false, envClass: 'EclairWallet' },
  { name: 'Phoenixd', type: 'Local Node', protocol: 'REST', createInvoice: true, payInvoice: true, holdInvoice: false, nodeManagement: false, envClass: 'PhoenixdWallet' },
  { name: 'OpenNode', type: 'Service', protocol: 'REST', createInvoice: true, payInvoice: true, holdInvoice: false, nodeManagement: false, envClass: 'OpenNodeWallet' },
  { name: 'Alby', type: 'Service', protocol: 'REST', createInvoice: true, payInvoice: true, holdInvoice: false, nodeManagement: false, envClass: 'AlbyWallet' },
  { name: 'Strike', type: 'Service', protocol: 'REST', createInvoice: true, payInvoice: true, holdInvoice: false, nodeManagement: false, envClass: 'StrikeWallet' },
  { name: 'Blink', type: 'Service', protocol: 'GraphQL', createInvoice: true, payInvoice: true, holdInvoice: false, nodeManagement: false, envClass: 'BlinkWallet' },
  { name: 'ZBD', type: 'Service', protocol: 'REST', createInvoice: true, payInvoice: true, holdInvoice: false, nodeManagement: false, envClass: 'ZBDWallet' },
  { name: 'NWC', type: 'Advanced', protocol: 'Nostr', createInvoice: true, payInvoice: true, holdInvoice: false, nodeManagement: false, envClass: 'NWCWallet' },
  { name: 'Breez SDK', type: 'Advanced', protocol: 'SDK', createInvoice: true, payInvoice: true, holdInvoice: false, nodeManagement: false, envClass: 'BreezSdkWallet' },
  { name: 'Boltz', type: 'Advanced', protocol: 'REST', createInvoice: true, payInvoice: true, holdInvoice: false, nodeManagement: false, envClass: 'BoltzWallet' },
  { name: 'FakeWallet', type: 'Testing', protocol: '-', createInvoice: true, payInvoice: true, holdInvoice: false, nodeManagement: false, envClass: 'FakeWallet' },
  { name: 'VoidWallet', type: 'Testing', protocol: '-', createInvoice: true, payInvoice: false, holdInvoice: false, nodeManagement: false, envClass: 'VoidWallet' },
]

const types = computed(() => {
  const t = new Set(sources.map((s) => s.type))
  return ['All', ...Array.from(t)]
})

const filtered = computed(() => {
  let list = sources
  if (activeType.value !== 'All') {
    list = list.filter((s) => s.type === activeType.value)
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter((s) => s.name.toLowerCase().includes(q) || s.envClass.toLowerCase().includes(q))
  }
  return list
})
</script>

<template>
  <div class="fs-controls">
    <input
      v-model="search"
      type="text"
      placeholder="Search backends..."
      class="fs-search"
    />
    <div class="fs-tabs">
      <button
        v-for="t in types"
        :key="t"
        :class="['fs-tab', { active: activeType === t }]"
        @click="activeType = t"
      >
        {{ t }}
      </button>
    </div>
  </div>
  <div class="fs-table-wrap">
    <table class="fs-table">
      <thead>
        <tr>
          <th>Backend</th>
          <th>Type</th>
          <th>Protocol</th>
          <th>Invoice</th>
          <th>Pay</th>
          <th>Hold</th>
          <th>Node Mgmt</th>
          <th>Env Class</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in filtered" :key="s.name">
          <td><strong>{{ s.name }}</strong></td>
          <td>{{ s.type }}</td>
          <td>{{ s.protocol }}</td>
          <td>{{ s.createInvoice ? '✓' : '-' }}</td>
          <td>{{ s.payInvoice ? '✓' : '-' }}</td>
          <td>{{ s.holdInvoice ? '✓' : '-' }}</td>
          <td>{{ s.nodeManagement ? '✓' : '-' }}</td>
          <td><code>{{ s.envClass }}</code></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.fs-controls {
  margin-bottom: 16px;
}

.fs-search {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  margin-bottom: 10px;
}

.fs-search:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.fs-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.fs-tab {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
}

.fs-tab:hover {
  border-color: var(--vp-c-brand-1);
}

.fs-tab.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.fs-table-wrap {
  overflow-x: auto;
}

.fs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.fs-table th,
.fs-table td {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
}

.fs-table th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.fs-table tbody tr:hover {
  background: var(--vp-c-bg-soft);
}

.fs-table code {
  font-size: 12px;
  background: none;
}
</style>
