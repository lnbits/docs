<ExtensionHeader
  name="Chat"
  description="Live support chat with paid messages and embeddable widget."
  category="Social & Nostr"
  icon="💬"
  repo="lnbits/chat"
/>

## Overview

Chat is a live support extension for LNbits. Create chat categories, share public chat links, and manage incoming conversations from an admin dashboard. Guests can optionally pay per character to send messages — making spam expensive while keeping genuine conversations flowing.

## Features

- **Category-based public chats** — organize conversations by topic with shareable links
- **Admin dashboard** — list or grid view with unread/resolved indicators and inline replies
- **Paid guest messages** — per-character pricing with Lightning invoices
- **Optional tips** — guests can tip from the chat interface
- **Notifications** — get alerted via Telegram, Nostr, or email when new chats arrive
- **Embeddable widget** — add a chat launcher to any website via iframe

## Use Cases

- **Customer support** — embed on your website for Lightning-native support
- **Paid consultations** — charge per message for expert advice
- **Community engagement** — public topic-based chat rooms
- **Anti-spam messaging** — cost per character discourages spam

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Create a chat category with a name and optional per-character price
3. Share the public chat link or embed the widget on your site
4. Manage conversations from the admin dashboard

### Embedding the Widget

Add the chat widget to any website as an iframe. The minimized launcher expands into a full chat interface when clicked.

## API Reference

See the [Chat API documentation](./api) for endpoint details.

## Related Pages

- [Chat API Reference](./api): API endpoints for this extension
- [TipJar](/extensions/tipjar/): Accept tips with Lightning
- [All Extensions](/extensions/): Browse all LNbits extensions
