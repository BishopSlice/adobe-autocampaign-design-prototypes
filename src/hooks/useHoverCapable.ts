import { useEffect, useState } from 'react';

/**
 * True for a real pointer, false for touch. Drives whether a set reveals on
 * hover or advances on its own, which is an input question rather than a
 * width one: a touch laptop should get the same treatment as a phone.
 */
export function useHoverCapable() {
  const [hoverCapable, setHoverCapable] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setHoverCapable(mq.matches);
    const onChange = () => setHoverCapable(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return hoverCapable;
}
