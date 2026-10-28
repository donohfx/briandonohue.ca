import { getProjects } from '../lib/content';
import { llmsTxt } from '../lib/markdown';
export async function GET() {
  return new Response(llmsTxt(await getProjects()), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
