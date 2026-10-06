<ExtensionHeader
  name="Battleships"
  description="Create paid public Battleships games where the winner takes the pot."
  category="Games & Entertainment"
  icon="🚢"
  repo="lnbits/battleshipswasm"
  extension-type="wasm"
/>

## Overview

Create paid public Battleships games where the winner takes the pot. This extension uses the core WASM runtime, with an isolated frontend and permissioned host calls.

## Compatibility

The registry release **0.1.6** requires LNbits **1.5.6** or newer. Use a compatible release from your instance's WASM marketplace. The development guides target LNbits 1.6.2.

## Setup

1. Find **Battleships** in your instance's **Extensions** screen.
2. Check the release requirements and requested permissions, then install it.
3. Enable the extension for your account and open it from LNbits.
4. Select the receiving wallet, enable games, and set the haircut percentage.
5. Create a game with a join amount and approve the background payout grant.
6. Share the public game link. Both players enter a Lightning address and pay to join.
7. Place the fleets and play. The winner receives the pot minus the haircut.

Keep each player's private token link private. Share the public game link rather than a URL containing `#playerToken=...`. Confirm the settled payout in the wallet; a pending UI state alone is not confirmation.

See the [extension README](https://github.com/lnbits/battleshipswasm) for its specific workflow. For background payments, review the wallet, per-payment maximum, and destination policy before approval.

## Related Pages

- [Battleships API Reference](./api): declared public and authenticated routes
- [WASM Extensions](/extensions/wasm/): browse by category
- [Using Extensions](/guide/using-extensions): installation and permissions
- [Developing WASM Extensions](/dev/extensions/wasm/): build your own
