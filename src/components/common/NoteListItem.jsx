import { pickTheme } from '../../lib/theme.js';

export default function NoteListItem({ note, isDark, variant = 'full' }) {
  const theme = pickTheme(isDark);

  if (variant === 'preview') {
    return (
      <a
        href={note.link}
        className="group block py-2"
      >
        <div className="flex flex-col gap-2 text-sm font-sans sm:flex-row sm:items-center sm:justify-between">
          <div className={`flex-1 font-display transition-colors duration-200 ${theme('text-zinc-200 group-hover:text-white', 'text-zinc-800 group-hover:text-black')}`}>
            {note.title}
          </div>
          <div className={`hidden flex-1 truncate pr-4 transition-colors duration-500 sm:block ${theme('text-zinc-500 group-hover:text-zinc-400', 'text-zinc-500 group-hover:text-zinc-600')}`}>
            {note.desc}
          </div>
          <div className={`flex items-center gap-2 font-display text-xs transition-colors duration-500 ${theme('text-zinc-500', 'text-zinc-400')}`}>
            {note.date}
            <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">↗</span>
          </div>
        </div>
        <div className={`mt-1 text-xs transition-colors duration-500 sm:hidden ${theme('text-zinc-500 group-hover:text-zinc-400', 'text-zinc-500 group-hover:text-zinc-600')}`}>
          {note.desc}
        </div>
      </a>
    );
  }

  return (
    <a
      href={note.link}
      className="group block py-2"
    >
      <div className="flex flex-col gap-2 font-sans sm:flex-row sm:items-baseline sm:justify-between">
        <div className={`flex-1 font-display text-base transition-colors duration-200 ${theme('text-zinc-200 group-hover:text-white', 'text-zinc-800 group-hover:text-black')}`}>
          {note.title}
        </div>
        <div className={`flex items-center gap-2 font-display text-xs transition-colors duration-500 ${theme('text-zinc-500', 'text-zinc-400')}`}>
          {note.date}
          <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">↗</span>
        </div>
      </div>
      <div className={`mt-2 text-sm leading-relaxed transition-colors duration-500 ${theme('text-zinc-400 group-hover:text-zinc-300', 'text-zinc-500 group-hover:text-zinc-600')}`}>
        {note.desc}
      </div>
    </a>
  );
}
