import { useState } from 'react';
import { journey } from '../data/persona';
import { useHoverCapable } from '../hooks/useHoverCapable';
import { useRotator } from '../hooks/useRotator';

/** Three across, the one under the cursor opens. Heights are fixed so the row never jumps. */
function FrictionsOnHover() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex items-stretch gap-2">
      {journey.map((stage, i) => {
        const isActive = i === active;
        return (
          <button
            key={stage.id}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            aria-current={isActive}
            className={`h-[152px] flex-shrink basis-0 overflow-hidden rounded-lg border p-3.5 text-left transition-all duration-300 ${
              isActive
                ? 'grow-[1.9] border-primary bg-primary'
                : 'grow border-border bg-surface-muted'
            }`}
          >
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${
                isActive ? 'text-on-primary/55' : 'text-on-surface-muted/70'
              }`}
            >
              {stage.stage}
            </span>
            <p
              className={`mt-1 text-[13.5px] font-semibold leading-tight ${
                isActive ? 'text-on-primary' : 'text-on-surface'
              }`}
            >
              {stage.title}
            </p>
            <p
              className={`mt-2 text-[11.5px] leading-relaxed text-on-primary/70 transition-opacity duration-300 ${
                isActive ? 'opacity-100 delay-150' : 'opacity-0'
              }`}
            >
              {stage.friction}
            </p>
          </button>
        );
      })}
    </div>
  );
}

/** One card on a timer, with dots. Touch has no hover to reveal with. */
function FrictionsOnTimer() {
  const [index, setIndex] = useRotator(journey.length, 2000);
  const stage = journey[index];

  return (
    <div>
      <div
        aria-live="polite"
        className="h-24 overflow-hidden rounded-lg bg-primary px-4 py-4"
      >
        <p className="text-[13.5px] font-bold leading-tight text-on-primary">{stage.title}</p>
        <p className="mt-1.5 text-xs leading-snug text-on-primary/70">{stage.friction}</p>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {journey.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={s.title}
            aria-current={i === index}
            className="flex h-6 w-6 items-center justify-center"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === index ? 'bg-primary' : 'bg-border-strong'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function FrictionCards() {
  return useHoverCapable() ? <FrictionsOnHover /> : <FrictionsOnTimer />;
}
