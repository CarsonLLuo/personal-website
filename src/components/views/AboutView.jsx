import FadeIn from '../common/FadeIn.jsx';
import { aboutContent } from '../../data/siteContent.js';
import { pickTheme } from '../../lib/theme.js';

function AboutColumnSection({ section, isDark }) {
  const theme = pickTheme(isDark);

  return (
    <div className={`relative border-l pl-6 transition-colors duration-700 sm:pl-8 ${theme('border-zinc-800/80', 'border-zinc-200')}`}>
      <h3
        className={`mb-5 font-display text-[0.65rem] uppercase tracking-[0.26em] transition-colors duration-700 ${theme(
          'text-zinc-400/90',
          'text-zinc-500'
        )}`}
      >
        {section.title}
      </h3>

      {section.type === 'timeline' && (
        <div className="mt-4 space-y-6">
          {section.items.map((item) => (
            <div key={`${section.title}-${item.title}`}>
              <div className={`font-display text-[1.07rem] leading-snug transition-colors duration-700 ${theme('text-zinc-200', 'text-zinc-800')}`}>
                {item.title}
              </div>
              <div className={`mt-1.5 text-[0.98rem] leading-relaxed transition-colors duration-700 ${theme('text-zinc-400', 'text-zinc-500')}`}>
                {item.meta}
                <br />
                {item.period}
              </div>
            </div>
          ))}
        </div>
      )}

      {section.type === 'paragraph' && (
        <p className={`mt-4 text-base leading-[1.82] transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-700')}`}>
          {section.content}
        </p>
      )}

      {section.type === 'reading-list' && (
        <ul className={`mt-4 space-y-2.5 text-base leading-relaxed transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-700')}`}>
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

      {section.type === 'group-list' && (
        <div className="mt-4 space-y-7">
          {section.groups.map((group) => (
            <div key={`${section.title}-${group.label}`} className="space-y-2.5">
              <div className={`font-display text-[0.63rem] uppercase tracking-[0.22em] transition-colors duration-700 ${theme('text-zinc-400', 'text-zinc-500')}`}>
                {group.label}
              </div>
              <ul className={`space-y-1.5 text-base leading-relaxed transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-700')}`}>
                {group.items.map((item) => (
                  <li key={`${group.label}-${item}`}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {section.type === 'bullet-list' && (
        <ul className={`mt-4 space-y-2.5 text-base leading-relaxed transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-700')}`}>
          {section.items.map((item) => (
            <li key={`${section.title}-${item}`} className="relative pl-4.5">
              <span className={`absolute left-0 top-[0.62rem] h-1 w-1 rounded-full ${theme('bg-zinc-500', 'bg-zinc-400')}`} />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AboutView({ isDark }) {
  const theme = pickTheme(isDark);
  const aboutSections = [...aboutContent.leftColumnSections, ...aboutContent.rightColumnSections];

  return (
    <div className="min-h-screen pt-40">
      <FadeIn>
        <section className="max-w-[42rem] space-y-16 font-sans text-base md:space-y-20">
          <div className="space-y-8">
            <h1 className={`font-display text-2xl transition-colors duration-700 ${theme('text-zinc-100', 'text-zinc-900')}`}>
              About
            </h1>
            <div className={`max-w-[38rem] space-y-5 leading-relaxed transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-700')}`}>
              {aboutContent.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="space-y-14 md:space-y-16">
            {aboutSections.map((section) => (
              <AboutColumnSection key={section.title} section={section} isDark={isDark} />
            ))}
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4 font-display text-sm transition-colors duration-700">
            {aboutContent.links.map((link) => (
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
        </section>
      </FadeIn>
    </div>
  );
}
