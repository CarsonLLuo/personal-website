import { useEffect, useRef, useState } from 'react';
import LiveTime from '../common/LiveTime.jsx';
import HeroScene from '../effects/HeroScene.jsx';
import { heroContent, heroInteractionNotes } from '../../data/siteContent.js';
import { pickTheme } from '../../lib/theme.js';

const HERO_SCENE_BREAKPOINT = 768;

function seededValue(seed, min, max) {
  const value = Math.sin(seed * 999.1) * 10000;
  return min + (value - Math.floor(value)) * (max - min);
}

function getGravityPieceStyle(gravityMode, seed, fallVh, options = {}) {
  const xRange = options.xRange ?? 84;
  const yJitter = options.yJitter ?? 38;
  const rotateRange = options.rotateRange ?? 42;
  const fallX = seededValue(seed, -xRange, xRange);
  const fallY = seededValue(seed + 3, -yJitter, yJitter);
  const fallRotate = seededValue(seed + 6, -rotateRange, rotateRange);
  const delay = gravityMode === 'fall'
    ? seededValue(seed + 9, 0, 70)
    : seededValue(seed + 17, 0, 150);
  const fallPreLift = seededValue(seed + 18, 1, 5);
  const fallMidProgress = seededValue(seed + 19, 0.34, 0.54);
  const fallImpactProgress = seededValue(seed + 2, 0.9, 1.04);
  const fallBounceProgress = seededValue(seed + 20, 0.96, 1.08);
  const fallSettleProgress = seededValue(seed + 21, 0.98, 1.02);

  return {
    '--fall-x': `${fallX}px`,
    '--fall-pre-x': `${fallX * seededValue(seed + 22, 0.03, 0.1)}px`,
    '--fall-mid-x': `${fallX * fallMidProgress}px`,
    '--fall-impact-x': `${fallX * fallImpactProgress}px`,
    '--fall-bounce-x': `${fallX * fallBounceProgress}px`,
    '--fall-settle-x': `${fallX * fallSettleProgress}px`,
    '--fall-pre-y': `${-fallPreLift}px`,
    '--fall-mid-y': `calc((${fallVh}vh + ${fallY}px) * ${seededValue(seed + 23, 0.34, 0.48)})`,
    '--fall-y': `calc(${fallVh}vh + ${fallY}px)`,
    '--fall-impact-y': `calc(${fallVh}vh + ${fallY + seededValue(seed + 4, 6, 13)}px)`,
    '--fall-bounce-y': `calc(${fallVh}vh + ${fallY - seededValue(seed + 5, 4, 13)}px)`,
    '--fall-settle-y': `calc(${fallVh}vh + ${fallY + seededValue(seed + 24, 1, 5)}px)`,
    '--return-lift-y': `calc((${fallVh}vh + ${fallY}px) * 0.52 - ${seededValue(seed + 10, 10, 26)}px)`,
    '--return-drift-x': `${fallX * seededValue(seed + 12, 0.26, 0.58)}px`,
    '--return-hover-y': `${seededValue(seed + 13, -18, -6)}px`,
    '--return-hover-x': `${seededValue(seed + 14, -8, 8)}px`,
    '--fall-rotate': `${fallRotate}deg`,
    '--fall-pre-rotate': `${fallRotate * seededValue(seed + 25, -0.04, 0.04)}deg`,
    '--fall-mid-rotate': `${fallRotate * seededValue(seed + 26, 0.28, 0.48)}deg`,
    '--fall-impact-rotate': `${fallRotate * seededValue(seed + 8, 0.72, 0.95)}deg`,
    '--fall-bounce-rotate': `${fallRotate * seededValue(seed + 27, 0.88, 1.04)}deg`,
    '--fall-settle-rotate': `${fallRotate * seededValue(seed + 28, 0.96, 1.02)}deg`,
    '--return-lift-rotate': `${fallRotate * 0.42}deg`,
    '--return-hover-rotate': `${fallRotate * -0.08}deg`,
    '--fall-duration': `${seededValue(seed + 11, 760, 1080)}ms`,
    '--return-duration': `${seededValue(seed + 15, 980, 1420)}ms`,
    '--fall-delay': `${delay}ms`,
    '--return-delay': `${delay}ms`,
    transitionDelay: `${delay}ms`,
  };
}

function getGravityPieceClass(gravityMode) {
  return `hero-gravity-piece hero-gravity-piece--${gravityMode}`;
}

