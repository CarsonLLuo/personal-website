import { useEffect, useMemo, useState } from 'react';
import FadeIn from '../common/FadeIn.jsx';
import { aboutContent } from '../../data/siteContent.js';
import { pickTheme } from '../../lib/theme.js';
import aboutMarkdown from '../../data/aboutContent.md?raw';

function BoldText({ text, isDark }) {
  const theme = pickTheme(isDark);
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong
              key={i}
              className={`font-medium transition-colors duration-700 ${theme('text-zinc-200', 'text-zinc-800')}`}
            >
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function parseMarkdownSections(markdown) {
  const lines = markdown.split('\n');
  const sections = [];
  let current = null;

  lines.forEach((line) => {
    const headingMatch = line.match(/^##\s+(.+)$/);
    if (headingMatch) {
      if (current) sections.push(current);
      current = { title: headingMatch[1].trim(), lines: [] };
      return;
    }
    if (current) current.lines.push(line);
  });

  if (current) sections.push(current);
  return sections;
}

function parseBlocks(lines) {
  const blocks = [];
  let paragraphBuffer = [];

  const flushParagraph = () => {
    if (!paragraphBuffer.length) return;
    blocks.push({ type: 'paragraph', content: paragraphBuffer.join(' ') });
    paragraphBuffer = [];
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();

    if (!line) {
      flushParagraph();
      continue;
    }

    if (line.startsWith('> ')) {
      flushParagraph();
      blocks.push({ type: 'quote', content: line.replace(/^>\s+/, '') });
      continue;
    }

    if (line.startsWith('- ')) {
      flushParagraph();
      const items = [];
      let j = i;

      while (j < lines.length) {
        const itemLine = lines[j].trim();
        if (!itemLine.startsWith('- ')) break;
        const itemContent = itemLine.slice(2).trim();
        const [firstToken, ...restTokens] = itemContent.split(' ');
        const hasEmoji = /\p{Extended_Pictographic}/u.test(firstToken);
        items.push({
          emoji: hasEmoji ? firstToken : '•',
          text: hasEmoji ? restTokens.join(' ') : itemContent,
        });
        j += 1;
      }

      blocks.push({ type: 'traits', items });
      i = j - 1;
      continue;
    }

    paragraphBuffer.push(line);
  }

  flushParagraph();
  return blocks;
}

function buildChapters(markdown, navItems) {
  const sectionMap = new Map(parseMarkdownSections(markdown).map((s) => [s.title, s.lines]));
  return navItems.map((item) => {
    const lines = sectionMap.get(item.title) || [];
    return {
      id: item.id,
      title: item.title,
      blocks: parseBlocks(lines),
    };
  });
}

function ChapterNav({ navItems, activeId, isDark, onNavigate }) {
  const theme = pickTheme(isDark);

  return (
    <nav className={`sticky top-32 space-y-2 rounded-2xl border px-5 py-5 transition-colors duration-700 ${theme('border-zinc-700/60 bg-zinc-800/60', 'border-zinc-200 bg-zinc-100/80')}`}>
      {navItems.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`block w-full text-left text-[0.92rem] transition-all duration-500 ${
              isActive
                ? `border-l pl-3 ${theme('border-emerald-500/70 text-zinc-200', 'border-emerald-600/70 text-zinc-800')}`
                : `border-l border-transparent pl-3 ${theme('text-zinc-500 hover:text-zinc-300', 'text-zinc-400 hover:text-zinc-600')}`
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

export default function AboutView({ isDark }) {
  const theme = pickTheme(isDark);
  const { navItems, links } = aboutContent;
  const chapters = useMemo(() => buildChapters(aboutMarkdown, navItems), [navItems]);
  const [activeSection, setActiveSection] = useState(navItems[0]?.id);

  useEffect(() => {
    const sectionEls = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter(Boolean);

    if (!sectionEls.length) return;

    const updateActiveSection = () => {
      const offset = 170;
      const atPageBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 8;

      if (atPageBottom) {
        setActiveSection(sectionEls[sectionEls.length - 1].id);
        return;
      }

      const nearest = sectionEls.reduce((closest, el) => {
        const distance = Math.abs(el.getBoundingClientRect().top - offset);
        if (!closest || distance < closest.distance) {
          return { id: el.id, distance };
        }
        return closest;
      }, null);

      if (nearest) setActiveSection(nearest.id);
    };

    updateActiveSection();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [chapters]);

  const handleNavigate = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen px-6 pt-32 md:pt-60">
      <FadeIn>
        <div className="flex justify-center gap-10 lg:gap-16">

          <div className="w-full max-w-[1200px] min-w-0">
            {chapters.map((chapter) => (
              <section key={chapter.id} id={chapter.id} className="mb-20 scroll-mt-32 md:mb-24 md:scroll-mt-40">
                <h2
                  className={`mb-8 font-display text-[1.35rem] transition-colors duration-700 md:mb-10 md:text-[2rem] ${theme('text-zinc-100', 'text-zinc-900')}`}
                >
                  {chapter.title}
                </h2>

                <div className="space-y-6">
                  {chapter.blocks.map((block, idx) => {
                    if (block.type === 'paragraph') {
                      return (
                        <p
                          key={`${chapter.id}-p-${idx}`}
                          className={`text-[1.15rem] leading-[1.9] transition-colors duration-700 ${theme(
                            'text-zinc-300',
                            'text-zinc-700'
                          )}`}
                        >
                          <BoldText text={block.content} isDark={isDark} />
                        </p>
                      );
                    }

                    if (block.type === 'traits') {
                      return (
                        <ul key={`${chapter.id}-t-${idx}`} className="space-y-2.5 py-2">
                          {block.items.map((item, itemIndex) => (
                            <li
                              key={`${chapter.id}-trait-${itemIndex}`}
                              className={`flex items-start gap-2.5 text-base leading-relaxed transition-colors duration-700 ${theme(
                                'text-zinc-300',
                                'text-zinc-700'
                              )}`}
                            >
                              <span className="mt-0.5 text-[0.9rem]">{item.emoji}</span>
                              <span>
                                <BoldText text={item.text} isDark={isDark} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    if (block.type === 'quote') {
                      return (
                        <blockquote
                          key={`${chapter.id}-q-${idx}`}
                          className={`my-8 border-l-2 py-1 pl-5 italic transition-colors duration-700 md:my-10 ${theme(
                            'border-emerald-500/60 text-zinc-200',
                            'border-emerald-600/60 text-zinc-800'
                          )}`}
                        >
                          <span className="text-base leading-[1.85]">{block.content}</span>
                        </blockquote>
                      );
                    }

                    return null;
                  })}
                </div>
              </section>
            ))}

            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-8 font-display text-sm transition-colors duration-700">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.link}
                  target={link.link.startsWith('http') ? '_blank' : undefined}
                  rel={link.link.startsWith('http') ? 'noreferrer' : undefined}
                  className={`group flex items-center gap-1 transition-colors ${theme(
                    'text-zinc-400 hover:text-white',
                    'text-zinc-600 hover:text-black'
                  )}`}
                >
                  {link.label}
                  <span className="opacity-0 transition-opacity group-hover:opacity-100">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <aside className="hidden w-72 shrink-0 md:block">
            <ChapterNav
              navItems={navItems}
              activeId={activeSection}
              isDark={isDark}
              onNavigate={handleNavigate}
            />
          </aside>

        </div>
      </FadeIn>
    </div>
  );
}
