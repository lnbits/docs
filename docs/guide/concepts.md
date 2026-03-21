# Core Concepts

> Understanding the building blocks of LNbits - accounts, wallets, API keys, payments, extensions, and funding sources.

## Accounts

An **account** is a user identity. It can be created through:
- Username and password
- User ID (simple mode)
- Nostr pubkey (NIP-98)
- OAuth (Google, GitHub, Keycloak)

Each account has a unique ID and can own multiple wallets.

## Wallets

A **wallet** is the primary unit in LNbits. Each wallet has:

- A unique ID
- A human-readable name
- Its own **balance** (tracked internally, not on-chain)
- Two API keys: **admin key** and **invoice key**
- Optional metadata (icon, color, pinned status)

### Wallet types

| Type | Description |
| --- | --- |
| `LIGHTNING` | Standard wallet owned by one user |
| `LIGHTNING_SHARED` | Wallet shared between multiple users with permission-based access |

### Shared wallets

Shared wallets allow multiple users to access the same wallet with different permissions:

| Permission | Description |
| --- | --- |
| `VIEW_PAYMENTS` | Can see payment history |
| `RECEIVE_PAYMENTS` | Can create invoices |
| `SEND_PAYMENTS` | Can send payments |

A wallet owner can invite other users and assign specific permissions.

## API Keys

Every wallet has two keys:

### Admin Key
- Full access to the wallet
- Can send payments (withdraw funds)
- Can create invoices
- Can view all payment history
- Can delete the wallet
- **Treat like a password** - never expose publicly

### Invoice Key
- Read and receive access only
- Can create invoices (receive funds)
- Can view payment history
- Cannot send payments
- Safe to use in client-side applications

::: warning
The admin key can drain your wallet. Never share it with untrusted parties or expose it in frontend code.
:::

## Payments

A **payment** in LNbits represents either an invoice (incoming) or a payment (outgoing).

### Payment states

```
PENDING ──→ SUCCESS
    │
    └──→ FAILED
```

| State | Description |
| --- | --- |
| `PENDING` | Invoice created but not yet paid, or outgoing payment in flight |
| `SUCCESS` | Payment completed successfully |
| `FAILED` | Payment failed or invoice expired |

### Payment fields

Key fields on every payment:

- `checking_id` - unique identifier for status checks
- `amount` - amount in millisatoshis (positive = incoming, negative = outgoing)
- `memo` - human-readable description
- `bolt11` - the Lightning invoice (BOLT11 format)
- `payment_hash` - the Lightning payment hash
- `extra` - JSON metadata (tags, comments, extension data)
- `webhook` - optional URL called when payment status changes

## Extensions

Extensions are **plugins** that add functionality to LNbits. Each extension can:

- Register its own API endpoints
- Create its own database tables
- Serve its own UI pages
- Listen for invoice events
- Run background tasks

Extensions are installed per-instance and activated per-user. See [Using Extensions](/guide/using-extensions) for details.

## Funding Sources

The **funding source** (or wallet backend) is the Lightning node or service that LNbits connects to for actual Lightning operations. LNbits supports 20+ backends.

All wallets on a LNbits instance share the same funding source. LNbits tracks individual wallet balances internally - the funding source only sees aggregate Lightning activity.

```
User Wallet A (500 sats)  ──┐
User Wallet B (1200 sats) ──┼──→ LNbits Core ──→ LND Node (1700 sats)
User Wallet C (0 sats)    ──┘
```

## Fees

LNbits can charge fees on payments:

| Fee Type | Description |
| --- | --- |
| **Service fee** | Percentage of each outgoing payment |
| **Reserve fee** | Minimum + percentage withheld from wallet balance to cover Lightning routing fees |

Fees are configured by the admin and can be directed to a specific wallet.

## Next steps

- [Wallets](/guide/core/wallets-and-accounts) - managing wallets in detail
- [Payments](/guide/core/payments) - creating and tracking payments
- [Authentication](/guide/authentication) - login methods and API auth

## Related Pages

- [Wallets & Accounts](/guide/core/wallets-and-accounts): Detailed wallet management guide
- [API Keys](/guide/core/api-keys): Admin key vs Invoice key deep dive
- [Payments](/guide/core/payments): Send and receive Lightning payments
- [What is LNbits?](/guide/what-is-lnbits): Architecture overview and use cases
