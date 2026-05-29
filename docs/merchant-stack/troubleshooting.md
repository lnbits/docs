# Troubleshooting Merchant Stack

> Start with the workflow that failed: SaaS setup, payment, inventory, order capture, hardware, or notifications.

## SaaS instance is not ready

Try:

- wait a few minutes for provisioning
- refresh the SaaS dashboard
- confirm the payment was completed
- check whether the instance has an admin URL
- use the first install token if prompted

See [LNbits SaaS](/guide/installation/saas) for the hosted setup flow.

## Products do not appear in TPoS

Check:

- Inventory extension is enabled
- products are active and in stock
- the TPoS is configured to use Inventory
- tags or categories match the TPoS filter
- the TPoS page was refreshed after changes

## Orders are not captured

Check:

- Orders extension is enabled for the user
- the payment actually settled
- the order source is TPoS or WebShop
- notification settings are not being confused with order capture

## Card tap-to-pay does not work

Check:

- Stripe is configured as the fiat provider
- the Android device supports NFC
- the device is compatible with Stripe tap-to-pay requirements
- the TPoS Wrapper app is installed
- the Stripe Terminal location ID is correct
- the LNbits ACL token includes the needed fiat permission
- the device is online

## QR pairing does not scan

Try:

- increase screen brightness
- open the QR code on a white background
- move away from glare
- clean the device camera
- use a larger display
- retry after saving the TPoS settings

## Printer does not print

Check:

- printer is powered on
- printer is paired or available to the device
- TPoS Wrapper app can see the printer
- test print works
- paper is loaded
- receipt width matches printer paper
- silent printing permission is available

## Notifications do not arrive

Check:

- notification target is configured correctly
- Telegram chat ID, Nostr npub, or email address is valid
- global notification settings are configured if required
- the order was captured
- spam filters for email

## Related pages

- [Quick Start](/merchant-stack/quick-start)
- [TPoS](/merchant-stack/tpos)
- [Orders](/merchant-stack/orders)
- [Hardware and printing](/merchant-stack/hardware)

