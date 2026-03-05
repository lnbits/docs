<ExtensionHeader
  name="Coinflip"
  description="Bet sats on coinflips — winner takes all."
  category="Games & Gambling"
  icon="🪙"
  repo="lnbits/coinflip"
/>

## Overview

Coinflip lets you create Lightning-powered coinflip games. Multiple users pay to join a flip, and the winner takes the entire pot (minus an optional registration fee). All payouts are handled automatically via Lightning.

## How It Works

1. Create a coinflip with a buy-in amount and number of participants
2. Share the game link — players pay the buy-in to join
3. Once all slots are filled, a winner is randomly selected
4. The winner receives the pot automatically

## Features

- Configurable buy-in amounts
- Adjustable number of participants
- Optional house fee (haircut)
- Automatic Lightning payouts

::: warning
Gambling is dangerous. Gamble responsibly. [gambleaware.org](https://www.gambleaware.org)
:::

::: info
Free to use, although 2% of any haircut charged is contributed to the LNbits team.
:::

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Create a new coinflip with your desired settings
3. Share the game link with participants

## API Reference

See the [Coinflip API documentation](./api) for endpoint details.

## Related Pages

- [Coinflip API Reference](./api): API endpoints for this extension
- [BlackJack](/extensions/blackjack/): Lightning blackjack
- [Sats Dice](/extensions/satsdice/): Lightning dice games
- [Satspot](/extensions/satspot/): Money pool games
- [All Extensions](/extensions/): Browse all LNbits extensions
