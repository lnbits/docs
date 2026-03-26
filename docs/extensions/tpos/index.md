<ExtensionHeader
  name="TPoS"
  description="Touch-friendly point-of-sale terminal."
  category="Payments & Commerce"
  icon="🏪"
  repo="lnbits/tpos"
/>

## Features

- **Create invoices** — instant Lightning QR invoices
- **Tipping** — percentages or rounding, split to a tip wallet
- **Item management** — products, cart, JSON import/export
- **OTC ATM** — LNURL withdraw limits and cooldown
- **Stripe fiat payment integration** — accept tap-to-pay via Stripe
- **Tax settings** — global/per-item, inclusive or exclusive

## Overview

TPoS lets you take Lightning payments right from the browser. Every TPoS runs isolated from your main wallet for safer staff use and multi-branch setups, and you can create as many terminals as you need.

## Usage

1. **Enable** the extension.

2. **Create** a TPoS.

   <img src="https://github.com/user-attachments/assets/68b875c8-95fd-45eb-acf4-3ad5a7af3cd7" alt="Create a TPoS" width="720">

3. **Open** TPoS in the browser.

   <img src="https://github.com/user-attachments/assets/cc0a1362-c4ac-467e-9e7b-7e0206464882" alt="Open TPoS" width="720">

4. **Present** the invoice QR to the customer.

   <img src="https://github.com/user-attachments/assets/1d5341e2-cfba-45d5-b2c5-99f61a3d07a4" alt="Invoice QR" width="720">

## Receiving Tips

1. Create or edit a TPoS and activate **Enable tips**.

   <img src="https://github.com/user-attachments/assets/02d4f3d7-ddfb-46a7-a33d-cbc3f3768278" alt="Enable tips" width="720">

2. Fill in:

   - Wallet to receive tips
   - Tip percentages (press Enter after each)
   - If no values are set, a default **Rounding** option is available

3. In TPoS, set an amount and click **OK**.

   <img src="https://github.com/user-attachments/assets/563bc869-2d82-4e0f-9227-ec040bcf8f5e" alt="Enter amount" width="720">

4. A tip dialog appears.

   <img src="https://github.com/user-attachments/assets/ae45b268-efd6-4d30-8840-efaa52430bcf" alt="Tip selection dialog" width="720">

5. Select a percentage or **Round to**.

   <img src="https://github.com/user-attachments/assets/707a0576-cc80-44db-9f0b-b496707ab3bc" alt="Select tip or round" width="720">

6. Present the updated invoice to the customer.

   <img src="https://github.com/user-attachments/assets/c35a0a42-a620-49ca-b248-907f7923c5ce" alt="Invoice with tip" width="720">

7. After payment the tip is sent to the defined wallet (e.g., employee wallet) and the rest to the main wallet.

   <img src="https://github.com/user-attachments/assets/b8fa8344-f164-4bd8-869d-6ca8d342ef9a" alt="Tip distribution" width="720">

## LN Address Funding

Some deployments require sharing revenue from every payment made through a TPoS.  
This feature allows you to automatically forward a defined percentage of each received payment  
to a specific Lightning Address.

This is especially useful when:

- **You host an LNbits server** and give a TPoS to a vendor, and you want to receive a **host fee / revenue share**, or
- **Two participants share one TPoS**, and a portion of each incoming payment should automatically go to a partner, co-owner, or collaborator.

In these cases, the function helps identify the **initial TPoS initiator** and forward their share without manual reconciliation.

### How it works

1. Open or edit a TPoS.
2. Enable **LN Address Funding**.
3. Enter:
   - **Lightning Address** of the recipient (e.g., `alice@yourdomain.com`)
   - **Percentage share** (e.g., `10` for 10%)  
     <img width="504" height="426" alt="Bildschirmfoto 2025-11-25 um 04 02 20" src="https://github.com/user-attachments/assets/4e4eb317-96bc-4094-9a9d-8dea69748d55" />

