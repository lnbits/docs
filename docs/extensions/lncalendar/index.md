<ExtensionHeader
  name="LNCalendar"
  description="Paid scheduling — like Calendly with Bitcoin."
  category="Events & Streaming"
  icon="📅"
  repo="lnbits/lncalendar"
/>

## Overview

LNCalendar lets you create schedules and accept paid appointments via Lightning. Set your availability, define a price per appointment slot, and share a public booking page. Clients browse available times, book a slot, and pay with Lightning.

## How It Works

1. Create a schedule with your available days and hours
2. Set a price per appointment (in sats or fiat)
3. Share the public booking page
4. Clients select a time, fill in their details, and pay the Lightning invoice
5. View and manage your appointments in the extension

## Features

- **Weekly availability** — set start/end days and hours
- **Paid bookings** — Lightning payment required to confirm an appointment
- **Fiat pricing** — set prices in fiat currency with automatic sat conversion at booking time
- **Unavailable dates** — block out specific days
- **Calendar view** — see all appointments on a visual calendar
- **Appointment details** — name, email (optional), and message from the client

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Click **New Schedule** and configure:
   - Select a wallet for receiving payments
   - Set a schedule name
   - Choose available weekdays and hours
   - Set a cost per appointment
3. Share the public page link with clients

### Managing Appointments

- View appointments on the main extension page under **Appointments**
- Click the settings button on a schedule to see the calendar and appointment details
- Use the **Set Unavailable** tab to block out dates

## API Reference

See the [LNCalendar API documentation](./api) for endpoint details.

## Related Pages

- [LNCalendar API Reference](./api): API endpoints for this extension
- [All Extensions](/extensions/): Browse all LNbits extensions
