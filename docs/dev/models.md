# Models & Types

> Pydantic models and type definitions used across LNbits core and extensions.

Core data models used throughout LNbits.

## Account & User

```python
class Account(BaseModel):
    id: str
    username: str | None
    email: str | None
    pubkey: str | None  # Nostr pubkey
    password_hash: str | None
    extra: UserExtra | None

class User(BaseModel):
    id: str
    wallets: list[Wallet]
    admin: bool
    super_user: bool
    has_password: bool

class UserExtra(BaseModel):
    email_verified: bool = False
    display_name: str = ""
    notifications: UserNotifications | None
    labels: list[str] = []
```

## Wallet

```python
class Wallet(BaseModel):
    id: str
    name: str
    user: str  # Account ID
    adminkey: str
    inkey: str
    balance_msat: int
    deleted: bool = False
    currency: str | None
    extra: WalletExtra | None

class WalletType(Enum):
    LIGHTNING = "lightning"
    LIGHTNING_SHARED = "lightning_shared"

class WalletPermission(Enum):
    VIEW_PAYMENTS = "view_payments"
    RECEIVE_PAYMENTS = "receive_payments"
    SEND_PAYMENTS = "send_payments"
```

## Payment

```python
class Payment(BaseModel):
    checking_id: str
    payment_hash: str
    wallet_id: str
    amount: int          # millisatoshis (positive=in, negative=out)
    fee: int             # millisatoshis
    memo: str | None
    bolt11: str
    preimage: str | None
    status: PaymentState
    time: datetime
    extra: dict          # JSON metadata
    webhook: str | None
    webhook_status: int | None

class PaymentState(Enum):
    PENDING = "pending"
    SUCCESS = "success"
    FAILED = "failed"

class CreatePayment(BaseModel):
    out: bool            # true = send, false = receive
    amount: int          # satoshis
    memo: str = ""
    bolt11: str | None   # required for out=true
    webhook: str | None
    extra: dict | None
    expiry: int | None
```

## Key & Auth

```python
class KeyType(Enum):
    admin = 0
    invoice = 1
    invalid = 2

class WalletTypeInfo(BaseModel):
    key_type: KeyType
    wallet: Wallet

class AccessTokenPayload(BaseModel):
    sub: str            # User ID
    exp: datetime       # Expiry
    iat: datetime       # Issued at
```

## Extension

```python
class Extension(BaseModel):
    code: str           # Extension ID
    name: str
    short_description: str
    icon: str | None
    contributors: list[str]
    active: bool
    version: str

class InstallableExtension(BaseModel):
    id: str
    name: str
    version: str
    short_description: str
    stars: int
    featured: bool
    archive: str        # Download URL
    min_lnbits_version: str
    dependencies: list[str]
```

## Filtering

```python
class PaymentFilters(FilterModel):
    checking_id: str | None
    amount: int | None
    memo: str | None
    status: PaymentState | None
    wallet_id: str | None
    tag: str | None
```

Used with the `@parse_filters` decorator for paginated endpoints.

## Related Pages

- [Building Extensions](/dev/building-extensions)
- [Database & Migrations](/dev/database)
