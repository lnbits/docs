# LNBits Documentation - VitePress Architecture Plan v2

## Vision

A modern, LLM-enhanced VitePress documentation site for LNBits that serves developers, operators, and merchants. Built from the **actual live API** at `demo.lnbits.com/docs` and `demo.lnbits.com/redoc`. Features integrated Claude chat for context-aware Q&A, LLM model dropdown with context control, and dedicated pages for every **active** extension.

> **Source of truth**: `https://demo.lnbits.com/docs` (Swagger) and `https://demo.lnbits.com/redoc` (ReDoc)
> These expose the real OpenAPI spec for Core + all active extensions.

---

## Project Tree

```
lnbits-docs/
│
├── .vitepress/
│   ├── config.ts                      # Main config: sidebar, nav, theme, head, markdown plugins
│   ├── theme/
│   │   ├── index.ts                   # Custom theme entry (extends default VitePress theme)
│   │   ├── Layout.vue                 # Layout wrapper: injects LLMChat + LLMContextBanner
│   │   ├── styles/
│   │   │   ├── vars.css               # CSS custom properties (Lightning orange, dark navy)
│   │   │   ├── overrides.css          # VitePress default theme overrides
│   │   │   └── components.css         # Custom component styles
│   │   └── components/
│   │       │
│   │       │  # ── LLM COMPONENTS ──
│   │       ├── LLMChat.vue            # ⚡ Claude chat slide-over panel
│   │       ├── LLMModelDropdown.vue   # ⚡ Model selector (Sonnet/Haiku/GPT/Local)
│   │       ├── LLMContextBanner.vue   # ⚡ Shows page context being fed to LLM
│   │       ├── LLMSuggestedQuestions.vue # ⚡ Auto-generated questions per page
│   │       │
│   │       │  # ── API COMPONENTS ──
│   │       ├── APIPlayground.vue      # Live endpoint tester (sends real requests)
│   │       ├── EndpointBlock.vue      # Styled REST endpoint block (method, path, auth)
│   │       ├── SchemaViewer.vue       # Pydantic model / JSON schema accordion viewer
│   │       ├── ResponseExample.vue    # Collapsible request/response examples
│   │       │
│   │       │  # ── CONTENT COMPONENTS ──
│   │       ├── ExtensionCard.vue      # Card for extension grid
│   │       ├── ExtensionGrid.vue      # Filterable grid for /extensions/ overview
│   │       ├── FundingSourceTable.vue # Interactive comparison table
│   │       ├── CopyBlock.vue          # Code block with copy button
│   │       ├── ArchDiagram.vue        # Mermaid architecture diagram wrapper
│   │       └── SearchEnhanced.vue     # Search with LLM fallback
│   │
│   ├── plugins/
│   │   ├── llm-context.ts            # Build: generates llms.txt + llms-full.txt
│   │   ├── openapi-sync.ts           # Build: fetches demo.lnbits.com/openapi.json
│   │   ├── extension-loader.ts       # Build: generates extension pages from manifest
│   │   └── api-extractor.ts          # Build: transforms OpenAPI → per-endpoint markdown
│   │
│   └── data/
│       ├── openapi.json              # Full OpenAPI spec (pulled from demo.lnbits.com)
│       ├── extensions-manifest.json  # Extension registry (from lnbits-extensions repo)
│       ├── funding-sources.json      # Structured wallet comparison data
│       └── core-endpoints.json       # Extracted & categorized core API endpoints
│
├── public/
│   ├── llms.txt                       # 🤖 Concise site map for LLM consumption
│   ├── llms-full.txt                  # 🤖 Full docs as clean plaintext
│   ├── logo.svg
│   ├── og-image.png
│   └── favicon.ico
│
├── index.md                           # Landing page hero
│
│
│ ══════════════════════════════════════════════════════════════════
│  PART 1: CORE DOCUMENTATION
│ ══════════════════════════════════════════════════════════════════
│
├── guide/                             # ═══ USER GUIDE ═══
│   ├── index.md                       # Getting started overview
│   ├── what-is-lnbits.md             # Architecture, philosophy, use cases
│   │
│   ├── installation/
│   │   ├── index.md                   # Installation decision tree
│   │   ├── uv.md                      # UV install (recommended)
│   │   ├── poetry.md                  # Poetry install
│   │   ├── docker.md                  # Docker / Docker Compose
│   │   ├── nix.md                     # Nix flake
│   │   ├── appimage.md               # AppImage desktop
│   │   ├── node-platforms.md          # Umbrel, RaspiBlitz, myNode, Start9, Citadel
│   │   ├── saas.md                    # LNBits SaaS (lnbits.com hosted)
│   │   ├── reverse-proxy.md          # Caddy / Nginx + HTTPS + clearnet
│   │   ├── postgresql.md             # PostgreSQL setup for production
│   │   └── updating.md               # Update procedures (all methods)
│   │
│   ├── wallets/                       # Funding Sources
│   │   ├── index.md                   # Overview + how to switch backends
│   │   ├── clnrest.md                # Core Lightning REST (runes)
│   │   ├── lnd-rest.md               # LND REST
│   │   ├── lnd-grpc.md               # LND gRPC
│   │   ├── corelightning.md          # Core Lightning (direct RPC)
│   │   ├── spark.md                   # Spark (Core Lightning + Spark L2)
│   │   ├── eclair.md                  # Eclair (ACINQ)
│   │   ├── phoenixd.md               # Phoenixd
│   │   ├── lnbits-wallet.md          # LNBits as funding source
│   │   ├── opennode.md               # OpenNode
│   │   ├── alby.md                    # Alby
│   │   ├── blink.md                   # Blink
│   │   ├── lnpay.md                   # LNPay
│   │   ├── nwc.md                     # Nostr Wallet Connect
│   │   ├── strike.md                  # Strike
│   │   ├── zbd.md                     # ZBD
│   │   ├── boltz-standalone.md       # Boltz standalone (non-custodial docker)
│   │   ├── breez-sdk.md              # Breez SDK
│   │   ├── breez-liquid.md           # Breez Liquid SDK
│   │   ├── greenlight.md             # Greenlight (Blockstream)
│   │   ├── lntips.md                  # LN.tips / SatsMobiBot
│   │   ├── fakewallet.md             # Fake Wallet (testing)
│   │   └── comparison.md             # Interactive side-by-side table
│   │
│   ├── core/                          # ═══ CORE FEATURES (THIS IS KEY) ═══
│   │   ├── index.md                   # Core features overview
│   │   │
│   │   │  # ── WALLET & ACCOUNTS ──
│   │   ├── wallets-and-accounts.md   # Wallet creation, multiple wallets per user
│   │   ├── api-keys.md               # Admin Key vs Invoice Key, key rotation
│   │   │
│   │   │  # ── USER MANAGEMENT ──
│   │   ├── user-management.md        # Full user management guide
│   │   │   ├── user-roles.md         # SuperUser / Admin / User / Allowed Users
│   │   │   ├── super-user.md         # Superuser setup, .super_user file, security
│   │   │   ├── admin-ui.md           # Admin UI panel: settings, themes, topup
│   │   │   ├── allowed-users.md      # Restricting access (LNBITS_ALLOWED_USERS)
│   │   │   └── accounts-api.md       # POST /api/v1/account, user creation flow
│   │   │
│   │   │  # ── PAYMENTS ──
│   │   ├── payments.md               # Complete payment lifecycle
│   │   │   ├── create-invoice.md     # POST /api/v1/payments (out=false)
│   │   │   ├── pay-invoice.md        # POST /api/v1/payments (out=true)
│   │   │   ├── pay-lnurl.md          # POST /api/v1/payments/lnurl
│   │   │   ├── check-payment.md      # GET /api/v1/payments/{hash}
│   │   │   ├── decode-invoice.md     # POST /api/v1/payments/decode
│   │   │   ├── payment-history.md    # GET /api/v1/payments/history
│   │   │   ├── pending-payments.md   # GET /api/v1/payments/pending
│   │   │   ├── sse-listener.md       # GET /api/v1/payments/sse (Server-Sent Events)
│   │   │   └── webhooks.md           # Payment webhook dispatch
│   │   │
│   │   │  # ── LABELS ──
│   │   ├── labels.md                  # Payment labels system
│   │   │   ├── overview.md           # What labels are, how to use them
│   │   │   ├── create-labels.md      # Creating and assigning labels to payments
│   │   │   ├── filter-by-label.md    # Querying/filtering payments by label
│   │   │   └── labels-api.md         # Label-related API endpoints
│   │   │
│   │   │  # ── FIAT / CURRENCY ──
│   │   ├── fiat.md                    # Fiat currency integration
│   │   │   ├── overview.md           # How fiat tracking works in LNBits
│   │   │   ├── exchange-rates.md     # GET /api/v1/rate/{currency}
│   │   │   ├── rate-history.md       # GET /api/v1/rate/history
│   │   │   ├── currencies.md         # GET /api/v1/currencies (available currencies)
│   │   │   ├── conversion.md         # POST /api/v1/conversion (sat↔fiat↔BTC)
│   │   │   ├── fiat-tracking.md      # fiat_amount + fiat_currency on payments
│   │   │   └── wallet-currency.md    # Setting wallet display currency
│   │   │
│   │   │  # ── LNURL ──
│   │   ├── lnurl.md                   # LNURL protocol support
│   │   │   ├── lnurl-auth.md         # POST /api/v1/lnurlauth (LNURL-auth)
│   │   │   ├── lnurl-scan.md         # POST /api/v1/lnurlscan
│   │   │   └── supported-luds.md     # All supported LUD specs
│   │   │
│   │   │  # ── INFRASTRUCTURE ──
│   │   ├── security.md               # Killswitch, CORS, rate limits, TLS
│   │   ├── environment.md            # Complete .env reference
│   │   ├── database.md               # SQLite vs PostgreSQL, migrations, conv.py
│   │   ├── websockets.md             # WebSocket API (real-time notifications)
│   │   └── node-management.md        # Built-in node management UI
│   │
│   ├── faq.md                         # Frequently asked questions
│   └── troubleshooting.md            # Common issues + solutions
│
│
├── api/                               # ═══ API REFERENCE ═══
│   ├── index.md                       # API overview: base URL, auth, rate limits
│   │
│   ├── core/                          # Core API (tag: "Core" in OpenAPI)
│   │   ├── index.md                   # Core API overview
│   │   │
│   │   │  # All endpoints from api_router (tags=["Core"])
│   │   ├── health.md                 # GET  /api/v1/health
│   │   ├── status.md                 # GET  /api/v1/status
│   │   ├── wallets.md                # GET  /api/v1/wallets
│   │   ├── wallet.md                 # GET  /api/v1/wallet
│   │   │                              # PUT  /api/v1/wallet
│   │   │                              # PATCH /api/v1/wallet
│   │   │                              # DELETE /api/v1/wallet
│   │   ├── wallet-create.md          # POST /api/v1/wallet
│   │   ├── account.md                # POST /api/v1/account (create user)
│   │   │
│   │   │  # Payments
│   │   ├── payments.md               # POST /api/v1/payments (create/pay invoice)
│   │   │                              # GET  /api/v1/payments (list)
│   │   ├── payments-paginated.md     # GET  /api/v1/payments/paginated
│   │   ├── payment-by-hash.md        # GET  /api/v1/payments/{payment_hash}
│   │   ├── payments-decode.md        # POST /api/v1/payments/decode
│   │   ├── payments-lnurl.md         # POST /api/v1/payments/lnurl
│   │   ├── payments-sse.md           # GET  /api/v1/payments/sse
│   │   ├── payments-history.md       # GET  /api/v1/payments/history
│   │   ├── payments-pending.md       # GET  /api/v1/payments/pending
│   │   │
│   │   │  # Fiat & Conversion
│   │   ├── rate.md                    # GET  /api/v1/rate/{currency}
│   │   ├── rate-history.md           # GET  /api/v1/rate/history
│   │   ├── currencies.md             # GET  /api/v1/currencies
│   │   ├── conversion.md             # POST /api/v1/conversion
│   │   │
│   │   │  # LNURL
│   │   ├── lnurlscan.md              # POST /api/v1/lnurlscan
│   │   ├── lnurlauth.md              # POST /api/v1/lnurlauth
│   │   │
│   │   │  # WebSockets
│   │   └── websocket.md              # WS  /api/v1/ws/{item_id}
│   │
│   ├── admin/                         # Admin / Extension Management API
│   │   ├── index.md                   # Admin API overview
│   │   ├── settings.md               # GET/PUT /admin/api/v1/settings
│   │   ├── users.md                   # User management admin endpoints
│   │   ├── topup.md                   # PUT /admin/api/v1/topup (add sats to wallet)
│   │   └── extensions.md             # Extension install/enable/disable endpoints
│   │
│   ├── websockets.md                  # WebSocket protocol reference
│   ├── error-codes.md                # HTTP error codes + LNBits specific errors
│   └── sdks.md                        # Client SDKs: JS, Python, Rust, Dart, Flutter
│
│
├── dev/                               # ═══ DEVELOPER GUIDE ═══
│   ├── index.md                       # Developer overview
│   ├── architecture.md               # System architecture (FastAPI + Vue + DB)
│   ├── setup.md                       # Dev environment (Polar, hot-reload, debug)
│   │
│   ├── extensions/                    # Extension Development
│   │   ├── index.md                   # Extension dev overview
│   │   ├── getting-started.md        # Fork myextension, first steps
│   │   ├── structure.md              # File structure: __init__, models, crud, views, etc.
│   │   ├── models.md                 # models.py - Pydantic models
│   │   ├── migrations.md             # migrations.py - DB table creation
│   │   ├── views.md                   # views.py - Frontend routes
│   │   ├── views-api.md              # views_api.py - API routes
│   │   ├── crud.md                    # crud.py - Database operations
│   │   ├── tasks.md                   # tasks.py - Background tasks
│   │   ├── templates.md              # Vue/Quasar templates (frontend)
│   │   ├── manifest.md               # manifest.json format
│   │   ├── publishing.md             # Submit to lnbits-extensions registry
│   │   ├── paid-extensions.md        # Paywall model for commercial extensions
│   │   └── best-practices.md         # No new deps, testing, code style
│   │
│   ├── core-helpers.md               # Core helper functions & utilities
│   ├── decorators.md                 # require_admin_key, require_invoice_key, etc.
│   ├── services.md                    # Core services: create_invoice, pay_invoice, etc.
│   ├── testing.md                     # pytest, mock_data, CI/CD
│   ├── database.md                    # SQLite↔PostgreSQL migration (conv.py)
│   ├── frontend.md                   # Vue.js / Quasar / lnbits-dynamic-fields
│   └── contributing.md               # Contribution guidelines
│
│
│ ══════════════════════════════════════════════════════════════════
│  PART 2: EXTENSIONS (one page per ACTIVE extension)
│ ══════════════════════════════════════════════════════════════════
│
├── extensions/                        # ═══ EXTENSION DOCS ═══
│   ├── index.md                       # Extension marketplace overview + filterable grid
│   │
│   │  # ═══ PAYMENTS & COMMERCE ═══
│   ├── lnurlp/
│   │   ├── index.md                   # LNURL Pay Links + Lightning Addresses
│   │   └── api.md                     # /lnurlp/api/v1/links (CRUD + callbacks)
│   ├── withdraw/
│   │   ├── index.md                   # LNURL Withdraw - vouchers, faucets
│   │   └── api.md                     # /withdraw/api/v1/links
│   ├── tpos/
│   │   ├── index.md                   # Touch Point of Sale terminal
│   │   └── api.md                     # /tpos/api/v1/
│   ├── satspay/
│   │   ├── index.md                   # SatsPay Server - charges (LN + onchain)
│   │   └── api.md                     # /satspay/api/v1/charge
│   ├── paywall/
│   │   ├── index.md                   # Content paywalling
│   │   └── api.md                     # /paywall/api/v1/paywalls
│   ├── tipjar/
│   │   ├── index.md                   # Tip Jar - accept donations
│   │   └── api.md                     # /tipjar/api/v1/
│   ├── invoices/
│   │   ├── index.md                   # Invoice generator for clients
│   │   └── api.md                     # /invoices/api/v1/
│   ├── lnticket/
│   │   ├── index.md                   # Paid support tickets via LN
│   │   └── api.md                     # /lnticket/api/v1/
│   ├── events/
│   │   ├── index.md                   # Ticketed events management
│   │   └── api.md                     # /events/api/v1/
│   ├── offlineshop/
│   │   ├── index.md                   # Self-service offline LN payments
│   │   └── api.md                     # /offlineshop/api/v1/
│   │
│   │  # ═══ WALLET & ACCOUNT TOOLS ═══
│   ├── lndhub/
│   │   ├── index.md                   # LNDhub compat - BlueWallet / Zeus
│   │   └── api.md                     # /lndhub/api/v1/ + /lndhub/ext/
│   ├── splitpayments/
│   │   ├── index.md                   # Revenue splitting across wallets
│   │   └── api.md                     # /splitpayments/api/v1/
│   ├── scrub/
│   │   ├── index.md                   # Auto-forward funds to LNURL/address
│   │   └── api.md                     # /scrub/api/v1/
│   ├── usermanager/
│   │   ├── index.md                   # Multi-tenant wallet management
│   │   └── api.md                     # /usermanager/api/v1/
│   ├── watchonly/
│   │   ├── index.md                   # Onchain wallet monitoring (xpub)
│   │   └── api.md                     # /watchonly/api/v1/
│   ├── lnurlpayout/
│   │   ├── index.md                   # Batch withdrawals via LNURL
│   │   └── api.md                     # /lnurlpayout/api/v1/
│   │
│   │  # ═══ SWAP & EXCHANGE ═══
│   ├── boltz/
│   │   ├── index.md                   # LN ↔ onchain swaps (Boltz Exchange)
│   │   └── api.md                     # /boltz/api/v1/
│   ├── deezy/
│   │   ├── index.md                   # Alternative LN↔onchain swap
│   │   └── api.md                     # /deezy/api/v1/
│   ├── cashu/
│   │   ├── index.md                   # Ecash mint (Chaumian eCash)
│   │   └── api.md                     # /cashu/api/v1/
│   │
│   │  # ═══ NOSTR & SOCIAL ═══
│   ├── nostrnip5/
│   │   ├── index.md                   # Sell NIP-05 identity verification
│   │   └── api.md                     # /nostrnip5/api/v1/
│   ├── nostrmarket/
│   │   ├── index.md                   # Decentralized Nostr marketplace
│   │   └── api.md                     # /nostrmarket/api/v1/
│   │
│   │  # ═══ HARDWARE & IoT ═══
│   ├── boltcards/
│   │   ├── index.md                   # NFC BoltCard linking & management
│   │   └── api.md                     # /boltcards/api/v1/
│   ├── lnurldevice/
│   │   ├── index.md                   # LNURL Device: PoS hardware, ATMs, vending
│   │   └── api.md                     # /lnurldevice/api/v1/
│   ├── bleskomat/
│   │   ├── index.md                   # Bitcoin ATM integration
│   │   └── api.md                     # /bleskomat/api/v1/
│   ├── gerty/
│   │   ├── index.md                   # E-ink dashboard gadget
│   │   └── api.md                     # /gerty/api/v1/
│   │
│   │  # ═══ COMMUNICATION ═══
│   ├── discordbot/
│   │   ├── index.md                   # LN tips in Discord
│   │   └── api.md                     # /discordbot/api/v1/
│   ├── smtp/
│   │   ├── index.md                   # Email notifications via SMTP
│   │   └── api.md                     # /smtp/api/v1/
│   ├── streamalert/
│   │   ├── index.md                   # Streamer donation alerts
│   │   └── api.md                     # /streamalert/api/v1/
│   ├── copilot/
│   │   ├── index.md                   # Streamer donation animations
│   │   └── api.md                     # /copilot/api/v1/
│   │
│   │  # ═══ MARKETS & GAMES ═══
│   ├── market/
│   │   ├── index.md                   # Online shop (Diagon Alley)
│   │   └── api.md                     # /market/api/v1/
│   ├── satsdice/
│   │   ├── index.md                   # Provably fair dice games
│   │   └── api.md                     # /satsdice/api/v1/
│   ├── hivemind/
│   │   ├── index.md                   # Prediction markets
│   │   └── api.md                     # /hivemind/api/v1/
│   │
│   │  # ═══ INFRASTRUCTURE ═══
│   ├── ngrok/
│   │   ├── index.md                   # Tunnel to clearnet via ngrok
│   │   └── api.md                     # /ngrok/api/v1/
│   │
│   │  # ═══ MEDIA ═══
│   ├── jukebox/
│   │   ├── index.md                   # Spotify jukebox (pay-per-play)
│   │   └── api.md                     # /jukebox/api/v1/
│   ├── livestream/
│   │   ├── index.md                   # Track sales + revenue splitting
│   │   └── api.md                     # /livestream/api/v1/
│   │
│   │  # ═══ DOMAIN & IDENTITY ═══
│   ├── lnaddress/
│   │   ├── index.md                   # Free Lightning Address on your domain
│   │   └── api.md                     # /lnaddress/api/v1/
│   ├── subdomains/
│   │   ├── index.md                   # Sell subdomains via Lightning
│   │   └── api.md                     # /subdomains/api/v1/
│   │
│   │  # ═══ POINT OF SALE ═══
│   └── lnurlpos/
│       ├── index.md                   # Offline LNURL PoS
│       └── api.md                     # /lnurlpos/api/v1/
│
│
│ ══════════════════════════════════════════════════════════════════
│  PART 3: LLM LAYER
│ ══════════════════════════════════════════════════════════════════
│
├── llm/
│   ├── index.md                       # LLM features overview page
│   ├── context-format.md             # How context is structured for LLMs
│   └── prompt-templates.md           # Pre-built prompts for LNBits dev tasks
│
│
│ ══════════════════════════════════════════════════════════════════
│  BUILD SCRIPTS & CONFIG
│ ══════════════════════════════════════════════════════════════════
│
├── scripts/
│   ├── sync-openapi.ts                # Fetches /openapi.json from demo server
│   ├── extract-endpoints.ts          # Parses OpenAPI → per-tag endpoint files
│   ├── fetch-extensions.ts           # Pulls extension manifest from registry
│   ├── generate-llm-files.ts         # Builds llms.txt + llms-full.txt
│   └── generate-extension-pages.ts   # Scaffolds extension pages from manifest
│
├── package.json
├── tsconfig.json
├── .env.example                       # ANTHROPIC_API_KEY, LNBITS_DEMO_URL, etc.
└── README.md
```

