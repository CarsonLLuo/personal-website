import { useEffect, useRef, useState } from 'react';
import { pickTheme } from '../../lib/theme.js';

function TocNav({ sections, activeId, isDark, onNavigate }) {
  const theme = pickTheme(isDark);

  return (
    <nav className="sticky top-32 space-y-1.5">
      {sections.map((section) => {
        const isActive = section.id === activeId;
        return (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`block w-full text-left text-[0.88rem] transition-all duration-500 ${
              isActive
                ? `border-l pl-3 ${theme('border-zinc-400/70 text-zinc-200', 'border-zinc-500/70 text-zinc-800')}`
                : `border-l border-transparent pl-3 ${theme('text-zinc-600 hover:text-zinc-300', 'text-zinc-400 hover:text-zinc-600')}`
            }`}
          >
            {section.label}
          </button>
        );
      })}
    </nav>
  );
}

export default function ProjectLayout({ sections, isDark, children }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const sectionRefs = useRef({});

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!els.length) return;

    const update = () => {
      const offset = 160;
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 8;

      if (atBottom) {
        setActiveId(els[els.length - 1].id);
        return;
      }

      const nearest = els.reduce((closest, el) => {
        const dist = Math.abs(el.getBoundingClientRect().top - offset);
        return !closest || dist < closest.dist ? { id: el.id, dist } : closest;
      }, null);

      if (nearest) setActiveId(nearest.id);
    };

    update();
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { update(); ticking = false; });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sections]);

  const handleNavigate = (id) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex justify-between gap-12 lg:gap-16">
      <div className="min-w-0 flex-1">
        {children}
      </div>
      <aside className="hidden w-40 shrink-0 md:block">
        <TocNav
          sections={sections}
          activeId={activeId}
          isDark={isDark}
          onNavigate={handleNavigate}
        />
      </aside>
    </div>
  );
}
