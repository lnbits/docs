<ExtensionHeader
  extension-type="wasm"
  name="PaidTasks"
  description="Paid task lists with public payment pages."
  category="Management"
  icon="✅"
  repo="lnbits/paidtasks"
/>

::: warning Legacy WASM host
This page describes the original `wasm` host extension and its KV/permission interfaces. It is a WASM extension, but this package is **not compatible with the core WASM runtime** documented for LNbits 1.6.2. Use it only with its matching host version. For new development, start with [Core WASM Extensions](/dev/extensions/wasm/).
:::

## Key Files

- `config.json`: permissions, public handlers, public KV keys, and payment tags
- `wasm/`: `module.wat` or `module.wasm`
- `static/` and `templates/`: UI and public pages

## Permissions (Current)

- `ext.db.read_write`
- `api.POST:/api/v1/payments` (policy: create-only, `payments_out: false`)
- `ext.payments.watch`

## Payment Tags

This extension uses the tag `paidtasks`. Users must grant it in the permissions dialog.

## Agent Guidance

Use `lnbits/extensions/wasm/docs/agents_wasm_extensions.md` for AI/agent instructions.

### AI Prompt (Copy-Paste)

```
You are building a LNbits WASM extension. First read:
extensions/wasm/docs/agents_wasm_extensions.md

Rules:
- Only edit files under lnbits/extensions/<ext_id>/.
- Use extensions/paidtasks as a base template.
- Any internal endpoint access must be declared in config.json permissions.
- For POST /api/v1/payments you must set "out" explicitly and declare policy.payments_out.
- Use <lnbits server>/openapi.json as the API reference.

Goal: <describe extension behavior>.
```

## Test Checklist

1. Enable extension and grant permissions + `paidtasks` tag.
2. Create a list and tasks.
3. Open the public page and create an invoice.
4. Pay the invoice and verify:
   - Task is marked paid.
   - Public page updates via websocket.

## API Reference

See the [PaidTasks API documentation](./api) for endpoint details.

## Related Pages

- [PaidTasks API Reference](./api): API endpoints for this extension
- [All Extensions](https://extensions.lnbits.com): Browse all LNbits extensions
