# Quick Start With LNbits SaaS

> The fastest way to try Merchant Stack is to create a hosted LNbits instance and install the merchant extensions.

LNbits SaaS gives you a full LNbits instance without running a server. Use it for real shops, demos, popups, workshops, or merchant onboarding.

## Before you start

You need:

- access to [my.lnbits.com](https://my.lnbits.com)
- a payment method supported by the selected plan
- a name or subdomain for the instance
- a decision about funding source

For a first merchant test, use the default hosted path unless you already know which Lightning backend you want to connect.

## Create an instance

1. Go to [my.lnbits.com](https://my.lnbits.com).
2. Create or sign in to your account.
3. Choose a plan and billing period.
4. Choose a subdomain.
5. Pay for the instance.
6. Wait for provisioning to finish.
7. Open the instance and complete first setup.

::: tip
Hourly or weekly billing is useful for demos, popups, events, and workshops. Monthly or yearly billing is better for ongoing merchant use.
:::

## Complete first setup

When the instance is ready:

1. Use the first install token if prompted.
2. Create the super user.
3. Choose a strong password.
4. Confirm the funding source.
5. Create or select the wallet the merchant will use for sales.

::: warning
Keep super-user access limited. Some merchant features, such as manual settlement entries or Bitcoin selling, can affect accounting records and should be controlled carefully.
:::

## Install merchant extensions

Install these first:

- [TPoS](/extensions/tpos/) for checkout
- [Inventory](/extensions/inventory/) for products
- [Orders](/extensions/orders/) for order history and notifications

Then add the extensions the merchant needs:

- [WebShop](/extensions/webshop/) for online sales
- Tabs for open balances and deferred settlement
- [WebPages](/extensions/webpages/) for same-origin shop embeds
- [Chat](/extensions/chat/) for website support flows

## First test workflow

Use a simple test before adding more complexity:

1. Create one inventory item.
2. Create one TPoS terminal.
3. Connect TPoS to the inventory item.
4. Enable Orders.
5. Open the TPoS public page.
6. Add the item to the cart.
7. Complete a small test payment.
8. Confirm the payment appears in Orders.
9. Confirm stock changed as expected.

## What to configure next

After the first test payment:

- add the real product catalog
- configure staff or owner notifications
- configure receipt details
- add card payments if needed
- set up printing and hardware
- add WebShop for online sales
- add Tabs for hospitality or account workflows

## Related pages

- [LNbits SaaS](/guide/installation/saas)
- [TPoS setup](/merchant-stack/tpos)
- [Inventory setup](/merchant-stack/inventory)
- [Orders setup](/merchant-stack/orders)

