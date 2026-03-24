import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// Fetch latest LNbits release from GitHub at build time
let latestVersion = 'v1.5.0' // fallback
let latestReleaseBody = ''
let latestReleaseDate = ''
try {
  const res = await fetch(
    'https://api.github.com/repos/lnbits/lnbits/releases/latest',
    { headers: { Accept: 'application/vnd.github.v3.html+json' } }
  )
  if (res.ok) {
    const data = await res.json()
    latestVersion = data.tag_name || latestVersion
    latestReleaseBody = data.body_html || data.body || ''
    latestReleaseDate = data.published_at || ''
  }
} catch {
  // Build continues with fallback version
}

export default withMermaid(defineConfig({
  title: 'LNbits',
  description: 'Free and open-source Lightning Network wallet and accounts system',
  head: [
    ['link', { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css' }],
    ['link', { rel: 'icon', href: '/logos/lnbits.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/logos/lnbits.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#673ab7' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://docs.lnbits.com' }],
    ['meta', { property: 'og:title', content: 'LNbits Documentation' }],
    ['meta', { property: 'og:description', content: 'Free and open-source Lightning Network wallet and accounts system' }],
    ['meta', { property: 'og:image', content: 'https://docs.lnbits.com/logos/lnbits.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@lnbits' }],
    ['meta', { name: 'twitter:title', content: 'LNbits Documentation' }],
    ['meta', { name: 'twitter:description', content: 'Free and open-source Lightning Network wallet and accounts system' }],
    ['meta', { name: 'twitter:image', content: 'https://docs.lnbits.com/logos/lnbits.png' }],
  ],
  sitemap: {
    hostname: 'https://docs.lnbits.com',
  },
  cleanUrls: true,
  rewrites: {
    'guide/faq.md': 'guide/faq/index.md',
    'api/core/authentication.md': 'api/authentication.md',
    'api/core/auth.md': 'api/core/users.md',
  },
  lastUpdated: true,

  transformPageData(pageData) {
    if (pageData.relativePath === 'changelog.md') {
      pageData.params = {
        ...pageData.params,
        latestVersion,
        latestReleaseBody,
        latestReleaseDate,
      }
    }
  },

  themeConfig: {
    logo: {
      light: '/logos/lnbits.svg',
      dark: '/logos/lnbits.svg',
    },
    siteTitle: 'LNbits Docs',

    nav: [
      {
        text: 'Guide',
        items: [
          {
            text: 'Getting Started',
            items: [
              { text: 'Overview', link: '/guide/' },
              { text: 'What is LNbits?', link: '/guide/what-is-lnbits' },
              { text: 'Concepts', link: '/guide/concepts' },
            ],
          },
          {
            text: 'Installation',
            items: [
              { text: 'Choose a Method', link: '/guide/installation/' },
              { text: 'First Setup', link: '/guide/installation/first-setup' },
              { text: 'Updating', link: '/guide/installation/updating' },
            ],
          },
          {
            text: 'Using LNbits',
            items: [
              { text: 'Wallet Backends', link: '/guide/wallets/' },
              { text: 'Core Features', link: '/guide/core/' },
              { text: 'Extensions', link: '/guide/using-extensions' },
              { text: 'Admin Dashboard', link: '/guide/admin-dashboard' },
              { text: 'FAQ', link: '/guide/faq/' },
            ],
          },
        ],
      },
      {
        text: 'API',
        items: [
          {
            text: 'Reference',
            items: [
              { text: 'Overview', link: '/api/' },
              { text: 'Quick Reference', link: '/api/quick-reference' },
              { text: 'Authentication', link: '/api/authentication' },
            ],
          },
          {
            text: 'Core Endpoints',
            items: [
              { text: 'Wallets', link: '/api/core/wallets' },
              { text: 'Payments', link: '/api/core/payments' },
              { text: 'Users & Accounts', link: '/api/core/users' },
              { text: 'LNURL', link: '/api/core/lnurl' },
            ],
          },
          {
            text: 'Admin',
            items: [
              { text: 'Admin Endpoints', link: '/api/admin/' },
              { text: 'Settings', link: '/api/admin/settings' },
            ],
          },
        ],
      },
      { text: 'Extensions', link: '/extensions/' },
      { text: 'Apps', link: '/apps/' },
      { text: 'Plugins', link: '/plugins/' },
      { text: 'Contribute', link: '/contribute/' },
      {
        text: 'Developers',
        items: [
          {
            text: 'Architecture',
            items: [
              { text: 'Overview', link: '/dev/architecture' },
              { text: 'Database & Migrations', link: '/dev/database' },
              { text: 'Models & Types', link: '/dev/models' },
              { text: 'Decorators & Auth', link: '/dev/decorators' },
            ],
          },
          {
            text: 'Extensions',
            items: [
              { text: 'Building Extensions', link: '/dev/building-extensions' },
              { text: 'Deploying Extensions', link: '/dev/extensions/' },
              { text: 'Wallet Backends', link: '/dev/wallet-backends' },
            ],
          },
          {
            text: 'Contribute',
            items: [
              { text: 'Contributing', link: '/dev/contributing' },
              { text: 'Fiat Integration', link: '/dev/fiat-integration' },
            ],
          },
        ],
      },
      {
        text: 'LLM',
        items: [
          { text: 'Overview', link: '/llm/' },
          { text: 'Skills', link: '/llm/skills' },
        ],
      },
      {
        text: latestVersion,
        items: [
          { text: 'Changelog', link: '/changelog' },
          { text: 'Releases', link: 'https://github.com/lnbits/lnbits/releases' },
          { text: 'GitHub', link: 'https://github.com/lnbits/lnbits' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Overview', link: '/guide/' },
            { text: 'What is LNbits?', link: '/guide/what-is-lnbits' },
            { text: 'Concepts', link: '/guide/concepts' },
          ],
        },
        {
          text: 'Installation',
          collapsed: false,
          items: [
            { text: 'Choose a Method', link: '/guide/installation/' },
            { text: 'uv', link: '/guide/installation/uv' },
            { text: 'Poetry', link: '/guide/installation/poetry' },
            { text: 'Docker', link: '/guide/installation/docker' },
            { text: 'Nix', link: '/guide/installation/nix' },
            { text: 'AppImage', link: '/guide/installation/appimage' },
            { text: 'Node Platforms', link: '/guide/installation/node-platforms' },
            { text: 'SaaS', link: '/guide/installation/saas' },
            { text: 'Fly.io', link: '/guide/installation/flyio' },
          ],
        },
        {
          text: 'Post-Install',
          collapsed: false,
          items: [
            { text: 'First Setup', link: '/guide/installation/first-setup' },
            { text: 'Process Manager', link: '/guide/installation/process-manager' },
            { text: 'Reverse Proxy', link: '/guide/installation/reverse-proxy' },
            { text: 'PostgreSQL', link: '/guide/installation/postgresql' },
            { text: 'Updating', link: '/guide/installation/updating' },
          ],
        },
        {
          text: 'Wallet Backends',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/guide/wallets/' },
            { text: 'CLNRest', link: '/guide/wallets/clnrest' },
            { text: 'LND REST', link: '/guide/wallets/lnd-rest' },
            { text: 'FakeWallet', link: '/guide/wallets/fakewallet' },
            { text: 'Comparison', link: '/guide/wallets/comparison' },
          ],
        },
        {
          text: 'Core Features',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/guide/core/' },
            { text: 'Using Extensions', link: '/guide/using-extensions' },
            { text: 'Wallets & Accounts', link: '/guide/core/wallets-and-accounts' },
            { text: 'API Keys', link: '/guide/core/api-keys' },
            { text: 'Payments', link: '/guide/core/payments' },
            { text: 'Labels', link: '/guide/core/labels/overview' },
            { text: 'Fiat Payments', link: '/guide/core/fiat-payments' },
            { text: 'Stripe', link: '/guide/core/fiat-stripe' },
            { text: 'PayPal', link: '/guide/core/fiat-paypal' },
            { text: 'Fiat Display', link: '/guide/core/fiat/overview' },
            { text: 'LNURL', link: '/guide/core/lnurl/overview' },
            { text: 'Environment', link: '/guide/core/environment' },
            { text: 'Database', link: '/guide/core/database' },
            { text: 'Notifications', link: '/guide/core/notifications' },
            { text: 'WebSockets', link: '/guide/core/websockets' },
            { text: 'Extension Builder', link: '/guide/core/extension-builder' },
            { text: 'Progressive Web App', link: '/guide/core/pwa' },
          ],
        },
        {
          text: 'Administration',
          collapsed: false,
          items: [
            { text: 'Admin Dashboard', link: '/guide/admin-dashboard' },
            { text: 'User Roles', link: '/guide/core/user-roles' },
            { text: 'Super User', link: '/guide/core/super-user' },
            { text: 'User Management', link: '/guide/core/user-management/' },
            { text: 'Node Management', link: '/guide/core/node-management' },
            { text: 'Security', link: '/guide/core/security' },
            { text: 'Authentication', link: '/guide/authentication' },
          ],
        },
        {
          text: 'FAQ',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/guide/faq/' },
            { text: 'General', link: '/guide/faq/general' },
            { text: 'Installation', link: '/guide/faq/installation' },
            { text: 'Wallets & Accounts', link: '/guide/faq/wallets' },
            { text: 'Wallet Backends', link: '/guide/faq/backends' },
            { text: 'Extensions', link: '/guide/faq/extensions' },
            { text: 'Payments', link: '/guide/faq/payments' },
            { text: 'Networking', link: '/guide/faq/networking' },
            { text: 'Hardware & Merchants', link: '/guide/faq/hardware' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'Quick Reference', link: '/api/quick-reference' },
            { text: 'Authentication', link: '/api/authentication' },
          ],
        },
        {
          text: 'Core Endpoints',
          collapsed: false,
          items: [
            { text: 'Wallets', link: '/api/core/wallets' },
            { text: 'Payments', link: '/api/core/payments' },
            { text: 'Users & Accounts', link: '/api/core/users' },
            { text: 'Extensions', link: '/api/core/extensions' },
            { text: 'LNURL', link: '/api/core/lnurl' },
            { text: 'Fiat & Rates', link: '/api/core/fiat' },
            { text: 'TinyURL', link: '/api/core/tinyurl' },
            { text: 'WebSockets', link: '/api/core/websockets' },
          ],
        },
        {
          text: 'Admin Endpoints',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/api/admin/' },
            { text: 'Settings', link: '/api/admin/settings' },
            { text: 'Users', link: '/api/admin/users' },
            { text: 'Top-up', link: '/api/admin/topup' },
            { text: 'Extensions', link: '/api/admin/extensions' },
          ],
        },
      ],
      '/dev/': [
        {
          text: 'Developer Guide',
          items: [
            { text: 'Architecture', link: '/dev/architecture' },
            { text: 'Building Extensions', link: '/dev/building-extensions' },
            { text: 'Wallet Backends', link: '/dev/wallet-backends' },
            { text: 'Database & Migrations', link: '/dev/database' },
            { text: 'Models & Types', link: '/dev/models' },
            { text: 'Decorators & Auth', link: '/dev/decorators' },
            { text: 'Background Tasks', link: '/dev/tasks' },
            { text: 'Fiat Provider Integration', link: '/dev/fiat-integration' },
            { text: 'Tools', link: '/dev/tools' },
            { text: 'Contributing', link: '/dev/contributing' },
          ],
        },
        {
          text: 'Deploying Extensions',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/dev/extensions/' },
            { text: 'Local Filesystem', link: '/dev/extensions/local' },
            { text: 'Remote Manifest', link: '/dev/extensions/manifest' },
            { text: 'Official Registry', link: '/dev/extensions/registry' },
            { text: 'Custom Marketplace', link: '/dev/extensions/custom-list' },
            { text: 'Auto-Install', link: '/dev/extensions/auto-install' },
            { text: 'Forked Distribution', link: '/dev/extensions/forked' },
            { text: 'Monetization', link: '/dev/extensions/monetization' },
            { text: 'Dependencies & Upgrades', link: '/dev/extensions/upgrades' },
            { text: 'Reference', link: '/dev/extensions/reference' },
          ],
        },
      ],
      '/extensions/': [
        {
          text: 'Extensions',
          items: [
            { text: 'Overview', link: '/extensions/' },
          ],
        },
        {
          text: 'Payments & Commerce',
          collapsed: false,
          items: [
            { text: 'LNURLp', link: '/extensions/lnurlp/' },
            { text: 'TPoS', link: '/extensions/tpos/' },
            { text: 'SatsPay', link: '/extensions/satspay/' },
            { text: 'Paywall', link: '/extensions/paywall/' },
            { text: 'Sell Coins', link: '/extensions/sellcoins/' },
            { text: 'Invoices', link: '/extensions/invoices/' },
            { text: 'Market', link: '/extensions/market/' },
            { text: 'Offline Shop', link: '/extensions/offlineshop/' },
            { text: 'WebShop', link: '/extensions/webshop/' },
            { text: 'Telegram Shopping', link: '/extensions/telegramshop/' },
          ],
        },
        {
          text: 'Wallet Tools',
          collapsed: false,
          items: [
            { text: 'Watch Only', link: '/extensions/watchonly/' },
            { text: 'Split Payments', link: '/extensions/splitpayments/' },
            { text: 'Scrub', link: '/extensions/scrub/' },
            { text: 'NWC Provider', link: '/extensions/nwcprovider/' },
            { text: 'LndHub', link: '/extensions/lndhub/' },
          ],
        },
        {
          text: 'Tips & Donations',
          collapsed: false,
          items: [
            { text: 'Withdraw', link: '/extensions/withdraw/' },
            { text: 'Tip Jar', link: '/extensions/tipjar/' },
            { text: 'Stream Alerts', link: '/extensions/streamalerts/' },
            { text: 'RaiseNow', link: '/extensions/raisenow/' },
          ],
        },
        {
          text: 'Hardware & Devices',
          collapsed: false,
          items: [
            { text: 'Bolt Cards', link: '/extensions/boltcards/' },
            { text: 'Bitcoin Switch', link: '/extensions/bitcoinswitch/' },
            { text: 'FOSSA (ATM)', link: '/extensions/fossa/' },
            { text: 'LNPoS', link: '/extensions/lnpos/' },
            { text: 'LNURL Device', link: '/extensions/lnurldevice/' },
          ],
        },
        {
          text: 'Swaps',
          collapsed: true,
          items: [
            { text: 'Boltz', link: '/extensions/boltz/' },
            { text: 'Deezy', link: '/extensions/deezy/' },
          ],
        },
        {
          text: 'Social & Nostr',
          collapsed: true,
          items: [
            { text: 'Nostr Client', link: '/extensions/nostrclient/' },
            { text: 'Nostr Market', link: '/extensions/nostrmarket/' },
            { text: 'Nostr NIP-5', link: '/extensions/nostrnip5/' },
            { text: 'Nostr Relay', link: '/extensions/nostrrelay/' },
            { text: 'Chat', link: '/extensions/chat/' },
            { text: 'Paid Reviews', link: '/extensions/paidreviews/' },
            { text: 'Pay2Review', link: '/extensions/pay2review/' },
            { text: 'Auction House', link: '/extensions/auctionhouse/' },
          ],
        },
        {
          text: 'Games & Gambling',
          collapsed: true,
          items: [
            { text: 'Coinflip', link: '/extensions/coinflip/' },
            { text: 'Sats Dice', link: '/extensions/satsdice/' },
            { text: 'Satspot', link: '/extensions/satspot/' },
            { text: 'BlackJack', link: '/extensions/blackjack/' },
            { text: 'Number Lottery', link: '/extensions/numberlottery/' },
            { text: 'Magic 8ball', link: '/extensions/eightball/' },
          ],
        },
        {
          text: 'Events & Streaming',
          collapsed: true,
          items: [
            { text: 'LN Ticket', link: '/extensions/lnticket/' },
            { text: 'Events', link: '/extensions/events/' },
            { text: 'LNCalendar', link: '/extensions/lncalendar/' },
            { text: 'Livestream', link: '/extensions/livestream/' },
            { text: 'Jukebox', link: '/extensions/jukebox/' },
            { text: 'Copilot', link: '/extensions/copilot/' },
          ],
        },
        {
          text: 'Utilities & Tools',
          collapsed: true,
          items: [
            { text: 'Decoder', link: '/extensions/decoder/' },
            { text: 'Device Timer', link: '/extensions/devicetimer/' },
            { text: 'Inventory', link: '/extensions/inventory/' },
            { text: 'Scheduler', link: '/extensions/scheduler/' },
            { text: 'Bleskomat', link: '/extensions/bleskomat/' },
            { text: 'SMTP', link: '/extensions/smtp/' },
            { text: 'Shipping', link: '/extensions/shipping/' },
            { text: 'WebPages', link: '/extensions/webpages/' },
            { text: 'TunnelMeOut', link: '/extensions/tunnel_me_out/' },
            { text: 'Where39', link: '/extensions/where39/' },
            { text: 'ChaosPad', link: '/extensions/chaospad/' },
            { text: 'Gerty', link: '/extensions/gerty/' },
          ],
        },
        {
          text: 'Management',
          collapsed: true,
          items: [
            { text: 'Scrum', link: '/extensions/scrum/' },
            { text: 'Orders', link: '/extensions/orders/' },
            { text: 'PaidTasks', link: '/extensions/paidtasks/' },
          ],
        },
      ],
      '/llm/': [
        {
          text: 'LLM Integration',
          items: [
            { text: 'Overview', link: '/llm/' },
            { text: 'System Prompt', link: '/llm/system-prompt' },
            { text: 'Skills Catalog', link: '/llm/skills' },
            { text: 'Create a Skill', link: '/llm/create-skill' },
            { text: 'MCP Server', link: '/llm/mcp-server' },
          ],
        },
        {
          text: 'Official Skills',
          collapsed: false,
          items: [
            { text: 'Wallet & Payments', link: '/llm/skills/wallet-payments' },
            { text: 'Lightning Address', link: '/llm/skills/lnurlp-pay-links' },
            { text: 'Shared Wallet (Uncle Jim)', link: '/llm/skills/shared-wallet' },
          ],
        },
        {
          text: 'Community Skills',
          collapsed: false,
          items: [
            { text: 'Coming soon' },
          ],
        },
      ],
      '/apps/': [
        {
          text: 'Companion Apps',
          items: [
            { text: 'Overview', link: '/apps/' },
          ],
        },
        {
          text: 'Apps',
          collapsed: false,
          items: [
            { text: 'TPoS Wrapper', link: '/apps/tpos-wrapper' },
          ],
        },
      ],
      '/plugins/': [
        {
          text: 'eCommerce Plugins',
          items: [
            { text: 'Overview', link: '/plugins/' },
          ],
        },
        {
          text: 'Plugins',
          collapsed: false,
          items: [
            { text: 'WooCommerce', link: '/plugins/woocommerce' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lnbits/lnbits' },
      { icon: 'youtube', link: 'https://www.youtube.com/@lnbits' },
      { icon: 'x', link: 'https://x.com/lnbits?lang=en' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="46 19 172 192"><path fill="currentColor" d="M210.8 199.4c0 3.1-2.5 5.7-5.7 5.7h-68c-3.1 0-5.7-2.5-5.7-5.7v-15.5c.3-19 2.3-37.2 6.5-45.5 2.5-5 6.7-7.7 11.5-9.1 9.1-2.7 24.9-.9 31.7-1.2 0 0 20.4.8 20.4-10.7s-9.1-8.6-9.1-8.6c-10 .3-17.7-.4-22.6-2.4-8.3-3.3-8.6-9.2-8.6-11.2-.4-23.1-34.5-25.9-64.5-20.1-32.8 6.2.4 53.3.4 116.1v8.4c0 3.1-2.6 5.6-5.7 5.6H57.7c-3.1 0-5.7-2.5-5.7-5.7v-144c0-3.1 2.5-5.7 5.7-5.7h31.7c3.1 0 5.7 2.5 5.7 5.7 0 4.7 5.2 7.2 9 4.5 11.4-8.2 26-12.5 42.4-12.5 36.6 0 64.4 21.4 64.4 68.7v83.2ZM150 99.3c0-6.7-5.4-12.1-12.1-12.1s-12.1 5.4-12.1 12.1 5.4 12.1 12.1 12.1S150 106 150 99.3Z"/></svg>'
        },
        link: 'https://primal.net/p/npub10efcj7x65z2ak6vd69xr8f2hvqwuaqrhlygl3yqa4y63hfvc02mqwzaeh3',
        ariaLabel: 'Nostr'
      },
    ],

    footer: {
      message: '<a href="https://news.lnbits.com" target="_blank">News</a> · <a href="https://shop.lnbits.com" target="_blank">Shop</a> · <a href="https://my.lnbits.com" target="_blank">SaaS</a> · <a href="https://t.me/lnbits" target="_blank">Telegram</a> · Released under the MIT License.',
      copyright: 'Copyright 2018-present LNbits Contributors',
    },

    search: {
      provider: 'local',
      options: {
        detailedView: true,
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: {
              title: 4,
              text: 2,
            },
          },
        },
      },
    },

    editLink: {
      pattern: 'https://github.com/lnbits/lnbits-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },

  mermaid: {
    theme: 'default',
  },
}))
