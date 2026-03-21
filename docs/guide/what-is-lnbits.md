# What is LNbits?

> Free and open-source Lightning Network wallet and accounts system that sits on top of any Lightning backend, providing multi-user wallets, a REST API, and an extension platform.

LNbits is a **free and open-source** Lightning Network wallet and accounts system. It sits on top of a Lightning funding source and provides:

- **Isolated wallets** - each with their own balance, API keys, and permissions
- **Clean REST APIs** - for creating invoices, sending payments, and managing wallets
- **An extension system** - install or build plugins that add features on top of your wallets
- **Multi-user accounts** - role-based access control with admin, invoice, and custom ACL keys

## See it in action

<div class="video-showcase">
  <div class="video-track">
    <div class="video-card">
      <iframe src="https://www.youtube.com/embed/b7Ou7XtqtRI?si=s6ARUmulCd9xsGp7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <div class="video-card">
      <iframe src="https://www.youtube.com/embed/ymq_BXN4lu0?si=N5nplFp7qblLhSdj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <div class="video-card">
      <iframe src="https://www.youtube.com/embed/LMs4bFrvy_Y?si=rdq8DXHW4JqMDVQ3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  </div>
</div>

<style>
.video-showcase {
  margin: 20px 0;
}
.video-track {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.video-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
}
.video-card iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
@media (max-width: 768px) {
  .video-track {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    gap: 12px;
    padding-bottom: 8px;
  }
  .video-card {
    flex: 0 0 85%;
    scroll-snap-align: start;
    aspect-ratio: 16 / 9;
  }
}
</style>

## Who is LNbits for?

### Normal Users
Run LNbits on a Raspberry Pi or VPS, connect your Lightning node, and get a web-based wallet interface. Share wallets with family, or use extensions like Point of Sale for your small business.

### Power Users
Set up multiple wallets for different purposes - one for daily spending, one for receiving tips, one for your shop. Use LNURL-pay for static payment links, configure webhooks for payment notifications, and manage everything through the API.

### Developers
Build Lightning-powered applications using the LNbits API. Create custom extensions with their own database tables, API endpoints, and UI. LNbits handles the Lightning plumbing so you can focus on your application logic.

## How it works

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/diagrams/architecture-overview-dark.svg">
  <img src="/diagrams/architecture-overview-light.svg" alt="LNbits architecture - wallets, payment engine, extensions, and funding source" style="max-width: 620px; width: 100%; margin: 16px auto; display: block;" />
</picture>

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
| **Admin Key** | Full-access API key - can send payments, manage wallet |
| **Invoice Key** | Read + receive only - can create invoices, view payments |
| **Extension** | A plugin that adds features (APIs, UI, database tables) |
| **Funding Source** | The Lightning backend that actually moves sats |

## Related Pages

- [Guide](/guide/) - quick-start guide to installing and using LNbits
- [Core Features](/guide/core/) - wallets, payments, API keys, and configuration
- [Installation](/guide/installation/) - choose your setup method
- [FAQ](/guide/faq/) - answers to common questions about LNbits
