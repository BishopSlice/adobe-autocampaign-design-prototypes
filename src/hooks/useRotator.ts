import { useEffect, useState } from 'react';

/**
 * Cycles an index on a timer. Pauses for prefers-reduced-motion, where the
 * caller's controls (dots, chips) remain the way to move through the set.
 */
export function useRotator(length: number, intervalMs: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (length <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs]);

  return [index, setIndex] as const;
}
