<ExtensionHeader
  name="LNPoS"
  description="Hardware Lightning point-of-sale terminal."
  category="Hardware & Devices"
  icon="📟"
  repo="lnbits/lnpos"
/>

## Overview

LNPoS is the hardware point-of-sale extension for LNbits. It powers dedicated PoS hardware devices (ESP32-based) that can accept Lightning payments offline — the device communicates with LNbits to generate invoices and verify payments.

LNPoS was originally part of the LNURLdevice extension and is now a standalone extension focused on hardware PoS terminals.

## How It Works

1. A merchant enters the payment amount on the hardware device
2. The device communicates with LNbits to generate a Lightning invoice
3. The customer scans the QR code displayed on the device
4. Payment is verified and the device shows confirmation

## Features

- **Dedicated hardware PoS** — purpose-built for physical retail
- **Offline-capable** — device only needs internet for invoice generation and verification
- **Simple interface** — numeric keypad for entering amounts
- **Compact** — runs on ESP32-based hardware

## Hardware

LNPoS runs on ESP32 devices with a display. See the [LNPoS hardware guide](https://lnbits.github.io/lnpos) for:

- Bill of materials
- Assembly instructions
- Firmware flashing guide

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Create a new PoS device and configure the funding wallet
3. Flash the LNPoS firmware to your ESP32 device
4. Connect the device to your LNbits instance
5. Test with a small payment

## API Reference

See the [LNPoS API documentation](./api) for endpoint details.

## Related Pages

- [LNPoS API Reference](./api): API endpoints for this extension
- [TPoS](/extensions/tpos/): Software point-of-sale (runs on any device with a browser)
- [Bitcoin Switch](/extensions/bitcoinswitch/): Trigger devices with payments
- [FOSSA](/extensions/fossa/): Bitcoin ATM extension
- [All Extensions](/extensions/): Browse all LNbits extensions
