# Fiat Currency Display

> Display wallet balances in fiat currencies with configurable exchange rate sources.

LNbits can display wallet balances and payment amounts in fiat currencies alongside satoshis.

## Enabling fiat display

Fiat conversion is built into the core. Users can select their preferred fiat currency from the wallet settings.

## Supported currencies

LNbits supports 20+ fiat currencies including USD, EUR, GBP, JPY, BRL, and more. Exchange rates are fetched from public APIs.

## Exchange rate sources

LNbits fetches rates from multiple providers:

- CoinGecko
- Yadio
- ExchangeRate.host

Configure the rate source in your `.env`:

```bash
LNBITS_EXCHANGE_RATE_PROVIDER=coingecko
```

## API

The fiat conversion API is available at:

```bash
# Get current rate
curl https://your-lnbits.com/api/v1/rate/{currency}

# List supported currencies
curl https://your-lnbits.com/api/v1/currencies

# Convert amount
curl https://your-lnbits.com/api/v1/conversion \
  -H "Content-Type: application/json" \
  -d '{"from": "sat", "amount": 10000, "to": "USD"}'
```

## Use cases

- **Point of sale** — display prices in local currency
- **Invoicing** — create invoices denominated in fiat
- **Reporting** — track revenue in fiat terms

## Related Pages

- [Fiat Payments (Stripe / PayPal)](/guide/core/fiat-payments) — accept card and PayPal payments
- [Fiat & Conversion API](/api/core/fiat) — API endpoints
- [Core Features](/guide/core/)
- [Configuration](/guide/core/environment)
