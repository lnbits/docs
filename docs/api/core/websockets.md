# WebSockets API

> Subscribe to real-time payment updates via WebSocket connections.

Real-time payment notifications for wallets. Use WebSockets to get instant updates when payments are received or sent, without polling.

## Payment Updates

`WS /api/v1/ws/{wallet_id}`

**Auth:** None (the wallet ID acts as the identifier)

Connect to receive real-time payment status changes for a specific wallet.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `wallet_id` | string (path) | Yes | Wallet UUID to subscribe to |

#### Connection URL

```
wss://your-lnbits.com/api/v1/ws/{wallet_id}
```

::: tip
Use `wss://` for HTTPS instances, `ws://` for local development.
:::

#### Message Format

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Event type (e.g. `"payment"`) |
| `payment_hash` | string | Payment identifier |
| `amount` | integer | Amount in satoshis |
| `status` | string | Payment status (`"success"`, `"pending"`) |
| `memo` | string | Payment memo |

```json
{
  "type": "payment",
  "payment_hash": "abc123def456...",
  "amount": 1000,
  "status": "success",
  "memo": "Coffee"
}
```

#### JavaScript Example

```javascript
const ws = new WebSocket(
  `wss://your-lnbits.com/api/v1/ws/${walletId}`
)

ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  if (data.type === 'payment') {
    console.log(`Payment received: ${data.amount} sats`)
  }
}

ws.onclose = () => {
  // Reconnect after 5 seconds
  setTimeout(connect, 5000)
}
```

#### Python Example

```python
import asyncio
import websockets
import json

async def listen(wallet_id):
    uri = f"wss://your-lnbits.com/api/v1/ws/{wallet_id}"
    async with websockets.connect(uri) as ws:
        async for message in ws:
            data = json.loads(message)
            if data["type"] == "payment":
                print(f"Payment: {data['amount']} sats")

asyncio.run(listen("your-wallet-id"))
```

#### Use Cases

- Real-time point-of-sale displays
- Payment confirmation pages
- Live dashboards
- Automated workflows triggered by payments

::: tip
Always implement reconnection logic. WebSocket connections can drop due to network issues, proxy timeouts, or server restarts.
:::

## Related Pages

- [WebSockets Guide](/guide/core/websockets)
- [Payments API](/api/core/payments)
- [Background Tasks](/dev/tasks)
