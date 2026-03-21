# Fiat Provider Integration

> How extensions consume server-level fiat providers (Stripe and PayPal) - check availability, create payments, handle webhooks, and manage subscriptions.

LNbits extensions can offer fiat payments alongside Lightning by using the core fiat provider service. The admin configures the provider; your extension just consumes it. The same pattern works for both Stripe and PayPal.

## Golden rules

::: danger Extension rules for fiat providers
**DO:**
- Check if a provider is enabled before showing its payment option
- Use `get_fiat_provider()` to get the provider instance
- Handle cases where a provider becomes unavailable gracefully
- Use webhooks for payment confirmation
- Store checkout/subscription IDs for status tracking
- Support multiple providers - let the user choose

**DO NOT:**
- Store API keys (Stripe or PayPal) in your extension
- Configure provider settings from your extension
- Show raw provider errors to end users
- Assume any provider is always available
- Implement your own API calls to Stripe/PayPal - use `lnbits/fiat/`
- Add `stripe` or `paypal` as a dependency - they're handled by core
:::

## Step 1: Check availability

Check which providers are enabled and build the payment method list dynamically:

```python
from lnbits.settings import settings

@myext_api_router.get("/api/v1/payment-methods")
async def api_get_payment_methods():
    methods = ["lightning"]  # Always available
    if settings.is_fiat_provider_enabled("stripe"):
        methods.append("card")
    if settings.is_fiat_provider_enabled("paypal"):
        methods.append("paypal")
    return {"methods": methods}
```

Frontend (Vue.js):

```javascript
async getPaymentMethods() {
  const {data} = await LNbits.api.request(
    'GET', '/myext/api/v1/payment-methods'
  )
  this.paymentMethods = data.methods
  // Show buttons only for available methods
}
```

## Step 2: Get a provider

The same function works for both providers. Pass the provider name as a string:

```python
from lnbits.fiat import get_fiat_provider

async def get_provider(name: str):
    """Get a working fiat provider instance, or None."""
    provider = await get_fiat_provider(name)  # "stripe" or "paypal"
    if not provider:
        return None

    status = await provider.status()
    if status.error_message:
        return None

    return provider
```

## Step 3: Check limits

Both providers use the same limits framework:

```python
from lnbits.settings import settings

def check_fiat_limits(provider_name: str, user_id: str, amount_sats: int):
    """Check if user is allowed and amount is within limits."""
    limits = settings.get_fiat_provider_limits(provider_name)
    if not limits:
        return True

    # Check user allowlist (empty = all allowed)
    if limits.allowed_users and user_id not in limits.allowed_users:
        raise HTTPException(
            HTTPStatus.FORBIDDEN, "Not authorized for this payment method."
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

## Step 4: Create a payment

### Stripe checkout session

Redirects the user to Stripe's hosted payment page. Card details never touch your server.

```python
from lnbits.fiat import get_fiat_provider

async def create_stripe_checkout(
    amount_sats: int,
    payment_hash: str,
    success_url: str,
    description: str,
):
    provider = await get_fiat_provider("stripe")
    if not provider:
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
        return response.checking_id  # Checkout session URL
    else:
        raise HTTPException(HTTPStatus.BAD_REQUEST, response.error_message)
```

### PayPal checkout

Redirects the user to PayPal's payment page. Same provider interface, different provider name.

```python
async def create_paypal_checkout(
    amount_sats: int,
    payment_hash: str,
    success_url: str,
    description: str,
):
    provider = await get_fiat_provider("paypal")
    if not provider:
        raise HTTPException(
            HTTPStatus.SERVICE_UNAVAILABLE, "PayPal not available"
        )

    response = await provider.create_invoice(
        amount=amount_sats,
        payment_hash=payment_hash,
        currency="sats",
        memo=description,
        extra={
            "success_url": success_url,
            "metadata": {
                "extension": "myextension",
                "item_id": "...",
            }
        },
    )

    if response.ok:
        return response.checking_id  # PayPal approval URL
    else:
        raise HTTPException(HTTPStatus.BAD_REQUEST, response.error_message)
```

## Step 5: Check payment status

Works the same for both providers:

```python
async def check_fiat_payment(provider_name: str, checking_id: str) -> str:
    """Returns 'paid', 'pending', or 'failed'."""
    provider = await get_fiat_provider(provider_name)
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

### Stripe subscriptions

Requires creating Price objects in the Stripe dashboard first:

```python
async def create_stripe_subscription(
    price_id: str,
    success_url: str,
    cancel_url: str,
):
    provider = await get_fiat_provider("stripe")
    if not provider:
        raise HTTPException(
            HTTPStatus.SERVICE_UNAVAILABLE, "Stripe not available"
        )

    return await provider.create_subscription(
        options={
            "success_url": success_url,
            "cancel_url": cancel_url,
            "line_items": [
                {"price": price_id, "quantity": 1}
            ],
        }
    )
```

### PayPal subscriptions

Requires creating a billing plan in the PayPal dashboard first:

```python
async def create_paypal_subscription(
    plan_id: str,
    success_url: str,
    cancel_url: str,
):
    provider = await get_fiat_provider("paypal")
    if not provider:
        raise HTTPException(
            HTTPStatus.SERVICE_UNAVAILABLE, "PayPal not available"
        )

    return await provider.create_subscription(
        options={
            "success_url": success_url,
            "cancel_url": cancel_url,
            "plan_id": plan_id,
        }
    )
```

