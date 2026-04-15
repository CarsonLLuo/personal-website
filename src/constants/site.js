export const SITE_VIEWS = Object.freeze({
  HOME: 'home',
  PROJECTS: 'projects',
  NOTES: 'notes',
  ABOUT: 'about',
});

/** 解析 "project:slug" 格式的视图字符串 */
export function parseProjectView(view) {
  if (typeof view === 'string' && view.startsWith('project:')) {
    return view.slice('project:'.length);
  }
  return null;
}

export const NAV_ITEMS = [
  { label: 'Projects', view: SITE_VIEWS.PROJECTS },
  { label: 'Notes', view: SITE_VIEWS.NOTES },
  { label: 'About', view: SITE_VIEWS.ABOUT },
];

export const HOME_PREVIEW_LIMITS = Object.freeze({
  PROJECTS_PER_GROUP: 2,
  NOTES: 3,
});

export const THEME_STORAGE_KEY = 'personal-website-theme';
