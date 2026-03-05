<ExtensionHeader
  name="Split Payments"
  description="Automatically split incoming payments to multiple wallets."
  category="Wallet Tools"
  icon="✂️"
  repo="lnbits/splitpayments"
/>

## Overview

Split Payments continuously forwards a percentage of every incoming payment to one or more target wallets. Targets can be LNURLp links, Lightning Addresses, wallet IDs, or invoice keys. Once configured, splitting happens automatically on every payment received.

## Features

- **Automatic splitting** — payments are distributed as soon as they arrive
- **Flexible targets** — split to LNURLp, Lightning Address, wallet ID, or invoice key
- **Percentage-based** — set a percentage for each target wallet
- **Multiple targets** — split across as many wallets as needed (up to 100% total)
- **Aliases** — label each target for easy identification

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Select the **source wallet** that receives payments
3. Add target wallets with their details (LNURLp, Lightning Address, wallet ID, or invoice key)
4. Set the percentage each target should receive
5. Click **Save Targets** to activate

::: tip
Distribution can only total exactly 100% if all target wallets are internal LNbits wallets. For external targets, keep the total at or below 100%.
:::

## Use Cases

- **Revenue sharing** — split income between business partners
- **Automatic savings** — forward a percentage to cold storage via Lightning Address
- **Creator royalties** — share revenue with content producers
- **Team payments** — distribute earnings across team members

## API Reference

See the [Split Payments API documentation](./api) for endpoint details.

## Related Pages

- [Split Payments API Reference](./api): API endpoints for this extension
- [Scrub](/extensions/scrub/): Forward 100% of payments to an external wallet
- [All Extensions](/extensions/): Browse all LNbits extensions
