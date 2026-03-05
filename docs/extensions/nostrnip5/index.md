<ExtensionHeader
  name="Nostr NIP-5"
  description="Sell Nostr NIP-05 verification identifiers."
  category="Social & Nostr"
  icon="✅"
  repo="lnbits/nostrnip5"
/>

## Overview

Nostr NIP-5 lets you sell NIP-05 verification (e.g., `alice@yourdomain.com`) to Nostr users on a domain you control. Users pay Lightning to register their npub, and the extension serves the `.well-known/nostr.json` endpoint automatically. Requires a reverse proxy setup to serve the endpoint at your domain root.

## Features

- **Domain verification** — sell `username@yourdomain.com` NIP-05 identifiers
- **Lightning payment** — users pay to register
- **Fiat pricing** — set prices in your preferred fiat currency
- **Auto-serve** — extension provides the `nostr.json` API endpoint
- **Multiple domains** — manage verification for multiple domains

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Click **New Domain**:
   - Select a wallet and fiat currency
   - Set the registration price
   - Enter your domain name
3. Configure your reverse proxy to route `https://yourdomain.com/.well-known/nostr.json` to the extension endpoint

### Nginx Example

```nginx
location /.well-known/nostr.json {
    proxy_pass https://your-lnbits/nostrnip5/api/v1/domain/{domain_id}/nostr.json;
    proxy_set_header Host your-lnbits;
    proxy_ssl_server_name on;
}
```

### Caddy Example

```
yourdomain.com {
    route /.well-known/nostr.json {
        rewrite * /nostrnip5/api/v1/domain/{domain_id}/nostr.json
        reverse_proxy your-lnbits
    }
}
```

## API Reference

See the [Nostr NIP-5 API documentation](./api) for endpoint details.

## Related Pages

- [Nostr NIP-5 API Reference](./api): API endpoints for this extension
- [Nostr Relay](/extensions/nostrrelay/): Run your own relay
- [Nostr Client](/extensions/nostrclient/): Relay multiplexer
- [All Extensions](/extensions/): Browse all LNbits extensions
