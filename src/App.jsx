import { useEffect, useState } from 'react';
import FilmGrain from './components/effects/FilmGrain.jsx';
import SiteNavigation from './components/layout/SiteNavigation.jsx';
import HomeView from './components/views/HomeView.jsx';
import ProjectsView from './components/views/ProjectsView.jsx';
import NotesView from './components/views/NotesView.jsx';
import AboutView from './components/views/AboutView.jsx';
import { SITE_VIEWS, parseProjectView, parseNoteView } from './constants/site.js';
import ProjectDetailView from './components/views/ProjectDetailView.jsx';
import NoteDetailView from './components/views/NoteDetailView.jsx';
import { useHeroLoadStage } from './hooks/useHeroLoadStage.js';
import { useNavVisibility } from './hooks/useNavVisibility.js';
import { useThemeMode } from './hooks/useThemeMode.js';
import { pickTheme } from './lib/theme.js';

function viewFromHash() {
  if (typeof window === 'undefined') return SITE_VIEWS.HOME;
  const hash = window.location.hash.replace(/^#/, '');
  return hash || SITE_VIEWS.HOME;
}

function syncHashForView(view) {
  if (typeof window === 'undefined') return;
  const nextHash = view === SITE_VIEWS.HOME ? '' : `#${view}`;
  const currentHash = window.location.hash;

  if (currentHash === nextHash) return;

  if (!nextHash) {
    window.history.pushState(null, '', window.location.pathname + window.location.search);
    return;
  }

  window.history.pushState(null, '', nextHash);
}

function renderSubPage(currentView, isDark, onViewChange) {
  const projectSlug = parseProjectView(currentView);
  if (projectSlug) {
    return <ProjectDetailView slug={projectSlug} isDark={isDark} onBack={() => onViewChange(SITE_VIEWS.PROJECTS)} />;
  }

  const noteSlug = parseNoteView(currentView);
  if (noteSlug) {
    return <NoteDetailView slug={noteSlug} isDark={isDark} onBack={() => onViewChange(SITE_VIEWS.NOTES)} />;
  }

  switch (currentView) {
    case SITE_VIEWS.PROJECTS:
      return <ProjectsView isDark={isDark} onViewChange={onViewChange} />;
    case SITE_VIEWS.NOTES:
      return <NotesView isDark={isDark} onViewChange={onViewChange} />;
    case SITE_VIEWS.ABOUT:
      return <AboutView isDark={isDark} />;
    default:
      return null;
  }
}

export default function App() {
  const [currentView, setCurrentView] = useState(viewFromHash);
  const { isDark, toggleTheme } = useThemeMode(true);
  const loadStage = useHeroLoadStage();
  const showNav = useNavVisibility(currentView === SITE_VIEWS.HOME);
  const theme = pickTheme(isDark);

  const handleViewChange = (view) => {
    setCurrentView(view);
    syncHashForView(view);
  };

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentView(viewFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-700 ${theme(
        'bg-[#0d1117] text-zinc-100 selection:bg-zinc-800 selection:text-white',
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
          onViewChange={handleViewChange}
        />

        <div key={currentView} className="motion-page-enter">
          {currentView === SITE_VIEWS.HOME ? (
            <HomeView
              isDark={isDark}
              loadStage={loadStage}
              showNav={showNav}
              onViewChange={handleViewChange}
            />
          ) : (
            <main className="relative z-10 pb-32">
              {renderSubPage(currentView, isDark, handleViewChange)}
            </main>
          )}
        </div>
      </div>
    </div>
  );
}
