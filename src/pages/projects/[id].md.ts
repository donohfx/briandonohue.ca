import type { CollectionEntry } from 'astro:content';
import { getProjects } from '../../lib/content';
import { projectMd } from '../../lib/markdown';

export async function getStaticPaths() {
  const projects = await getProjects();
  return projects.map((p) => ({ params: { id: p.id }, props: { project: p } }));
}
export function GET({ props }: { props: { project: CollectionEntry<'projects'> } }) {
  return new Response(projectMd(props.project), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
