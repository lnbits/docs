<ExtensionHeader
  name="Events"
  description="Event management with Lightning ticketing."
  category="Events & Streaming"
  icon="🎪"
  repo="lnbits/events"
/>

## Sell tickets for events and use the built-in scanner for registering attendees

Events allows you to create tickets for an event. Each ticket is in the form of a unique QR code. After registering and paying, the user gets a QR code to present at registration/entrance.

Events includes a shareable ticket scanner, which can be used to register attendees.

## Usage

1. Create an event\
   ![create event](https://i.imgur.com/dadK1dp.jpg)
2. Fill out the event information:

   - event name
   - wallet (normally there's only one)
   - event information
   - closing date for event registration
   - begin and end date of the event

   ![event info](https://imgur.com/KAv68Yr.jpg)

3. Share the event registration link\
   ![event ticket](https://imgur.com/AQWUOBY.jpg)

   - ticket example\
     ![ticket example](https://i.imgur.com/trAVSLd.jpg)

   - QR code ticket, presented after invoice paid, to present at registration\
     ![event ticket](https://i.imgur.com/M0ROM82.jpg)

4. Use the built-in ticket scanner to validate registered, and paid, attendees\
   ![ticket scanner](https://i.imgur.com/zrm9202.jpg)

## API Reference

See the [Events API documentation](./api) for endpoint details.

## Related Pages

- [Events API Reference](./api): API endpoints for this extension
- [All Extensions](https://extensions.lnbits.com): Browse all LNbits extensions
