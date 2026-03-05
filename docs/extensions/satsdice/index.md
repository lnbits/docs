<ExtensionHeader
  name="Sats Dice"
  description="LNURL satoshi dice — gambling in a QR code."
  category="Games & Gambling"
  icon="🎲"
  repo="lnbits/satsdice"
/>

## Overview

Sats Dice brings the classic dice game to Lightning. Players pay sats with a configurable chance of winning a multiplied payout. The game uses LNURL so it works with a simple QR code scan — no accounts needed.

## How It Works

1. Create a dice game with win probability and payout multiplier
2. Share the LNURL QR code
3. Player scans and pays the bet amount
4. If they win, the payout is sent back automatically via LNURL-withdraw

## Features

- **LNURL-based** — scan a QR code to play, no account required
- **Configurable odds** — set the win probability and payout multiplier
- **Automatic payouts** — winnings sent via Lightning instantly
- **Shareable QR codes** — print or display for easy access

::: warning
Gambling is dangerous. Gamble responsibly. [gambleaware.org](https://www.gambleaware.org)
:::

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Create a new dice game with your desired odds and payout
3. Share the QR code

## API Reference

See the [Sats Dice API documentation](./api) for endpoint details.

## Related Pages

- [Sats Dice API Reference](./api): API endpoints for this extension
- [Coinflip](/extensions/coinflip/): Lightning coinflip games
- [BlackJack](/extensions/blackjack/): Lightning blackjack
- [All Extensions](/extensions/): Browse all LNbits extensions
