import { getCollection } from 'astro:content';

// Drafts show up in `npm run dev` (marked) and never in a production build.
const showDrafts = import.meta.env.DEV;

export async function getProjects() {
  const projects = await getCollection('projects', ({ data }) => showDrafts || !data.draft);
  return projects.sort((a, b) => a.data.order - b.data.order);
}
