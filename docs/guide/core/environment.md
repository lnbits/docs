# Configuration

> Complete reference of all LNbits environment variables — server, database, admin, auth, fees, rate limiting, extensions, and notifications.

LNbits is configured through environment variables, typically set in a `.env` file.

## `.env` file vs Admin UI {#env-vs-admin-ui}

LNbits has two layers of configuration: the `.env` file and the **Admin UI**. Understanding which one controls what is critical — getting this wrong means your changes silently do nothing.

### How it works

When `LNBITS_ADMIN_UI=true` (the default for most setups), LNbits splits settings into two groups:

1. **`.env`-only settings** — always read from the `.env` file, never managed by the Admin UI
2. **Admin UI settings** — stored in the database, managed through the Admin UI. **The `.env` values for these are ignored.**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/diagrams/config-layers-dark.svg">
  <img src="/diagrams/config-layers-light.svg" alt="Configuration layers — .env-only settings vs Admin UI settings" style="max-width: 580px; width: 100%; margin: 16px auto; display: block;" />
</picture>

::: warning
When Admin UI is enabled, editing settings like `LNBITS_SITE_TITLE` or `LNBITS_BACKEND_WALLET_CLASS` in your `.env` file has **no effect**. You must change them through the Admin UI or the [Admin API](/api/admin/settings).
:::

### `.env`-only settings

These are always read from the `.env` file regardless of whether Admin UI is enabled. They control low-level server behavior that must be set before LNbits starts.

| Variable | Default | Description |
| --- | --- | --- |
| `LNBITS_ADMIN_UI` | `false` | Enable/disable the Admin UI itself |
| `HOST` | `127.0.0.1` | Server bind address |
| `PORT` | `5000` | Server bind port |
| `LNBITS_DATA_FOLDER` | `./data` | SQLite data directory |
| `LNBITS_DATABASE_URL` | — | PostgreSQL/CockroachDB connection string |
| `SUPER_USER` | — | Super user ID (highest privilege) |
| `AUTH_SECRET_KEY` | auto | Secret key for JWT signing |
| `FIRST_INSTALL_TOKEN` | — | Required token for `/first_install` page |
| `DEBUG` | `false` | Enable debug logging |
| `DEBUG_DATABASE` | `false` | Log all database queries |
| `BUNDLE_ASSETS` | `true` | Bundle static assets for production |
| `ENABLE_LOG_TO_FILE` | `true` | Write logs to `data/logs/` |
| `LOG_ROTATION` | `100 MB` | Log file rotation threshold |
| `LOG_RETENTION` | `3 months` | How long to keep log files |
| `FORWARDED_ALLOW_IPS` | `*` | Trusted proxy IPs for HTTPS headers |
| `LNBITS_EXTENSIONS_PATH` | `./lnbits/` | Directory for extension installation |
| `LNBITS_EXTENSIONS_DEFAULT_INSTALL` | — | Extensions to auto-install on every restart |
| `LNBITS_EXTENSIONS_MANIFESTS` | official | Extension manifest URLs |
| `LNBITS_EXT_GITHUB_TOKEN` | — | GitHub token to avoid API rate limits |
| `LNBITS_ALLOWED_FUNDING_SOURCES` | all | Funding sources shown in Admin UI |
| `FUNDING_SOURCE_MAX_RETRIES` | `4` | Connection retries before falling back to VoidWallet |

### Settings that move to Admin UI

When `LNBITS_ADMIN_UI=true`, the following settings are **ignored in `.env`** and managed through the Admin UI instead. Their initial values are seeded from the `.env` on first run, then stored in the database `settings` table.

