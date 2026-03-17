<ExtensionHeader
  name="LndHub"
  description="LndHub-compatible interface for BlueWallet and Zeus."
  category="Wallet Tools"
  icon="🔐"
  repo="lnbits/lndhub"
/>

<small>For more about LNBits extension check [this tutorial](https://github.com/lnbits/lnbits/wiki/LNbits-Extensions)</small>

<h2>*connect to your lnbits wallet from nodemanagers*</h2>

Lndhub has nothing to do with lnd, it is just the name of the HTTP/JSON protocol you can use to talk to your Lightning server.
You add and enable the LNDhub extension on your left panel through the "Extensions" menue and scan the QR code that fits your needs.

With the "Invoice QR" you can give access to generating invoices and (only) receive sats into your wallet (e.g. useful for your waiters if you own a cafe).
With the "Admin QR" you also grant access sending / withdrawing from that wallet.

You can use this to import your LNbits wallets to any nodemanagers like e.g. Alby, BitBanana (ex. Zap), BlueWallet and Zeus.

## API Reference

See the [LndHub API documentation](./api) for endpoint details.

## Related Pages

- [LndHub API Reference](./api): API endpoints for this extension
- [All Extensions](/extensions/): Browse all LNbits extensions
