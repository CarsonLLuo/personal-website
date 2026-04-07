export default function FilmGrain({ isDark }) {
  return (
    <div className={`pointer-events-none fixed inset-0 z-50 h-full w-full ${isDark ? 'opacity-[0.06]' : 'opacity-[0.04]'}`}>
      <svg
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <filter id="noiseFilter" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect x="0" y="0" width="200" height="200" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
