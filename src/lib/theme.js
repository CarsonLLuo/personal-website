export function pickTheme(isDark) {
  return (darkValue, lightValue) => (isDark ? darkValue : lightValue);
}
