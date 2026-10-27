# briandonohue.ca

Personal site. Astro, static output

## Run

Needs Node 22.23+ (Node 24 recommended).

```sh
npm install
npm run dev      # http://localhost:4321, drafts visible
npm run build    # static site in dist/, drafts excluded
npm run preview  # serve the build
```

## Where things are

- `src/site.ts`: name, links, email, the menu, and the "Now" list (the chat's "What's on your plate now?" answer).
- `src/chat.ts`: everything the homepage chat says. Questions, answers, the keywords that match typed questions, the receipt, hidden replies, and the cheat code.
- `src/components/Chat.astro`: the chat itself. Without JavaScript it renders the whole conversation as plain text.
- `src/components/CardHead.astro`: the photo, name and menu strip at the top of every page's window.
- `src/content/projects/*.md`: projects. Frontmatter: `title`, `summary`, `year`, `order`, optional `link`/`linkLabel`, `draft`.
- `src/pages/about.astro`: the About page.
- `src/styles/global.css`: colours, type, and shared styles. Colour tokens (day, night, candle) are at the top.

## The chat

- Typed questions are matched to answers by keyword (`match` in `src/chat.ts`). No AI.
- Anything it can't match offers to send the message to me. It posts to a Netlify Form called `chat` (simulated in `npm run dev`). Turn on email notifications in Netlify › Forms › chat.
- The conversation is kept for the browser tab, so About/Projects and back picks up where it left off. A reload starts over.

## Easter eggs

- ↑↑↓↓←→←→BA (or type "konami" in the chat) prints a receipt for the visitor's own visit.
- Typing "refund", "chargeback", "discount", "tip" or "are you a bot" gets a reply in character.
- Five quick clicks on the day/night switch burns out the bulb: candlelight until a reload.

Anything with `draft: true` shows in dev with a badge but isn't built

## Deploy

`netlify.toml` is set up: build `npm run build`, publish `dist`. Works the same on Cloudflare Pages or Vercel.
