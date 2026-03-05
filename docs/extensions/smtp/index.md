<ExtensionHeader
  name="SMTP"
  description="Charge sats for sending emails."
  category="Utilities & Tools"
  icon="📧"
  repo="lnbits/smtp"
/>

## Overview

The SMTP extension lets you set up email addresses powered by your SMTP server and charge a Lightning fee for sending emails through them. Share a public email form — users pay sats to send a message.

## Requirements

- An SMTP server (Gmail, SendGrid, self-hosted, etc.)

## How It Works

1. Configure an email address with your SMTP credentials
2. Share the public email form link
3. Users fill in the form and pay a Lightning invoice to send the email
4. The email is delivered via your SMTP server

## Use Cases

- **Paid contact forms** — charge a small fee to reduce spam
- **Anonymous email** — let people send emails without creating accounts
- **Paid newsletters** — charge per message sent
- **Support requests** — filter out low-effort requests with a cost

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Create a new email address with your SMTP server details
3. A test email is sent automatically to verify the configuration
4. Share the public email form link

## API Reference

See the [SMTP API documentation](./api) for endpoint details.

## Related Pages

- [SMTP API Reference](./api): API endpoints for this extension
- [Chat](/extensions/chat/): Live support chat
- [All Extensions](/extensions/): Browse all LNbits extensions
