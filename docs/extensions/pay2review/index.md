<ExtensionHeader
  name="Pay2Review"
  description="Charge sats for reviews — anti-sock-puppet."
  category="Social & Nostr"
  icon="📝"
  repo="lnbits/pay2review"
/>

## Overview

Pay2Review (P2R) adds a cost to leaving reviews. While you can make fake reviews harder with login systems, adding a Lightning payment makes it expensive to leave multiple fake reviews. Each review requires a Lightning payment, discouraging spam and sock puppets.

## How It Works

1. Create a review collection with a price per review
2. Share the public review page
3. Reviewers pay a Lightning invoice before submitting their review
4. Reviews include star ratings and text feedback
5. View all reviews in the admin dashboard

## Use Cases

- **Product reviews** — collect genuine paid reviews for products or services
- **Feedback collection** — charge a small fee to filter out low-effort responses
- **Anti-spam reviews** — make it costly to leave fake reviews
- **Restaurant/venue reviews** — quality feedback from verified paying customers

## Features

- Star rating system
- Lightning-gated review submission
- Public review display page
- Admin dashboard for managing reviews

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Create a new review collection with a price per review
3. Share the review page link
4. Monitor incoming reviews in the dashboard

## API Reference

See the [Pay2Review API documentation](./api) for endpoint details.

## Related Pages

- [Pay2Review API Reference](./api): API endpoints for this extension
- [Paid Reviews](/extensions/paidreviews/): Similar review extension
- [All Extensions](/extensions/): Browse all LNbits extensions
