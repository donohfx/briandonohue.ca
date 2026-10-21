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

- `src/site.ts`: name, links, email, and the "Now" list on the homepage.
- `src/content/projects/*.md`: projects. Frontmatter: `title`, `summary`, `year`, `order`, optional `link`/`linkLabel`, `draft`.
- `src/pages/about.astro`: the About page.
- `src/styles/global.css`: colours, type, and shared styles. Colour tokens are at the top.

Anything with `draft: true` shows in dev with a badge but isn't built

## Deploy

`netlify.toml` is set up: build `npm run build`, publish `dist`. Works the same on Cloudflare Pages or Vercel.