---

## Core API Endpoints (from `demo.lnbits.com/docs`)

These are the **actual endpoints** served by the LNBits Core FastAPI router, grouped by the tag system used in the OpenAPI spec.

### Tag: `Core`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/v1/health` | None | Server time + uptime |
| `GET` | `/api/v1/status` | User | Version, funding source info (admin only sees full) |
| `GET` | `/api/v1/wallets` | User | List all wallets for current user |
| `GET` | `/api/v1/wallet` | Key | Get wallet details (name, balance) |
| `POST` | `/api/v1/wallet` | User | Create new wallet for user |
| `PUT` | `/api/v1/wallet` | Admin | Update wallet (rename, etc.) |
| `PATCH` | `/api/v1/wallet` | Admin | Partial wallet update |
| `DELETE` | `/api/v1/wallet` | Admin | Delete/soft-delete wallet |
| `POST` | `/api/v1/account` | None | Create new user account + first wallet |
| `POST` | `/api/v1/payments` | Key | Create invoice (out=false) or pay invoice (out=true) |
| `GET` | `/api/v1/payments` | Key | List payments for wallet |
| `GET` | `/api/v1/payments/paginated` | Key | Paginated payment list |
| `GET` | `/api/v1/payments/{hash}` | Key | Get specific payment by hash |
| `POST` | `/api/v1/payments/decode` | Key | Decode bolt11 / LNURL |
| `POST` | `/api/v1/payments/lnurl` | Admin | Pay via LNURL |
| `GET` | `/api/v1/payments/sse` | Key | Server-Sent Events for payment updates |
| `GET` | `/api/v1/payments/history` | Key | Payment history chart data |
| `GET` | `/api/v1/payments/pending` | Key | List pending payments |
| `GET` | `/api/v1/rate/{currency}` | None | Fiat exchange rate + sat price |
| `GET` | `/api/v1/rate/history` | User | Exchange rate history |
| `GET` | `/api/v1/currencies` | None | List available fiat currencies |
| `POST` | `/api/v1/conversion` | None | Convert between sat ↔ fiat ↔ BTC |
| `POST` | `/api/v1/lnurlscan` | Admin | Scan/resolve LNURL |
| `POST` | `/api/v1/lnurlauth` | Admin | Perform LNURL-auth |
| `WS` | `/api/v1/ws/{item_id}` | None | WebSocket real-time data |

