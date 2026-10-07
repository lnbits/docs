# Using Extensions

> How to browse, install, activate, and manage LNbits extensions that add features like point-of-sale terminals, LNURL tools, and submarine swaps.

Extensions add features to LNbits - from point-of-sale terminals to atomic swaps.

## Extension types

- [WASM extensions](/extensions/wasm/) run in a sandbox with explicit host permissions. These docs cover the core runtime in LNbits 1.6.2.
- [Python extensions](/extensions/python/) run within the LNbits application. Install code from sources you trust.

Both types are installed on the instance and enabled per account. Check the extension's supported LNbits versions before installing.

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

### Python installation via the API

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

## WASM wallet permissions

A WASM extension may ask to create invoices, watch payments, or send background payouts. Review the selected wallet, per-payment maximum, and allowed destinations before approving a background grant. The maximum applies to each payment, not total spending.

You can decline a request; the extension should explain which feature needs approval. See [WASM Extensions](/extensions/wasm/#wallet-permissions) for the user overview and [Permissions and payments](/dev/extensions/wasm/permissions) for the developer model.

## Extension URLs

| Type | UI | API |
| --- | --- | --- |
| Python | `/<extension-id>/` | `/<extension-id>/api/v1/...` |
| Core WASM | `/ext/<extension-id>` (or declared subroute) | `/api/v1/ext/<extension-id>/...` |

WASM iframe pages call APIs through the LNbits bridge. Public pages have only the public routes declared by the extension. The older WASM host uses different URLs; check legacy examples' compatibility notes.

## Uninstalling

```bash
curl -X DELETE https://your-lnbits.com/api/v1/extension/EXTENSION_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

::: info Data is preserved
Uninstalling an extension removes its code and UI, but **does not delete its database tables**. Your data is preserved and will be restored if the extension is reinstalled.
:::

## Extension sources

LNbits discovers releases through manifest files. Administrators configure Python and WASM sources separately in extension settings or environment variables:

```bash
# Python sources
LNBITS_EXTENSIONS_MANIFESTS='["https://example.com/python-extensions.json"]'

# Core WASM sources
LNBITS_WASM_EXTENSIONS_MANIFESTS='["https://example.com/wasm-extensions.json"]'
```

These examples replace the source lists; retain the official source URLs if you want both official and custom releases. See [Python manifests](/dev/extensions/python/manifest) and [WASM deployment](/dev/extensions/wasm/deployment#wasm-manifests) for formats and registry links.

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
- [Developing Extensions](/dev/extensions/) - choose WASM or Python and build your own
- [WASM Extensions](/extensions/wasm/) - compatibility, permissions, and administration
- [Python Extensions](/extensions/python/) - application-level integrations
