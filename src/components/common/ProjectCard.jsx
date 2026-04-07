import { pickTheme } from '../../lib/theme.js';

export default function ProjectCard({ project, isDark, variant = 'full' }) {
  const theme = pickTheme(isDark);
  const isCompact = variant === 'compact';

  return (
    <a href={project.link} className="group block">
      <div
        className={`flex items-center gap-1 font-display text-base transition-colors duration-200 ${
          theme('text-zinc-200 group-hover:text-white', 'text-zinc-800 group-hover:text-black')
        }`}
      >
        {project.name}
        <span className="text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100">↗</span>
      </div>
      <div
        className={`${isCompact ? 'mt-1 text-sm' : 'mt-2 text-sm leading-relaxed'} font-sans transition-colors duration-500 ${
          theme('text-zinc-400 group-hover:text-zinc-300', 'text-zinc-500 group-hover:text-zinc-600')
        }`}
      >
        {project.desc}
      </div>
    </a>
  );
}
