import {
  facetsOf,
  findScreenIndex,
  stateFacets,
  storyFacets,
  type Device,
  type Screen,
  type StateId,
} from '../data/screens';
import { DesignSystemChip } from './DesignSystemChip';
import { DeviceToggle } from './DeviceToggle';
import { FacetTabs } from './FacetTabs';
import { ScreenImage } from './ScreenImage';
import { ScreenPanWindow } from './ScreenPanWindow';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

type PrototypeMobileProps = {
  device: Device;
  onDeviceChange: (d: Device) => void;
  screens: Screen[];
  activeIndex: number;
  onActiveIndexChange: (i: number) => void;
  onOpenDesignSystem: () => void;
};

export function PrototypeMobile({
  device,
  onDeviceChange,
  screens,
  activeIndex,
  onActiveIndexChange,
  onOpenDesignSystem,
}: PrototypeMobileProps) {
  const screen = screens[activeIndex];
  if (!screen) return null;

  const current = facetsOf(screen);
  const stories = storyFacets[device];
  const states = stateFacets[device];

  const story = stories.find((f) => f.id === current.story);
  const state = states.find((f) => f.id === current.state);

  function step(delta: number) {
    onActiveIndexChange((activeIndex + delta + screens.length) % screens.length);
  }

  return (
    <div className="pb-10">
      <header className="px-5 pt-6 text-center">
        <h1 className="text-[27px] font-extrabold leading-none tracking-tight text-on-surface">
          Auto Campaign
        </h1>
        <p className="mx-auto mt-2 max-w-[46ch] text-[13px] leading-relaxed text-on-surface-muted">
          Express turns your booking calendar into a continuous campaign that boosts customer
          conversion.
        </p>
      </header>

      <div className="mt-4 flex items-center justify-between gap-2.5 px-5">
        <DeviceToggle device={device} onChange={onDeviceChange} />
        <DesignSystemChip onOpen={onOpenDesignSystem} />
      </div>

      <div className="mt-4 px-5">
        <FacetTabs
          label="Screen"
          facets={stories}
          activeId={current.story}
          onSelect={(id) =>
            onActiveIndexChange(findScreenIndex(screens, id, current.state, 'story'))
          }
        />
      </div>

      {device === 'desktop' ? (
        <div className="mt-4">
          <ScreenPanWindow screen={screen} />
        </div>
      ) : (
        <div className="mt-4 flex justify-center px-5">
          <div className="aspect-[9/18.5] w-[224px]">
            <ScreenImage screen={screen} />
          </div>
        </div>
      )}

      <div className="mt-3.5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous screen"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-on-surface hover:bg-surface-muted"
        >
          <ChevronLeftIcon />
        </button>
        <span className="font-mono text-xs text-on-surface-muted">
          {activeIndex + 1} / {screens.length}
        </span>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next screen"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-on-surface hover:bg-surface-muted"
        >
          <ChevronRightIcon />
        </button>
      </div>

      {story && (
        <div className="mt-5 px-5">
          <div className="rounded-lg bg-primary px-4 py-3.5">
            <p className="text-[13.5px] font-semibold text-on-primary">{story.label}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-on-primary/70">{story.description}</p>
          </div>
        </div>
      )}

      <div className="mt-5 px-5">
        <h2 className="mb-2.5 text-[10.5px] font-bold uppercase tracking-[0.07em] text-on-surface-muted">
          State
        </h2>
        <FacetTabs
          label="State"
          tone="state"
          facets={states}
          activeId={current.state}
          onSelect={(id) =>
            onActiveIndexChange(
              findScreenIndex(screens, current.story, id as StateId, 'state'),
            )
          }
        />
        <p className="mt-2.5 text-xs leading-relaxed text-on-surface-muted">
          {state?.description}
        </p>
      </div>
    </div>
  );
}
