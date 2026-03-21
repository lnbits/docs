# Wallet Backend Comparison

> Feature comparison across all LNbits wallet backends - 21 funding sources including LND, CLN, Eclair, Phoenix, NWC, services, and testing backends.

Not all backends support all features. Use these tables to pick the right one.

## Feature matrix

| Feature | LND | CLN | Eclair | Phoenix | NWC | Services |
| --- | --- | --- | --- | --- | --- | --- |
| Create invoice | Yes | Yes | Yes | Yes | Yes | Yes |
| Pay invoice | Yes | Yes | Yes | Yes | Yes | Yes |
| Hold invoices | Yes | Some | No | No | No | No |
| Node management | Yes | Yes | No | No | No | No |
| Channel management | Yes | Yes | No | No | No | No |
| Keysend | Yes | Yes | No | Yes | Varies | Varies |

## All funding sources

| Backend | Custody | KYC | Node Required | Privacy | Liquidity | Setup | Maintenance | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **LND (gRPC)** | Self | No | Yes | High | Manual | Medium | High | Infrastructure |
| **LND (REST)** | Self | No | Yes | High | Manual | Medium | High | Infrastructure |
| **Core Lightning (CLNRest)** | Self | No | Yes | High | Manual | Medium | High | Infrastructure |
| **Core Lightning (RPC)** | Self | No | Yes | High | Manual | Medium | High | Infrastructure |
| **Eclair** | Self | No | Yes | High | Manual | Medium | High | Infrastructure |
| **Phoenixd** | Self | No | No | Medium | Automatic | Medium | Low | Minimal fees |
| **Spark (CLN)** | Self | No | Yes | High | Manual | Medium | High | Infrastructure |
| **Spark (L2)** | Self | No | No | Medium | Automatic | Easy | Low | Minimal fees |
| **Nostr Wallet Connect** | Varies | Varies | No | Variable | Provider | Easy | Low | May incur fees |
| **Breez SDK** | Self | No | No | High | Automatic | Medium | Low | Minimal fees |
| **Boltz** | Self | No | No | Medium | Provider | Medium | Medium | Minimal fees |
| **LNbits (instance)** | Custodial | Varies | No | Variable | Provider | Easy | Low | Hosting fees |
| **OpenNode** | Custodial | Yes | No | Low | Provider | Easy | Low | Transaction fees |
| **Alby** | Custodial | Yes | No | Low | Provider | Easy | Low | Transaction fees |
| **Blink** | Custodial | Yes | No | Low | Provider | Easy | Low | Transaction fees |
| **ZBD** | Custodial | Yes | No | Low | Provider | Easy | Low | Transaction fees |
| **Strike** | Custodial | Yes | No | Low | Provider | Easy | Low | Transaction fees |
| **LNPay** | Custodial | Yes | No | Low | Provider | Easy | Low | Transaction fees |
| **Cliche** | Self | No | No | Medium | Manual | Medium | Medium | Minimal fees |
| **FakeWallet** | Testing | No | No | N/A | N/A | Trivial | None | Free |
| **VoidWallet** | Testing | No | No | N/A | N/A | Trivial | None | Free |

## By category

### Local nodes

| Backend | Protocol | Best for |
| --- | --- | --- |
| [LND REST](/guide/wallets/lnd-rest) | REST / gRPC | Most popular, full-featured |
| [CLNRest](/guide/wallets/clnrest) | REST / RPC | Core Lightning users |
| Eclair | REST | Eclair node operators |
| Spark | REST | CLN with Spark plugin |

### Self-custody (no node)

| Backend | Type | Best for |
| --- | --- | --- |
| Phoenix (phoenixd) | REST | Simple setup, automatic channels |
| Breez SDK | Embedded | Mobile / embedded apps |
| Boltz | Swap service | On-chain to Lightning |
| NWC | Nostr protocol | Remote wallet control |

### Lightning services

| Backend | Type | Best for |
| --- | --- | --- |
| OpenNode | Custodial API | Quick setup, no node needed |
| Alby | NWC / API | Nostr-native workflows |
| Strike | API | Fiat on/off ramp |
| Blink | GraphQL | Bitcoin Beach communities |
| ZBD | API | Gaming integrations |
| LNPay | API | Simple Lightning payments |
| LNbits (instance) | API | Chain LNbits instances |

### Testing

| Backend | Description |
| --- | --- |
| [FakeWallet](/guide/wallets/fakewallet) | Simulated node for development - invoices auto-pay |
| VoidWallet | No-op backend for UI exploration - no payments processed |

## Choosing a backend

- **Self-hosted production**: LND or CLN - full control, best privacy, requires node management
- **Easy self-custody**: Phoenix (phoenixd) - automatic channel management, minimal setup
- **Quick start / no node**: OpenNode, Alby, or Blink - custodial but instant setup
- **Development**: FakeWallet - instant, free, no external dependencies
- **Nostr integration**: NWC or Alby - native Nostr wallet support

## Related Pages

- [Funding Sources](/guide/wallets/) - configuration reference for all backends
- [Core Lightning (CLNRest)](/guide/wallets/clnrest) - detailed CLN setup
- [LND (REST)](/guide/wallets/lnd-rest) - detailed LND setup
- [FakeWallet](/guide/wallets/fakewallet) - testing backend
