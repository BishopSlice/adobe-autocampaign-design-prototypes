import { type ReactNode } from 'react';
import { Dialog } from './Dialog';
import { CloseIcon } from './icons';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

/** A titled panel. Used for the design system viewer. */
export function Modal({ open, onClose, title, children }: ModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      label={title}
      panelClassName="flex h-full w-full flex-col overflow-hidden border border-border bg-surface shadow-lg sm:h-[85vh] sm:max-w-5xl sm:rounded-xl"
    >
      <div className="flex flex-shrink-0 items-center justify-between border-b border-border px-5 py-3">
        <span className="text-sm font-semibold">{title}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-muted hover:bg-surface-muted hover:text-on-surface"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </Dialog>
  );
}
