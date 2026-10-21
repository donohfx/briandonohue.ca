import type { APIContext } from 'astro';
import { getProjects } from '../lib/content';

export async function GET(context: APIContext) {
  const site = context.site!;
  const projects = await getProjects();
  const paths = ['/', '/about/', '/projects/', ...projects.map((p) => `/projects/${p.id}/`)];
  const urls = paths.map((p) => `  <url><loc>${new URL(p, site)}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