### Tag: `Admin` (SuperUser / Admin only)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/admin/api/v1/settings` | Admin | Get all server settings |
| `PUT` | `/admin/api/v1/settings` | Admin | Update server settings |
| `PUT` | `/admin/api/v1/topup` | Admin | Add sats to any wallet |
| `GET` | `/admin/api/v1/users` | Admin | List all users |
| Various | `/admin/api/v1/extensions/*` | Admin | Extension management |

### Tag: `Core NON-API Website Routes` (generic.py - not in schema)

These are internal routes that serve the frontend but are excluded from the OpenAPI spec (`include_in_schema=False`):

- `GET /wallet` - Wallet page (renders Vue app)
- `GET /extensions` - Extensions management page
- `GET /lnurlwallet` - LNURL-withdraw wallet creation
- `GET /manifest/{usr}.webmanifest` - PWA manifest

---

## Core Features - Detailed Coverage

### 1. Labels System

Labels allow users to tag and categorize payments for accounting and filtering.

```
guide/core/labels/
├── overview.md        # What labels are, UI walkthrough
├── create-labels.md   # How to create, assign, edit labels
├── filter-by-label.md # Filtering payments by label in UI + API
└── labels-api.md      # API endpoints for label CRUD
```

**Key topics to cover:**
- Label creation via UI and API
- Assigning labels to payments (on creation, after-the-fact)
- Label-based filtering in payment list / export
- Labels in CSV export for accounting
- Label colors and organization

