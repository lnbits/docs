<ExtensionHeader
  name="Boltz"
  description="Submarine and reverse submarine swaps (on-chain ↔ Lightning)."
  category="Swaps"
  icon="🔄"
  repo="lnbits/boltz"
/>

## Swap In (Onchain -> Lightning)

1. Click on the "Swap (IN)" button to open the following dialog, select a wallet, choose an amount within the min-max range and choose an onchain address for your refund in case the swap fails after you already sent onchain bitcoin.

---

## ![Create Swap](https://imgur.com/OyOh3Nm.png)

2. After you confirmed, the following dialog with a QR code for the onchain transaction, onchain- address and amount, will pop up.

---

## ![Pay Onchain TX](https://imgur.com/r2UhwCY.png)

3. After you sent the exact amount of onchain bitcoin to this address, Boltz will pay your lightning invoice and the sats will appear in your wallet.

### Refund of Swap In (Onchain -> Lightning)

If a Swap In fails, you can refund your bitcoin after the timeout blockheight was reached. A swap can fail because Boltz, for instance, can't find a route to your lightning node or wallet. In case that happens, there is an info icon in the Swap (In) list which opens following dialog:

---

## ![Refund](https://imgur.com/pN81ltf.png)

When the timeout blockheight was reached you can either press refund and lnbits will do the refunding to the address you specified when creating the swap OR you can download the refund file so you can manually refund your onchain bitcoin to a different address via the [boltz.exchange website](https://boltz.exchange/refund). If you need help or have questions you can contact us in the [LNbits Telegram](https://t.me/lnbits) or the Boltz Team on [Discord](https://discord.gg/d6EK85KK). In a recent update we added an _automated check_; lnbits now checks every 15 minutes if it can refund your failed swap.

## Swap Out (Lightning -> Onchain)

1. Click on the "Swap (OUT)" button to open the following dialog, select a wallet, choose an amount within the min-max range and choose an onchain address to receive your funds on. Instant settlement: means that LNbits will create the onchain claim transaction if it sees Boltz's lockup transaction in the mempool, but it is not confirmed yet. For urgent swaps we advise to leave this enabled.

---

## ![Reverse Swap](https://imgur.com/UEAPpbs.png)

If a Swap Out fails, no further action is required, the lightning payment just "bounces back".

# Development

## manual testcases for boltz startup checks

A. normal swaps

1. test: create -> kill -> start -> startup invoice listeners -> pay onchain funds -> should complete
2. test: create -> kill -> pay onchain funds -> mine block -> start -> startup check -> should complete
3. test: create -> kill -> mine blocks and hit timeout -> start -> should go timeout/failed
4. test: create -> kill -> pay to less onchain funds -> mine blocks hit timeout -> start lnbits -> should be refunded

B. reverse swaps

1. test: create instant -> kill -> boltz does lockup -> not confirmed -> start lnbits -> should claim/complete
2. test: create -> kill -> boltz does lockup -> not confirmed -> start lnbits -> mine blocks -> should claim/complete
3. test: create -> kill -> boltz does lockup -> confirmed -> start lnbits -> should claim/complete

## API Reference

See the [Boltz API documentation](./api) for endpoint details.

## Related Pages

- [Boltz API Reference](./api): API endpoints for this extension
- [All Extensions](/extensions/): Browse all LNbits extensions
