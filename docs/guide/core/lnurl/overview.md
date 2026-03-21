# LNURL

> LNURL-pay, LNURL-withdraw, and LNURL-auth support in LNbits.

LNbits has built-in support for [LNURL](https://github.com/lnurl/luds), a protocol for seamless Lightning interactions via HTTP.

## Supported LUDs

| LUD | Name | Description |
| --- | --- | --- |
| LUD-01 | Base encoding | LNURL bech32 encoding |
| LUD-03 | withdrawRequest | LNURL-withdraw (vouchers, faucets) |
| LUD-06 | payRequest | LNURL-pay (static QR codes) |
| LUD-09 | successAction | Post-payment actions (URLs, messages) |
| LUD-12 | Comments | Payment comments |
| LUD-16 | Lightning Address | user@domain.com payments |
| LUD-17 | Auth | LNURL-auth (passwordless login) |

## LNURL-pay

Create static payment links that can be reused. The payer scans the QR code and their wallet fetches invoice details from your LNbits instance.

## LNURL-withdraw

Create withdrawal links (vouchers). The recipient scans the QR and their wallet pulls sats from your LNbits wallet.

## LNURL-auth

Passwordless authentication using Lightning wallets. LNbits supports LNURL-auth for user login.

## Extensions

Several LNbits extensions build on LNURL:

- **LNURLp** - create LNURL-pay links with branded pages
- **Withdraw** - create LNURL-withdraw vouchers
- **SatsPay** - payment pages with LNURL support

## API

```bash
# LNURL-pay endpoint
curl https://your-lnbits.com/api/v1/lnurlp/{payment_id}

# LNURL scan/decode
curl https://your-lnbits.com/api/v1/lnurlscan/{lnurl}
```

## Related Pages

- [Core Features](/guide/core/index.md)
- [Payments](/guide/core/payments.md)
- [LNURLp Extension](/extensions/lnurlp/index.md)