### 2. Fiat Currency / Exchange Rates

LNBits has deep fiat integration: wallets can display in fiat, payments track fiat value at transaction time.

```
guide/core/fiat/
├── overview.md          # How fiat works in LNBits
├── exchange-rates.md    # GET /api/v1/rate/{currency} - live rates
├── rate-history.md      # GET /api/v1/rate/history - chart data
├── currencies.md        # GET /api/v1/currencies - list all supported
├── conversion.md        # POST /api/v1/conversion - sat↔fiat↔BTC
├── fiat-tracking.md     # fiat_amount + fiat_currency stored per payment
└── wallet-currency.md   # Per-wallet display currency setting
```

**Key topics to cover:**
- `satoshis_amount_as_fiat()` and `fiat_amount_as_satoshis()` helpers
- Exchange rate provider configuration
- fiat_amount / fiat_currency columns in payments table
- Tax reporting: fiat value at transaction time vs. current value
- TPoS extension integration with fiat display
- LNBITS_EXCHANGE_RATE_CACHE settings

### 3. User Management

The full user hierarchy: SuperUser → Admin Users → Regular Users → Allowed Users.

```
guide/core/user-management/
├── user-roles.md       # Hierarchy: superuser > admin > user
├── super-user.md       # .super_user file, URL, security
├── admin-ui.md         # Admin panel: settings, themes, topup
├── allowed-users.md    # LNBITS_ALLOWED_USERS restriction
└── accounts-api.md     # POST /api/v1/account flow
```

