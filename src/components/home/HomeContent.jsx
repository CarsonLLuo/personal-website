import FadeIn from '../common/FadeIn.jsx';
import NoteListItem from '../common/NoteListItem.jsx';
import ProjectCard from '../common/ProjectCard.jsx';
import { HOME_PREVIEW_LIMITS, SITE_VIEWS } from '../../constants/site.js';
import { homeContent } from '../../data/siteContent.js';
import projectCollections from '../../data/projects.json';
import notes from '../../data/notes.json';
import { sortNotesByDateDesc } from '../../lib/noteSorting.js';
import { pickTheme } from '../../lib/theme.js';

const sortedNotes = sortNotesByDateDesc(notes);

export default function HomeContent({ isDark, onViewChange }) {
  const theme = pickTheme(isDark);
  const [leadStatement, supportingStatement, closingStatement] = homeContent.statementLines;
  const statementItems = [
    { index: '01', label: 'Code', text: leadStatement, variant: 'lead' },
    { index: '02', label: 'Research', text: supportingStatement },
    { index: '03', label: 'Between', text: closingStatement, variant: 'serif' },
  ];

  return (
    <main className="relative z-10 mx-auto max-w-[900px] space-y-32 px-6 pt-32 pb-32">
      <FadeIn>
        <section className="grid gap-y-8 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-x-16">
          <div>
            <div
              className={`font-display text-[10px] uppercase leading-[1.9] tracking-[0.28em] transition-colors duration-700 ${theme(
                'text-zinc-500/80',
                'text-zinc-500/85'
              )}`}
            >
              {homeContent.fragmentLabel.split(' / ').map((part, i) => (
                <div key={i}>{i > 0 ? '/ ' : ''}{part}</div>
              ))}
            </div>
          </div>

          <div className="md:pt-1">
            <p
              className={`max-w-[40rem] font-serif text-[1.18rem] leading-[1.95] italic transition-colors duration-700 md:text-[1.42rem] ${theme(
                'text-zinc-300/88',
                'text-zinc-700/88'
              )}`}
            >
              {homeContent.intro}
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={120}>
        <section className={`grid gap-y-9 border-y py-12 transition-colors duration-700 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-x-16 md:py-16 ${theme('border-zinc-800/80', 'border-zinc-200')}`}>
          <div>
            <p className={`font-display text-[10px] uppercase leading-[1.9] tracking-[0.28em] transition-colors duration-700 ${theme('text-zinc-500/80', 'text-zinc-500/85')}`}>
              Statement
              <br />
              Three Notes
            </p>
          </div>

          <div>
            <div className="space-y-10">
              {statementItems.map((item) => (
                <div
                  key={item.index}
                  className={`grid gap-y-4 md:grid-cols-[4rem_minmax(0,1fr)] md:gap-x-8 ${
                    item.index === '01' ? '' : `border-t pt-8 ${theme('border-zinc-800/75', 'border-zinc-200')}`
                  }`}
                >
                  <div className="flex items-baseline gap-3 md:block">
                    <p className={`font-mono text-[0.68rem] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>
                      {item.index}
                    </p>
                    <p className={`font-display text-[0.72rem] uppercase tracking-[0.18em] transition-colors duration-700 md:mt-3 ${theme('text-zinc-500', 'text-zinc-500')}`}>
                      {item.label}
                    </p>
                  </div>

                  <p
                    className={`max-w-[44rem] transition-colors duration-700 ${
                      item.variant === 'lead'
                        ? `font-serif text-[1.72rem] leading-[1.58] md:text-[2.45rem] ${theme('text-zinc-100/94', 'text-zinc-900/88')}`
                        : item.variant === 'serif'
                          ? `font-serif text-[1.1rem] leading-[1.9] italic md:text-[1.2rem] ${theme('text-zinc-400/92', 'text-zinc-600/92')}`
                          : `font-sans text-[1.02rem] leading-[1.95] font-light md:text-[1.12rem] ${theme('text-zinc-300/92', 'text-zinc-700/94')}`
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className={`font-display text-lg transition-colors duration-700 ${theme('text-zinc-100', 'text-zinc-900')}`}>Projects</h2>
            <button
              onClick={() => onViewChange(SITE_VIEWS.PROJECTS)}
              className={`font-display text-xs transition-colors ${theme('text-zinc-400 hover:text-white', 'text-zinc-500 hover:text-black')}`}
            >
              Index ↗
            </button>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-8">
            {projectCollections.map((collection) => (
              <div key={collection.id}>
                <h3 className={`mb-6 font-display text-xs uppercase tracking-widest transition-colors duration-700 ${theme('text-zinc-500', 'text-zinc-400')}`}>
                  {collection.label}
                </h3>
                <div className="space-y-6">
                  {collection.items
                    .slice(0, HOME_PREVIEW_LIMITS.PROJECTS_PER_GROUP)
                    .map((project) => (
                      <ProjectCard key={project.name} project={project} isDark={isDark} variant="compact" onViewChange={onViewChange} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className={`font-display text-lg transition-colors duration-700 ${theme('text-zinc-100', 'text-zinc-900')}`}>Notes</h2>
            <button
              onClick={() => onViewChange(SITE_VIEWS.NOTES)}
              className={`font-display text-xs transition-colors ${theme('text-zinc-400 hover:text-white', 'text-zinc-500 hover:text-black')}`}
            >
              Archive ↗
            </button>
          </div>

          <div className="flex flex-col">
            {sortedNotes.slice(0, HOME_PREVIEW_LIMITS.NOTES).map((note) => (
              <NoteListItem key={note.slug ?? note.title} note={note} isDark={isDark} variant="full"
                onNavigate={note.slug ? () => onViewChange(`note:${note.slug}`) : undefined}
              />
            ))}
          </div>
        </section>
      </FadeIn>
    </main>
  );
}
