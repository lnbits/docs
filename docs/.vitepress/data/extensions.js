/**
 * Single source of truth for all LNbits extension metadata.
 * Used by: generation script, extensions index page, sidebar config.
 */
export const EXTENSIONS = [
  // ── Payments & Commerce ──
  { id: 'lnurlp', name: 'LNURLp', category: 'Payments & Commerce', icon: '🔗', description: 'Create static LNURL-pay links and branded payment pages.', repo: 'lnbits/lnurlp' },
  { id: 'tpos', name: 'TPoS', category: 'Payments & Commerce', icon: '🏪', description: 'Touch-friendly point-of-sale terminal.', repo: 'lnbits/tpos' },
  { id: 'satspay', name: 'SatsPay', category: 'Payments & Commerce', icon: '💳', description: 'Payment pages accepting on-chain and Lightning.', repo: 'lnbits/satspay' },
  { id: 'paywall', name: 'Paywall', category: 'Payments & Commerce', icon: '🚧', description: 'Gate content or URLs behind Lightning payments.', repo: 'lnbits/paywall' },
  { id: 'sellcoins', name: 'Sell Coins', category: 'Payments & Commerce', icon: '🪙', description: 'Sell Bitcoin with various payment methods.', repo: 'lnbits/sellcoins' },
  { id: 'invoices', name: 'Invoices', category: 'Payments & Commerce', icon: '🧾', description: 'Create and manage professional invoices.', repo: 'lnbits/invoices' },
  { id: 'market', name: 'Market', category: 'Payments & Commerce', icon: '🛒', description: 'Online marketplace with Lightning payments.', repo: 'lnbits/market' },
  { id: 'offlineshop', name: 'Offline Shop', category: 'Payments & Commerce', icon: '🏷️', description: 'Receive payments offline with printed QR codes.', repo: 'lnbits/offlineshop' },
  { id: 'webshop', name: 'WebShop', category: 'Payments & Commerce', icon: '🛍️', description: 'Embeddable web shop with Lightning checkout.', repo: 'lnbits/webshop' },
  { id: 'telegramshop', name: 'Telegram Shopping', category: 'Payments & Commerce', icon: '🤖', description: 'Lightning-powered storefront inside Telegram Mini App.', repo: 'lnbits/telegramshop' },

  // ── Wallet Tools ──
  { id: 'watchonly', name: 'Watch Only', category: 'Wallet Tools', icon: '👁️', description: 'Monitor on-chain wallets via xpub/zpub without spending keys.', repo: 'lnbits/watchonly' },
  { id: 'splitpayments', name: 'Split Payments', category: 'Wallet Tools', icon: '✂️', description: 'Automatically split incoming payments to multiple wallets.', repo: 'lnbits/splitpayments' },
  { id: 'scrub', name: 'Scrub', category: 'Wallet Tools', icon: '🧹', description: 'Forward all incoming payments to an external wallet.', repo: 'lnbits/scrub' },
  { id: 'nwcprovider', name: 'NWC Provider', category: 'Wallet Tools', icon: '📡', description: 'Serve as a Nostr Wallet Connect provider.', repo: 'lnbits/nwcprovider' },
  { id: 'lndhub', name: 'LndHub', category: 'Wallet Tools', icon: '🔐', description: 'LndHub-compatible interface for BlueWallet and Zeus.', repo: 'lnbits/lndhub' },

  // ── Tips & Donations ──
  { id: 'withdraw', name: 'Withdraw', category: 'Tips & Donations', icon: '🎟️', description: 'Create LNURL-withdraw links (vouchers, faucets).', repo: 'lnbits/withdraw' },
  { id: 'tipjar', name: 'Tip Jar', category: 'Tips & Donations', icon: '🫙', description: 'Accept Lightning tips with messages attached.', repo: 'lnbits/tipjar' },
  { id: 'streamalerts', name: 'Stream Alerts', category: 'Tips & Donations', icon: '📺', description: 'Bitcoin donations in Streamlabs alerts.', repo: 'lnbits/streamalerts' },
  { id: 'raisenow', name: 'RaiseNow', category: 'Tips & Donations', icon: '🏆', description: 'Time-based fundraising with live leaderboards.', repo: 'lnbits/raisenow' },

  // ── Hardware & Devices ──
  { id: 'boltcards', name: 'Bolt Cards', category: 'Hardware & Devices', icon: '💳', description: 'Self-custody NFC cards with one-time LNURLw links.', repo: 'lnbits/boltcards' },
  { id: 'bitcoinswitch', name: 'Bitcoin Switch', category: 'Hardware & Devices', icon: '🔌', description: 'Turn things on with bitcoin - IoT device control.', repo: 'lnbits/bitcoinswitch_extension' },
  { id: 'fossa', name: 'FOSSA', category: 'Hardware & Devices', icon: '🏧', description: 'Bitcoin ATM - sell bitcoin for cash.', repo: 'lnbits/fossa' },
  { id: 'lnpos', name: 'LNPoS', category: 'Hardware & Devices', icon: '📟', description: 'Hardware Lightning point-of-sale terminal.', repo: 'lnbits/lnpos' },
  { id: 'lnurldevice', name: 'LNURL Device', category: 'Hardware & Devices', icon: '📱', description: 'Legacy hardware integration (deprecated - use Bitcoin Switch, FOSSA, LNPoS).', repo: 'lnbits/lnurldevice' },

  // ── Swaps ──
  { id: 'boltz', name: 'Boltz', category: 'Swaps', icon: '🔄', description: 'Submarine and reverse submarine swaps (on-chain ↔ Lightning).', repo: 'lnbits/boltz' },
  { id: 'deezy', name: 'Deezy', category: 'Swaps', icon: '🔁', description: 'On-chain ↔ Lightning swaps via Deezy.', repo: 'lnbits/deezy' },

  // ── Social & Nostr ──
  { id: 'nostrclient', name: 'Nostr Client', category: 'Social & Nostr', icon: '🔀', description: 'Always-on Nostr relay multiplexer.', repo: 'lnbits/nostrclient' },
  { id: 'nostrmarket', name: 'Nostr Market', category: 'Social & Nostr', icon: '🟣', description: 'Nostr-based marketplace for Lightning commerce.', repo: 'lnbits/nostrmarket' },
  { id: 'nostrnip5', name: 'Nostr NIP-5', category: 'Social & Nostr', icon: '✅', description: 'Sell Nostr NIP-05 verification identifiers.', repo: 'lnbits/nostrnip5' },
  { id: 'nostrrelay', name: 'Nostr Relay', category: 'Social & Nostr', icon: '📨', description: 'Run a paid Nostr relay with Lightning.', repo: 'lnbits/nostrrelay' },
  { id: 'chat', name: 'Chat', category: 'Social & Nostr', icon: '💬', description: 'Live support chat with paid messages and embeddable widget.', repo: 'lnbits/chat' },
  { id: 'paidreviews', name: 'Paid Reviews', category: 'Social & Nostr', icon: '⭐', description: 'Collect reviews with Lightning-gated submission.', repo: 'lnbits/paidreviews' },
  { id: 'pay2review', name: 'Pay2Review', category: 'Social & Nostr', icon: '📝', description: 'Charge sats for reviews - anti-sock-puppet.', repo: 'lnbits/pay2review' },
  { id: 'auctionhouse', name: 'Auction House', category: 'Social & Nostr', icon: '🔨', description: 'Run Lightning-powered auctions.', repo: 'lnbits/auctionhouse' },

  // ── Games & Gambling ──
  { id: 'coinflip', name: 'Coinflip', category: 'Games & Gambling', icon: '🪙', description: 'Bet sats on coinflips - winner takes all.', repo: 'lnbits/coinflip' },
  { id: 'satsdice', name: 'Sats Dice', category: 'Games & Gambling', icon: '🎲', description: 'LNURL satoshi dice - gambling in a QR code.', repo: 'lnbits/satsdice' },
  { id: 'satspot', name: 'Satspot', category: 'Games & Gambling', icon: '🎯', description: 'Money pool games - pay to join, random winner.', repo: 'lnbits/satspot' },
  { id: 'blackjack', name: 'BlackJack', category: 'Games & Gambling', icon: '🃏', description: 'Lightning-powered blackjack dealer.', repo: 'lnbits/blackjack' },
  { id: 'numberlottery', name: 'Number Lottery', category: 'Games & Gambling', icon: '🔢', description: 'Provably fair numbers game using Bitcoin block data.', repo: 'lnbits/numberlottery' },
  { id: 'eightball', name: 'Magic 8ball', category: 'Games & Gambling', icon: '🎱', description: 'Pay sats, get a random word from a custom list.', repo: 'lnbits/eightball' },

  // ── Events & Streaming ──
  { id: 'lnticket', name: 'LN Ticket', category: 'Events & Streaming', icon: '🎫', description: 'Sell event tickets for Lightning payments.', repo: 'lnbits/lnticket' },
  { id: 'events', name: 'Events', category: 'Events & Streaming', icon: '🎪', description: 'Event management with Lightning ticketing.', repo: 'lnbits/events' },
  { id: 'lncalendar', name: 'LNCalendar', category: 'Events & Streaming', icon: '📅', description: 'Paid scheduling - like Calendly with Bitcoin.', repo: 'lnbits/lncalendar' },
  { id: 'livestream', name: 'Livestream', category: 'Events & Streaming', icon: '🎥', description: 'Accept Lightning payments during livestreams.', repo: 'lnbits/livestream' },
  { id: 'jukebox', name: 'Jukebox', category: 'Events & Streaming', icon: '🎵', description: 'Lightning-powered jukebox for Spotify integration.', repo: 'lnbits/jukebox' },
  { id: 'copilot', name: 'Copilot', category: 'Events & Streaming', icon: '🧑‍✈️', description: 'Streaming overlay for Lightning donations.', repo: 'lnbits/copilot' },

  // ── Utilities & Tools ──
  { id: 'decoder', name: 'Decoder', category: 'Utilities & Tools', icon: '🔍', description: 'Decode BOLT11 invoices and LNURL codes.', repo: 'lnbits/decoder' },
  { id: 'devicetimer', name: 'Device Timer', category: 'Utilities & Tools', icon: '⏱️', description: 'Control IoT devices with timed Lightning payments.', repo: 'lnbits/devicetimer' },
  { id: 'inventory', name: 'Inventory', category: 'Utilities & Tools', icon: '📦', description: 'Stock and inventory management.', repo: 'lnbits/inventory' },
  { id: 'scheduler', name: 'Scheduler', category: 'Utilities & Tools', icon: '🗓️', description: 'Schedule recurring Lightning payments.', repo: 'lnbits/scheduler' },
  { id: 'bleskomat', name: 'Bleskomat', category: 'Utilities & Tools', icon: '🏧', description: 'ATM-style Lightning vending machine interface.', repo: 'lnbits/bleskomat' },
  { id: 'smtp', name: 'SMTP', category: 'Utilities & Tools', icon: '📧', description: 'Charge sats for sending emails.', repo: 'lnbits/smtp' },
  { id: 'shipping', name: 'Shipping', category: 'Utilities & Tools', icon: '🚚', description: 'Shared shipping zones and rates for commerce extensions.', repo: 'lnbits/shipping' },
  { id: 'webpages', name: 'WebPages', category: 'Utilities & Tools', icon: '🌐', description: 'Admin-only HTML/CSS/JS page editor.', repo: 'lnbits/webpages' },
  { id: 'tunnel_me_out', name: 'TunnelMeOut', category: 'Utilities & Tools', icon: '🔗', description: 'One-click reverse tunnel for public access.', repo: 'lnbits/tunnel_me_out' },
  { id: 'where39', name: 'Where39', category: 'Utilities & Tools', icon: '📍', description: 'BIP39 location encoding for dead drops and treasure.', repo: 'lnbits/where39' },
  { id: 'chaospad', name: 'ChaosPad', category: 'Utilities & Tools', icon: '📝', description: 'Collaborative real-time text pads.', repo: 'lnbits/chaospad' },
  { id: 'gerty', name: 'Gerty', category: 'Utilities & Tools', icon: '🤓', description: 'Dashboard display for Bitcoin/Lightning stats.', repo: 'lnbits/gerty' },

  // ── Management ──
  { id: 'scrum', name: 'Scrum', category: 'Management', icon: '📋', description: 'Lightning-powered scrum board.', repo: 'lnbits/scrum' },
  { id: 'orders', name: 'Orders', category: 'Management', icon: '📝', description: 'Order management system.', repo: 'lnbits/orders' },
  { id: 'paidtasks', name: 'PaidTasks', category: 'Management', icon: '✅', description: 'Paid task lists with public payment pages.', repo: 'lnbits/paidtasks' },
]

/**
 * Get all unique categories in display order.
 */
export function getCategories() {
  const seen = new Set()
  return EXTENSIONS.reduce((cats, ext) => {
    if (!seen.has(ext.category)) {
      seen.add(ext.category)
      cats.push(ext.category)
    }
    return cats
  }, [])
}

/**
 * Find an extension by its id.
 */
export function getExtension(id) {
  return EXTENSIONS.find(ext => ext.id === id)
}
