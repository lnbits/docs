# General FAQ

> Common questions about what LNbits is, how it works, and where to find help.

[[toc]]

## What is LNbits?

LNbits is a free and open-source Lightning Network wallet and accounts system. It sits on top of a Lightning node (or hosted service) and provides multi-user wallets, an extension platform, and a REST API. Think of it as a layer between your Lightning node and your users - it handles accounts, permissions, and extensible functionality while the node handles the actual Lightning payments.

## Is LNbits custodial?

Yes - the LNbits instance operator has access to all funds. Users of a shared instance trust the operator. For self-sovereign use, run your own instance connected to your own Lightning node.

## Is LNbits free and open-source?

Yes. LNbits is released under the MIT License. You can use it for personal, commercial, or educational purposes without fees or restrictions. The source code is available on [GitHub](https://github.com/lnbits/lnbits).

## Who maintains LNbits?

LNbits is maintained by a community of open-source contributors. There is no company behind it - development is funded by donations and grants from the Bitcoin ecosystem. Core contributors coordinate through GitHub and Telegram.

## What language is LNbits built with?

The backend is written in **Python** using the FastAPI framework with an async architecture. The frontend uses **Vue.js 3** with the Quasar UI framework. The API follows REST conventions with JSON payloads. See [Architecture](/dev/architecture) for details.

## How is LNbits different from BTCPay Server?

BTCPay Server is a self-hosted payment processor focused on merchant checkout flows. LNbits is a wallet and accounts platform focused on multi-user wallet management and extensibility. Key differences:

| | LNbits | BTCPay Server |
|---|---|---|
| **Focus** | Multi-user wallets + extensions | Merchant payment processing |
| **Users** | Multiple users per instance | Typically one merchant per store |
| **Extensions** | 40+ plugins (PoS, ATM, paywall, etc.) | Plugins focused on e-commerce |
| **Backend** | Python / FastAPI | C# / .NET |
| **Node** | Uses existing node as funding source | Often bundles its own node |

They complement each other - many setups use both.

## Is there a mobile app?

LNbits itself is a web application, but you can connect mobile Lightning wallets to it using the **LNDhub** extension. Apps like [BlueWallet](https://bluewallet.io/) and [Zeus](https://zeusln.app/) can connect to your LNbits wallet via the LNDhub protocol, giving you a mobile interface to your LNbits balance.

## Can I install LNbits as an app on my phone?

Yes. LNbits is a Progressive Web App (PWA) - you can install it directly from your browser, no app store needed. On Android, open LNbits in Chrome and tap "Add to Home screen". On iOS, use Safari and tap Share → "Add to Home Screen". It runs fullscreen like a native app. See the [PWA guide](/guide/core/pwa) for step-by-step instructions.

## Can I use LNbits for my business?

Yes. LNbits is well-suited for businesses that need:

- **Point-of-sale** - use the TPoS extension
- **Payment pages** - use SatsPay for Lightning + on-chain invoices
- **Tipping** - use the TipJar extension
- **Revenue sharing** - use Split Payments for automatic splits
- **Paywalls** - gate content behind Lightning payments
- **Customer accounts** - create separate wallets per customer

See [Hardware & Merchants FAQ](/guide/faq/hardware) for physical setup options.

## Where can I get help and support?

- **Telegram**: [t.me/lnbits](https://t.me/lnbits) - the most active community channel
- **GitHub Issues**: [github.com/lnbits/lnbits/issues](https://github.com/lnbits/lnbits/issues) - for bug reports and feature requests
- **GitHub Discussions**: [github.com/lnbits/lnbits/discussions](https://github.com/lnbits/lnbits/discussions) - for general questions
- This documentation site - searchable with the search bar above

## How can I contribute?

There are many ways to contribute:

- **Code** - submit pull requests on [GitHub](https://github.com/lnbits/lnbits)
- **Documentation** - improve these docs via the "Edit this page" link
- **Extensions** - build and publish your own extensions
- **Testing** - report bugs and test pre-release versions
- **Translation** - help translate the UI into other languages

See the [Contributing Guide](/dev/contributing) for development setup and conventions.

## What's the Super User?

The Super User is the top-level administrator of an LNbits instance. The Super User can:

- Access the Admin Dashboard
- Manage server settings, extensions, and users
- Top up wallets and manage funding sources
- Reset or transfer the Super User role

The Super User is created during [first setup](/guide/installation/first-setup). See [Super User](/guide/core/super-user) for full details.

## What are the three user roles?

LNbits has a three-role permission model:

| Role | Capabilities |
|---|---|
| **Admin** | Full access to Admin Dashboard, server settings, user management |
| **User** | Create wallets, use enabled extensions, make payments |
| **Extension User** | Limited access scoped to specific extension functionality |

See [User Roles](/guide/core/user-roles) for details.

## Related Pages

- [What is LNbits?](/guide/what-is-lnbits) - overview and core concepts
- [Concepts](/guide/concepts) - key terms and ideas
- [Super User](/guide/core/super-user) - Super User documentation
- [Contributing](/dev/contributing) - development setup and conventions