function renderFallingText(text, seedBase, gravityMode, fallVh, options) {
  return Array.from(text).map((char, index) => (
    <span
      key={`${char}-${index}`}
      aria-hidden="true"
      className={getGravityPieceClass(gravityMode)}
      style={getGravityPieceStyle(gravityMode, seedBase + index * 1.7, fallVh, options)}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
}

export default function HeroSection({ isDark, loadStage, showNav }) {
  const theme = pickTheme(isDark);
  const returnTimerRef = useRef(0);
  const [gravityEnabled, setGravityEnabled] = useState(false);
  const [gravityReturnActive, setGravityReturnActive] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => (
    typeof window === 'undefined' ? false : window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ));
  const [shouldRenderHeroScene, setShouldRenderHeroScene] = useState(() => (
    typeof window === 'undefined' ? true : window.innerWidth >= HERO_SCENE_BREAKPOINT
  ));

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateHeroSceneVisibility = () => {
      setShouldRenderHeroScene(window.innerWidth >= HERO_SCENE_BREAKPOINT);
    };
    const updateMotionPreference = () => {
      setPrefersReducedMotion(motionQuery.matches);
    };

    updateHeroSceneVisibility();
    updateMotionPreference();
    window.addEventListener('resize', updateHeroSceneVisibility);
    motionQuery.addEventListener('change', updateMotionPreference);

    return () => {
      window.removeEventListener('resize', updateHeroSceneVisibility);
      motionQuery.removeEventListener('change', updateMotionPreference);
    };
  }, []);

  useEffect(() => () => {
    window.clearTimeout(returnTimerRef.current);
  }, []);

  const gravityMotionAllowed = shouldRenderHeroScene && !prefersReducedMotion;
  const gravityMotionActive = shouldRenderHeroScene && gravityEnabled && !prefersReducedMotion;
  const gravityPieceMode = gravityMotionActive ? 'fall' : gravityMotionAllowed && gravityReturnActive ? 'return' : 'float';

  const handleGravityToggle = () => {
    window.clearTimeout(returnTimerRef.current);

    if (gravityEnabled) {
      setGravityEnabled(false);
      if (gravityMotionAllowed) {
        setGravityReturnActive(true);
        returnTimerRef.current = window.setTimeout(() => {
          setGravityReturnActive(false);
        }, 1650);
      }
      return;
    }

    setGravityReturnActive(false);
    setGravityEnabled(true);
  };

  return (
    <section
      id="top"
      className={`relative h-screen w-full overflow-hidden transition-colors duration-700 ${theme('text-zinc-200', 'text-zinc-800')}`}
    >
      {shouldRenderHeroScene && <HeroScene isDark={isDark} loadStage={loadStage} gravityEnabled={gravityEnabled} />}

      <div className="pointer-events-none absolute inset-0">
        {loadStage >= 1 && (
          <div className="absolute top-1/2 left-1/2 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 px-6">
            <div className="relative">
              <div className="flex items-center gap-5 mb-8">
                <span className="animate-hero-line-2 inline-flex">
                  <span
                    className={getGravityPieceClass(gravityPieceMode)}
                    style={getGravityPieceStyle(gravityPieceMode, 1, 45, { xRange: 16, yJitter: 10, rotateRange: 8 })}
                  >
                    <img
                      src="/avatar.jpeg"
                      alt="Carson"
                      className={`h-12 w-12 flex-shrink-0 rounded-xl object-cover object-top ${theme('opacity-90', 'opacity-85')}`}
                    />
                  </span>
                </span>
                <p
                  aria-label={heroContent.name}
                  className={`animate-hero-line-2 font-display text-[11px] tracking-[0.2em] uppercase transition-colors duration-700 ${theme('text-zinc-500', 'text-zinc-400')}`}
                >
                  {renderFallingText(heroContent.name, 20, gravityPieceMode, 44, { xRange: 18, yJitter: 10, rotateRange: 10 })}
                </p>
              </div>
              <h1
                aria-label={heroContent.heading.replace('\n', ' ')}
                className={`animate-hero-line-1 font-serif text-[44px] font-medium leading-[1.12] tracking-wide transition-colors duration-700 sm:text-[56px] md:text-[68px] ${theme('text-zinc-100', 'text-zinc-900')}`}
              >
                {heroContent.heading.split('\n').map((line, i) => (
                  <span key={line} className="block">
                    {renderFallingText(line, 80 + i * 80, gravityPieceMode, i === 0 ? 33 : 25, {
                      xRange: 26,
                      yJitter: 12,
                      rotateRange: 16,
                    })}
                  </span>
                ))}
              </h1>
              <div className="animate-hero-line-2 mt-7 pt-5">
                <span
                  aria-hidden="true"
                  className={`block h-px w-full transition-opacity duration-500 ${gravityMotionActive ? 'opacity-0' : 'opacity-100'} ${theme('bg-zinc-800', 'bg-zinc-200')}`}
                />
                <p
                  aria-label={heroContent.identityTagline.join(' ')}
                  className={`mt-5 font-display text-[13px] leading-relaxed transition-colors duration-700 sm:text-[14px] ${theme('text-zinc-400', 'text-zinc-500')}`}
                >
                  {heroContent.identityTagline.map((line, index) => (
                    <span key={line} className="block">
                      {renderFallingText(line, 230 + index * 70, gravityPieceMode, index === 0 ? 14 : 11, {
                        xRange: 18,
                        yJitter: 8,
                        rotateRange: 10,
                      })}
                    </span>
                  ))}
                </p>
              </div>
              {shouldRenderHeroScene && (
                <div
                  className={`absolute top-4 right-[-20rem] hidden max-w-[13rem] flex-col gap-3 transition-all duration-1000 ease-out 2xl:flex ${
                    loadStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                  }`}
                >
                  <span className={`absolute -top-6 left-0 h-px w-9 transition-colors duration-700 ${theme('bg-zinc-700/70', 'bg-zinc-300/80')}`} />
                  <div className="space-y-2.5">
                    {heroInteractionNotes.map((note, index) => (
                      <p
                        key={note}
                        aria-label={note}
                        className={`font-display text-[10px] leading-relaxed tracking-[0.18em] uppercase transition-colors duration-700 ${
                          index === 1 ? 'pl-2' : ''
                        } ${theme('text-zinc-500/80', 'text-zinc-500/90')}`}
                      >
                        {renderFallingText(note, 360 + index * 90, gravityPieceMode, 42 - index * 3, {
                          xRange: 20,
                          yJitter: 10,
                          rotateRange: 10,
                        })}
                      </p>
                    ))}
                  </div>
                </div>
              )}
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
                onClick={handleGravityToggle}
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
