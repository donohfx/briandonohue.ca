import { getProjects } from '../lib/content';
import { projectsMd } from '../lib/markdown';
export async function GET() {
  return new Response(projectsMd(await getProjects()), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
