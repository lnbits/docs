<ExtensionHeader
  name="Jukebox"
  description="Lightning-powered jukebox for Spotify integration."
  category="Events & Streaming"
  icon="🎵"
  repo="lnbits/jukebox"
/>

## Overview

Jukebox connects to your Spotify Premium account and lets users pay Lightning to pick songs from your playlists. After payment, the song automatically starts playing on your chosen Spotify device or enters the queue. Share the jukebox page at a bar, party, or event.

## Prerequisites

A **Spotify Premium** subscription is required.

## Features

- **Spotify integration** — connects via Spotify API with OAuth
- **Playlist selection** — choose which playlists are available
- **Device selection** — play on any Spotify-connected device
- **Configurable price** — set the cost per song selection
- **Auto-queue** — songs queue automatically after payment
- **Shareable page** — public jukebox URL with QR code

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Click **Add Spotify Jukebox**:
   - Name your jukebox and select a wallet
   - Set the price per song
   - Create a Spotify App at [developer.spotify.com](https://developer.spotify.com) and get the Client ID and Secret
   - Paste the credentials and authorize access
   - Select the playback device and playlists
3. Share the jukebox link or QR code

## Use Cases

- **Bars and restaurants** — let customers pick the music
- **Parties** — crowdsourced playlist via Lightning
- **Events** — interactive music at conferences and meetups
- **Stores** — let customers influence the atmosphere

## API Reference

See the [Jukebox API documentation](./api) for endpoint details.

## Related Pages

- [Jukebox API Reference](./api): API endpoints for this extension
- [Livestream](/extensions/livestream/): Music livestream tips
- [All Extensions](/extensions/): Browse all LNbits extensions
