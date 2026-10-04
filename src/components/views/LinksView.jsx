import FadeIn from '../common/FadeIn.jsx';
import friendLinksContent from '../../data/friendLinks.json';
import { pickTheme } from '../../lib/theme.js';

function isExternal(href) {
  return href.startsWith('http');
}

function LinkRow({ item, index, isDark }) {
  const theme = pickTheme(isDark);

  return (
    <a
      href={item.href}
      target={isExternal(item.href) ? '_blank' : undefined}
      rel={isExternal(item.href) ? 'noreferrer' : undefined}
      className={`group -mx-4 grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 border-t px-4 py-6 transition-colors duration-300 ${theme(
        'border-zinc-800/80 hover:border-zinc-600 hover:bg-zinc-900/40',
        'border-zinc-200 hover:border-zinc-400 hover:bg-zinc-100/60'
      )}`}
    >
      <p className={`pt-1 font-mono text-[0.68rem] transition-colors duration-300 ${theme('text-zinc-700 group-hover:text-zinc-400', 'text-zinc-300 group-hover:text-zinc-500')}`}>
        {String(index + 1).padStart(2, '0')}
      </p>

      <div className="min-w-0 transition-transform duration-300 group-hover:translate-x-1">
        <div className="flex flex-col gap-1 font-sans sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <div className={`font-display text-lg transition-colors duration-200 ${theme('text-zinc-200 group-hover:text-white', 'text-zinc-800 group-hover:text-black')}`}>
            {item.name}
            <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"> ↗</span>
          </div>
          {item.status ? (
            <div className={`shrink-0 font-display text-xs transition-colors duration-500 sm:text-right ${theme('text-zinc-600 group-hover:text-zinc-400', 'text-zinc-400 group-hover:text-zinc-500')}`}>
              {item.status}
            </div>
          ) : null}
        </div>

        <p className={`mt-2 max-w-[34rem] text-sm leading-relaxed transition-colors duration-500 ${theme('text-zinc-400 group-hover:text-zinc-300', 'text-zinc-500 group-hover:text-zinc-600')}`}>
          {item.intro}
        </p>

        {item.tags?.length ? (
          <p className={`mt-3 font-mono text-[0.66rem] tracking-[0.06em] transition-colors duration-500 ${theme('text-zinc-700 group-hover:text-zinc-500', 'text-zinc-300 group-hover:text-zinc-400')}`}>
            {item.tags.join(' · ')}
          </p>
        ) : null}
      </div>
    </a>
  );
}

export default function LinksView({ isDark }) {
  const theme = pickTheme(isDark);
  const { title, descriptionLines, originalLines, englishLines, inspiration, invitation, sections } = friendLinksContent;

  return (
    <div className="mx-auto max-w-2xl px-6">
      <div className="min-h-screen pt-40">
        <FadeIn>
          <header className="mb-20">
            <p className={`mb-6 font-mono text-[0.68rem] tracking-[0.08em] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>
              LINKS / QUIET WEB
            </p>

            <h1 className={`font-display text-5xl leading-none transition-colors duration-700 md:text-6xl ${theme('text-zinc-100', 'text-zinc-900')}`}>
              {title}
            </h1>

            <div className={`mt-9 border-t pt-8 transition-colors duration-700 ${theme('border-zinc-800', 'border-zinc-200')}`}>
              <div className="space-y-3">
                {descriptionLines.map((line) => (
                  <p
                    key={line}
                    className={`font-serif text-[1.1rem] leading-[1.85] transition-colors duration-700 md:text-[1.18rem] ${theme('text-zinc-300', 'text-zinc-700')}`}
                  >
                    {line}
                  </p>
                ))}
              </div>

              <div className={`mt-8 grid gap-y-6 border-t pt-6 transition-colors duration-700 md:grid-cols-2 md:gap-x-8 ${theme('border-zinc-800/60', 'border-zinc-200')}`}>
                <div>
                  <p className={`mb-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>
                    DE / original
                  </p>
                  <div className="space-y-1.5" lang="de">
                    {originalLines.map((line) => (
                      <p key={line} className="font-serif text-[0.8rem] italic leading-[1.65] text-zinc-500">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <p className={`mb-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>
                    EN / trans. Wright
                  </p>
                  <div className="space-y-1.5" lang="en">
                    {englishLines.map((line) => (
                      <p key={line} className="font-serif text-[0.8rem] leading-[1.65] text-zinc-500">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <p className={`mt-7 font-display text-[11px] uppercase tracking-[0.2em] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>
                {inspiration}
              </p>
            </div>
          </header>

          <div className="space-y-16">
            <section>
              <div className="mb-6 flex items-baseline gap-4">
                <h3 className={`font-display text-[11px] uppercase tracking-[0.24em] transition-colors duration-700 ${theme('text-zinc-400', 'text-zinc-500')}`}>
                  {invitation.label}
                </h3>
                <p className={`font-display text-[11px] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>
                  {invitation.title}
                </p>
              </div>

              <div className={`space-y-4 border-t pt-6 transition-colors duration-700 ${theme('border-zinc-800/80', 'border-zinc-200')}`}>
                <p className={`max-w-[34rem] text-[0.98rem] leading-[1.85] transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-700')}`}>
                  {invitation.zh}
                </p>
                <p className="max-w-[34rem] text-[0.9rem] leading-[1.8] text-zinc-500" lang="en">
                  {invitation.en}
                </p>
              </div>
            </section>

            {sections.map((section) => (
              <section key={section.id}>
                <div className="mb-6 flex items-baseline gap-4">
                  <h3 className={`font-display text-[11px] uppercase tracking-[0.24em] transition-colors duration-700 ${theme('text-zinc-400', 'text-zinc-500')}`}>
                    {section.label}
                  </h3>
                  <p className={`font-display text-[11px] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>
                    {section.title}
                  </p>
                </div>

                <div className="flex flex-col">
                  {section.items.map((item, index) => (
                    <LinkRow key={item.name} item={item} index={index} isDark={isDark} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
