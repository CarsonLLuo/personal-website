import { useEffect, useState } from 'react';
import { THEME_STORAGE_KEY } from '../constants/site.js';

function getInitialTheme(defaultIsDark) {
  if (typeof window === 'undefined') {
    return defaultIsDark;
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'dark') {
    return true;
  }

  if (savedTheme === 'light') {
    return false;
  }

  if (typeof window.matchMedia !== 'function') {
    return defaultIsDark;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function useThemeMode(defaultIsDark = true) {
  const [isDark, setIsDark] = useState(() => getInitialTheme(defaultIsDark));

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    document.body.style.backgroundColor = isDark ? '#0d1117' : '#faf8f5';
  }, [isDark]);

  return {
    isDark,
    toggleTheme: () => setIsDark((previousTheme) => !previousTheme),
  };
}
