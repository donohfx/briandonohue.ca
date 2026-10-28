import { homeMd } from '../lib/markdown';
export const GET = () => new Response(homeMd(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
