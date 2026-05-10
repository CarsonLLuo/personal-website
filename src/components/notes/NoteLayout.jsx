import { useMemo } from 'react';
import { pickTheme } from '../../lib/theme.js';

const NOTE_IMAGE_FILES = import.meta.glob(
  [
    '../../data/notes/**/*.avif',
    '../../data/notes/**/*.gif',
    '../../data/notes/**/*.jpeg',
    '../../data/notes/**/*.jpg',
    '../../data/notes/**/*.png',
    '../../data/notes/**/*.webp',
  ],
  { query: '?url', import: 'default', eager: true }
);

const NOTE_IMAGE_URLS = Object.fromEntries(
  Object.entries(NOTE_IMAGE_FILES).map(([path, url]) => [path.replace('../../data/notes/', ''), url])
);

const SPOTIFY_EMBED_HEIGHT = 152;

function parseImageMarkdown(text) {
  const match = text.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)$/);
  if (!match) return null;
  return { alt: match[1], src: match[2] };
}

function parseHtmlAttributes(text) {
  const attributes = {};
  const matches = text.matchAll(/([\w:-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g);

  for (const match of matches) {
    attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? '';
  }

  return attributes;
}

function parseSpotifyIframe(text) {
  const match = text.match(/^<iframe\s+([\s\S]*?)><\/iframe>$/i);
  if (!match) return null;

  const attributes = parseHtmlAttributes(match[1]);
  if (!attributes.src?.startsWith('https://open.spotify.com/embed/')) return null;

  return {
    src: attributes.src,
    height: SPOTIFY_EMBED_HEIGHT,
    allow: attributes.allow || 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
  };
}

function resolveImageSrc(src) {
  if (/^(?:https?:|data:|blob:|\/)/.test(src)) return src;
  return NOTE_IMAGE_URLS[src.replace(/^\.\//, '')] ?? src;
}

function parseBlocks(markdown) {
  const blocks = [];
  let paragraphBuffer = [];

  const flushParagraph = () => {
    if (!paragraphBuffer.length) return;
    blocks.push({ type: 'paragraph', content: paragraphBuffer.join(' ') });
    paragraphBuffer = [];
  };

  const lines = markdown.split('\n');

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    const spotify = parseSpotifyIframe(trimmed);
    if (spotify) {
      flushParagraph();
      blocks.push({ type: 'spotify', ...spotify });
      continue;
    }

    const image = parseImageMarkdown(trimmed);
    if (image) {
      flushParagraph();
      blocks.push({ type: 'image', ...image });
      continue;
    }

    if (trimmed.startsWith('> ')) {
      flushParagraph();
      blocks.push({ type: 'quote', content: trimmed.replace(/^>\s+/, '') });
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushParagraph();
      blocks.push({ type: 'h3', content: trimmed.slice(4) });
      continue;
    }

    if (trimmed.startsWith('---')) {
      flushParagraph();
      blocks.push({ type: 'divider' });
      continue;
    }

    paragraphBuffer.push(trimmed);
  }

  flushParagraph();
  return blocks;
}

function InlineText({ text, isDark }) {
  const theme = pickTheme(isDark);
  const parts = text.split(/(!\[[^\]]*\]\([^\s)]+(?:\s+"[^"]*")?\)|\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const image = parseImageMarkdown(part);
        if (image) {
          return (
            <img
              key={i}
              src={resolveImageSrc(image.src)}
              alt={image.alt}
              className={`mx-1 inline-block max-h-40 max-w-full rounded-[4px] border object-contain align-middle transition-colors duration-700 ${theme(
                'border-zinc-800',
                'border-zinc-200'
              )}`}
              loading="lazy"
            />
          );
        }

        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className={`font-medium transition-colors duration-700 ${theme('text-zinc-200', 'text-zinc-800')}`}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function NoteLayout({ markdown, meta, isDark }) {
  const theme = pickTheme(isDark);
  const blocks = useMemo(() => parseBlocks(markdown), [markdown]);

  return (
    <div className="mx-auto max-w-[900px]">

      {/* Header */}
      <header className="mb-16">
        <p className={`mb-4 font-display text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>
          {meta.date}
        </p>
        <h1 className={`font-display text-2xl leading-snug transition-colors duration-700 md:text-3xl ${theme('text-zinc-100', 'text-zinc-900')}`}>
          {meta.title}
        </h1>
        {meta.desc && (
          <p className={`mt-4 text-[1rem] leading-relaxed transition-colors duration-700 ${theme('text-zinc-400', 'text-zinc-500')}`}>
            {meta.desc}
          </p>
        )}
        <div className={`mt-8 border-t transition-colors duration-700 ${theme('border-zinc-800', 'border-zinc-200')}`} />
      </header>

      {/* Body */}
      <div className="space-y-6">
        {blocks.map((block, idx) => {
          if (block.type === 'paragraph') {
            return (
              <p
                key={idx}
                className={`text-[1.05rem] leading-[1.95] transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-700')}`}
              >
                <InlineText text={block.content} isDark={isDark} />
              </p>
            );
          }

          if (block.type === 'image') {
            return (
              <figure key={idx} className="mx-auto my-10 max-w-[680px]">
                <img
                  src={resolveImageSrc(block.src)}
                  alt={block.alt}
                  className={`max-h-[58vh] w-full rounded-[6px] border object-contain transition-colors duration-700 ${theme(
                    'border-zinc-800/80',
                    'border-zinc-200'
                  )}`}
                  loading="lazy"
                />
                {block.alt && (
                  <figcaption className={`mt-3 text-center text-sm transition-colors duration-700 ${theme('text-zinc-500', 'text-zinc-500')}`}>
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            );
          }

          if (block.type === 'spotify') {
            return (
              <div
                key={idx}
                className={`mx-auto my-8 max-w-[560px] overflow-hidden rounded-[12px] border transition-colors duration-700 ${theme(
                  'border-zinc-800/80',
                  'border-zinc-200'
                )}`}
              >
                <iframe
                  title="Spotify embedded player"
                  src={block.src}
                  width="100%"
                  height={block.height}
                  frameBorder="0"
                  allowFullScreen
                  allow={block.allow}
                  loading="lazy"
                  className="block w-full"
                />
              </div>
            );
          }

          if (block.type === 'quote') {
            return (
              <blockquote
                key={idx}
                className={`my-8 border-l-2 py-1 pl-5 transition-colors duration-700 ${theme('border-emerald-500/60 text-zinc-300', 'border-emerald-600/60 text-zinc-700')}`}
              >
                <span className="text-[1.05rem] italic leading-[1.95]">
                  <InlineText text={block.content} isDark={isDark} />
                </span>
              </blockquote>
            );
          }

          if (block.type === 'h3') {
            return (
              <h3
                key={idx}
                className={`pt-4 font-display text-[1.05rem] transition-colors duration-700 ${theme('text-zinc-100', 'text-zinc-900')}`}
              >
                {block.content}
              </h3>
            );
          }

          if (block.type === 'divider') {
            return (
              <div
                key={idx}
                className={`my-10 border-t transition-colors duration-700 ${theme('border-zinc-800', 'border-zinc-200')}`}
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
