import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const distIndexPath = path.join(distDir, 'index.html');

const siteName = 'Carson Luo';
const twitterHandle = '@carsonluo2003';
const defaultImage = '/social-preview.png';
const defaultDescription =
  'Programmer, researcher, writer. Notes and projects from somewhere between systems and human experience.';

const socialMetaNames = [
  'description',
  'og:type',
  'og:site_name',
  'og:title',
  'og:description',
  'og:image',
  'og:image:alt',
  'og:url',
  'twitter:card',
  'twitter:site',
  'twitter:creator',
  'twitter:title',
  'twitter:description',
  'twitter:image',
  'twitter:image:alt',
].join('|');

const socialMetaPattern = new RegExp(
  `\\n?\\s*<meta\\s+(?=[^>]*(?:name|property)=["'](?:${socialMetaNames})["'])[^>]*>`,
  'gi'
);
const canonicalPattern = /\n?\s*<link\s+(?=[^>]*rel=["']canonical["'])[^>]*>/gi;
const titlePattern = /\n?\s*<title>[\s\S]*?<\/title>/i;

function envSiteUrl() {
  const raw =
    process.env.SITE_URL ||
    process.env.VITE_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;

  if (!raw) return null;

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, '');
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[char];
  });
}

function absoluteUrl(siteUrl, value) {
  if (/^https?:\/\//i.test(value)) return value;
  const pathname = value.startsWith('/') ? value : `/${value}`;
  return `${siteUrl}${pathname}`;
}

function pageHead(siteUrl, page) {
  const title = page.title || `${siteName} | Personal Website`;
  const description = page.description || defaultDescription;
  const image = absoluteUrl(siteUrl, page.image || defaultImage);
  const url = absoluteUrl(siteUrl, page.urlPath || '/');
  const imageAlt = page.imageAlt || `Abstract dark editorial social preview for ${title}`;
  const ogType = page.ogType || 'website';

  return [
    `    <title>${escapeHtml(title)}</title>`,
    `    <meta name="description" content="${escapeHtml(description)}" />`,
    `    <link rel="canonical" href="${escapeHtml(url)}" />`,
    `    <meta property="og:type" content="${escapeHtml(ogType)}" />`,
    `    <meta property="og:site_name" content="${escapeHtml(siteName)}" />`,
    `    <meta property="og:title" content="${escapeHtml(title)}" />`,
    `    <meta property="og:description" content="${escapeHtml(description)}" />`,
    `    <meta property="og:image" content="${escapeHtml(image)}" />`,
    `    <meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`,
    `    <meta property="og:url" content="${escapeHtml(url)}" />`,
    '    <meta name="twitter:card" content="summary_large_image" />',
    `    <meta name="twitter:site" content="${escapeHtml(twitterHandle)}" />`,
    `    <meta name="twitter:creator" content="${escapeHtml(twitterHandle)}" />`,
    `    <meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `    <meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `    <meta name="twitter:image" content="${escapeHtml(image)}" />`,
    `    <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />`,
  ].join('\n');
}

function withSocialMeta(html, siteUrl, page) {
  const cleaned = html
    .replace(titlePattern, '')
    .replace(socialMetaPattern, '')
    .replace(canonicalPattern, '');

  return cleaned.replace('</head>', `${pageHead(siteUrl, page)}\n  </head>`);
}

async function readJson(relativePath) {
  const file = await readFile(path.join(rootDir, relativePath), 'utf8');
  return JSON.parse(file);
}

function projectPages(projectCollections) {
  return [
    {
      urlPath: '/projects/',
      title: 'Projects Index | Carson Luo',
      description: 'A complete log of research and builds.',
    },
    ...projectCollections.flatMap((collection) => collection.items
      .filter((project) => project.slug)
      .map((project) => ({
        urlPath: `/projects/${encodeURIComponent(project.slug)}/`,
        title: `${project.name} | Project | Carson Luo`,
        description: project.desc,
        image: project.image,
      }))),
  ];
}

function notePages(notes) {
  return [
    {
      urlPath: '/notes/',
      title: 'Notes Archive | Carson Luo',
      description: 'Fragments, essays, and observations.',
    },
    ...notes
      .filter((note) => note.slug)
      .map((note) => ({
        urlPath: `/notes/${encodeURIComponent(note.slug)}/`,
        title: `${note.title} | Note | Carson Luo`,
        description: note.desc,
        image: note.image,
        ogType: 'article',
      })),
  ];
}

async function writePage(baseHtml, siteUrl, page) {
  const outputPath = path.join(distDir, page.urlPath, 'index.html');
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, withSocialMeta(baseHtml, siteUrl, page), 'utf8');
}

async function main() {
  const configuredSiteUrl = envSiteUrl();
  const siteUrl = configuredSiteUrl || 'http://localhost:4173';
  if (!configuredSiteUrl) {
    console.warn(`[social] SITE_URL is not set; using ${siteUrl} for local social URLs.`);
  }

  const baseHtml = await readFile(distIndexPath, 'utf8');
  const projectCollections = await readJson('src/data/projects.json');
  const notes = await readJson('src/data/notes.json');
  const pages = [
    {
      urlPath: '/',
      title: 'Carson Luo | Personal Website',
      description: defaultDescription,
    },
    ...projectPages(projectCollections),
    ...notePages(notes),
    {
      urlPath: '/about/',
      title: 'About | Carson Luo',
      description: 'About Carson, coding, and this personal field.',
    },
  ];

  await writeFile(distIndexPath, withSocialMeta(baseHtml, siteUrl, pages[0]), 'utf8');
  await Promise.all(pages.slice(1).map((page) => writePage(baseHtml, siteUrl, page)));

  console.log(`[social] Generated ${pages.length} social preview pages.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
