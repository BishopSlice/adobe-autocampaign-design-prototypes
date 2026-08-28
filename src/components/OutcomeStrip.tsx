import { outcomes } from '../data/persona';
import { useRotator } from '../hooks/useRotator';

/**
 * The three outcomes as a label strip. One is active at a time and its detail
 * sits below in a fixed slot, so advancing never moves the surrounding layout.
 */
export function OutcomeStrip() {
  const [index, setIndex] = useRotator(outcomes.length, 5000);

  return (
    <div>
      <div role="tablist" aria-label="Expected outcomes" className="flex gap-2">
        {outcomes.map((outcome, i) => (
          <button
            key={outcome.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => setIndex(i)}
            className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[12.5px] font-semibold transition-colors sm:text-[13.5px] ${
              i === index
                ? 'bg-accent text-on-accent'
                : 'bg-accent-muted text-accent hover:bg-accent-muted/70'
            }`}
          >
            {outcome.label}
          </button>
        ))}
      </div>

      <p
        aria-live="polite"
        className="mt-2.5 h-10 overflow-hidden text-[12.5px] leading-relaxed text-on-surface-muted sm:text-[13px]"
      >
        {outcomes[index].description}
      </p>
    </div>
  );
}
