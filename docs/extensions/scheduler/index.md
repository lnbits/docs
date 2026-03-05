<ExtensionHeader
  name="Scheduler"
  description="Schedule recurring Lightning payments."
  category="Utilities & Tools"
  icon="🗓️"
  repo="lnbits/scheduler"
/>

## Overview

Scheduler (previously "crontabs") lets you create, edit, and monitor scheduled HTTP calls directly from the LNbits admin panel. Define a cron schedule, point it at any URL with custom headers and body, and Scheduler handles the rest via the system crontab.

## Features

- **Cron scheduling** — use standard 5-field cron expressions for flexible timing
- **HTTP methods** — supports GET, PUT, POST, and DELETE actions
- **Custom headers and body** — configure request payloads per job
- **Job controls** — start, stop, test, edit, and delete from the main panel
- **Three log levels** — individual job logs, test logs, and full extension logs
- **Admin-only** — should be limited to admin accounts for security

## Prerequisites

::: warning
The system user running LNbits **must** have `crontab -e` permissions to read/write the crontab file.
:::

The `run_cron_job.py` file must be executable:

```bash
chmod +x run_cron_job.py
```

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Open Scheduler from the sidebar
3. Click **New Scheduled Job** to create a job:
   - Enter a name for your job
   - Select an HTTP action (GET/PUT/POST/DELETE)
   - Enter the target URL
   - Add headers and body data if needed
   - Set the cron schedule (use [crontab.guru](https://crontab.guru) to validate)
4. Save the job, then start it from the main panel (green arrow)

## Use Cases

- **Recurring payments** — schedule periodic API calls to send payments
- **Data collection** — periodically fetch data from external APIs
- **Maintenance tasks** — automate cleanup or reporting jobs
- **Webhook triggers** — call webhooks on a schedule

## API Reference

See the [Scheduler API documentation](./api) for endpoint details.

## Related Pages

- [Scheduler API Reference](./api): API endpoints for this extension
- [All Extensions](/extensions/): Browse all LNbits extensions
