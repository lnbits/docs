# Stripe Payments

> Accept credit and debit card payments alongside Lightning using Stripe Checkout - fully PCI-compliant, card details never touch your server.

## Prerequisites

- A [Stripe account](https://dashboard.stripe.com/register) (free to create)
- LNbits instance with [Super User](/guide/core/super-user) access
- HTTPS enabled on your LNbits instance (required for webhooks)

## Getting your Stripe keys

1. Log in to the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy the **Publishable key** (`pk_live_...`) and **Secret key** (`sk_live_...`)
3. For testing, toggle to **Test mode** and use the test keys (`pk_test_...` / `sk_test_...`)

::: tip
Use test mode first. Stripe provides [test card numbers](https://docs.stripe.com/testing#cards) like `4242 4242 4242 4242` so you can verify the full flow without real money.
:::

## Setup

### Via Admin UI

1. Log in as [Super User](/guide/core/super-user)
2. Go to **Admin** > **Server** > **Fiat Providers**
3. Enter your Stripe API keys (secret key + publishable key)
4. Set the webhook signing secret (see [Webhook setup](#webhook-setup) below)
5. Configure limits (optional)
6. Click **Save**

### Via environment variables

```bash
LNBITS_FIAT_PROVIDER_STRIPE=true
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SIGNING_SECRET=whsec_...
```

## Webhook setup

Stripe uses webhooks to notify LNbits when payments complete. Without a working webhook, payments will stay stuck on "pending".

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Set the endpoint URL to:

```
https://your-lnbits.com/api/v1/webhook/stripe
```

4. Subscribe to these events:

| Event | Purpose |
| --- | --- |
| `checkout.session.completed` | One-time payment completed |
| `payment_intent.succeeded` | Payment intent fulfilled |
| `customer.subscription.created` | New subscription started |
| `customer.subscription.deleted` | Subscription cancelled |

5. After creating the endpoint, copy the **Signing secret** (`whsec_...`) and add it to your config

::: warning
The webhook URL must be publicly reachable over HTTPS. If you're behind a reverse proxy, make sure the `/api/v1/webhook/stripe` path is forwarded correctly.
:::

## Payment flows

### One-time payments (Checkout Sessions)

The most common pattern. Users are redirected to a Stripe-hosted payment page:

```
User clicks "Pay with Card"
  → Redirected to Stripe Checkout
  → Enters card details
  → Payment processed
  → Redirected back to LNbits
  → Webhook confirms payment
```

Card details never touch your server - Stripe handles all PCI compliance.

### Subscriptions

For recurring payments (e.g., paid extension access, premium features):

```
User subscribes via Stripe Checkout
  → Stripe creates a recurring subscription
  → Charges on the configured schedule
  → Webhooks notify LNbits of each payment
  → User can cancel anytime
```

Subscriptions require creating Price objects in your Stripe dashboard first.

## Limits

Control who can use Stripe payments and how much they can pay:

| Variable | Default | Description |
| --- | --- | --- |
| `STRIPE_MIN_AMOUNT_SATS` | `0` | Minimum payment amount in sats |
| `STRIPE_MAX_AMOUNT_SATS` | `0` | Maximum payment amount in sats (0 = unlimited) |
| `STRIPE_MAX_SATS_FEE` | `0` | Maximum fee cap in sats |
| `STRIPE_PERCENT_FEE` | `0` | Percentage fee on each payment |
| `STRIPE_ALLOWED_USERS` | - | Comma-separated user IDs (empty = everyone) |
| `STRIPE_FAUCET_WALLET` | - | Wallet ID to receive faucet funds |

## Environment variable reference

| Variable | Required | Description |
| --- | --- | --- |
| `LNBITS_FIAT_PROVIDER_STRIPE` | Yes | Set to `true` to enable Stripe |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key (`sk_live_...` or `sk_test_...`) |
| `STRIPE_PUBLISHABLE_KEY` | Yes | Stripe publishable key (`pk_live_...` or `pk_test_...`) |
| `STRIPE_WEBHOOK_SIGNING_SECRET` | Yes | Webhook signing secret (`whsec_...`) |
| `STRIPE_MIN_AMOUNT_SATS` | No | Minimum payment in sats |
| `STRIPE_MAX_AMOUNT_SATS` | No | Maximum payment in sats |
| `STRIPE_MAX_SATS_FEE` | No | Fee cap in sats |
| `STRIPE_PERCENT_FEE` | No | Percentage fee |
| `STRIPE_ALLOWED_USERS` | No | Restrict access to specific users |
| `STRIPE_FAUCET_WALLET` | No | Wallet for faucet funds |

## Test mode vs Live mode

| | Test | Live |
| --- | --- | --- |
| **Key prefix** | `sk_test_...` / `pk_test_...` | `sk_live_...` / `pk_live_...` |
| **Real money** | No | Yes |
| **Test cards** | `4242 4242 4242 4242` | Real cards only |
| **Webhook secret** | Separate per mode | Separate per mode |

Switch between modes in the Stripe Dashboard. Use separate webhook endpoints for test and live, each with their own signing secret.

## Stripe ID prefixes

Useful when debugging - Stripe prefixes every object ID:

| Prefix | Type |
| --- | --- |
| `cs_` | Checkout session |
| `pi_` | Payment intent |
| `in_` | Invoice |
| `sub_` | Subscription |

## Troubleshooting

| Issue | Cause | Fix |
| --- | --- | --- |
| "Card payments not available" | Stripe not enabled | Super User must enable Stripe in Admin UI or set `LNBITS_FIAT_PROVIDER_STRIPE=true` |
| Payments stuck on "pending" | Webhook not reaching LNbits | Verify webhook URL and signing secret; check HTTPS, firewall, and reverse proxy config |
| "Not authorized for card payments" | User not in allowed list | Add user ID to `STRIPE_ALLOWED_USERS` or leave empty for all users |
| Amount errors | Outside configured limits | Check `STRIPE_MIN_AMOUNT_SATS` and `STRIPE_MAX_AMOUNT_SATS` |
| Webhook signature mismatch | Wrong signing secret | Each webhook endpoint has its own secret; make sure you copied the right one |

::: warning
Never expose your Stripe secret key. It should only be configured by the Super User via the Admin UI or environment variables. Extensions must never store, log, or display Stripe keys.
:::

## Related Pages

- [Fiat Payments Overview](/guide/core/fiat-payments) - how fiat providers work in LNbits
- [PayPal Setup](/guide/core/fiat-paypal) - alternative fiat provider
- [Fiat Currency Display](/guide/core/fiat/overview) - exchange rates and currency conversion
- [Fiat Provider Integration (Developer Guide)](/dev/fiat-integration) - code patterns for extension developers
- [Super User](/guide/core/super-user) - required role for provider setup
