import { useState } from 'react';
import { persona } from '../data/persona';
import { Dialog } from './Dialog';
import { FrictionCards } from './FrictionCards';
import { OutcomeStrip } from './OutcomeStrip';
import { ArrowRightIcon, CloseIcon, ImageIcon } from './icons';

function PersonaPhoto() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-on-surface-muted to-primary text-on-primary">
        <div className="flex flex-col items-center gap-2 text-center">
          <ImageIcon />
          <span className="text-[13px] font-semibold">[PERSONA PHOTO]</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={persona.photo}
      alt={`${persona.name}, ${persona.role}`}
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover object-[center_22%]"
    />
  );
}

type PersonaModalProps = {
  open: boolean;
  onClose: () => void;
  onSeePrototype: () => void;
};

export function PersonaModal({ open, onClose, onSeePrototype }: PersonaModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      label="Who Auto Campaign is for"
      panelClassName="flex h-full w-full flex-col overflow-hidden bg-surface shadow-lg sm:h-auto sm:max-h-[90vh] sm:max-w-4xl sm:flex-row sm:rounded-2xl"
    >
      {/* Full-width hero on a phone, a column beside the copy from sm up. */}
      <div className="relative h-[262px] flex-shrink-0 overflow-hidden bg-primary sm:h-auto sm:w-[300px] sm:self-stretch">
        <PersonaPhoto />
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-[32px] font-bold leading-none tracking-tight text-on-primary sm:text-[30px]">
            {persona.name}, {persona.age}
          </p>
          <p className="mt-1.5 text-sm text-on-primary/80">Yoga studio owner, Mumbai</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-surface/90 text-on-surface hover:bg-surface sm:hidden"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="relative flex flex-1 flex-col overflow-y-auto p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 hidden h-9 w-9 items-center justify-center rounded-full bg-surface-muted text-on-surface-muted hover:text-on-surface sm:flex"
        >
          <CloseIcon />
        </button>

        <h2 className="text-[11.5px] font-bold uppercase tracking-[0.09em] text-accent">
          Who this is for
        </h2>
        <p className="mt-3 max-w-[470px] text-[14.5px] leading-relaxed text-on-surface sm:text-[15.5px]">
          {persona.bio.join(' ')}
        </p>

        <hr className="my-5 border-border" />

        <h3 className="text-[11.5px] font-bold uppercase tracking-[0.09em] text-on-surface-muted">
          Current flow and frictions
        </h3>
        <div className="mt-3">
          <FrictionCards />
        </div>

        <hr className="my-5 border-border" />

        <h3 className="text-[11.5px] font-bold uppercase tracking-[0.09em] text-on-surface-muted">
          What Auto Campaign changes
        </h3>
        <div className="mt-3">
          <OutcomeStrip />
        </div>

        <button
          type="button"
          onClick={onSeePrototype}
          className="mt-6 inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-on-accent transition-colors hover:bg-accent-hover sm:mt-auto sm:self-start"
        >
          See the prototype
          <ArrowRightIcon />
        </button>
      </div>
    </Dialog>
  );
}
