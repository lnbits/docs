# Wallet Backends

> Implement new Lightning wallet backend support for LNbits.

How the funding source abstraction works and how to implement a new backend.

## The Wallet interface

All backends implement the abstract `Wallet` class from `lnbits/wallets/base.py`:

```python
class Wallet(ABC):
    """Abstract base class for Lightning wallet backends."""

    @abstractmethod
    async def status(self) -> StatusResponse:
        """Get node status and balance."""
        ...

    @abstractmethod
    async def create_invoice(
        self,
        amount: int,
        memo: str | None = None,
        description_hash: bytes | None = None,
        unhashed_description: bytes | None = None,
        expiry: int | None = None,
        payment_secret: bytes | None = None,
        **kwargs,
    ) -> InvoiceResponse:
        """Create a Lightning invoice."""
        ...

    @abstractmethod
    async def pay_invoice(
        self, bolt11: str, fee_limit_msat: int
    ) -> PaymentResponse:
        """Pay a Lightning invoice."""
        ...

    @abstractmethod
    async def get_invoice_status(
        self, checking_id: str
    ) -> PaymentStatus:
        """Check the status of an invoice."""
        ...

    @abstractmethod
    async def get_payment_status(
        self, checking_id: str
    ) -> PaymentStatus:
        """Check the status of an outgoing payment."""
        ...

    @abstractmethod
    async def paid_invoices_stream(self) -> AsyncGenerator[str, None]:
        """Stream paid invoice checking_ids."""
        ...
```

## Response types

```python
class StatusResponse(NamedTuple):
    error_message: str | None
    balance_msat: int

class InvoiceResponse(NamedTuple):
    ok: bool
    checking_id: str | None
    payment_request: str | None
    error_message: str | None

class PaymentResponse(NamedTuple):
    ok: bool
    checking_id: str | None
    fee_msat: int | None
    preimage: str | None
    error_message: str | None

class PaymentStatus(NamedTuple):
    paid: bool | None  # None = unknown/pending
    fee_msat: int | None
    preimage: str | None
```

## Optional features

Backends can declare supported features:

```python
class MyWallet(Wallet):
    def supported_features(self) -> set[WalletFeature]:
        return {
            WalletFeature.HOLDINVOICE,
            WalletFeature.NODEMANAGER,
        }
```

| Feature | Description |
| --- | --- |
| `HOLDINVOICE` | Can create and manage hold invoices |
| `NODEMANAGER` | Exposes node management (channels, peers) |

## Implementing a new backend

### 1. Create the wallet file

```python
# lnbits/wallets/my_backend.py
from .base import Wallet, StatusResponse, InvoiceResponse, PaymentResponse, PaymentStatus

class MyBackendWallet(Wallet):
    def __init__(self):
        self.endpoint = settings.my_backend_endpoint
        self.api_key = settings.my_backend_api_key

    async def status(self) -> StatusResponse:
        # Query your backend for balance
        balance = await self._get_balance()
        return StatusResponse(None, balance)

    async def create_invoice(self, amount, memo=None, **kwargs):
        # Call your backend to create an invoice
        ...
        return InvoiceResponse(True, checking_id, bolt11, None)

    async def pay_invoice(self, bolt11, fee_limit_msat):
        # Call your backend to pay
        ...
        return PaymentResponse(True, checking_id, fee_msat, preimage, None)

    async def get_invoice_status(self, checking_id):
        ...
        return PaymentStatus(paid, fee_msat, preimage)

    async def get_payment_status(self, checking_id):
        ...
        return PaymentStatus(paid, fee_msat, preimage)

    async def paid_invoices_stream(self):
        # Long-running stream that yields checking_ids of paid invoices
        while True:
            checking_id = await self._wait_for_payment()
            yield checking_id
```

### 2. Register the backend

Add your wallet class to the wallet registry so it can be selected via `LNBITS_BACKEND_WALLET_CLASS`.

### 3. Add settings

Add any configuration variables your backend needs to `settings.py`.

### 4. Test

Use the LNbits test suite to verify your backend works correctly with all core operations.

## Related Pages

- [Wallet Backends Guide](/guide/wallets/index.md)
- [Wallet Comparison](/guide/wallets/comparison.md)
- [Architecture](/dev/architecture.md)
