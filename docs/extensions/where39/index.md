<ExtensionHeader
  name="Where39"
  description="BIP39 location encoding for dead drops and treasure."
  category="Utilities & Tools"
  icon="📍"
  repo="lnbits/where39"
/>

## Overview

Where39 is a BIP39-based location protocol you can self-host. It encodes geographic coordinates into memorable BIP39 word sequences — like what3words but private, because you run your own server. Perfect for dead drops, burying treasure, or sharing locations with friends without a third party.

## How It Works

1. Pin a location on the map or enter coordinates
2. Where39 encodes the location as a sequence of BIP39 words
3. Share the words — anyone with access to your Where39 server can decode them back to coordinates

## Why Where39?

- **Private** — you run your own server, no data shared with third parties
- **BIP39 words** — uses the familiar Bitcoin seed word list
- **Self-hosted** — full control over your location data
- **Simple** — just words, no accounts or apps needed

## Use Cases

- **Dead drops** — encode secret locations in memorable words
- **Treasure hunts** — create Bitcoin treasure hunts with word clues
- **Private location sharing** — share locations without using a centralized service
- **Events** — encode meetup locations in a fun, privacy-preserving way

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Open Where39 from the sidebar
3. Click on the map to encode a location, or enter BIP39 words to decode

## Resources

- [Where39 Protocol](https://github.com/arcbtc/where39)

## API Reference

See the [Where39 API documentation](./api) for endpoint details.

## Related Pages

- [Where39 API Reference](./api): API endpoints for this extension
- [All Extensions](/extensions/): Browse all LNbits extensions
