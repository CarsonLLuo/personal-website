import FadeIn from '../common/FadeIn.jsx';
import NoteListItem from '../common/NoteListItem.jsx';
import ProjectCard from '../common/ProjectCard.jsx';
import { HOME_PREVIEW_LIMITS, SITE_VIEWS } from '../../constants/site.js';
import { homeContent } from '../../data/siteContent.js';
import projectCollections from '../../data/projects.json';
import notes from '../../data/notes.json';
import { pickTheme } from '../../lib/theme.js';

export default function HomeContent({ isDark, onViewChange }) {
  const theme = pickTheme(isDark);
  const [leadStatement, supportingStatement, closingStatement] = homeContent.statementLines;

  return (
    <main className="relative z-10 mx-auto max-w-2xl space-y-32 px-6 pt-32 pb-32">
      <FadeIn>
        <section className="grid grid-cols-12 gap-y-6 sm:gap-x-6">
          <div className="col-span-12 sm:col-span-3">
            <div
              className={`font-display text-[10px] uppercase tracking-[0.28em] transition-colors duration-700 ${theme(
                'text-zinc-500/80',
                'text-zinc-500/85'
              )}`}
            >
              {homeContent.fragmentLabel}
            </div>
          </div>

          <div className="col-span-12 sm:col-span-9 sm:pt-1">
            <p
              className={`max-w-[42rem] font-serif text-[1.18rem] leading-[1.85] italic transition-colors duration-700 sm:text-[1.45rem] ${theme(
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
        <section className="relative">
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -top-10 left-0 hidden font-serif text-[7rem] leading-none tracking-[-0.06em] sm:block ${theme(
              'text-zinc-700/18',
              'text-zinc-300/55'
            )}`}
          >
            “
          </div>

          <div className="sm:pl-12">
            <div className="max-w-[40rem]">
              <p
                className={`font-serif text-[1.55rem] leading-[1.58] tracking-[-0.03em] transition-colors duration-700 sm:text-[2.15rem] ${theme(
                  'text-zinc-100/94',
                  'text-zinc-900/88'
                )}`}
              >
                {leadStatement}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-12 gap-y-5 sm:gap-x-6">
              <div className="col-span-12 sm:col-span-7">
                <p
                  className={`max-w-[29rem] font-sans text-[1.04rem] leading-[1.95] font-light transition-colors duration-700 sm:text-[1.15rem] ${theme(
                    'text-zinc-300/92',
                    'text-zinc-700/94'
                  )}`}
                >
                  {supportingStatement}
                </p>
              </div>

              <div className="col-span-12 sm:col-span-5 sm:pt-10">
                <p
                  className={`max-w-[18rem] font-serif text-[1rem] leading-[1.9] italic transition-colors duration-700 sm:ml-auto sm:text-[1.08rem] ${theme(
                    'text-zinc-400/88',
                    'text-zinc-600/92'
                  )}`}
                >
                  {closingStatement}
                </p>
              </div>
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

          <div className="flex flex-col gap-6">
            {notes.slice(0, HOME_PREVIEW_LIMITS.NOTES).map((note) => (
              <NoteListItem key={note.title} note={note} isDark={isDark} variant="preview" />
            ))}
          </div>
        </section>
      </FadeIn>
    </main>
  );
}
