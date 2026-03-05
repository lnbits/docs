<ExtensionHeader
  name="Withdraw"
  description="Create LNURL-withdraw links (vouchers, faucets)."
  category="Tips & Donations"
  icon="🎟️"
  repo="lnbits/withdraw"
/>

## Overview

LNURLw (LNURL-withdraw) lets you create static QR codes that give people permission to pull funds from your Lightning wallet. It's one of the most powerful LNURL tools — you can mint vouchers, build faucets, or create pre-paid "cards" that work like offline Lightning wallets.

LNURL-withdraw gives someone the right to spend a specific amount, once or multiple times. This functionality has not existed in money before.

## Features

- **Quick Vouchers** — batch-create LNURL-withdraw QR codes for printing and distribution
- **Configurable amounts** — set fixed or range-based withdrawal amounts
- **Single or multi-use** — one-time vouchers or reusable faucets
- **Printable QR codes** — generate print-ready voucher sheets
- **Webhook support** — get notified when a withdrawal is claimed
- **Advanced options** — custom link IDs, time limits, and usage limits

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Click **New Withdraw Link** to create a link:
   - Select the source wallet
   - Set the withdrawal amount (fixed or min/max range)
   - Set the number of uses
   - Optionally configure a webhook URL
3. Share the QR code, link, or print vouchers

### Quick Vouchers

1. Click **Quick Vouchers** to batch-create withdraw links
2. Select a wallet, set the amount per voucher, and the number of vouchers
3. Print, share, or display the generated QR codes

## Use Cases

- **Onboarding** — hand out vouchers to introduce people to Lightning
- **Gifts** — create Bitcoin gift cards for events or holidays
- **Faucets** — let people claim small amounts from a faucet
- **Rewards** — distribute sats as rewards or incentives
- **Pre-paid cards** — use NFC cards with LNURL-withdraw for tap-to-claim

## API Reference

See the [Withdraw API documentation](./api) for endpoint details.

## Related Pages

- [Withdraw API Reference](./api): API endpoints for this extension
- [Bolt Cards](/extensions/boltcards/): NFC cards with LNURL-withdraw
- [LNURLp](/extensions/lnurlp/): Static LNURL-pay links (the receive counterpart)
- [All Extensions](/extensions/): Browse all LNbits extensions
