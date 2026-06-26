<ExtensionHeader
  name="LNURLp"
  description="Create static LNURL-pay links, QR codes, and Lightning addresses."
  category="Payments & Commerce"
  icon="🔗"
  repo="lnbits/lnurlp"
/>

## Features

- **Reusable pay links** - one QR code or link can receive many payments
- **Lightning Address** - receive payments at names like `alice@example.com`
- **Fixed or flexible amounts** - set one amount or a min/max range
- **Fiat pricing** - price in a fiat currency and convert to sats at payment time
- **Comments and success messages** - collect a short note and reply after payment
- **Webhooks** - notify another system when a link is paid
- **Nostr zaps** - receive NIP-57 zaps through a pay link

## Overview

LNURLp creates reusable Lightning payment links. The QR code stays the same, but every time someone scans it with an LNURL-compatible wallet, LNbits creates a fresh invoice for that payment.

Use LNURLp for donation pages, tip jars, checkout links, printed QR codes, Lightning Addresses, or simple payment pages that do not need a full shop.

[Wallets supporting LNURL](https://github.com/fiatjaf/awesome-lnurl#wallets)

## Usage

1. **Create** a new pay link.

   ![Create LNURLp](https://i.imgur.com/rhUBJFy.jpg)

2. Fill in the basics:

   - Wallet to receive payments
   - Description shown to the payer
   - Amount, or min/max amount if it is not fixed
   - Currency, if you want fiat pricing instead of sats

3. Open the link details.

   ![LNURLp list](https://i.imgur.com/C8s1P0Q.jpg)

4. Share the page, copy the LNURL, write it to NFC, or print the QR code.

   ![View LNURLp](https://i.imgur.com/4n41S7T.jpg)

## Lightning Address

Add a username to a pay link to create a Lightning Address.

For example, username `alice` on `example.com` becomes:

```text
alice@example.com
```

You can also set a custom domain on the pay link. Use this when your public Lightning Address domain is different from the LNbits host.

## Fiat Amounts

Set a currency such as EUR or USD when you want the payer to pay a fiat-denominated price. LNbits converts the amount to sats when the wallet requests the invoice.

Use fixed amounts for products or donations with a set price. Use min/max amounts for tips, pay-what-you-want pages, and open donations.

## Comments and Success Actions

LNURLp can ask the payer for a short comment. This is useful for names, order notes, blog comments, or donation messages.

After payment, the payer's wallet can show:

- A success message
- A secure `https://` success URL

Use success actions for thank-you notes, download links, gated pages, or next steps after payment.

## Webhooks

Add a webhook URL when another app should be notified after a payment. LNURLp sends payment details to the webhook and can include:

- The payment hash and invoice
- The paid amount
- The payer comment
- Custom webhook data
- Optional custom headers and body data
- Zap receipt data when Nostr zaps are enabled

## Nostr Zaps

Enable zaps when the pay link should support [NIP-57](https://nips.nostr.com/57) Nostr zap payments. Admins can set the extension's Nostr private key in the LNURLp settings dialog.

When a zap payment is paid, LNURLp signs a zap receipt and sends it to the relays from the zap request.

## Disposable Pay Requests

LNURLp supports disposable and storeable pay requests. The default is disposable, which is the safest option for normal reusable QR codes and payment pages.

When enabled, wallets can save the LNURLp or lnaddress, for reuse later. [LUD-11](https://github.com/lnurl/luds/blob/luds/11.md)

Only change this if you know your wallet or integration needs storeable pay requests.

## API Reference

See the [LNURLp API documentation](./api) for endpoint details.

## Related Pages

- [LNURLp API Reference](./api): API endpoints for this extension
- [All Extensions](https://extensions.lnbits.com): Browse all LNbits extensions
