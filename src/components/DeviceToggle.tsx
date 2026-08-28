import type { Device } from '../data/screens';
import { DesktopIcon, MobileIcon } from './icons';

export function DeviceToggle({
  device,
  onChange,
}: {
  device: Device;
  onChange: (d: Device) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Device"
      className="inline-flex flex-shrink-0 gap-1 rounded-full border border-border bg-surface p-1"
    >
      {(['mobile', 'desktop'] as const).map((d) => {
        const active = device === d;
        const Icon = d === 'mobile' ? MobileIcon : DesktopIcon;
        return (
          <button
            key={d}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={d === 'mobile' ? 'Mobile' : 'Desktop'}
            onClick={() => onChange(d)}
            className={`flex h-9 w-11 items-center justify-center rounded-full transition-colors ${
              active ? 'bg-primary text-on-primary' : 'text-on-surface-muted hover:text-on-surface'
            }`}
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
}