When a customer pays:

- TPoS receives the full Lightning payment.
- The extension splits the amount automatically.
- The defined percentage is forwarded to the configured Lightning Address.

This happens instantly, with no extra setup and no additional wallets required.

## Adding Items to PoS

You can add items to a TPoS and use an item list for sales.

1. After creating or opening a TPoS, click the **expand** button.

   <img src="https://i.imgur.com/V468a7q.png" alt="Expand items" width="720">

   Then you can:

   - Add items
   - Delete all items
   - Import or export items via JSON

2. Click **Add Item** and fill in details (title and price are mandatory).

   <img src="https://i.imgur.com/dNQGFXa.png" alt="Add item dialog" width="720">

3. Or import a JSON with your products using this format:

```json
[
  {
    "image": "https://image.url",
    "price": 1.99,
    "title": "Item 1",
    "tax": 3.5,
    "disabled": false
  },
  {
    "price": 0.99,
    "title": "Item 2",
    "description": "My cool Item #2"
  }
]
```

After adding products, the TPoS defaults to the **Items View** (PoS view):

<img src="https://i.imgur.com/Adh0fdO.png" alt="Items view" width="720">

Click **Add** to add to a cart / total:

<img src="https://i.imgur.com/uZCQpZD.png" alt="Add to cart" width="720">

Click **Pay** to show the invoice for the customer. To use the regular keypad TPoS, switch via the bottom button.

**Regular TPoS also supports adding to total:** enter a value and click `+`, repeat as needed, then click **OK**.

<img src="https://i.imgur.com/DSOusVA.png" alt="Add custom value" width="720">

## OTC ATM Functionality

1. Create or edit a TPoS and activate **Enable selling bitcoin**. Configure:
   - Maximum withdrawable per day
   - Cooldown between withdrawals (min. 1 minute)

<img src="https://github.com/user-attachments/assets/6772311f-6bb3-42cd-b2eb-6b9db971e174" alt="ATM settings" width="520">

2. Open the TPoS, then tap the **ATM** button.

<img src="https://github.com/user-attachments/assets/d016e798-38f2-4e79-99fb-c0b91b8ae1dd" alt="ATM button" width="520">

> [!WARNING]
> The red badge centered at the top indicates you are in ATM mode.

3. Set the amount to sell and present the **LNURLw** QR to the buyer.

<img src="https://github.com/user-attachments/assets/806fc6e6-9a75-4462-a3cc-382ce88ff1a6" alt="Withdraw QR" width="720">

4. After a successful withdrawal, a confirmation appears and TPoS exits ATM mode.

<img src="https://github.com/user-attachments/assets/8eee3198-061a-419f-99a2-f954a88ff845" alt="Withdrawal success" width="720">

> [!NOTE]
> OTC ATM requires a signed-in account. When sharing a TPoS, be signed in or have the login details ready.

- **Today:** If you are not signed in, you will see a **Not logged in** error.
- **Coming soon:** A feedback dialog will appear and prompt you to sign in.

<img src="https://github.com/user-attachments/assets/b7e29f99-de21-474f-bf57-e0170cec15e9" alt="Not logged in feedback" width="520">

## Tax Settings

By default, tax is included in price. Set a default tax rate (%) (e.g., 13). Items can override this with their own tax value.

- **Tax Exclusive** — tax is applied on top of the unit price.
- **Tax Inclusive** — unit price already includes tax.

In the keypad PoS, the default tax is used and is always included in the value.

<img src="https://github.com/user-attachments/assets/ab02a1be-670c-42c5-be6e-722e9c549e83" alt="Tax settings" width="720">

---

## API Reference

See the [TPoS API documentation](./api) for endpoint details.

## Related Pages

- [TPoS API Reference](./api): API endpoints for this extension
- [All Extensions](https://extensions.lnbits.com): Browse all LNbits extensions
