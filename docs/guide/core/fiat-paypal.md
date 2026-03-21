# PayPal Payments

> Accept PayPal payments alongside Lightning - users pay with their PayPal balance, linked cards, or bank accounts.

## Prerequisites

- A [PayPal Business account](https://www.paypal.com/business)
- A PayPal app created in the [Developer Dashboard](https://developer.paypal.com/dashboard/applications)
- LNbits instance with [Super User](/guide/core/super-user) access
- HTTPS enabled on your LNbits instance (required for webhooks)

## Getting your PayPal credentials

1. Go to the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications)
2. Click **Create App** (or select an existing one)
3. Copy the **Client ID** and **Client Secret**
4. For testing, stay in **Sandbox** mode. Switch to **Live** for production.

::: tip
Start with Sandbox mode. PayPal provides [sandbox test accounts](https://developer.paypal.com/dashboard/accounts) with fake balances so you can verify the full flow without real money.
:::

## Setup

### Via Admin UI

1. Log in as [Super User](/guide/core/super-user)
2. Go to **Admin** > **Server** > **Fiat Providers**
3. Enable PayPal
4. Enter your Client ID and Client Secret
5. Set the Webhook ID (see [Webhook setup](#webhook-setup) below)
6. Set the callback URL to `https://your-lnbits.com/api/v1/callback/paypal`
7. Set the success URL (where users land after payment)
8. Click **Save**

### Via environment variables

```bash
PAYPAL_ENABLED=true
PAYPAL_CLIENT_ID=your-client-id
PAYPAL_CLIENT_SECRET=your-client-secret
PAYPAL_WEBHOOK_ID=your-webhook-id
PAYPAL_PAYMENT_WEBHOOK_URL=https://your-lnbits.com/api/v1/callback/paypal
PAYPAL_PAYMENT_SUCCESS_URL=https://your-lnbits.com
```

## Webhook setup

PayPal uses webhooks to notify LNbits when payments complete. Without a working webhook, payments will not be confirmed.

1. Go to [PayPal Developer Dashboard > Webhooks](https://developer.paypal.com/dashboard/webhooks)
2. Click **Add Webhook**
3. Set the URL to:

```
https://your-lnbits.com/api/v1/callback/paypal
```

4. Subscribe to these events:

| Event | Purpose |
| --- | --- |
| `CHECKOUT.ORDER.APPROVED` | User approved the payment |
| `PAYMENT.CAPTURE.COMPLETED` | Payment captured successfully |
| `PAYMENT.CAPTURE.DENIED` | Payment capture denied |
| `BILLING.SUBSCRIPTION.CREATED` | New subscription started |
| `BILLING.SUBSCRIPTION.CANCELLED` | Subscription cancelled |

5. After creating the webhook, copy the **Webhook ID** and add it to your config

The Webhook ID is critical - LNbits uses it to verify that incoming events are genuinely from PayPal, not spoofed.

::: warning
The webhook URL must be publicly reachable over HTTPS. If you're behind a reverse proxy, make sure the `/api/v1/callback/paypal` path is forwarded correctly.
:::

## Payment flow

```
User clicks "Pay with PayPal"
  → Redirected to PayPal payment page
  → Logs in with PayPal (or pays as guest with card)
  → Confirms payment
  → Redirected to success URL
  → Webhook confirms payment to LNbits
```

Users can pay with their PayPal balance, a linked card, or a linked bank account. PayPal also supports guest checkout (card without PayPal account) in supported regions.

## Limits

Control who can use PayPal payments and how much they can pay:

| Variable | Default | Description |
| --- | --- | --- |
| `PAYPAL_MIN_AMOUNT_SATS` | `0` | Minimum payment amount in sats |
| `PAYPAL_MAX_AMOUNT_SATS` | `0` | Maximum payment amount in sats (0 = unlimited) |
| `PAYPAL_MAX_SATS_FEE` | `0` | Maximum fee cap in sats |
| `PAYPAL_PERCENT_FEE` | `0` | Percentage fee on each payment |
| `PAYPAL_ALLOWED_USERS` | - | Comma-separated user IDs (empty = everyone) |
| `PAYPAL_FAUCET_WALLET` | - | Wallet ID to receive faucet funds |

## Environment variable reference

| Variable | Required | Description |
| --- | --- | --- |
| `PAYPAL_ENABLED` | Yes | Set to `true` to enable PayPal |
| `PAYPAL_CLIENT_ID` | Yes | OAuth Client ID from PayPal app |
| `PAYPAL_CLIENT_SECRET` | Yes | OAuth Client Secret from PayPal app |
| `PAYPAL_WEBHOOK_ID` | Yes | Webhook ID for signature verification |
| `PAYPAL_PAYMENT_WEBHOOK_URL` | Yes | Full URL to the LNbits PayPal callback endpoint |
| `PAYPAL_PAYMENT_SUCCESS_URL` | No | Where users are redirected after payment (default: `https://lnbits.com`) |
| `PAYPAL_API_ENDPOINT` | No | PayPal API URL (default: `https://api-m.paypal.com`) |
| `PAYPAL_MIN_AMOUNT_SATS` | No | Minimum payment in sats |
| `PAYPAL_MAX_AMOUNT_SATS` | No | Maximum payment in sats |
| `PAYPAL_MAX_SATS_FEE` | No | Fee cap in sats |
| `PAYPAL_PERCENT_FEE` | No | Percentage fee |
| `PAYPAL_ALLOWED_USERS` | No | Restrict access to specific users |
| `PAYPAL_FAUCET_WALLET` | No | Wallet for faucet funds |

## Sandbox vs Production

| | Sandbox | Production |
| --- | --- | --- |
| **API endpoint** | `https://api-m.sandbox.paypal.com` | `https://api-m.paypal.com` (default) |
| **Credentials** | From sandbox app | From live app |
| **Real money** | No | Yes |
| **Test accounts** | Auto-generated in Developer Dashboard | Real PayPal users |

To use sandbox for testing:

```bash
PAYPAL_API_ENDPOINT=https://api-m.sandbox.paypal.com
```

::: tip
Create separate webhook endpoints for sandbox and production. Each has its own Webhook ID.
:::

## Troubleshooting

| Issue | Cause | Fix |
| --- | --- | --- |
| "PayPal not available" | Provider not enabled | Super User must enable PayPal in Admin UI or set `PAYPAL_ENABLED=true` |
| Payments not confirming | Webhook misconfigured | Verify webhook URL and Webhook ID in PayPal dashboard |
| "Not authorized" | User not in allowed list | Add user ID to `PAYPAL_ALLOWED_USERS` or leave empty for all users |
| Webhook signature errors | Wrong Webhook ID | Each webhook endpoint has its own ID; make sure you copied the right one |
| "Invalid client" errors | Wrong credentials or mode mismatch | Check that Client ID/Secret match the mode (sandbox vs live) |
| Redirects to wrong page | Success URL not set | Set `PAYPAL_PAYMENT_SUCCESS_URL` to your LNbits instance URL |

::: warning
Never expose your PayPal Client Secret. It should only be configured by the Super User via the Admin UI or environment variables. Extensions must never store, log, or display PayPal credentials.
:::

## Related Pages

- [Fiat Payments Overview](/guide/core/fiat-payments) - how fiat providers work in LNbits
- [Stripe Setup](/guide/core/fiat-stripe) - alternative fiat provider
- [Fiat Currency Display](/guide/core/fiat/overview) - exchange rates and currency conversion
- [Fiat Provider Integration (Developer Guide)](/dev/fiat-integration) - code patterns for extension developers
- [Super User](/guide/core/super-user) - required role for provider setup
