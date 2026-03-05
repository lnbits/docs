# Fiat Provider Integration

> How extensions consume the server-level Stripe/PayPal provider — check availability, create payments, handle webhooks, and manage subscriptions.

LNbits extensions can offer fiat (card/PayPal) payments alongside Lightning by using the core fiat provider service. The admin configures the provider; your extension just consumes it.

## Golden rules

::: danger Extension rules for fiat providers
**DO:**
- Check if Stripe is enabled before showing the card payment option
- Use `get_fiat_provider()` to get the provider instance
- Handle cases where Stripe becomes unavailable gracefully
- Use webhooks for payment confirmation
- Store checkout/subscription IDs for status tracking

**DO NOT:**
- Store Stripe API keys in your extension
- Configure Stripe settings from your extension
- Show raw Stripe errors to end users
- Assume Stripe is always available
- Implement your own Stripe API calls — use `lnbits/fiat/`
- Add `stripe` as a dependency — it's handled by core
:::

## Step 1: Check availability

```python
from lnbits.settings import settings

def is_stripe_available() -> bool:
    """Check if Stripe is enabled globally by the SuperUser."""
    return settings.is_fiat_provider_enabled("stripe")
```

Expose this to the frontend so you can conditionally show payment options:

```python
@myext_api_router.get("/api/v1/payment-methods")
async def api_get_payment_methods():
    methods = ["lightning"]  # Always available
    if settings.is_fiat_provider_enabled("stripe"):
        methods.append("card")
    return {"methods": methods}
```

Frontend (Vue.js):

```javascript
async getPaymentMethods() {
  const {data} = await LNbits.api.request(
    'GET', '/myext/api/v1/payment-methods'
  )
  this.paymentMethods = data.methods
  // Only show card button if 'card' is in methods
}
```

## Step 2: Get the provider

```python
from lnbits.fiat import get_fiat_provider

async def get_stripe():
    """Get a working Stripe provider instance, or None."""
    provider = await get_fiat_provider("stripe")
    if not provider:
        return None

    status = await provider.status()
    if status.error_message:
        return None

    return provider
```

## Step 3: Check limits

```python
from lnbits.settings import settings

def check_stripe_limits(user_id: str, amount_sats: int):
    """Check if user is allowed and amount is within limits."""
    limits = settings.get_fiat_provider_limits("stripe")
    if not limits:
        return True

    # Check user allowlist (empty = all allowed)
    if limits.allowed_users and user_id not in limits.allowed_users:
        raise HTTPException(
            HTTPStatus.FORBIDDEN, "Not authorized for card payments."
        )

    # Check amount limits
    if limits.service_min_amount_sats and amount_sats < limits.service_min_amount_sats:
        raise HTTPException(
            HTTPStatus.BAD_REQUEST,
            f"Minimum amount: {limits.service_min_amount_sats} sats"
        )
    if limits.service_max_amount_sats and amount_sats > limits.service_max_amount_sats:
        raise HTTPException(
            HTTPStatus.BAD_REQUEST,
            f"Maximum amount: {limits.service_max_amount_sats} sats"
        )
```

## Step 4: Create a checkout session

The most common pattern — redirect user to Stripe's hosted payment page:

```python
from lnbits.fiat import get_fiat_provider, StripeWallet

async def create_stripe_checkout(
    amount_sats: int,
    payment_hash: str,
    success_url: str,
    description: str,
):
    provider = await get_fiat_provider("stripe")
    if not provider or not isinstance(provider, StripeWallet):
        raise HTTPException(
            HTTPStatus.SERVICE_UNAVAILABLE, "Stripe not available"
        )

    response = await provider.create_invoice(
        amount=amount_sats,
        payment_hash=payment_hash,
        currency="sats",  # or "usd", "eur", etc.
        memo=description,
        extra={
            "fiat_method": "checkout",
            "success_url": success_url,
            "metadata": {
                "extension": "myextension",
                "item_id": "...",
            }
        },
    )

    if response.ok:
        return response.checking_id  # This is the checkout session URL
    else:
        raise HTTPException(HTTPStatus.BAD_REQUEST, response.error_message)
```

## Step 5: Check payment status

```python
async def check_stripe_payment(checking_id: str) -> str:
    """Returns 'paid', 'pending', or 'failed'."""
    provider = await get_fiat_provider("stripe")
    if not provider:
        return "failed"

    status = await provider.get_invoice_status(checking_id)

    if status.success:
        return "paid"
    elif status.failed:
        return "failed"
    else:
        return "pending"
```

