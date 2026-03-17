<ExtensionHeader
  name="TunnelMeOut"
  description="One-click reverse tunnel for public access."
  category="Utilities & Tools"
  icon="🔗"
  repo="lnbits/tunnel_me_out"
/>

A minimal LNbits extension that requests a reverse proxy from lnpro.xyz so a local LNbits can be reached publicly.

- Enter days, click **Top up tunnel**.
- Pay the returned invoice; the extension listens for payment and auto-activates.
- It saves the SSH key, runs the reverse tunnel, and shows the public URL.
- Reuse **Top up tunnel** to extend the same proxy; stale entries older than a week are pruned.

Configuration is hardcoded to the lnpro.xyz service.

## API Reference

See the [TunnelMeOut API documentation](./api) for endpoint details.

## Related Pages

- [TunnelMeOut API Reference](./api): API endpoints for this extension
- [All Extensions](/extensions/): Browse all LNbits extensions
