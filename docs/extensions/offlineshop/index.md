<ExtensionHeader
  name="Offline Shop"
  description="Receive payments offline with printed QR codes."
  category="Payments & Commerce"
  icon="🏷️"
  repo="lnbits/offlineshop"
/>

## Overview

Offline Shop lets merchants accept Bitcoin payments without being online or even having an electronic device present. Create products, print QR codes, and display them at your shop. When customers scan a QR code, they see the product description and price, pay with Lightning, and receive a confirmation code that proves payment.

## How It Works

1. Create products with names, descriptions, and prices
2. Print the generated QR codes (one per product)
3. Display them at your shop, market stall, or menu
4. Customer scans a QR, sees the price, and pays with a Lightning wallet
5. Customer receives a confirmation word/code to show the merchant

## Features

- **Fully offline merchant** — no phone, tablet, or internet needed at the point of sale
- **LNURL-pay QR codes** — one QR per product with embedded price and description
- **Product images** — optional product photos shown in the customer's wallet
- **Fiat pricing** — set prices in fiat currency; conversion happens at scan time
- **Printable QR sheets** — generate a print-ready page of all product QR codes
- **Payment confirmation** — three verification methods:
  - **Wordlist** — customer receives the next word from a sequential list (e.g., A-Z animals)
  - **TOTP** — time-based one-time password (compatible with Google Authenticator)
  - **None** — disable confirmation codes entirely

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Add products with names, descriptions, prices, and optional images
3. Click **Print QR Codes** to generate a printable sheet
4. Choose a confirmation method (wordlist, TOTP, or none)
5. Display the printed QR codes at your shop

### Confirmation Methods

- **Wordlist** (default): customers receive sequential words. The merchant tracks which word is current.
- **TOTP**: scan the QR with Google Authenticator. After payment, the customer shows the current code.
- **None**: no confirmation required — useful for honor-system setups.

## Resources

- [Video Tutorial](https://youtu.be/_XAvM_LNsoo)

## API Reference

See the [Offline Shop API documentation](./api) for endpoint details.

## Related Pages

- [Offline Shop API Reference](./api): API endpoints for this extension
- [TPoS](/extensions/tpos/): Software point-of-sale terminal
- [LNURLp](/extensions/lnurlp/): Static LNURL-pay links
- [Hardware & Merchants FAQ](/guide/faq/hardware): Merchant setup questions
- [All Extensions](/extensions/): Browse all LNbits extensions
