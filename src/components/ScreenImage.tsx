import { useState } from 'react';
import type { Screen } from '../data/screens';
import { ImageIcon } from './icons';

type ScreenImageProps = {
  screen: Screen;
  className?: string;
};

/**
 * Renders a screen's exported PNG when present, padded and letterboxed
 * inside its frame so the frame's rounded corners never crop real screen
 * content. Falls back to a labeled placeholder until a real export lands.
 */
export function ScreenImage({ screen, className = '' }: ScreenImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-2xl border border-border bg-surface p-3 ${className}`}
    >
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-gradient-to-br from-accent-muted to-surface-muted text-center text-accent">
          <ImageIcon />
          <div className="text-[13px] font-semibold text-on-surface">{screen.title}</div>
          <div className="text-[11px] text-on-surface-muted">{screen.sourceFile}</div>
        </div>
      ) : (
        <img
          src={screen.image}
          alt={`${screen.title} screen, ${screen.device}`}
          onError={() => setFailed(true)}
          className="h-full w-full rounded-md object-contain"
        />
      )}
    </div>
  );
}
