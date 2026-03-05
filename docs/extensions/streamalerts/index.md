<ExtensionHeader
  name="Stream Alerts"
  description="Bitcoin donations in Streamlabs alerts."
  category="Tips & Donations"
  icon="📺"
  repo="lnbits/streamalerts"
/>

## Overview

Stream Alerts connects LNbits with Streamlabs to show Lightning donations as stream alerts. When viewers send sats to your donation page, the alert appears in your streaming overlay alongside regular fiat donations — complete with donor name, message, and amount.

## How It Works

1. Link your Streamlabs account to LNbits
2. Create a donation service with a linked LNbits wallet
3. Share the donation page URL with your audience
4. When viewers pay, the donation appears in your Streamlabs alerts overlay

## Requirements

- A [Streamlabs](https://streamlabs.com) account linked to your Twitch, YouTube, or Facebook streaming account
- A Streamlabs app registration (for API access)
- LNbits instance accessible over clearnet

## Setup

1. Log into [Streamlabs](https://streamlabs.com) and register an app via **API Settings**
2. Set the app fields (the whitelist username must be a Twitch account you control)
3. Set the redirect URI to `http://localhost` temporarily
4. In LNbits, enable the **Stream Alerts** extension
5. Create a new service with your Streamlabs Client ID and Secret
6. Copy the **Redirect URI for Streamlabs** from LNbits and update it in your Streamlabs app settings
7. Click the authenticate button in LNbits and follow the Streamlabs login flow
8. Once authenticated, share the donation page link with your audience

::: tip
Optionally enable the **SatsPay** extension to observe donations directly, and **Watch Only** to accept on-chain donations alongside Lightning.
:::

## API Reference

See the [Stream Alerts API documentation](./api) for endpoint details.

## Related Pages

- [Stream Alerts API Reference](./api): API endpoints for this extension
- [TipJar](/extensions/tipjar/): Accept tips with Lightning
- [Livestream](/extensions/livestream/): Accept payments during livestreams
- [All Extensions](/extensions/): Browse all LNbits extensions
