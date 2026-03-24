# eCommerce Plugins

> Connect popular eCommerce platforms to your LNbits server and accept Bitcoin payments in your online store.

## What are plugins?

Plugins are **not** LNbits extensions or companion apps. They live inside external eCommerce platforms (WooCommerce, Shopify, etc.) and connect to your LNbits server via its API. Your store handles the cart, checkout, and order management. The plugin handles the Bitcoin payment flow.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/diagrams/plugin-flow-dark.svg">
  <img src="/diagrams/plugin-flow-light.svg" alt="eCommerce plugin flow - store connects to LNbits via API, customer pays Lightning or on-chain, order confirmed" style="max-width: 760px; width: 100%; margin: 24px auto; display: block;" />
</picture>

## Available Plugins

| Plugin | Platform | Features |
|---|---|---|
| [WooCommerce](/plugins/woocommerce) | WordPress / WooCommerce | Lightning + on-chain, auto-conversion, order management |

## Requirements

All plugins need:

- A running LNbits instance (self-hosted or [SaaS](https://my.lnbits.com))
- An API key from your LNbits wallet (see [Authentication](/api/authentication))
- The eCommerce platform installed and running

## Plugins vs Extensions vs Apps

| | Plugins | Extensions | Apps |
|---|---|---|---|
| **Runs inside** | eCommerce platform (WordPress, Shopify) | LNbits server | Standalone |
| **Installed via** | Platform's plugin store | LNbits extension manager | App store / APK |
| **Purpose** | Connect your store to LNbits | Add features to LNbits | Extend LNbits to devices |
| **Examples** | WooCommerce, Shopify | TPoS, Boltcards, LNURLp | TPoS Wrapper |

::: tip Building a plugin?
If you have built an eCommerce plugin that integrates with LNbits, reach out on [Telegram](https://t.me/lnbits) to get it listed here.
:::

## Related Pages

- [Extensions](/extensions/) - features that run inside LNbits
- [Companion Apps](/apps/) - standalone apps that connect to LNbits
- [API Reference](/api/) - endpoints your plugin connects to
- [Fiat Payments](/guide/core/fiat-payments) - accepting fiat alongside Lightning
