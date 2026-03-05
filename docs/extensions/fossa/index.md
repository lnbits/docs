<ExtensionHeader
  name="FOSSA"
  description="Bitcoin ATM — sell bitcoin for cash."
  category="Hardware & Devices"
  icon="🏧"
  repo="lnbits/fossa"
/>

## Overview

FOSSA is the hardware ATM extension for LNbits. It enables LNURL-based Bitcoin ATM functionality — users insert cash, the hardware reports the amount to LNbits, and a Lightning QR code is generated for the user to withdraw their sats.

FOSSA was originally part of the LNURLdevice extension alongside Bitcoin Switch and LNPoS. It is now a standalone extension focused on ATM use cases.

## How It Works

1. User inserts cash into the ATM hardware
2. The hardware reports the deposited amount to LNbits via the FOSSA API
3. LNbits generates an LNURL-withdraw QR code
4. The user scans the QR with their Lightning wallet
5. Sats are sent to the user's wallet

## Use Cases

- **Bitcoin ATMs** — sell Bitcoin for cash at events, shops, or public locations
- **Cash-to-Lightning conversion** — bridge physical cash to the Lightning Network
- **Community Bitcoin access** — provide easy Bitcoin onboarding

## Hardware

FOSSA works with custom-built ATM hardware. Common components:

- Coin acceptor or bill validator
- Display (screen or e-ink) for QR codes
- Controller (ESP32, Raspberry Pi)
- Enclosure

See the [FOSSA hardware repo](https://github.com/lnbits/fossa) for firmware and build guides.

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Create a new ATM device and configure the funding wallet
3. Set withdrawal limits (min/max per transaction)
4. Flash and connect your hardware
5. Test with a small amount

## API Reference

See the [FOSSA API documentation](./api) for endpoint details.

## Related Pages

- [FOSSA API Reference](./api): API endpoints for this extension
- [Bitcoin Switch](/extensions/bitcoinswitch/): Trigger devices with Lightning payments
- [LNPoS](/extensions/lnpos/): Hardware point-of-sale
- [Hardware & Merchants FAQ](/guide/faq/hardware): ATM and hardware questions
- [All Extensions](/extensions/): Browse all LNbits extensions
