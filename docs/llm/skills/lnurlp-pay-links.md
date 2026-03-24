# Skill: Lightning Address

> Create a human-readable Lightning Address like `alice@yourdomain.com` that anyone can send sats to.

## What this skill does

Teaches an AI agent to create Lightning Addresses on LNbits using the LNURLp extension. A Lightning Address works like an email address but for receiving Bitcoin over Lightning - share it in your bio, on a business card, or anywhere you want to get paid.

## The skill file

Copy this into your agent's context or save it as `SKILL.md`:

````markdown
---
name: lnbits-lightning-address
description: >
  Create a Lightning Address using the LNbits LNURLp extension.
  Use when the user wants a human-readable payment address like
  alice@domain.com, a tip page, a donation link, or any reusable
  way to receive Lightning payments.
compatibility: LNbits 1.0+ with LNURLp extension enabled
---

## Prerequisites

- A running LNbits instance at a **public domain** (self-hosted or saas.lnbits.com)
- LNURLp extension enabled (Extensions dashboard)
- Admin key for the receiving wallet
- Will NOT work on localhost - needs a real domain

## Create a Lightning Address

POST /lnurlp/api/v1/links
Auth: Admin key

```bash
curl -X POST https://your-lnbits.com/lnurlp/api/v1/links \
  -H "X-Api-Key: ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Send sats to Alice",
    "min": 1,
    "max": 1000000,
    "comment_chars": 140,
    "username": "alice"
  }'
```

Result: `alice@your-lnbits.com` is live.

| Param | Type | Required | Note |
|---|---|---|---|
| username | string | Yes | Creates `username@your-domain` |
| description | string | Yes | Shown to sender |
| min | int | Yes | Min sats (use `1` for flexibility) |
| max | int | Yes | Max sats (use `1000000` for generous cap) |
| comment_chars | int | No | Let senders attach a message (max 799) |
| success_text | string | No | Shown after payment |
| webhook | string | No | URL to POST on payment |
| currency | string | No | Fiat code (EUR, USD). Min/max become fiat amounts |

Response: `{ "id", "wallet", "description", "min", "max", "username", "lnurl" }`

## What you get

| Format | Value | Use |
|---|---|---|
| Lightning Address | `alice@your-lnbits.com` | Bio, email sig, business card |
| Payment page | `https://your-lnbits.com/lnurlp/link/{id}` | Web embed, branded QR |
| LNURL | Encode `lnurl` field as QR | Flyers, stickers, signs |

## Fiat-denominated address

```bash
curl -X POST https://your-lnbits.com/lnurlp/api/v1/links \
  -H "X-Api-Key: ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Pay in EUR",
    "min": 1, "max": 100,
    "currency": "EUR",
    "username": "alice-eur"
  }'
```

When `currency` is set, min/max are in that currency. Converts to sats at payment time.

## Update, list, delete

```bash
# List all
GET /lnurlp/api/v1/links (Invoice key)

# Update
PUT /lnurlp/api/v1/links/{id} (Admin key)

# Delete
DELETE /lnurlp/api/v1/links/{id} (Admin key)
```

## Webhook payload

```json
{
  "payment_hash": "abc123...",
  "amount": 100000,
  "memo": "Send sats to Alice",
  "comment": "Great content!"
}
```

Amount in **millisatoshis** (divide by 1000 for sats).

## Rules

- Each address belongs to one wallet. Payments land there.
- Usernames are unique per instance. First come, first served.
- Invoice key for reading. Admin key for create/update/delete.
- When `currency` is set, min/max are fiat, not sats. Do not mix.
- Do not delete addresses published on physical materials without asking.
- Default for "I want to receive payments": `min: 1, max: 1000000, comment_chars: 140`.

## Errors

| Error | Cause | Fix |
|---|---|---|
| 401 | Wrong key type | Use admin key for writes |
| 404 | Extension not enabled | Enable LNURLp in dashboard |
| 400 Username taken | Already exists | Pick different username |
| 400 min > max | Invalid range | Set min <= max |
````

## Related Pages

- [LNURLp Extension](/extensions/lnurlp/)
- [LNURLp API](/extensions/lnurlp/api)
- [Skill: Wallet & Payments](/llm/skills/wallet-payments)
- [Skill: Shared Wallet](/llm/skills/shared-wallet)
