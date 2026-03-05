<ExtensionHeader
  name="Bitcoin Switch"
  description="Turn things on with bitcoin — IoT device control."
  category="Hardware & Devices"
  icon="🔌"
  repo="lnbits/bitcoinswitch_extension"
/>

## Overview

Bitcoin Switch lets you control physical devices — lights, locks, vending machines, and more — with Lightning payments. When a payment is received, the extension triggers a hardware device via an API call. It was originally part of the LNURLdevice extension and is now a standalone extension.

## How It Works

1. Create a new switch device in the extension
2. Configure the payment amount and device endpoint
3. Wire up your hardware (ESP32, Arduino, Raspberry Pi) to listen for triggers
4. When a customer pays, the device activates automatically

## Use Cases

- **Vending machines** — dispense products after Lightning payment
- **Door locks** — unlock on payment for co-working spaces
- **Arcade machines** — pay-per-play with Lightning
- **LED signs** — activate displays with sats
- **Any IoT device** — if it has an API, you can trigger it

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Create a new device with the amount and trigger URL
3. Flash your hardware with the [Bitcoin Switch firmware](https://bitcoinswitch.lnbits.com)
4. Connect and test

## Resources

- [Tutorial Videos](https://www.youtube.com/@makerbits7700)
- [Support Group](https://t.me/makerbits)
- [Hardware Firmware](https://bitcoinswitch.lnbits.com)

## API Reference

See the [Bitcoin Switch API documentation](./api) for endpoint details.

## Related Pages

- [Bitcoin Switch API Reference](./api): API endpoints for this extension
- [FOSSA](/extensions/fossa/): Bitcoin ATM extension
- [LNPoS](/extensions/lnpos/): Hardware point-of-sale
- [All Extensions](/extensions/): Browse all LNbits extensions
