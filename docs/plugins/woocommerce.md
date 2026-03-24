# WooCommerce Plugin

> Accept Bitcoin on-chain and Lightning payments in your WooCommerce store via LNbits.

::: info eCommerce Plugin
This is an eCommerce plugin, not an LNbits extension. It runs inside WordPress / WooCommerce and connects to your LNbits server via its API.
:::

## Introduction

This WooCommerce extensions lets you accept onchain and lightning Bitcoin payments
using the LNbits Satspay Server extension.

Follow the instructions at https://github.com/lnbits/woocommerce-payment-gateway/blob/main/README.md to configure 
and setup the plugin.

You will need access to an LNbits instance to use this plugin. You can use the _demo_ LNbits
instance at https://legend.lnbits.com/ to test this plugin.

## License
This plugin is released under the [MIT license](https://github.com/lnbits/woocommerce-payment-gateway/blob/main/LICENSE).

## Installation

### LNbits configuration
1. Open your LNbits instance e.g. https://demo.lnbits.com/

1. Create a new wallet, or use an existing wallet if you already have one you want to use

   ![](https://raw.githubusercontent.com/lnbits/lnbits-bitcoin-onchain-and-lightning-payment-gateway/main/docs/images/lnbits-setup-1.jpg)
1. From the sidebar, take a note of the Wallet ID and Invoice/read key. You will need this later

   ![](https://raw.githubusercontent.com/lnbits/lnbits-bitcoin-onchain-and-lightning-payment-gateway/main/docs/images/lnbits-setup-2.jpg)

1. Click manage extensions in the sidemenu and enable the Satspay Server and Watch Only extensions
   
   ![](https://raw.githubusercontent.com/lnbits/lnbits-bitcoin-onchain-and-lightning-payment-gateway/main/docs/images/lnbits-setup-3.jpg)

   ![](https://raw.githubusercontent.com/lnbits/lnbits-bitcoin-onchain-and-lightning-payment-gateway/main/docs/images/lnbits-setup-4.jpg)

   ![](https://raw.githubusercontent.com/lnbits/lnbits-bitcoin-onchain-and-lightning-payment-gateway/main/docs/images/lnbits-setup-5.jpg)

1. Open the Watch Only extension and import an xpub/ypub/zpub to add a new watch only wallet

   ![](https://raw.githubusercontent.com/lnbits/lnbits-bitcoin-onchain-and-lightning-payment-gateway/main/docs/images/lnbits-setup-6.jpg)

1. Take a note of the watch only wallet ID that has been created. You will need this later

   ![](https://raw.githubusercontent.com/lnbits/lnbits-bitcoin-onchain-and-lightning-payment-gateway/main/docs/images/lnbits-setup-7.jpg)

1. That's it. Now, let's set up the WooCommerce plugin!

### WooCommerce Plugin Setup

1. Install the plugin using your Wordpress admin panel by searching for "LNbits - Bitcoin Lightning and Onchain
   Payment Gateway" or drop this repo into your wp-content/plugins directory

1. Activate the plugin

1. Open _WooCommerce > Settings > Payments_ and activate the LNbits payment method, then click _manage_.

   ![](https://raw.githubusercontent.com/lnbits/lnbits-bitcoin-onchain-and-lightning-payment-gateway/main/docs/images/woocommerce-setup-1.jpg)

1. Edit the Title and Description fields as you want

1. Enter the LNbits URL for your LNbits server and paste in your settings for the Invoice/Read Key, Wallet ID and Watch Only Extension Wallet ID

   ![](https://raw.githubusercontent.com/lnbits/lnbits-bitcoin-onchain-and-lightning-payment-gateway/main/docs/images/woocommerce-setup-2.jpg)

1. Click "Save changes"

## Development

To build the blocks integration:

1. Install dependencies:
```bash
npm install
```

2. Build the assets:
```bash
npm run build
```

For development, you can use:
```bash
npm run start
```

The plugin supports both classic WooCommerce checkout and the newer block-based checkout.

### Acknowledgements
This plugin is a fork of Phaedrus' original [LNBits For WooCommerce](https://gitlab.com/sovereign-individuals/lnbits-for-woocommerce).

Thank you to Phaedrus for the work on the original plugin on which this plugin leans heavily.


## Links

- [GitHub repository](https://github.com/lnbits/lnbits-bitcoin-onchain-and-lightning-payment-gateway)
- [Download latest release](https://github.com/lnbits/lnbits-bitcoin-onchain-and-lightning-payment-gateway/releases)
- [WordPress plugin page](https://wordpress.org/plugins/lnbits-bitcoin-onchain-and-lightning-payment-gateway/)
- [Announcement](https://news.lnbits.com/news/lnbits-woocommerce-plugin-for-bitcoin-payments)

## Related Pages

- [Plugins Overview](/plugins/) - all eCommerce plugins
- [API Reference](/api/) - LNbits API that plugins connect to
- [Authentication](/api/authentication) - how to authenticate API calls
- [Fiat Payments](/guide/core/fiat-payments) - accepting fiat alongside Lightning
