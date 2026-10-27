import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://briandonohue.ca',
  trailingSlash: 'always',
  // The dev toolbar sits over the bottom of the chat in `npm run dev`. It never ships to the live site.
  devToolbar: { enabled: false },
});
