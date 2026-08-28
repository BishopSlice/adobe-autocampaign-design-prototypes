export type Capability = {
  id: 'connect' | 'approve' | 'track';
  title: string;
  body: string;
};

export const announcement = {
  eyebrow: 'New in Adobe Express',
  title: 'Auto Campaign',
  /** Desktop has room for the full promise. Mobile needs it on one line. */
  subhead: 'Turn your booking calendar into a campaign that runs itself.',
  subheadShort: 'Turn your booking calendar into a campaign.',
  body: 'Millions of small businesses and solopreneurs already use Adobe Express to create and schedule their marketing content. Auto Campaign takes that one step further. Connect your booking platform and Express drafts posts around your ever-changing calendar. You approve. Express publishes.',
  ctaPrimary: 'See the prototype',
  ctaSecondary: 'Who it is for',
};

/**
 * The same three user stories the prototype is organised around, so the
 * announcement, the story cards and the mobile tabs stay one vocabulary.
 */
export const capabilities: Capability[] = [
  {
    id: 'connect',
    title: 'Connect once',
    body: 'Link your booking platform and your Instagram.',
  },
  {
    id: 'approve',
    title: 'Approve',
    body: 'Posts arrive written and scheduled. Nothing publishes without you.',
  },
  {
    id: 'track',
    title: 'Track conversions',
    body: 'See which posts filled which slots. Build on working strategies.',
  },
];

/** Shown side by side on desktop. Mobile shows the phone screen only. */
export const showcase = {
  desktop: {
    src: '/images/prototype/desktop/02-auto-campaign.png',
    alt: 'Auto Campaign reviewed on desktop',
  },
  mobile: {
    src: '/images/prototype/mobile/01-approvals.png',
    alt: 'The Approval Queue on mobile',
  },
};
