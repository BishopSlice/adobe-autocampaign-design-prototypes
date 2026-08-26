import { useEffect, useRef, useState } from 'react';
import { feature } from '../data/persona';
import {
  screensByDevice,
  categorizeScreen,
  storyCards,
  edgeCards,
  type Device,
  type CategoryCard,
} from '../data/screens';
import { ScreenCarousel } from './ScreenCarousel';
import { Modal } from './Modal';
import { Reveal } from './Reveal';
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon, DesktopIcon, MobileIcon } from './icons';

const DEFAULT_TITLE: Record<Device, string> = {
  mobile: 'Approvals',
  desktop: 'Feature Page',
};

function defaultIndex(screens: ReturnType<typeof screensByDevice>, device: Device) {
  const i = screens.findIndex((s) => s.title === DEFAULT_TITLE[device]);
  return i >= 0 ? i : 0;
}

function DeviceToggle({ device, onChange }: { device: Device; onChange: (d: Device) => void }) {
  return (
    <div role="tablist" aria-label="Device" className="inline-flex flex-shrink-0 gap-1 rounded-full border border-border bg-surface p-1 shadow-sm">
      <button
        type="button"
        role="tab"
        aria-selected={device === 'mobile'}
        aria-label="Mobile"
        onClick={() => onChange('mobile')}
        className={`flex h-9 w-11 items-center justify-center rounded-full transition-colors ${
          device === 'mobile' ? 'bg-primary text-on-primary' : 'text-on-surface-muted hover:text-on-surface'
        }`}
      >
        <MobileIcon />
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={device === 'desktop'}
        aria-label="Desktop"
        onClick={() => onChange('desktop')}
        className={`flex h-9 w-11 items-center justify-center rounded-full transition-colors ${
          device === 'desktop' ? 'bg-primary text-on-primary' : 'text-on-surface-muted hover:text-on-surface'
        }`}
      >
        <DesktopIcon />
      </button>
    </div>
  );
}

function DesignSystemChip({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="View design system"
      className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-border bg-surface py-2 pl-2 pr-3 text-[13px] font-semibold text-on-surface shadow-sm transition-colors hover:border-border-strong sm:gap-2.5 sm:pl-2.5 sm:pr-4"
    >
      <span className="flex gap-1">
        <span className="h-3.5 w-3.5 rounded-[5px] bg-primary" />
        <span className="h-3.5 w-3.5 rounded-[5px] bg-accent" />
        <span className="h-3.5 w-3.5 rounded-[5px] bg-success" />
      </span>
      <span className="hidden sm:inline">View design system</span>
      <ArrowUpRightIcon className="text-on-surface-muted" />
    </button>
  );
}

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
    const track = trackRef.current;
    const activeEl = track?.children[activeIndex] as HTMLElement | undefined;
    activeEl?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeIndex]);

  function scrollBy(amount: number) {
    const track = trackRef.current;
    if (!track) return;

    const max = track.scrollWidth - track.clientWidth;
    const atEnd = track.scrollLeft >= max - 4;
    const atStart = track.scrollLeft <= 4;

    if (amount > 0 && atEnd) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (amount < 0 && atStart) {
      track.scrollTo({ left: max, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: amount, behavior: 'smooth' });
    }
  }

  return (
    <div className="flex flex-shrink-0 items-center gap-2">
      {canScroll && (
        <button
          type="button"
          onClick={() => scrollBy(-160)}
          aria-label="Scroll screen names left"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border bg-surface text-on-surface-muted shadow-sm hover:text-on-surface"
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
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border bg-surface text-on-surface-muted shadow-sm hover:text-on-surface"
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
      <h3 className="text-center text-xs font-bold uppercase tracking-wide text-on-surface-muted">{title}</h3>
      <div className="flex w-full flex-row gap-3 lg:flex-col">
        {cards.map((card) => {
          const active = activeIds.includes(card.id);
          return (
            <div
              key={card.id}
              className={`flex-1 rounded-2xl border p-4 transition-all duration-300 lg:flex-none ${
                active
                  ? 'border-primary bg-primary text-on-primary shadow-md'
                  : 'border-border bg-surface-muted text-on-surface'
              }`}
            >
              <p className="text-[13.5px] font-semibold">{card.label}</p>
              <p className={`mt-1 text-[12px] leading-relaxed ${active ? 'text-on-primary/75' : 'text-on-surface-muted'}`}>
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
  const [activeIndex, setActiveIndex] = useState(() => defaultIndex(screensByDevice('mobile'), 'mobile'));
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [dsOpen, setDsOpen] = useState(false);
  const screens = screensByDevice(device);

  useEffect(() => {
    setActiveIndex(defaultIndex(screensByDevice(device), device));
    setAutoplayPaused(false);
  }, [device]);

  const activeScreen = screens[activeIndex];
  const category = activeScreen ? categorizeScreen(activeScreen) : { story: [], edge: null };

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col overflow-x-hidden px-6 pb-4 pt-4 sm:px-10 lg:h-[calc(100vh-3.5rem)] lg:px-8">
      <Reveal className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="mb-3 min-w-0 flex-shrink-0 text-center">
          <h1 className="text-[26px] font-extrabold leading-none tracking-tight sm:text-[32px] lg:text-[28px] xl:text-[32px]">
            {feature.title}
          </h1>
          <p className="mx-auto mt-1.5 max-w-3xl text-[14px] leading-relaxed text-on-surface-muted lg:text-[13px] xl:text-[14px] lg:whitespace-nowrap">
            {feature.summary}
          </p>
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-8 lg:flex-row lg:gap-6">
          <div className="order-2 flex-shrink-0 lg:order-1 lg:w-44 lg:self-center xl:w-52">
            <CategoryList title="Primary User Stories" cards={storyCards} activeIds={category.story} />
          </div>

          <div className="order-1 flex min-h-0 min-w-0 flex-1 flex-col lg:order-2">
            <div className="mb-2 flex flex-shrink-0 flex-nowrap items-center justify-between gap-3">
              <DeviceToggle device={device} onChange={setDevice} />
              <DesignSystemChip onOpen={() => setDsOpen(true)} />
            </div>

            <div className="mb-2 flex-shrink-0">
              <TagScroller
                screens={screens}
                activeIndex={activeIndex}
                onSelect={(i) => {
                  setActiveIndex(i);
                  setAutoplayPaused(true);
                }}
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

          <div className="order-3 flex-shrink-0 lg:w-44 lg:self-center xl:w-52">
            <CategoryList title="Edge Cases" cards={edgeCards} activeIds={category.edge ? [category.edge] : []} />
          </div>
        </div>
      </Reveal>

      <Modal open={dsOpen} onClose={() => setDsOpen(false)} title="Design system">
        <iframe src="/design-system.html" title="Design system" className="h-full w-full border-0" />
      </Modal>
    </div>
  );
}