**Key topics to cover:**
- SuperUser: first-run setup, `.super_user` file, env var
- Admin Users: `LNBITS_ADMIN_USERS`, what they can/cannot do
- Allowed Users: restricting instance to specific user IDs
- `LNBITS_ALLOW_NEW_ACCOUNTS` setting
- Authentication methods: user ID, username/password, OAuth, Nostr
- User deletion, wallet recovery, export

---

## Active Extensions (from demo server default install)

These are the extensions available in `LNBITS_EXTENSIONS_DEFAULT_INSTALL`:

```
watchonly, satspay, streamalert, tipjar, lnticket,
invoices, boltcards, paywall, subdomains, discordbot,
bleskomat, jukebox, splitpayments, withdraw, tpos,
smtp, livestream, ngrok, events, lndhub,
lnurlpayout, diagonalley/market, copilot, lnurlpos,
deezy, lnaddress, satsdice, offlineshop, lnurlp,
usermanager, cashu, nostrnip5, gerty, scrub,
hivemind, boltz, lnurldevice
```

**Total: ~37 active extensions**, each getting its own page with:
1. Overview (what, why, quick start)
2. Configuration
3. API Reference (from `/{ext}/api/v1/` in OpenAPI spec)
4. Use cases + examples
5. FAQ

---

