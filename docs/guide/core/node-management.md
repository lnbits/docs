# Node Management

> Monitor and manage your Lightning node directly from the LNbits admin interface.

If your funding source supports it, LNbits provides a node management interface.

## Enabling node UI

```bash
LNBITS_NODE_UI=true
```

The node management page appears in the admin navigation.

## Supported backends

Node management features are available with:

- **LND** (gRPC and REST) - full support
- **Core Lightning** - full support
- Other backends - limited or no node management

## Available information

### Node info

```bash
curl https://your-lnbits.com/node/api/v1/info \
  -H "X-Api-Key: ADMIN_KEY"
```

Returns:
- Node alias and public key
- Network (mainnet/testnet)
- Block height
- Number of channels and peers
- Total capacity

### Channels

```bash
curl https://your-lnbits.com/node/api/v1/channels \
  -H "X-Api-Key: ADMIN_KEY"
```

### Peers

```bash
curl https://your-lnbits.com/node/api/v1/peers \
  -H "X-Api-Key: ADMIN_KEY"
```

### Public node info

A public endpoint (no auth required) for sharing your node's basic info:

```bash
curl https://your-lnbits.com/node/public/api/v1/info
```

## Best practices

- Monitor channel balances regularly
- Keep sufficient inbound and outbound liquidity
- Use the audit endpoint to track the delta between LNbits internal balances and actual node balance

## Related Pages

- [Admin Dashboard](/guide/admin-dashboard)
- [Funding Sources](/guide/wallets/)
- [Security](/guide/core/security)
