# OpenReceive

> Accept Lightning payments in WooCommerce, Easy Digital Downloads, PrestaShop, Odoo and other stores, paid into your LNbits wallet over a receive-only NWC connection.

::: info eCommerce Plugin
This is an eCommerce plugin, not an LNbits extension. It runs inside your store and connects to your LNbits wallet through the NWC Service Provider extension, not through an API key.
:::

## Introduction

[OpenReceive](https://openreceive.org) is free, open-source (MIT) checkout software that runs inside your own store or app. It asks your wallet for a Lightning invoice, shows it to the customer, and marks the order paid when the invoice settles. There is no OpenReceive account, no API key and no fee, and OpenReceive never holds funds.

The store never holds anything that can spend. You give it an NWC connection that may create invoices and list transactions, and nothing else. Your node stays behind LNbits: the store talks to one LNbits wallet, and if the store's server is ever compromised, the attacker can create invoices but cannot move your funds.

## Platforms

Plugins for WooCommerce and Easy Digital Downloads (WordPress), PrestaShop, Odoo, Medusa, Vendure, Paymenter and FOSSBilling, and libraries for Node.js, Python, PHP and Ruby on Rails. Each has a guide at [https://openreceive.org](https://openreceive.org).

## LNbits configuration

1. Set up a Nostr relay for LNbits as the [NWC Service Provider README](https://github.com/lnbits/nwcprovider) describes, then enable the NWC Service Provider extension.
2. Open the extension and add a connection for the wallet that should receive the payments.
3. Grant **Create invoices** (`make_invoice`), **Read transaction history** (`list_transactions`) and **Read account info** (`get_info`). Do not grant **Send payments** (`pay_invoice`).
4. Copy the pairing URL (`nostr+walletconnect://...`).

## Store setup

1. Install OpenReceive for your platform, following its guide.
2. Paste the pairing URL where the plugin asks for the NWC connection (`NWC_URI` in the libraries).
3. With the libraries, run `npx openreceive doctor`. It reports any method OpenReceive needs that is missing, and any spend method the connection offers.
4. Place a test order.

## Good to know

- Payments are Lightning only and arrive in the LNbits wallet you chose.
- Customers can also pay with USDT or USDC if you configure a swap provider; you still receive bitcoin over Lightning.

## License

OpenReceive is released under the [MIT license](https://github.com/OpenReceive/openreceive/blob/master/LICENSE).

## Related Pages

- [Plugins Overview](/plugins/) - all eCommerce plugins
- [NWC Service Provider](/extensions/nwcprovider/) - the extension OpenReceive connects through
