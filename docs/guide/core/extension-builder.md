# Extension Builder

> A built-in no-code application inside LNbits that lets you create complete, working extensions through a guided wizard - no manual coding required.

The Extension Builder is a full application integrated into LNbits core (since v1.3.0). It generates production-ready extensions with database models, CRUD operations, API endpoints, Vue.js admin pages, optional public-facing pages, and optional Lightning payment logic - all from a step-by-step form.

## Video Tutorial

<iframe width="560" height="315" src="https://www.youtube.com/embed/aRTRYcNwqj0?si=VnoPn-zUD7ODl3Cx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="max-width: 100%; border-radius: 8px;"></iframe>

## Who can use it

| Role | Access | Can deploy directly? |
| --- | --- | --- |
| **Super User / Admin** | Always available | Yes |
| **Regular User** | Only if admin enables it | No - download ZIP only |

Admins control access via **Admin Dashboard → Server → Extensions**:

- **Enable Extensions Builder for non-admin users** - toggle on to let all authenticated users access the builder
- **Extension Builder Manifest URL** - URL to the stub template manifest (defaults to the official GitHub-hosted manifest)

::: tip
The corresponding environment variable is `LNBITS_EXTENSIONS_BUILDER_ACTIVATE_NON_ADMINS=true`.
:::

## How to access it

1. Navigate to **Extensions** in the LNbits sidebar
2. Click the **Create Extension** button (architecture icon) at the top of the page
3. The builder opens at `/extensions/builder`

If you are a non-admin user and the button is greyed out, ask your instance admin to enable the builder.

## The 6-step wizard

The builder walks you through six steps. Steps 2–5 include a **live preview panel** (iframe) that updates as you configure your extension.

Your progress is **saved automatically** in the browser's localStorage - you can close the tab and resume later.

### Step 1: Describe

Set the basic metadata for your extension.

| Field | Description | Rules |
| --- | --- | --- |
| **Extension Name** | Display name shown in the extension list | Free text |
| **Extension ID** | Internal identifier used in URLs and code | `snake_case` only (lowercase, numbers, underscores) |
| **Short Description** | One-liner shown in the extension grid | No double quotes |
| **Description** | Detailed description (up to 1000 characters) | No double quotes |

You can also **import a previously exported JSON config** to pre-fill all steps - useful for iterating on an existing extension or sharing configurations between instances.

### Step 2: Settings

Optionally generate configuration fields for your extension.

- **Generate Settings Fields** - toggle on/off
- **Settings Type**:
  - `user` - each user gets their own settings
  - `admin` - settings are global, controlled by the admin
- **Settings Fields** - define custom fields (same field types as data models, but without advanced column options)

### Step 3: Owner Data

Define the **primary data model** - the data that extension owners create and manage.

| Field | Description |
| --- | --- |
| **Owner Table Name** | CamelCase name (e.g., `Campaign`, `Product`, `PoS`) |
| **Data Fields** | Add fields with name, type, label, hint, and toggles |

Think of owner data as the "configuration" or "product" - the thing the extension owner sets up. Each record is linked to the user who created it.

**System fields** are added automatically: `id`, `created_at`, `updated_at`, `extra`.

### Step 4: Client Data

Define the **secondary data model** - data submitted by end users interacting with the extension.

| Field | Description |
| --- | --- |
| **Client Table Name** | CamelCase name (e.g., `Donation`, `Order`, `Submission`) |
| **Data Fields** | Same field configuration as owner data |

Client data is linked to owner data via a foreign key. Owners can view but not modify client records. Think of it as "orders", "donations", or "submissions".

### Step 5: Public Pages

Optionally generate a **public-facing page** that can be shared even on restricted LNbits instances.

- **Generate Public Page** - toggle on/off
- **Page title** - map to an owner data field (shown as the page heading)
- **Page description** - map to an owner data field (shown below the title)
- **Public inputs** - select which client data fields appear as form inputs

#### Action button and payment logic

When the public page is enabled, you can optionally add:

- **Generate Action Button** - adds a submit/action button to the public page
- **Generate Payment Logic** - creates a full Lightning invoice flow (QR code, payment listener, status tracking)

Payment logic requires mapping these fields:

| Mapping | Source | Required type |
| --- | --- | --- |
| **Wallet** | Owner data field | `wallet` |
| **Currency** | Owner data field | `currency` (empty = sats) |
| **Amount** | Owner data or client data field | `int` or `float` |
| **Paid Flag** | Client data field | `bool` |

When a user submits the public page form, an invoice is created. A background task listens for payment and sets the paid flag to `true` on the client data record.

### Step 6: Publish

Choose how to output your extension:

| Action | Who can use | What it does |
| --- | --- | --- |
| **Build and Deploy** | Admin only | Installs and activates the extension directly on this LNbits instance |
| **Download Extension ZIP** | Everyone | Downloads a complete extension package as a `.zip` file |
| **Export JSON Data** | Everyone | Exports the builder configuration as `.json` (also included in the ZIP as `builder.json`) |

Admins can also:

- **Select Stub Version** - choose which template version to use (only compatible versions are shown)
- **Clean Cache** - clear cached stub template downloads from the server

## Supported field types

Every data model (owner data, client data, settings) uses the same field type system:

