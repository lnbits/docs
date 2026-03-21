# Using Extensions

> How to browse, install, activate, and manage LNbits extensions that add features like point-of-sale terminals, LNURL tools, and submarine swaps.

Extensions add features to LNbits - from point-of-sale terminals to atomic swaps.

## Browsing extensions

1. Log in to your LNbits account
2. Click **Extensions** in the sidebar (or the manage extensions icon)
3. Browse the available extensions with descriptions, ratings, and version info

## Installing an extension

### Via the UI

1. Find the extension in the extensions list
2. Click **Install**
3. Wait for download and database setup
4. Click **Enable** to activate it for your account

### Via the API

```bash
# Install
curl -X POST https://your-lnbits.com/api/v1/extension \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"ext_id": "lnurlp", "source_repo": "official"}'

# Activate for your account
curl -X PUT https://your-lnbits.com/api/v1/extension/lnurlp \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"active": true}'
```

## Core extensions

LNbits ships with these built-in extensions:

| Extension | Description |
| --- | --- |
| **LNURLp** | Create static LNURL-pay links and payment pages |
| **TPoS** | Point-of-sale terminal for merchants |
| **Withdraw** | LNURL-withdraw link management |
| **Paywall** | Gate content behind Lightning payments |
| **SatsPay** | On-chain + Lightning payment pages for merchants |
| **Boltz** | Submarine swaps (on-chain ↔ Lightning) |
| **NWC Provider** | Nostr Wallet Connect server |
| **Watch Only** | Monitor on-chain wallets (xpub/zpub) |
| **Split Payments** | Automatically split incoming payments |
| **Scrub** | Forward payments to external wallets |
| **TipJar** | Receive tips with custom pages |
| **Decoder** | Decode BOLT11 invoices and LNURL |

## Extension management

### Per-user activation

Extensions are installed instance-wide but activated per-user. Each user chooses which extensions they want in their dashboard.

### Admin-only extensions

Admins can restrict certain extensions:

```bash
LNBITS_ADMIN_EXTENSIONS=watchonly,boltz
```

### Default extensions for new users

```bash
LNBITS_USER_DEFAULT_EXTENSIONS=lnurlp,tpos
```

## Extension URLs

Once activated, each extension is available at:

```
https://your-lnbits.com/<extension-id>/
```

Extension API endpoints are at:

```
https://your-lnbits.com/<extension-id>/api/v1/...
```

## Uninstalling

```bash
curl -X DELETE https://your-lnbits.com/api/v1/extension/EXTENSION_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

::: info Data is preserved
Uninstalling an extension removes its code and UI, but **does not delete its database tables**. Your data is preserved and will be restored if the extension is reinstalled.
:::

## Extension manifest format

LNbits discovers extensions through manifest files - JSON documents that list available extensions and their download URLs. The official LNbits registry is a manifest, and you can add custom manifests.

### Adding custom extension sources

```bash
# Via environment variable
LNBITS_EXTENSIONS_MANIFESTS='["https://example.com/my-manifest.json"]'
```

Or via the Admin UI under **Admin** → **Server** → **Extension Sources**.

Manifests support two modes:
- **Explicit release** - each version is listed directly with a download URL and hash
- **GitHub repository** - LNbits auto-discovers releases from a GitHub repo

See [Remote Manifest](/dev/extensions/manifest) for the full manifest format specification.

## Three-state activation

Extensions have three states:

| State | Description |
| --- | --- |
| **Not installed** | Extension is not present on the instance |
| **Installed (disabled)** | Code is present but not active for any user |
| **Installed (enabled)** | Active and available - users can toggle it in their dashboard |

Admins control installation and instance-level enablement. Individual users control whether an enabled extension appears in their personal dashboard.

## Related Pages

- [Extensions Directory](/extensions/) - browse all available LNbits extensions
- [Admin Dashboard](/guide/admin-dashboard) - manage extensions and server settings
- [Building Extensions](/dev/building-extensions) - develop your own LNbits extensions
- [Deploying Extensions](/dev/extensions/) - packaging, distribution, and installation methods
