# Fiat Payments

> Accept card and PayPal payments alongside Lightning - configured at the server level by the Super User and consumed by any extension.

LNbits has a built-in fiat provider system. Admins enable **Stripe** and/or **PayPal** at the server level. Once configured, any extension can offer fiat payment options alongside Lightning without handling API keys or payment logic themselves.

## How it works

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/diagrams/fiat-flow-dark.svg">
  <img src="/diagrams/fiat-flow-light.svg" alt="Fiat payment flow - Super User configures providers, core service handles payments, extensions offer fiat to users" style="max-width: 600px; width: 100%; margin: 16px auto; display: block;" />
</picture>

The key principle: **admins configure, extensions consume**. Extensions never store API keys or configure payment providers - they call the core fiat provider service.

## Providers

| Provider | Payment methods | Subscriptions | Setup guide |
| --- | --- | --- | --- |
| **Stripe** | Credit/debit cards | Yes | [Stripe setup →](/guide/core/fiat-stripe) |
| **PayPal** | PayPal balance, cards, bank | Yes | [PayPal setup →](/guide/core/fiat-paypal) |

You can enable one or both providers. Each operates independently.

## What users see

When fiat providers are enabled, extensions that support fiat show multiple payment options:

| Method | When available | How it works |
| --- | --- | --- |
| **Lightning** | Always | Pay with any Lightning wallet via BOLT11 invoice |
| **Card (Stripe)** | When Stripe enabled | Redirected to Stripe Checkout |
| **PayPal** | When PayPal enabled | Redirected to PayPal payment page |

Users choose their preferred method. The extension handles all flows transparently.

## Provider limits

Both providers share the same limits framework. Control who can use fiat payments and how much they can pay:

| Setting | Description |
| --- | --- |
| **Allowed users** | Restrict to specific user IDs (empty = everyone) |
| **Minimum amount** | Minimum payment in sats |
| **Maximum amount** | Maximum payment in sats |
| **Max fee (sats)** | Maximum fee in sats |
| **Percent fee** | Percentage-based fee |

## Security

- **API keys** are stored server-side and never exposed to extensions or users
- **Webhook signatures** are verified to prevent spoofing
- Only the **Super User** can configure fiat providers
- Extensions access providers through a controlled core API, never directly

::: warning
Never expose provider secrets. They should only be configured by the Super User via the Admin UI or environment variables. Extensions must never store, log, or display API keys.
:::

## For extension developers

Extensions can add fiat payment support with minimal code:

```python
# Check if a provider is available
is_fiat_provider_enabled("stripe")
is_fiat_provider_enabled("paypal")

# Get the provider and create a payment
provider = get_fiat_provider("stripe")
provider.create_invoice(...)
provider.get_invoice_status(...)
provider.create_subscription(...)
```

See the full [Fiat Provider Integration](/dev/fiat-integration) developer guide for code patterns and examples.

## Related Pages

- [Stripe Setup](/guide/core/fiat-stripe) - configure Stripe for card payments
- [PayPal Setup](/guide/core/fiat-paypal) - configure PayPal payments
- [Fiat Currency Display](/guide/core/fiat/overview) - exchange rates and currency conversion
- [Fiat Provider Integration (Developer Guide)](/dev/fiat-integration) - code patterns for extension developers
- [Admin Dashboard](/guide/admin-dashboard) - server-level configuration
