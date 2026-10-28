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
- `src/about.ts`: the About page's words. `src/pages/about.astro` lays them out.
- `src/styles/global.css`: colours, type, and shared styles. Colour tokens (day, night, candle) are at the top.

## The chat

- Typed questions are matched to answers by keyword (`match` in `src/chat.ts`). No AI.
- Anything it can't match offers to send the message to me. It posts to a Netlify Form called `chat` (simulated in `npm run dev`). Turn on email notifications in Netlify › Forms › chat.
- The conversation is kept for the browser tab, so About/Projects and back picks up where it left off. A reload starts over.

## Search engines and AI agents

- Every page carries schema.org structured data: a `Person` (name, title, employer, Halifax, photo, topics, and `sameAs` links to LinkedIn and GitHub), plus `ProfilePage` on About and `CreativeWork` with breadcrumbs on each project. Facts live in `site.person` in `src/site.ts`.
- `/llms.txt` is a plain-text summary for AI tools; `/llms-full.txt` is everything in one file.
- Every page has a Markdown twin: `/index.md` (the chat's answers), `/about.md`, `/projects.md`, `/projects/<id>.md`. All generated from the same files as the pages (`src/lib/markdown.ts`).
- `public/robots.txt` welcomes all crawlers, AI search and training bots included.
- Search Console / Bing verification and Plausible analytics switch on by filling in `site.verify` and `site.analytics` in `src/site.ts`.

## Analytics events

With Plausible on, the chat sends: `Chat question` (which one, button or typed), `Receipt` (career or visitor), `Hidden reply` (which one), `Unmatched message`, `Message sent` (ok or not), and `Bulb burnt out`. Nothing anyone types is sent.

## Easter eggs

- ↑↑↓↓←→←→BA (or type "konami" in the chat) prints a receipt for the visitor's own visit.
- Typing "refund", "chargeback", "discount", "tip" or "are you a bot" gets a reply in character.
- Five quick clicks on the day/night switch burns out the bulb: candlelight until a reload.

Anything with `draft: true` shows in dev with a badge but isn't built

## Deploy

`netlify.toml` is set up: build `npm run build`, publish `dist`. Works the same on Cloudflare Pages or Vercel.
