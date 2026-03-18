# Hardware & Merchants FAQ

> Common questions about NFC/Boltcards, point-of-sale terminals, ATMs, vending machines, and merchant setups.

[[toc]]

## Can I use NFC cards / Boltcards with LNbits?

Yes. The **[Bolt Cards](/extensions/boltcards/)** extension lets you program NFC cards for tap-to-pay:

1. Enable the **Bolt Cards** extension
2. Add a new card — set the wallet, daily limit, and per-transaction limit
3. Enter the card UID (or tap to auto-fill on Android)
4. Write the keys to an NTAG424 NFC card using the [Boltcard NFC Card Creator](https://github.com/niccokunzmann/boltcard-nfc-card-creator) app
5. Users tap the card to make payments from the linked wallet

Each card uses one-time LNURL-withdraw links with configurable limits (max per transaction, max per day).

## What hardware tools work with LNbits?

LNbits integrates with various physical devices through dedicated extensions:

| Hardware | Extension | Use case |
|---|---|---|
| NFC cards (Boltcards) | [Bolt Cards](/extensions/boltcards/) | Tap-to-pay |
| Point-of-sale terminal | [TPoS](/extensions/tpos/) | Accept Lightning payments |
| Bitcoin ATM | [FOSSA](/extensions/fossa/) | Sell Bitcoin for cash |
| IoT device control | [Bitcoin Switch](/extensions/bitcoinswitch/) | Activate devices on payment (doors, vending) |
| Hardware PoS terminal | [LNPoS](/extensions/lnpos/) | Offline-capable hardware terminal |
| Thermal printer | — | Receipt printing (community integrations) |

::: info
The **LNURLdevice** extension is deprecated. It has been replaced by **FOSSA**, **LNPoS**, and **Bitcoin Switch** — each focused on a specific use case. **Bolt Cards** is a separate, independent extension for NFC tap-to-pay cards.
:::

## Can I use LNbits as a merchant?

Yes. LNbits is well-suited for merchant use with these key extensions:

- **TPoS** — touchscreen point-of-sale terminal (works on tablets and phones)
- **SatsPay** — payment pages for online stores (Lightning + on-chain)
- **LNURLp** — static payment QR codes for print or display
- **Split Payments** — automatic revenue sharing between partners
- **TipJar** — accept tips with custom amounts and messages
- **Watch Only** — monitor on-chain payments with xpub/zpub

For a complete merchant setup, combine TPoS for in-person sales with SatsPay for online payments.

## How do I set up a point-of-sale terminal?

1. Enable the **TPoS** extension
2. Create a new terminal — set the currency (BTC or fiat), tax rate, and optional tip suggestions
3. Open the terminal URL on a tablet or phone
4. Enter the amount and show the QR code to the customer

TPoS supports:
- Fiat currency display (with automatic sat conversion)
- Tax calculations
- Tip suggestions
- PIN protection for the terminal
- Transaction history

::: tip
Install LNbits as a [PWA](/guide/core/pwa) on a tablet for a fullscreen point-of-sale experience.
:::

## How do I build a Bitcoin ATM with LNbits?

Use the **[FOSSA](/extensions/fossa/)** extension to create a Bitcoin ATM:

1. Enable FOSSA and create a new ATM device
2. Set withdrawal limits and configure the funding wallet
3. Build or buy the hardware (coin acceptor + display + controller)
4. Connect the hardware to the FOSSA API

The ATM flow: User inserts cash → hardware reports amount to LNbits → LNbits generates LNURL-withdraw QR → user scans with their wallet → sats are sent.

Community guides and open-source ATM hardware designs are available on the [LNbits GitHub](https://github.com/lnbits).

## Can I use LNbits for vending machines?

Yes. The **[Bitcoin Switch](/extensions/bitcoinswitch/)** extension supports vending machine and IoT integrations:

1. Create a Bitcoin Switch device
2. Connect the vending machine controller (ESP32, Raspberry Pi, Arduino) to the API
3. The machine displays a Lightning QR code → customer pays → machine dispenses product

This works for any device that can make HTTP requests and display QR codes.

## How do I accept tips with LNbits?

Several options depending on your setup:

**TipJar extension** — creates a dedicated tipping page with customizable amounts and thank-you messages. Share the URL or QR code.

**LNURLp extension** — generates a static Lightning address or QR code that customers can pay any amount to. Print it and display at your counter.

**TPoS terminal** — includes built-in tip suggestions (percentage-based) during checkout.

## How do I set up split payments for revenue sharing?

The **Split Payments** extension automatically splits incoming payments across multiple wallets:

1. Enable the Split Payments extension
2. Configure the split — specify wallet IDs and percentages
3. Every incoming payment to the source wallet is automatically distributed

Example: A coffee shop with two partners could split 60/40, with every payment automatically divided between their wallets.

Splits can target wallets on the same instance or external Lightning addresses.

## Related Pages

- [Extensions](/extensions/) — browse all available extensions
- [Using Extensions](/guide/using-extensions) — install and manage extensions
- [Payments FAQ](/guide/faq/payments) — payment-related questions
- [General FAQ](/guide/faq/general) — LNbits for business
