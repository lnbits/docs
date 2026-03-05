<ExtensionHeader
  name="Paywall"
  description="Gate content or URLs behind Lightning payments."
  category="Payments & Commerce"
  icon="🚧"
  repo="lnbits/paywall"
/>

## Overview

Paywall lets you restrict access to content, URLs, or files behind a Lightning payment. Users pay a minimum amount (or more) and get redirected to the hidden content. Supports remembering paying users so they don't have to pay again for the same content.

## Features

- **URL paywall** — hide any link behind a Lightning payment
- **File paywall** — protect downloadable files behind payment
- **Minimum amount** — set a floor price, users can overpay
- **Remember payments** — returning users bypass the paywall
- **Custom branding** — add a title and description to the paywall page

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Click **New Paywall**:
   - Select the wallet to receive payments
   - Set the URL or file to protect
   - Give it a title and optional description
   - Set the minimum payment amount
   - Optionally enable "Remember payments"
3. Share the paywall link

## Use Cases

- **Premium content** — charge for blog posts, articles, or tutorials
- **Digital downloads** — sell files, music, or software
- **API access** — gate access to premium API endpoints
- **Exclusive content** — offer paid-only areas of your website

## API Reference

See the [Paywall API documentation](./api) for endpoint details.

## Related Pages

- [Paywall API Reference](./api): API endpoints for this extension
- [LNURLp](/extensions/lnurlp/): Static payment links
- [All Extensions](/extensions/): Browse all LNbits extensions
