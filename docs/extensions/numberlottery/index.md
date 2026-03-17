<ExtensionHeader
  name="Number Lottery"
  description="Provably fair numbers game using Bitcoin block data."
  category="Games & Gambling"
  icon="🔢"
  repo="lnbits/numberlottery"
/>

## Bitcoin Numbers

- A provably fair numbers game, powered by Bitcoin block data.

Set a date/time, and at that time the latest bitcoin block hash will be fetched and a winning number calculated.

Risks: This game relies on block data from mempool.space, which means you're trusting them not to manipulate it. In theory, if the prize were large enough, miners might try to influence the outcome—but that would require a very LARGE jackpot to make it worthwhile.

Gambling is dangerous, gamble responsibly.
https://www.gambleaware.org

## API Reference

See the [Number Lottery API documentation](./api) for endpoint details.

## Related Pages

- [Number Lottery API Reference](./api): API endpoints for this extension
- [All Extensions](/extensions/): Browse all LNbits extensions
