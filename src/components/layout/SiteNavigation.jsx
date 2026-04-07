import { NAV_ITEMS, SITE_VIEWS } from '../../constants/site.js';
import { pickTheme } from '../../lib/theme.js';

export default function SiteNavigation({
  currentView,
  isDark,
  loadStage,
  showNav,
  onToggleTheme,
  onViewChange,
}) {
  const theme = pickTheme(isDark);
  const isNavVisible = showNav || currentView !== SITE_VIEWS.HOME;

  return (
    <nav className="pointer-events-none fixed top-0 right-0 left-0 z-50">
      <div className="relative mx-auto flex max-w-2xl items-center justify-between px-6 py-6 text-xs tracking-wide sm:text-sm">
        <div
          className={`flex flex-1 items-center justify-between transition-opacity duration-700 ${
            isNavVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <button
            onClick={() => onViewChange(SITE_VIEWS.HOME)}
            className={`font-display transition-colors ${theme('text-zinc-400 hover:text-zinc-300', 'text-zinc-500 hover:text-zinc-700')}`}
          >
            Carson
          </button>

          <div className={`flex items-center gap-6 font-display sm:gap-8 ${theme('text-zinc-400', 'text-zinc-500')}`}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.view}
                onClick={() => onViewChange(item.view)}
                className={`transition-colors ${
                  currentView === item.view
                    ? theme('text-zinc-100', 'text-zinc-900')
                    : theme('hover:text-zinc-100', 'hover:text-zinc-900')
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onToggleTheme}
          className={`pointer-events-auto ml-6 cursor-pointer transition-all duration-1000 ease-out sm:ml-8 ${
            theme('text-zinc-500 hover:text-zinc-300', 'text-zinc-400 hover:text-zinc-600')
          } ${loadStage >= 3 ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Toggle dark mode"
        >
          {isDark ? '☀' : '☾'}
        </button>
      </div>
    </nav>
  );
}
