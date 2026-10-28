import { aboutMd } from '../lib/markdown';
export const GET = () => new Response(aboutMd(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
