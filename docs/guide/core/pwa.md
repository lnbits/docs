# Progressive Web App (PWA)

> LNbits works as a Progressive Web App - install it on your phone or desktop for a native app experience, no app store needed.

## What is a PWA?

A Progressive Web App is a website that can be installed on your device and used like a native app. LNbits ships with full PWA support out of the box - you get:

- **Home screen icon** - launch LNbits like any other app
- **Fullscreen mode** - no browser chrome, just LNbits
- **Offline indicator** - shows connection status
- **Push-ready** - works with the notification system
- **Instant access** - no app store, no downloads, no updates to manage

## Install LNbits as an App

### Android (Chrome)

1. Open your LNbits instance in Chrome
2. Tap the **three-dot menu** (top right)
3. Tap **"Add to Home screen"** or **"Install app"**
4. Confirm the installation
5. LNbits appears as an app icon on your home screen

### iOS (Safari)

1. Open your LNbits instance in Safari
2. Tap the **Share button** (bottom center)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **Add**
5. LNbits appears as an app icon on your home screen

::: tip
On iOS, only Safari supports PWA installation. Chrome and Firefox on iOS cannot install PWAs.
:::

### Desktop (Chrome / Edge)

1. Open your LNbits instance in Chrome or Edge
2. Click the **install icon** in the address bar (or Menu → "Install LNbits")
3. Confirm the installation
4. LNbits opens in its own window without browser UI

## Why Use the PWA?

| Feature | Browser | PWA |
| --- | --- | --- |
| Home screen icon | No | Yes |
| Fullscreen (no URL bar) | No | Yes |
| Separate window (desktop) | No | Yes |
| Task switcher entry | No | Yes |
| Quick launch | Bookmark | App icon |

The PWA is especially useful for:

- **Merchants** using [TPoS](/extensions/tpos/) - fullscreen point-of-sale on a tablet
- **Mobile wallets** - quick access to send and receive Lightning payments
- **Shared devices** - each user can install their own LNbits instance as a separate app

## For Instance Operators

LNbits ships with a `manifest.json` and service worker that enable PWA functionality automatically. No additional configuration is needed.

If you customize your instance branding (site title, theme color), the PWA will reflect those settings.

## Related Pages

- [TPoS](/extensions/tpos/): Touch-friendly point-of-sale - works great as a PWA
- [First Setup](/guide/installation/first-setup): Post-install configuration
- [Core Features](/guide/core/): All core LNbits features
