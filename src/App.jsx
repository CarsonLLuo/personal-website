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

function decodePathSegment(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function viewFromPathname(pathname) {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const projectMatch = cleanPath.match(/^\/projects\/([^/]+)$/);
  const noteMatch = cleanPath.match(/^\/notes\/([^/]+)$/);

  if (projectMatch) return `project:${decodePathSegment(projectMatch[1])}`;
  if (noteMatch) return `note:${decodePathSegment(noteMatch[1])}`;
  if (cleanPath === '/projects') return SITE_VIEWS.PROJECTS;
  if (cleanPath === '/notes') return SITE_VIEWS.NOTES;
  if (cleanPath === '/about') return SITE_VIEWS.ABOUT;

  return SITE_VIEWS.HOME;
}

function viewFromHash() {
  if (typeof window === 'undefined') return SITE_VIEWS.HOME;
  const hash = window.location.hash.replace(/^#/, '');

  if (Object.values(SITE_VIEWS).includes(hash) || parseProjectView(hash) || parseNoteView(hash)) {
    return hash;
  }

  return null;
}

function viewFromLocation() {
  if (typeof window === 'undefined') return SITE_VIEWS.HOME;
  return viewFromHash() ?? viewFromPathname(window.location.pathname);
}

function pathForView(view) {
  const projectSlug = parseProjectView(view);
  if (projectSlug) return `/projects/${encodeURIComponent(projectSlug)}/`;

  const noteSlug = parseNoteView(view);
  if (noteSlug) return `/notes/${encodeURIComponent(noteSlug)}/`;

  switch (view) {
    case SITE_VIEWS.PROJECTS:
      return '/projects/';
    case SITE_VIEWS.NOTES:
      return '/notes/';
    case SITE_VIEWS.ABOUT:
      return '/about/';
    default:
      return '/';
  }
}

function syncUrlForView(view) {
  if (typeof window === 'undefined') return;
  const nextPath = pathForView(view);
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const nextComparablePath = nextPath.replace(/\/+$/, '') || '/';

  if (currentPath === nextComparablePath && !window.location.hash) return;

  window.history.pushState(null, '', nextPath);
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
  const [currentView, setCurrentView] = useState(viewFromLocation);
  const { isDark, toggleTheme } = useThemeMode(true);
  const loadStage = useHeroLoadStage();
  const showNav = useNavVisibility(currentView === SITE_VIEWS.HOME);
  const theme = pickTheme(isDark);

  const handleViewChange = (view) => {
    setCurrentView(view);
    syncUrlForView(view);
  };

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentView(viewFromLocation());
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
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
