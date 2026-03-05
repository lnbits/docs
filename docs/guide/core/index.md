# Core Features

> Overview of LNbits core features — wallets, payments, labels, fiat payments (Stripe/PayPal), LNURL, and administration.

LNbits core provides a full Lightning wallet system with multi-user accounts, API keys, payments, and more.

## Wallets and accounts

Every LNbits user gets isolated wallets, each with its own balance and API keys. Wallets are the foundation — everything in LNbits happens through a wallet.

- [Wallets and accounts](/guide/core/wallets-and-accounts) — creating and managing wallets
- [API keys](/guide/core/api-keys) — Admin key vs Invoice key

## Payments

Send and receive Lightning payments through the UI or API.

- [Payments](/guide/core/payments) — invoices, payments, and transaction history

## Labels

Organize payments with tags and labels for bookkeeping.

- [Labels overview](/guide/core/labels/overview)

## Fiat payments (Stripe / PayPal)

Accept card and PayPal payments alongside Lightning. Configured at the server level by the Super User — extensions consume the provider without handling API keys.

- [Fiat payments](/guide/core/fiat-payments) — Stripe and PayPal integration
- [Fiat display](/guide/core/fiat/overview) — exchange rates and currency conversion

## LNURL

LNbits has first-class LNURL support for pay, withdraw, and auth flows.

- [LNURL overview](/guide/core/lnurl/overview)

## Administration

- [User management](/guide/core/user-management/) — accounts, permissions, SSO
- [Security](/guide/core/security) — hardening your instance
- [Environment](/guide/core/environment) — all configuration variables
- [Database](/guide/core/database) — SQLite, PostgreSQL, migrations
- [WebSockets](/guide/core/websockets) — real-time updates
- [Node management](/guide/core/node-management) — Lightning node controls

## Related Pages

- [Wallets & Accounts](/guide/core/wallets-and-accounts.md)
- [Payments](/guide/core/payments.md)
- [API Keys](/guide/core/api-keys.md)
- [API Reference](/api/)
