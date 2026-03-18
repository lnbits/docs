# Extensions FAQ

> Common questions about installing, updating, building, and troubleshooting LNbits extensions.

[[toc]]

## How do I install extensions?

1. Log in to your LNbits instance
2. Click **Extensions** in the left sidebar
3. Find the extension you want and click **Install** / **Enable**

Admins can restrict which extensions are available to users. Some extensions require additional configuration after installation. See [Using Extensions](/guide/using-extensions).

## Where are third-party extensions?

Third-party extensions are hosted in external manifest files. To add a custom source:

**Via the UI** (Admin only): Go to **Admin Dashboard** → **Server** → **Extension Sources** and add the manifest URL.

**Via `.env`**:

```bash
LNBITS_EXTENSIONS_MANIFESTS='["https://example.com/extensions/manifest.json"]'
```

See [Custom Marketplace](/dev/extensions/custom-list) for details on creating and hosting your own manifest.

## How do I add a custom extension source?

You can add custom extension sources through either the Admin Dashboard UI or environment variables:

**Admin Dashboard**: Navigate to **Server** → **Extension Sources** → add the manifest URL.

**Environment variable**:

```bash
LNBITS_EXTENSIONS_MANIFESTS='["https://raw.githubusercontent.com/user/repo/main/manifest.json"]'
```

Multiple sources can be combined as a JSON array. Extensions from all configured sources appear in the Extensions page.

## How do I update extensions?

When an update is available, a notification badge appears on the extension in the Extensions page. Click the extension and choose **Update**. Updates download the new version and run any database migrations automatically.

For auto-install of specific extensions on startup, see [Auto-Install](/dev/extensions/auto-install).

## Is extension data deleted on uninstall?

**No.** Uninstalling (disabling) an extension removes it from the UI but preserves all its data in the database. If you re-enable the extension later, your data will still be there.

This means you can safely disable extensions you're not using without losing configuration or transaction history.

## Can I build my own extension?

Yes. LNbits extensions follow a standard structure with:

- A Python backend (FastAPI routes, database models)
- A Vue.js frontend (Quasar components, Jinja2 templates)
- A `manifest.json` for distribution

See [Building Extensions](/dev/building-extensions) for the development guide and [Deploying Extensions](/dev/extensions/) for distribution options.

## What are the most popular extensions?

Some widely used extensions include:

| Extension | Purpose |
|---|---|
| **LNURLp** | Static payment links and QR codes |
| **LNURLw** | Withdrawable vouchers and faucets |
| **TPoS** | Point-of-sale terminal |
| **SatsPay** | Payment pages (Lightning + on-chain) |
| **LNDhub** | Mobile wallet connector (BlueWallet, Zeus) |
| **Boltz** | Submarine swaps (Lightning ↔ on-chain) |
| **Bolt Cards** | NFC tap-to-pay cards |
| **FOSSA** | Bitcoin ATM |
| **Bitcoin Switch** | IoT device control on payment |
| **Split Payments** | Automatic revenue sharing |
| **Watch Only** | On-chain wallet monitoring |
| **TipJar** | Accept tips with custom pages |

Browse all available extensions on the [Extensions](/extensions/) page.

## Extension won't install — common causes

If an extension fails to install:

1. **Version mismatch** — the extension may require a newer LNbits version. Check the extension's `manifest.json` for `min_lnbits_version`.
2. **Manifest unreachable** — ensure the extension source URL is accessible from your server. Check network/firewall.
3. **Dependency errors** — check LNbits logs for Python import errors or missing packages.
4. **Disk space** — ensure sufficient disk space for downloading the extension.
5. **Permissions** — the LNbits process needs write access to the extensions directory.

Check logs for specific error messages:

```bash
docker compose logs lnbits | tail -50
```

## Extension data missing after update

Database migrations run automatically when LNbits starts. If data appears missing after an update:

1. **Check logs for migration errors** — failed migrations may leave the database in an inconsistent state
2. **Verify the extension version** — ensure you're running the expected version
3. **Check the database** — the data may still exist but the schema changed. Look for renamed tables or columns in the migration files.
4. **Report the issue** — if data is genuinely lost, file a [GitHub issue](https://github.com/lnbits/lnbits/issues) with the migration error logs

## How do I restrict which extensions are available?

Admins can control extension availability:

- **Admin Dashboard** → **Server** → **Extensions**: Enable or disable extensions for all users
- **`LNBITS_DISABLED_EXTENSIONS`**: Comma-separated list of extension IDs to disable

```bash
LNBITS_DISABLED_EXTENSIONS=tipjar,satsdice
```

Disabled extensions are hidden from the Extensions page for all non-admin users.

## Related Pages

- [Using Extensions](/guide/using-extensions) — install and manage extensions
- [Building Extensions](/dev/building-extensions) — development guide
- [Deploying Extensions](/dev/extensions/) — distribution options
- [Custom Marketplace](/dev/extensions/custom-list) — host your own extension source
