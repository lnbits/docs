# Architecture

> Internal structure and design decisions behind LNbits — modules, data flow, and extension system.

Deep dive into how LNbits is built.

## Technology stack

| Layer | Technology |
| --- | --- |
| **Web framework** | FastAPI (Python 3.10+) |
| **Async runtime** | asyncio / uvicorn |
| **Database** | SQLite, PostgreSQL, or CockroachDB |
| **Frontend** | Vue 3 + Quasar framework |
| **Template engine** | Jinja2 |
| **Task runner** | Built-in async background tasks |

## Project structure

```
lnbits/
├── app.py                  # FastAPI application factory
├── settings.py             # Configuration (Pydantic settings)
├── db.py                   # Database abstraction layer
├── decorators.py           # Auth decorators (@require_admin_key, etc.)
├── middleware.py            # Request middleware stack
├── tasks.py                # Background task management
├── exceptions.py           # Custom exceptions
├── helpers.py              # Utility functions
│
├── core/                   # Core functionality
│   ├── views/              # API routers (19 router modules)
│   │   ├── api.py          # Core API (wallets, status, QR)
│   │   ├── payment_api.py  # Payment CRUD and stats
│   │   ├── wallet_api.py   # Wallet management
│   │   ├── auth_api.py     # Authentication flows
│   │   ├── user_api.py     # Admin user management
│   │   ├── extension_api.py # Extension lifecycle
│   │   ├── lnurl_api.py    # LNURL protocol
│   │   ├── admin_api.py    # Server admin
│   │   ├── node_api.py     # Lightning node management
│   │   └── ...             # More specialized routers
│   ├── crud/               # Database operations
│   │   ├── users.py
│   │   ├── wallets.py
│   │   ├── payments.py
│   │   └── ...
│   ├── services/           # Business logic (14 services)
│   │   ├── payments.py     # Invoice and payment processing
│   │   ├── wallets.py      # Wallet lifecycle
│   │   ├── users.py        # Account management
│   │   ├── extensions.py   # Extension loading
│   │   └── ...
│   ├── models/             # Pydantic data models
│   └── migrations.py       # Core database migrations
│
├── extensions/             # Built-in extensions
│   ├── lnurlp/
│   ├── tpos/
│   └── ...
│
├── wallets/                # Backend implementations (20+)
│   ├── base.py             # Abstract wallet interface
│   ├── lnd.py              # LND gRPC
│   ├── lnd_rest.py         # LND REST
│   ├── cln.py              # Core Lightning
│   ├── fake.py             # FakeWallet (testing)
│   └── ...
│
├── static/                 # Frontend assets (JS, CSS, images)
├── templates/              # Jinja2 HTML templates
└── utils/                  # Shared utilities
```

## Request lifecycle

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/diagrams/request-lifecycle-dark.svg">
  <img src="/diagrams/request-lifecycle-light.svg" alt="Request lifecycle — middleware, routing, auth, service layer, CRUD, database" style="max-width: 380px; width: 100%; margin: 16px auto; display: block;" />
</picture>

## Startup sequence

1. **Load configuration** — read `.env` and admin settings from DB
2. **Initialize database** — run migrations, create tables
3. **Check admin settings** — merge file and DB configs
4. **Set funding source** — connect to Lightning backend (with retry)
5. **Load extensions** — verify, import modules, register routes
6. **Start background tasks** — invoice listeners, payment checker, exchange rates
7. **Ready** — accept HTTP requests

## Key design patterns

### Database abstraction

LNbits uses a custom `Connection` class that normalizes queries across SQLite, PostgreSQL, and CockroachDB:

```python
async with db.connect() as conn:
    row = await conn.fetchone(
        "SELECT * FROM wallets WHERE id = :id",
        {"id": wallet_id}
    )
```

### Decorator-based auth

```python
@router.get("/api/v1/wallet")
async def get_wallet(wallet: WalletTypeInfo = Depends(require_invoice_key)):
    return wallet.wallet
```

### Extension isolation

Each extension runs in its own module namespace with:
- Separate database tables (prefixed with extension name)
- Independent migration versioning
- Isolated routers mounted at `/{ext_id}/`

### Background tasks

```python
# Register a task that runs on startup
async def my_task():
    while True:
        await process_something()
        await asyncio.sleep(60)

# Register invoice listener for real-time events
async def on_invoice_paid(payment):
    await handle_payment(payment)
```

## Related Pages

- [Building Extensions](/dev/building-extensions.md)
- [Database & Migrations](/dev/database.md)
- [Models & Types](/dev/models.md)
