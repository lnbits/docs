<ExtensionHeader
  name="WebPages"
  description="Admin-only HTML/CSS/JS page editor."
  category="Utilities & Tools"
  icon="🌐"
  repo="lnbits/webpages"
/>

## Overview

WebPages is a built-in page editor that lets admins create and manage static HTML, CSS, and JavaScript files served directly from your LNbits instance. Use it to build landing pages, documentation, or any custom web content — all hosted alongside your LNbits installation.

## Features

- **Create and edit** `.html`, `.css`, and `.js` files
- **Upload images** — PNG, JPG, GIF, WebP, SVG, ICO, AVIF
- **Live HTML preview** while editing
- **Autosave** support
- **File management** — list, delete, and organize files
- **Public access** — static pages are public routes by design
- **Admin-protected editing** — only admins can create and modify files

## Use Cases

- **Landing pages** — create a public homepage for your LNbits instance
- **Documentation** — host custom docs alongside your LNbits
- **Payment pages** — build custom payment interfaces using the LNbits API
- **Branding** — create branded pages that match your business

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Open WebPages from the admin sidebar
3. Create or edit files — they're served at `/webpages/static/pages/<file>`

### Reverse Proxy Setup

To serve pages at your domain root (e.g., `yoursite.com` instead of `yoursite.com/webpages/static/pages/index.html`), configure your reverse proxy to rewrite paths. The extension includes a Caddyfile sample dialog with a ready-made configuration.

## API Reference

See the [WebPages API documentation](./api) for endpoint details.

## Related Pages

- [WebPages API Reference](./api): API endpoints for this extension
- [WebShop](/extensions/webshop/): Embeddable web shop
- [Reverse Proxy](/guide/installation/reverse-proxy): Proxy setup for clean URLs
- [All Extensions](/extensions/): Browse all LNbits extensions
