import { useMemo } from 'react';
import { pickTheme } from '../../lib/theme.js';

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
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
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
    <div className="mx-auto max-w-[680px]">

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
