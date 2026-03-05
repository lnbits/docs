<ExtensionHeader
  name="Device Timer"
  description="Control IoT devices with timed Lightning payments."
  category="Utilities & Tools"
  icon="⏱️"
  repo="lnbits/devicetimer"
/>

## Overview

Device Timer is an LNbits extension compatible with the [Bitcoin Switch](/extensions/bitcoinswitch/) hardware for timed triggering. It extends the standard LNURL device behavior with opening hours, cooldown periods, and alternative displays — making it ideal for scenarios like animal feeding stations, vending machines, or any IoT device that should only accept payments during specific windows.

## Features

- **Opening hours** — restrict payments to a specific time window (e.g., 9 AM – 5 PM)
- **Cooldown after payment** — block the device for a configurable period after each successful payment (prevents overuse)
- **Alternative display** — show a custom image instead of the QR code outside opening hours
- **LNURL error handling** — returns a proper error when payment is attempted outside the allowed window
- **Bitcoin Switch compatible** — works with the bitcoinSwitch hardware device

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Open Device Timer from the sidebar
3. Create a new device:
   - Set the opening hours (start and end time)
   - Set the cooldown timeout between payments
   - Configure the alternative image for closed hours
   - Connect to your bitcoinSwitch device
4. Deploy the generated LNURL to your device

## Use Cases

- **Animal feeding stations** — accept payments to dispense food, with opening hours and cooldown to prevent overfeeding
- **Vending machines** — time-limited product dispensing
- **Access control** — timed entry during business hours
- **IoT automation** — any device that should only activate within scheduled windows

## API Reference

See the [Device Timer API documentation](./api) for endpoint details.

## Related Pages

- [Device Timer API Reference](./api): API endpoints for this extension
- [Bitcoin Switch](/extensions/bitcoinswitch/): IoT device control with Bitcoin
- [LNURL Device](/extensions/lnurldevice/): Legacy hardware integration
- [Hardware & Merchants FAQ](/guide/faq/hardware): Hardware setup questions
- [All Extensions](/extensions/): Browse all LNbits extensions
