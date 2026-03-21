# Auto-Install Extensions

> Pre-configure extensions to install automatically when LNbits starts - useful for Docker, automated deployments, and managed instances.

Auto-install lets you specify which extensions should be installed automatically when LNbits starts. This is essential for reproducible deployments where you want a consistent set of extensions.

## Configuration

```bash
LNBITS_EXTENSIONS_DEFAULT_INSTALL=tpos,lnurlp,satspay,withdraw
```

Comma-separated list of extension IDs. On startup, LNbits will:

1. Check if each listed extension is already installed
2. Download and install any that are missing
3. Run database migrations
4. Make them available for activation

## Re-install behavior

If an auto-install extension is uninstalled by an admin, it will be **reinstalled on the next restart**. This ensures the configured extensions are always present.

To permanently remove an auto-installed extension, remove it from `LNBITS_EXTENSIONS_DEFAULT_INSTALL` before uninstalling.

## Docker example

```yaml
services:
  lnbits:
    image: lnbits/lnbits:latest
    restart: unless-stopped
    environment:
      - LNBITS_BACKEND_WALLET_CLASS=FakeWallet
      - LNBITS_ADMIN_UI=true
      - LNBITS_EXTENSIONS_DEFAULT_INSTALL=tpos,lnurlp,satspay,withdraw,boltz
    volumes:
      - ./data:/app/data
      - ./.env:/app/.env
    ports:
      - "5000:5000"
```

## Docker Compose with custom manifest

Combine auto-install with a custom manifest for full control:

```yaml
services:
  lnbits:
    image: lnbits/lnbits:latest
    environment:
      - LNBITS_EXTENSIONS_MANIFESTS=["https://your-company.com/manifest.json"]
      - LNBITS_EXTENSIONS_DEFAULT_INSTALL=tpos,lnurlp,custom_ext
```

## Default extensions for new users

Separate from auto-install, you can configure which extensions are enabled by default for new users:

```bash
# Auto-install (instance-level: ensures extensions are downloaded)
LNBITS_EXTENSIONS_DEFAULT_INSTALL=tpos,lnurlp,withdraw

# User defaults (user-level: enables extensions in new user dashboards)
LNBITS_USER_DEFAULT_EXTENSIONS=tpos,lnurlp
```

Both settings work together:
- `LNBITS_EXTENSIONS_DEFAULT_INSTALL` ensures the extensions are **installed** on the instance
- `LNBITS_USER_DEFAULT_EXTENSIONS` ensures they are **enabled** for new users

## Use cases

| Scenario | Configuration |
| --- | --- |
| Merchant POS deployment | `LNBITS_EXTENSIONS_DEFAULT_INSTALL=tpos,lnurlp` |
| Developer testing | `LNBITS_EXTENSIONS_DEFAULT_INSTALL=decoder,nwcprovider` |
| Full-featured instance | `LNBITS_EXTENSIONS_DEFAULT_INSTALL=tpos,lnurlp,withdraw,satspay,boltz` |
| Managed SaaS | Custom manifest + auto-install + user defaults |

## Related Pages

- [Deploying Extensions](/dev/extensions/) - all deployment methods
- [Custom Marketplace](/dev/extensions/custom-list) - curate your own extension list
- [Using Extensions](/guide/using-extensions) - user-facing extension management
- [Reference](/dev/extensions/reference) - all environment variables