## Step 6: Subscriptions

For recurring payments:

```python
async def create_stripe_subscription(
    price_id: str,  # Stripe price ID (created in Stripe dashboard)
    success_url: str,
    cancel_url: str,
):
    provider = await get_fiat_provider("stripe")
    if not provider:
        raise HTTPException(
            HTTPStatus.SERVICE_UNAVAILABLE, "Stripe not available"
        )

    response = await provider.create_subscription(
        options={
            "success_url": success_url,
            "cancel_url": cancel_url,
            "line_items": [
                {"price": price_id, "quantity": 1}
            ],
        }
    )
    return response


async def cancel_stripe_subscription(
    subscription_id: str,
    correlation_id: str,
) -> bool:
    provider = await get_fiat_provider("stripe")
    if not provider:
        return False
    return await provider.cancel_subscription(
        subscription_id, correlation_id
    )
```

## Step 7: Webhook handling

Register a webhook endpoint to receive Stripe events:

```python
from fastapi import Request

@myext_api_router.post("/api/v1/webhook/stripe")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    # The webhook signing secret is managed by core
    webhook_secret = settings.fiat_providers.stripe_webhook_signing_secret

    # Verify and parse the event
    event = verify_and_parse_stripe_event(
        payload, sig_header, webhook_secret
    )

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        await handle_successful_payment(session)
    elif event["type"] == "customer.subscription.deleted":
        subscription = event["data"]["object"]
        await handle_subscription_cancelled(subscription)

    return {"status": "ok"}
```

## Complete extension example

Putting it all together in `views_api.py` — a dual Lightning + Card payment endpoint:

```python
@myext_api_router.post("/api/v1/items/{item_id}/pay")
async def api_pay_for_item(
    item_id: str,
    method: str = "lightning",  # "lightning" or "card"
    key_info: WalletTypeInfo = Depends(require_invoice_key),
):
    item = await get_item(item_id)
    if not item:
        raise HTTPException(HTTPStatus.NOT_FOUND, "Item not found.")

    if method == "lightning":
        payment = await create_invoice(
            wallet_id=key_info.wallet.id,
            amount=item.amount,
            memo=f"Payment for {item.name}",
            extra={"tag": "myextension", "item_id": item.id},
        )
        return {"method": "lightning", "payment_request": payment.bolt11}

    elif method == "card":
        if not settings.is_fiat_provider_enabled("stripe"):
            raise HTTPException(
                HTTPStatus.BAD_REQUEST, "Card payments not available"
            )

        checkout_url = await create_stripe_checkout(
            amount_sats=item.amount,
            payment_hash=urlsafe_short_hash(),
            success_url=f"{settings.lnbits_baseurl}/myext?paid=true",
            description=f"Payment for {item.name}",
        )
        return {"method": "card", "checkout_url": checkout_url}

    raise HTTPException(
        HTTPStatus.BAD_REQUEST, f"Unknown payment method: {method}"
    )
```

## Provider interface reference

All fiat providers implement these methods:

| Method | Returns | Purpose |
| --- | --- | --- |
| `create_invoice(amount, payment_hash, currency, memo, extra)` | `FiatInvoiceResponse` | Create a payment |
| `get_invoice_status(checking_id)` | `FiatPaymentStatus` | Check payment status |
| `create_subscription(options)` | `FiatSubscriptionResponse` | Create recurring payment |
| `cancel_subscription(sub_id, correlation_id)` | `bool` | Cancel subscription |
| `status()` | `FiatStatusResponse` | Check if provider is configured |
| `cleanup()` | `None` | Clean up resources |

### Status types

- `FiatPaymentSuccessStatus` — payment completed
- `FiatPaymentPendingStatus` — payment in progress
- `FiatPaymentFailedStatus` — payment failed

### Checking ID prefixes (Stripe)

| Prefix | Type |
| --- | --- |
| `cs_` | Checkout session |
| `pi_` | Payment intent |
| `in_` | Invoice |
| `sub_` | Subscription |

## Related Pages

- [Fiat Payments Guide](/guide/core/fiat-payments) — admin setup and user-facing docs
- [Building Extensions](/dev/building-extensions) — extension development guide
- [Deploying Extensions](/dev/extensions/) — distribution and installation
- [Decorators & Auth](/dev/decorators) — authentication for API endpoints
