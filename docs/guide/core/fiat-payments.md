# Fiat Payments (Stripe / PayPal)

> Accept card and PayPal payments alongside Lightning — configured at the server level by the Super User and consumed by any extension.

LNbits has a built-in fiat provider system that lets admins enable **Stripe** and **PayPal** at the server level. Once configured, any extension can offer fiat payment options alongside Lightning — without handling API keys or payment logic themselves.

## How it works

```
Super User configures Stripe/PayPal in Admin UI
         │
         ▼
   Server-level fiat provider settings
         │
         ▼
   Core fiat provider service (lnbits/fiat/)
         │
         ▼
   Extensions check availability → offer card/PayPal to users
```

The key principle: **admins configure, extensions consume**. Extensions never store API keys or configure payment providers — they call the core fiat provider service.

## Setting up Stripe

### Via Admin UI

1. Log in as [Super User](/guide/core/super-user)
2. Go to **Admin** → **Server** → **Fiat Providers**
3. Enter your Stripe API keys (secret key + publishable key)
4. Set the webhook signing secret
5. Configure limits (optional)
6. Click **Save**

### Via environment variables

```bash
# Enable Stripe
LNBITS_FIAT_PROVIDER_STRIPE=true
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SIGNING_SECRET=whsec_...
```

### Webhook setup

Stripe uses webhooks to notify LNbits when payments complete. In your [Stripe dashboard](https://dashboard.stripe.com/webhooks), add a webhook endpoint pointing to:

```
https://your-lnbits.com/api/v1/webhook/stripe
```

Subscribe to these events:

| Event | Purpose |
| --- | --- |
| `checkout.session.completed` | One-time payment completed |
| `payment_intent.succeeded` | Payment intent fulfilled |
| `customer.subscription.created` | New subscription started |
| `customer.subscription.deleted` | Subscription cancelled |

## Provider limits

Control who can use fiat payments and how much they can pay:

| Setting | Description |
| --- | --- |
| **Allowed users** | Restrict to specific user IDs (empty = everyone) |
| **Minimum amount** | Minimum payment in sats |
| **Maximum amount** | Maximum payment in sats |

```bash
# Example: limit card payments to 10,000–1,000,000 sats
STRIPE_MIN_AMOUNT_SATS=10000
STRIPE_MAX_AMOUNT_SATS=1000000
```

## Payment models

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

This is fully PCI-compliant — card details never touch your server.

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

## What users see

When Stripe is enabled, extensions that support fiat payments show dual payment options:

| Method | Always available? | How it works |
| --- | --- | --- |
| **Lightning** | Yes | Pay with any Lightning wallet via BOLT11 invoice |
| **Card** | When Stripe enabled | Redirected to Stripe Checkout for card payment |

Users choose their preferred method. The extension handles both flows transparently.

## Stripe checking ID prefixes

Stripe uses prefixed IDs for different payment types:

| Prefix | Type | Description |
| --- | --- | --- |
| `cs_` | Checkout session | One-time payment via hosted page |
| `pi_` | Payment intent | Direct payment intent |
| `in_` | Invoice | Stripe invoice |
| `sub_` | Subscription | Recurring subscription |

## Security considerations

- **API keys** are stored server-side and never exposed to extensions or users
- **Webhook signatures** are verified using the signing secret to prevent spoofing
- **PCI compliance** is handled by Stripe Checkout — card data never reaches LNbits
- Only the **Super User** can configure fiat providers
- Extensions access the provider through a controlled core API, never directly

::: warning
Never expose your Stripe secret key. It should only be configured by the Super User via the Admin UI or environment variables. Extensions must never store, log, or display Stripe keys.
:::

## For extension developers

Extensions can add fiat payment support with minimal code. The core provides:

- `is_fiat_provider_enabled("stripe")` — check if Stripe is available
- `get_fiat_provider("stripe")` — get the provider instance
- `provider.create_invoice(...)` — create a checkout session
- `provider.get_invoice_status(...)` — check payment status
- `provider.create_subscription(...)` — set up recurring payments

See the full [Fiat Provider Integration](/dev/fiat-integration) developer guide for code patterns, API reference, and a complete extension example.

## Troubleshooting

| Issue | Cause | Fix |
| --- | --- | --- |
| "Card payments not available" | Stripe not configured | Super User must enable Stripe in Admin UI |
| Payments stuck on "pending" | Webhook not reaching LNbits | Verify webhook URL in Stripe dashboard; check HTTPS and firewall |
| "Not authorized for card payments" | User not in allowed list | Add user ID to the allowed users list |
| Amount errors | Outside configured limits | Check min/max amount settings |

## Related Pages

- [Fiat Provider Integration (Developer Guide)](/dev/fiat-integration) — code patterns for extension developers
- [Fiat Currency Display](/guide/core/fiat/overview) — exchange rates and currency conversion
- [Admin Dashboard](/guide/admin-dashboard) — server-level configuration
- [Super User](/guide/core/super-user) — required role for fiat provider setup
- [Core Features](/guide/core/)
