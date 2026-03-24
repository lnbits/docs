# Labels

> Tag and categorize Lightning payments for bookkeeping and reporting.

Labels let you tag and categorize payments for bookkeeping and filtering.

## Creating labels

In the LNbits UI, you can create labels from the wallet dashboard. Each label has a name and optional color.

## Applying labels

Labels can be applied to:

- Individual payments
- Invoices at creation time (via the API)

## Filtering by label

Use labels to filter your transaction history in the UI or via the API. This is useful for:

- Separating business and personal transactions
- Tracking payments by project or client
- Generating reports for accounting

## API

Labels are managed through the core API:

```bash
# List labels
curl -H "X-Api-Key: ADMIN_KEY" \
  https://your-lnbits.com/api/v1/labels

# Create a label
curl -X POST -H "X-Api-Key: ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "Project A", "color": "#673ab7"}' \
  https://your-lnbits.com/api/v1/labels
```

## Related Pages

- [Payments](/guide/core/payments)
- [Core Features](/guide/core/)
