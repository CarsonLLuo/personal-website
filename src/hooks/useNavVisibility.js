import { useEffect, useState } from 'react';

export function useNavVisibility(isHome) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const threshold = isHome ? window.innerHeight * 0.08 : 120;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    setIsScrolled(false);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHome]);

  return isScrolled;
}
