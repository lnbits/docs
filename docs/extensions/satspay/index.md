<ExtensionHeader
  name="SatsPay"
  description="Payment pages accepting on-chain and Lightning."
  category="Payments & Commerce"
  icon="💳"
  repo="lnbits/satspay"
/>

## Overview

SatsPay Server creates BTCPay-style payment pages that support both Lightning Network and on-chain Bitcoin payments. Set an amount, expiry time, and optional webhook — customers choose how they want to pay. Works with the Watch Only extension for on-chain address generation.

## Features

- **Dual payment** — accept both Lightning and on-chain Bitcoin on one page
- **Expiry timer** — invoices expire after a configurable time window
- **Webhook notifications** — receive transaction details on successful payment
- **Redirect after payment** — send customers to a custom URL after paying
- **Custom button text** — configurable call-to-action after payment
- **Payment state tracking** — monitor charge status from the admin panel

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Click **New Charge** to create a payment page:
   - Set a description and amount in sats
   - Set the expiry time (in minutes)
   - Optionally add a webhook URL and redirect URL
   - Choose Lightning, on-chain, or both
   - Select the corresponding wallets
3. Share the charge link with your customer

## Use Cases

- **Invoicing** — send payment links to customers
- **E-commerce** — payment pages for online stores
- **Donations** — accept Bitcoin donations with both payment methods
- **Service payments** — charge for freelance work or subscriptions

## API Reference

See the [SatsPay API documentation](./api) for endpoint details.

## Related Pages

- [SatsPay API Reference](./api): API endpoints for this extension
- [Watch Only](/extensions/watchonly/): On-chain wallet for address generation
- [Invoices](/extensions/invoices/): Fiat-denominated line-item invoices
- [All Extensions](/extensions/): Browse all LNbits extensions
