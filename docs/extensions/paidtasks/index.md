<ExtensionHeader
  name="PaidTasks"
  description="Paid task lists with public payment pages."
  category="Management"
  icon="✅"
  repo="lnbits/paidtasks"
/>

## Overview

PaidTasks lets you create lists of tasks that people can pay to complete. Share a public page for each list — when someone pays the Lightning invoice for a task, it's marked as paid automatically. Built as a WASM extension.

## How It Works

1. Create a task list and add tasks with prices in sats
2. Share the public page link
3. When someone pays a task's invoice, the task is marked as paid
4. The public page updates in real-time via WebSocket

## Use Cases

- **Bounties** — offer sats for completing specific tasks
- **Crowdfunding tasks** — let supporters fund specific project items
- **Freelance work** — list services with prices for clients to pay
- **Community contributions** — paid task boards for open-source projects

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Grant the required permissions (database access, invoice creation, payment watching)
3. Create a list and add tasks with prices
4. Share the public page URL

## API Reference

See the [PaidTasks API documentation](./api) for endpoint details.

## Related Pages

- [PaidTasks API Reference](./api): API endpoints for this extension
- [All Extensions](/extensions/): Browse all LNbits extensions
