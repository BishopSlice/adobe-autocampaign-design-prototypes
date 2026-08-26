import { useEffect, useRef, useState } from 'react';
import type { Screen } from '../data/screens';
import { ScreenImage } from './ScreenImage';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

const AUTOPLAY_START_DELAY = 3000;
const AUTOPLAY_INTERVAL = 3500;

type ScreenCarouselProps = {
  screens: Screen[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  /** Autoplay is disabled once the visitor has interacted, by any control on the page, not just this one. */
  paused: boolean;
  onInteract: () => void;
};

export function ScreenCarousel({
  screens,
  activeIndex,
  onActiveIndexChange,
  paused,
  onInteract,
}: ScreenCarouselProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Autoplay: starts 3s after the screen set is ready, advances every 3.5s,
  // and stops for good the moment the visitor touches the carousel.
  useEffect(() => {
    if (paused || reducedMotion || screens.length <= 1) return;

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        onActiveIndexChange((activeIndex + 1) % screens.length);
      }, AUTOPLAY_INTERVAL);
    }, AUTOPLAY_START_DELAY);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
    // Re-arms on every index change so the interval always advances from
    // the current position rather than a stale closure.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, paused, reducedMotion, screens.length]);

  function stopAutoplay() {
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);
    onInteract();
  }

  function goTo(index: number) {
    stopAutoplay();
    const next = (index + screens.length) % screens.length;
    onActiveIndexChange(next);
  }

  if (screens.length === 0) return null;

  return (
    <div className="flex h-full flex-col">
      <div
        className="relative flex min-w-0 flex-1 min-h-[320px] items-center justify-center overflow-hidden"
        onPointerDown={stopAutoplay}
        onKeyDown={stopAutoplay}
      >
        {screens.map((screen, i) => {
          const offset = i - activeIndex;
          const distance = Math.abs(offset);
          if (distance > 2) return null;

          const scale = distance === 0 ? 1 : distance === 1 ? 0.88 : 0.78;
          const opacity = distance === 0 ? 1 : distance === 1 ? 0.4 : 0.18;
          const blur = distance === 0 ? 0 : distance === 1 ? 3 : 6;
          const translateX = offset * (screen.device === 'mobile' ? 150 : 260);

          return (
            <div
              key={screen.id}
              className="absolute transition-all duration-500 ease-out"
              style={{
                height: '90%',
                aspectRatio: screen.device === 'mobile' ? '9 / 18.5' : '16 / 10',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                opacity,
                filter: blur ? `blur(${blur}px)` : undefined,
                zIndex: 10 - distance,
                pointerEvents: distance === 0 ? 'auto' : 'none',
              }}
              aria-hidden={offset !== 0}
            >
              <ScreenImage screen={screen} />
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-shrink-0 items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous screen"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-on-surface shadow-sm hover:bg-surface-muted"
        >
          <ChevronLeftIcon />
        </button>
        <span className="font-mono text-xs text-on-surface-muted">
          {activeIndex + 1} / {screens.length}
        </span>
        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next screen"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-on-surface shadow-sm hover:bg-surface-muted"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
