/**
 * Single source of truth for all LNbits extension metadata.
 * Used by: generation script, extensions index page, sidebar config.
 */
export const EXTENSIONS = [
  // ── Payments & Commerce ──
  { id: 'lnurlp', extensionType: 'python', name: 'LNURLp', category: 'Payments & Commerce', icon: '🔗', description: 'Create static LNURL-pay links and branded payment pages.', repo: 'lnbits/lnurlp' },
  { id: 'tpos', extensionType: 'python', name: 'TPoS', category: 'Payments & Commerce', icon: '🏪', description: 'Touch-friendly point-of-sale terminal.', repo: 'lnbits/tpos' },
  { id: 'satspay', extensionType: 'python', name: 'SatsPay', category: 'Payments & Commerce', icon: '💳', description: 'Payment pages accepting on-chain and Lightning.', repo: 'lnbits/satspay' },
  { id: 'paywall', extensionType: 'python', name: 'Paywall', category: 'Payments & Commerce', icon: '🚧', description: 'Gate content or URLs behind Lightning payments.', repo: 'lnbits/paywall' },
  { id: 'sellcoins', extensionType: 'python', name: 'Sell Coins', category: 'Payments & Commerce', icon: '🪙', description: 'Sell Bitcoin with various payment methods.', repo: 'lnbits/sellcoins' },
  { id: 'invoices', extensionType: 'python', name: 'Invoices', category: 'Payments & Commerce', icon: '🧾', description: 'Create and manage professional invoices.', repo: 'lnbits/invoices' },
  { id: 'market', extensionType: 'python', name: 'Market', category: 'Payments & Commerce', icon: '🛒', description: 'Online marketplace with Lightning payments.', repo: 'lnbits/market' },
  { id: 'offlineshop', extensionType: 'python', name: 'Offline Shop', category: 'Payments & Commerce', icon: '🏷️', description: 'Receive payments offline with printed QR codes.', repo: 'lnbits/offlineshop' },
  { id: 'webshop', extensionType: 'python', name: 'WebShop', category: 'Payments & Commerce', icon: '🛍️', description: 'Embeddable web shop with Lightning checkout.', repo: 'lnbits/webshop' },
  { id: 'telegramshop', extensionType: 'python', name: 'Telegram Shopping', category: 'Payments & Commerce', icon: '🤖', description: 'Lightning-powered storefront inside Telegram Mini App.', repo: 'DoktorShift/telegramshop' },

  // ── Wallet Tools ──
  { id: 'watchonly', extensionType: 'python', name: 'Watch Only', category: 'Wallet Tools', icon: '👁️', description: 'Monitor on-chain wallets via xpub/zpub without spending keys.', repo: 'lnbits/watchonly' },
  { id: 'splitpayments', extensionType: 'python', name: 'Split Payments', category: 'Wallet Tools', icon: '✂️', description: 'Automatically split incoming payments to multiple wallets.', repo: 'lnbits/splitpayments' },
  { id: 'scrub', extensionType: 'python', name: 'Scrub', category: 'Wallet Tools', icon: '🧹', description: 'Forward all incoming payments to an external wallet.', repo: 'lnbits/scrub' },
  { id: 'nwcprovider', extensionType: 'python', name: 'NWC Provider', category: 'Wallet Tools', icon: '📡', description: 'Serve as a Nostr Wallet Connect provider.', repo: 'lnbits/nwcprovider' },
  { id: 'lndhub', extensionType: 'python', name: 'LndHub', category: 'Wallet Tools', icon: '🔐', description: 'LndHub-compatible interface for BlueWallet and Zeus.', repo: 'lnbits/lndhub' },

  // ── Tips & Donations ──
  { id: 'withdraw', extensionType: 'python', name: 'Withdraw', category: 'Tips & Donations', icon: '🎟️', description: 'Create LNURL-withdraw links (vouchers, faucets).', repo: 'lnbits/withdraw' },
  { id: 'tipjar', extensionType: 'python', name: 'Tip Jar', category: 'Tips & Donations', icon: '🫙', description: 'Accept Lightning tips with messages attached.', repo: 'lnbits/tipjar' },
  { id: 'streamalerts', extensionType: 'python', name: 'Stream Alerts', category: 'Tips & Donations', icon: '📺', description: 'Bitcoin donations in Streamlabs alerts.', repo: 'lnbits/streamalerts' },
  { id: 'raisenow', extensionType: 'python', name: 'RaiseNow', category: 'Tips & Donations', icon: '🏆', description: 'Time-based fundraising with live leaderboards.', repo: 'lnbits/raisenow' },

  // ── Hardware & Devices ──
  { id: 'boltcards', extensionType: 'python', name: 'Bolt Cards', category: 'Hardware & Devices', icon: '💳', description: 'Self-custody NFC cards with one-time LNURLw links.', repo: 'lnbits/boltcards' },
  { id: 'bitcoinswitch', extensionType: 'python', name: 'Bitcoin Switch', category: 'Hardware & Devices', icon: '🔌', description: 'Turn things on with bitcoin - IoT device control.', repo: 'lnbits/bitcoinswitch_extension' },
  { id: 'fossa', extensionType: 'python', name: 'FOSSA', category: 'Hardware & Devices', icon: '🏧', description: 'Bitcoin ATM - sell bitcoin for cash.', repo: 'lnbits/fossa' },
  { id: 'lnpos', extensionType: 'python', name: 'LNPoS', category: 'Hardware & Devices', icon: '📟', description: 'Hardware Lightning point-of-sale terminal.', repo: 'lnbits/lnpos' },
  { id: 'lnurldevice', extensionType: 'python', name: 'LNURL Device', category: 'Hardware & Devices', icon: '📱', description: 'Legacy hardware integration (deprecated - use Bitcoin Switch, FOSSA, LNPoS).', repo: 'lnbits/lnurldevice' },

  // ── Swaps ──
  { id: 'boltz', extensionType: 'python', name: 'Boltz', category: 'Swaps', icon: '🔄', description: 'Submarine and reverse submarine swaps (on-chain ↔ Lightning).', repo: 'lnbits/boltz' },
  { id: 'deezy', extensionType: 'python', name: 'Deezy', category: 'Swaps', icon: '🔁', description: 'On-chain ↔ Lightning swaps via Deezy.', repo: 'lnbits/deezy' },

  // ── Social & Nostr ──
  { id: 'nostrclient', extensionType: 'python', name: 'Nostr Client', category: 'Social & Nostr', icon: '🔀', description: 'Always-on Nostr relay multiplexer.', repo: 'lnbits/nostrclient' },
  { id: 'nostrmarket', extensionType: 'python', name: 'Nostr Market', category: 'Social & Nostr', icon: '🟣', description: 'Nostr-based marketplace for Lightning commerce.', repo: 'lnbits/nostrmarket' },
  { id: 'nostrnip5', extensionType: 'python', name: 'Nostr NIP-5', category: 'Social & Nostr', icon: '✅', description: 'Sell Nostr NIP-05 verification identifiers.', repo: 'lnbits/nostrnip5' },
  { id: 'nostrrelay', extensionType: 'python', name: 'Nostr Relay', category: 'Social & Nostr', icon: '📨', description: 'Run a paid Nostr relay with Lightning.', repo: 'lnbits/nostrrelay' },
  { id: 'chat', extensionType: 'python', name: 'Chat', category: 'Social & Nostr', icon: '💬', description: 'Live support chat with paid messages and embeddable widget.', repo: 'lnbits/chat' },
  { id: 'paidreviews', extensionType: 'python', name: 'Paid Reviews', category: 'Social & Nostr', icon: '⭐', description: 'Collect reviews with Lightning-gated submission.', repo: 'lnbits/paidreviews' },
  { id: 'pay2review', extensionType: 'python', name: 'Pay2Review', category: 'Social & Nostr', icon: '📝', description: 'Charge sats for reviews - anti-sock-puppet.', repo: 'lnbits/pay2review' },
  { id: 'auctionhouse', extensionType: 'python', name: 'Auction House', category: 'Social & Nostr', icon: '🔨', description: 'Run Lightning-powered auctions.', repo: 'lnbits/auction_house' },

  // ── Games & Gambling ──
  { id: 'coinflip', extensionType: 'python', name: 'Coinflip', category: 'Games & Gambling', icon: '🪙', description: 'Bet sats on coinflips - winner takes all.', repo: 'lnbits/coinflip' },
  { id: 'satsdice', extensionType: 'python', name: 'Sats Dice', category: 'Games & Gambling', icon: '🎲', description: 'LNURL satoshi dice - gambling in a QR code.', repo: 'lnbits/satsdice' },
  { id: 'satspot', extensionType: 'python', name: 'Satspot', category: 'Games & Gambling', icon: '🎯', description: 'Money pool games - pay to join, random winner.', repo: 'lnbits/satspot' },
  { id: 'blackjack', extensionType: 'python', name: 'BlackJack', category: 'Games & Gambling', icon: '🃏', description: 'Lightning-powered blackjack dealer.', repo: 'lnbits/blackjack' },
  { id: 'numberlottery', extensionType: 'python', name: 'Number Lottery', category: 'Games & Gambling', icon: '🔢', description: 'Provably fair numbers game using Bitcoin block data.', repo: 'lnbits/numberlottery' },
  { id: 'eightball', extensionType: 'python', name: 'Magic 8ball', category: 'Games & Gambling', icon: '🎱', description: 'Pay sats, get a random word from a custom list.', repo: 'lnbits/eightball' },

  // ── Events & Streaming ──
  { id: 'lnticket', extensionType: 'python', name: 'LN Ticket', category: 'Events & Streaming', icon: '🎫', description: 'Sell event tickets for Lightning payments.', repo: 'lnbits/lnticket' },
  { id: 'events', extensionType: 'python', name: 'Events', category: 'Events & Streaming', icon: '🎪', description: 'Event management with Lightning ticketing.', repo: 'lnbits/events' },
  { id: 'lncalendar', extensionType: 'python', name: 'LNCalendar', category: 'Events & Streaming', icon: '📅', description: 'Paid scheduling - like Calendly with Bitcoin.', repo: 'lnbits/lncalendar' },
  { id: 'livestream', extensionType: 'python', name: 'Livestream', category: 'Events & Streaming', icon: '🎥', description: 'Accept Lightning payments during livestreams.', repo: 'lnbits/livestream' },
  { id: 'jukebox', extensionType: 'python', name: 'Jukebox', category: 'Events & Streaming', icon: '🎵', description: 'Lightning-powered jukebox for Spotify integration.', repo: 'lnbits/jukebox' },
  { id: 'copilot', extensionType: 'python', name: 'Copilot', category: 'Events & Streaming', icon: '🧑‍✈️', description: 'Streaming overlay for Lightning donations.', repo: 'lnbits/copilot' },

  // ── Utilities & Tools ──
  { id: 'decoder', extensionType: 'python', name: 'Decoder', category: 'Utilities & Tools', icon: '🔍', description: 'Decode BOLT11 invoices and LNURL codes.', repo: 'bitkarrot/decoder' },
  { id: 'devicetimer', extensionType: 'python', name: 'Device Timer', category: 'Utilities & Tools', icon: '⏱️', description: 'Control IoT devices with timed Lightning payments.', repo: 'DoktorShift/DeviceTimer' },
  { id: 'inventory', extensionType: 'python', name: 'Inventory', category: 'Utilities & Tools', icon: '📦', description: 'Stock and inventory management.', repo: 'lnbits/inventory' },
  { id: 'scheduler', extensionType: 'python', name: 'Scheduler', category: 'Utilities & Tools', icon: '🗓️', description: 'Schedule recurring Lightning payments.', repo: 'bitkarrot/scheduler' },
  { id: 'bleskomat', extensionType: 'python', name: 'Bleskomat', category: 'Utilities & Tools', icon: '🏧', description: 'ATM-style Lightning vending machine interface.', repo: 'lnbits/bleskomat' },
  { id: 'smtp', extensionType: 'python', name: 'SMTP', category: 'Utilities & Tools', icon: '📧', description: 'Charge sats for sending emails.', repo: 'lnbits/smtp' },
  { id: 'shipping', extensionType: 'python', name: 'Shipping', category: 'Utilities & Tools', icon: '🚚', description: 'Shared shipping zones and rates for commerce extensions.', repo: 'lnbits/shipping' },
  { id: 'webpages', extensionType: 'python', name: 'WebPages', category: 'Utilities & Tools', icon: '🌐', description: 'Admin-only HTML/CSS/JS page editor.', repo: 'lnbits/webpages' },
  { id: 'tunnel_me_out', extensionType: 'python', name: 'TunnelMeOut', category: 'Utilities & Tools', icon: '🔗', description: 'One-click reverse tunnel for public access.', repo: 'lnbits/tunnel_me_out' },
  { id: 'where39', extensionType: 'python', name: 'Where39', category: 'Utilities & Tools', icon: '📍', description: 'BIP39 location encoding for dead drops and treasure.', repo: 'lnbits/where39' },
  { id: 'chaospad', extensionType: 'python', name: 'ChaosPad', category: 'Utilities & Tools', icon: '📝', description: 'Collaborative real-time text pads.', repo: 'lnbits/chaospad' },
  { id: 'gerty', extensionType: 'python', name: 'Gerty', category: 'Utilities & Tools', icon: '🤓', description: 'Dashboard display for Bitcoin/Lightning stats.', repo: 'lnbits/gerty' },

  // Core WASM releases verified against the official registry.
  {"id": "lnq1", "extensionType": "wasm", "runtime": "core", "curated": true, "name": "LNQ1 Arena", "category": "Games & Entertainment", "icon": "🎯", "description": "A paid multiplayer FPS arena where players win entry fees by scoring kills.", "repo": "lnbits/lnq1"},
  {"id": "satoshisplacewasm", "extensionType": "wasm", "runtime": "core", "curated": true, "name": "Satoshi's Place", "category": "Games & Entertainment", "icon": "🎨", "description": "Create paid collaborative pixel walls.", "repo": "lnbits/satoshisplacewasm"},
  {"id": "chesswasm", "extensionType": "wasm", "runtime": "core", "curated": true, "name": "Chess", "category": "Games & Entertainment", "icon": "♟️", "description": "Create paid public chess games where the winner takes the pot.", "repo": "lnbits/chesswasm"},
  {"id": "streetfighterwasm", "extensionType": "wasm", "runtime": "core", "curated": true, "name": "StreetFighter", "category": "Games & Entertainment", "icon": "🥊", "description": "Create paid public StreetFighter matches where the winner takes the pot.", "repo": "lnbits/streetfighterwasm"},
  {"id": "tips", "extensionType": "wasm", "runtime": "core", "curated": true, "name": "Tips", "category": "Tips & Donations", "icon": "⚡", "description": "Receive Lightning tips with short messages.", "repo": "lnbits/tips"},
  {"id": "bigpayment", "extensionType": "wasm", "runtime": "core", "curated": true, "name": "BigPayment", "category": "Payments & Commerce", "icon": "💰", "description": "Pay large Lightning invoices or LNURL-pay requests by using multiple wallets.", "repo": "lnbits/bigpayment"},
  {"id": "pingpong", "extensionType": "wasm", "runtime": "core", "curated": true, "name": "Ping Pong", "category": "Games & Entertainment", "icon": "🏓", "description": "Lightning entry-fee Pong tables with winner payouts.", "repo": "lnbits/pingpong"},
  {"id": "paysplit", "extensionType": "wasm", "runtime": "core", "curated": true, "name": "PaySplit", "category": "Wallet Tools", "icon": "✂️", "description": "Split incoming wallet payments to LNURL-pay targets.", "repo": "lnbits/paysplit"},
  {"id": "supportchat", "extensionType": "wasm", "runtime": "core", "curated": true, "name": "Support Chat", "category": "Social & Nostr", "icon": "💬", "description": "Run simple public support inboxes with live chat threads.", "repo": "lnbits/supportchat"},
  {"id": "battleshipswasm", "extensionType": "wasm", "runtime": "core", "curated": true, "name": "Battleships", "category": "Games & Entertainment", "icon": "🚢", "description": "Create paid public Battleships games where the winner takes the pot.", "repo": "lnbits/battleshipswasm"},
  {"id": "poker", "extensionType": "wasm", "runtime": "core", "curated": true, "name": "Poker", "category": "Games & Entertainment", "icon": "🃏", "description": "Play paid best-of-five heads-up Draw Poker with tactile cards and Lightning payouts.", "repo": "lnbits/poker"},
  {"id": "inventorystats", "extensionType": "wasm", "runtime": "core", "curated": true, "name": "InventoryStats", "category": "Utilities & Tools", "icon": "📊", "description": "Inventory health, sales, category, and reorder analytics.", "repo": "lnbits/inventorystats"},
  {"id": "popmenu", "extensionType": "wasm", "runtime": "core", "curated": true, "name": "PopMenu", "category": "Payments & Commerce", "icon": "🍽️", "description": "A lightweight QR menu, Lightning checkout, and order queue.", "repo": "lnbits/popmenu"},
  {"id": "giftcardswasm", "extensionType": "wasm", "runtime": "core", "curated": true, "name": "Gift Cards", "category": "Payments & Commerce", "icon": "🎁", "description": "Create and redeem Lightning gift cards with LNURL-withdraw", "repo": "bitkarrot/giftcardswasm"},
  {"id": "zapgoalswasm", "extensionType": "wasm", "runtime": "core", "curated": true, "name": "Zap Goals!", "category": "Tips & Donations", "icon": "🎯", "description": "Create customizable Lightning funding goals with live progress", "repo": "bitkarrot/zapgoalswasm"},
  {"id": "forms", "extensionType": "wasm", "runtime": "core", "curated": true, "name": "Forms", "category": "Payments & Commerce", "icon": "📝", "description": "Payment-gated forms, registrations and paid workflows", "repo": "bitkarrot/forms"},

  // ── Management ──
  { id: 'scrum', extensionType: 'python', name: 'Scrum', category: 'Management', icon: '📋', description: 'Lightning-powered scrum board.', repo: 'lnbits/scrum' },
  { id: 'orders', extensionType: 'python', name: 'Orders', category: 'Management', icon: '📝', description: 'Order management system.', repo: 'lnbits/orders' },
  { id: 'paidtasks', extensionType: 'wasm', runtime: 'legacy-host', curated: true, name: 'PaidTasks', category: 'Management', icon: '✅', description: 'Paid task lists with public payment pages.', repo: 'lnbits/paidtasks' },
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
