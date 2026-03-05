<ExtensionHeader
  name="Number Lottery"
  description="Provably fair numbers game using Bitcoin block data."
  category="Games & Gambling"
  icon="🔢"
  repo="lnbits/numberlottery"
/>

## Overview

Number Lottery is a provably fair lottery game where the winning number is derived from a Bitcoin block hash. Set a draw time, sell tickets, and when the time comes, the latest block hash determines the winner — no one can predict or manipulate the result.

## How It Works

1. Create a lottery with a draw date/time and ticket price
2. Players buy tickets by paying with Lightning
3. At the draw time, the latest Bitcoin block hash is fetched from mempool.space
4. A winning number is calculated from the block hash
5. The winner receives the pot

## Features

- **Provably fair** — winning number derived from public Bitcoin blockchain data
- **Block-based randomness** — no server-side random number generation
- **Lightning payments** — instant ticket purchases
- **Configurable draw times** — set when the lottery resolves

::: warning
This game relies on block data from mempool.space. While manipulation would require controlling Bitcoin mining (extremely unlikely for small pots), it is a trust assumption.

Gambling is dangerous. Gamble responsibly. [gambleaware.org](https://www.gambleaware.org)
:::

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Create a new lottery with a draw date and ticket price
3. Share the lottery link with participants

## API Reference

See the [Number Lottery API documentation](./api) for endpoint details.

## Related Pages

- [Number Lottery API Reference](./api): API endpoints for this extension
- [Coinflip](/extensions/coinflip/): Lightning coinflip games
- [Sats Dice](/extensions/satsdice/): Lightning dice games
- [All Extensions](/extensions/): Browse all LNbits extensions
