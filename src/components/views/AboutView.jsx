import FadeIn from '../common/FadeIn.jsx';
import { aboutContent } from '../../data/siteContent.js';
import { pickTheme } from '../../lib/theme.js';

function AboutColumnSection({ section, isDark }) {
  const theme = pickTheme(isDark);

  return (
    <div>
      <h3
        className={`mb-4 font-display text-[11px] uppercase tracking-[0.24em] transition-colors duration-700 ${theme(
          'text-zinc-400/90',
          'text-zinc-500'
        )}`}
      >
        {section.title}
      </h3>

      {section.type === 'timeline' && (
        <div className="mt-4 space-y-5">
          {section.items.map((item) => (
            <div key={`${section.title}-${item.title}`}>
              <div className={`font-display text-base transition-colors duration-700 ${theme('text-zinc-200', 'text-zinc-800')}`}>
                {item.title}
              </div>
              <div className={`mt-1 text-sm transition-colors duration-700 ${theme('text-zinc-400', 'text-zinc-500')}`}>
                {item.meta}
                <br />
                {item.period}
              </div>
            </div>
          ))}
        </div>
      )}

      {section.type === 'paragraph' && (
        <p className={`mt-4 leading-relaxed transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-700')}`}>
          {section.content}
        </p>
      )}

      {section.type === 'reading-list' && (
        <ul className={`mt-4 space-y-2 transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-700')}`}>
          {section.items.map((item) => (
            <li key={`${item.author}-${item.title}`}>
              {item.author} -{' '}
              <em className={`italic transition-colors duration-700 ${theme('text-zinc-200', 'text-zinc-800')}`}>
                {item.title}
              </em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AboutView({ isDark }) {
  const theme = pickTheme(isDark);

  return (
    <div className="min-h-screen pt-40">
      <FadeIn>
        <section className="space-y-16 font-sans text-sm">
          <div>
            <h1 className={`mb-8 font-display text-2xl transition-colors duration-700 ${theme('text-zinc-100', 'text-zinc-900')}`}>
              About
            </h1>
            <div className={`max-w-xl space-y-4 leading-relaxed transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-700')}`}>
              {aboutContent.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            <div className="space-y-12">
              {aboutContent.leftColumnSections.map((section) => (
                <AboutColumnSection key={section.title} section={section} isDark={isDark} />
              ))}
            </div>

            <div className="space-y-12">
              {aboutContent.rightColumnSections.map((section) => (
                <AboutColumnSection key={section.title} section={section} isDark={isDark} />
              ))}
            </div>
          </div>

          <div
            className="flex flex-wrap gap-8 pt-6 font-display text-sm transition-colors duration-700"
          >
            {aboutContent.links.map((link) => (
              <a
                key={link.label}
                href={link.link}
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
        </section>
      </FadeIn>
    </div>
  );
}
