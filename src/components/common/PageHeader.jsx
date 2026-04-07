import { pickTheme } from '../../lib/theme.js';

export default function PageHeader({ title, description, isDark }) {
  const theme = pickTheme(isDark);

  return (
    <div className="mb-12">
      <h1 className={`mb-3 font-display text-2xl transition-colors duration-700 ${theme('text-zinc-100', 'text-zinc-900')}`}>
        {title}
      </h1>
      <p className={`font-sans text-sm transition-colors duration-700 ${theme('text-zinc-400', 'text-zinc-500')}`}>
        {description}
      </p>
    </div>
  );
}
