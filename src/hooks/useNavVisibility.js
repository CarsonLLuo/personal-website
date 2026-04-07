import { useEffect, useState } from 'react';

export function useNavVisibility(thresholdMultiplier = 0.6) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * thresholdMultiplier);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [thresholdMultiplier]);

  return isVisible;
}
