<ExtensionHeader
  name="Livestream"
  description="Accept Lightning payments during livestreams."
  category="Events & Streaming"
  icon="🎥"
  repo="lnbits/livestream"
/>

## Overview

DJ Livestream produces a static LNURL-pay QR code for livestreamers and DJs. When a listener scans the QR, they see the currently playing track and can tip the DJ. Tips are automatically split between the DJ and the track's producer based on a configurable percentage. Producers who tip above a threshold can receive a download link for the track.

## Features

- **Static QR overlay** — one QR code for the entire stream
- **Track metadata** — shows the current song name and producer to tippers
- **Revenue splitting** — automatic percentage split between DJ and producer
- **Producer wallets** — auto-generated wallets for each producer
- **Download links** — optional track download for tips above a threshold
- **Track management** — add, play, and manage your tracklist

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Add tracks with producer name, track name, minimum download price, and download URL
3. Set the DJ's revenue percentage (default 10%)
4. Display the static QR code on your stream overlay
5. Click "play" on tracks as they play in your set

## How Revenue Splits Work

When a listener tips 100 sats with the DJ fee set to 10%:
- DJ receives 10 sats
- Producer receives 90 sats (in their auto-generated wallet)

## Use Cases

- **DJ sets** — accept tips during online or live DJ performances
- **Music livestreams** — let listeners support artists in real-time
- **Street performances** — print the QR code for in-person tips
- **Podcasts** — accept donations during live recordings

## API Reference

See the [Livestream API documentation](./api) for endpoint details.

## Related Pages

- [Livestream API Reference](./api): API endpoints for this extension
- [Copilot](/extensions/copilot/): Streaming overlay for donations
- [Stream Alerts](/extensions/streamalerts/): Streamlabs integration
- [All Extensions](/extensions/): Browse all LNbits extensions
