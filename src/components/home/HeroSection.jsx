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
          <div className="absolute top-[20%] left-[10%] sm:top-[30%] sm:left-[15%]">
            <h1 className="font-serif text-[42px] leading-[1.25] font-medium tracking-wide sm:text-[48px] md:text-[64px]">
              <div className={`animate-hero-line-1 mb-1 transition-colors duration-700 sm:mb-2 ${theme('text-zinc-100', 'text-zinc-900')}`}>
                {heroContent.headingLead}
              </div>
              <div className={`animate-hero-line-2 text-[36px] transition-colors duration-700 sm:text-[42px] md:text-[56px] ${theme('text-zinc-400', 'text-zinc-500')}`}>
                <span className="hero-past-text inline-block">{heroContent.headingPast}</span>
                <span className={theme('opacity-80', 'opacity-90')}>{heroContent.headingConnector}</span>
                <span className="hero-future-text inline-block">{heroContent.headingFuture}</span>
                <span className={theme('opacity-50', 'opacity-60')}>{heroContent.headingPunctuation}</span>
              </div>
            </h1>
          </div>
        )}

        <div
          className={`absolute top-[45%] left-[10%] text-left font-display text-[13px] leading-relaxed transition-all duration-1000 ease-out sm:right-[10%] sm:bottom-[8%] sm:left-auto sm:text-right sm:text-[14px] ${
            loadStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          } ${theme('text-zinc-400', 'text-zinc-600')}`}
        >
          {heroContent.identityLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p className={`mt-2 ${theme('text-zinc-500', 'text-zinc-500')}`}>{heroContent.identityTagline[0]}</p>
          <p className={theme('text-zinc-500', 'text-zinc-500')}>{heroContent.identityTagline[1]}</p>
        </div>

        <div
          className={`absolute bottom-[8%] left-[10%] transition-all duration-1000 ease-out sm:left-[15%] ${
            loadStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <LiveTime className={theme('text-zinc-500/70', 'text-zinc-500')} />
        </div>

        <div className={`absolute bottom-[8%] left-1/2 transition-opacity duration-1000 ${loadStage >= 3 && !showNav ? 'opacity-100' : 'opacity-0'}`}>
          <span className={`scroll-indicator absolute text-xs font-display ${theme('text-zinc-600', 'text-zinc-400')}`}>↓</span>
        </div>
      </div>
    </section>
  );
}
