import { useEffect, useState } from 'react';
import FilmGrain from './components/effects/FilmGrain.jsx';
import SiteNavigation from './components/layout/SiteNavigation.jsx';
import HomeView from './components/views/HomeView.jsx';
import ProjectsView from './components/views/ProjectsView.jsx';
import NotesView from './components/views/NotesView.jsx';
import AboutView from './components/views/AboutView.jsx';
import { SITE_VIEWS } from './constants/site.js';
import { useHeroLoadStage } from './hooks/useHeroLoadStage.js';
import { useNavVisibility } from './hooks/useNavVisibility.js';
import { useThemeMode } from './hooks/useThemeMode.js';
import { pickTheme } from './lib/theme.js';

function renderSubPage(currentView, isDark) {
  switch (currentView) {
    case SITE_VIEWS.PROJECTS:
      return <ProjectsView isDark={isDark} />;
    case SITE_VIEWS.NOTES:
      return <NotesView isDark={isDark} />;
    case SITE_VIEWS.ABOUT:
      return <AboutView isDark={isDark} />;
    default:
      return null;
  }
}

export default function App() {
  const [currentView, setCurrentView] = useState(SITE_VIEWS.HOME);
  const { isDark, toggleTheme } = useThemeMode(true);
  const loadStage = useHeroLoadStage();
  const showNav = useNavVisibility();
  const theme = pickTheme(isDark);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-700 ${theme(
        'bg-[#0a0a0a] text-zinc-100 selection:bg-zinc-800 selection:text-white',
        'bg-[#faf8f5] text-zinc-900 selection:bg-zinc-200 selection:text-black'
      )}`}
    >
      <FilmGrain isDark={isDark} />

      <div className="min-h-screen">
        <SiteNavigation
          currentView={currentView}
          isDark={isDark}
          loadStage={loadStage}
          showNav={showNav}
          onToggleTheme={toggleTheme}
          onViewChange={setCurrentView}
        />

        {currentView === SITE_VIEWS.HOME ? (
          <HomeView
            isDark={isDark}
            loadStage={loadStage}
            showNav={showNav}
            onViewChange={setCurrentView}
          />
        ) : (
          <main className="relative z-10 mx-auto max-w-2xl px-6 pb-32">
            {renderSubPage(currentView, isDark)}
          </main>
        )}
      </div>
    </div>
  );
}
