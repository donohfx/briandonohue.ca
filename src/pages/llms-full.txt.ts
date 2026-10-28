import { getProjects } from '../lib/content';
import { llmsFull } from '../lib/markdown';
export async function GET() {
  return new Response(llmsFull(await getProjects()), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
