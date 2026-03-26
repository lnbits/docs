# Skill: Shared Wallet (Uncle Jim)

> Set up an "Uncle Jim" shared wallet - one wallet, multiple users, granular permissions. For families, teams, coops, or anyone onboarding others to Lightning.

<SkillHeader repo="lnbits/lnbits" :official="true" source="https://github.com/lnbits/docs/blob/main/docs/llm/skills/shared-wallet.md" />

## What this skill does

Teaches an AI agent to create an "Uncle Jim" shared wallet on LNbits - you run the wallet, invite family or friends, and control exactly what each person can do. Not "everyone gets the admin key" - it is a real permission system. The classic Uncle Jim setup: onboard people to Lightning without them needing their own node or wallet backend.

## The skill file

Copy this into your agent's context or save it as `SKILL.md`:

````markdown
---
name: lnbits-shared-wallet
description: >
  Create a shared wallet and invite other users with specific permissions.
  Use when the user wants to share a wallet with family, a team, a
  cooperative, or any group. Covers permission levels, invitations,
  and access management.
compatibility: LNbits 1.0+
---

## Prerequisites

- A running LNbits instance (self-hosted or my.lnbits.com)
- An existing wallet with admin key
- User IDs of people to invite (they need accounts on the same instance)

## Permissions

| Permission | Allows |
|---|---|
| `VIEW_PAYMENTS` | See balance and payment history |
| `RECEIVE_PAYMENTS` | Create invoices to receive sats |
| `SEND_PAYMENTS` | Pay invoices from the wallet |

Combine them for roles:

| Role | Permissions | Example |
|---|---|---|
| Viewer | `VIEW_PAYMENTS` | Auditor, observer |
| Collector | `VIEW_PAYMENTS`, `RECEIVE_PAYMENTS` | Team member who collects |
| Spender | `VIEW_PAYMENTS`, `SEND_PAYMENTS` | Treasurer |
| Full access | All three | Co-owner, partner |

Always include `VIEW_PAYMENTS` with other permissions.

## Send invitation

PUT /api/v1/wallet/share/invite
Auth: Admin key of the wallet to share

```bash
curl -X PUT https://your-lnbits.com/api/v1/wallet/share/invite \
  -H "X-Api-Key: WALLET_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "invited_user_id",
    "permissions": ["VIEW_PAYMENTS", "RECEIVE_PAYMENTS"]
  }'
```

Response: `{ "id": "share_request_abc", "wallet_id", "user_id", "permissions", "status": "pending" }`

## Accept invitation (invited user)

PUT /api/v1/wallet/share
Auth: Invited user's admin key

```bash
curl -X PUT https://your-lnbits.com/api/v1/wallet/share \
  -H "X-Api-Key: INVITED_USER_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"share_request_id": "share_request_abc"}'
```

After acceptance, the shared wallet appears in the invited user's wallet list.

## Reject or revoke

DELETE /api/v1/wallet/share/invite/{share_request_id}
Auth: Either the invited user or the wallet owner

```bash
curl -X DELETE https://your-lnbits.com/api/v1/wallet/share/invite/share_request_abc \
  -H "X-Api-Key: ADMIN_KEY"
```

## Complete flow

```
Owner                     LNbits                  Members
  |-- Create wallet ------->|                        |
  |<-- wallet + keys -------|                        |
  |-- Invite Alice (recv) ->|                        |
  |-- Invite Bob (view) --->|                        |
  |                          |<-- Alice accepts ------|
  |                          |<-- Bob accepts --------|
  |                          |                        |
  |  Owner: full control     |  Alice: view + receive |
  |                          |  Bob: view only        |
```

## Rules

- Only the wallet owner (admin key holder) can send invitations and revoke access.
- Invitations must be accepted. They do not auto-grant permissions.
- Owner always retains full control regardless of shared permissions.
- Users must be on the **same LNbits instance**. No cross-server sharing.
- Default to minimum permissions. Do not grant `SEND_PAYMENTS` unless explicitly asked.
- Confirm with owner before revoking access. Revocation is immediate.

## Errors

| Error | Cause | Fix |
|---|---|---|
| 401 | Not using the wallet's admin key | Use the shared wallet's admin key |
| 404 User not found | Invalid user ID | Verify user exists on this instance |
| 400 Invalid permissions | Bad permission string | Use exactly: VIEW_PAYMENTS, RECEIVE_PAYMENTS, SEND_PAYMENTS |
| 400 Already shared | User already has access | Check existing shares first |
````

## Use case ideas

- **Uncle Jim for family** - onboard your family to Lightning, kids receive birthday sats, parents control spending
- **Uncle Jim for friends** - run a node, give friends wallets with their own Lightning Addresses
- **Team event fund** - organizers collect, one treasurer handles expenses
- **Cooperative treasury** - all members full access, fully transparent
- **Merchant + accountant** - merchant operates, accountant views for bookkeeping

## Related Pages

- [Wallets & Accounts Guide](/guide/core/wallets-and-accounts)
- [User Management](/guide/core/user-management/)
- [Skill: Wallet & Payments](/llm/skills/wallet-payments)
- [Skill: Lightning Address](/llm/skills/lnurlp-pay-links)
