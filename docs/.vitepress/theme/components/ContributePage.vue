<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'
import VPSwitchAppearance from 'vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue'
import { siYoutube, siReddit } from 'simple-icons'

const { isDark } = useData()
const mounted = ref(false)
const contributors = ref([])
const activeRole = ref('developer')
const activeVideos = reactive(new Set())
const roleIds = ['developer', 'tester', 'writer', 'designer', 'entrepreneur', 'ambassador']

const roles = [
  { id: 'developer', title: 'Developer', tagline: 'Fix bugs, build features, get your code merged.' },
  { id: 'tester', title: 'Tester', tagline: 'Hunt bugs, test PRs, and file clear reports.' },
  { id: 'writer', title: 'Writer', tagline: 'Write docs, share stories, create tutorials, and get featured on our news page.' },
  { id: 'designer', title: 'Designer', tagline: 'Shape the UI with Vue and Quasar, create marketing material, and design visuals that make LNbits shine.' },
  { id: 'entrepreneur', title: 'Entrepreneur', tagline: 'Build products and run services on top of LNbits.' },
  { id: 'ambassador', title: 'Ambassador', tagline: 'Deploy LNbits for your community and onboard merchants to Lightning.' },
]

const communityLinks = [
  { name: 'Telegram', url: 'https://t.me/lnbits', icon: 'telegram', desc: 'Chat with the community and core team' },
  { name: 'GitHub', url: 'https://github.com/lnbits/lnbits', icon: 'github', desc: 'Report bugs, propose features, submit code' },
  { name: 'Follow on X', url: 'https://x.com/lnbits', icon: 'x', desc: 'Follow for updates and announcements' },
  { name: 'Nostr', url: 'https://primal.net/p/npub10efcj7x65z2ak6vd69xr8f2hvqwuaqrhlygl3yqa4y63hfvc02mqwzaeh3', icon: 'nostr', desc: 'Find us on the decentralized social network' },
]

