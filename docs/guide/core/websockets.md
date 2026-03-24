# WebSockets

> Receive real-time payment notifications via WebSocket connections.

LNbits provides WebSocket connections for real-time payment notifications.

## Connecting

```javascript
const ws = new WebSocket(
  'wss://your-lnbits.com/api/v1/ws/{wallet_id}'
)

ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  console.log('Payment update:', data)
}
```

## Events

The WebSocket sends JSON messages for:

- **payment_received** - incoming payment settled
- **payment_sent** - outgoing payment completed

## Authentication

WebSocket connections require the wallet ID in the URL. No additional authentication headers are needed for public payment notifications.

For admin-level events, include the API key as a query parameter:

```
wss://your-lnbits.com/api/v1/ws/{wallet_id}?api-key={admin_key}
```

## Vue.js integration

LNbits provides a built-in `websocketUpdater` function for Vue.js frontends:

```javascript
// In your extension's Vue component
new Vue({
  el: '#vue',
  data() {
    return {
      payments: [],
      walletId: '{{ wallet_id }}'
    }
  },
  created() {
    // Connect to WebSocket and listen for updates
    this.startWebSocket()
  },
  methods: {
    startWebSocket() {
      const scheme = location.protocol === 'https:' ? 'wss' : 'ws'
      const ws = new WebSocket(
        `${scheme}://${location.host}/api/v1/ws/${this.walletId}`
      )

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.type === 'payment') {
          // Update your UI
          this.payments.unshift(data.payment)
          this.$q.notify({
            type: 'positive',
            message: `Payment received: ${data.payment.amount} sats`
          })
        }
      }

      ws.onclose = () => {
        // Reconnect after a delay
        setTimeout(() => this.startWebSocket(), 3000)
      }
    }
  }
})
```

### Using `LNbits.utils.wsReceivedHandler`

LNbits extensions typically use the built-in WebSocket handler:

```javascript
// Simpler approach using LNbits utilities
LNbits.utils.wsReceivedHandler(this.walletId, (data) => {
  // Called when a payment is received
  console.log('Payment received:', data)
  this.fetchData()  // Refresh your data
})
```

## Connection URL pattern

```
ws[s]://<host>/api/v1/ws/<wallet_id>
```

- Use `wss://` for HTTPS deployments (production)
- Use `ws://` for local development
- The `wallet_id` determines which wallet's events you receive

## Use cases

- Real-time payment confirmations in web apps
- Point-of-sale payment detection
- Automated workflows triggered by payments
- Live dashboards showing incoming/outgoing payments
- Extension UIs that react to payment events

## Related Pages

- [Payments](/guide/core/payments)
- [WebSockets API Reference](/api/core/websockets)
- [Background Tasks](/dev/tasks)
- [Building Extensions](/dev/building-extensions) - frontend template with Vue.js
