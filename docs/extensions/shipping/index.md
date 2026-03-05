<ExtensionHeader
  name="Shipping"
  description="Shared shipping zones and rates for commerce extensions."
  category="Utilities & Tools"
  icon="🚚"
  repo="lnbits/shipping"
/>

## Overview

Shipping is a shared extension that provides shipping zone and rate management for other LNbits commerce extensions. It lets you define shipping regions, methods, and costs that can be reused across extensions like WebShop, Market, and others.

## Features

- **Shipping zones** — define geographic regions for delivery
- **Shipping rates** — set costs per zone and method
- **Shared across extensions** — other commerce extensions can use your shipping configuration
- **Multiple methods** — support different shipping options (standard, express, etc.)

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Configure shipping zones and rates
3. Other commerce extensions will reference your shipping configuration

## API Reference

See the [Shipping API documentation](./api) for endpoint details.

## Related Pages

- [Shipping API Reference](./api): API endpoints for this extension
- [WebShop](/extensions/webshop/): Embeddable web shop
- [Market](/extensions/market/): Online marketplace
- [All Extensions](/extensions/): Browse all LNbits extensions