## LLM Integration Architecture

### Claude Chat (`LLMChat.vue`)

```
┌──────────────────────────────────────────────────────────────┐
│  VitePress Page                                               │
│  ┌──────────────────────────────┐  ┌───────────────────────┐ │
│  │                              │  │ 💬 Ask Claude          │ │
│  │  # Payment Labels            │  │ ────────────────────── │ │
│  │                              │  │ Context: labels.md     │ │
│  │  Labels allow you to tag     │  │ Tokens: 2,847          │ │
│  │  payments for accounting     │  │                        │ │
│  │  and filtering...            │  │ 🤖 Claude Sonnet ▼     │ │
│  │                              │  │ ┌──────────────────┐   │ │
│  │  ## Creating Labels          │  │ │ Sonnet 4.5       │   │ │
│  │  ...                         │  │ │ Haiku 4.5        │   │ │
│  │                              │  │ │ Local (Ollama)   │   │ │
│  │                              │  │ └──────────────────┘   │ │
│  │                              │  │                        │ │
│  │                              │  │ Q: How do I filter     │ │
│  │                              │  │ payments by label      │ │
│  │                              │  │ via the API?           │ │
│  │                              │  │                        │ │
│  │                              │  │ A: You can filter...   │ │
│  └──────────────────────────────┘  └───────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

**Context injection per page:**
```json
{
  "system": "You are an LNBits documentation assistant...",
  "context": {
    "current_page": "guide/core/labels/overview.md",
    "page_content": "<full markdown>",
    "section": "Core Features > Labels",
    "related_pages": [
      "api/core/payments.md",
      "guide/core/fiat/fiat-tracking.md"
    ],
    "llm_summary": "Labels system for categorizing payments..."
  }
}
```

### LLM Model Dropdown (`LLMModelDropdown.vue`)

- **Models**: Claude Sonnet 4.5 (default), Claude Haiku 4.5, GPT-4o, Local/Ollama
- **Context levels**: "This page" / "This section" / "Full docs"
- **Token counter**: Real-time display of context window usage
- **API key mode**: Proxy (default) or BYOK (bring your own key)

### llms.txt / llms-full.txt

Auto-generated at build time. Format:

```
# LNBits Documentation
> Free, open-source Lightning Network wallet and accounts system

