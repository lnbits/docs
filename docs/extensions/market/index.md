<ExtensionHeader
  name="Market"
  description="Online marketplace with Lightning payments."
  category="Payments & Commerce"
  icon="🛒"
  repo="lnbits/market"
/>

## Overview

Market is a web-based marketplace extension for LNbits. Merchants can list products in stalls, manage shipping zones, and accept Lightning payments. Originally inspired by the Diagon Alley protocol concepts that influenced the creation of Nostr.

::: tip
For a decentralized marketplace experience, consider [Nostr Market](/extensions/nostrmarket/) which implements the NIP-15 protocol for censorship-resistant commerce over Nostr.
:::

## Features

- **Product listings** — create stalls with products, descriptions, and images
- **Shipping zones** — configure shipping costs by region
- **Lightning checkout** — instant payments at purchase
- **Order management** — track orders and shipping status
- **Multi-stall support** — merchants can run multiple stalls

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Create shipping zones with costs per region
3. Create a stall and add products with prices and images
4. Share your marketplace link with customers

## API Reference

See the [Market API documentation](./api) for endpoint details.

## Related Pages

- [Market API Reference](./api): API endpoints for this extension
- [Nostr Market](/extensions/nostrmarket/): Decentralized marketplace over Nostr
- [WebShop](/extensions/webshop/): Embeddable web shop
- [All Extensions](/extensions/): Browse all LNbits extensions
