# Quick Reference

> Every LNbits API endpoint in one scannable table. Click any endpoint path to jump to its full documentation.

All paths are relative to your instance base URL (e.g. `https://your-lnbits.com`).

**Auth levels:** **Admin** = Admin key, **Invoice** = Invoice key, **Bearer** = JWT Bearer token, **Super** = Super User, **None** = no auth required.

## Core - Wallets

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | [`/api/v1/wallet`](/api/core/wallets#get-wallet-details) | Invoice | Get wallet details and balance |
| `GET` | [`/api/v1/wallets`](/api/core/wallets#list-all-wallets) | Bearer | List all wallets for user |
| `GET` | [`/api/v1/wallet/paginated`](/api/core/wallets#list-wallets-paginated) | Bearer | List wallets with pagination |
| `PUT` | [`/api/v1/wallet`](/api/core/wallets#update-wallet) | Admin | Update wallet name or currency |
| `DELETE` | [`/api/v1/wallet`](/api/core/wallets#delete-wallet) | Admin | Delete wallet permanently |
| `PUT` | [`/api/v1/wallet/share/invite`](/api/core/wallets#send-share-invitation) | Admin | Invite user to share wallet |
| `PUT` | [`/api/v1/wallet/share`](/api/core/wallets#accept-share-invitation) | Bearer | Accept a wallet share invite |
| `DELETE` | [`/api/v1/wallet/share/invite/{id}`](/api/core/wallets#reject-share-invitation) | Bearer | Reject a wallet share invite |

## Core - Payments

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | [`/api/v1/payments`](/api/core/payments#create-invoice-receive) | Invoice | Create a Lightning invoice |
| `POST` | [`/api/v1/payments`](/api/core/payments#pay-invoice-send) | Admin | Pay a Lightning invoice |
| `GET` | [`/api/v1/payments/{checking_id}`](/api/core/payments#check-payment-status) | Invoice | Check payment status |
| `GET` | [`/api/v1/payments`](/api/core/payments#list-payments) | Invoice | List payments |
| `GET` | [`/api/v1/payments/paginated`](/api/core/payments#list-payments-paginated) | Invoice | List payments with pagination |
| `GET` | [`/api/v1/payments/history`](/api/core/payments#payment-history) | Invoice | Payment history by time group |
| `GET` | [`/api/v1/payments/stats/count`](/api/core/payments#count-by-tag) | Invoice | Payment count by tag |
| `GET` | [`/api/v1/payments/stats/wallets`](/api/core/payments#per-wallet-stats) | Bearer | Per-wallet payment stats |
| `GET` | [`/api/v1/payments/stats/daily`](/api/core/payments#daily-stats) | Invoice | Daily payment stats |
| `PUT` | [`/api/v1/payments/{checking_id}`](/api/core/payments#settle-hold-invoice) | Admin | Settle a hold invoice |
| `DELETE` | [`/api/v1/payments/{checking_id}`](/api/core/payments#cancel-hold-invoice) | Admin | Cancel a hold invoice |

## Core - Users & Accounts

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | [`/api/v1/auth`](/api/core/users#login-username-password) | None | Login with username & password |
| `POST` | [`/api/v1/auth/usr`](/api/core/users#login-user-id) | None | Login with user ID (legacy) |
| `POST` | [`/api/v1/auth/nostr`](/api/core/users#login-nostr) | None | Login with Nostr (NIP-98) |
| `POST` | [`/api/v1/auth/{provider}/token`](/api/core/users#login-oauth) | None | OAuth login (Google, GitHub, Keycloak) |
| `GET` | [`/api/v1/auth`](/api/core/users#get-current-user) | Bearer | Get current user profile |
| `POST` | [`/api/v1/auth/register`](/api/core/users#register) | None | Register new account |
| `PUT` | [`/api/v1/auth/me`](/api/core/users#update-profile) | Bearer | Update profile |
| `PUT` | [`/api/v1/auth/update-password`](/api/core/users#update-password) | Bearer | Change password |
| `POST` | [`/api/v1/auth/reset-password`](/api/core/users#reset-password) | None | Request password reset |
| `DELETE` | [`/api/v1/auth/me`](/api/core/users#delete-account) | Bearer | Delete account |
| `GET` | [`/api/v1/auth/acls`](/api/core/users#list-acls) | Bearer | List ACLs |
| `POST` | [`/api/v1/auth/acls`](/api/core/users#create-acl) | Bearer | Create ACL |
| `PUT` | [`/api/v1/auth/acls/{acl_id}`](/api/core/users#update-acl) | Bearer | Update ACL |
| `DELETE` | [`/api/v1/auth/acls/{acl_id}`](/api/core/users#delete-acl) | Bearer | Delete ACL |
| `POST` | [`/api/v1/auth/acls/{acl_id}/tokens`](/api/core/users#generate-acl-token) | Bearer | Generate ACL token |
| `DELETE` | [`/api/v1/auth/acls/{acl_id}/tokens/{token_id}`](/api/core/users#revoke-acl-token) | Bearer | Revoke ACL token |

## Core - Extensions

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | [`/api/v1/extension`](/api/core/extensions#install-extension) | Bearer | Install extension |
| `GET` | [`/api/v1/extension/{ext_id}/releases`](/api/core/extensions#list-releases) | Bearer | List available releases |
| `GET` | [`/api/v1/extension/{ext_id}/details`](/api/core/extensions#get-extension-details) | Bearer | Get extension details |
| `PUT` | [`/api/v1/extension/{ext_id}`](/api/core/extensions#activate-deactivate) | Bearer | Activate or deactivate |
| `DELETE` | [`/api/v1/extension/{ext_id}`](/api/core/extensions#uninstall-extension) | Bearer | Uninstall extension |
| `POST` | [`/api/v1/extension/{ext_id}/reviews`](/api/core/extensions#submit-review) | Bearer | Submit review |

## Core - LNURL

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | [`/api/v1/lnurlscan/{code}`](/api/core/lnurl#scan-lnurl) | Invoice | Parse LNURL / Lightning Address |
| `POST` | [`/api/v1/payments/lnurl`](/api/core/lnurl#pay-lnurl) | Admin | Pay via LNURL-pay flow |
| `POST` | [`/api/v1/lnurlauth`](/api/core/lnurl#lnurl-auth) | Admin | Perform LNURL-auth login |

## Core - Fiat & Rates

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | [`/api/v1/rate/{currency}`](/api/core/fiat#get-exchange-rate) | None | Get BTC exchange rate |
| `GET` | [`/api/v1/currencies`](/api/core/fiat#list-currencies) | None | List supported currencies |
| `GET` | [`/api/v1/rate/history`](/api/core/fiat#rate-history) | None | Historical exchange rates |
| `POST` | [`/api/v1/conversion`](/api/core/fiat#convert-amount) | None | Convert between units |

## Core - TinyURL

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | [`/api/v1/tinyurl`](/api/core/tinyurl#create-tinyurl) | Invoice | Create a short URL |
| `GET` | [`/api/v1/tinyurl/{tinyurl_id}`](/api/core/tinyurl#get-tinyurl) | Invoice | Get TinyURL details |
| `DELETE` | [`/api/v1/tinyurl/{tinyurl_id}`](/api/core/tinyurl#delete-tinyurl) | Admin | Delete a TinyURL |

## Core - WebSockets

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `WS` | [`/api/v1/ws/{wallet_id}`](/api/core/websockets#payment-updates) | None | Real-time payment events |

## Admin - Settings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | [`/api/v1/admin/settings`](/api/admin/settings#get-settings) | Super | Get server settings |
| `PUT` | [`/api/v1/admin/settings`](/api/admin/settings#update-settings) | Super | Update server settings |

## Admin - Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | [`/users/api/v1/user`](/api/admin/users#list-users) | Admin | List all users |
| `GET` | [`/users/api/v1/user/{user_id}`](/api/admin/users#get-user) | Admin | Get user details |
| `POST` | [`/users/api/v1/user`](/api/admin/users#create-user) | Admin | Create user |
| `PUT` | [`/users/api/v1/user/{user_id}`](/api/admin/users#update-user) | Admin | Update user |
| `DELETE` | [`/users/api/v1/user/{user_id}`](/api/admin/users#delete-user) | Super | Delete user |
| `PUT` | [`/users/api/v1/user/{user_id}/balance`](/api/admin/users#adjust-user-balance) | Admin | Adjust user balance |

## Admin - Top-up

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `PUT` | [`/api/v1/admin/topup`](/api/admin/topup#top-up-a-wallet) | Super | Add balance to wallet |

## Admin - Extensions

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | [`/api/v1/admin/extensions`](/api/admin/extensions#list-extensions) | Admin | List all extensions |
| `POST` | [`/api/v1/admin/extensions`](/api/admin/extensions#enable-disable-extension) | Admin | Enable or disable extension |
| `POST` | [`/api/v1/admin/extensions/install`](/api/admin/extensions#install-from-manifest) | Super | Install from manifest URL |

## Related Pages

- [API Reference](/api/)
- [Authentication](/api/authentication)
- [Interactive API Docs](#interactive-api-docs)

::: tip Interactive API Docs
Every LNbits instance serves auto-generated interactive API documentation:
- **Swagger UI** - `https://your-lnbits.com/docs`
- **ReDoc** - `https://your-lnbits.com/redoc`

Use these to browse endpoints and test them directly from your browser.
:::
