import { useEffect, useState } from 'react';

const LOAD_STAGE_DELAYS = [500, 2000, 3000];

export function useHeroLoadStage() {
  const [loadStage, setLoadStage] = useState(0);

  useEffect(() => {
    const timers = LOAD_STAGE_DELAYS.map((delay, index) =>
      window.setTimeout(() => setLoadStage(index + 1), delay)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return loadStage;
}
