import type { Facet } from '../data/screens';

/**
 * Equal-width chips that both show where you are and move you. Sized to fit
 * the set across a phone without scrolling, which is the whole point of
 * naming the two axes instead of listing every screen.
 */
export function FacetTabs({
  facets,
  activeId,
  onSelect,
  label,
  tone = 'neutral',
}: {
  facets: Facet[];
  activeId: string;
  onSelect: (id: string) => void;
  label: string;
  /** Error highlights red, the way the state does inside the screens themselves. */
  tone?: 'neutral' | 'state';
}) {
  return (
    <div role="tablist" aria-label={label} className="flex gap-1.5">
      {facets.map((facet) => {
        const active = facet.id === activeId;
        const activeClass =
          tone === 'state' && facet.id === 'error'
            ? 'bg-error text-on-error'
            : 'bg-primary text-on-primary';

        return (
          <button
            key={facet.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(facet.id)}
            className={`min-w-0 flex-1 truncate rounded-xl px-2 py-2.5 text-[11.5px] font-semibold transition-colors ${
              active
                ? activeClass
                : 'border border-border bg-surface-muted text-on-surface-muted hover:text-on-surface'
            }`}
          >
            {facet.short}
          </button>
        );
      })}
    </div>
  );
}