| Category | Variables |
| --- | --- |
| **Site branding** | `LNBITS_SITE_TITLE`, `LNBITS_SITE_TAGLINE`, `LNBITS_SITE_DESCRIPTION`, `LNBITS_CUSTOM_LOGO`, `LNBITS_THEME_OPTIONS`, `LNBITS_HIDE_API` |
| **Funding source** | `LNBITS_BACKEND_WALLET_CLASS` and all backend-specific vars (LND, CLN, Eclair, etc.) |
| **Authentication** | `AUTH_TOKEN_EXPIRE_MINUTES`, `AUTH_ALLOWED_METHODS`, OAuth provider configs (Google, GitHub, Keycloak) |
| **Fees** | `LNBITS_SERVICE_FEE`, `LNBITS_SERVICE_FEE_WALLET`, `LNBITS_SERVICE_FEE_MAX`, `LNBITS_RESERVE_FEE_MIN`, `LNBITS_RESERVE_FEE_PERCENT` |
| **Rate limiting** | `LNBITS_RATE_LIMIT_NO`, `LNBITS_RATE_LIMIT_UNIT`, `LNBITS_ALLOWED_IPS`, `LNBITS_BLOCKED_IPS` |
| **Users** | `LNBITS_ALLOWED_USERS`, `LNBITS_ADMIN_USERS`, `LNBITS_ALLOW_NEW_ACCOUNTS` |
| **Extensions** | `LNBITS_ADMIN_EXTENSIONS`, `LNBITS_USER_DEFAULT_EXTENSIONS`, `LNBITS_EXTENSIONS_DEACTIVATE_ALL` |
| **Wallet limits** | `LNBITS_WALLET_LIMIT_MAX_BALANCE`, `LNBITS_WALLET_LIMIT_DAILY_MAX_WITHDRAW`, `LNBITS_WALLET_LIMIT_SECS_BETWEEN_TRANS` |
| **Node UI** | `LNBITS_NODE_UI`, `LNBITS_PUBLIC_NODE_UI`, `LNBITS_NODE_UI_TRANSACTIONS` |
| **Other** | `LNBITS_DEFAULT_WALLET_NAME`, `LNBITS_AD_SPACE`, `LNBITS_CUSTOM_BADGE`, `LNBITS_ALLOWED_CURRENCIES`, `LIGHTNING_INVOICE_EXPIRY` |

### Resetting Admin UI settings back to `.env`

If you need to go back to file-based configuration:

1. Set `LNBITS_ADMIN_UI=false` in your `.env`
2. Clear the `settings` table from the database:
   ```sql
   DELETE FROM settings;
   ```
3. Restart LNbits — it will read all values from `.env` again

