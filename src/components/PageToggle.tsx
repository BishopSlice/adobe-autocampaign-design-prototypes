type Page = 'discovery' | 'prototype';

type PageToggleProps = {
  page: Page;
  onChange: (page: Page) => void;
};

const options: { id: Page; label: string }[] = [
  { id: 'discovery', label: 'Discovery' },
  { id: 'prototype', label: 'Prototype' },
];

export function PageToggle({ page, onChange }: PageToggleProps) {
  return (
    <div
      role="tablist"
      aria-label="Page"
      className="inline-flex rounded-full border border-border bg-surface p-1 shadow-sm"
    >
      {options.map((opt) => {
        const active = page === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.id)}
            className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
              active ? 'bg-primary text-on-primary' : 'text-on-surface-muted hover:text-on-surface'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export type { Page };
