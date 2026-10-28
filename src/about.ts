// The About page's words. Used by src/pages/about.astro and by the Markdown
// versions for AI agents. [text](url) makes a link.

export const about = {
  title: 'About',
  description:
    'About Brian Donohue: customer problems, teams, payments and tax, and what he does when he’s not working.',
  lede: 'I like hard problems with a customer on the other end. I started my career answering support calls, and I still start every problem by asking who’s stuck and why.',
  intro: [
    'Most of those problems have been in commerce, so I know payments, wallets, and tax deeply. That helps. What I’m best at is the work around it: figuring out what customers need and getting engineering, design, data, and partners working on the same problem. Then I turn the mess into a simple system people can build on.',
  ],
  howIWork: [
    'If I can’t explain who something helps and what it fixes for them, it isn’t ready to build.',
    'Most of my effort goes into getting people to agree on the problem. The solution usually moves faster after that.',
    'I build clear models of messy systems so teams can make a decision once and stop relitigating it every week.',
    'I’d rather say the awkward thing early than watch it come up in a retro.',
    'I joke around a fair bit, and I still do what I said I’d do.',
  ],
  path: [
    {
      org: 'Ordergroove',
      when: '2026 to now',
      role: 'Principal Product Manager',
      note: 'Subscriptions and memberships for enterprise brands. I’m working on the future of payments in relationship commerce and where AI agents fit in.',
    },
    {
      org: 'Paramount Commerce',
      when: '2026',
      role: 'Staff Product Manager',
      note: 'Built a merchant hierarchy for a legacy payments platform. Not my favourite stretch.',
    },
    { org: 'Shopify', when: '2014 to 2025', role: '', note: 'Eleven years, from merchant support to product leadership.' },
    {
      org: '',
      when: '2024 to 2025',
      role: 'Product Lead, Shop and Shop Pay',
      note: 'Payments, identity, merchant APIs, and agentic commerce for tens of millions of buyers.',
    },
    {
      org: '',
      when: '2022 to 2024',
      role: 'Senior Product Manager, Shop Pay',
      note: 'Took Shop Pay to merchants off Shopify for the first time, launching with Everlane. Later moved to Shop Pay Installments and on-platform growth.',
    },
    {
      org: '',
      when: '2017 to 2022',
      role: 'Product Manager, Tax',
      note: 'Owned the tax platform (in-house calculation engine, reporting, Avalara partnership).',
    },
    {
      org: '',
      when: '2014 to 2017',
      role: 'Support, launch, and solutions engineering',
      note: 'Started as a support Guru, then onboarded and scoped Shopify Plus merchants. Top solutions engineer of 2016.',
    },
  ],
  pathNote: 'I moved from support into product, and I’m always happy to talk with people trying to make that jump.',
  offTheClock: [
    'I race and maintain [Hardtack](/projects/hardtack/), a 1976 C&C 33. It’s a racer-cruiser, and about half of it is a repair list. I teach crew in more detail than they probably want, because people sail better when they know why. I crew on other boats whenever I can, mostly to steal ideas about sail trim.',
    'I’m on the management committee at [Dartmouth Yacht Club](https://dartmouthyachtclub.ca) for a little while longer, looking after web and communications. A Yachtmaster certification is on the list somewhere after the rigging and the engine.',
    'Otherwise: guitar, and amps that occasionally smoke. Cars, mostly Volkswagens. The current one is a 2024 Golf R after a long line of others, and I’ve learned German engineering means the check engine light comes on with great precision. Smart home projects that work fine until I improve them. And two cats: Ziggy, a calico with a talent for disapproval, and Ivee, an Abyssinian who treats the house as a test environment.',
  ],
};
