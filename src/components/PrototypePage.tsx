import { useEffect, useRef, useState } from 'react';
import { feature } from '../data/persona';
import {
  categorizeScreen,
  edgeCards,
  screensByDevice,
  storyCards,
  type CategoryCard,
  type Device,
} from '../data/screens';
import { DesignSystemChip } from './DesignSystemChip';
import { DeviceToggle } from './DeviceToggle';
import { Modal } from './Modal';
import { PrototypeMobile } from './PrototypeMobile';
import { Reveal } from './Reveal';
import { ScreenCarousel } from './ScreenCarousel';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

const DEFAULT_TITLE: Record<Device, string> = {
  mobile: 'Approvals',
  desktop: 'Feature Page',
};

function defaultIndex(screens: ReturnType<typeof screensByDevice>, device: Device) {
  const i = screens.findIndex((s) => s.title === DEFAULT_TITLE[device]);
  return i >= 0 ? i : 0;
}

/** The flat screen list, for the wide layout where all eleven names fit a row. */
function TagScroller({
  screens,
  activeIndex,
  onSelect,
}: {
  screens: ReturnType<typeof screensByDevice>;
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const check = () => setCanScroll(track.scrollWidth - track.clientWidth > 4);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(track);
    return () => observer.disconnect();
  }, [screens]);

  useEffect(() => {
    const active = trackRef.current?.children[activeIndex] as HTMLElement | undefined;
    active?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeIndex]);

  function scrollBy(amount: number) {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    if (amount > 0 && track.scrollLeft >= max - 4) track.scrollTo({ left: 0, behavior: 'smooth' });
    else if (amount < 0 && track.scrollLeft <= 4) track.scrollTo({ left: max, behavior: 'smooth' });
    else track.scrollBy({ left: amount, behavior: 'smooth' });
  }

  return (
    <div className="flex flex-shrink-0 items-center gap-2">
      {canScroll && (
        <button
          type="button"
          onClick={() => scrollBy(-160)}
          aria-label="Scroll screen names left"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border bg-surface text-on-surface-muted hover:text-on-surface"
        >
          <ChevronLeftIcon />
        </button>
      )}

      <div
        ref={trackRef}
        className={`no-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto scroll-smooth ${
          canScroll ? 'justify-start' : 'justify-center'
        }`}
        role="tablist"
        aria-label="Screen"
      >
        {screens.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            onClick={() => onSelect(i)}
            className={`flex-shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[12.5px] font-semibold transition-colors ${
              i === activeIndex
                ? 'border-primary bg-primary text-on-primary'
                : 'border-border bg-surface text-on-surface-muted hover:border-border-strong hover:text-on-surface'
            }`}
          >
            {s.title.replace(/,\s*/g, ' - ')}
          </button>
        ))}
      </div>

      {canScroll && (
        <button
          type="button"
          onClick={() => scrollBy(160)}
          aria-label="Scroll screen names right"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border bg-surface text-on-surface-muted hover:text-on-surface"
        >
          <ChevronRightIcon />
        </button>
      )}
    </div>
  );
}

function CategoryList({
  title,
  cards,
  activeIds,
}: {
  title: string;
  cards: CategoryCard[];
  activeIds: string[];
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="text-center text-xs font-bold uppercase tracking-wide text-on-surface-muted">
        {title}
      </h2>
      <div className="flex w-full flex-col gap-3">
        {cards.map((card) => {
          const active = activeIds.includes(card.id);
          return (
            <div
              key={card.id}
              className={`rounded-2xl border p-4 transition-all duration-300 ${
                active
                  ? 'border-primary bg-primary text-on-primary shadow-md'
                  : 'border-border bg-surface-muted text-on-surface'
              }`}
            >
              <p className="text-[13.5px] font-semibold">{card.label}</p>
              <p
                className={`mt-1 text-xs leading-relaxed ${
                  active ? 'text-on-primary/75' : 'text-on-surface-muted'
                }`}
              >
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PrototypePage() {
  const [device, setDevice] = useState<Device>('mobile');
  const [activeIndex, setActiveIndex] = useState(() =>
    defaultIndex(screensByDevice('mobile'), 'mobile'),
  );
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [dsOpen, setDsOpen] = useState(false);
  const screens = screensByDevice(device);

  useEffect(() => {
    setActiveIndex(defaultIndex(screensByDevice(device), device));
    setAutoplayPaused(false);
  }, [device]);

  const activeScreen = screens[activeIndex];
  const category = activeScreen ? categorizeScreen(activeScreen) : { story: [], edge: null };

  function selectScreen(i: number) {
    setActiveIndex(i);
    setAutoplayPaused(true);
  }

  return (
    <>
      {/* Narrow: two facet rows instead of eleven tags, and desktop screens pan. */}
      <div className="lg:hidden">
        <PrototypeMobile
          device={device}
          onDeviceChange={setDevice}
          screens={screens}
          activeIndex={activeIndex}
          onActiveIndexChange={selectScreen}
          onOpenDesignSystem={() => setDsOpen(true)}
        />
      </div>

      {/* Wide: story and edge sidebars flanking the stacked carousel. */}
      <div className="mx-auto hidden h-[calc(100vh-3.5rem)] w-full max-w-[1600px] flex-col overflow-x-hidden px-8 pb-6 pt-4 lg:flex">
        <Reveal className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="mb-3 min-w-0 flex-shrink-0 text-center">
            <h1 className="text-[28px] font-extrabold leading-none tracking-tight xl:text-[32px]">
              {feature.title}
            </h1>
            <p className="mx-auto mt-1.5 max-w-3xl whitespace-nowrap text-[13px] leading-relaxed text-on-surface-muted xl:text-sm">
              {feature.summary}
            </p>
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 gap-6">
            <div className="w-44 flex-shrink-0 self-center xl:w-52">
              <CategoryList
                title="Primary User Stories"
                cards={storyCards}
                activeIds={category.story}
              />
            </div>

            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
              <div className="mb-2 flex flex-shrink-0 items-center justify-between gap-3">
                <DeviceToggle device={device} onChange={setDevice} />
                <DesignSystemChip onOpen={() => setDsOpen(true)} />
              </div>

              <div className="mb-2 flex-shrink-0">
                <TagScroller
                  screens={screens}
                  activeIndex={activeIndex}
                  onSelect={selectScreen}
                />
              </div>

              <div className="min-h-0 min-w-0 flex-1">
                <ScreenCarousel
                  screens={screens}
                  activeIndex={activeIndex}
                  onActiveIndexChange={setActiveIndex}
                  paused={autoplayPaused}
                  onInteract={() => setAutoplayPaused(true)}
                />
              </div>
            </div>

            <div className="w-44 flex-shrink-0 self-center xl:w-52">
              <CategoryList
                title="State"
                cards={edgeCards}
                activeIds={category.edge ? [category.edge] : []}
              />
            </div>
          </div>
        </Reveal>
      </div>

      <Modal open={dsOpen} onClose={() => setDsOpen(false)} title="Design system">
        <iframe src="/design-system.html" title="Design system" className="h-full w-full border-0" />
      </Modal>
    </>
  );
}
