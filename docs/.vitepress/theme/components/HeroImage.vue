<script setup>
defineProps({
  type: { type: String, required: true }
})
</script>

<template>
  <div class="hero-img">

    <!-- ═══ Guide: LNbits dashboard sketch ═══ -->
    <svg v-if="type === 'guide'" viewBox="0 0 800 160" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <!-- App window frame -->
      <rect x="120" y="8" width="560" height="144" rx="10" stroke="var(--vp-c-brand-1)" stroke-width="1.8" opacity=".3" fill="var(--vp-c-brand-1)" fill-opacity=".015"/>
      <!-- Title bar -->
      <rect x="120" y="8" width="560" height="26" rx="10" fill="var(--vp-c-brand-1)" fill-opacity=".04"/>
      <rect x="120" y="24" width="560" height="10" fill="var(--vp-c-brand-1)" fill-opacity=".04"/>
      <circle cx="138" cy="21" r="4" fill="#ff5f57" opacity=".45"/>
      <circle cx="152" cy="21" r="4" fill="#febc2e" opacity=".45"/>
      <circle cx="166" cy="21" r="4" fill="#28c840" opacity=".45"/>
      <!-- Tab bar -->
      <rect x="220" y="13" width="60" height="16" rx="4" fill="var(--vp-c-brand-1)" fill-opacity=".08"/>
      <rect x="228" y="19" width="32" height="3" rx="1.5" fill="var(--vp-c-brand-1)" opacity=".25"/>
      <rect x="290" y="19" width="28" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".12"/>
      <rect x="328" y="19" width="24" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".1"/>

      <!-- Left sidebar -->
      <rect x="120" y="34" width="120" height="118" fill="var(--vp-c-brand-1)" fill-opacity=".02"/>
      <line x1="240" y1="34" x2="240" y2="152" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".1"/>
      <!-- Sidebar items -->
      <rect x="134" y="46" width="16" height="16" rx="4" fill="var(--vp-c-brand-1)" opacity=".08"/>
      <path d="M138 52l4 3-4 3" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".3"/>
      <rect x="156" y="50" width="50" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".2"/>
      <rect x="156" y="56" width="35" height="2" rx="1" fill="var(--vp-c-text-2)" opacity=".1"/>

      <rect x="134" y="72" width="16" height="16" rx="4" fill="var(--vp-c-brand-1)" opacity=".06"/>
      <rect x="156" y="76" width="45" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".15"/>
      <rect x="156" y="82" width="60" height="2" rx="1" fill="var(--vp-c-text-2)" opacity=".08"/>

      <rect x="134" y="98" width="16" height="16" rx="4" fill="var(--vp-c-brand-1)" opacity=".05"/>
      <rect x="156" y="102" width="55" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".12"/>

      <rect x="134" y="124" width="16" height="16" rx="4" fill="var(--vp-c-brand-1)" opacity=".04"/>
      <rect x="156" y="128" width="40" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".1"/>

      <!-- Main content: wallet card -->
      <rect x="258" y="46" width="190" height="56" rx="10" stroke="var(--vp-c-brand-1)" stroke-width="1.3" opacity=".25" fill="var(--vp-c-brand-1)" fill-opacity=".025"/>
      <!-- Balance -->
      <rect x="274" y="56" width="40" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".15"/>
      <rect x="274" y="66" width="90" height="8" rx="3" fill="var(--vp-c-brand-1)" opacity=".15"/>
      <!-- Lightning bolt in wallet -->
      <path d="M430 56l-6 14h7l-6 16" stroke="var(--vp-c-brand-1)" stroke-width="2" opacity=".2"/>
      <!-- Action buttons -->
      <rect x="274" y="84" width="48" height="12" rx="6" fill="var(--vp-c-brand-1)" opacity=".1"/>
      <rect x="282" y="88" width="24" height="3" rx="1.5" fill="var(--vp-c-brand-1)" opacity=".3"/>
      <rect x="330" y="84" width="48" height="12" rx="6" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".12"/>
      <rect x="338" y="88" width="28" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".15"/>

      <!-- Extension tiles -->
      <rect x="258" y="112" width="56" height="36" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".18" fill="var(--vp-c-brand-1)" fill-opacity=".02"/>
      <circle cx="286" cy="124" r="6" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".2"/>
      <rect x="272" y="136" width="28" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".12"/>

      <rect x="322" y="112" width="56" height="36" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".15" fill="var(--vp-c-brand-1)" fill-opacity=".015"/>
      <rect x="340" y="120" width="12" height="12" rx="3" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".18"/>
      <rect x="336" y="136" width="28" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".1"/>

      <rect x="386" y="112" width="56" height="36" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".12"/>
      <path d="M408 122l6 4-6 4" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".15"/>
      <rect x="400" y="136" width="28" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".08"/>

      <!-- Right panel: activity/stats -->
      <rect x="466" y="46" width="200" height="102" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".12" fill="var(--vp-c-brand-1)" fill-opacity=".01"/>
      <rect x="482" y="56" width="60" height="4" rx="2" fill="var(--vp-c-brand-1)" opacity=".12"/>
      <!-- Mini chart -->
      <path d="M482 80 l20-8 l25 12 l20-4 l25 8 l20-14 l25 6 l20-3 l15 5" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".2" fill="none"/>
      <path d="M482 80 l20-8 l25 12 l20-4 l25 8 l20-14 l25 6 l20-3 l15 5 v26 h-170z" fill="var(--vp-c-brand-1)" opacity=".03"/>
      <!-- Stats row -->
      <rect x="482" y="104" width="30" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".1"/>
      <rect x="482" y="112" width="50" height="6" rx="2" fill="var(--vp-c-brand-1)" opacity=".08"/>
      <rect x="556" y="104" width="30" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".1"/>
      <rect x="556" y="112" width="40" height="6" rx="2" fill="var(--vp-c-brand-1)" opacity=".06"/>
      <rect x="620" y="104" width="30" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".08"/>
      <rect x="620" y="112" width="35" height="6" rx="2" fill="var(--vp-c-brand-1)" opacity=".05"/>

      <!-- Floating decorative elements outside the window -->
      <circle cx="80" cy="40" r="16" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".06"/>
      <circle cx="80" cy="40" r="8" stroke="var(--vp-c-brand-1)" stroke-width=".6" opacity=".04"/>
      <circle cx="730" cy="130" r="12" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".05"/>
      <path d="M56 120l-4 8h5l-4 10" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".08"/>
      <path d="M740 40l3-6h-4l3-6" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".06"/>
    </svg>

    <!-- ═══ API: request → server → response pipeline ═══ -->
    <svg v-if="type === 'api'" viewBox="0 0 800 160" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <!-- Request block (left) -->
      <rect x="40" y="20" width="180" height="120" rx="10" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".25" fill="var(--vp-c-brand-1)" fill-opacity=".02"/>
      <rect x="40" y="20" width="180" height="24" rx="10" fill="var(--vp-c-brand-1)" fill-opacity=".05"/>
      <rect x="40" y="36" width="180" height="8" fill="var(--vp-c-brand-1)" fill-opacity=".05"/>
      <circle cx="56" cy="32" r="3" fill="#ff5f57" opacity=".4"/>
      <circle cx="66" cy="32" r="3" fill="#febc2e" opacity=".4"/>
      <circle cx="76" cy="32" r="3" fill="#28c840" opacity=".4"/>
      <!-- Request content -->
      <text x="58" y="60" fill="var(--vp-c-brand-1)" font-size="9" font-family="monospace" font-weight="700" opacity=".5">POST</text>
      <rect x="90" y="54" width="110" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".25"/>
      <line x1="58" y1="68" x2="200" y2="68" stroke="var(--vp-c-brand-1)" stroke-width=".5" opacity=".1"/>
      <text x="58" y="82" fill="var(--vp-c-text-2)" font-size="8" font-family="monospace" opacity=".25">{</text>
      <rect x="68" y="88" width="80" height="2.5" rx="1" fill="var(--vp-c-brand-1)" opacity=".15"/>
      <rect x="68" y="96" width="60" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".12"/>
      <rect x="68" y="104" width="90" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".1"/>
      <text x="58" y="118" fill="var(--vp-c-text-2)" font-size="8" font-family="monospace" opacity=".2">}</text>

      <!-- Flow arrow 1 -->
      <path d="M225 80 C260 80 265 80 290 80" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".2"/>
      <circle cx="258" cy="80" r="3" fill="var(--vp-c-brand-1)" opacity=".1"/>
      <path d="M286 76l8 4-8 4" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".25" fill="none"/>

      <!-- Server (center) - taller, more prominent -->
      <rect x="298" y="10" width="204" height="140" rx="12" stroke="var(--vp-c-brand-1)" stroke-width="2" opacity=".35" fill="var(--vp-c-brand-1)" fill-opacity=".025"/>
      <!-- Server label -->
      <rect x="340" y="22" width="120" height="20" rx="6" fill="var(--vp-c-brand-1)" fill-opacity=".06"/>
      <text x="400" y="36" fill="var(--vp-c-brand-1)" font-size="11" font-family="monospace" font-weight="700" text-anchor="middle" opacity=".45">LNbits</text>
      <!-- Lightning bolt -->
      <path d="M395 52l-8 18h9l-8 20" stroke="var(--vp-c-brand-1)" stroke-width="2.5" opacity=".2"/>
      <!-- Endpoint list -->
      <rect x="318" y="100" width="164" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".1"/>
      <rect x="318" y="108" width="120" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".08"/>
      <rect x="318" y="116" width="140" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".06"/>
      <rect x="318" y="128" width="80" height="3" rx="1.5" fill="var(--vp-c-brand-1)" opacity=".08"/>

      <!-- Flow arrow 2 -->
      <path d="M506 80 C530 80 540 80 560 80" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".2"/>
      <circle cx="534" cy="80" r="3" fill="var(--vp-c-brand-1)" opacity=".1"/>
      <path d="M556 76l8 4-8 4" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".25" fill="none"/>

      <!-- Response block (right) -->
      <rect x="568" y="20" width="195" height="120" rx="10" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".2" fill="var(--vp-c-brand-1)" fill-opacity=".015"/>
      <!-- Status badge -->
      <rect x="584" y="32" width="40" height="16" rx="8" fill="#28c840" opacity=".1" stroke="#28c840" stroke-width=".8" stroke-opacity=".2"/>
      <text x="604" y="43" fill="#28c840" font-size="9" font-family="monospace" font-weight="700" text-anchor="middle" opacity=".5">200</text>
      <rect x="632" y="36" width="50" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".15"/>
      <line x1="584" y1="54" x2="745" y2="54" stroke="var(--vp-c-brand-1)" stroke-width=".5" opacity=".08"/>
      <!-- JSON response -->
      <text x="584" y="68" fill="var(--vp-c-text-2)" font-size="8" font-family="monospace" opacity=".3">{</text>
      <rect x="596" y="74" width="100" height="2.5" rx="1" fill="var(--vp-c-brand-1)" opacity=".18"/>
      <rect x="596" y="82" width="70" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".14"/>
      <rect x="596" y="90" width="120" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".1"/>
      <rect x="596" y="98" width="85" height="2.5" rx="1" fill="var(--vp-c-brand-1)" opacity=".12"/>
      <rect x="596" y="106" width="95" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".08"/>
      <text x="584" y="122" fill="var(--vp-c-text-2)" font-size="8" font-family="monospace" opacity=".2">}</text>
    </svg>

    <!-- ═══ Architecture: exploded layer view ═══ -->
    <svg v-if="type === 'architecture'" viewBox="0 0 800 160" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <!-- Layer 1: Frontend (top, slightly offset right) -->
      <g transform="translate(240, 4)">
        <rect x="0" y="0" width="360" height="36" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".25" fill="var(--vp-c-brand-1)" fill-opacity=".03"/>
        <circle cx="20" cy="18" r="8" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".2"/>
        <path d="M16 18l3 3 5-6" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".3"/>
        <text x="38" y="22" fill="var(--vp-c-brand-1)" font-size="10" font-family="monospace" font-weight="600" opacity=".4">Vue 3 + Quasar</text>
        <rect x="170" y="10" width="50" height="16" rx="4" fill="var(--vp-c-brand-1)" fill-opacity=".05" stroke="var(--vp-c-brand-1)" stroke-width=".6" stroke-opacity=".12"/>
        <rect x="178" y="16" width="30" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".15"/>
        <rect x="230" y="10" width="50" height="16" rx="4" fill="var(--vp-c-brand-1)" fill-opacity=".04" stroke="var(--vp-c-brand-1)" stroke-width=".6" stroke-opacity=".1"/>
        <rect x="238" y="16" width="26" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".12"/>
        <rect x="290" y="10" width="50" height="16" rx="4" fill="var(--vp-c-brand-1)" fill-opacity=".03" stroke="var(--vp-c-brand-1)" stroke-width=".6" stroke-opacity=".08"/>
        <rect x="298" y="16" width="34" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".1"/>
      </g>

      <!-- Connection: frontend to backend -->
      <path d="M420 42 v10" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".15"/>
      <path d="M420 52l-3-5h6z" fill="var(--vp-c-brand-1)" opacity=".15"/>
      <path d="M350 42 v10" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".1"/>
      <path d="M490 42 v10" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".1"/>

      <!-- Layer 2: Backend (middle) -->
      <g transform="translate(220, 55)">
        <rect x="0" y="0" width="400" height="40" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1.8" opacity=".35" fill="var(--vp-c-brand-1)" fill-opacity=".04"/>
        <path d="M26 14l-6 14h8l-6 14" stroke="var(--vp-c-brand-1)" stroke-width="2" opacity=".25"/>
        <text x="44" y="24" fill="var(--vp-c-brand-1)" font-size="10" font-family="monospace" font-weight="600" opacity=".45">FastAPI</text>
        <line x1="110" y1="8" x2="110" y2="32" stroke="var(--vp-c-brand-1)" stroke-width=".6" opacity=".1"/>
        <text x="122" y="18" fill="var(--vp-c-text-2)" font-size="8" font-family="monospace" opacity=".2">routes</text>
        <rect x="122" y="24" width="40" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".12"/>
        <line x1="180" y1="8" x2="180" y2="32" stroke="var(--vp-c-brand-1)" stroke-width=".6" opacity=".1"/>
        <text x="192" y="18" fill="var(--vp-c-text-2)" font-size="8" font-family="monospace" opacity=".2">crud</text>
        <rect x="192" y="24" width="35" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".12"/>
        <line x1="245" y1="8" x2="245" y2="32" stroke="var(--vp-c-brand-1)" stroke-width=".6" opacity=".1"/>
        <text x="257" y="18" fill="var(--vp-c-text-2)" font-size="8" font-family="monospace" opacity=".2">tasks</text>
        <rect x="257" y="24" width="30" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".1"/>
        <line x1="305" y1="8" x2="305" y2="32" stroke="var(--vp-c-brand-1)" stroke-width=".6" opacity=".1"/>
        <text x="317" y="18" fill="var(--vp-c-text-2)" font-size="8" font-family="monospace" opacity=".2">models</text>
        <rect x="317" y="24" width="50" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".1"/>
      </g>

      <!-- Connection: backend to database -->
      <path d="M420 97 v10" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".15"/>
      <path d="M420 107l-3-5h6z" fill="var(--vp-c-brand-1)" opacity=".15"/>

      <!-- Layer 3: Database (bottom) -->
      <g transform="translate(260, 110)">
        <rect x="0" y="0" width="320" height="40" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".22" fill="var(--vp-c-brand-1)" fill-opacity=".02"/>
        <!-- Database icon -->
        <ellipse cx="24" cy="14" rx="10" ry="5" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".25"/>
        <path d="M14 14v12c0 3 4.5 5 10 5s10-2 10-5v-12" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".2"/>
        <ellipse cx="24" cy="20" rx="10" ry="3" stroke="var(--vp-c-brand-1)" stroke-width=".6" opacity=".1" fill="none"/>
        <text x="44" y="24" fill="var(--vp-c-brand-1)" font-size="10" font-family="monospace" font-weight="600" opacity=".3">SQLite / PostgreSQL</text>
        <rect x="220" y="12" width="80" height="16" rx="4" fill="var(--vp-c-brand-1)" fill-opacity=".03" stroke="var(--vp-c-brand-1)" stroke-width=".6" stroke-opacity=".1"/>
        <rect x="228" y="18" width="50" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".1"/>
      </g>

      <!-- Left: Extensions (connected to backend) -->
      <rect x="50" y="50" width="130" height="50" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".18" stroke-dasharray="5 3" fill="var(--vp-c-brand-1)" fill-opacity=".015"/>
      <text x="68" y="68" fill="var(--vp-c-brand-1)" font-size="9" font-family="monospace" opacity=".3">extensions/</text>
      <rect x="66" y="78" width="24" height="12" rx="3" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".15"/>
      <rect x="94" y="78" width="24" height="12" rx="3" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".12"/>
      <rect x="122" y="78" width="24" height="12" rx="3" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".1"/>
      <path d="M152" y="78" width="24" height="12" rx="3"/>
      <!-- Connection to backend -->
      <path d="M180 75 Q200 75 220 75" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".12" stroke-dasharray="3 3"/>

      <!-- Right: Wallet backends (connected to backend) -->
      <rect x="660" y="50" width="110" height="50" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".15" stroke-dasharray="5 3" fill="var(--vp-c-brand-1)" fill-opacity=".01"/>
      <text x="674" y="68" fill="var(--vp-c-brand-1)" font-size="9" font-family="monospace" opacity=".25">backends/</text>
      <path d="M682 82l-3 6h5l-3 8" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".2"/>
      <rect x="700" y="78" width="20" height="12" rx="3" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".12"/>
      <rect x="724" y="78" width="20" height="12" rx="3" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".1"/>
      <path d="M660 75 Q640 75 620 75" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".12" stroke-dasharray="3 3"/>
    </svg>

    <!-- ═══ Extensions: curated showcase of distinct tiles ═══ -->
    <svg v-if="type === 'extensions'" viewBox="0 0 800 160" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <!-- Row 1: Featured extensions (larger, more detail) -->
      <!-- TPoS (point of sale) -->
      <rect x="80" y="10" width="130" height="60" rx="10" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".3" fill="var(--vp-c-brand-1)" fill-opacity=".03"/>
      <rect x="96" y="22" width="28" height="28" rx="6" fill="var(--vp-c-brand-1)" fill-opacity=".06"/>
      <text x="104" y="42" fill="var(--vp-c-brand-1)" font-size="14" font-family="monospace" opacity=".3">$</text>
      <rect x="132" y="24" width="60" height="4" rx="2" fill="var(--vp-c-brand-1)" opacity=".2"/>
      <rect x="132" y="34" width="45" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".15"/>
      <rect x="132" y="44" width="55" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".1"/>

      <!-- BoltCards (NFC) -->
      <rect x="230" y="10" width="130" height="60" rx="10" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".25" fill="var(--vp-c-brand-1)" fill-opacity=".025"/>
      <rect x="246" y="22" width="28" height="28" rx="6" fill="var(--vp-c-brand-1)" fill-opacity=".05"/>
      <!-- NFC waves -->
      <path d="M254 32 a6 6 0 0 1 0 10" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".25" fill="none"/>
      <path d="M258 28 a10 10 0 0 1 0 16" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".18" fill="none"/>
      <path d="M262 24 a14 14 0 0 1 0 22" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".12" fill="none"/>
      <rect x="282" y="24" width="60" height="4" rx="2" fill="var(--vp-c-brand-1)" opacity=".18"/>
      <rect x="282" y="34" width="50" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".12"/>
      <rect x="282" y="44" width="40" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".08"/>

      <!-- SatsPay -->
      <rect x="380" y="10" width="130" height="60" rx="10" stroke="var(--vp-c-brand-1)" stroke-width="1.3" opacity=".2" fill="var(--vp-c-brand-1)" fill-opacity=".02"/>
      <rect x="396" y="22" width="28" height="28" rx="6" fill="var(--vp-c-brand-1)" fill-opacity=".04"/>
      <path d="M404 30l-4 10h6l-4 12" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".25"/>
      <rect x="432" y="24" width="55" height="4" rx="2" fill="var(--vp-c-brand-1)" opacity=".15"/>
      <rect x="432" y="34" width="60" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".1"/>
      <rect x="432" y="44" width="35" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".08"/>

      <!-- LNURLp -->
      <rect x="530" y="10" width="130" height="60" rx="10" stroke="var(--vp-c-brand-1)" stroke-width="1.3" opacity=".18" fill="var(--vp-c-brand-1)" fill-opacity=".015"/>
      <rect x="546" y="22" width="28" height="28" rx="6" fill="var(--vp-c-brand-1)" fill-opacity=".04"/>
      <!-- QR mini icon -->
      <rect x="550" y="26" width="8" height="8" rx="1" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".2"/>
      <rect x="562" y="26" width="8" height="8" rx="1" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".2"/>
      <rect x="550" y="38" width="8" height="8" rx="1" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".2"/>
      <rect x="562" y="38" width="4" height="4" fill="var(--vp-c-brand-1)" opacity=".15"/>
      <rect x="582" y="24" width="60" height="4" rx="2" fill="var(--vp-c-brand-1)" opacity=".12"/>
      <rect x="582" y="34" width="50" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".1"/>

      <!-- Row 2: Smaller extension tiles -->
      <rect x="80" y="84" width="90" height="36" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".15"/>
      <circle cx="100" cy="98" r="6" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".15"/>
      <rect x="114" y="92" width="40" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".12"/>
      <rect x="114" y="100" width="30" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".08"/>

      <rect x="184" y="84" width="90" height="36" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".12"/>
      <circle cx="204" cy="98" r="6" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".12"/>
      <rect x="218" y="92" width="36" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".1"/>
      <rect x="218" y="100" width="25" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".07"/>

      <rect x="288" y="84" width="90" height="36" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".1"/>
      <circle cx="308" cy="98" r="6" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".1"/>
      <rect x="322" y="92" width="40" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".08"/>

      <rect x="392" y="84" width="90" height="36" rx="8" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".08"/>
      <circle cx="412" cy="98" r="6" stroke="var(--vp-c-brand-1)" stroke-width=".6" opacity=".08"/>
      <rect x="426" y="92" width="35" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".06"/>

      <rect x="496" y="84" width="90" height="36" rx="8" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".06"/>
      <circle cx="516" cy="98" r="6" stroke="var(--vp-c-brand-1)" stroke-width=".6" opacity=".06"/>

      <rect x="600" y="84" width="90" height="36" rx="8" stroke="var(--vp-c-brand-1)" stroke-width=".6" opacity=".05"/>

      <!-- "60+" counter badge -->
      <g transform="translate(692, 20)">
        <rect x="0" y="0" width="56" height="28" rx="14" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".25" fill="var(--vp-c-brand-1)" fill-opacity=".04"/>
        <text x="28" y="19" fill="var(--vp-c-brand-1)" font-size="13" font-weight="700" text-anchor="middle" opacity=".35">60+</text>
      </g>

      <!-- Row 3: fade-out dots suggesting more -->
      <circle cx="120" cy="140" r="3" fill="var(--vp-c-brand-1)" opacity=".08"/>
      <circle cx="136" cy="140" r="3" fill="var(--vp-c-brand-1)" opacity=".06"/>
      <circle cx="152" cy="140" r="3" fill="var(--vp-c-brand-1)" opacity=".04"/>
    </svg>

    <!-- ═══ Installation: Docker whale, terminal, Nix snowflake ═══ -->
    <svg v-if="type === 'installation'" viewBox="0 0 800 160" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <!-- Docker whale with stacked containers -->
      <g transform="translate(80, 20)">
        <!-- Whale body -->
        <path d="M10 65 Q-5 45 15 28 Q35 12 70 16 Q90 4 108 20 Q118 20 118 34 Q132 38 126 55 Q120 68 96 74 Q65 80 35 76 Q15 74 10 65z" stroke="var(--vp-c-brand-1)" stroke-width="1.8" opacity=".3" fill="var(--vp-c-brand-1)" fill-opacity=".03"/>
        <!-- Eye -->
        <circle cx="95" cy="32" r="2.5" fill="var(--vp-c-brand-1)" opacity=".35"/>
        <!-- Spout -->
        <path d="M72 12 Q70 0 76-4 Q78-2 76 4" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".15"/>
        <circle cx="76" cy="-6" r="2" fill="var(--vp-c-brand-1)" opacity=".1"/>
        <circle cx="80" cy="-10" r="1.5" fill="var(--vp-c-brand-1)" opacity=".08"/>
        <!-- Container stacks on back -->
        <rect x="22" y="24" width="16" height="13" rx="2.5" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".35" fill="var(--vp-c-brand-1)" fill-opacity=".05"/>
        <rect x="42" y="24" width="16" height="13" rx="2.5" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".35" fill="var(--vp-c-brand-1)" fill-opacity=".05"/>
        <rect x="62" y="24" width="16" height="13" rx="2.5" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".35" fill="var(--vp-c-brand-1)" fill-opacity=".05"/>
        <rect x="22" y="41" width="16" height="13" rx="2.5" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".25" fill="var(--vp-c-brand-1)" fill-opacity=".03"/>
        <rect x="42" y="41" width="16" height="13" rx="2.5" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".25" fill="var(--vp-c-brand-1)" fill-opacity=".03"/>
        <rect x="62" y="41" width="16" height="13" rx="2.5" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".25" fill="var(--vp-c-brand-1)" fill-opacity=".03"/>
        <rect x="82" y="24" width="16" height="13" rx="2.5" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".4" fill="var(--vp-c-brand-1)" fill-opacity=".06"/>
        <!-- Water waves -->
        <path d="M-15 84 Q15 76 45 84 Q75 92 105 84 Q135 76 165 84" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".12"/>
        <path d="M-25 94 Q10 88 40 94 Q70 100 100 94 Q130 88 160 94" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".07"/>
        <!-- Label -->
        <text x="60" y="115" fill="var(--vp-c-brand-1)" font-size="9" font-family="monospace" text-anchor="middle" opacity=".2">docker</text>
      </g>

      <!-- Terminal window (center) -->
      <g transform="translate(280, 8)">
        <rect x="0" y="0" width="240" height="142" rx="10" stroke="var(--vp-c-brand-1)" stroke-width="1.8" opacity=".3" fill="var(--vp-c-brand-1)" fill-opacity=".02"/>
        <!-- Title bar -->
        <line x1="0" y1="26" x2="240" y2="26" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".12"/>
        <circle cx="16" cy="13" r="4" fill="#ff5f57" opacity=".45"/>
        <circle cx="30" cy="13" r="4" fill="#febc2e" opacity=".45"/>
        <circle cx="44" cy="13" r="4" fill="#28c840" opacity=".45"/>
        <text x="120" y="17" fill="var(--vp-c-text-2)" font-size="8" font-family="monospace" text-anchor="middle" opacity=".2">terminal</text>
        <!-- Line 1: install command -->
        <text x="16" y="44" fill="var(--vp-c-brand-1)" font-size="9" font-family="monospace" opacity=".4">$</text>
        <rect x="28" y="38" width="100" height="3" rx="1.5" fill="var(--vp-c-brand-1)" opacity=".25"/>
        <!-- Output lines -->
        <rect x="16" y="52" width="160" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".15"/>
        <rect x="16" y="60" width="120" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".12"/>
        <rect x="16" y="68" width="140" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".1"/>
        <!-- Line 2: run command -->
        <text x="16" y="86" fill="var(--vp-c-brand-1)" font-size="9" font-family="monospace" opacity=".4">$</text>
        <rect x="28" y="80" width="70" height="3" rx="1.5" fill="var(--vp-c-brand-1)" opacity=".25"/>
        <!-- Progress bar -->
        <rect x="16" y="96" width="208" height="7" rx="3.5" fill="var(--vp-c-brand-1)" opacity=".06"/>
        <rect x="16" y="96" width="160" height="7" rx="3.5" fill="var(--vp-c-brand-1)" opacity=".18"/>
        <!-- Success -->
        <path d="M16 116 l5 5 10-10" stroke="#28c840" stroke-width="2" opacity=".45"/>
        <rect x="38" y="112" width="90" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".2"/>
        <!-- Cursor blink -->
        <text x="16" y="134" fill="var(--vp-c-brand-1)" font-size="9" font-family="monospace" opacity=".4">$</text>
        <rect x="28" y="128" width="7" height="10" rx="1.5" fill="var(--vp-c-brand-1)" opacity=".15"/>
      </g>

      <!-- Nix snowflake (right) -->
      <g transform="translate(660, 80)">
        <g opacity=".3">
          <!-- Six-armed star -->
          <path d="M0-36 L0 36" stroke="var(--vp-c-brand-1)" stroke-width="2.5"/>
          <path d="M-31-18 L31 18" stroke="var(--vp-c-brand-1)" stroke-width="2.5"/>
          <path d="M-31 18 L31-18" stroke="var(--vp-c-brand-1)" stroke-width="2.5"/>
          <!-- Lambda crossbars -->
          <path d="M-12-30 L8-22" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
          <path d="M12 30 L-8 22" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
          <path d="M-30-6 L-22 12" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
          <path d="M30 6 L22-12" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
          <path d="M-20 26 L-16 10" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
          <path d="M20-26 L16-10" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
        </g>
        <circle cx="0" cy="0" r="10" fill="var(--vp-c-brand-1)" opacity=".06"/>
        <text x="0" y="56" fill="var(--vp-c-brand-1)" font-size="9" font-family="monospace" text-anchor="middle" opacity=".2">nix</text>
      </g>

      <!-- Dashed connectors -->
      <path d="M220 80 Q250 65 280 72" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".12" stroke-dasharray="4 4"/>
      <path d="M520 80 Q560 68 620 72" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".12" stroke-dasharray="4 4"/>

      <!-- Floating method badges -->
      <g transform="translate(560, 14)">
        <rect x="0" y="0" width="52" height="18" rx="9" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".15" fill="var(--vp-c-brand-1)" fill-opacity=".02"/>
        <text x="26" y="13" fill="var(--vp-c-brand-1)" font-size="7" font-family="monospace" text-anchor="middle" opacity=".2">poetry</text>
      </g>
      <g transform="translate(620, 14)">
        <rect x="0" y="0" width="64" height="18" rx="9" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".12" fill="var(--vp-c-brand-1)" fill-opacity=".02"/>
        <text x="32" y="13" fill="var(--vp-c-brand-1)" font-size="7" font-family="monospace" text-anchor="middle" opacity=".18">appimage</text>
      </g>
      <g transform="translate(560, 138)">
        <rect x="0" y="0" width="40" height="18" rx="9" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".1" fill="var(--vp-c-brand-1)" fill-opacity=".02"/>
        <text x="20" y="13" fill="var(--vp-c-brand-1)" font-size="7" font-family="monospace" text-anchor="middle" opacity=".15">uv</text>
      </g>
    </svg>

    <!-- ═══ Wallets: funding sources flowing into LNbits hub ═══ -->
    <svg v-if="type === 'wallets'" viewBox="0 0 800 160" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <!-- Left: funding source nodes -->
      <g transform="translate(40, 8)">
        <!-- LND -->
        <rect x="0" y="0" width="110" height="34" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".3" fill="var(--vp-c-brand-1)" fill-opacity=".03"/>
        <circle cx="18" cy="17" r="8" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".25"/>
        <path d="M16 12l-2 6h4l-2 6" stroke="var(--vp-c-brand-1)" stroke-width="1.3" opacity=".4"/>
        <text x="34" y="14" fill="var(--vp-c-brand-1)" font-size="9" font-family="monospace" font-weight="700" opacity=".35">LND</text>
        <rect x="34" y="20" width="55" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".15"/>
        <!-- CLN -->
        <rect x="0" y="44" width="110" height="34" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1.3" opacity=".25" fill="var(--vp-c-brand-1)" fill-opacity=".025"/>
        <circle cx="18" cy="61" r="8" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".2"/>
        <path d="M14 61h8m-4-4v8" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".3"/>
        <text x="34" y="58" fill="var(--vp-c-brand-1)" font-size="9" font-family="monospace" font-weight="700" opacity=".3">CLN</text>
        <rect x="34" y="64" width="45" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".12"/>
        <!-- LNbits Node -->
        <rect x="0" y="88" width="110" height="34" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".2" fill="var(--vp-c-brand-1)" fill-opacity=".02"/>
        <circle cx="18" cy="105" r="8" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".18"/>
        <circle cx="18" cy="105" r="4" fill="var(--vp-c-brand-1)" opacity=".12"/>
        <text x="34" y="102" fill="var(--vp-c-brand-1)" font-size="8" font-family="monospace" font-weight="600" opacity=".25">LNbits</text>
        <rect x="34" y="108" width="50" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".1"/>
        <!-- More backends -->
        <rect x="0" y="132" width="110" height="26" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".12" stroke-dasharray="4 3"/>
        <text x="55" y="149" fill="var(--vp-c-brand-1)" font-size="8" font-family="monospace" text-anchor="middle" opacity=".15">20+ more...</text>
      </g>

      <!-- Flow arrows -->
      <path d="M160 25 Q230 30 280 55" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".2"/>
      <path d="M160 60 Q220 62 280 68" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".2"/>
      <path d="M160 105 Q220 100 280 82" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".15"/>
      <path d="M160 145 Q230 130 280 95" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".1"/>
      <!-- Arrowheads -->
      <path d="M275 53 l8 3-5 6" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".2"/>
      <path d="M275 66 l8 2-3 6" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".2"/>
      <path d="M275 80 l8-1-2 6" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".15"/>
      <path d="M275 93 l8-3 0 7" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".1"/>

      <!-- Central LNbits hub -->
      <g transform="translate(290, 15)">
        <rect x="0" y="0" width="220" height="130" rx="14" stroke="var(--vp-c-brand-1)" stroke-width="2" opacity=".35" fill="var(--vp-c-brand-1)" fill-opacity=".03"/>
        <!-- Title -->
        <text x="110" y="24" fill="var(--vp-c-brand-1)" font-size="11" font-family="monospace" font-weight="700" text-anchor="middle" opacity=".4">LNbits</text>
        <!-- Lightning bolt -->
        <path d="M102 36l-10 20h12l-10 24" stroke="var(--vp-c-brand-1)" stroke-width="2.5" opacity=".3"/>
        <!-- Wallet slots row -->
        <rect x="16" y="88" width="50" height="30" rx="7" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".2" fill="var(--vp-c-brand-1)" fill-opacity=".02"/>
        <rect x="24" y="96" width="34" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".15"/>
        <rect x="24" y="104" width="22" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".1"/>
        <rect x="76" y="88" width="50" height="30" rx="7" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".2" fill="var(--vp-c-brand-1)" fill-opacity=".02"/>
        <rect x="84" y="96" width="34" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".15"/>
        <rect x="84" y="104" width="26" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".1"/>
        <!-- Dots -->
        <circle cx="148" cy="103" r="2" fill="var(--vp-c-text-2)" opacity=".12"/>
        <circle cx="158" cy="103" r="2" fill="var(--vp-c-text-2)" opacity=".12"/>
        <circle cx="168" cy="103" r="2" fill="var(--vp-c-text-2)" opacity=".12"/>
        <!-- Add wallet -->
        <rect x="180" y="88" width="28" height="30" rx="7" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".12" stroke-dasharray="3 2"/>
        <path d="M190 99v8m-4-4h8" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".15"/>
      </g>

      <!-- Outbound flow -->
      <path d="M510 60 Q560 45 600 38" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".2"/>
      <path d="M510 80 L600 80" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".2"/>
      <path d="M510 100 Q560 115 600 122" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".15"/>

      <!-- Right: user wallet cards -->
      <g transform="translate(610, 16)">
        <rect x="0" y="0" width="130" height="38" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".28" fill="var(--vp-c-brand-1)" fill-opacity=".03"/>
        <circle cx="18" cy="19" r="9" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".2"/>
        <circle cx="18" cy="16" r="4" fill="var(--vp-c-brand-1)" opacity=".12"/>
        <path d="M11 25 Q18 20 25 25" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".1"/>
        <text x="34" y="16" fill="var(--vp-c-brand-1)" font-size="8" font-family="monospace" opacity=".25">User A</text>
        <rect x="34" y="22" width="70" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".15"/>
      </g>
      <g transform="translate(610, 60)">
        <rect x="0" y="0" width="130" height="38" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1.3" opacity=".22" fill="var(--vp-c-brand-1)" fill-opacity=".025"/>
        <circle cx="18" cy="19" r="9" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".18"/>
        <circle cx="18" cy="16" r="4" fill="var(--vp-c-brand-1)" opacity=".1"/>
        <path d="M11 25 Q18 20 25 25" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".08"/>
        <text x="34" y="16" fill="var(--vp-c-brand-1)" font-size="8" font-family="monospace" opacity=".2">User B</text>
        <rect x="34" y="22" width="60" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".12"/>
      </g>
      <g transform="translate(610, 104)">
        <rect x="0" y="0" width="130" height="38" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".18" fill="var(--vp-c-brand-1)" fill-opacity=".02"/>
        <circle cx="18" cy="19" r="9" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".14"/>
        <circle cx="18" cy="16" r="4" fill="var(--vp-c-brand-1)" opacity=".08"/>
        <path d="M11 25 Q18 20 25 25" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".06"/>
        <text x="34" y="16" fill="var(--vp-c-brand-1)" font-size="8" font-family="monospace" opacity=".16">User C</text>
        <rect x="34" y="22" width="50" height="3" rx="1.5" fill="var(--vp-c-text-2)" opacity=".1"/>
      </g>
    </svg>

    <!-- ═══ Core: wallet card with transactions, LNURL QR, label tags, fiat card ═══ -->
    <svg v-if="type === 'core'" viewBox="0 0 800 160" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <!-- Section 1: Wallet & Payments -->
      <g transform="translate(30, 5)">
        <rect x="0" y="0" width="180" height="150" rx="10" stroke="var(--vp-c-brand-1)" stroke-width="1.8" opacity=".28" fill="var(--vp-c-brand-1)" fill-opacity=".02"/>
        <!-- Header -->
        <text x="14" y="20" fill="var(--vp-c-brand-1)" font-size="9" font-family="monospace" font-weight="700" opacity=".35">Wallet</text>
        <!-- Balance bar -->
        <rect x="14" y="28" width="100" height="8" rx="3" fill="var(--vp-c-brand-1)" opacity=".1"/>
        <rect x="14" y="28" width="68" height="8" rx="3" fill="var(--vp-c-brand-1)" opacity=".08"/>
        <text x="130" y="36" fill="var(--vp-c-brand-1)" font-size="8" font-family="monospace" opacity=".2">sats</text>
        <!-- Transactions -->
        <!-- Tx 1 incoming -->
        <circle cx="24" cy="54" r="7" fill="#28c840" opacity=".1"/>
        <path d="M21 54l3-4 3 4" stroke="#28c840" stroke-width="1.5" opacity=".45"/>
        <rect x="38" y="50" width="60" height="3" rx="1" fill="var(--vp-c-text-2)" opacity=".25"/>
        <rect x="38" y="57" width="35" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".12"/>
        <text x="138" y="54" fill="#28c840" font-size="8" font-family="monospace" opacity=".35">+2,100</text>
        <!-- Tx 2 outgoing -->
        <circle cx="24" cy="78" r="7" fill="var(--vp-c-brand-1)" opacity=".07"/>
        <path d="M21 78l3 4 3-4" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".3"/>
        <rect x="38" y="74" width="50" height="3" rx="1" fill="var(--vp-c-text-2)" opacity=".2"/>
        <rect x="38" y="81" width="40" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".1"/>
        <text x="142" y="78" fill="var(--vp-c-text-2)" font-size="8" font-family="monospace" opacity=".2">-500</text>
        <!-- Tx 3 incoming -->
        <circle cx="24" cy="102" r="7" fill="#28c840" opacity=".08"/>
        <path d="M21 102l3-4 3 4" stroke="#28c840" stroke-width="1.5" opacity=".35"/>
        <rect x="38" y="98" width="55" height="3" rx="1" fill="var(--vp-c-text-2)" opacity=".18"/>
        <rect x="38" y="105" width="30" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".08"/>
        <text x="134" y="102" fill="#28c840" font-size="8" font-family="monospace" opacity=".28">+10,000</text>
        <!-- Tx 4 outgoing -->
        <circle cx="24" cy="126" r="7" fill="var(--vp-c-brand-1)" opacity=".05"/>
        <path d="M21 126l3 4 3-4" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".2"/>
        <rect x="38" y="122" width="45" height="3" rx="1" fill="var(--vp-c-text-2)" opacity=".15"/>
        <rect x="38" y="129" width="28" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".07"/>
        <text x="138" y="126" fill="var(--vp-c-text-2)" font-size="8" font-family="monospace" opacity=".15">-1,200</text>
      </g>

      <!-- Section 2: LNURL + QR -->
      <g transform="translate(270, 5)">
        <!-- QR code -->
        <rect x="0" y="0" width="100" height="100" rx="8" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".25" fill="var(--vp-c-brand-1)" fill-opacity=".015"/>
        <g transform="translate(12, 12)" opacity=".28">
          <!-- Corner markers -->
          <rect x="0" y="0" width="22" height="22" rx="3" stroke="var(--vp-c-brand-1)" stroke-width="1.8" fill="none"/>
          <rect x="6" y="6" width="10" height="10" rx="1.5" fill="var(--vp-c-brand-1)"/>
          <rect x="54" y="0" width="22" height="22" rx="3" stroke="var(--vp-c-brand-1)" stroke-width="1.8" fill="none"/>
          <rect x="60" y="6" width="10" height="10" rx="1.5" fill="var(--vp-c-brand-1)"/>
          <rect x="0" y="54" width="22" height="22" rx="3" stroke="var(--vp-c-brand-1)" stroke-width="1.8" fill="none"/>
          <rect x="6" y="60" width="10" height="10" rx="1.5" fill="var(--vp-c-brand-1)"/>
          <!-- Data modules -->
          <rect x="28" y="8" width="7" height="7" rx="1" fill="var(--vp-c-brand-1)"/>
          <rect x="40" y="8" width="7" height="7" rx="1" fill="var(--vp-c-brand-1)"/>
          <rect x="28" y="22" width="7" height="7" rx="1" fill="var(--vp-c-brand-1)"/>
          <rect x="36" y="36" width="7" height="7" rx="1" fill="var(--vp-c-brand-1)"/>
          <rect x="50" y="36" width="7" height="7" rx="1" fill="var(--vp-c-brand-1)"/>
          <rect x="60" y="36" width="7" height="7" rx="1" fill="var(--vp-c-brand-1)"/>
          <rect x="36" y="50" width="7" height="7" rx="1" fill="var(--vp-c-brand-1)"/>
          <rect x="54" y="54" width="7" height="7" rx="1" fill="var(--vp-c-brand-1)"/>
          <rect x="66" y="54" width="7" height="7" rx="1" fill="var(--vp-c-brand-1)"/>
          <rect x="54" y="66" width="7" height="7" rx="1" fill="var(--vp-c-brand-1)"/>
          <rect x="66" y="44" width="7" height="7" rx="1" fill="var(--vp-c-brand-1)"/>
        </g>

        <!-- LNURL protocol types -->
        <g transform="translate(115, 0)">
          <rect x="0" y="2" width="110" height="22" rx="6" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".25" fill="var(--vp-c-brand-1)" fill-opacity=".03"/>
          <text x="10" y="17" fill="var(--vp-c-brand-1)" font-size="8" font-family="monospace" font-weight="700" opacity=".35">pay</text>
          <rect x="32" y="10" width="65" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".2"/>

          <rect x="0" y="30" width="110" height="22" rx="6" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".2" fill="var(--vp-c-brand-1)" fill-opacity=".025"/>
          <text x="10" y="45" fill="var(--vp-c-brand-1)" font-size="8" font-family="monospace" font-weight="700" opacity=".3">withdraw</text>
          <rect x="58" y="38" width="40" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".15"/>

          <rect x="0" y="58" width="110" height="22" rx="6" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".16" fill="var(--vp-c-brand-1)" fill-opacity=".02"/>
          <text x="10" y="73" fill="var(--vp-c-brand-1)" font-size="8" font-family="monospace" font-weight="700" opacity=".25">auth</text>
          <rect x="36" y="66" width="55" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".12"/>

          <rect x="0" y="86" width="110" height="22" rx="6" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".12" fill="var(--vp-c-brand-1)" fill-opacity=".015"/>
          <text x="10" y="101" fill="var(--vp-c-brand-1)" font-size="8" font-family="monospace" font-weight="700" opacity=".2">channel</text>
          <rect x="50" y="94" width="45" height="2.5" rx="1" fill="var(--vp-c-text-2)" opacity=".1"/>
        </g>

        <!-- Lightning bolt connector -->
        <g transform="translate(75, 108)">
          <path d="M0 6l10 0-4 10 14-8-10 0 4-10z" fill="var(--vp-c-brand-1)" opacity=".08" stroke="var(--vp-c-brand-1)" stroke-width="1" stroke-opacity=".15"/>
        </g>
      </g>

      <!-- Section 3: Labels + Fiat -->
      <g transform="translate(530, 5)">
        <!-- Tag cloud -->
        <rect x="0" y="0" width="65" height="24" rx="12" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".28" fill="var(--vp-c-brand-1)" fill-opacity=".03"/>
        <text x="14" y="16" fill="var(--vp-c-brand-1)" font-size="8" font-family="monospace" opacity=".3">shop</text>

        <rect x="73" y="0" width="80" height="24" rx="12" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".22" fill="var(--vp-c-brand-1)" fill-opacity=".025"/>
        <text x="87" y="16" fill="var(--vp-c-brand-1)" font-size="8" font-family="monospace" opacity=".25">donations</text>

        <rect x="161" y="0" width="68" height="24" rx="12" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".16"/>
        <text x="175" y="16" fill="var(--vp-c-brand-1)" font-size="8" font-family="monospace" opacity=".2">refund</text>

        <rect x="12" y="32" width="72" height="24" rx="12" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".18" fill="var(--vp-c-brand-1)" fill-opacity=".02"/>
        <text x="26" y="48" fill="var(--vp-c-brand-1)" font-size="8" font-family="monospace" opacity=".22">payroll</text>

        <rect x="92" y="32" width="65" height="24" rx="12" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".25" fill="var(--vp-c-brand-1)" fill-opacity=".03"/>
        <text x="106" y="48" fill="var(--vp-c-brand-1)" font-size="8" font-family="monospace" opacity=".28">event</text>

        <rect x="165" y="32" width="55" height="24" rx="12" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".12"/>
        <text x="179" y="48" fill="var(--vp-c-brand-1)" font-size="8" font-family="monospace" opacity=".15">tips</text>

        <!-- Fiat payment card -->
        <g transform="translate(10, 74)">
          <rect x="0" y="0" width="210" height="80" rx="10" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".22" fill="var(--vp-c-brand-1)" fill-opacity=".02"/>
          <!-- Magnetic stripe -->
          <rect x="0" y="18" width="210" height="10" fill="var(--vp-c-brand-1)" opacity=".04"/>
          <!-- Chip -->
          <rect x="16" y="34" width="22" height="17" rx="3" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".2"/>
          <line x1="16" y1="42" x2="38" y2="42" stroke="var(--vp-c-brand-1)" stroke-width=".5" opacity=".12"/>
          <line x1="27" y1="34" x2="27" y2="51" stroke="var(--vp-c-brand-1)" stroke-width=".5" opacity=".12"/>
          <!-- Card number dots -->
          <g transform="translate(16, 60)">
            <circle cx="0" cy="0" r="2.5" fill="var(--vp-c-text-2)" opacity=".15"/>
            <circle cx="8" cy="0" r="2.5" fill="var(--vp-c-text-2)" opacity=".15"/>
            <circle cx="16" cy="0" r="2.5" fill="var(--vp-c-text-2)" opacity=".15"/>
            <circle cx="24" cy="0" r="2.5" fill="var(--vp-c-text-2)" opacity=".15"/>
            <circle cx="40" cy="0" r="2.5" fill="var(--vp-c-text-2)" opacity=".12"/>
            <circle cx="48" cy="0" r="2.5" fill="var(--vp-c-text-2)" opacity=".12"/>
            <circle cx="56" cy="0" r="2.5" fill="var(--vp-c-text-2)" opacity=".12"/>
            <circle cx="64" cy="0" r="2.5" fill="var(--vp-c-text-2)" opacity=".12"/>
            <circle cx="80" cy="0" r="2.5" fill="var(--vp-c-text-2)" opacity=".1"/>
            <circle cx="88" cy="0" r="2.5" fill="var(--vp-c-text-2)" opacity=".1"/>
            <circle cx="96" cy="0" r="2.5" fill="var(--vp-c-text-2)" opacity=".1"/>
            <circle cx="104" cy="0" r="2.5" fill="var(--vp-c-text-2)" opacity=".1"/>
          </g>
          <!-- Lightning swap arrows -->
          <g transform="translate(145, 38)">
            <path d="M0 5h16" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".25"/>
            <path d="M12 1l5 4-5 4" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".25"/>
            <path d="M40 5h-16" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".25"/>
            <path d="M28 1l-5 4 5 4" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".25"/>
          </g>
          <text x="150" y="60" fill="var(--vp-c-brand-1)" font-size="7" font-family="monospace" text-anchor="middle" opacity=".18">Stripe / PayPal</text>
        </g>
      </g>

      <!-- Connecting curves -->
      <path d="M220 80 Q245 70 270 75" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".1" stroke-dasharray="4 4"/>
      <path d="M500 80 Q515 70 530 72" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".1" stroke-dasharray="4 4"/>
    </svg>

  </div>
</template>

<style scoped>
.hero-img {
  margin: 0 0 24px;
  padding: 8px 0;
  overflow: hidden;
}

.hero-img svg {
  width: 100%;
  height: auto;
  display: block;
  max-height: 180px;
}

@media (max-width: 768px) {
  .hero-img { display: none; }
}
</style>
