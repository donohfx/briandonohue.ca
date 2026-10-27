// Everything the homepage chat says. Edit freely: answers are plain strings,
// each one becomes its own bubble. `match` is a case-insensitive regex used
// when someone types a question instead of tapping a chip.

export interface Topic {
  id: string;
  q: string;
  match: string;
  a: string[];
  /** Shown instead of `a` when JavaScript is off (no chat, no message box). */
  noJs?: string[];
  receipt?: boolean;
  quote?: boolean;
  links?: { label: string; href: string }[];
  contact?: boolean;
}

export const opener = {
  q: 'Hi. Who is this?',
  a: 'I’m Brian, a technology professional in Halifax. I start with the customer’s problem and get the right people around it.',
};

export const topics: Topic[] = [
  {
    id: 'what',
    q: 'What do you work on?',
    match: 'what do you do|work on|your job|role|who are you|about you',
    a: [
      'Most of my work has been in commerce, mostly where money moves (payments, wallets, tax).',
      'I spent eleven years at Shopify. I started in merchant support and left as product lead for Shop and Shop Pay. Along the way I owned Shopify’s tax platform and helped take Shop Pay beyond Shopify for the first time.',
      'Today I’m a Principal Product Manager at Ordergroove. I’m working on what payments look like there now that AI agents are starting to shop for people.',
    ],
    links: [{ label: 'More about me', href: '/about/' }],
  },
  {
    id: 'done',
    q: 'What have you done?',
    match: 'done|career|resume|résumé|\\bcv\\b|history|experience|background|shopify|worked',
    a: ['Here’s the itemized version.'],
    receipt: true,
  },
  {
    id: 'now',
    q: 'What’s on your plate now?',
    match: '\\bnow\\b|current|lately|plate|these days|up to|hardtack|boat',
    a: [], // filled from site.now
  },
  {
    id: 'how',
    q: 'What are you like to work with?',
    match: 'like to work|work with|style|how do you work|manager|team|reference',
    a: [
      'If I can’t explain who something helps and what it fixes for them, it isn’t ready to build.',
      'I’d rather say the awkward thing early than watch it come up in a retro.',
    ],
    quote: true,
  },
  {
    id: 'talk',
    q: 'Can we talk?',
    match: 'talk|contact|email|reach|hire|coffee|advis|speak|meet|call',
    a: [
      'I’m up for advising, speaking, or a coffee chat about payments and commerce.',
      'Enter your message below, or use one of these links.',
    ],
    noJs: [
      'I’m up for advising, speaking, or a coffee chat about payments and commerce.',
      'You can reach me on LinkedIn or GitHub.',
    ],
    contact: true,
  },
];

export const replies = {
  noMatch: 'I don’t have a saved answer for that one. Want to send it to me directly?',
  askEmail: 'What’s your email, so I can reply?',
  badEmail: 'That doesn’t look like an email. Try again?',
  sent: 'Got it. It’s in my inbox, and I’ll reply to {email}.',
  failed: 'That didn’t go through. Email me at {address} instead.',
  declined: 'No problem. Ask me something else.',
};

// The receipt that prints when someone asks what I've done.
export const receipt = {
  items: [
    { name: 'Support Guru, Shopify', year: '2014', note: 'Answering support calls.' },
    { name: 'Plus onboarding + SE', year: '2015', note: 'Top solutions engineer of 2016.' },
    { name: 'Product Manager, Tax', year: '2017', note: 'Calculation engine, reporting, Avalara.' },
    { name: 'Senior PM, Shop Pay', year: '2022', note: 'Off Shopify for the first time, with Everlane.' },
    { name: 'Product Lead, Shop + Shop Pay', year: '2024', note: 'Payments, identity, agentic commerce.' },
    { name: 'Staff PM, Paramount', year: '2026', note: 'Not my favourite stretch.' },
    { name: 'Principal PM, Ordergroove', year: 'NOW', note: 'Payments for relationship commerce.' },
  ],
  totals: [
    { label: 'SUBTOTAL', value: '11 yrs Shopify' },
    { label: 'TAX', value: 'owned it, 2017–22' },
  ],
  total: '1 PM, customer first',
};

// Hidden replies: typed messages that match one of these get an answer in
// character instead of the "send it to me" offer. Checked before the topics.
export const secrets: { match: string; a: string[] }[] = [
  { match: 'refund', a: ['All sales final. I owned tax, not refunds.'] },
  { match: 'charge ?back|dispute', a: ['Disputing a free conversation is bold.', 'Filed with my bank. Expect a reply in 60 to 90 business days.'] },
  { match: 'discount|coupon|promo', a: ['Try COFFEECHAT at checkout.', 'There is no checkout.'] },
  { match: '\\btip\\b|tipping', a: ['A tipping screen on a personal website? Not on my watch.'] },
  { match: 'are you (a )?(bot|ai|real)|is this (a )?(bot|ai)|chatgpt|claude', a: ['I’m a website. The real me reads every message you send from here, though.'] },
];

// The cheat code. ↑↑↓↓←→←→BA on a keyboard, or type one of these in the chat.
// Prints a receipt for the visitor's own visit.
export const egg = {
  typed: 'konami|up up down down|↑↑↓↓|my receipt|print.*receipt',
  intro: 'Cheat code accepted. Here’s your receipt.',
  title: 'THANKS FOR STOPPING BY',
  empty: 'Just looking',
  paidWith: 'curiosity',
  footer: 'NO REFUNDS. COME AGAIN.',
};

// Said in the chat when the light switch burns out (five quick clicks).
export const bulbOut = ['Well that was my last bulb. (Reload will fix it)'];
