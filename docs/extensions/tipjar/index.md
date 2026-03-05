<ExtensionHeader
  name="Tip Jar"
  description="Accept Lightning tips with messages attached."
  category="Tips & Donations"
  icon="🫙"
  repo="lnbits/tipjar"
/>

## Overview

Tip Jar lets you accept Lightning (and optionally on-chain) tips through a shareable page. Supporters can attach short messages to their tips, making it great for creators, streamers, and anyone who wants to receive Bitcoin donations with personal notes.

## Features

- **Shareable tip page** — custom URL for receiving tips
- **Messages with tips** — supporters can attach a note to their payment
- **Lightning payments** — instant tip receipt
- **On-chain support** — optionally accept on-chain Bitcoin tips
- **Webhook notifications** — get notified when tips arrive

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Create a new Tip Jar with your desired details:
   - Select a wallet for receiving tips
   - Set a name and description
   - Optionally enable on-chain tips
   - Optionally configure a webhook URL
3. Share the generated URL or QR code

## Use Cases

- **Content creators** — accept tips on your website or social media
- **Streamers** — receive Lightning tips during streams (see also [Stream Alerts](/extensions/streamalerts/))
- **Musicians** — tip jar at gigs or on your website
- **Open-source developers** — accept donations for your projects
- **Restaurants and cafes** — digital tip jar at the counter

## API Reference

See the [Tip Jar API documentation](./api) for endpoint details.

## Related Pages

- [Tip Jar API Reference](./api): API endpoints for this extension
- [Stream Alerts](/extensions/streamalerts/): Lightning donations in stream overlays
- [LNURLp](/extensions/lnurlp/): Static LNURL-pay links
- [All Extensions](/extensions/): Browse all LNbits extensions
