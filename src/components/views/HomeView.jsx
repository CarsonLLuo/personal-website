import HeroSection from '../home/HeroSection.jsx';
import HomeContent from '../home/HomeContent.jsx';

export default function HomeView({ isDark, loadStage, showNav, onViewChange }) {
  return (
    <>
      <HeroSection isDark={isDark} loadStage={loadStage} showNav={showNav} />
      <HomeContent isDark={isDark} onViewChange={onViewChange} />
    </>
  );
}