::: tip
The `.env.example` file in the [LNbits repository](https://github.com/lnbits/lnbits/blob/dev/.env.example) marks which settings are `.env`-only with clear `###### .env ONLY SETTINGS ######` comment blocks. When in doubt, check the source.
:::

## Core settings

### Server

| Variable | Default | Description |
| --- | --- | --- |
| `HOST` | `127.0.0.1` | Bind address |
| `PORT` | `5000` | Bind port |
| `DEBUG` | `false` | Enable debug mode |
| `LNBITS_SITE_TITLE` | `LNbits` | Site title shown in the UI |
| `LNBITS_SITE_TAGLINE` | `free and open-source...` | Tagline on login page |
| `BUNDLE_ASSETS` | `true` | Bundle static assets for production |

### Database

| Variable | Default | Description |
| --- | --- | --- |
| `LNBITS_DATA_FOLDER` | `./data` | SQLite data directory |
| `LNBITS_DATABASE_URL` | — | PostgreSQL or CockroachDB connection string |

```bash
# SQLite (default)
LNBITS_DATA_FOLDER=./data

# PostgreSQL
LNBITS_DATABASE_URL=postgres://user:pass@localhost:5432/lnbits

# CockroachDB
LNBITS_DATABASE_URL=cockroachdb://user:pass@localhost:26257/lnbits
```

### Admin

| Variable | Default | Description |
| --- | --- | --- |
| `LNBITS_ADMIN_UI` | `false` | Enable the admin settings dashboard |
| `LNBITS_ADMIN_USERS` | — | Comma-separated user IDs with admin access |
| `SUPER_USER` | — | Super user ID (full system access) |
| `LNBITS_ALLOWED_USERS` | — | Restrict login to these user IDs only |
| `LNBITS_ALLOW_NEW_ACCOUNTS` | `true` | Allow new user registration |

### Theming

| Variable | Default | Description |
| --- | --- | --- |
| `LNBITS_THEME_OPTIONS` | all themes | Comma-separated list of available themes |
| `LNBITS_CUSTOM_LOGO` | — | URL to a custom logo image |
| `LNBITS_HIDE_API` | `false` | Hide the API section in the UI |

Available themes: `classic`, `bitcoin`, `flamingo`, `freedom`, `mint`, `autumn`, `monochrome`, `salvador`, `cyber`

## Authentication

| Variable | Default | Description |
| --- | --- | --- |
| `AUTH_SECRET_KEY` | auto-generated | Secret key for signing JWT tokens |
| `AUTH_TOKEN_EXPIRE_MINUTES` | `525960` (1 year) | Token validity period |
| `AUTH_ALLOWED_METHODS` | all | Comma-separated list of allowed auth methods |

### OAuth providers

```bash
# Google
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-secret

# GitHub
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-secret

# Keycloak
KEYCLOAK_CLIENT_ID=lnbits
KEYCLOAK_CLIENT_SECRET=your-secret
KEYCLOAK_DISCOVERY_URL=https://keycloak.example.com/realms/master/.well-known/openid-configuration
```

## Fees

| Variable | Default | Description |
| --- | --- | --- |
| `LNBITS_SERVICE_FEE` | `0` | Service fee percentage (e.g., `0.5` for 0.5%) |
| `LNBITS_RESERVE_FEE_MIN` | `2000` | Minimum reserve in millisatoshis |
| `LNBITS_RESERVE_FEE_PERCENT` | `1.0` | Reserve fee percentage |
| `LNBITS_WALLET_LIMIT_MAX_BALANCE` | `0` | Maximum wallet balance (0 = unlimited) |
| `LNBITS_SERVICE_FEE_WALLET` | — | Wallet ID that receives service fees |

## Rate limiting

| Variable | Default | Description |
| --- | --- | --- |
| `LNBITS_RATE_LIMIT_NO` | `200` | Number of requests allowed |
| `LNBITS_RATE_LIMIT_UNIT` | `minute` | Time unit (`second`, `minute`, `hour`) |
| `LNBITS_ALLOWED_IPS` | — | Whitelist of IP addresses |
| `LNBITS_BLOCKED_IPS` | — | Blocklist of IP addresses |

## Extensions

| Variable | Default | Description |
| --- | --- | --- |
| `LNBITS_EXTENSIONS_DEFAULT_INSTALL` | — | Extensions to auto-install on startup |
| `LNBITS_ADMIN_EXTENSIONS` | — | Extensions only admins can activate |
| `LNBITS_USER_DEFAULT_EXTENSIONS` | — | Extensions auto-activated for new users |
| `LNBITS_EXTENSIONS_DEACTIVATE_ALL` | `false` | Disable all extensions (core-only mode) |
| `LNBITS_EXTENSIONS_MANIFESTS` | official | Extension manifest URLs |

## Notifications

```bash
# Email (SMTP)
LNBITS_EMAIL_HOST=smtp.example.com
LNBITS_EMAIL_PORT=587
LNBITS_EMAIL_USERNAME=user@example.com
LNBITS_EMAIL_PASSWORD=your-password
LNBITS_EMAIL_NOTIFICATIONS_TO_EMAILS=admin@example.com
```

## Funding source

Set the backend with:

```bash
LNBITS_BACKEND_WALLET_CLASS=VoidWallet
```

See [Funding Sources](/guide/wallets/) for all backend-specific configuration.

## Example `.env`

```bash
# Server
HOST=0.0.0.0
PORT=5000

# Database
LNBITS_DATABASE_URL=postgres://lnbits:secret@localhost:5432/lnbits

# Admin
LNBITS_ADMIN_UI=true
LNBITS_ADMIN_USERS=abc123,def456

# Funding source
LNBITS_BACKEND_WALLET_CLASS=LndRestWallet
LND_REST_ENDPOINT=https://localhost:8080
LND_REST_CERT=/path/to/tls.cert
LND_REST_MACAROON=hex-encoded-macaroon

# Fees
LNBITS_SERVICE_FEE=0.5
LNBITS_RESERVE_FEE_MIN=2000

# Theme
LNBITS_SITE_TITLE=My LNbits
LNBITS_THEME_OPTIONS=classic,bitcoin,mint
```

## Next steps

- [Funding Sources](/guide/wallets/) — backend-specific configuration
- [Reverse Proxy](/guide/installation/reverse-proxy) — Nginx / Caddy setup
- [Security](/guide/core/security) — hardening your instance

## Related Pages

- [Core Features](/guide/core/index.md)
- [Docker Installation](/guide/installation/docker.md)
- [Admin Dashboard](/guide/admin-dashboard.md)
