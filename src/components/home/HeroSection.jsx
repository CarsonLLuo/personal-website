import { useEffect, useState } from 'react';
import LiveTime from '../common/LiveTime.jsx';
import HeroScene from '../effects/HeroScene.jsx';
import { heroContent } from '../../data/siteContent.js';
import { pickTheme } from '../../lib/theme.js';

const HERO_SCENE_BREAKPOINT = 768;

export default function HeroSection({ isDark, loadStage, showNav }) {
  const theme = pickTheme(isDark);
  const [gravityEnabled, setGravityEnabled] = useState(false);
  const [shouldRenderHeroScene, setShouldRenderHeroScene] = useState(() => (
    typeof window === 'undefined' ? true : window.innerWidth >= HERO_SCENE_BREAKPOINT
  ));

  useEffect(() => {
    const updateHeroSceneVisibility = () => {
      setShouldRenderHeroScene(window.innerWidth >= HERO_SCENE_BREAKPOINT);
    };

    updateHeroSceneVisibility();
    window.addEventListener('resize', updateHeroSceneVisibility);

    return () => {
      window.removeEventListener('resize', updateHeroSceneVisibility);
    };
  }, []);

  return (
    <section
      id="top"
      className={`relative h-screen w-full overflow-hidden transition-colors duration-700 ${theme('text-zinc-200', 'text-zinc-800')}`}
    >
      {shouldRenderHeroScene && <HeroScene isDark={isDark} loadStage={loadStage} gravityEnabled={gravityEnabled} />}

      <div className="pointer-events-none absolute inset-0">
        {loadStage >= 1 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-6">
            <div className="flex items-center gap-5 mb-8">
              <img
                src="/avatar.jpeg"
                alt="Carson"
                className={`animate-hero-line-2 h-12 w-12 flex-shrink-0 rounded-xl object-cover object-top ${theme('opacity-90', 'opacity-85')}`}
              />
              <p className={`animate-hero-line-2 font-display text-[11px] tracking-[0.2em] uppercase transition-colors duration-700 ${theme('text-zinc-500', 'text-zinc-400')}`}>
                {heroContent.name}
              </p>
            </div>
            <h1 className={`animate-hero-line-1 font-serif text-[44px] font-medium leading-[1.12] tracking-wide transition-colors duration-700 sm:text-[56px] md:text-[68px] ${theme('text-zinc-100', 'text-zinc-900')}`}>
              {heroContent.heading.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h1>
            <div className={`animate-hero-line-2 border-t mt-7 pt-5 transition-colors duration-700 ${theme('border-zinc-800', 'border-zinc-200')}`}>
              <p className={`font-display text-[13px] leading-relaxed transition-colors duration-700 sm:text-[14px] ${theme('text-zinc-400', 'text-zinc-500')}`}>
                {heroContent.identityTagline[0]}<br />{heroContent.identityTagline[1]}
              </p>
            </div>
          </div>
        )}

        <div
          className={`absolute bottom-[8%] left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 flex items-end justify-between transition-all duration-1000 ease-out ${
            loadStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <LiveTime className={theme('text-zinc-500/70', 'text-zinc-500')} />
          <div className="flex items-center gap-4">
            {shouldRenderHeroScene && (
              <button
                type="button"
                data-hero-control="true"
                aria-pressed={gravityEnabled}
                onMouseDown={(event) => event.stopPropagation()}
                onClick={() => setGravityEnabled((isEnabled) => !isEnabled)}
                className={`pointer-events-auto hidden cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 font-display text-[11px] uppercase tracking-[0.16em] transition-all duration-300 md:inline-flex ${
                  gravityEnabled
                    ? theme('border-zinc-500/40 bg-zinc-100/10 text-zinc-200', 'border-zinc-500/30 bg-zinc-900/[0.08] text-zinc-700')
                    : theme('border-zinc-700/50 text-zinc-500 hover:border-zinc-500/60 hover:text-zinc-300', 'border-zinc-300/70 text-zinc-500 hover:border-zinc-500/50 hover:text-zinc-700')
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                    gravityEnabled ? theme('bg-zinc-200', 'bg-zinc-700') : theme('bg-zinc-600', 'bg-zinc-400')
                  }`}
                />
                {gravityEnabled ? 'Float' : 'Gravity'}
              </button>
            )}
            <span className={`font-display text-xs transition-opacity duration-1000 ${loadStage >= 3 && !showNav ? 'opacity-100' : 'opacity-0'} ${theme('text-zinc-600', 'text-zinc-400')}`}>↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