const allFaqItems = [
  // ── General (shown for every role) ──
  { q: 'Where do I ask for help?', roles: '*', a: 'The <a href="https://t.me/lnbits" target="_blank">Telegram group</a> is the heartbeat of the community. Core devs, extension builders, and users are all there. For longer questions, open a <a href="https://github.com/lnbits/lnbits/discussions" target="_blank">GitHub Discussion</a>.' },
  { q: 'Can I get paid for contributing?', roles: '*', a: 'LNbits is volunteer open-source, but there are paths. <a href="https://opensats.org" target="_blank">OpenSats</a> and <a href="https://hrf.org" target="_blank">HRF</a> fund contributors. Extension developers can <a href="/dev/extensions/monetization">monetize via pay-to-install</a> in the registry. Some community members tip contributors over Lightning directly.' },
  { q: 'What license does LNbits use?', roles: '*', a: 'MIT. Use it, fork it, sell it, remix it. The only rule is keeping the license notice. See the <a href="https://github.com/lnbits/lnbits/blob/main/LICENSE" target="_blank">LICENSE file</a>.' },

  // ── Developer ──
  { q: 'What tech stack do I need to know?', roles: ['developer'], a: 'Backend is <strong>Python + FastAPI</strong>. Frontend is <strong>Vue 3 + Quasar</strong>. The <a href="/dev/architecture">architecture page</a> has the full picture. Not a coder yet? The <a href="/guide/core/extension-builder">Extension Builder</a> lets you create extensions through a visual wizard.' },
  { q: 'How do I set up a dev environment?', roles: ['developer'], a: 'Clone the repo, install with <a href="/guide/installation/uv">uv</a>, set <code>LNBITS_BACKEND_WALLET_CLASS=FakeWallet</code>, and run. No Lightning node needed. The <a href="/dev/contributing">contributing guide</a> has the full walkthrough.' },
  { q: 'How do I test a pull request locally?', roles: ['developer', 'tester'], a: '<code>git fetch origin pull/ID/head:pr-ID && git checkout pr-ID</code>, then <code>uv sync && lnbits</code> with <a href="/guide/wallets/fakewallet">FakeWallet</a>. Check the <a href="/dev/contributing">contributing guide</a> for the detailed steps.' },
  { q: 'How do I build and publish an extension?', roles: ['developer'], a: 'Start with the <a href="/dev/extensions/">extension development guide</a>, use <a href="/dev/tools">Polar</a> for local Lightning testing, then <a href="/dev/extensions/registry">list it in the registry</a>. Want to charge for it? The <a href="/dev/extensions/monetization">monetization docs</a> cover pay-to-install setup.' },
  { q: 'Can I contribute translations?', roles: ['developer', 'writer'], a: 'Translation infrastructure is being planned. Jump into <a href="https://t.me/lnbits" target="_blank">Telegram</a> if you want to help shape it. Early volunteers get to define how it works.' },

  // ── Tester ──
  { q: 'Do I need a Lightning node to test?', roles: ['tester'], a: 'No. <a href="/guide/wallets/fakewallet">FakeWallet</a> simulates Lightning payments locally. For quick live testing, spin up an instance on <a href="https://my.lnbits.com" target="_blank">my.lnbits.com</a> in under 3 minutes.' },
  { q: 'What makes a good bug report?', roles: ['tester'], a: 'Reproduction steps, LNbits version, browser and OS, plus any errors from the console or <a href="/dev/architecture">server logs</a>. Screenshots or screen recordings go a long way. File it at <a href="https://github.com/lnbits/lnbits/issues" target="_blank">github.com/lnbits/lnbits/issues</a>.' },
  { q: 'Which areas need testing the most?', roles: ['tester'], a: 'Extensions with recent updates, the <a href="/guide/core/admin-dashboard">admin panel</a>, multi-wallet workflows, and anything tagged <a href="https://github.com/lnbits/lnbits/labels/needs-testing" target="_blank"><code>needs-testing</code></a> on GitHub. Mobile browser testing is always valuable.' },

  // ── Writer ──
  { q: 'Do I need technical knowledge to write docs?', roles: ['writer'], a: 'Not at all. Some of the best contributions are clear explanations of features, <a href="/guide/faq/">FAQ improvements</a>, and merchant stories. If you can use LNbits, you can document it.' },
  { q: 'Where do the docs live and how do I edit them?', roles: ['writer'], a: 'Everything is in the <a href="https://github.com/DoktorShift/docs_lnbits" target="_blank">docs repo on GitHub</a>. Pages are Markdown files in <code>docs/</code>. Extension pages auto-generate from their GitHub READMEs, so improving a README improves the <a href="/extensions/">extension docs</a> too.' },
  { q: 'How do I get a blog post featured?', roles: ['writer'], a: 'Write about a real experience: a deployment story, a merchant case study, a tutorial. Share it on <a href="https://x.com/lnbits" target="_blank">X</a> or <a href="https://t.me/lnbits" target="_blank">Telegram</a> and the team will consider it for <a href="https://news.lnbits.com" target="_blank">news.lnbits.com</a>.' },

  // ── Designer ──
  { q: 'What frontend stack does LNbits use?', roles: ['designer'], a: '<a href="/dev/architecture">Vue 3 + Quasar UI</a> for the app, <a href="https://vitepress.dev" target="_blank">VitePress</a> for docs. The Quasar component library gives you a huge toolkit. Browse the <a href="https://github.com/lnbits/lnbits" target="_blank">main repo</a> for the app or the <a href="https://github.com/DoktorShift/docs_lnbits" target="_blank">docs repo</a> for this site.' },
  { q: 'Can I redesign existing UI without writing backend code?', roles: ['designer'], a: 'Yes. Frontend templates live in each extension\'s <code>templates/</code> folder. You can restyle components, improve layouts, and fix mobile views using only HTML, CSS, and Vue. The <a href="/dev/building-extensions">extension development guide</a> has the patterns.' },
  { q: 'What kind of design work is needed?', roles: ['designer'], a: 'UI improvements for the <a href="/guide/core/admin-dashboard">admin panel</a> and extension flows, hero images for <a href="https://news.lnbits.com" target="_blank">blog posts</a>, social media cards, infographics, and illustrations. Check <a href="https://github.com/lnbits/lnbits/issues?q=is%3Aissue+is%3Aopen+label%3Adesign" target="_blank">design-tagged issues</a> for open requests.' },

  // ── Entrepreneur ──
  { q: 'How do I deploy LNbits for my community?', roles: ['entrepreneur'], a: 'Fastest path: one-click install on a <a href="/guide/installation/">node platform</a> like Umbrel, Start9, or myNode. For full control, use <a href="/guide/installation/docker">Docker</a> on a VPS. Or skip infra entirely with <a href="https://my.lnbits.com" target="_blank">the hosted SaaS</a>.' },
  { q: 'Can I white-label or brand LNbits?', roles: ['entrepreneur'], a: 'Yes. LNbits is MIT-licensed, so you can customize the UI, add your logo, and run it under your own brand. The <a href="/guide/core/admin-dashboard">admin dashboard</a> lets you configure branding, and you can go deeper by editing the frontend templates.' },
  { q: 'How does the extension marketplace work for business?', roles: ['entrepreneur'], a: 'You can build or commission extensions for your use case, then optionally <a href="/dev/extensions/monetization">sell them via pay-to-install</a>. Other operators pay Lightning to download. Extensions like <a href="/extensions/tpos/">TPoS</a>, <a href="/extensions/boltcards/">Boltcards</a>, and <a href="/extensions/lnticket/">LNTicket</a> already power real businesses.' },

  // ── Ambassador ──
  { q: 'What materials can I use for meetups and talks?', roles: ['ambassador'], a: 'The <a href="/">docs site</a> is your main resource. The <a href="/guide/">user guide</a> works as a walkthrough, the <a href="/extensions/">extension directory</a> shows what\'s possible, and <a href="https://news.lnbits.com" target="_blank">news.lnbits.com</a> has community stories. Demo with <a href="https://my.lnbits.com" target="_blank">my.lnbits.com</a> for live audiences.' },
  { q: 'How do I onboard merchants to LNbits?', roles: ['ambassador'], a: 'Start with <a href="/extensions/tpos/">TPoS</a> for point-of-sale, add <a href="/extensions/boltcards/">Boltcards</a> for tap-to-pay, and show them the <a href="/guide/wallets/">wallet management</a>. A <a href="https://my.lnbits.com" target="_blank">SaaS instance</a> lets them try it without any setup. The <a href="/guide/faq/payments">payments FAQ</a> answers their first questions.' },
  { q: 'Where should I share LNbits content?', roles: ['ambassador'], a: '<a href="https://x.com/lnbits" target="_blank">X</a> (tag @lnbits), <a href="https://primal.net/p/npub10efcj7x65z2ak6vd69xr8f2hvqwuaqrhlygl3yqa4y63hfvc02mqwzaeh3" target="_blank">Nostr</a>, <a href="https://reddit.com/r/lightningnetwork" target="_blank">Reddit</a>, and <a href="https://www.youtube.com/@lnbits" target="_blank">YouTube</a>. Cross-post to Bitcoin meetup groups and local communities. Real stories with numbers ("onboarded 12 merchants in 3 weeks") spread the furthest.' },
]

const faqFiltered = computed(() =>
  allFaqItems
    .filter(f => f.roles === '*' || f.roles.includes(activeRole.value))
    .map((f, i) => ({ ...f, open: faqOpen.value.has(i) }))
)
const faqOpen = ref(new Set())

