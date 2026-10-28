// Tiny inline formatter for copy kept in .ts files: escapes HTML and turns
// [text](url) into links. Used so the same text can render as HTML on the page
// and as Markdown for AI agents (src/lib/markdown.ts).
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function inline(md: string): string {
  return esc(md).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, href) => `<a href="${href}">${text}</a>`);
}
