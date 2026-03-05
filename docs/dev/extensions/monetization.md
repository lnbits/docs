# Extension Monetization

> Charge for extensions using pay-to-install or pay-to-enable models — configured via the manifest file with Lightning payments.

LNbits supports paid extensions. Developers can require a Lightning payment before an extension is installed or enabled.

## Two payment models

### Pay-to-install

The user must pay before the extension is downloaded:

1. User clicks **Install**
2. LNbits presents a Lightning invoice
3. User pays the invoice
4. Extension is downloaded and installed
5. Payment hash is stored — no re-payment on reinstall

### Pay-to-enable

The extension is downloaded for free, but requires payment to activate:

1. Extension is installed normally (free)
2. User clicks **Enable**
3. LNbits presents a Lightning invoice
4. User pays the invoice
5. Extension is activated for that user

## Manifest configuration

### Pay-to-install

Add `payment_hash` and payment fields to your manifest entry:

```json
{
  "extensions": [
    {
      "id": "premium_ext",
      "name": "Premium Extension",
      "version": "1.0.0",
      "archive": "https://example.com/premium_ext-1.0.0.zip",
      "hash": "abc123...",
      "pay_to_install": {
        "amount": 1000,
        "description": "One-time payment for Premium Extension",
        "wallet": "https://lnbits-instance.com",
        "wallet_id": "your-wallet-id"
      }
    }
  ]
}
```

### Pay-to-enable

```json
{
  "extensions": [
    {
      "id": "premium_ext",
      "name": "Premium Extension",
      "version": "1.0.0",
      "archive": "https://example.com/premium_ext-1.0.0.zip",
      "hash": "abc123...",
      "pay_to_enable": {
        "amount": 500,
        "description": "Enable Premium Extension",
        "wallet": "https://lnbits-instance.com",
        "wallet_id": "your-wallet-id"
      }
    }
  ]
}
```

## Payment flow

```
User → Install/Enable → Invoice generated → User pays → Payment verified → Action completed
```

### API flow

```bash
# 1. Request installation (returns invoice)
POST /api/v1/extension
{
  "ext_id": "premium_ext",
  "source_repo": "https://example.com/manifest.json"
}
# Response includes payment_request (BOLT11 invoice)

# 2. Pay the invoice via any Lightning wallet

# 3. Check installation status
GET /api/v1/extension/premium_ext
# Response shows installed: true after payment confirms
```

## Payment tracking

LNbits tracks payments per extension:

- **Install payments** are stored with the extension metadata
- **Enable payments** are stored per-user
- Payments survive extension updates (you don't pay again for new versions)
- If an extension is uninstalled and reinstalled, the original payment is recognized

::: info
Payment verification happens between the LNbits instance and the developer's payment endpoint. The instance operator doesn't need to handle payments — it's between the user and the extension developer.
:::

## Pricing strategies

| Strategy | Configuration | Use case |
| --- | --- | --- |
| One-time install fee | `pay_to_install` | Professional tools |
| Per-user activation fee | `pay_to_enable` | Multi-user instances |
| Free with premium features | Free install, paid enable for premium tier | Freemium model |

## Related Pages

- [Deploying Extensions](/dev/extensions/) — all deployment methods
- [Remote Manifest](/dev/extensions/manifest) — manifest format and fields
- [Official Registry](/dev/extensions/registry) — publishing to the community
- [Reference](/dev/extensions/reference) — API endpoints for extension management
