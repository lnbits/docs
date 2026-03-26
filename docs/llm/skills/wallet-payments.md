# Skill: Wallet & Payments

> The foundation skill - create wallets, receive and send Lightning payments via the LNbits core API.

<SkillHeader repo="lnbits/lnbits" :official="true" source="https://github.com/lnbits/docs/blob/main/docs/llm/skills/wallet-payments.md" />

## What this skill does

Teaches an AI agent to work with LNbits wallets and payments: create a wallet, generate invoices, pay invoices, and check payment status. Every LNbits integration starts here.

## The skill file

Copy this into your agent's context or save it as `SKILL.md`:

````markdown
---
name: lnbits-wallet-payments
description: >
  Create and manage LNbits wallets and payments via the core API.
  Use when the user wants to create a wallet, generate a Lightning
  invoice, pay a bolt11 invoice, check a payment status, or list
  payment history.
compatibility: LNbits 1.0+
---

## Prerequisites

- A running LNbits instance (self-hosted or my.lnbits.com)
- An existing wallet with admin key (needed to create additional wallets)
- For paying invoices: sufficient wallet balance

## API Keys

| Key | Header | Can do |
|---|---|---|
| Admin key | `X-Api-Key: ADMIN_KEY` | Everything: create/delete wallets, send payments |
| Invoice key | `X-Api-Key: INVOICE_KEY` | Read-only + receive: check balance, create invoices |

NEVER expose admin keys in frontend code. They grant full wallet control including withdrawals.

## Create a wallet

POST /api/v1/wallet
Auth: Admin key

```bash
curl -X POST https://your-lnbits.com/api/v1/wallet \
  -H "X-Api-Key: ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "My Wallet"}'
```

Response: `{ "id", "name", "balance", "adminkey", "inkey" }`

## Check balance

GET /api/v1/wallet
Auth: Invoice key

```bash
curl https://your-lnbits.com/api/v1/wallet \
  -H "X-Api-Key: INVOICE_KEY"
```

Balance is in **millisatoshis** (divide by 1000 for sats).

## Receive sats (create invoice)

POST /api/v1/payments
Auth: Invoice key

```bash
curl -X POST https://your-lnbits.com/api/v1/payments \
  -H "X-Api-Key: INVOICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"out": false, "amount": 100, "memo": "Payment for coffee"}'
```

| Param | Type | Required | Note |
|---|---|---|---|
| out | bool | Yes | `false` = receive |
| amount | int | Yes | In **sats** |
| memo | string | No | Description for payer |
| webhook | string | No | URL to POST on payment |

Response: `{ "payment_hash", "payment_request", "checking_id" }`

Share `payment_request` (bolt11) with the payer.

## Send sats (pay invoice)

POST /api/v1/payments
Auth: Admin key

```bash
curl -X POST https://your-lnbits.com/api/v1/payments \
  -H "X-Api-Key: ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"out": true, "bolt11": "lnbc1000n1p..."}'
```

Always check payment status after paying. Lightning payments can fail.

## Check payment status

GET /api/v1/payments/{checking_id}
Auth: Invoice key

```bash
curl https://your-lnbits.com/api/v1/payments/CHECKING_ID \
  -H "X-Api-Key: INVOICE_KEY"
```

Response: `{ "paid": true/false, "details": { "amount", "fee", "memo", "status" } }`

## List payments

GET /api/v1/payments?limit=10&status=success
Auth: Invoice key

## Rules

- `out: false` = receive, `out: true` = send. Same endpoint.
- Invoice key for receiving/reading. Admin key for sending/deleting.
- Balance responses: millisatoshis. Payment creation: sats. Do not mix.
- Always verify payment status after paying an invoice.
- Never delete wallets without explicit user confirmation.
- If user does not specify an amount, ask. Do not assume defaults.

## Errors

| Error | Cause | Fix |
|---|---|---|
| 401 | Wrong key type | Check admin vs invoice key |
| 400 Insufficient balance | Not enough sats | Check balance or top up |
| 400 Invoice already paid | Double payment attempt | Check status before paying |
````

## Related Pages

- [Wallets API Reference](/api/core/wallets)
- [Payments API Reference](/api/core/payments)
- [Skill: Lightning Address](/llm/skills/lnurlp-pay-links)
- [Skill: Shared Wallet](/llm/skills/shared-wallet)
