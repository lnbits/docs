<ExtensionHeader
  name="Bolt Cards"
  description="Self-custody NFC cards with one-time LNURLw links."
  category="Hardware & Devices"
  icon="💳"
  repo="lnbits/boltcards"
/>

## Overview

The Bolt Cards extension lets you link NFC cards (NXP NTAG424 DNA) to your LNbits wallet for tap-to-pay. Unlike static LNURL-withdraw links, each tap generates a new unique link using the card's Secure Unique NFC (SUN) feature — providing better privacy and security.

## How It Works

Each card stores encrypted credentials. When tapped against an NFC reader:

1. The card generates a unique encrypted payload
2. LNbits verifies the card's identity and counter
3. A one-time LNURL-withdraw link is created
4. The payment is processed from the linked wallet

## Features

- **One-time links per tap** — no reuse, better security than static LNURLw
- **Per-card limits** — set max sats per transaction and per day
- **Card UID verification** — each card is uniquely identified
- **Key management** — three encryption keys (K0, K1, K2) for authentication and encryption
- **Wipe and reset** — safely erase cards for reuse

## Requirements

- LNbits instance accessible over **clearnet** (HTTPS)
- [Bolt Card NFC Card Creator App](https://github.com/boltcard/bolt-nfc-android-app) (available on [Apple Store](https://apps.apple.com/us/app/boltcard-nfc-programmer/id6450968873) and [Play Store](https://play.google.com/store/search?q=bolt+card+nfc+card+creator&c=apps))
- NXP NTAG424 DNA NFC cards

## Setup

### Creating a card

1. Enable the extension from the LNbits **Extensions** page
2. Click **Add new card** and configure:
   - **Max sats per transaction** — rejects payments above this amount
   - **Max sats per day** — daily spending limit
   - **Card name** — for your reference
   - **Card UID** — 7-byte unique identifier (tap to autofill on Android Chrome, or read with the Bolt Card app)
   - **Keys** — auto-generated, or set manually
3. Click **Create Card**
4. Click the QR code button to view card details — **back up the keys now**
5. Scan the QR with the Bolt Card NFC Card Creator app
6. Tap **Write Card Now** and hold the card steady until complete

### Erasing a card

1. Click the QR code button next to the card and select **Wipe**
2. In the Bolt Card app, scan the wipe QR or paste the key JSON
3. Tap **Reset Card Now** and hold the card steady

::: warning
Always back up your card keys. Without them, you may not be able to modify the card in the future.
:::

## API Reference

See the [Bolt Cards API documentation](./api) for endpoint details.

## Related Pages

- [Bolt Cards API Reference](./api): API endpoints for this extension
- [Withdraw](/extensions/withdraw/): LNURL-withdraw links and vouchers
- [Hardware & Merchants FAQ](/guide/faq/hardware): NFC and merchant setup questions
- [All Extensions](/extensions/): Browse all LNbits extensions
