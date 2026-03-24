# Decorators & Auth

> Authentication decorators for protecting LNbits API endpoints - require_admin_key, require_invoice_key, and more.

Authentication decorators used in LNbits API endpoints.

## Available decorators

### `require_admin_key`

Requires an admin API key. Used for write operations and sending payments.

```python
from lnbits.decorators import require_admin_key, WalletTypeInfo

@router.post("/api/v1/items")
async def create_item(
    wallet: WalletTypeInfo = Depends(require_admin_key),
):
    # wallet.wallet - the Wallet object
    # wallet.key_type - KeyType.admin
    ...
```

### `require_invoice_key`

Requires an invoice key (or admin key - admin keys pass invoice checks too).

```python
from lnbits.decorators import require_invoice_key

@router.get("/api/v1/items")
async def get_items(
    wallet: WalletTypeInfo = Depends(require_invoice_key),
):
    ...
```

### `check_user_exists`

Requires a valid Bearer token. Used for user-level operations.

```python
from lnbits.decorators import check_user_exists
from lnbits.core.models import User

@router.get("/api/v1/profile")
async def get_profile(
    user: User = Depends(check_user_exists),
):
    ...
```

### `check_admin`

Requires the user to be an admin.

```python
from lnbits.decorators import check_admin

@router.get("/admin/api/v1/data")
async def admin_data(
    user: User = Depends(check_admin),
):
    ...
```

### `check_super_user`

Requires the super user.

```python
from lnbits.decorators import check_super_user

@router.post("/admin/api/v1/dangerous")
async def dangerous_action(
    user: User = Depends(check_super_user),
):
    ...
```

## Filter parsing

The `parse_filters` decorator parses query parameters into filter objects:

```python
from lnbits.decorators import parse_filters
from lnbits.helpers import filter_model

@router.get("/api/v1/items")
async def list_items(
    wallet: WalletTypeInfo = Depends(require_invoice_key),
    filters: Filters = Depends(parse_filters(ItemFilters)),
):
    return await get_items_paginated(wallet.wallet.id, filters)
```

## How auth flows work

1. Client sends `X-Api-Key` header or `Authorization: Bearer` header
2. Decorator extracts the key/token
3. Key is looked up in the database (API keys) or decoded (JWT)
4. If valid, the `Wallet` or `User` object is injected into the endpoint function
5. If invalid, a `401 Unauthorized` response is returned

## Combining decorators

```python
@router.post("/api/v1/admin-action")
async def admin_action(
    wallet: WalletTypeInfo = Depends(require_admin_key),
    user: User = Depends(check_admin),
):
    # Requires BOTH an admin API key AND admin user status
    ...
```

## Related Pages

- [Building Extensions](/dev/building-extensions)
- [Authentication](/api/authentication)
- [API Keys Guide](/guide/core/api-keys)
