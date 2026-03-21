# Notifications

> LNbits can send server-level notifications through multiple channels - email (SMTP), Telegram, Nostr DM, and web push (PWA).

Notifications alert admins about important server events like payments, balance changes, settings updates, and server status. Configure one or more channels in the Admin Dashboard or via environment variables.

## Video Tutorial

<iframe width="560" height="315" src="https://www.youtube.com/embed/5cqsp45jdCE?si=KjkrozL2otexrpkl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="max-width: 100%; border-radius: 8px;"></iframe>

## Available channels

| Channel | How it works | Good for |
| --- | --- | --- |
| **Email (SMTP)** | Sends email via your SMTP server | Formal alerts, audit trails |
| **Telegram** | Sends messages to a Telegram chat via bot | Quick mobile alerts |
| **Nostr DM** | Sends encrypted direct messages on Nostr | Privacy-focused, decentralized |
| **Web Push** | Browser and PWA push notifications | End-user payment alerts |

You can enable multiple channels at once. Each operates independently.

## Notification triggers

Each trigger can be toggled individually in **Admin Dashboard > Server > Notifications**.

| Trigger | Description | Threshold / interval |
| --- | --- | --- |
| **Settings updated** | Notify when server settings have been updated | On/off toggle |
| **Credit / Debit** | Notify when a wallet has been credited or debited by the Super User | On/off toggle |
| **Server Start/Stop** | Notify when the server has been started or stopped | On/off toggle |
| **Balance Delta Changed** | Notify when the difference between node balance and LNbits balance has changed by more than the specified amount (sats). Runs every minute. Set to 0 to disable. | Sats threshold |
| **Watchdog Limit** | Notify when the watchdog limit has been reached. Does not affect the funding source. | On/off toggle |
| **Server Status** | Send regular notifications about server status (account count, wallet count, payment stats) | Interval in hours (e.g. `24`) |
| **Incoming Payments** | Notify when a wallet has received a payment above the specified amount | Sats threshold (e.g. `1000000`) |
| **Outgoing Payments** | Notify when a wallet has sent a payment above the specified amount | Sats threshold |

### Trigger environment variables

```bash
# On/off toggles
LNBITS_NOTIFICATION_SETTINGS_UPDATE=true
LNBITS_NOTIFICATION_CREDIT_DEBIT=true
LNBITS_NOTIFICATION_SERVER_START_STOP=true
LNBITS_NOTIFICATION_WATCHDOG=true

# Sats thresholds (set to 0 to disable)
NOTIFICATION_BALANCE_DELTA_THRESHOLD_SATS=1
LNBITS_NOTIFICATION_INCOMING_PAYMENT_AMOUNT_SATS=1000000
LNBITS_NOTIFICATION_OUTGOING_PAYMENT_AMOUNT_SATS=0

# Intervals
LNBITS_NOTIFICATION_SERVER_STATUS_HOURS=24
LNBITS_WATCHDOG_INTERVAL_MINUTES=60
```

::: tip
The Balance Delta trigger compares LNbits internal accounting against the actual Lightning node balance. If they drift apart, you get an alert. This catches issues like payments settling on the node but not being recorded in LNbits.
:::

## Channel configuration

All settings are available in **Admin Dashboard > Server > Notifications**, or via `.env` variables.

### Email (SMTP)

```bash
LNBITS_EMAIL_NOTIFICATIONS_ENABLED=true
LNBITS_EMAIL_NOTIFICATIONS_EMAIL=sender@example.com
LNBITS_EMAIL_NOTIFICATIONS_SERVER=smtp.example.com
LNBITS_EMAIL_NOTIFICATIONS_PORT=587
LNBITS_EMAIL_NOTIFICATIONS_USERNAME=user@example.com
LNBITS_EMAIL_NOTIFICATIONS_PASSWORD=your-password
LNBITS_EMAIL_NOTIFICATIONS_TO_EMAILS=admin@example.com,backup@example.com
```

### Telegram

```bash
LNBITS_TELEGRAM_NOTIFICATIONS_ENABLED=true
LNBITS_TELEGRAM_NOTIFICATIONS_ACCESS_TOKEN=123456:ABC-DEF...
LNBITS_TELEGRAM_NOTIFICATIONS_CHAT_ID=-1001234567890
```

To get these values:

1. Create a bot via [@BotFather](https://t.me/BotFather) on Telegram
2. Copy the bot token
3. Add the bot to your group or start a DM with it
4. Get the chat ID (use [@userinfobot](https://t.me/userinfobot) or the Telegram API)

### Nostr DM

```bash
LNBITS_NOSTR_NOTIFICATIONS_ENABLED=true
LNBITS_NOSTR_NOTIFICATIONS_PRIVATE_KEY=nsec1...
LNBITS_NOSTR_NOTIFICATIONS_IDENTIFIERS=npub1...,npub1...
```

The private key is used to send encrypted DMs. The identifiers are the recipient npubs who receive the notifications. You can list multiple recipients separated by commas.

### Web Push (PWA)

Web push notifications work automatically for users who have installed LNbits as a Progressive Web App. No environment variables needed - VAPID keys are generated and stored in the database automatically.

Users receive push notifications for incoming payments on their wallets.

::: warning
Web push notifications do not work in incognito/private browsing mode.
:::

## How it works internally

1. Events trigger `enqueue_admin_notification()` (server events) or `enqueue_user_notification()` (user payment events)
2. A background task continuously processes the notification queue
3. Each notification is routed through all enabled channels
4. Failed deliveries are logged but don't block the system

## Related Pages

- [Admin Dashboard](/guide/admin-dashboard) - server-wide settings and monitoring
- [Configuration](/guide/core/environment) - all environment variables
- [Super User](/guide/core/super-user) - highest-privilege account
- [WebSockets](/guide/core/websockets) - real-time payment events (client-side)
- [Progressive Web App](/guide/core/pwa) - install LNbits for push notification support
