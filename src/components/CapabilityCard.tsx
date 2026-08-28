import { capabilities, type Capability } from '../data/announcement';
import { useRotator } from '../hooks/useRotator';
import { ChartIcon, CheckIcon, LinkIcon } from './icons';

const ICONS: Record<Capability['id'], (props: { className?: string }) => JSX.Element> = {
  connect: LinkIcon,
  approve: CheckIcon,
  track: ChartIcon,
};

function CapabilityIcon({ id }: { id: Capability['id'] }) {
  const Icon = ICONS[id];
  return (
    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent-muted text-accent">
      <Icon />
    </span>
  );
}

/** The full set, one row each. Used where there is vertical room. */
export function CapabilityList() {
  return (
    <ul className="flex flex-col gap-4">
      {capabilities.map((cap) => (
        <li key={cap.id} className="flex items-start gap-3.5">
          <CapabilityIcon id={cap.id} />
          <div>
            <p className="text-[15.5px] font-bold text-on-surface">{cap.title}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-on-surface-muted">{cap.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/**
 * One at a time on a timer, with dots to jump. The card height is fixed so a
 * longer line never reflows what sits below it.
 */
export function CapabilityCarousel() {
  const [index, setIndex] = useRotator(capabilities.length, 2000);
  const active = capabilities[index];

  return (
    <div>
      <div
        aria-live="polite"
        className="flex h-[88px] items-center gap-3.5 overflow-hidden rounded-lg border border-border bg-surface px-4"
      >
        <CapabilityIcon id={active.id} />
        <div className="min-w-0">
          <p className="text-[15px] font-bold leading-tight text-on-surface">{active.title}</p>
          <p className="mt-0.5 text-[13px] leading-snug text-on-surface-muted">{active.body}</p>
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {capabilities.map((cap, i) => (
          <button
            key={cap.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={cap.title}
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