## Core
- /guide/core/wallets-and-accounts: Create wallets, manage API keys (admin vs invoice)
- /guide/core/labels: Tag payments with labels for filtering and accounting
- /guide/core/fiat: Exchange rates, fiat tracking, currency conversion (sat↔fiat↔BTC)
- /guide/core/user-management: User roles (superuser/admin/user), allowed users, auth
- /guide/core/payments: Invoice lifecycle, payment flow, SSE, webhooks

## API Reference
- /api/core/payments: POST /api/v1/payments - create/pay invoices
- /api/core/rate: GET /api/v1/rate/{currency} - fiat exchange rates
- /api/core/conversion: POST /api/v1/conversion - sat/fiat/BTC conversion
- /api/core/wallets: GET /api/v1/wallets - list user wallets

## Extensions
- /extensions/lnurlp: LNURL Pay Links + Lightning Addresses
- /extensions/tpos: Touch Point of Sale with fiat display
- /extensions/boltz: LN↔onchain swaps via Boltz Exchange
- /extensions/cashu: Ecash mint (Chaumian eCash)
[... all 37 extensions ...]
```

---

## Build Phases

### Phase 1 - Core Foundation
- [ ] VitePress project + custom theme (dark-first, Lightning orange)
- [ ] Landing page hero
- [ ] OpenAPI sync script (fetches from demo.lnbits.com/openapi.json)
- [ ] Complete `/guide/` - installation, wallets, core features
- [ ] Core features deep-dive: **Labels**, **Fiat/Currency**, **User Management**
- [ ] Core API reference (all endpoints from OpenAPI spec)
- [ ] `llms.txt` + `llms-full.txt` generation

### Phase 2 - LLM Integration
- [ ] `LLMChat.vue` - Claude panel with page-context injection
- [ ] `LLMModelDropdown.vue` - model selector + context level control
- [ ] `LLMContextBanner.vue` - shows what's being sent
- [ ] `LLMSuggestedQuestions.vue` - auto questions per page
- [ ] Serverless proxy (Netlify Functions / CF Workers)
- [ ] System prompt engineering for LNBits domain expertise

### Phase 3 - All Active Extensions
- [ ] Extension page template with consistent structure
- [ ] Extension grid overview (filterable by category)
- [ ] Individual pages for all ~37 active extensions
- [ ] Per-extension API docs (extracted from OpenAPI per-tag)
- [ ] Cross-linking between related extensions
- [ ] Use case recipes (e.g., "Merchant setup: TPoS + Boltz + Scrub")

### Phase 4 - Advanced Features
- [ ] `APIPlayground.vue` - live endpoint testing
- [ ] `SchemaViewer.vue` - interactive Pydantic model explorer
- [ ] Architecture diagrams (Mermaid)
- [ ] Funding source comparison tool (interactive)
- [ ] Search with LLM fallback
- [ ] GitHub Actions CI/CD: auto-sync from repos → rebuild → deploy

---

## Technology Stack

| Layer | Technology |
|---|---|
| Static Site | VitePress 1.x (Vue 3 + Vite) |
| Styling | VitePress default + CSS variables (Lightning palette) |
| LLM Chat | Anthropic API (Claude Sonnet 4.5) via serverless proxy |
| LLM Proxy | Netlify Functions / Cloudflare Workers |
| API Docs | Auto-extracted from `/openapi.json` |
| Search | VitePress MiniSearch + LLM fallback |
| Diagrams | Mermaid.js |
| Deployment | Netlify / Vercel / GitHub Pages |
| CI/CD | GitHub Actions (sync, build, deploy) |
| Content Sync | Scripts pull from lnbits repos on schedule |

---

## Design Direction

- **Theme**: Dark-first (`#0F172A` navy) with Lightning orange (`#F7931A`) accents
- **Typography**: JetBrains Mono (code) + clean sans (prose)
- **Signature**: Subtle ⚡ motifs in section dividers, API method badges
- **Chat panel**: Glassmorphism slide-over, feels like native AI assistant
- **API blocks**: Color-coded by method (GET=green, POST=blue, PUT=orange, DELETE=red)
