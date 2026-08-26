import { useState } from 'react';
import { persona, outcomes } from '../data/persona';
import { JourneyMap } from './JourneyMap';
import { Reveal } from './Reveal';
import { ArrowRightIcon, ImageIcon } from './icons';

function HeroPhoto() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-earth-olive to-earth-ink text-white">
        <div className="flex flex-col items-center gap-2 text-center">
          <ImageIcon />
          <div className="text-[13px] font-semibold">[PERSONA PHOTO]</div>
          <div className="max-w-[200px] text-[11px] text-white/70">
            {persona.name}, {persona.age}. Yoga instructor. Mumbai.
          </div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={persona.photo}
      alt={`${persona.name}, ${persona.role}`}
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover object-top"
    />
  );
}

function NameBlock() {
  return (
    <h1 className="font-source flex items-baseline gap-3 font-bold leading-none tracking-tight text-[#1e2613]">
      <span className="text-[44px] sm:text-[60px] lg:text-[82px]">{persona.name},</span>
      <span className="text-[26px] sm:text-[36px] lg:text-[48px]">{persona.age}</span>
    </h1>
  );
}

function RoleBlock() {
  return <p className="font-display text-[18px] text-[#ae6d38] sm:text-[24px]">{persona.role}</p>;
}

function BioBlock() {
  return (
    <p className="font-source w-full text-[12px] font-normal leading-relaxed text-[#505050]">
      {persona.bio.join(' ')}
    </p>
  );
}

function FlowFrictionsBlock() {
  return (
    <div>
      <h2 className="font-display mb-4 text-[22px] text-black">Current Flow and Frictions</h2>
      <JourneyMap />
    </div>
  );
}

function OutcomesBlock() {
  return (
    <div>
      <h2 className="font-display text-[24px] text-white">Expected Outcomes</h2>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {outcomes.map((o) => (
          <div key={o.id} className="rounded-2xl bg-white/80 p-5 text-left shadow-sm">
            <p className="font-source text-[12px] font-bold text-black">{o.label}</p>
            <p className="font-source mt-2 text-[12px] font-normal leading-relaxed text-[#505050]">
              {o.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExploreButton({ onExplore }: { onExplore: () => void }) {
  return (
    <button
      type="button"
      onClick={onExplore}
      className="mx-auto inline-flex items-center gap-3.5 rounded-full bg-white py-2.5 pl-7 pr-2.5 shadow-card transition-transform hover:scale-[1.02]"
    >
      <span className="font-display text-[19px] text-[#ae6d38]">Explore Feature</span>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-earth-ink text-white">
        <ArrowRightIcon />
      </span>
    </button>
  );
}

export function DiscoveryPage({ onExplore }: { onExplore: () => void }) {
  return (
    <div className="lg:h-[calc(100vh-3.5rem)] lg:overflow-hidden">
      {/* Mobile / tablet: simple stacked flow, each column its own block. */}
      <div className="grid grid-cols-1 lg:hidden">
        <div className="flex flex-col gap-7 bg-white px-6 py-12 sm:px-10">
          <Reveal className="flex flex-col gap-4">
            <NameBlock />
            <RoleBlock />
            <BioBlock />
          </Reveal>
          <Reveal delay={160}>
            <FlowFrictionsBlock />
          </Reveal>
        </div>

        <div className="relative min-h-[520px] overflow-hidden">
          <HeroPhoto />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/45" />
          <div className="relative flex h-full flex-col items-center justify-between p-8 text-center sm:p-10">
            <Reveal delay={120}>
              <OutcomesBlock />
            </Reveal>
            <Reveal delay={200}>
              <ExploreButton onExplore={onExplore} />
            </Reveal>
          </div>
        </div>
      </div>

      {/* Desktop: a single shared grid so specific rows can be pinned flush
          against each other across the two columns (see the row comments below). */}
      <div className="hidden lg:grid lg:h-full lg:grid-cols-2 lg:grid-rows-[minmax(0,1fr)_auto_auto_auto_minmax(0,1fr)_auto_auto]">
        <div className="col-start-1 row-start-1 row-end-[8] bg-white" />
        <div className="relative col-start-2 row-start-1 row-end-[8] overflow-hidden">
          <HeroPhoto />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/45" />
        </div>

        {/* Row: name (left) and outcomes (right) share this row's bottom edge. */}
        <Reveal className="col-start-1 row-start-2 self-end px-14 pt-10">
          <NameBlock />
        </Reveal>
        <Reveal delay={120} className="col-start-2 row-start-2 self-end p-10 pb-6 text-center">
          <OutcomesBlock />
        </Reveal>

        <Reveal delay={40} className="col-start-1 row-start-3 px-14 pt-3">
          <RoleBlock />
        </Reveal>

        <Reveal delay={80} className="col-start-1 row-start-4 px-14 pb-2 pt-3">
          <BioBlock />
        </Reveal>

        {/* Row: Flow and Frictions (left) ends exactly where the Explore button (right) begins. */}
        <Reveal delay={160} className="col-start-1 row-start-6 self-end px-14">
          <FlowFrictionsBlock />
        </Reveal>
        <Reveal delay={200} className="col-start-2 row-start-7 self-start p-10 pt-6 text-center">
          <ExploreButton onExplore={onExplore} />
        </Reveal>
      </div>
    </div>
  );
}
