<ExtensionHeader
  name="Satspot"
  description="Money pool games — pay to join, random winner."
  category="Games & Gambling"
  icon="🎯"
  repo="lnbits/satspot"
/>

## Overview

Satspot creates Lightning-powered money pools. Players pay to join a pot, and a random participant is selected as the winner — receiving all the sats minus an optional house fee (haircut).

## How It Works

1. Create a satspot with a buy-in amount and participant limit
2. Share the game link
3. Players pay the buy-in to join the pool
4. Once all spots are filled, a winner is randomly selected
5. The winner receives the pot minus any configured haircut

## Features

- Configurable buy-in amounts
- Adjustable participant limits
- Optional house fee
- Automatic Lightning payouts

::: warning
Gambling is dangerous. Gamble responsibly. [gambleaware.org](https://www.gambleaware.org)
:::

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Create a new satspot with your desired settings
3. Share the game link with participants

## API Reference

See the [Satspot API documentation](./api) for endpoint details.

## Related Pages

- [Satspot API Reference](./api): API endpoints for this extension
- [Coinflip](/extensions/coinflip/): Lightning coinflip games
- [Number Lottery](/extensions/numberlottery/): Block-based lottery
- [All Extensions](/extensions/): Browse all LNbits extensions