### Cancelling a subscription

Same interface for both:

```python
async def cancel_subscription(
    provider_name: str,
    subscription_id: str,
    correlation_id: str,
) -> bool:
    provider = await get_fiat_provider(provider_name)
    if not provider:
        return False
    return await provider.cancel_subscription(
        subscription_id, correlation_id
    )
```

## Step 7: Webhook handling

Each provider sends webhooks to a different endpoint. Register handlers for both.

### Stripe webhooks

Stripe sends events to `/api/v1/webhook/stripe`:

```python
from fastapi import Request

@myext_api_router.post("/api/v1/webhook/stripe")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    webhook_secret = settings.fiat_providers.stripe_webhook_signing_secret

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

### PayPal webhooks

PayPal sends events to `/api/v1/callback/paypal`:

```python
@myext_api_router.post("/api/v1/webhook/paypal")
async def paypal_webhook(request: Request):
    payload = await request.json()
    headers = dict(request.headers)

    # PayPal uses webhook ID for signature verification
    webhook_id = settings.fiat_providers.paypal_webhook_id

    event = verify_and_parse_paypal_event(
        payload, headers, webhook_id
    )

    if event["event_type"] == "PAYMENT.CAPTURE.COMPLETED":
        resource = event["resource"]
        await handle_successful_payment(resource)
    elif event["event_type"] == "BILLING.SUBSCRIPTION.CANCELLED":
        resource = event["resource"]
        await handle_subscription_cancelled(resource)

    return {"status": "ok"}
```

Key difference: Stripe uses a **signing secret** in the header, PayPal uses a **webhook ID** to verify the full payload via API call.

## Complete extension example

A multi-method payment endpoint supporting Lightning, Stripe, and PayPal:

```python
@myext_api_router.post("/api/v1/items/{item_id}/pay")
async def api_pay_for_item(
    item_id: str,
    method: str = "lightning",  # "lightning", "card", or "paypal"
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
        check_fiat_limits("stripe", key_info.wallet.user, item.amount)
        checkout_url = await create_stripe_checkout(
            amount_sats=item.amount,
            payment_hash=urlsafe_short_hash(),
            success_url=f"{settings.lnbits_baseurl}/myext?paid=true",
            description=f"Payment for {item.name}",
        )
        return {"method": "card", "checkout_url": checkout_url}

    elif method == "paypal":
        if not settings.is_fiat_provider_enabled("paypal"):
            raise HTTPException(
                HTTPStatus.BAD_REQUEST, "PayPal payments not available"
            )
        check_fiat_limits("paypal", key_info.wallet.user, item.amount)
        checkout_url = await create_paypal_checkout(
            amount_sats=item.amount,
            payment_hash=urlsafe_short_hash(),
            success_url=f"{settings.lnbits_baseurl}/myext?paid=true",
            description=f"Payment for {item.name}",
        )
        return {"method": "paypal", "checkout_url": checkout_url}

    raise HTTPException(
        HTTPStatus.BAD_REQUEST, f"Unknown payment method: {method}"
    )
```

## Provider interface reference

Both Stripe and PayPal implement the same interface:

| Method | Returns | Purpose |
| --- | --- | --- |
| `create_invoice(amount, payment_hash, currency, memo, extra)` | `FiatInvoiceResponse` | Create a payment |
| `get_invoice_status(checking_id)` | `FiatPaymentStatus` | Check payment status |
| `create_subscription(options)` | `FiatSubscriptionResponse` | Create recurring payment |
| `cancel_subscription(sub_id, correlation_id)` | `bool` | Cancel subscription |
| `status()` | `FiatStatusResponse` | Check if provider is configured |
| `cleanup()` | `None` | Clean up resources |

### Status types

- `FiatPaymentSuccessStatus` - payment completed
- `FiatPaymentPendingStatus` - payment in progress
- `FiatPaymentFailedStatus` - payment failed

### Provider differences

| | Stripe | PayPal |
| --- | --- | --- |
| **Provider name** | `"stripe"` | `"paypal"` |
| **Webhook endpoint** | `/api/v1/webhook/stripe` | `/api/v1/callback/paypal` |
| **Webhook verification** | Signing secret in header | Webhook ID via API call |
| **Checking ID prefix** | `cs_`, `pi_`, `in_`, `sub_` | PayPal order/capture IDs |
| **Subscription setup** | Price objects in Stripe dashboard | Billing plans in PayPal dashboard |
| **Guest checkout** | Card-only (no PayPal account needed) | Card or bank (region-dependent) |

## Related Pages

- [Fiat Payments Overview](/guide/core/fiat-payments) - how fiat providers work (admin perspective)
- [Stripe Setup](/guide/core/fiat-stripe) - admin configuration for Stripe
- [PayPal Setup](/guide/core/fiat-paypal) - admin configuration for PayPal
- [Building Extensions](/dev/building-extensions) - extension development guide
- [Deploying Extensions](/dev/extensions/) - distribution and installation
- [Decorators & Auth](/dev/decorators) - authentication for API endpoints
