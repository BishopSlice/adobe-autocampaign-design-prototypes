import { useCallback, useEffect, useRef, useState } from 'react';
import type { Screen } from '../data/screens';
import { ChevronRightIcon } from './icons';

const WINDOW_HEIGHT = 420;
/** 16:10 at 420 tall is 672 wide, which is ~1.7x a phone. Enough to read the queue. */
const IMAGE_WIDTH = Math.round((WINDOW_HEIGHT * 16) / 10);

/**
 * A desktop screen is 16:10. Fitting one to a 390px phone lands it around
 * 219px tall, where the Approval Queue is illegible. So it renders at full
 * size inside a window you drag across, with a rail showing how much of it
 * you are seeing.
 */
export function ScreenPanWindow({ screen }: { screen: Screen }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [visibleRatio, setVisibleRatio] = useState(1);
  const [scrolled, setScrolled] = useState(0);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const scrollable = el.scrollWidth - el.clientWidth;
    setVisibleRatio(el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1);
    setScrolled(scrollable > 0 ? el.scrollLeft / scrollable : 0);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure, screen.id]);

  const atEnd = scrolled > 0.98;

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={measure}
        role="region"
        aria-label={`${screen.title} screen, scroll sideways to see the full width`}
        tabIndex={0}
        className="no-scrollbar relative overflow-x-auto overscroll-x-contain border-y border-border bg-surface-muted focus-visible:outline-2 focus-visible:outline-accent"
        style={{ height: WINDOW_HEIGHT }}
      >
        {failed ? (
          <div className="flex h-full items-center justify-center text-[13px] text-on-surface-muted">
            {screen.title}
          </div>
        ) : (
          <img
            src={screen.image}
            alt={`${screen.title} screen, desktop`}
            onError={() => setFailed(true)}
            className="block h-full max-w-none"
            style={{ width: IMAGE_WIDTH }}
          />
        )}
      </div>

      {/* Fade and arrow only while there is more to reach. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none relative transition-opacity duration-300 ${
          atEnd ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className="absolute right-0 bg-gradient-to-r from-transparent to-surface"
          style={{ width: 56, height: WINDOW_HEIGHT, top: -WINDOW_HEIGHT }}
        />
        <div
          className="absolute right-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/80 text-on-primary"
          style={{ top: -WINDOW_HEIGHT / 2 - 16 }}
        >
          <ChevronRightIcon />
        </div>
      </div>

      <div className="px-5 pt-3">
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-sunken">
          <div
            className="h-full rounded-full bg-primary transition-[margin] duration-100"
            style={{
              width: `${visibleRatio * 100}%`,
              marginLeft: `${scrolled * (1 - visibleRatio) * 100}%`,
            }}
          />
        </div>
        <p className="mt-2.5 text-center text-xs text-on-surface-muted">
          Drag across the screen to read it at full size
        </p>
      </div>
    </div>
  );
}
