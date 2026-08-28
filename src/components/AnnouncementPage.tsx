import { useState } from 'react';
import { announcement, showcase } from '../data/announcement';
import { persona } from '../data/persona';
import { CapabilityCarousel, CapabilityList } from './CapabilityCard';
import { PersonaModal } from './PersonaModal';
import { Reveal } from './Reveal';
import { ArrowRightIcon, ImageIcon } from './icons';

function Eyebrow() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-accent-muted px-4 py-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      <span className="text-[11px] font-bold uppercase tracking-[0.09em] text-accent sm:text-xs">
        {announcement.eyebrow}
      </span>
    </span>
  );
}

function Screenshot({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-surface-muted text-on-surface-muted ${className}`}
      >
        <ImageIcon />
      </div>
    );
  }

  return <img src={src} alt={alt} onError={() => setFailed(true)} className={className} />;
}

function PrimaryCta({ onClick, className = '' }: { onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-on-accent transition-colors hover:bg-accent-hover ${className}`}
    >
      {announcement.ctaPrimary}
      <ArrowRightIcon />
    </button>
  );
}

function PersonaCta({ onClick, className = '' }: { onClick: () => void; className?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex flex-shrink-0 items-center gap-2.5 rounded-full border border-border-strong py-1.5 pl-1.5 pr-5 text-[15px] font-semibold text-on-surface transition-colors hover:border-primary ${className}`}
    >
      <span className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-surface-muted">
        {!failed && (
          <img
            src={persona.photo}
            alt=""
            onError={() => setFailed(true)}
            className="h-8 w-8 object-cover object-[center_20%]"
          />
        )}
      </span>
      {announcement.ctaSecondary}
    </button>
  );
}

export function AnnouncementPage({ onSeePrototype }: { onSeePrototype: () => void }) {
  const [personaOpen, setPersonaOpen] = useState(false);

  function goToPrototype() {
    setPersonaOpen(false);
    onSeePrototype();
  }

  return (
    <>
      {/* Phone: one viewport, no scroll. Screen flexes into whatever is left. */}
      <div className="flex h-[calc(100vh-3.5rem)] flex-col px-6 pb-7 pt-8 lg:hidden">
        <div className="flex-shrink-0 text-center">
          <Eyebrow />
          <h1 className="mt-3.5 text-5xl font-extrabold leading-none tracking-tight text-on-surface">
            {announcement.title}
          </h1>
          <p className="mt-2.5 whitespace-nowrap text-sm font-medium text-on-surface">
            {announcement.subheadShort}
          </p>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center py-5">
          <Screenshot
            src={showcase.mobile.src}
            alt={showcase.mobile.alt}
            className="h-full w-auto rounded-[20px] border border-border shadow-md"
          />
        </div>

        <div className="flex-shrink-0">
          <CapabilityCarousel />
          <div className="mt-5 flex items-center gap-2.5">
            <PrimaryCta onClick={onSeePrototype} className="flex-1 !text-sm" />
            <PersonaCta onClick={() => setPersonaOpen(true)} className="!text-sm !pr-4" />
          </div>
        </div>
      </div>

      {/* Desktop: copy beside the screens, the whole thing in one viewport. */}
      <div className="mx-auto hidden h-[calc(100vh-3.5rem)] w-full max-w-[1600px] items-center gap-14 px-16 lg:flex">
        <Reveal className="w-[46%] flex-shrink-0">
          <Eyebrow />
          <h1 className="mt-5 text-7xl font-extrabold leading-none tracking-tight text-on-surface">
            {announcement.title}
          </h1>
          <p className="mt-4 text-2xl font-medium leading-snug text-on-surface">
            {announcement.subhead}
          </p>
          <p className="mt-4 text-[15.5px] leading-relaxed text-on-surface-muted">
            {announcement.body}
          </p>

          <div className="mt-8">
            <CapabilityList />
          </div>

          <div className="mt-9 flex items-center gap-3">
            <PrimaryCta onClick={onSeePrototype} />
            <PersonaCta onClick={() => setPersonaOpen(true)} />
          </div>
        </Reveal>

        <Reveal delay={120} className="relative min-w-0 flex-1">
          <Screenshot
            src={showcase.desktop.src}
            alt={showcase.desktop.alt}
            className="w-[88%] rounded-2xl border border-border bg-surface p-2.5 shadow-md"
          />
          <Screenshot
            src={showcase.mobile.src}
            alt={showcase.mobile.alt}
            className="absolute right-0 top-12 w-[30%] max-w-[190px] rounded-[22px] border border-border bg-surface p-2 shadow-lg"
          />
        </Reveal>
      </div>

      <PersonaModal
        open={personaOpen}
        onClose={() => setPersonaOpen(false)}
        onSeePrototype={goToPrototype}
      />
    </>
  );
}
