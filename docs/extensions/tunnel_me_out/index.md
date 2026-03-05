<ExtensionHeader
  name="TunnelMeOut"
  description="One-click reverse tunnel for public access."
  category="Utilities & Tools"
  icon="🔗"
  repo="lnbits/tunnel_me_out"
/>

## Overview

TunnelMeOut requests a hosted reverse proxy from [lnpro.xyz](https://lnpro.xyz) so your local LNbits instance can be reached publicly — no port forwarding, dynamic DNS, or Tor required. Pay with Lightning for the number of days you need.

## How It Works

1. Choose how many days of tunnel access you want
2. Pay the Lightning invoice
3. The extension creates an SSH tunnel to lnpro.xyz automatically
4. You get a public URL pointing to your local LNbits

## Features

- **One-click setup** — no manual SSH configuration needed
- **Pay-per-day** — pay with Lightning for the duration you need
- **Auto-activation** — tunnel starts as soon as payment is confirmed
- **Top-up support** — extend your tunnel without reconfiguration
- **Auto-cleanup** — stale entries older than a week are pruned automatically

## Use Cases

- **Quick demos** — share your local LNbits instance with others
- **Development testing** — test webhooks and callbacks that require a public URL
- **Temporary access** — make LNbits reachable without permanent infrastructure
- **Getting started** — try LNbits publicly before setting up a reverse proxy

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Enter the number of days you want
3. Click **Top up tunnel** and pay the invoice
4. The public URL is displayed once the tunnel is active

To extend an existing tunnel, use **Top up tunnel** again — it reuses the same proxy.

## API Reference

See the [TunnelMeOut API documentation](./api) for endpoint details.

## Related Pages

- [TunnelMeOut API Reference](./api): API endpoints for this extension
- [Reverse Proxy](/guide/installation/reverse-proxy): Set up a permanent reverse proxy
- [Networking FAQ](/guide/faq/networking): Networking and access questions
- [All Extensions](/extensions/): Browse all LNbits extensions
