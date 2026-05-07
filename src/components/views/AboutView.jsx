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

function getChapterNumber(index) {
  return String(index + 1).padStart(2, '0');
}

function ChapterNav({ navItems, activeId, isDark, onNavigate }) {
  const theme = pickTheme(isDark);

  return (
    <nav className="sticky top-36 space-y-6">
      <div className={`h-px w-10 transition-colors duration-700 ${theme('bg-zinc-700', 'bg-zinc-300')}`} />
      {navItems.map((item, index) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex w-full items-baseline gap-3 text-left transition-colors duration-500 ${
              isActive
                ? theme('text-zinc-200', 'text-zinc-800')
                : theme('text-zinc-600 hover:text-zinc-300', 'text-zinc-400 hover:text-zinc-600')
            }`}
          >
            <span className="font-mono text-[0.62rem]">{getChapterNumber(index)}</span>
            <span className="font-display text-[0.82rem] leading-relaxed">{item.label}</span>
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
  const openingQuote = chapters[0]?.blocks.find((block) => block.type === 'quote')?.content;
  const openingParagraph = chapters[0]?.blocks.find((block) => block.type === 'paragraph')?.content;

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
    <div className="min-h-screen px-6 pt-[8.5rem] md:pt-48">
      <FadeIn>
        <div className="mx-auto max-w-[1080px]">
          <header className="mb-24 grid gap-y-10 md:mb-[7.5rem] md:grid-cols-[9rem_minmax(0,1fr)] md:gap-x-12">
            <div className="md:pt-4">
              <p className="font-display text-[0.72rem] leading-loose text-zinc-500 transition-colors duration-700">
                ABOUT
                <br />
                PRESENT TENSE
              </p>
            </div>

            <div className="max-w-[760px]">
              <p className={`font-serif text-[2.45rem] leading-tight transition-colors duration-700 md:text-[4.4rem] ${theme('text-zinc-100', 'text-zinc-900')}`}>
                {openingQuote || 'Carson永远沉溺于过去和未来。'}
              </p>

              <div className={`mt-10 grid gap-y-6 border-t pt-7 transition-colors duration-700 md:grid-cols-[minmax(0,1fr)_12rem] md:gap-x-12 ${theme('border-zinc-800', 'border-zinc-200')}`}>
                <p className={`font-serif text-[1.08rem] leading-[1.95] transition-colors duration-700 ${theme('text-zinc-400', 'text-zinc-600')}`}>
                  {openingParagraph}
                </p>
                <p className="font-display text-[0.72rem] leading-loose text-zinc-500 transition-colors duration-700">
                  Software Engineering
                  <br />
                  Interactive Media
                  <br />
                  Human Experience
                </p>
              </div>
            </div>
          </header>

          <div className="lg:grid lg:grid-cols-[minmax(0,760px)_180px] lg:justify-center lg:gap-x-24">
            <article className="mx-auto max-w-[760px] space-y-24 md:space-y-[7.5rem] lg:mx-0">
              {chapters.map((chapter, chapterIndex) => (
                <section key={chapter.id} id={chapter.id} className="scroll-mt-32 md:scroll-mt-40">
                  <div className="grid gap-y-7 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-x-10">
                    <header>
                      <p className={`font-mono text-[0.68rem] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>
                        {getChapterNumber(chapterIndex)}
                      </p>
                      <h2
                        className={`mt-3 font-display text-[0.86rem] leading-relaxed transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-700')}`}
                      >
                        {chapter.title}
                      </h2>
                    </header>

                    <div className="space-y-6">
                      {chapter.blocks.map((block, idx) => {
                        const isOpeningQuote = chapterIndex === 0 && idx === 0 && block.type === 'quote';
                        const isOpeningParagraph = chapterIndex === 0 && idx === 1 && block.content === openingParagraph;

                        if (isOpeningQuote || isOpeningParagraph) {
                          return null;
                        }

                        if (block.type === 'paragraph') {
                          return (
                            <p
                              key={`${chapter.id}-p-${idx}`}
                              className={`font-serif text-[1.08rem] leading-[2.05] transition-colors duration-700 md:text-[1.13rem] ${theme(
                                'text-zinc-300/92',
                                'text-zinc-700/94'
                              )}`}
                            >
                              <BoldText text={block.content} isDark={isDark} />
                            </p>
                          );
                        }

                        if (block.type === 'traits') {
                          return (
                            <ul key={`${chapter.id}-t-${idx}`} className="grid gap-3 py-2 sm:grid-cols-2">
                              {block.items.map((item, itemIndex) => (
                                <li
                                  key={`${chapter.id}-trait-${itemIndex}`}
                                  className={`flex items-start gap-3 border-t pt-3 text-base leading-relaxed transition-colors duration-700 ${theme(
                                    'border-zinc-800 text-zinc-300',
                                    'border-zinc-200 text-zinc-700'
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
                              className={`my-10 border-y py-6 font-serif italic transition-colors duration-700 ${theme(
                                'border-zinc-800 text-zinc-200',
                                'border-zinc-200 text-zinc-800'
                              )}`}
                            >
                              <span className="text-[1.08rem] leading-[1.95]">{block.content}</span>
                            </blockquote>
                          );
                        }

                        return null;
                      })}
                    </div>
                  </div>
                </section>
              ))}

              <footer className={`ml-auto max-w-[620px] border-t pt-8 transition-colors duration-700 ${theme('border-zinc-800', 'border-zinc-200')}`}>
                <p className={`mb-5 font-display text-sm transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-700')}`}>
                  Elsewhere
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-3 font-display text-sm transition-colors duration-700">
                  {links.map((link) => (
                    <a
                      key={link.label}
                      href={link.link.includes('@') ? `mailto:${link.link}` : link.link}
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
              </footer>
            </article>

            <aside className="hidden lg:block">
              <ChapterNav
                navItems={navItems}
                activeId={activeSection}
                isDark={isDark}
                onNavigate={handleNavigate}
              />
            </aside>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
