<ExtensionHeader
  name="Events"
  description="Event management with Lightning ticketing."
  category="Events & Streaming"
  icon="🎪"
  repo="lnbits/events"
/>

## Overview

Events lets you create ticketed events with Lightning payments. After paying, attendees receive a unique QR code ticket. At the venue, use the built-in ticket scanner to verify and check in attendees. Includes registration deadlines, event date ranges, and a shareable event page.

## Features

- **Event creation** — set name, description, dates, and ticket price
- **Lightning ticketing** — attendees pay via Lightning to get a ticket
- **QR code tickets** — unique QR code generated per ticket after payment
- **Built-in scanner** — shareable ticket scanner for check-in at the door
- **Registration deadline** — close registration before the event starts
- **Attendee tracking** — see who has registered and checked in

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Create a new event:
   - Set the event name and description
   - Select the wallet for ticket payments
   - Set closing date for registration
   - Set event start and end dates
   - Set ticket price
3. Share the event registration link
4. Use the ticket scanner at the venue to check in attendees

## Use Cases

- **Meetups** — sell tickets for Bitcoin meetups
- **Conferences** — ticketing with Lightning and QR check-in
- **Workshops** — paid registration with attendance tracking
- **Parties** — sell entry tickets with a door scanner

## API Reference

See the [Events API documentation](./api) for endpoint details.

## Related Pages

- [Events API Reference](./api): API endpoints for this extension
- [LN Ticket](/extensions/lnticket/): Paid support tickets (different concept)
- [LNCalendar](/extensions/lncalendar/): Paid scheduling
- [All Extensions](/extensions/): Browse all LNbits extensions
