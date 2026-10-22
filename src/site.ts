// Everything you’d want to tweak without touching layout lives here.

export const site = {
  name: 'Brian Donohue',
  url: 'https://briandonohue.ca',
  location: 'Halifax, Nova Scotia',
  coords: '44.65° N, 63.57° W',
  description:
    'Brian Donohue is a technology professional in Halifax working on payments for subscriptions and relationship commerce, with deep roots in payments, wallets, and tax.',

  // Leave email empty to hide it everywhere.
  email: 'hello@briandonohue.ca',

  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/brian-donohue-a61357114/' },
    { label: 'GitHub', href: 'https://github.com/donohfx' },
  ],

  // The "Now" list on the homepage. Short, present tense, edit freely.
  now: [
    'Building the future of payments for relationship commerce at Ordergroove.',
    'Making Claude skills for the kind of work that usually eats an afternoon.',
    'Hardtack is on the hard for the winter, still leaking oil, with a new sail that never got used.',
  ],
  nowUpdated: '2026-10',

};

// Excerpts from LinkedIn recommendations. Keep them verbatim.
export const kindWords = [
  {
    quote:
      'He didn’t just own the product. He joined sales calls, answered merchant questions in real-time, fed positioning back to the team, and helped close our first enterprise wins.',
    name: 'Madison Cyr',
    role: 'Sr. Product Marketing Lead, Shopify',
    featured: true,
  },
  {
    quote:
      'He’s never afraid to ask the hard question or say the thing that needs to be said, which makes him incredibly effective at bringing teams together.',
    name: 'Madison Cyr',
    role: 'Sr. Product Marketing Lead, Shopify',
  },
  {
    quote:
      'A reliable voice of reason with a talent for critical thinking and the ability to build a consensus among others.',
    name: 'Jamie Sutton',
    role: 'Global Shopify Partnerships Lead, WPP Enterprise Solutions',
  },
  {
    quote:
      'Our success was due to the diligence and level of expertise and customer care shown to us by Brian.',
    name: 'W. Ian Douglas',
    role: 'Shopify merchant',
  },
];

export const nav = [
  { label: 'About', href: '/about/' },
  { label: 'Projects', href: '/projects/' },
];
