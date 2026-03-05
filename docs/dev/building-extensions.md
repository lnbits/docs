# Building Extensions

> Create LNbits extensions with their own API endpoints, database tables, models, migrations, and frontend templates.

Create your own LNbits extension to add custom functionality.

## Extension structure

```
my_extension/
├── __init__.py          # Entry point — defines routers and metadata
├── config.json          # Extension metadata
├── views.py             # UI routes (HTML pages)
├── views_api.py         # API endpoints
├── crud.py              # Database operations
├── models.py            # Pydantic models
├── migrations.py        # Database migrations
├── templates/
│   └── my_extension/
│       └── index.html   # Jinja2 template
└── static/
    └── js/
        └── index.js     # Frontend JavaScript
```

## config.json

```json
{
  "name": "My Extension",
  "short_description": "A brief description",
  "tile": "/my_extension/static/image/tile.png",
  "contributors": ["your-name"],
  "min_lnbits_version": "1.0.0"
}
```

## Entry point (__init__.py)

```python
from fastapi import APIRouter
from lnbits.db import Database

db = Database("ext_my_extension")

my_extension_api = APIRouter()
my_extension_ext = APIRouter()

# Register static files path
my_extension_static_files = [
    {
        "path": "/my_extension/static",
        "name": "my_extension_static",
    }
]

def my_extension_start():
    """Called when the extension starts."""
    pass

def my_extension_stop():
    """Called when the extension stops."""
    pass
```

## API endpoints (views_api.py)

```python
from http import HTTPStatus
from fastapi import APIRouter, Depends
from lnbits.decorators import (
    require_admin_key,
    require_invoice_key,
    WalletTypeInfo,
)
from .crud import create_item, get_items
from .models import CreateItemRequest, Item

router = APIRouter()

@router.get("/api/v1/items")
async def api_get_items(
    wallet: WalletTypeInfo = Depends(require_invoice_key),
) -> list[Item]:
    return await get_items(wallet.wallet.id)

@router.post("/api/v1/items", status_code=HTTPStatus.CREATED)
async def api_create_item(
    data: CreateItemRequest,
    wallet: WalletTypeInfo = Depends(require_admin_key),
) -> Item:
    return await create_item(wallet.wallet.id, data)
```

## Models (models.py)

```python
from pydantic import BaseModel

class CreateItemRequest(BaseModel):
    name: str
    price: int
    description: str = ""

class Item(BaseModel):
    id: str
    wallet: str
    name: str
    price: int
    description: str
```

## Database operations (crud.py)

```python
from lnbits.db import Database
from lnbits.helpers import urlsafe_short_hash
from .models import CreateItemRequest, Item

db = Database("ext_my_extension")

async def create_item(wallet_id: str, data: CreateItemRequest) -> Item:
    item_id = urlsafe_short_hash()
    await db.execute(
        """
        INSERT INTO my_extension.items (id, wallet, name, price, description)
        VALUES (:id, :wallet, :name, :price, :description)
        """,
        {
            "id": item_id,
            "wallet": wallet_id,
            "name": data.name,
            "price": data.price,
            "description": data.description,
        },
    )
    item = await get_item(item_id)
    assert item, "Created item not found"
    return item

async def get_item(item_id: str) -> Item | None:
    row = await db.fetchone(
        "SELECT * FROM my_extension.items WHERE id = :id",
        {"id": item_id},
    )
    return Item(**row) if row else None

async def get_items(wallet_id: str) -> list[Item]:
    rows = await db.fetchall(
        "SELECT * FROM my_extension.items WHERE wallet = :wallet",
        {"wallet": wallet_id},
    )
    return [Item(**row) for row in rows]
```

## Migrations (migrations.py)

```python
async def m001_initial(db):
    """Create initial tables."""
    await db.execute(
        """
        CREATE TABLE my_extension.items (
            id TEXT PRIMARY KEY,
            wallet TEXT NOT NULL,
            name TEXT NOT NULL,
            price INTEGER NOT NULL,
            description TEXT DEFAULT ''
        );
        """
    )

async def m002_add_created_at(db):
    """Add created_at column."""
    await db.execute(
        """
        ALTER TABLE my_extension.items
        ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
        """
    )
```

## Frontend template

```html
{% extends "base.html" %}
{% block page %}
<div class="row q-col-gutter-md">
  <div class="col-12">
    <q-card>
      <q-card-section>
        <h5 class="text-subtitle1 q-my-none">My Extension</h5>
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="items"
          :columns="columns"
          row-key="id"
        />
      </q-card-section>
    </q-card>
  </div>
</div>
{% endblock %}

{% block scripts %}
<script>
  new Vue({
    el: '#vue',
    data() {
      return {
        items: [],
        columns: [
          { name: 'name', label: 'Name', field: 'name' },
          { name: 'price', label: 'Price (sats)', field: 'price' },
        ]
      }
    },
    async created() {
      const { data } = await LNbits.api.request(
        'GET',
        '/my_extension/api/v1/items',
        this.g.user.wallets[0].inkey
      )
      this.items = data
    }
  })
</script>
{% endblock %}
```

## Listening for payments

Register an invoice listener to react to payments:

```python
from lnbits.tasks import register_invoice_listener

async def wait_for_paid_invoices():
    invoice_queue = asyncio.Queue()
    register_invoice_listener(invoice_queue, "ext_my_extension")
    while True:
        payment = await invoice_queue.get()
        await on_invoice_paid(payment)

async def on_invoice_paid(payment):
    # Check if this payment is for your extension
    if payment.extra.get("tag") != "my_extension":
        return
    # Handle the payment
    await process_order(payment)
```

## Testing with FakeWallet

During development, use FakeWallet for instant, reliable testing:

```bash
LNBITS_BACKEND_WALLET_CLASS=FakeWallet
FAKE_WALLET_SECRET=test-secret
```

## Dependencies

::: danger DO NOT ADD NEW DEPENDENCIES
Use the packages already available in LNbits' `pyproject.toml`. Adding a new dependency is time-consuming and uncertain, and **may result in your extension NOT being made available to others**.
:::

If your extension absolutely requires a new package:

1. Check `pyproject.toml` for an existing package that covers your need
2. Open a GitHub issue explaining why it's necessary
3. Add it to `pyproject.toml` and test with all three installers:

```bash
# Must pass all three:
uv pip install -e "."        # uv
poetry install                # Poetry
nix build .#checks.x86_64-linux.vmTest  # Nix
```

See [Contributing — Adding new dependencies](/dev/contributing#adding-new-dependencies) for the full process.

## Publishing

1. Host your extension on GitHub
2. Create a release with the extension files as a zip
3. Add your repository to an extension manifest
4. Users can install directly from the LNbits UI

For full deployment details, see the [Deploying Extensions](/dev/extensions/) guide, which covers:

- [Local development deployment](/dev/extensions/local) — test by dropping folders on disk
- [Remote manifest distribution](/dev/extensions/manifest) — publish via manifest files
- [Official registry submission](/dev/extensions/registry) — get listed on the default marketplace
- [Monetization](/dev/extensions/monetization) — charge for extensions via Lightning payments
- [Auto-install](/dev/extensions/auto-install) — pre-configure extensions for Docker and automated deployments

## Related Pages

- [Deploying Extensions](/dev/extensions/) — packaging, distribution, and installation
- [Contributing](/dev/contributing.md)
- [Database & Migrations](/dev/database.md)
- [Decorators & Auth](/dev/decorators.md)
- [Background Tasks](/dev/tasks.md)