| Type | Description | DB column | Special behavior |
| --- | --- | --- | --- |
| `str` | Short text | `TEXT` | - |
| `text` | Long text | `TEXT` | - |
| `int` | Integer number | `INT` | Eligible as payment amount |
| `float` | Decimal number | `REAL` | Eligible as payment amount |
| `bool` | True/false toggle | `BOOLEAN` | Eligible as paid flag |
| `datetime` | Date and time | `TIMESTAMP` | - |
| `json` | Nested JSON object | `TEXT` | Supports nested sub-fields; not editable/sortable/searchable |
| `wallet` | Wallet selector dropdown | `TEXT` | Eligible as payment wallet |
| `currency` | Currency selector dropdown | `TEXT` | Defaults to `"sat"`; eligible as payment currency |

### Field properties

Each field has these configurable properties:

| Property | Default | Description |
| --- | --- | --- |
| **Name** | auto-generated | Internal name (`snake_case`) |
| **Type** | `str` | One of the types above |
| **Label** | empty | Display label in the UI |
| **Hint** | empty | Helper text below the input |
| **Optional** | `true` | Whether the field can be left empty |
| **Editable** | `true` | Whether the field appears in edit forms (owner/client data only) |
| **Sortable** | `true` | Whether the table column supports sorting (owner/client data only) |
| **Searchable** | `true` | Whether free-text search includes this field (owner/client data only) |

::: info Reserved field names
`id`, `created_at`, and `updated_at` are reserved - the builder adds these automatically. You cannot use them as custom field names.
:::

## What gets generated

The builder produces a **complete, production-ready LNbits extension** with:

| Component | Generated files |
| --- | --- |
| **Python backend** | `__init__.py`, `models.py`, `crud.py`, `views.py`, `views_api.py`, `services.py`, `tasks.py`, `migrations.py` |
| **Vue.js frontend** | `static/index.js`, `static/index.vue`, `static/public_page.js`, `static/public_page.vue` |
| **Templates** | Jinja2 HTML templates for admin page, API docs, input fields |
| **Configuration** | `config.json` (extension metadata), `builder.json` (re-importable config) |
| **Tests** | `tests/conftest.py`, `tests/test_crud.py`, `tests/test_init.py` |
| **Tooling** | `Makefile`, `pyproject.toml`, `.prettierrc`, `.gitignore`, CI workflows |

The generated extension includes:

- **Database tables** with proper migrations (column types, NOT NULL, defaults)
- **Full CRUD API** with pagination, search, filtering, and CSV export
- **Admin page** with data tables, create/edit dialogs, and search
- **Public page** (if enabled) with shareable URL at `/{ext_id}/{owner_data_id}`
- **Payment flow** (if enabled) with invoice creation, QR code display, and background payment listener
- **Settings page** (if enabled) with user-scoped or admin-scoped configuration

## Typical workflow

### Quick prototype (admin)

1. Open **Extensions → Create Extension**
2. Fill in name, ID, description
3. Define your owner data model (e.g., `Product` with `name`, `price`, `wallet`)
4. Define client data model (e.g., `Order` with `quantity`, `paid`)
5. Enable public page with payment logic
6. Click **Build and Deploy**
7. The extension appears in your Extensions list immediately

### Share with others (any user)

1. Configure your extension in the builder
2. Click **Download Extension ZIP**
3. Share the ZIP - recipients install it via the standard [local filesystem](/dev/extensions/local) or [remote manifest](/dev/extensions/manifest) methods
4. Optionally share the **Export JSON** so others can import it into their own builder and customize

### Iterate on an existing extension

1. Open the builder
2. Click **Upload Existing Config** and load the `builder.json` from a previous build
3. Modify fields, settings, or pages
4. Re-deploy or download the updated version

## Configuration reference

| Setting | Environment variable | Default | Description |
| --- | --- | --- | --- |
| Enable for non-admins | `LNBITS_EXTENSIONS_BUILDER_ACTIVATE_NON_ADMINS` | `false` | Allow all authenticated users to access the builder |
| Manifest URL | `LNBITS_EXTENSIONS_BUILDER_MANIFEST_URL` | GitHub-hosted manifest | URL to the JSON manifest listing available stub template versions |

The builder stores temporary build artifacts in `{LNBITS_DATA_FOLDER}/extensions_builder/`.

## API endpoints

The builder exposes four internal API endpoints under `/api/v1/extension/builder`:

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/zip` | Builder access | Build extension and download as ZIP |
| `POST` | `/deploy` | Admin only | Build, install, and activate on this instance |
| `POST` | `/preview` | Builder access | Generate a live preview build |
| `DELETE` | `/` | Admin only | Clean all builder working data and cache |

## Limitations

- **Client data is always required** - you must define at least one client data field, even if your extension doesn't use client-submitted data
- **One stub template** - currently only the official `extension_builder_stub` template exists, though the manifest format supports multiple templates
- **Deploy is admin-only** - non-admin users can design and download extensions but cannot install them directly
- **No frontend-only validation** - the wizard allows navigating between steps without filling required fields; validation happens when you build or deploy
- **Generated code is a starting point** - for complex extensions, download the ZIP and continue development manually in your editor

::: tip Going beyond the builder
The Extension Builder is designed to give you a working foundation fast. For advanced features (custom Vue components, complex business logic, third-party integrations), download the generated extension and develop it further using the [Building Extensions](/dev/building-extensions) guide.
:::

## Related Pages

- [Using Extensions](/guide/using-extensions) - how to install and manage extensions
- [Building Extensions](/dev/building-extensions) - manual extension development guide
- [Deploying Extensions](/dev/extensions/) - how to distribute and install extensions
- [Admin Dashboard](/guide/admin-dashboard) - server configuration including builder settings
- [Super User](/guide/core/super-user) - the highest-privilege account that manages the builder
