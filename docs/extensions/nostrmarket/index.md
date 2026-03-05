<ExtensionHeader
  name="Nostr Market"
  description="Nostr-based marketplace for Lightning commerce."
  category="Social & Nostr"
  icon="🟣"
  repo="lnbits/nostrmarket"
/>

## Overview

Nostr Market implements the NIP-15 marketplace protocol, enabling decentralized commerce over Nostr relays. Merchants create stalls and products that are published as Nostr events. Customers browse, order, and pay via Lightning — all with end-to-end encrypted communication via NIP-04. Requires the [Nostr Client](/extensions/nostrclient/) extension.

## Features

- **Decentralized** — products published as Nostr events, no central server
- **Stalls and products** — create multiple shops with categories and images
- **Shipping zones** — configure shipping costs by region and currency
- **Lightning checkout** — fiat-priced products converted to sats at payment
- **Order management** — track orders, mark shipped, communicate with buyers
- **Encrypted messaging** — NIP-04 encrypted DMs between merchant and customer
- **Marketplace client** — built-in client for browsing and purchasing
- **Custom branding** — create styled marketplace pages with `naddr` identifiers
- **Stock tracking** — quantities update automatically when orders are placed

## Prerequisites

The [Nostr Client](/extensions/nostrclient/) extension must be installed and configured with at least one relay.

## Setup

1. Install and configure the **Nostr Client** extension
2. Enable **Nostr Market** from the LNbits **Extensions** page
3. Create or import a merchant Nostr key pair
4. Create shipping zones with costs and regions
5. Create a stall, set currency and shipping, then add products
6. Products are published to configured Nostr relays automatically

## Use Cases

- **Censorship-resistant commerce** — sell goods without a centralized platform
- **Global marketplace** — reach buyers on any Nostr client
- **Community shops** — group-based commerce with encrypted ordering

## API Reference

See the [Nostr Market API documentation](./api) for endpoint details.

## Related Pages

- [Nostr Market API Reference](./api): API endpoints for this extension
- [Nostr Client](/extensions/nostrclient/): Required relay multiplexer
- [Nostr Relay](/extensions/nostrrelay/): Run your own relay
- [Market](/extensions/market/): Centralized marketplace alternative
- [All Extensions](/extensions/): Browse all LNbits extensions
