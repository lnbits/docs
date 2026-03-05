<ExtensionHeader
  name="Decoder"
  description="Decode BOLT11 invoices and LNURL codes."
  category="Utilities & Tools"
  icon="🔍"
  repo="lnbits/decoder"
/>

## Overview

Decoder is a utility extension that lets you inspect and decode Lightning Network payment data directly in your LNbits UI. Paste a BOLT11 invoice, LNURL, or Lightning Address and see the decoded fields — amount, description, expiry, routing hints, and more.

## Features

- **BOLT11 decoding** — inspect invoice fields (amount, description, expiry, payee, routing hints)
- **LNURL decoding** — resolve and display LNURL metadata
- **Lightning Address** — resolve addresses to their LNURL-pay endpoints
- **No configuration needed** — just paste and decode

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Open Decoder from the sidebar
3. Paste a BOLT11 invoice, LNURL, or Lightning Address to decode it

## Use Cases

- **Debugging** — inspect invoice details before paying
- **Verification** — confirm amounts and descriptions in invoices
- **Development** — decode test invoices while building extensions
- **Education** — explore how Lightning invoices and LNURLs are structured

## API Reference

See the [Decoder API documentation](./api) for endpoint details.

## Related Pages

- [Decoder API Reference](./api): API endpoints for this extension
- [LNURL](/guide/core/lnurl/overview): LNURL protocol overview
- [Payments](/guide/core/payments): Core payment concepts
- [All Extensions](/extensions/): Browse all LNbits extensions
