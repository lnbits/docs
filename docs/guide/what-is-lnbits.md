# What is LNbits?

> Free and open-source Lightning Network wallet and accounts system that sits on top of any Lightning backend, providing multi-user wallets, a REST API, and an extension platform.

LNbits is a **free and open-source** Lightning Network wallet and accounts system. It sits on top of a Lightning funding source and provides:

- **Isolated wallets** — each with their own balance, API keys, and permissions
- **Clean REST APIs** — for creating invoices, sending payments, and managing wallets
- **An extension system** — install or build plugins that add features on top of your wallets
- **Multi-user accounts** — role-based access control with admin, invoice, and custom ACL keys

## Who is LNbits for?

### Normal Users
Run LNbits on a Raspberry Pi or VPS, connect your Lightning node, and get a web-based wallet interface. Share wallets with family, or use extensions like Point of Sale for your small business.

### Power Users
Set up multiple wallets for different purposes — one for daily spending, one for receiving tips, one for your shop. Use LNURL-pay for static payment links, configure webhooks for payment notifications, and manage everything through the API.

### Developers
Build Lightning-powered applications using the LNbits API. Create custom extensions with their own database tables, API endpoints, and UI. LNbits handles the Lightning plumbing so you can focus on your application logic.

## How it works

```
┌──────────────────────────────────────────────────┐
│                   LNbits Server                   │
│                                                   │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐          │
│  │ Wallet 1 │  │ Wallet 2 │  │ Wallet 3 │  ...    │
│  │ (User A) │  │ (User A) │  │ (User B) │         │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘         │
│       │              │              │               │
│  ┌────┴──────────────┴──────────────┴────┐         │
│  │          Core Payment Engine           │         │
│  └────────────────┬──────────────────────┘         │
│                   │                                 │
│  ┌────────────────┴──────────────────────┐         │
│  │       Extensions (LNURL, TPoS, ...)    │         │
│  └───────────────────────────────────────┘         │
└───────────────────┬──────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │   Funding Source       │
        │  (LND / CLN / ...)    │
        └───────────────────────┘
```

LNbits creates a **layer of abstraction** between users and the underlying Lightning node. All wallets share the same funding source, but each wallet tracks its own balance internally. This means:

- You can run **one node** and serve **many users**
- Each user gets their own API keys and can't access others' funds
- Extensions can create and use wallets programmatically
- Switching the funding source doesn't affect user wallets

## Key concepts

| Concept | Description |
| --- | --- |
| **Account** | A user identity with email, username, or Nostr pubkey |
| **Wallet** | A virtual Lightning wallet with its own balance and API keys |
| **Admin Key** | Full-access API key — can send payments, manage wallet |
| **Invoice Key** | Read + receive only — can create invoices, view payments |
| **Extension** | A plugin that adds features (APIs, UI, database tables) |
| **Funding Source** | The Lightning backend that actually moves sats |

## Related Pages

- [Guide](/guide/) — quick-start guide to installing and using LNbits
- [Core Features](/guide/core/) — wallets, payments, API keys, and configuration
- [Installation](/guide/installation/) — choose your setup method
- [FAQ](/guide/faq/) — answers to common questions about LNbits
