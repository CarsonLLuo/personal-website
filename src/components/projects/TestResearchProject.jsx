import { pickTheme } from '../../lib/theme.js';

export default function TestResearchProject({ isDark }) {
  const theme = pickTheme(isDark);

  return (
    <article className="space-y-8">
      <header>
        <h1 className={`font-display text-2xl transition-colors duration-700 ${theme('text-zinc-100', 'text-zinc-900')}`}>
          Test Research Project
        </h1>
        <p className={`mt-3 font-sans text-sm transition-colors duration-700 ${theme('text-zinc-500', 'text-zinc-400')}`}>
          Research · 2024
        </p>
      </header>

      <div className={`space-y-5 font-sans text-sm leading-relaxed transition-colors duration-700 ${theme('text-zinc-300', 'text-zinc-700')}`}>
        <p>
          This is a test project detail page. Replace this content with the real project description, process, and outcomes.
        </p>
        <p>
          The detail page supports free-form JSX — you can add images, code blocks, custom layouts, or any component here.
        </p>
      </div>
    </article>
  );
}
