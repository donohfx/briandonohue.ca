// Markdown versions of the site, for AI agents and tools that read text rather
// than click around. Built from the same files as the pages, so they never drift.
// Served at /index.md, /about.md, /projects.md, /projects/<id>.md, /llms.txt and
// /llms-full.txt.
import type { CollectionEntry } from 'astro:content';
import { site, kindWords } from '../site';
import { about } from '../about';
import { opener, topics, receipt } from '../chat';

export const abs = (path: string) => new URL(path, site.url).href;
// Make site-relative links absolute so the text works anywhere.
const absLinks = (md: string) => md.replace(/\]\((\/[^)]*)\)/g, (_, p) => `](${abs(p)})`);
const contactLines = () => [
  ...(site.email ? [`- Email: ${site.email}`] : []),
  ...site.links.map((l) => `- ${l.label}: ${l.href}`),
];

export function homeMd() {
  const featured = kindWords.find((k) => k.featured);
  const out = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    'The homepage is a chat. These are its answers, in order.',
    '',
    `## ${opener.q}`,
    '',
    opener.a,
  ];
  for (const t of topics) {
    if (t.id === 'talk') continue;
    out.push('', `## ${t.q}`, '');
    const lines = t.id === 'now' ? site.now.map((n) => `- ${n}`) : t.a;
    out.push(...lines);
    if (t.receipt) {
      out.push('');
      for (const it of receipt.items) out.push(`- ${it.year}: ${it.name}. ${it.note}`);
    }
    if (t.quote && featured) out.push('', `> ${featured.quote}`, `> — ${featured.name}, ${featured.role}`);
  }
  out.push(
    '',
    '## Can we talk?',
    '',
    'I’m up for advising, speaking, or a coffee chat about payments and commerce.',
    '',
    ...contactLines(),
    '',
    `More: [About](${abs('/about.md')}) · [Projects](${abs('/projects.md')})`,
  );
  return out.join('\n') + '\n';
}

export function aboutMd() {
  const out = [`# About ${site.name}`, '', about.lede, '', ...about.intro.map(absLinks), '', '## How I work', ''];
  out.push(...about.howIWork.map((h) => `- ${h}`), '', '## Path', '');
  let org = '';
  for (const p of about.path) {
    if (p.org) org = p.org;
    const head = p.org ? `**${p.org}**${p.role ? `, ${p.role}` : ''}` : `  - ${p.role}`;
    out.push(p.org ? `- ${head} (${p.when}). ${p.note}` : `${head} (${p.when}, ${org}). ${p.note}`);
  }
  out.push('', about.pathNote, '', '## Kind words', '');
  for (const k of kindWords) out.push(`> ${k.quote}`, `> — ${k.name}, ${k.role}`, '');
  out.push('## Off the clock', '', ...about.offTheClock.map(absLinks).flatMap((p) => [p, '']), '## Contact', '', ...contactLines());
  return out.join('\n') + '\n';
}

export function projectsMd(projects: CollectionEntry<'projects'>[]) {
  const out = [`# Projects by ${site.name}`, '', 'Newest first.', ''];
  for (const p of projects) out.push(`- [${p.data.title}](${abs(`/projects/${p.id}.md`)}) (${p.data.year}): ${p.data.summary}`);
  return out.join('\n') + '\n';
}

// Project write-ups are Markdown with a few HTML figures; turn images into Markdown.
function cleanBody(body: string) {
  return absLinks(
    body
      .replace(/<img[^>]*?src="([^"]+)"[^>]*?alt="([^"]*)"[^>]*>/g, (_, src, alt) => `![${alt}](${abs(src)})`)
      .replace(/<img[^>]*?alt="([^"]*)"[^>]*?src="([^"]+)"[^>]*>/g, (_, alt, src) => `![${alt}](${abs(src)})`)
      .replace(/<figcaption>([\s\S]*?)<\/figcaption>/g, (_, c) => `\n*${c.replace(/<a href="([^"]+)">([^<]+)<\/a>/g, '[$2]($1)').trim()}*`)
      .replace(/<\/?figure[^>]*>/g, '')
      .replace(/\n{3,}/g, '\n\n'),
  ).trim();
}

export function projectMd(p: CollectionEntry<'projects'>) {
  const out = [`# ${p.data.title}`, '', `${p.data.year} · by ${site.name}`];
  if (p.data.link) out.push('', `Link: [${p.data.linkLabel ?? p.data.link}](${p.data.link})`);
  out.push('', `> ${p.data.summary}`, '', cleanBody(p.body ?? ''));
  return out.join('\n') + '\n';
}

export function llmsTxt(projects: CollectionEntry<'projects'>[]) {
  const per = site.person;
  return [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} is a ${per.jobTitle} at ${per.employer.name} (${per.employer.url}), based in ${site.location}, Canada. Before that, eleven years at Shopify: merchant support, then product manager for Shopify’s tax platform, then Shop Pay (including taking it beyond Shopify, launching with Everlane), and product lead for Shop and Shop Pay. Areas: ${per.knowsAbout.join(', ').toLowerCase()}. Open to advising, speaking, and coffee chats about payments and commerce.`,
    '',
    'The homepage is an interactive chat; every page also has a plain Markdown version, listed below.',
    '',
    '## Pages',
    '',
    `- [Home (the chat’s answers)](${abs('/index.md')}): who Brian is, what he works on, his career, how he works`,
    `- [About](${abs('/about.md')}): how he works, full career path, recommendations, life outside work`,
    `- [Projects](${abs('/projects.md')}): everything he has built or keeps fixing`,
    '',
    '## Projects',
    '',
    ...projects.map((p) => `- [${p.data.title}](${abs(`/projects/${p.id}.md`)}): ${p.data.summary}`),
    '',
    '## Contact',
    '',
    ...contactLines(),
    '',
    '## Optional',
    '',
    `- [Everything in one file](${abs('/llms-full.txt')})`,
    '',
  ].join('\n');
}

export function llmsFull(projects: CollectionEntry<'projects'>[]) {
  return [homeMd(), aboutMd(), projectsMd(projects), ...projects.map(projectMd)].join('\n---\n\n');
}
