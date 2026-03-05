# First Setup

> What to do after installing LNbits — create your admin account, configure your instance, and connect a Lightning backend.

You've installed LNbits and it's running at `http://localhost:5000`. Here's what to do next.

## Step 1: Open the Admin UI

On first launch LNbits opens a setup wizard in the browser. Navigate to your instance and you'll be prompted to create a **Super User** account.

1. Open `http://localhost:5000` (or your server's address)
2. Create a username and password — this becomes the **Super User**
3. You're logged in with full admin privileges

The Super User identity is stored in `data/.super_user` and persists across restarts.

::: tip
The Super User is the highest-privilege account. It's the only account that can add or remove other admins. See [Super User](/guide/core/super-user) for details.
:::

## Step 2: Configure your instance

LNbits has two configuration layers:

| Layer | What it controls | How to edit |
| --- | --- | --- |
| **`.env` file** | Host, port, database URL, debug mode | Edit the file, restart LNbits |
| **Admin UI** | Site name, funding source, fees, themes, extensions | Change at runtime in the browser |

When the Admin UI is enabled (default), settings like the funding source and site title are managed in the browser — editing them in `.env` has no effect. See [Configuration](/guide/core/environment) for the full reference.

### Minimum `.env` settings

Most users only need to set a few values in `.env`:

```bash
# Host and port (defaults shown)
HOST=0.0.0.0
PORT=5000

# Database — SQLite is fine for testing, use PostgreSQL for production
# LNBITS_DATABASE_URL=postgres://user:pass@localhost:5432/lnbits
```

Everything else can be configured through the Admin UI after login.

## Step 3: Connect a Lightning backend

LNbits needs a funding source — a Lightning node or service that handles real payments.

1. Open **Admin UI → Funding**
2. Select your backend (LND REST, CLNRest, etc.)
3. Enter the connection details (endpoint, certificate, macaroon)
4. Save and verify the connection

::: tip
No Lightning node yet? LNbits ships with **FakeWallet** for testing. It simulates payments without real sats. See [FakeWallet](/guide/wallets/fakewallet).
:::

See [Wallet Backends](/guide/wallets/) for setup guides for each supported backend.

## Step 4: Production checklist

For a production deployment, work through these:

- [ ] **HTTPS** — set up a [reverse proxy](/guide/installation/reverse-proxy) with Nginx or Caddy
- [ ] **PostgreSQL** — [migrate from SQLite](/guide/installation/postgresql) for reliability and performance
- [ ] **Process manager** — run LNbits as a [systemd service or with PM2](/guide/installation/process-manager) so it survives reboots
- [ ] **Backups** — back up your `data/` directory and database regularly
- [ ] **Security** — review the [security guide](/guide/core/security)

## Next steps

- [Core Features](/guide/core/) — wallets, payments, API keys, extensions
- [Extensions](/extensions/) — add functionality to your instance
- [User Management](/guide/core/user-management/) — create accounts for others

## Related Pages

- [Admin Dashboard](/guide/admin-dashboard) — server administration overview
- [Super User](/guide/core/super-user) — highest-privilege account details
- [Configuration](/guide/core/environment) — all environment variables
- [Wallet Backends](/guide/wallets/) — connect a Lightning node
