<script setup>
import { ref, reactive, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'
import VPSwitchAppearance from 'vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue'

const { isDark } = useData()
const mounted = ref(false)
const contributors = ref([])
const activeRole = ref('developer')
const activeVideos = reactive(new Set())
const roleIds = ['developer', 'tester', 'writer', 'designer', 'entrepreneur', 'ambassador']

const roles = [
  { id: 'developer', title: 'Developer', tagline: 'Fix bugs, build features, get your code merged.' },
  { id: 'tester', title: 'Tester', tagline: 'Hunt bugs, test PRs, and file clear reports.' },
  { id: 'writer', title: 'Writer', tagline: 'Write docs, guides, and blog posts that help users understand LNbits.' },
  { id: 'designer', title: 'Designer', tagline: 'Shape the UI, improve UX, and create visuals for the project.' },
  { id: 'entrepreneur', title: 'Entrepreneur', tagline: 'Build products and run services on top of LNbits.' },
  { id: 'ambassador', title: 'Ambassador', tagline: 'Deploy LNbits for your community and onboard merchants to Lightning.' },
]

const communityLinks = [
  { name: 'Telegram', url: 'https://t.me/lnbits', icon: 'telegram', desc: 'Chat with the community and core team' },
  { name: 'GitHub', url: 'https://github.com/lnbits/lnbits', icon: 'github', desc: 'Report bugs, propose features, submit code' },
  { name: 'Follow on X', url: 'https://x.com/lnbits', icon: 'x', desc: 'Follow for updates and announcements' },
  { name: 'Nostr', url: 'https://primal.net/p/npub10efcj7x65z2ak6vd69xr8f2hvqwuaqrhlygl3yqa4y63hfvc02mqwzaeh3', icon: 'nostr', desc: 'Find us on the decentralized social network' },
]

const faqItems = ref([
  { q: 'Do I need to know Python to contribute?', a: 'No. Testers, writers, designers, entrepreneurs, and ambassadors all contribute without writing Python. Developers working on extensions use Python and Vue.js, but the Extension Builder lets you create extensions without code.', open: false },
  { q: 'Do I need a Lightning node?', a: 'No. Use FakeWallet for local testing. It simulates Lightning payments without a real node. For a quick live instance, spin one up on saas.lnbits.com in under 3 minutes.', open: false },
  { q: 'Where do I ask for help?', a: 'Join the Telegram group at t.me/lnbits. The core team and community are active there. You can also open a GitHub Discussion for longer questions.', open: false },
  { q: 'How do I test a pull request locally?', a: 'Clone the repo, check out the PR branch, install dependencies with uv, set LNBITS_BACKEND_WALLET_CLASS=FakeWallet, and run lnbits. The contributing guide has step-by-step instructions.', open: false },
  { q: 'Can I get paid for contributing?', a: 'LNbits is a volunteer open-source project. Some contributors receive grants from organizations like OpenSats or HRF. Extension developers can monetize their work via the pay-to-install model in the registry.', open: false },
  { q: 'What license does LNbits use?', a: 'MIT license. You can use, modify, and distribute the code freely.', open: false },
  { q: 'How do I write a blog post for LNbits?', a: 'Reach out on Telegram or open an issue in the docs repo. Blog posts about deployments, use cases, merchant stories, and tutorials are welcome.', open: false },
  { q: 'I found a bug. Where do I report it?', a: 'Open an issue at github.com/lnbits/lnbits/issues. Include clear reproduction steps, your LNbits version, browser/OS info, and any error messages from the console or logs.', open: false },
  { q: 'Can I contribute translations?', a: 'Translation infrastructure is being planned. Reach out on Telegram if you want to help - early volunteers will shape how it works.', open: false },
  { q: 'How do I build and sell an extension?', a: 'Build your extension following the developer guide, then list it in the registry with a price. The pay-to-install model lets users pay with Lightning to download. See the extension monetization docs for details.', open: false },
])

const roleData = {
  developer: {
    video: { id: 'ZTjFalYeOlA', title: 'LNbits Extensions Deep-Dive' },
    steps: [
      {
        num: '01', title: 'Set up your environment', illust: 'setup',
        desc: 'Everything you need to start coding. No Lightning node required - FakeWallet simulates payments locally.',
        items: [
          { name: 'Python 3.10+', url: 'https://python.org', badge: 'Runtime' },
          { name: 'Install with uv', url: '/guide/installation/uv', badge: 'Recommended' },
          { name: 'FakeWallet', url: '/guide/wallets/fakewallet', badge: 'No node needed' },
          { name: 'Dev environment setup', url: '/dev/contributing', badge: 'Full guide' },
        ],
      },
      {
        num: '02', title: 'Pick an issue', illust: 'browse',
        desc: 'Start with a "good first issue" to learn the codebase, or dive into extension development if you want to build something new.',
        items: [
          { name: 'Good first issues', url: 'https://github.com/lnbits/lnbits/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22' },
          { name: 'Architecture overview', url: '/dev/architecture', badge: 'Read first' },
          { name: 'Building Extensions', url: '/dev/building-extensions', badge: 'Full guide' },
          { name: 'Extension Builder', url: '/guide/core/extension-builder', badge: 'No-Code' },
          { name: 'Deploy to Registry', url: '/dev/extensions/registry' },
        ],
      },
      {
        num: '03', title: 'Submit your PR', illust: 'tips',
        desc: 'A good pull request is easy to review and merge. Follow these practices.',
        tips: [
          'Include a screen recording or screenshot in the PR description',
          'Test locally with FakeWallet before requesting review',
          'Write a human-readable description of what changed and why',
          'Keep PRs focused on one change - split large work into smaller PRs',
          'Run make format before pushing to pass linting checks',
        ],
      },
      {
        num: '04', title: 'Ship it', illust: 'ship',
        desc: 'Your code is merged. Welcome to the contributor team.',
        tips: [
          'Share your PR on X or Nostr to inspire other developers',
          'Review other contributors\u2019 PRs - code review is a contribution too',
          'Join the Telegram group for questions, feedback, and coordination',
          'Check the roadmap for larger features that need ownership',
        ],
        action: { label: 'Pick an issue', url: 'https://github.com/lnbits/lnbits/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22' },
      },
    ],
  },
  tester: {
    video: { id: 'i5FQf96e6zg', title: 'Use Your Lightning Node On-The-Go' },
    steps: [
      {
        num: '01', title: 'Get a test instance running', illust: 'setup',
        desc: 'No Lightning node needed. Run LNbits locally with FakeWallet or spin up a SaaS instance in minutes.',
        items: [
          { name: 'Install with uv', url: '/guide/installation/uv', badge: 'Fastest' },
          { name: 'FakeWallet', url: '/guide/wallets/fakewallet', badge: 'No node needed' },
          { name: 'LNbits SaaS', url: 'https://saas.lnbits.com', badge: 'No install' },
          { name: 'Dev environment setup', url: '/dev/contributing', badge: 'Full guide' },
        ],
      },
      {
        num: '02', title: 'Learn the QA workflow', illust: 'tips',
        desc: 'Testing is one of the most valuable contributions. Here is how to do it well.',
        tipGroups: [
          {
            label: 'Day to day',
            tips: [
              'Try every new release as soon as it drops',
              'Report bugs with clear reproduction steps, version, and logs',
              'Test on both desktop and mobile - many merchants use phones',
            ],
          },
          {
            label: 'When testing a PR',
            tips: [
              'Check out the PR branch and run it locally',
              'Follow the exact steps described in the PR',
              'Record a video or screenshot showing the result',
              'Leave a comment with your findings - what worked, what did not',
              'Approve the PR and state it has been user-tested',
            ],
          },
        ],
      },
      {
        num: '03', title: 'Find a PR to test', illust: 'browse',
        desc: 'Pick an open pull request, run the changes on your test instance, and share your feedback.',
        items: [
          { name: 'Open pull requests', url: 'https://github.com/lnbits/lnbits/pulls' },
          { name: 'Report a bug', url: 'https://github.com/lnbits/lnbits/issues/new' },
        ],
      },
      {
        num: '04', title: 'Leave your review', illust: 'ship',
        desc: 'Testers catch what developers miss. Your feedback is the last line of defense before code reaches users.',
        items: [
          { name: 'Open pull requests', url: 'https://github.com/lnbits/lnbits/pulls', badge: 'Test now' },
          { name: 'Report a bug', url: 'https://github.com/lnbits/lnbits/issues/new' },
          { name: 'Join Telegram for QA coordination', url: 'https://t.me/lnbits' },
        ],
        action: { label: 'Test a PR', url: 'https://github.com/lnbits/lnbits/pulls' },
      },
    ],
  },
  writer: {
    video: null,
    steps: [
      {
        num: '01', title: 'Find what is missing', illust: 'browse',
        desc: 'Read through the docs and look for gaps - missing pages, outdated instructions, unclear explanations, and undocumented features are all fair game.',
        items: [
          { name: 'User Guide', url: '/guide/' },
          { name: 'API Reference', url: '/api/' },
          { name: 'Developer Guide', url: '/dev/architecture' },
          { name: 'Extensions', url: '/extensions/', badge: '60+ pages' },
        ],
      },
      {
        num: '02', title: 'Follow the conventions', illust: 'tips',
        desc: 'Consistency matters. Follow these patterns so your work fits in naturally.',
        tips: [
          'Every page starts with an H1 title and a summary blockquote (>)',
          'Every page ends with a "Related Pages" section',
          'Write in English, clear and concise - lead with the answer',
          'Use bash for CLI examples, python for backend, javascript for frontend',
          'Verify all links and code examples actually work before submitting',
        ],
      },
      {
        num: '03', title: 'Fork, write, and submit', illust: 'setup',
        desc: 'Clone the docs repo, make your changes locally, preview with npm run docs:dev, and open a pull request.',
        items: [
          { name: 'Docs repo', url: 'https://github.com/lnbits/lnbits-docs' },
          { name: 'Open doc issues', url: 'https://github.com/lnbits/lnbits-docs/issues' },
          { name: 'Blog posts wanted', url: 'https://github.com/lnbits/lnbits-docs/issues', badge: 'Content' },
        ],
      },
      {
        num: '04', title: 'Your words help thousands', illust: 'ship',
        desc: 'Great documentation saves thousands of people from asking the same question.',
        items: [
          { name: 'Open doc issues', url: 'https://github.com/lnbits/lnbits-docs/issues', badge: 'Pick one' },
          { name: 'Write a blog post', url: 'https://github.com/lnbits/lnbits-docs/issues', badge: 'Content' },
          { name: 'LLM integration docs', url: '/llm/', badge: 'AI-ready' },
        ],
        action: { label: 'Pick a doc issue', url: 'https://github.com/lnbits/lnbits-docs/issues' },
      },
    ],
  },
  designer: {
    video: null,
    steps: [
      {
        num: '01', title: 'Explore the current UI', illust: 'browse',
        desc: 'LNbits uses Quasar (a Vue 3 component framework) for its UI. Try the app, install some extensions, and note what feels clunky or unclear.',
        items: [
          { name: 'LNbits SaaS', url: 'https://saas.lnbits.com', badge: 'Try it live' },
          { name: 'Extensions gallery', url: '/extensions/' },
          { name: 'Quasar components', url: 'https://quasar.dev/vue-components', badge: 'UI library' },
          { name: 'Frontend patterns', url: '/dev/building-extensions', badge: 'Vue + Quasar' },
        ],
      },
      {
        num: '02', title: 'Know where design matters most', illust: 'tips',
        desc: 'These are the areas where your design skills will have the biggest impact.',
        tips: [
          'The admin dashboard and extension install flow get the most user feedback',
          'Mobile experience is critical - many merchants use LNbits on phones',
          'Propose mockups as GitHub issues before writing code',
          'Icons, illustrations, and diagrams are always needed',
          'Dark mode is the default - design for dark first, then light',
        ],
      },
      {
        num: '03', title: 'Share your work', illust: 'setup',
        desc: 'Contribute Figma files, screenshots, CSS pull requests, or even a sketch photographed and posted to an issue. Any format helps.',
        items: [
          { name: 'LNbits repo', url: 'https://github.com/lnbits/lnbits' },
          { name: 'Docs repo', url: 'https://github.com/lnbits/lnbits-docs' },
          { name: 'Open UX issues', url: 'https://github.com/lnbits/lnbits/issues?q=is%3Aissue+is%3Aopen+label%3Adesign', badge: 'Needs design' },
        ],
      },
      {
        num: '04', title: 'Design for everyone', illust: 'ship',
        desc: 'Good design removes barriers. When LNbits is easy to use, more people adopt Lightning.',
        items: [
          { name: 'Open UX issues', url: 'https://github.com/lnbits/lnbits/issues?q=is%3Aissue+is%3Aopen+label%3Adesign', badge: 'Needs design' },
          { name: 'LNbits repo', url: 'https://github.com/lnbits/lnbits' },
          { name: 'Share ideas on Telegram', url: 'https://t.me/lnbits' },
        ],
        action: { label: 'Browse design issues', url: 'https://github.com/lnbits/lnbits/issues?q=is%3Aissue+is%3Aopen+label%3Adesign' },
      },
    ],
  },
  entrepreneur: {
    video: null,
    steps: [
      {
        num: '01', title: 'Understand the platform', illust: 'browse',
        desc: 'LNbits is not just a wallet - it is a platform you can build products on. Its REST API, extension system, and multi-user architecture make it a foundation for Lightning-powered businesses.',
        items: [
          { name: 'What is LNbits?', url: '/guide/what-is-lnbits' },
          { name: 'API quick reference', url: '/api/quick-reference', badge: 'All endpoints' },
          { name: 'Extensions', url: '/extensions/', badge: '60+' },
          { name: 'Fiat payments', url: '/guide/core/fiat-payments', badge: 'Stripe + PayPal' },
        ],
      },
      {
        num: '02', title: 'Pick a business model', illust: 'tips',
        desc: 'Entrepreneurs are already building on LNbits. Here are proven models.',
        tips: [
          'Host LNbits as a managed service and charge a monthly fee (like LNbits SaaS)',
          'Build a paid extension and list it in the registry with pay-to-install',
          'Package TPoS + Boltcards + SplitPayments into a turnkey merchant solution',
          'White-label LNbits under your own brand for a specific industry or region',
          'Offer consulting: help businesses integrate Lightning payments via the LNbits API',
        ],
      },
      {
        num: '03', title: 'Launch and scale', illust: 'setup',
        desc: 'Start fast with SaaS or go self-hosted for full control. The extension marketplace lets you distribute and monetize your work.',
        items: [
          { name: 'LNbits SaaS', url: 'https://saas.lnbits.com', badge: '3 minutes' },
          { name: 'Docker install', url: '/guide/installation/docker', badge: 'Production' },
          { name: 'Extension monetization', url: '/dev/extensions/monetization' },
          { name: 'Custom marketplace', url: '/dev/extensions/custom-list' },
        ],
      },
      {
        num: '04', title: 'Grow with the ecosystem', illust: 'ship',
        desc: 'Your product strengthens LNbits, and a stronger LNbits grows your market. The ecosystem scales together.',
        items: [
          { name: 'LNbits SaaS', url: 'https://saas.lnbits.com', badge: 'Launch fast' },
          { name: 'Extension monetization', url: '/dev/extensions/monetization', badge: 'Earn sats' },
          { name: 'Share your story on Telegram', url: 'https://t.me/lnbits' },
          { name: 'GitHub Discussions', url: 'https://github.com/lnbits/lnbits/discussions' },
        ],
        action: { label: 'Get started', url: 'https://saas.lnbits.com' },
      },
    ],
  },
  ambassador: {
    video: { id: 'Pe0YXHawHvQ', title: 'NFC BoltCard Setup with LNbits' },
    steps: [
      {
        num: '01', title: 'Deploy for your community', illust: 'setup',
        desc: 'Get LNbits running for your local community. SaaS is the fastest path; self-host for full sovereignty.',
        items: [
          { name: 'LNbits SaaS', url: 'https://saas.lnbits.com', badge: '3 minutes' },
          { name: 'Installation guide', url: '/guide/installation/', badge: 'Self-host' },
          { name: 'Docker install', url: '/guide/installation/docker', badge: 'Production' },
          { name: 'Fly.io', url: '/guide/installation/flyio', badge: 'Cloud' },
        ],
      },
      {
        num: '02', title: 'Onboard merchants', illust: 'browse',
        desc: 'LNbits gives merchants everything they need: point of sale, NFC cards, static QR codes, and tipping. Set up a wallet for each merchant and get them accepting Lightning.',
        items: [
          { name: 'TPoS', url: '/extensions/tpos/', badge: 'Point of Sale' },
          { name: 'Bolt Cards', url: '/extensions/boltcards/', badge: 'NFC tap-to-pay' },
          { name: 'LNURLp', url: '/extensions/lnurlp/', badge: 'Static QR codes' },
          { name: 'SatsPay', url: '/extensions/satspay/', badge: 'Payment pages' },
          { name: 'Browse all extensions', url: '/extensions/' },
        ],
      },
      {
        num: '03', title: 'Build your local network', illust: 'tips',
        desc: 'Connect with other ambassadors and grow Lightning adoption in your area.',
        tips: [
          'Run a workshop at your local Bitcoin meetup',
          'Document your deployment and share it as a case study or blog post',
          'Help merchants troubleshoot - you are their first line of support',
          'Connect with other ambassadors on Telegram to share what works',
          'Share your story on X and Nostr to inspire other communities',
        ],
      },
      {
        num: '04', title: 'Spread the word', illust: 'ship',
        desc: 'Every merchant you onboard and every meetup you host brings Lightning closer to everyday life.',
        items: [
          { name: 'Installation guide', url: '/guide/installation/', badge: 'Deploy' },
          { name: 'Share on X', url: 'https://x.com/intent/tweet?text=I%27m+onboarding+merchants+to+Lightning+with+%40lnbits' },
          { name: 'Telegram community', url: 'https://t.me/lnbits' },
          { name: 'GitHub Discussions', url: 'https://github.com/lnbits/lnbits/discussions' },
        ],
        action: { label: 'Get started', url: '/guide/installation/' },
      },
    ],
  },
}

const active = computed(() => roleData[activeRole.value])
const contribRow1 = computed(() => contributors.value.filter((_, i) => i % 2 === 0))
const contribRow2 = computed(() => contributors.value.filter((_, i) => i % 2 === 1))

function playVideo(id) { activeVideos.add(id) }

function selectRole(id) {
  activeRole.value = id
  activeVideos.clear()
  history.replaceState(null, '', `#${id}`)
  nextTick(() => {
    const firstStep = document.querySelector('.cp-step')
    if (firstStep) firstStep.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

function onHashChange() {
  const hash = window.location.hash.slice(1)
  if (roleIds.includes(hash) && hash !== activeRole.value) {
    activeRole.value = hash
    activeVideos.clear()
  }
}

function toggleFaq(i) { faqItems.value[i].open = !faqItems.value[i].open }


function isExt(url) { return url.startsWith('http') }

async function fetchContributors() {
  const all = []
  for (let page = 1; page <= 5; page++) {
    try {
      const res = await fetch(
        `https://api.github.com/repos/lnbits/lnbits/contributors?per_page=100&page=${page}`,
        { headers: { Accept: 'application/vnd.github.v3+json' } }
      )
      if (!res.ok) break
      const data = await res.json()
      if (!data.length) break
      all.push(...data.filter(c => c.type === 'User'))
    } catch { break }
  }
  contributors.value = all
}

onMounted(() => {
  document.body.classList.add('hide-vp-footer', 'hide-vp-nav')
  document.body.classList.remove('has-section-bar')
  mounted.value = true
  const hash = window.location.hash.slice(1)
  if (roleIds.includes(hash)) activeRole.value = hash
  window.addEventListener('hashchange', onHashChange)
  fetchContributors()
})

onUnmounted(() => {
  document.body.classList.remove('hide-vp-footer', 'hide-vp-nav')
  window.removeEventListener('hashchange', onHashChange)
})
</script>

<template>
  <div class="cp" :class="{ 'is-mounted': mounted }">

    <!-- ── Custom Nav ── -->
    <header class="cp-nav">
      <div class="cp-nav-inner cp-w">
        <a href="/" class="cp-nav-logo">
          <img src="/logos/lnbits.svg" alt="LNbits" width="28" height="28" />
          <span>Contribute</span>
        </a>
        <div class="cp-nav-right">
          <a href="/guide/" class="cp-nav-link">Back to docs</a>
          <VPSwitchAppearance />
          <a href="https://github.com/lnbits/lnbits" target="_blank" rel="noopener noreferrer" class="cp-nav-icon" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </div>
    </header>

    <!-- ── Hero ── -->
    <section class="cp-hero cp-anim" style="--d:0s">
      <div class="cp-glow"></div>
      <div class="cp-w">
        <h1 class="cp-title">Start contributing to <span class="cp-accent">LNbits</span></h1>
        <p class="cp-sub">Find a task matching your skillset and make a difference. Every contribution matters - from a one-line fix to onboarding a whole community.</p>
      </div>
    </section>

    <!-- ── Contributors Carousel ── -->
    <section v-if="contributors.length" class="cp-contributors cp-anim" style="--d:0.08s">
      <div class="cp-w">
        <p class="cp-contrib-label">Built with the help of <strong>{{ contributors.length }}</strong> contributors</p>
      <div class="cp-carousel-wrap">
        <div class="cp-carousel cp-carousel--left">
          <div class="cp-carousel-track">
            <a v-for="c in contribRow1" :key="c.id" :href="c.html_url" target="_blank" rel="noopener noreferrer" class="cp-avatar" :title="c.login">
              <img :src="`${c.avatar_url}&s=80`" :alt="c.login" width="40" height="40" loading="lazy" />
            </a>
            <a v-for="c in contribRow1" :key="'d' + c.id" :href="c.html_url" target="_blank" rel="noopener noreferrer" class="cp-avatar" :title="c.login" aria-hidden="true">
              <img :src="`${c.avatar_url}&s=80`" :alt="c.login" width="40" height="40" loading="lazy" />
            </a>
          </div>
        </div>
        <div class="cp-carousel cp-carousel--right">
          <div class="cp-carousel-track">
            <a v-for="c in contribRow2" :key="c.id" :href="c.html_url" target="_blank" rel="noopener noreferrer" class="cp-avatar" :title="c.login">
              <img :src="`${c.avatar_url}&s=80`" :alt="c.login" width="40" height="40" loading="lazy" />
            </a>
            <a v-for="c in contribRow2" :key="'d' + c.id" :href="c.html_url" target="_blank" rel="noopener noreferrer" class="cp-avatar" :title="c.login" aria-hidden="true">
              <img :src="`${c.avatar_url}&s=80`" :alt="c.login" width="40" height="40" loading="lazy" />
            </a>
          </div>
        </div>
      </div>
      </div>
    </section>

    <!-- ── Role Cards ── -->
    <section class="cp-roles cp-anim" style="--d:0.1s">
      <div class="cp-w">
        <div class="cp-roles-grid">
          <button
            v-for="role in roles"
            :key="role.id"
            class="cp-role"
            :class="{ 'cp-role--on': activeRole === role.id }"
            @click="selectRole(role.id)"
          >
            <div class="cp-role-svg">
              <!-- Developer: IDE with syntax-highlighted code -->
              <svg v-if="role.id==='developer'" viewBox="0 0 240 160" fill="none">
                <rect x="28" y="10" width="184" height="140" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
                <rect x="28" y="10" width="184" height="22" rx="10" fill="var(--vp-c-bg-alt)"/>
                <rect x="28" y="22" width="184" height="10" fill="var(--vp-c-bg-alt)"/>
                <circle cx="44" cy="21" r="3.5" fill="#ff5f57" opacity="0.55"/><circle cx="55" cy="21" r="3.5" fill="#febc2e" opacity="0.55"/><circle cx="66" cy="21" r="3.5" fill="#28c840" opacity="0.55"/>
                <!-- Sidebar file tree -->
                <rect x="28" y="32" width="48" height="118" fill="var(--vp-c-bg-alt)" rx="0"/>
                <line x1="76" y1="32" x2="76" y2="150" stroke="var(--vp-c-divider)" stroke-width="1"/>
                <rect x="36" y="42" width="32" height="2.5" rx="1" fill="var(--vp-c-text-3)" opacity=".25"/>
                <rect x="40" y="50" width="28" height="2" rx="1" fill="var(--vp-c-brand-1)" opacity=".3"/>
                <rect x="40" y="56" width="24" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".15"/>
                <rect x="40" y="62" width="26" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".15"/>
                <rect x="36" y="72" width="30" height="2.5" rx="1" fill="var(--vp-c-text-3)" opacity=".25"/>
                <rect x="40" y="80" width="22" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".15"/>
                <!-- Code editor area -->
                <rect x="86" y="42" width="16" height="3" rx="1.5" fill="var(--vp-c-brand-1)" opacity=".35"/>
                <rect x="106" y="42" width="40" height="3" rx="1.5" fill="var(--vp-c-text-3)" opacity=".3"/>
                <rect x="94" y="52" width="24" height="2.5" rx="1" fill="var(--vp-c-text-3)" opacity=".35"/>
                <rect x="122" y="52" width="52" height="2.5" rx="1" fill="var(--vp-c-text-3)" opacity=".25"/>
                <rect x="94" y="62" width="40" height="2.5" rx="1" fill="var(--vp-c-text-3)" opacity=".3"/>
                <rect x="138" y="62" width="30" height="2.5" rx="1" fill="var(--vp-c-brand-1)" opacity=".2"/>
                <rect x="94" y="72" width="55" height="2.5" rx="1" fill="var(--vp-c-text-3)" opacity=".25"/>
                <rect x="86" y="82" width="20" height="2.5" rx="1" fill="var(--vp-c-brand-1)" opacity=".25"/>
                <rect x="110" y="82" width="45" height="2.5" rx="1" fill="var(--vp-c-text-3)" opacity=".2"/>
                <rect x="94" y="92" width="60" height="2.5" rx="1" fill="var(--vp-c-text-3)" opacity=".2"/>
                <rect x="94" y="102" width="35" height="2.5" rx="1" fill="var(--vp-c-text-3)" opacity=".15"/>
                <rect x="86" y="112" width="14" height="2.5" rx="1" fill="var(--vp-c-brand-1)" opacity=".2"/>
                <!-- Bottom status bar -->
                <rect x="28" y="140" width="184" height="10" rx="0" fill="var(--vp-c-bg-alt)"/>
                <rect x="28" y="140" width="184" height="10" rx="0" fill="var(--vp-c-brand-1)" opacity=".06"/>
                <rect x="36" y="143" width="20" height="4" rx="2" fill="var(--vp-c-brand-1)" opacity=".2"/>
              </svg>
              <!-- Tester: clipboard with check/cross results -->
              <svg v-if="role.id==='tester'" viewBox="0 0 240 160" fill="none">
                <!-- Clipboard body -->
                <rect x="55" y="22" width="130" height="128" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
                <!-- Clipboard clip -->
                <rect x="98" y="14" width="44" height="16" rx="4" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
                <rect x="108" y="18" width="24" height="8" rx="3" fill="var(--vp-c-divider)"/>
                <!-- Row 1: pass -->
                <circle cx="78" cy="52" r="8" fill="#28c840" opacity=".12"/><path d="M74 52l3 3 6-6" stroke="#28c840" stroke-width="1.8" opacity=".6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="96" y="49" width="70" height="3" rx="1.5" fill="var(--vp-c-text-3)" opacity=".35"/>
                <rect x="96" y="56" width="45" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".2"/>
                <!-- Row 2: pass -->
                <circle cx="78" cy="80" r="8" fill="#28c840" opacity=".12"/><path d="M74 80l3 3 6-6" stroke="#28c840" stroke-width="1.8" opacity=".6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="96" y="77" width="60" height="3" rx="1.5" fill="var(--vp-c-text-3)" opacity=".35"/>
                <rect x="96" y="84" width="50" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".2"/>
                <!-- Row 3: fail -->
                <circle cx="78" cy="108" r="8" fill="#ff5f57" opacity=".1"/><path d="M74 104l8 8m0-8l-8 8" stroke="#ff5f57" stroke-width="1.8" opacity=".5" fill="none" stroke-linecap="round"/>
                <rect x="96" y="105" width="55" height="3" rx="1.5" fill="var(--vp-c-text-3)" opacity=".35"/>
                <rect x="96" y="112" width="40" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".2"/>
                <!-- Row 4: pending -->
                <circle cx="78" cy="136" r="8" stroke="var(--vp-c-divider)" stroke-width="1.5" fill="none"/>
                <rect x="96" y="133" width="48" height="3" rx="1.5" fill="var(--vp-c-text-3)" opacity=".25"/>
              </svg>
              <!-- Writer: open book with pen -->
              <svg v-if="role.id==='writer'" viewBox="0 0 240 160" fill="none">
                <!-- Left page -->
                <path d="M120 20v120c-30-5-55-5-80 0V20c25-5 50-5 80 0z" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
                <!-- Right page -->
                <path d="M120 20v120c30-5 55-5 80 0V20c-25-5-50-5-80 0z" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
                <!-- Spine -->
                <line x1="120" y1="20" x2="120" y2="140" stroke="var(--vp-c-divider)" stroke-width="1"/>
                <!-- Left page content -->
                <rect x="52" y="36" width="38" height="3.5" rx="1.5" fill="var(--vp-c-brand-1)" opacity=".3"/>
                <rect x="52" y="48" width="58" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".3"/>
                <rect x="52" y="55" width="50" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".25"/>
                <rect x="52" y="62" width="55" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".2"/>
                <rect x="52" y="69" width="42" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".18"/>
                <rect x="52" y="82" width="58" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".2"/>
                <rect x="52" y="89" width="48" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".18"/>
                <rect x="52" y="96" width="53" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".15"/>
                <!-- Right page content -->
                <rect x="130" y="36" width="30" height="3.5" rx="1.5" fill="var(--vp-c-brand-1)" opacity=".25"/>
                <rect x="130" y="48" width="55" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".25"/>
                <rect x="130" y="55" width="48" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".2"/>
                <rect x="130" y="62" width="52" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".18"/>
                <rect x="130" y="69" width="40" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".15"/>
                <!-- Pen resting on book -->
                <g transform="translate(180, 85) rotate(-50)"><rect x="-2.5" y="0" width="5" height="45" rx="2" fill="var(--vp-c-text-3)" opacity=".2"/><polygon points="-2.5,45 2.5,45 0,52" fill="var(--vp-c-brand-1)" opacity=".35"/><rect x="-2.5" y="0" width="5" height="7" rx="1.5" fill="var(--vp-c-brand-1)" opacity=".15"/></g>
              </svg>
              <!-- Designer: artboard with layers panel -->
              <svg v-if="role.id==='designer'" viewBox="0 0 240 160" fill="none">
                <!-- Main canvas -->
                <rect x="35" y="14" width="140" height="132" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
                <!-- Grid lines -->
                <g opacity="0.05" stroke="var(--vp-c-text-3)" stroke-width="0.5"><line x1="70" y1="14" x2="70" y2="146"/><line x1="105" y1="14" x2="105" y2="146"/><line x1="140" y1="14" x2="140" y2="146"/><line x1="35" y1="50" x2="175" y2="50"/><line x1="35" y1="85" x2="175" y2="85"/><line x1="35" y1="120" x2="175" y2="120"/></g>
                <!-- Shapes on canvas -->
                <rect x="55" y="35" width="50" height="35" rx="4" stroke="var(--vp-c-brand-1)" stroke-width="1.8" opacity=".4" fill="var(--vp-c-brand-1)" fill-opacity=".04"/>
                <circle cx="140" cy="50" r="18" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".3" fill="var(--vp-c-brand-1)" fill-opacity=".03"/>
                <polygon points="75,125 105,88 135,125" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".25" fill="var(--vp-c-brand-1)" fill-opacity=".03"/>
                <!-- Selection handles on rectangle -->
                <circle cx="55" cy="35" r="2.5" fill="var(--vp-c-brand-1)" opacity=".4"/><circle cx="105" cy="35" r="2.5" fill="var(--vp-c-brand-1)" opacity=".4"/><circle cx="55" cy="70" r="2.5" fill="var(--vp-c-brand-1)" opacity=".4"/><circle cx="105" cy="70" r="2.5" fill="var(--vp-c-brand-1)" opacity=".4"/>
                <!-- Layers panel -->
                <rect x="185" y="30" width="40" height="90" rx="5" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" stroke-width="1"/>
                <rect x="190" y="38" width="30" height="4" rx="2" fill="var(--vp-c-brand-1)" opacity=".2"/>
                <rect x="190" y="48" width="30" height="14" rx="2" fill="var(--vp-c-brand-1)" fill-opacity=".08" stroke="var(--vp-c-brand-1)" stroke-width="0.8" stroke-opacity=".3"/>
                <rect x="190" y="66" width="30" height="14" rx="2" fill="none" stroke="var(--vp-c-divider)" stroke-width="0.8"/>
                <rect x="190" y="84" width="30" height="14" rx="2" fill="none" stroke="var(--vp-c-divider)" stroke-width="0.8"/>
                <!-- Color palette row -->
                <circle cx="55" cy="138" r="4" fill="#ff5f57" opacity="0.4"/><circle cx="67" cy="138" r="4" fill="#febc2e" opacity="0.4"/><circle cx="79" cy="138" r="4" fill="#28c840" opacity="0.4"/><circle cx="91" cy="138" r="4" fill="var(--vp-c-brand-1)" opacity="0.3"/><circle cx="103" cy="138" r="4" fill="var(--vp-c-text-3)" opacity="0.25"/>
              </svg>
              <!-- Entrepreneur: dashboard with chart and metrics -->
              <svg v-if="role.id==='entrepreneur'" viewBox="0 0 240 160" fill="none">
                <!-- Dashboard frame -->
                <rect x="25" y="14" width="190" height="132" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
                <!-- Top metrics row -->
                <rect x="35" y="24" width="55" height="32" rx="5" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="0.8"/>
                <rect x="42" y="30" width="20" height="3" rx="1.5" fill="var(--vp-c-text-3)" opacity=".3"/>
                <rect x="42" y="38" width="35" height="5" rx="2" fill="var(--vp-c-brand-1)" opacity=".3"/>
                <rect x="42" y="47" width="16" height="2.5" rx="1" fill="#28c840" opacity=".35"/>
                <rect x="97" y="24" width="55" height="32" rx="5" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="0.8"/>
                <rect x="104" y="30" width="22" height="3" rx="1.5" fill="var(--vp-c-text-3)" opacity=".3"/>
                <rect x="104" y="38" width="30" height="5" rx="2" fill="var(--vp-c-brand-1)" opacity=".25"/>
                <rect x="104" y="47" width="18" height="2.5" rx="1" fill="#28c840" opacity=".3"/>
                <rect x="159" y="24" width="50" height="32" rx="5" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="0.8"/>
                <rect x="166" y="30" width="18" height="3" rx="1.5" fill="var(--vp-c-text-3)" opacity=".3"/>
                <rect x="166" y="38" width="28" height="5" rx="2" fill="var(--vp-c-brand-1)" opacity=".2"/>
                <rect x="166" y="47" width="14" height="2.5" rx="1" fill="var(--vp-c-text-3)" opacity=".2"/>
                <!-- Chart area -->
                <rect x="35" y="64" width="120" height="72" rx="5" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="0.8"/>
                <!-- Chart grid -->
                <g opacity=".06" stroke="var(--vp-c-text-3)" stroke-width="0.5"><line x1="35" y1="80" x2="155" y2="80"/><line x1="35" y1="96" x2="155" y2="96"/><line x1="35" y1="112" x2="155" y2="112"/></g>
                <!-- Chart line -->
                <polyline points="45,120 60,110 75,112 90,98 105,88 120,82 135,76 148,68" stroke="var(--vp-c-brand-1)" stroke-width="2" opacity=".45" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                <!-- Chart area fill -->
                <path d="M45,120 60,110 75,112 90,98 105,88 120,82 135,76 148,68 148,130 45,130z" fill="var(--vp-c-brand-1)" opacity=".05"/>
                <circle cx="148" cy="68" r="3.5" fill="var(--vp-c-brand-1)" opacity=".4"/>
                <!-- Side list -->
                <rect x="163" y="64" width="46" height="72" rx="5" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="0.8"/>
                <rect x="170" y="72" width="32" height="3" rx="1.5" fill="var(--vp-c-text-3)" opacity=".25"/>
                <rect x="170" y="82" width="28" height="2.5" rx="1" fill="var(--vp-c-text-3)" opacity=".18"/>
                <rect x="170" y="92" width="30" height="2.5" rx="1" fill="var(--vp-c-text-3)" opacity=".15"/>
                <rect x="170" y="102" width="25" height="2.5" rx="1" fill="var(--vp-c-text-3)" opacity=".12"/>
                <rect x="170" y="112" width="28" height="2.5" rx="1" fill="var(--vp-c-text-3)" opacity=".1"/>
              </svg>
              <!-- Ambassador: world map with pins -->
              <svg v-if="role.id==='ambassador'" viewBox="0 0 240 160" fill="none">
                <!-- Globe -->
                <circle cx="120" cy="80" r="58" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" stroke-width="2"/>
                <!-- Latitude lines -->
                <ellipse cx="120" cy="50" rx="52" ry="8" stroke="var(--vp-c-divider)" stroke-width="0.6" fill="none"/>
                <ellipse cx="120" cy="80" rx="58" ry="14" stroke="var(--vp-c-divider)" stroke-width="0.8" fill="none"/>
                <ellipse cx="120" cy="110" rx="52" ry="8" stroke="var(--vp-c-divider)" stroke-width="0.6" fill="none"/>
                <!-- Longitude lines -->
                <ellipse cx="120" cy="80" rx="20" ry="58" stroke="var(--vp-c-divider)" stroke-width="0.7" fill="none"/>
                <ellipse cx="120" cy="80" rx="42" ry="58" stroke="var(--vp-c-divider)" stroke-width="0.5" fill="none"/>
                <!-- Location pins -->
                <g><!-- Pin 1 --><circle cx="92" cy="58" r="5" fill="var(--vp-c-brand-1)" opacity=".15"/><circle cx="92" cy="58" r="2.5" fill="var(--vp-c-brand-1)" opacity=".5"/></g>
                <g><!-- Pin 2 --><circle cx="150" cy="68" r="5" fill="var(--vp-c-brand-1)" opacity=".15"/><circle cx="150" cy="68" r="2.5" fill="var(--vp-c-brand-1)" opacity=".5"/></g>
                <g><!-- Pin 3 --><circle cx="110" cy="98" r="5" fill="var(--vp-c-brand-1)" opacity=".15"/><circle cx="110" cy="98" r="2.5" fill="var(--vp-c-brand-1)" opacity=".5"/></g>
                <g><!-- Pin 4 --><circle cx="138" cy="48" r="4" fill="var(--vp-c-brand-1)" opacity=".1"/><circle cx="138" cy="48" r="2" fill="var(--vp-c-brand-1)" opacity=".4"/></g>
                <g><!-- Pin 5 --><circle cx="78" cy="85" r="4" fill="var(--vp-c-brand-1)" opacity=".1"/><circle cx="78" cy="85" r="2" fill="var(--vp-c-brand-1)" opacity=".4"/></g>
                <!-- Connection lines between pins -->
                <line x1="93" y1="59" x2="149" y2="67" stroke="var(--vp-c-brand-1)" stroke-width="0.8" opacity="0.12"/>
                <line x1="93" y1="59" x2="111" y2="97" stroke="var(--vp-c-brand-1)" stroke-width="0.8" opacity="0.1"/>
                <line x1="149" y1="69" x2="111" y2="97" stroke="var(--vp-c-brand-1)" stroke-width="0.8" opacity="0.1"/>
              </svg>
            </div>
            <span class="cp-role-name">{{ role.title }}</span>
            <span class="cp-role-tag">{{ role.tagline }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- ── Steps (transitions per role) ── -->
    <Transition name="cp-fade" mode="out-in">
      <div :key="activeRole" class="cp-flow">

        <!-- Video -->
        <section v-if="active.video" class="cp-vid-sec">
          <div class="cp-w">
            <div class="cp-vid" @click="playVideo(active.video.id)">
              <iframe v-if="activeVideos.has(active.video.id)" :src="`https://www.youtube-nocookie.com/embed/${active.video.id}?autoplay=1`" :title="active.video.title" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              <template v-else>
                <img :src="`https://img.youtube.com/vi/${active.video.id}/maxresdefault.jpg`" :alt="active.video.title" class="cp-vid-thumb" loading="lazy"/>
                <button class="cp-vid-play" :aria-label="`Play ${active.video.title}`"><svg viewBox="0 0 68 48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#212121" opacity="0.8"/><path d="M45 24L27 14v20" fill="#fff"/></svg></button>
              </template>
            </div>
            <p class="cp-vid-cap">{{ active.video.title }}</p>
          </div>
        </section>

        <!-- Steps 01-04, alternating left/right -->
        <div
          v-for="(step, i) in active.steps"
          :key="step.num"
          class="cp-step"
        >
          <div class="cp-step-line"></div>
          <div class="cp-w cp-step-row" :class="{ 'cp-step-row--alt': i % 2 !== 0 }">

            <!-- Content side -->
            <div class="cp-step-content">
              <!-- Link items -->
              <template v-if="step.items">
                <a
                  v-for="item in step.items" :key="item.name"
                  :href="item.url"
                  class="cp-row"
                  :target="isExt(item.url) ? '_blank' : undefined"
                  :rel="isExt(item.url) ? 'noopener noreferrer' : undefined"
                >
                  <svg class="cp-row-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><path d="M12 5v2m0 10v2M5 12h2m10 0h2"/></svg>
                  <span class="cp-row-text">{{ item.name }}</span>
                  <span v-if="item.badge" class="cp-row-badge">{{ item.badge }}</span>
                  <svg class="cp-row-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                </a>
              </template>

              <!-- Tip items (simple list) -->
              <template v-if="step.tips">
                <div v-for="t in step.tips" :key="t" class="cp-row cp-row--tip">
                  <svg class="cp-row-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  <span class="cp-row-text">{{ t }}</span>
                </div>
              </template>

              <!-- Tip groups (labeled sections) -->
              <template v-if="step.tipGroups">
                <div v-for="group in step.tipGroups" :key="group.label" class="cp-tip-group">
                  <span class="cp-tip-group-label">{{ group.label }}</span>
                  <div v-for="t in group.tips" :key="t" class="cp-row cp-row--tip">
                    <svg class="cp-row-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    <span class="cp-row-text">{{ t }}</span>
                  </div>
                </div>
              </template>

              <!-- Action (CTA step) -->
              <div v-if="step.action" class="cp-step-action">
                <a :href="step.action.url" class="cp-cta-btn" :target="isExt(step.action.url) ? '_blank' : undefined" :rel="isExt(step.action.url) ? 'noopener noreferrer' : undefined">
                  {{ step.action.label }}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>

            <!-- Info side -->
            <div class="cp-step-info">
              <div class="cp-step-illust">
                <!-- Setup: terminal window -->
                <svg v-if="step.illust==='setup'" viewBox="0 0 120 90" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="6" y="6" width="108" height="78" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
                  <rect x="6" y="6" width="108" height="16" rx="8" fill="var(--vp-c-bg-alt)"/>
                  <rect x="6" y="14" width="108" height="8" fill="var(--vp-c-bg-alt)"/>
                  <circle cx="16" cy="14" r="2.5" fill="#ff5f57" opacity=".45"/><circle cx="24" cy="14" r="2.5" fill="#febc2e" opacity=".45"/><circle cx="32" cy="14" r="2.5" fill="#28c840" opacity=".45"/>
                  <path d="M20 36l8 7-8 7" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".45" fill="none"/>
                  <rect x="36" y="41" width="28" height="2.5" rx="1" fill="var(--vp-c-brand-1)" opacity=".2"/>
                  <rect x="20" y="56" width="50" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".2"/>
                  <rect x="20" y="64" width="38" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".15"/>
                  <rect x="20" y="72" width="44" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".12"/>
                </svg>
                <!-- Browse: search with results -->
                <svg v-if="step.illust==='browse'" viewBox="0 0 120 90" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="46" cy="36" r="22" stroke="var(--vp-c-brand-1)" stroke-width="1.8" opacity=".35" fill="var(--vp-c-brand-1)" fill-opacity=".03"/>
                  <line x1="62" y1="52" x2="78" y2="68" stroke="var(--vp-c-brand-1)" stroke-width="3" opacity=".25"/>
                  <rect x="38" y="30" width="16" height="2.5" rx="1" fill="var(--vp-c-brand-1)" opacity=".2"/>
                  <rect x="36" y="36" width="20" height="2" rx="1" fill="var(--vp-c-text-3)" opacity=".15"/>
                  <rect x="82" y="22" width="32" height="8" rx="3" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" stroke-width="0.8"/>
                  <rect x="82" y="34" width="32" height="8" rx="3" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" stroke-width="0.8"/>
                  <rect x="82" y="46" width="32" height="8" rx="3" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" stroke-width="0.8"/>
                </svg>
                <!-- Tips: checklist -->
                <svg v-if="step.illust==='tips'" viewBox="0 0 120 90" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="16" y="8" width="88" height="74" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
                  <path d="M28 28l3 3 6-6" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".5" fill="none"/>
                  <rect x="44" y="26" width="44" height="2.5" rx="1" fill="var(--vp-c-text-3)" opacity=".3"/>
                  <path d="M28 46l3 3 6-6" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".4" fill="none"/>
                  <rect x="44" y="44" width="38" height="2.5" rx="1" fill="var(--vp-c-text-3)" opacity=".25"/>
                  <rect x="26" y="60" width="10" height="10" rx="2" stroke="var(--vp-c-divider)" stroke-width="1.2" fill="none"/>
                  <rect x="44" y="62" width="42" height="2.5" rx="1" fill="var(--vp-c-text-3)" opacity=".2"/>
                </svg>
                <!-- Ship: rocket launch -->
                <svg v-if="step.illust==='ship'" viewBox="0 0 120 90" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M60 12c-5 12-8 26-8 42h16c0-16-3-30-8-42z" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".4"/>
                  <circle cx="60" cy="32" r="4" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".3" fill="var(--vp-c-bg-alt)"/>
                  <path d="M52 50l-8 12h8z" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".2" fill="none"/>
                  <path d="M68 50l8 12h-8z" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".2" fill="none"/>
                  <path d="M56 58c1.5 5 3 9 4 12 1-3 2.5-7 4-12" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".2" fill="none"/>
                  <g opacity=".1"><circle cx="30" cy="25" r="1.5" fill="var(--vp-c-brand-1)"/><circle cx="90" cy="20" r="1" fill="var(--vp-c-brand-1)"/><circle cx="25" cy="55" r="1" fill="var(--vp-c-brand-1)"/><circle cx="95" cy="50" r="1.5" fill="var(--vp-c-brand-1)"/></g>
                </svg>
              </div>
              <span class="cp-step-num">{{ step.num }}</span>
              <h3 class="cp-step-title">{{ step.title }}</h3>
              <p class="cp-step-desc">{{ step.desc }}</p>
            </div>
          </div>
        </div>

      </div>
    </Transition>

    <!-- ── FAQ ── -->
    <section class="cp-faq">
      <div class="cp-w">
        <h2 class="cp-section-title">Frequently asked questions</h2>
        <div class="cp-faq-list">
          <div v-for="(item, i) in faqItems" :key="i" class="cp-faq-item" :class="{ 'cp-faq-item--open': item.open }">
            <button class="cp-faq-q" @click="toggleFaq(i)">
              <span>{{ item.q }}</span>
              <svg class="cp-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="cp-faq-a">
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Contact ── -->
    <section class="cp-contact">
      <div class="cp-w">
        <h2 class="cp-section-title">Get in touch</h2>
        <p class="cp-contact-sub">Questions, ideas, or just want to say hello? Here is how to reach the LNbits team.</p>
        <div class="cp-contact-grid">
          <a v-for="l in communityLinks" :key="l.name" :href="l.url" target="_blank" rel="noopener noreferrer" class="cp-contact-card">
            <div class="cp-contact-icon">
              <svg v-if="l.icon==='telegram'" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              <svg v-if="l.icon==='github'" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <svg v-if="l.icon==='x'" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              <svg v-if="l.icon==='nostr'" viewBox="46 19 172 192" fill="currentColor"><path d="M210.8 199.4c0 3.1-2.5 5.7-5.7 5.7h-68c-3.1 0-5.7-2.5-5.7-5.7v-15.5c.3-19 2.3-37.2 6.5-45.5 2.5-5 6.7-7.7 11.5-9.1 9.1-2.7 24.9-.9 31.7-1.2 0 0 20.4.8 20.4-10.7s-9.1-8.6-9.1-8.6c-10 .3-17.7-.4-22.6-2.4-8.3-3.3-8.6-9.2-8.6-11.2-.4-23.1-34.5-25.9-64.5-20.1-32.8 6.2.4 53.3.4 116.1v8.4c0 3.1-2.6 5.6-5.7 5.6H57.7c-3.1 0-5.7-2.5-5.7-5.7v-144c0-3.1 2.5-5.7 5.7-5.7h31.7c3.1 0 5.7 2.5 5.7 5.7 0 4.7 5.2 7.2 9 4.5 11.4-8.2 26-12.5 42.4-12.5 36.6 0 64.4 21.4 64.4 68.7v83.2ZM150 99.3c0-6.7-5.4-12.1-12.1-12.1s-12.1 5.4-12.1 12.1 5.4 12.1 12.1 12.1S150 106 150 99.3Z"/></svg>
            </div>
            <strong>{{ l.name }}</strong>
            <span>{{ l.desc }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ── Footer ── -->
    <section class="cp-foot">
      <div class="cp-w cp-foot-inner">
        <p class="cp-foot-tag">Built with <svg class="cp-bolt" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> by contributors around the world</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ═══ Page ═══ */
.cp { background: var(--vp-c-bg); color: var(--vp-c-text-1); min-height: 100vh; }
:global(body.hide-vp-footer .VPFooter) { display: none !important; }
:global(body.hide-vp-nav) { --vp-nav-height: 0px !important; --vp-layout-top-height: 0px !important; }
:global(body.hide-vp-nav .VPNav),
:global(body.hide-vp-nav .VPNavBar),
:global(body.hide-vp-nav .VPLocalNav),
:global(body.hide-vp-nav .VPSidebar),
:global(body.hide-vp-nav .sb) { display: none !important; height: 0 !important; min-height: 0 !important; }
:global(body.hide-vp-nav .VPContent),
:global(body.hide-vp-nav.has-section-bar .VPContent) { padding-top: 0 !important; margin-top: 0 !important; }
.cp-w { max-width: 960px; margin: 0 auto; padding: 0 24px; }

/* ═══ Custom Nav ═══ */
.cp-nav { position: sticky; top: 0; z-index: 100; background: var(--vp-c-bg); backdrop-filter: blur(12px); border-bottom: 1px solid var(--vp-c-divider); }
.cp-nav-inner { display: flex; align-items: center; justify-content: space-between; height: 56px; }
.cp-nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--vp-c-text-1); font-size: 15px; font-weight: 700; }
.cp-nav-logo img { border-radius: 4px; }
.cp-nav-right { display: flex; align-items: center; gap: 16px; }
.cp-nav-link { font-size: 13px; color: var(--vp-c-text-2); text-decoration: none; transition: color .2s; }
.cp-nav-link:hover { color: var(--vp-c-text-1); }
.cp-nav-theme {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; background: none; border: 1px solid var(--vp-c-divider);
  border-radius: 8px; cursor: pointer; color: var(--vp-c-text-2); transition: color .2s, border-color .2s;
}
.cp-nav-theme:hover { color: var(--vp-c-text-1); border-color: #7c4dff; }
.cp-nav-icon { color: var(--vp-c-text-2); transition: color .2s; display: flex; }
.cp-nav-icon:hover { color: var(--vp-c-text-1); }

/* ═══ Entrance ═══ */
.cp-anim { opacity: 0; transform: translateY(20px); transition: opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1); transition-delay: var(--d); }
.is-mounted .cp-anim { opacity: 1; transform: none; }

/* ═══ Hero ═══ */
.cp-hero { position: relative; text-align: center; padding: 80px 0 48px; }
.cp-glow { position: absolute; top: -80px; left: 50%; transform: translateX(-50%); width: 700px; height: 500px; background: radial-gradient(ellipse, var(--vp-c-brand-soft) 0%, transparent 65%); pointer-events: none; z-index: 0; }
.cp-title { font-size: 3rem; font-weight: 800; letter-spacing: -.04em; line-height: 1.15; color: var(--vp-c-text-1); margin: 0 0 16px; position: relative; }
.cp-accent { background: linear-gradient(135deg, #7c4dff, #b39ddb); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.cp-sub { font-size: 1.1rem; color: var(--vp-c-text-2); max-width: 540px; margin: 0 auto; line-height: 1.6; }

/* ═══ Contributors Carousel ═══ */
.cp-contributors { padding: 0 0 56px; overflow: hidden; }
.cp-contrib-label {
  font-size: 13px; color: var(--vp-c-text-3); text-align: center;
  margin: 0 0 24px; font-weight: 500;
}
.cp-contrib-label strong { color: var(--vp-c-text-2); font-weight: 700; }

.cp-carousel-wrap { display: flex; flex-direction: column; gap: 12px; }

.cp-carousel { overflow: hidden; position: relative; }
.cp-carousel::before,
.cp-carousel::after {
  content: ''; position: absolute; top: 0; bottom: 0; width: 120px; z-index: 2; pointer-events: none;
}
.cp-carousel::before { left: 0; background: linear-gradient(to right, var(--vp-c-bg) 10%, transparent); }
.cp-carousel::after { right: 0; background: linear-gradient(to left, var(--vp-c-bg) 10%, transparent); }

.cp-carousel-track {
  display: flex; gap: 8px; width: max-content;
}
.cp-carousel--left .cp-carousel-track { animation: cp-scroll-left 180s linear infinite; }
.cp-carousel--right .cp-carousel-track { animation: cp-scroll-right 195s linear infinite; }
.cp-carousel-wrap:hover .cp-carousel-track { animation-play-state: paused; }

@keyframes cp-scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes cp-scroll-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }

.cp-avatar {
  display: block; flex-shrink: 0; width: 36px; height: 36px;
  border-radius: 50%; overflow: hidden;
  border: 1.5px solid var(--vp-c-divider);
  opacity: .55;
  transition: opacity .3s, border-color .3s, transform .3s;
}
.cp-avatar:hover {
  opacity: 1;
  border-color: var(--vp-c-brand-1);
  transform: scale(1.2);
  z-index: 3;
}
.cp-avatar img {
  width: 100%; height: 100%; display: block; object-fit: cover;
  filter: grayscale(40%);
  transition: filter .3s;
}
.cp-avatar:hover img { filter: grayscale(0%); }

/* ═══ Section titles ═══ */
.cp-section-title { font-size: 24px; font-weight: 700; color: var(--vp-c-text-1); text-align: center; margin: 0 0 12px; letter-spacing: -.02em; }

/* ═══ Role Cards ═══ */
.cp-roles { padding: 0 0 64px; }
.cp-roles-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.cp-role {
  display: flex; flex-direction: column; align-items: flex-start;
  padding: 20px; background: var(--vp-c-bg-elv); border: 1.5px solid var(--vp-c-divider); border-radius: 14px;
  cursor: pointer; text-align: left; color: var(--vp-c-text-1);
  font-family: inherit; font-size: inherit; line-height: inherit;
  -webkit-appearance: none; appearance: none;
  transition: border-color .3s ease, transform .3s ease, box-shadow .3s ease;
}
.cp-role:hover { border-color: var(--vp-c-divider); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,.2); }
.cp-role--on { border-color: #7c4dff; box-shadow: 0 0 0 1px #7c4dff, 0 4px 16px rgba(124,77,255,.1); }
.cp-role--on:hover { border-color: #7c4dff; transform: none; box-shadow: 0 0 0 1px #7c4dff, 0 4px 16px rgba(124,77,255,.1); }
.cp-role-svg { width: 100%; margin-bottom: 14px; }
.cp-role-svg svg { width: 100%; height: auto; }
.cp-role-name { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
.cp-role-tag { font-size: 13px; color: var(--vp-c-text-2); line-height: 1.45; }

/* ═══ Video ═══ */
.cp-vid-sec { padding: 0 0 32px; }
.cp-vid { position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 14px; overflow: hidden; background: #000; border: 1px solid var(--vp-c-divider); cursor: pointer; }
.cp-vid iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
.cp-vid-thumb { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
.cp-vid-play { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 68px; height: 48px; background: none; border: none; cursor: pointer; padding: 0; transition: transform .2s; }
.cp-vid-play svg { width: 100%; height: 100%; }
.cp-vid:hover .cp-vid-play { transform: translate(-50%,-50%) scale(1.1); }
.cp-vid-cap { font-size: 13px; color: var(--vp-c-text-3); text-align: center; margin-top: 14px; }

/* ═══ Steps ═══ */
.cp-flow { padding-bottom: 24px; }
.cp-step { position: relative; }
.cp-step-line { height: 1px; background: linear-gradient(to right, transparent, var(--vp-c-divider) 15%, var(--vp-c-divider) 85%, transparent); }
.cp-step-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: 64px;
  align-items: start; padding: 64px 0;
}
.cp-step-row--alt { direction: rtl; }
.cp-step-row--alt > * { direction: ltr; }
.cp-step-info { padding-top: 0; }
.cp-step-illust { width: 100%; max-width: 160px; margin-bottom: 20px; }
.cp-step-illust svg { width: 100%; height: auto; }
.cp-step-num {
  display: block; font-size: 13px; font-weight: 700;
  color: #7c4dff; opacity: .6; margin-bottom: 14px; letter-spacing: 2px;
}
.cp-step-title { font-size: 24px; font-weight: 700; color: var(--vp-c-text-1); margin: 0 0 12px; letter-spacing: -.02em; line-height: 1.25; }
.cp-step-desc { font-size: 15px; color: var(--vp-c-text-2); line-height: 1.65; margin: 0; }
.cp-step-content { display: flex; flex-direction: column; }
.cp-row {
  display: flex; align-items: center; gap: 12px;
  padding: 15px 20px; border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1); text-decoration: none; transition: background .2s;
}
.cp-row:first-child { border-top: 1px solid var(--vp-c-divider); }
.cp-row:hover { background: var(--vp-c-brand-soft); }
.cp-row-ico { width: 16px; height: 16px; flex-shrink: 0; color: #7c4dff; opacity: .3; }
.cp-row-text { flex: 1; font-size: 14px; font-weight: 500; }
.cp-row-badge { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: .5px; color: var(--vp-c-text-3); }
.cp-row-arr { width: 14px; height: 14px; flex-shrink: 0; color: var(--vp-c-divider); transition: color .2s; }
.cp-row:hover .cp-row-arr { color: #7c4dff; }
.cp-row:hover .cp-row-ico { opacity: .6; }
.cp-row--tip { cursor: default; }
.cp-row--tip:hover { background: transparent; }
.cp-row-check { width: 16px; height: 16px; flex-shrink: 0; color: #7c4dff; opacity: .35; }
.cp-row--tip .cp-row-text { color: var(--vp-c-text-2); }

/* Tip groups */
.cp-tip-group { margin-bottom: 8px; }
.cp-tip-group:last-child { margin-bottom: 0; }
.cp-tip-group-label {
  display: block; font-size: 10px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 1px; color: #7c4dff; opacity: .5; padding: 16px 20px 4px;
}
.cp-tip-group .cp-row:first-child { border-top: none; }

/* Action CTA */
.cp-step-action { padding: 32px 0 0; }
.cp-cta-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 32px; background: #7c4dff; color: #fff; border-radius: 11px;
  font-size: 15px; font-weight: 600; text-decoration: none; white-space: nowrap;
  transition: background .2s, transform .2s, box-shadow .2s;
}
.cp-cta-btn:hover { background: #6a3de8; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,77,255,.25); }

/* ═══ FAQ ═══ */
.cp-faq { padding: 64px 0; border-top: 1px solid var(--vp-c-divider); }
.cp-faq-list { max-width: 720px; margin: 24px auto 0; }
.cp-faq-item { border-bottom: 1px solid var(--vp-c-divider); }
.cp-faq-q {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  width: 100%; padding: 20px 0; background: none; border: none; cursor: pointer;
  font-family: inherit; font-size: 15px; font-weight: 600; color: var(--vp-c-text-1); text-align: left;
}
.cp-faq-q:hover { color: var(--vp-c-text-1); }
.cp-faq-chevron { width: 18px; height: 18px; flex-shrink: 0; color: var(--vp-c-text-3); transition: transform .25s ease; }
.cp-faq-item--open .cp-faq-chevron { transform: rotate(180deg); }
.cp-faq-a {
  max-height: 0; overflow: hidden; transition: max-height .3s ease, padding .3s ease;
}
.cp-faq-item--open .cp-faq-a { max-height: 200px; }
.cp-faq-a p { font-size: 14px; color: var(--vp-c-text-2); line-height: 1.65; margin: 0; padding: 0 0 20px; }

/* ═══ Contact ═══ */
.cp-contact { padding: 0 0 64px; }
.cp-contact-sub { font-size: 14px; color: var(--vp-c-text-2); text-align: center; margin: 0 0 28px; line-height: 1.5; }
.cp-contact-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.cp-contact-card {
  display: flex; flex-direction: column; align-items: center; text-align: center;
  gap: 10px; padding: 28px 16px; background: var(--vp-c-bg-elv); border: 1px solid var(--vp-c-divider);
  border-radius: 14px; text-decoration: none; color: var(--vp-c-text-1);
  transition: border-color .25s, transform .25s;
}
.cp-contact-card:hover { border-color: #7c4dff; transform: translateY(-2px); }
.cp-contact-icon { width: 32px; height: 32px; color: var(--vp-c-text-2); opacity: .7; }
.cp-contact-icon svg { width: 100%; height: 100%; }
.cp-contact-card strong { font-size: 15px; font-weight: 600; }
.cp-contact-card span { font-size: 12px; color: var(--vp-c-text-2); line-height: 1.4; }

/* ═══ Footer ═══ */
.cp-foot { border-top: 1px solid var(--vp-c-divider); padding: 32px 0 48px; }
.cp-foot-inner { text-align: center; }
.cp-foot-tag { font-size: 14px; color: var(--vp-c-text-3); display: flex; align-items: center; justify-content: center; gap: 6px; margin: 0; }
.cp-bolt { width: 16px; height: 16px; color: #7c4dff; }


/* ═══ Transitions ═══ */
.cp-fade-enter-active,.cp-fade-leave-active{transition:opacity .3s ease,transform .3s ease}
.cp-fade-enter-from{opacity:0;transform:translateY(16px)}
.cp-fade-leave-to{opacity:0;transform:translateY(-16px)}

/* ═══ Responsive ═══ */
/* ═══ Tablet (< 900px) ═══ */
@media (max-width: 900px) {
  .cp-title { font-size: 2.2rem; }
  .cp-roles-grid { grid-template-columns: repeat(2, 1fr); }
  .cp-step-row { grid-template-columns: 1fr; gap: 24px; padding: 40px 0; }
  .cp-step-row--alt { direction: ltr; }
  .cp-step-info { order: -1; }
  .cp-contact-grid { grid-template-columns: repeat(2, 1fr); }
}

/* ═══ Phone (< 600px) ═══ */
@media (max-width: 600px) {
  /* Nav */
  .cp-nav-inner { height: 48px; }
  .cp-nav-logo { font-size: 14px; gap: 8px; }
  .cp-nav-logo img { width: 24px; height: 24px; }
  .cp-nav-right { gap: 10px; }
  .cp-nav-link { font-size: 12px; }
  .cp-nav-theme { width: 28px; height: 28px; }

  /* Hero */
  .cp-hero { padding: 48px 0 40px; }
  .cp-title { font-size: 1.6rem; letter-spacing: -.03em; margin-bottom: 12px; }
  .cp-sub { font-size: 0.95rem; max-width: 100%; line-height: 1.7; }

  /* Contributors carousel */
  .cp-contributors { padding: 0 0 32px; }
  .cp-contrib-label { font-size: 12px; margin-bottom: 14px; }
  .cp-carousel-wrap { gap: 8px; }
  .cp-avatar { width: 28px; height: 28px; border-width: 1px; }
  .cp-carousel-track { gap: 5px; }
  .cp-carousel::before, .cp-carousel::after { width: 40px; }

  /* Role cards - 2-col grid, visual focus */
  .cp-roles { padding: 0 0 36px; }
  .cp-roles-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .cp-role { padding: 14px; }
  .cp-role-svg { margin-bottom: 10px; }
  .cp-role-name { font-size: 15px; font-weight: 800; }
  .cp-role-tag { font-size: 11px; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

  /* Video */
  .cp-vid { border-radius: 10px; }
  .cp-vid-cap { font-size: 12px; margin-top: 10px; }
  .cp-vid-play { width: 52px; height: 36px; }

  /* Steps */
  .cp-step-row { padding: 32px 0; gap: 20px; }
  .cp-step-illust { display: none; }
  .cp-step-num { font-size: 11px; margin-bottom: 10px; }
  .cp-step-title { font-size: 19px; margin-bottom: 8px; }
  .cp-step-desc { font-size: 14px; line-height: 1.55; }
  .cp-row { padding: 12px 14px; gap: 10px; }
  .cp-row-text { font-size: 13px; }
  .cp-row-badge { font-size: 9px; }
  .cp-row-ico { width: 14px; height: 14px; }
  .cp-row-arr { width: 12px; height: 12px; }
  .cp-row-check { width: 14px; height: 14px; }
  .cp-row--tip .cp-row-text { font-size: 13px; }
  .cp-tip-group-label { font-size: 9px; padding: 12px 14px 3px; }
  .cp-step-action { padding: 20px 0 0; }
  .cp-cta-btn { padding: 12px 24px; font-size: 14px; border-radius: 9px; width: 100%; justify-content: center; }

  /* Section titles */
  .cp-section-title { font-size: 20px; }

  /* FAQ */
  .cp-faq { padding: 40px 0; }
  .cp-faq-q { padding: 16px 0; font-size: 14px; gap: 12px; }
  .cp-faq-chevron { width: 16px; height: 16px; }
  .cp-faq-a p { font-size: 13px; padding-bottom: 16px; }

  /* Contact */
  .cp-contact { padding: 0 0 40px; }
  .cp-contact-sub { font-size: 13px; margin-bottom: 20px; }
  .cp-contact-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .cp-contact-card { padding: 20px 12px; gap: 8px; }
  .cp-contact-icon { width: 26px; height: 26px; }
  .cp-contact-card strong { font-size: 13px; }
  .cp-contact-card span { font-size: 11px; }

  /* Footer */
  .cp-foot { padding: 24px 0 36px; }
  .cp-foot-tag { font-size: 12px; }
}

/* ═══ Small phone (< 380px) ═══ */
@media (max-width: 380px) {
  .cp-w { padding: 0 16px; }
  .cp-title { font-size: 1.4rem; }
  .cp-roles-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .cp-role { padding: 10px; }
  .cp-role-name { font-size: 13px; }
  .cp-contact-grid { grid-template-columns: 1fr; }
}
</style>
