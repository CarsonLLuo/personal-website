import LiveTime from '../common/LiveTime.jsx';
import HeroScene from '../effects/HeroScene.jsx';
import { heroContent } from '../../data/siteContent.js';
import { pickTheme } from '../../lib/theme.js';

export default function HeroSection({ isDark, loadStage, showNav }) {
  const theme = pickTheme(isDark);

  return (
    <section
      id="top"
      className={`relative h-screen w-full overflow-hidden transition-colors duration-700 ${theme('text-zinc-200', 'text-zinc-800')}`}
    >
      <HeroScene isDark={isDark} loadStage={loadStage} />

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
          <span className={`font-display text-xs transition-opacity duration-1000 ${loadStage >= 3 && !showNav ? 'opacity-100' : 'opacity-0'} ${theme('text-zinc-600', 'text-zinc-400')}`}>↓</span>
        </div>
      </div>
    </section>
  );
}
