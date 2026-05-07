import { pickTheme } from '../../lib/theme.js';
import ProjectLayout from './ProjectLayout.jsx';

const META = [
  { label: 'Type',     value: 'Product' },
  { label: 'Year',     value: '2025' },
  { label: 'Role',     value: 'Designer / Developer' },
  { label: 'Status',   value: 'Concept' },
  { label: 'Stack',    value: 'React · Tailwind · Vite' },
];

const SECTIONS = [
  { id: 'overview',  label: 'Overview' },
  { id: 'problem',   label: 'Problem' },
  { id: 'design',    label: 'Design' },
  { id: 'features',  label: 'Features' },
  { id: 'reflection', label: 'Reflection' },
];

function Section({ id, title, isDark, children }) {
  const theme = pickTheme(isDark);
  return (
    <section id={id} className="mb-16 scroll-mt-32">
      <h2 className={`mb-6 font-display text-lg transition-colors duration-700 ${theme('text-zinc-100', 'text-zinc-900')}`}>
        {title}
      </h2>
      <div className={`space-y-4 text-[0.97rem] leading-[1.9] transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-700')}`}>
        {children}
      </div>
    </section>
  );
}

function MockScreen({ isDark, label }) {
  const theme = pickTheme(isDark);
  return (
    <div className={`flex aspect-[16/9] w-full items-center justify-center rounded-sm border transition-colors duration-700 ${theme('border-zinc-800 bg-zinc-900/60 text-zinc-600', 'border-zinc-200 bg-zinc-100 text-zinc-400')}`}>
      <span className="font-display text-[0.75rem] uppercase tracking-widest">{label}</span>
    </div>
  );
}

function FeatureRow({ title, desc, isDark }) {
  const theme = pickTheme(isDark);
  return (
    <div className={`border-t py-5 transition-colors duration-700 ${theme('border-zinc-800', 'border-zinc-200')}`}>
      <p className={`mb-1.5 font-display text-[0.82rem] uppercase tracking-[0.18em] transition-colors duration-700 ${theme('text-zinc-400', 'text-zinc-500')}`}>
        {title}
      </p>
      <p className={`text-[0.97rem] leading-relaxed transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-600')}`}>
        {desc}
      </p>
    </div>
  );
}

export default function TestProductProject({ isDark }) {
  const theme = pickTheme(isDark);

  return (
    <ProjectLayout sections={SECTIONS} isDark={isDark}>
      <article className="space-y-10">

        <header className="space-y-8">
          <div>
            <p className={`mb-3 font-display text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>
              Product
            </p>
            <h1 className={`font-display text-2xl leading-snug transition-colors duration-700 ${theme('text-zinc-100', 'text-zinc-900')}`}>
              Quiet Reader
            </h1>
            <p className={`mt-3 text-[1rem] leading-relaxed transition-colors duration-700 ${theme('text-zinc-400', 'text-zinc-500')}`}>
              A typography-first environment for deep reading.
            </p>
          </div>

          <dl className={`grid grid-cols-2 gap-x-8 gap-y-4 border-t pt-6 font-display text-[0.78rem] transition-colors duration-700 sm:grid-cols-3 ${theme('border-zinc-800 text-zinc-400', 'border-zinc-200 text-zinc-500')}`}>
            {META.map(({ label, value }) => (
              <div key={label}>
                <dt className={`mb-1 text-[0.68rem] uppercase tracking-[0.2em] transition-colors duration-700 ${theme('text-zinc-600', 'text-zinc-400')}`}>
                  {label}
                </dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <MockScreen isDark={isDark} label="Hero / Main Screen" />

        <Section id="overview" title="Overview" isDark={isDark}>
          <p>
            Quiet Reader is a reading environment built around a single idea: that the act of reading deserves better than a browser tab. It strips away everything that competes for attention — notifications, recommendations, navigation chrome — and returns focus to the text itself.
          </p>
          <p>
            The interface has no settings panel. Decisions about type size, line spacing, and contrast are made once during setup and then disappear. What remains is a page, a margin, and the words.
          </p>
        </Section>

        <Section id="problem" title="Problem" isDark={isDark}>
          <p>
            Most reading apps are optimized for consumption — faster, more, next. Quiet Reader is optimized for depth: staying with a paragraph, returning to a passage, reading something twice because it deserves it.
          </p>
          <p>
            The problem isn't access to text. It's the environment around text — one that keeps interrupting, suggesting, measuring. A reading tool shouldn't feel like an app.
          </p>
        </Section>

        <Section id="design" title="Design" isDark={isDark}>
          <p>
            Every design decision was made by subtraction. If an element didn't directly serve reading, it was removed. The resulting interface has no icons, no toolbars, no status indicators during a session.
          </p>

          <div className="grid gap-4 pt-2 sm:grid-cols-2">
            <MockScreen isDark={isDark} label="Reading View" />
            <MockScreen isDark={isDark} label="Type Settings" />
          </div>

          <p>
            Typography is set in a system that prioritizes rhythm over variety. One typeface, one weight, three sizes. Line length is fixed at 66 characters — the upper boundary of comfortable reading in most languages.
          </p>
        </Section>

        <Section id="features" title="Features" isDark={isDark}>
          <div>
            <FeatureRow
              isDark={isDark}
              title="Focus Mode"
              desc="Dims everything outside the current paragraph. Scroll advances the focus window. No keyboard shortcut needed — it's always on."
            />
            <FeatureRow
              isDark={isDark}
              title="Margin Notes"
              desc="Inline annotations that live in the margin. They don't interrupt the text — they wait beside it."
            />
            <FeatureRow
              isDark={isDark}
              title="Reading Sessions"
              desc="Tracks time and position across sessions. Not to gamify — to help you find your place when you come back."
            />
            <FeatureRow
              isDark={isDark}
              title="Offline First"
              desc="All content is stored locally. No sync, no cloud, no latency. The app works the same on a plane as it does anywhere else."
            />
          </div>
        </Section>

        <Section id="reflection" title="Reflection" isDark={isDark}>
          <p>
            This project started as a personal tool and probably will stay that way. Building it clarified something: most product decisions get made for the 80% use case, and reading deeply is a 20% activity. It almost never gets a product designed specifically for it.
          </p>
          <p>
            The hardest part wasn't the interface — it was resisting the pressure to add more. Every feature request made sense in isolation. Together, they would have rebuilt the thing I was trying to escape.
          </p>
        </Section>

      </article>
    </ProjectLayout>
  );
}
