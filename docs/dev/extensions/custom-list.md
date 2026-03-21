# Custom Marketplace

> Replace or extend the default LNbits extension marketplace with your own curated manifest - ideal for enterprise, white-label, and industry-specific deployments.

You can replace or supplement the official extension registry with your own curated list of extensions. This is useful for controlled environments where you want to limit which extensions are available.

## Replace the default manifest

To completely replace the official registry with your own:

```bash
LNBITS_EXTENSIONS_MANIFESTS='["https://your-company.com/extensions/manifest.json"]'
```

When set, only extensions from your manifest(s) appear in the install UI. The official registry is no longer queried.

## Add alongside the official registry

To add your manifest while keeping the official registry:

```bash
LNBITS_EXTENSIONS_MANIFESTS='["https://raw.githubusercontent.com/lnbits/lnbits-extensions/main/extensions.json", "https://your-company.com/extensions/manifest.json"]'
```

Extensions from all manifests are merged and displayed together.

## Via the Admin UI

1. Go to **Admin** → **Server** → **Extension Sources**
2. Add or remove manifest URLs
3. Click **Save**

Changes take effect immediately - no restart needed.

## Use cases

### Industry-specific stacks

Curate a manifest for your industry:

```json
{
  "extensions": [
    {"id": "tpos", "name": "TPoS", "version": "1.0.0", "archive": "...", "hash": "..."},
    {"id": "lnurlp", "name": "LNURLp", "version": "1.0.0", "archive": "...", "hash": "..."},
    {"id": "invoices", "name": "Invoices", "version": "1.0.0", "archive": "...", "hash": "..."}
  ]
}
```

**Merchant stack:** TPoS, LNURLp, SatsPay, Split Payments, TipJar
**Developer stack:** NWC Provider, Decoder, Scheduler
**Content creator stack:** Paywall, TipJar, Livestream

### White-label deployments

For branded LNbits instances:

1. Host your own manifest with only approved extensions
2. Include your own custom extensions alongside standard ones
3. Pin specific versions for stability
4. Set `LNBITS_EXTENSIONS_MANIFESTS` to your manifest only

### Enterprise / internal tools

For organizations running LNbits internally:

- Host the manifest on your intranet (no public access needed)
- Include internal extensions not available publicly
- Control exactly which versions are deployed
- Audit and approve all extensions before making them available

## Hosting tips

- **HTTPS required** - LNbits only fetches manifests over HTTPS
- **Static hosting works** - GitHub Pages, Netlify, S3, or any static file server
- **Version your manifest** - keep previous versions accessible for rollback
- **CDN for archives** - use a CDN for archive downloads if serving many instances
- **Pin versions** - don't overwrite archive URLs; create new URLs for new versions

## Restricting extension installation

Combine custom manifests with admin settings for full control:

```bash
# Only allow these extensions to be installed
LNBITS_ADMIN_EXTENSIONS=tpos,lnurlp,satspay

# Auto-install specific extensions for every user
LNBITS_EXTENSIONS_DEFAULT_INSTALL=tpos,lnurlp
```

## Related Pages

- [Deploying Extensions](/dev/extensions/) - all deployment methods
- [Remote Manifest](/dev/extensions/manifest) - manifest format and fields
- [Auto-install](/dev/extensions/auto-install) - pre-configure extensions
- [Forked Distribution](/dev/extensions/forked) - bundle extensions into a custom build
