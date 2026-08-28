import { ArrowUpRightIcon } from './icons';

export function DesignSystemChip({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="View design system"
      className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-border bg-surface py-2 pl-2.5 pr-3.5 text-[12.5px] font-semibold text-on-surface transition-colors hover:border-border-strong sm:pr-4"
    >
      <span className="flex gap-0.5" aria-hidden="true">
        <span className="h-3.5 w-3.5 rounded bg-primary" />
        <span className="h-3.5 w-3.5 rounded bg-accent" />
        <span className="h-3.5 w-3.5 rounded bg-success" />
      </span>
      Design system
      <ArrowUpRightIcon className="text-on-surface-muted" />
    </button>
  );
}
