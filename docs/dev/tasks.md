# Background Tasks

> Invoice listeners, background tasks, and async patterns for LNbits extensions.

LNbits runs several async background tasks for payment processing and maintenance.

## Core tasks

| Task | Interval | Purpose |
| --- | --- | --- |
| **Invoice listener** | Continuous | Watches for paid invoices from the funding source |
| **Payment checker** | 30 minutes | Re-checks pending payments for status updates |
| **Exchange rates** | Periodic | Fetches fiat exchange rates |
| **Audit queue** | Continuous | Processes audit log entries |
| **Notification queue** | Continuous | Sends email/push notifications |
| **Webhook processor** | On event | Calls webhook URLs for paid invoices |

## Invoice listeners

Extensions can register listeners to react to incoming payments:

```python
import asyncio
from lnbits.tasks import register_invoice_listener

async def wait_for_paid_invoices():
    invoice_queue = asyncio.Queue()
    register_invoice_listener(invoice_queue, "ext_my_extension")

    while True:
        payment = await invoice_queue.get()
        await on_invoice_paid(payment)

async def on_invoice_paid(payment):
    # Filter by extension tag
    if payment.extra.get("tag") != "my_extension":
        return

    # Process the payment
    item_id = payment.extra.get("item_id")
    await mark_item_paid(item_id)
```

## Registering startup tasks

In your extension's `__init__.py`:

```python
def my_extension_start():
    """Called when the extension loads."""
    from lnbits.tasks import create_permanent_task
    create_permanent_task(wait_for_paid_invoices)

def my_extension_stop():
    """Called when the extension is disabled."""
    # Cleanup if needed
    pass
```

## Task patterns

### Periodic task

```python
async def periodic_cleanup():
    while True:
        await cleanup_expired_items()
        await asyncio.sleep(3600)  # Every hour
```

### Event-driven task

```python
async def process_queue():
    while True:
        item = await my_queue.get()
        try:
            await process(item)
        except Exception as e:
            logger.error(f"Failed to process: {e}")
```

## Best practices

- Always wrap task bodies in try/except to prevent crashes
- Use `asyncio.sleep()` between iterations to avoid busy-waiting
- Filter payments by tag before processing - your listener receives ALL payments
- Log errors but don't re-raise - crashed tasks don't restart automatically
- Keep task handlers fast - slow handlers delay payment notifications

## Related Pages

- [Building Extensions](/dev/building-extensions)
- [WebSockets Guide](/guide/core/websockets)