const roleData = {
  developer: {
    video: null,
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
    video: null,
    steps: [
      {
        num: '01', title: 'Get a test instance running', illust: 'setup',
        desc: 'Pick one and you are ready in minutes. No Lightning node needed.',
        featured: {
          name: 'Fastest option: LNbits SaaS',
          desc: 'Get a full LNbits instance in 3 minutes with FakeWallet for testing. No install, no config.',
          url: 'https://my.lnbits.com',
          badge: 'Recommended',
        },
        items: [
          { name: 'Demo server for quick tests', url: 'https://demo.lnbits.com', badge: 'Instant' },
          { name: 'Install locally with uv', url: '/guide/installation/uv', badge: 'From source' },
          { name: 'Run with Docker', url: '/guide/installation/docker', badge: 'Isolated' },
          { name: 'FakeWallet for simulated payments', url: '/guide/wallets/fakewallet' },
          { name: 'Polar for real Lightning testing', url: 'https://lightningpolar.com', badge: 'Advanced' },
          { name: 'Dev environment setup', url: '/dev/contributing', badge: 'Full guide' },
        ],
      },
      {
        num: '02', title: 'Know where bugs hide', illust: 'browse',
        desc: 'Some areas break more often than others. Focus here for the biggest impact.',
        tips: [
          'Funding sources: connect different backends (LND, CLN, Phoenixd, NWC) and verify payments settle correctly',
          'Node Manager: channel operations, peer connections, balance reporting, fee policies',
          'Extension edge cases: what happens when two extensions share a wallet, or when data migrates between versions',
          'Fiat providers: Stripe and PayPal checkout flows, webhook delivery, refund handling',
          'Multi-user under load: shared wallets with concurrent payments, ACL token expiry, role escalation boundaries',
          'Mobile in the field: test TPoS and Boltcards on a real phone with real network conditions',
        ],
      },
      {
        num: '03', title: 'Test and report', illust: 'tips',
        desc: 'Good bug reports save developers hours. Good PR reviews prevent bugs from reaching users.',
        featured: {
          name: 'Pull requests that need testing',
          desc: 'Pick an open PR, check it out locally, run it, and leave your review.',
          url: 'https://github.com/lnbits/lnbits/pulls',
          badge: 'Test now',
        },
        refPanels: [
          {
            label: 'Testing a PR',
            steps: [
              { num: '1', text: 'Check out the PR branch and run it locally with FakeWallet' },
              { num: '2', text: 'Follow the PR description, test exactly what changed, record a screenshot or video' },
            ],
          },
          {
            label: 'Reporting a bug',
            steps: [
              { num: '1', text: 'Include your LNbits version and wallet backend (LND, CLN, Phoenixd, etc.)' },
              { num: '2', text: 'Describe what you did, what happened, and paste relevant ERROR lines from the logs' },
            ],
          },
        ],
        items: [
          { name: 'Try on demo.lnbits.com first', url: 'https://demo.lnbits.com', badge: 'Quick test' },
          { name: 'Report a bug', url: 'https://github.com/lnbits/lnbits/issues/new', badge: 'Public issue' },
          { name: 'Report a security vulnerability', url: 'https://github.com/lnbits/lnbits/security/advisories/new', badge: 'Private' },
        ],
      },
      {
        num: '04', title: 'Your testing makes LNbits reliable', illust: 'ship',
        desc: 'Every PR you test and every bug you report makes LNbits more stable for thousands of merchants, developers, and communities running it in production.',
        items: [
          { name: 'Join Telegram for QA coordination', url: 'https://t.me/lnbits', badge: 'Connect' },
          { name: 'Share your testing on X', url: 'https://x.com/intent/tweet?text=I%27m+testing+%40lnbits+and+helping+make+Lightning+more+reliable' },
          { name: 'Get featured on news.lnbits.com', url: 'https://news.lnbits.com', badge: 'Showcase' },
        ],
        action: { label: 'Find a PR to test', url: 'https://github.com/lnbits/lnbits/pulls' },
      },
    ],
  },
  writer: {
    video: null,
    steps: [
      {
        num: '01', title: 'Pick a quick win', illust: 'browse',
        desc: 'You do not need to write a whole guide from scratch. Start small. These are things you can fix in 10 minutes.',
        featured: {
          name: 'Extension READMEs become docs automatically',
          desc: 'Every extension page is fetched from its GitHub README at build time. Improve the README on GitHub and the docs site updates on the next build.',
          url: '/dev/extensions/registry',
          badge: 'Good to know',
        },
        items: [
          { name: 'Find an extension with a thin page', url: '/extensions/', badge: 'Quick win' },
          { name: 'Check FAQ for unanswered questions', url: '/guide/faq/', badge: 'Quick win' },
          { name: 'Fix a broken link or typo', url: 'https://github.com/DoktorShift/docs_lnbits', badge: 'Quick win' },
          { name: 'Add a missing "Related Pages" section', url: '/guide/', badge: 'Quick win' },
        ],
      },
      {
        num: '02', title: 'Write content that lands', illust: 'setup',
        desc: 'The best content comes from real experience. Share what you learned, what surprised you, and what others should know.',
        tips: [
          'Lead with what the reader gets, not what LNbits is',
          'Real numbers and results make stories stick - "onboarded 12 merchants in 3 weeks"',
          'Screenshots and short videos beat long paragraphs',
          'Link to docs.lnbits.com so readers can go deeper',
        ],
        items: [
          { name: 'Edit the docs directly', url: 'https://github.com/DoktorShift/docs_lnbits', badge: 'For doc contributions' },
        ],
      },
      {
        num: '03', title: 'Write stories and blogs', illust: 'tips',
        desc: 'We want real stories from real people. Write about what you see in the community and share it.',
        featured: {
          name: 'Get featured on news.lnbits.com',
          desc: 'We spotlight community articles on our news page. Write something great, reach out on Telegram, and we will feature it.',
          url: 'https://news.lnbits.com',
          badge: 'Community spotlight',
        },
        columns: [
          {
            label: 'Blog ideas',
            items: [
              { name: 'Deployment story', desc: 'How you set up LNbits', logo: '/logos/lnbits.svg' },
              { name: 'Merchant case study', desc: 'TPoS + Boltcards in action', logo: '/logos/lnbits.svg' },
              { name: 'Extension tutorial', desc: 'Step-by-step walkthrough', logo: '/logos/lnbits.svg' },
              { name: 'Event recap', desc: 'LNbits at a festival or meetup', logo: '/logos/lnbits.svg' },
            ],
          },
          {
            label: 'Share on',
            items: [
              { name: 'X / Twitter', desc: 'Tag @lnbits', icon: 'devicon-twitter-original', url: 'https://x.com/lnbits' },
              { name: 'Nostr', desc: 'Active community', logo: '/logos/nostr10.png', url: 'https://primal.net/p/npub10efcj7x65z2ak6vd69xr8f2hvqwuaqrhlygl3yqa4y63hfvc02mqwzaeh3' },
              { name: 'YouTube', desc: 'Tutorials and demos', si: siYoutube, url: 'https://www.youtube.com/@lnbits' },
              { name: 'Reddit', desc: 'r/Bitcoin, r/lightningnetwork', si: siReddit, url: 'https://reddit.com/r/lightningnetwork' },
            ],
          },
        ],
      },
      {
        num: '04', title: 'Your words reach thousands', illust: 'ship',
        desc: 'Every guide you write, every blog you publish, and every story you share helps someone discover Lightning. Your content feeds the docs, the AI assistant, and the community.',
        items: [
          { name: 'Docs repo on GitHub', url: 'https://github.com/DoktorShift/docs_lnbits', badge: 'Contribute' },
          { name: 'LNbits news and community articles', url: 'https://news.lnbits.com', badge: 'Get featured' },
          { name: 'LLM integration docs', url: '/llm/', badge: 'Your writing feeds AI' },
          { name: 'Share on X', url: 'https://x.com/intent/tweet?text=I%27m+writing+docs+for+%40lnbits' },
          { name: 'Telegram community', url: 'https://t.me/lnbits' },
        ],
        action: { label: 'Start writing', url: 'https://github.com/DoktorShift/docs_lnbits' },
      },
    ],
  },
  designer: {
    video: null,
    steps: [
      {
        num: '01', title: 'Get to know the stack', illust: 'browse',
        desc: 'LNbits is built with Vue 3 and Quasar UI framework. The docs site uses VitePress. Try the app, explore the components, and spot what could look better.',
        columns: [
          {
            label: 'LNbits app (Vue + Quasar)',
            items: [
              { name: 'Try LNbits live', desc: 'Use the real UI', logo: '/logos/lnbits.svg', url: 'https://my.lnbits.com' },
              { name: 'Quasar components', desc: 'Full UI library', icon: 'devicon-quasar-plain', url: 'https://quasar.dev/vue-components' },
              { name: 'LNbits repo', desc: 'Frontend source code', icon: 'devicon-github-original', url: 'https://github.com/lnbits/lnbits' },
            ],
          },
          {
            label: 'Docs site (VitePress)',
            items: [
              { name: 'Docs site', desc: 'You are looking at it', logo: '/logos/lnbits.svg', url: '/' },
              { name: 'Docs repo', desc: 'VitePress + Vue', icon: 'devicon-github-original', url: 'https://github.com/DoktorShift/docs_lnbits' },
              { name: 'VitePress docs', desc: 'Theming reference', icon: 'devicon-vuejs-plain', url: 'https://vitepress.dev' },
            ],
          },
        ],
      },
      {
        num: '02', title: 'What we need', illust: 'tips',
        desc: 'Pick what excites you. Every area has open opportunities.',
        columns: [
          {
            label: 'Product design',
            items: [
              { name: 'UI improvements', desc: 'Admin panel, extension flows, mobile views', icon: 'devicon-quasar-plain', url: 'https://github.com/lnbits/lnbits/issues?q=is%3Aissue+is%3Aopen+label%3Adesign' },
              { name: 'Docs site design', desc: 'Pages, layouts, components', icon: 'devicon-vuejs-plain', url: 'https://github.com/DoktorShift/docs_lnbits' },
            ],
          },
          {
            label: 'Creative design',
            items: [
              { name: 'Blog and news headers', desc: 'Hero images for articles', icon: 'devicon-figma-plain', url: 'https://news.lnbits.com' },
              { name: 'Illustrations for marketing', desc: 'Visuals that help us tell the LNbits story', icon: 'devicon-figma-plain', url: 'https://t.me/lnbits' },
              { name: 'Social media content', desc: 'Shareable cards, infographics, announcements', logo: '/logos/lnbits.svg', url: 'https://x.com/lnbits' },
            ],
          },
        ],
      },
      {
        num: '03', title: 'How to contribute', illust: 'setup',
        desc: 'Share your idea on Telegram first, get feedback, then submit. This keeps quality high and avoids wasted effort.',
        tips: [
          'Post your mockup or concept in the Telegram group for quick feedback',
          'For UI changes: open a GitHub issue with before/after screenshots',
          'For visuals: share the file (Figma, SVG, PNG) directly in the issue or PR',
          'Design for dark mode first, then adapt for light',
        ],
        action: { label: 'Join the Telegram group', url: 'https://t.me/lnbits' },
      },
      {
        num: '04', title: 'Your design has impact', illust: 'ship',
        desc: 'When LNbits looks professional and feels intuitive, more people trust it. Your work reaches merchants, developers, and communities worldwide.',
        items: [
          { name: 'Open design issues', url: 'https://github.com/lnbits/lnbits/issues?q=is%3Aissue+is%3Aopen+label%3Adesign', badge: 'Pick one' },
          { name: 'Get featured on news.lnbits.com', url: 'https://news.lnbits.com', badge: 'Showcase' },
          { name: 'Share on X', url: 'https://x.com/intent/tweet?text=I%27m+designing+for+%40lnbits' },
        ],
        action: { label: 'Browse design issues', url: 'https://github.com/lnbits/lnbits/issues?q=is%3Aissue+is%3Aopen+label%3Adesign' },
      },
    ],
  },
  entrepreneur: {
    video: null,
    blog: {
      title: 'How to set up your own LNbits server',
      desc: 'Step-by-step tutorial on PlanB Academy covering a full LNbits deployment for your business.',
      url: 'https://planb.academy/en/tutorials/business/others/lnbits-server-6a406046-3cef-4a64-a82b-8d8f0f82a192',
      image: 'https://pbs.twimg.com/media/HDhjniXX0AAFuU6?format=jpg&name=medium',
    },
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
        featured: {
          name: 'Run multiple instances from one dashboard',
          desc: 'LNbits SaaS lets you spin up and manage many LNbits instances from a single account. Perfect for serving multiple clients, regions, or projects.',
          url: 'https://my.lnbits.com',
          badge: 'SaaS',
        },
        tips: [
          'Build a paid extension and list it in the registry with pay-to-install',
          'Package TPoS + Inventory + Boltcards + SplitPayments into a turnkey merchant solution',
          'White-label LNbits under your own brand for a specific industry or region',
          'Offer consulting: help businesses integrate Lightning payments via the LNbits API',
        ],
      },
      {
        num: '03', title: 'Launch and scale', illust: 'setup',
        desc: 'Start fast with SaaS or go self-hosted for full control. The extension marketplace lets you distribute and monetize your work.',
        items: [
          { name: 'LNbits SaaS', url: 'https://my.lnbits.com', badge: '3 minutes' },
          { name: 'Docker install', url: '/guide/installation/docker', badge: 'Production' },
          { name: 'Extension monetization', url: '/dev/extensions/monetization' },
          { name: 'Custom marketplace', url: '/dev/extensions/custom-list' },
        ],
      },
      {
        num: '04', title: 'Grow with the ecosystem', illust: 'ship',
        desc: 'Your product strengthens LNbits, and a stronger LNbits grows your market. The ecosystem scales together.',
        items: [
          { name: 'LNbits SaaS', url: 'https://my.lnbits.com', badge: 'Launch fast' },
          { name: 'Extension monetization', url: '/dev/extensions/monetization', badge: 'Earn sats' },
          { name: 'Share your story on Telegram', url: 'https://t.me/lnbits' },
          { name: 'GitHub Discussions', url: 'https://github.com/lnbits/lnbits/discussions' },
        ],
        action: { label: 'Get started', url: 'https://my.lnbits.com' },
      },
    ],
  },
  ambassador: {
    video: { id: 'ZTjFalYeOlA', title: 'LNbits Extensions Deep-Dive' },
    steps: [
      {
        num: '01', title: 'Deploy for your community', illust: 'deploy',
        desc: 'LNbits runs on every major Bitcoin node platform with one-click installation. No terminal, no config files. Pick a platform and your community has Lightning wallets in minutes.',
        columns: [
          {
            label: 'One-click node platforms',
            items: [
              { name: 'Umbrel', desc: 'App Store', logo: '/logos/backends/umbrel.png', url: '/guide/installation/node-platforms#umbrel' },
              { name: 'Start9', desc: 'Marketplace', logo: '/logos/backends/start9.png', url: '/guide/installation/node-platforms#start9' },
              { name: 'RaspiBlitz', desc: 'Services menu', logo: '/logos/backends/blitz.png', url: '/guide/installation/node-platforms#raspiblitz' },
              { name: 'myNode', desc: 'Dashboard', logo: '/logos/backends/mynode.png', url: '/guide/installation/node-platforms#mynode' },
            ],
          },
          {
            label: 'Cloud & hosted',
            items: [
              { name: 'LNbits SaaS', desc: 'Live in 3 min', logo: '/logos/lnbits.svg', url: 'https://my.lnbits.com' },
              { name: 'Voltage', desc: 'Cloud dashboard', logo: '/logos/backends/voltage.png', url: 'https://voltage.cloud' },
              { name: 'Docker + VPS', desc: 'Full control', icon: 'devicon-docker-plain', url: '/guide/installation/docker' },
            ],
          },
        ],
        items: [
          { name: 'All deployment methods', url: '/guide/installation/', badge: 'Compare' },
        ],
      },
      {
        num: '02', title: 'Onboard merchants', illust: 'browse',
        desc: 'LNbits gives merchants everything they need: point of sale, NFC cards, static QR codes, and tipping. Set up a wallet for each merchant and get them accepting Lightning.',
        featured: {
          name: 'TPoS Wrapper - Tap to Pay on Android',
          desc: 'Accept credit cards, debit cards, Google Pay, and Apple Pay via Stripe. Turns any Android phone with NFC into a full payment terminal.',
          url: '/apps/tpos-wrapper',
          badge: 'Android App',
        },
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
        desc: 'Start local. Every merchant you onboard brings Lightning closer to everyday life. Your city, your street, your community.',
        tips: [
          'Run a workshop at your local Bitcoin meetup',
          'Document your deployment and share it as a case study or blog post',
          'Help merchants troubleshoot - you are their first line of support',
          'Offer hosting to your community - run a multi-tenant LNbits instance',
          'Connect with other ambassadors on Telegram to share what works',
        ],
      },
      {
        num: '04', title: 'Spread the word', illust: 'ship',
        desc: 'Every merchant you onboard and every meetup you host brings Lightning closer to everyday life. Share your story and inspire other communities.',
        items: [
          { name: 'Create YouTube tutorials', url: 'https://www.youtube.com/@lnbits', badge: 'High impact' },
          { name: 'Share on X', url: 'https://x.com/intent/tweet?text=I%27m+onboarding+merchants+to+Lightning+with+%40lnbits' },
          { name: 'Telegram community', url: 'https://t.me/lnbits' },
          { name: 'GitHub Discussions', url: 'https://github.com/lnbits/lnbits/discussions' },
        ],
        action: { label: 'Deploy LNbits now', url: '/guide/installation/' },
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
  faqOpen.value.clear()
  history.replaceState(null, '', `#${id}`)
  // Wait for the transition to complete before scrolling
  setTimeout(() => {
    const flow = document.querySelector('.cp-flow')
    if (flow) flow.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 400)
}

function onHashChange() {
  const hash = window.location.hash.slice(1)
  if (roleIds.includes(hash) && hash !== activeRole.value) {
    activeRole.value = hash
    activeVideos.clear()
  }
}

function toggleFaq(i) {
  if (faqOpen.value.has(i)) faqOpen.value.delete(i)
  else faqOpen.value.add(i)
}


function isExt(url) { return url && url.startsWith('http') }

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
                <!-- Map background -->
                <rect x="25" y="14" width="190" height="132" rx="10" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
                <!-- Map grid (streets) -->
                <g opacity=".06" stroke="var(--vp-c-text-3)" stroke-width="0.8">
                  <line x1="25" y1="50" x2="215" y2="50"/><line x1="25" y1="80" x2="215" y2="80"/><line x1="25" y1="110" x2="215" y2="110"/>
                  <line x1="70" y1="14" x2="70" y2="146"/><line x1="120" y1="14" x2="120" y2="146"/><line x1="170" y1="14" x2="170" y2="146"/>
                </g>
                <!-- Location pin 1 (merchant - large) -->
                <g opacity=".3"><path d="M75 55c0-8 6-14 14-14s14 6 14 14c0 10-14 20-14 20S75 65 75 55z" fill="var(--vp-c-brand-1)" fill-opacity=".4" stroke="var(--vp-c-brand-1)" stroke-width="1.2"/><circle cx="89" cy="55" r="5" fill="var(--vp-c-brand-1)" opacity=".6"/></g>
                <!-- Location pin 2 (merchant) -->
                <g opacity=".22"><path d="M140 70c0-7 5-12 12-12s12 5 12 12c0 8-12 17-12 17s-12-9-12-17z" fill="var(--vp-c-brand-1)" fill-opacity=".35" stroke="var(--vp-c-brand-1)" stroke-width="1"/><circle cx="152" cy="70" r="4" fill="var(--vp-c-brand-1)" opacity=".5"/></g>
                <!-- Location pin 3 (merchant) -->
                <g opacity=".18"><path d="M100 98c0-6 4-10 10-10s10 4 10 10c0 7-10 14-10 14s-10-7-10-14z" fill="var(--vp-c-brand-1)" fill-opacity=".3" stroke="var(--vp-c-brand-1)" stroke-width="1"/><circle cx="110" cy="98" r="3.5" fill="var(--vp-c-brand-1)" opacity=".5"/></g>
                <!-- Connection arcs between pins -->
                <path d="M89 60c15 5 40 2 63 12" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".1" fill="none" stroke-dasharray="3 3"/>
                <path d="M93 62c5 15 10 28 17 38" stroke="var(--vp-c-brand-1)" stroke-width="1" opacity=".08" fill="none" stroke-dasharray="3 3"/>
                <!-- People icons (small figures around pins) -->
                <g opacity=".15"><circle cx="68" cy="42" r="3" fill="var(--vp-c-text-3)"/><path d="M64 48a4 4 0 018 0" fill="var(--vp-c-text-3)"/></g>
                <g opacity=".12"><circle cx="170" cy="58" r="3" fill="var(--vp-c-text-3)"/><path d="M166 64a4 4 0 018 0" fill="var(--vp-c-text-3)"/></g>
                <g opacity=".1"><circle cx="130" cy="110" r="3" fill="var(--vp-c-text-3)"/><path d="M126 116a4 4 0 018 0" fill="var(--vp-c-text-3)"/></g>
                <!-- Lightning bolt in center -->
                <g transform="translate(186, 28)"><path d="M4-8l-6 10h5l-6 12" stroke="var(--vp-c-brand-1)" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".25"/></g>
                <!-- Small store icons -->
                <rect x="42" y="88" width="14" height="10" rx="2" stroke="var(--vp-c-text-3)" stroke-width="0.8" opacity=".1" fill="none"/>
                <path d="M42 88l7-5 7 5" stroke="var(--vp-c-text-3)" stroke-width="0.8" opacity=".1" fill="none"/>
                <rect x="180" y="100" width="14" height="10" rx="2" stroke="var(--vp-c-text-3)" stroke-width="0.8" opacity=".08" fill="none"/>
                <path d="M180 100l7-5 7 5" stroke="var(--vp-c-text-3)" stroke-width="0.8" opacity=".08" fill="none"/>
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

        <!-- Blog article -->
        <section v-if="active.blog" class="cp-blog-sec">
          <div class="cp-w">
            <a :href="active.blog.url" target="_blank" rel="noopener noreferrer" class="cp-blog-card">
              <img :src="active.blog.image" :alt="active.blog.title" class="cp-blog-img" loading="lazy" />
              <div class="cp-blog-overlay">
                <span class="cp-blog-badge">Article</span>
                <h3 class="cp-blog-title">{{ active.blog.title }}</h3>
                <p class="cp-blog-desc">{{ active.blog.desc }}</p>
              </div>
            </a>
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

              <!-- Featured item (prominent CTA card) -->
              <a v-if="step.featured" :href="step.featured.url" class="cp-featured" :target="isExt(step.featured.url) ? '_blank' : undefined" :rel="isExt(step.featured.url) ? 'noopener noreferrer' : undefined">
                <div class="cp-featured-content">
                  <span v-if="step.featured.badge" class="cp-featured-badge">{{ step.featured.badge }}</span>
                  <strong class="cp-featured-name">{{ step.featured.name }}</strong>
                  <span class="cp-featured-desc">{{ step.featured.desc }}</span>
                </div>
                <svg class="cp-featured-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </a>

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

              <!-- Platform columns (side-by-side grid) -->
              <template v-if="step.columns">
                <div class="cp-columns">
                  <div v-for="col in step.columns" :key="col.label" class="cp-col">
                    <span class="cp-col-label">{{ col.label }}</span>
                    <a
                      v-for="p in col.items" :key="p.name"
                      :href="p.url"
                      class="cp-platform"
                      :target="isExt(p.url) ? '_blank' : undefined"
                      :rel="isExt(p.url) ? 'noopener noreferrer' : undefined"
                    >
                      <img v-if="p.logo" :src="p.logo" :alt="p.name" class="cp-platform-logo" />
                      <svg v-else-if="p.si" class="cp-platform-si" viewBox="0 0 24 24" :fill="'#' + p.si.hex"><path :d="p.si.path"/></svg>
                      <i v-else-if="p.icon" :class="p.icon" class="cp-platform-devicon"></i>
                      <span v-else class="cp-platform-icon">{{ p.name.charAt(0) }}</span>
                      <span class="cp-platform-info">
                        <span class="cp-platform-name">{{ p.name }}</span>
                        <span class="cp-platform-desc">{{ p.desc }}</span>
                      </span>
                    </a>
                  </div>
                </div>
              </template>

              <!-- Reference panels (numbered steps, side by side) -->
              <template v-if="step.refPanels">
                <div class="cp-ref-panels">
                  <div v-for="panel in step.refPanels" :key="panel.label" class="cp-ref-panel">
                    <span class="cp-ref-label">{{ panel.label }}</span>
                    <div v-for="s in panel.steps" :key="s.num" class="cp-ref-step">
                      <span class="cp-ref-num">{{ s.num }}</span>
                      <span class="cp-ref-text">{{ s.text }}</span>
                    </div>
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
                <!-- Deploy: server with network nodes -->
                <svg v-if="step.illust==='deploy'" viewBox="0 0 120 90" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <!-- Central server -->
                  <rect x="38" y="20" width="44" height="32" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-brand-1)" stroke-width="1.5" opacity=".4"/>
                  <circle cx="60" cy="32" r="5" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".35" fill="none"/>
                  <path d="M58 28l-2 5h3l-2 5" stroke="var(--vp-c-brand-1)" stroke-width="1.2" opacity=".4"/>
                  <rect x="46" y="42" width="28" height="3" rx="1.5" fill="var(--vp-c-brand-1)" opacity=".15"/>
                  <!-- Connected nodes -->
                  <circle cx="20" cy="20" r="8" stroke="var(--vp-c-divider)" stroke-width="1.2" fill="var(--vp-c-bg-soft)"/>
                  <rect x="16" y="17" width="8" height="6" rx="1.5" fill="var(--vp-c-brand-1)" opacity=".2"/>
                  <circle cx="100" cy="20" r="8" stroke="var(--vp-c-divider)" stroke-width="1.2" fill="var(--vp-c-bg-soft)"/>
                  <rect x="96" y="17" width="8" height="6" rx="1.5" fill="var(--vp-c-brand-1)" opacity=".2"/>
                  <circle cx="20" cy="70" r="8" stroke="var(--vp-c-divider)" stroke-width="1.2" fill="var(--vp-c-bg-soft)"/>
                  <rect x="16" y="67" width="8" height="6" rx="1.5" fill="var(--vp-c-brand-1)" opacity=".2"/>
                  <circle cx="100" cy="70" r="8" stroke="var(--vp-c-divider)" stroke-width="1.2" fill="var(--vp-c-bg-soft)"/>
                  <rect x="96" y="67" width="8" height="6" rx="1.5" fill="var(--vp-c-brand-1)" opacity=".2"/>
                  <!-- Connection lines -->
                  <line x1="28" y1="22" x2="38" y2="30" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".15" stroke-dasharray="3 2"/>
                  <line x1="92" y1="22" x2="82" y2="30" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".15" stroke-dasharray="3 2"/>
                  <line x1="28" y1="68" x2="38" y2="46" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".12" stroke-dasharray="3 2"/>
                  <line x1="92" y1="68" x2="82" y2="46" stroke="var(--vp-c-brand-1)" stroke-width=".8" opacity=".12" stroke-dasharray="3 2"/>
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
        <p class="cp-faq-sub">Showing questions for <strong>{{ roles.find(r => r.id === activeRole)?.title }}s</strong></p>
        <div class="cp-faq-list">
          <TransitionGroup name="cp-faq-anim">
            <div v-for="(item, i) in faqFiltered" :key="item.q" class="cp-faq-item" :class="{ 'cp-faq-item--open': item.open }">
              <button class="cp-faq-q" @click="toggleFaq(i)">
                <span>{{ item.q }}</span>
                <svg class="cp-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <div class="cp-faq-a">
                <p v-html="item.a"></p>
              </div>
            </div>
          </TransitionGroup>
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

/* ═══ Blog Card ═══ */
.cp-blog-sec { padding: 0 0 32px; }
.cp-blog-card {
  display: block; position: relative; border-radius: 14px; overflow: hidden;
  border: 1px solid var(--vp-c-divider); text-decoration: none;
  transition: border-color .25s, transform .25s;
}
.cp-blog-card:hover { border-color: var(--vp-c-brand-1); transform: translateY(-2px); }
.cp-blog-img {
  width: 100%; max-height: 280px; object-fit: cover; object-position: center top; display: block;
}
.cp-blog-overlay {
  padding: 20px 24px; background: var(--vp-c-bg-elv);
}
.cp-blog-badge {
  display: inline-block; font-size: 10px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.8px; color: var(--vp-c-brand-1); margin-bottom: 8px;
}
.cp-blog-title {
  font-size: 17px; font-weight: 700; color: var(--vp-c-text-1);
  margin: 0 0 6px; line-height: 1.3;
}
.cp-blog-desc {
  font-size: 13px; color: var(--vp-c-text-2); line-height: 1.5; margin: 0;
}

/* ═══ Featured Item ═══ */
.cp-featured {
  display: flex; align-items: center; gap: 16px;
  padding: 16px 20px; margin-bottom: 4px;
  background: var(--vp-c-brand-soft); border: 1px solid var(--vp-c-divider);
  border-radius: 10px; text-decoration: none; color: var(--vp-c-text-1);
  transition: border-color .2s, background .2s;
}
.cp-featured:hover { border-color: var(--vp-c-brand-1); }
.cp-featured-content { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.cp-featured-badge {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.8px; color: var(--vp-c-brand-1); line-height: 1;
}
.cp-featured-name { font-size: 14px; font-weight: 700; line-height: 1.3; }
.cp-featured-desc { font-size: 12px; color: var(--vp-c-text-2); line-height: 1.45; }
.cp-featured-arr { width: 18px; height: 18px; flex-shrink: 0; color: var(--vp-c-text-3); transition: color .2s; }
.cp-featured:hover .cp-featured-arr { color: var(--vp-c-brand-1); }

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

/* Reference panels (numbered steps, side by side) */
.cp-ref-panels {
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
  margin-bottom: 8px;
}
.cp-ref-panel {
  padding: 16px 18px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  border-left: 3px solid var(--vp-c-brand-1);
}
.cp-ref-label {
  display: block;
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 1px; color: var(--vp-c-brand-1);
  margin-bottom: 12px;
}
.cp-ref-step {
  display: flex; gap: 10px; align-items: flex-start;
  margin-bottom: 10px;
}
.cp-ref-step:last-child { margin-bottom: 0; }
.cp-ref-num {
  flex-shrink: 0; width: 22px; height: 22px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; color: var(--vp-c-brand-1);
  border: 1.5px solid var(--vp-c-brand-1); border-radius: 50%;
  opacity: .6;
}
.cp-ref-text {
  font-size: 13px; color: var(--vp-c-text-2); line-height: 1.5;
  padding-top: 2px;
}

/* Platform columns */
.cp-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 12px 16px;
}
.cp-col-label {
  display: block; font-size: 10px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 1px; color: #7c4dff; opacity: .5; margin-bottom: 8px;
}
.cp-platform {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 10px; margin-bottom: 6px;
  border-radius: 8px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft); text-decoration: none; color: inherit;
  transition: border-color .2s, transform .15s;
}
.cp-platform:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}
.cp-platform-logo {
  width: 28px; height: 28px; object-fit: contain; border-radius: 6px; flex-shrink: 0;
}
.cp-platform-devicon {
  width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
  font-size: 22px; flex-shrink: 0; color: var(--vp-c-text-2);
}
.cp-platform-si {
  width: 28px; height: 28px; flex-shrink: 0; border-radius: 6px;
}
.cp-platform-icon {
  width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
  border-radius: 6px; background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1);
  font-weight: 700; font-size: 13px; flex-shrink: 0;
}
.cp-platform-info { display: flex; flex-direction: column; min-width: 0; }
.cp-platform-name { font-size: 13px; font-weight: 600; color: var(--vp-c-text-1); }
.cp-platform-desc { font-size: 11px; color: var(--vp-c-text-2); }

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
.cp-faq-sub { font-size: 14px; color: var(--vp-c-text-2); text-align: center; margin: 4px 0 0; }
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
.cp-faq-item--open .cp-faq-a { max-height: 300px; }
.cp-faq-a p { font-size: 14px; color: var(--vp-c-text-2); line-height: 1.65; margin: 0; padding: 0 0 20px; }
.cp-faq-a a { color: var(--vp-c-brand-1); text-decoration: none; font-weight: 500; }
.cp-faq-a a:hover { text-decoration: underline; }
.cp-faq-a code { font-size: 12px; padding: 2px 6px; border-radius: 4px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); }
.cp-faq-anim-enter-active, .cp-faq-anim-leave-active { transition: all .3s ease; }
.cp-faq-anim-enter-from, .cp-faq-anim-leave-to { opacity: 0; transform: translateY(-8px); }
.cp-faq-anim-move { transition: transform .3s ease; }

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
  .cp-columns { grid-template-columns: 1fr; padding: 8px 12px; }
  .cp-ref-panels { grid-template-columns: 1fr; gap: 12px; }
  .cp-ref-panel { padding: 14px 14px; }
  .cp-col-label { font-size: 9px; }
  .cp-platform { padding: 6px 8px; }
  .cp-platform-logo { width: 24px; height: 24px; }
  .cp-platform-name { font-size: 12px; }
  .cp-platform-desc { font-size: 10px; }
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
