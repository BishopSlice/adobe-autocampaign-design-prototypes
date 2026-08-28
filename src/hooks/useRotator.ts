import { useCallback, useEffect, useState } from 'react';

/**
 * Cycles an index on a timer. Selecting by hand stops the timer for good, the
 * same bargain the carousel makes: once someone is steering, nothing should
 * move it out from under them. Skipped entirely for prefers-reduced-motion,
 * where the caller's controls are the only way through the set.
 */
export function useRotator(length: number, intervalMs: number) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || length <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs, paused]);

  const select = useCallback((i: number) => {
    setPaused(true);
    setIndex(i);
  }, []);

  return [index, select] as const;
}
