export type Device = 'desktop' | 'mobile';

export type UxLaw = {
  law: string;
  note: string;
};

export type Screen = {
  id: string;
  device: Device;
  order: number;
  title: string;
  /** The .dc.html artboard this screen was exported from, for traceability back to the prototype canvas. */
  sourceFile: string;
  /** Local image path. Point this at a real export once you have one; the carousel falls back to a labeled placeholder until then. */
  image: string;
  uxLaws: [UxLaw, UxLaw, UxLaw];
};

export const screens: Screen[] = [
  // Desktop, in flow order: entry, primary surface, edit, then edge cases.
  {
    id: 'desktop-home',
    device: 'desktop',
    order: 1,
    title: 'Feature Intro',
    sourceFile: 'Main.dc.html',
    image: '/images/prototype/desktop/01-home.png',
    uxLaws: [
      {
        law: "Jakob's Law",
        note: 'Matches the calendar and card patterns people already know from Express, so nothing here needs an explainer.',
      },
      {
        law: 'Von Restorff Effect',
        note: 'The Auto Campaign card is the only one with an accent border and a NEW badge among five near-identical cards.',
      },
      {
        law: 'Aesthetic-Usability Effect',
        note: 'A calm, familiar layout builds trust before the user has clicked anything.',
      },
    ],
  },
  {
    id: 'desktop-auto-campaign',
    device: 'desktop',
    order: 2,
    title: 'Feature Page',
    sourceFile: 'AutoCampaign.dc.html',
    image: '/images/prototype/desktop/02-auto-campaign.png',
    uxLaws: [
      {
        law: "Hick's Law",
        note: 'Three panels, one primary action each, so the eye never has to choose between competing next steps.',
      },
      {
        law: "Fitts's Law",
        note: 'Approve all remaining stays pinned to the bottom of the queue card, same size and place every time.',
      },
      {
        law: "Miller's Law",
        note: 'Drafts are grouped by date instead of one long list, keeping each visible chunk small.',
      },
    ],
  },
  {
    id: 'desktop-edit-draft',
    device: 'desktop',
    order: 3,
    title: 'Edit Draft',
    sourceFile: 'EditDraftModal.dc.html',
    image: '/images/prototype/desktop/03-edit-draft.png',
    uxLaws: [
      {
        law: 'Doherty Threshold',
        note: 'Opens over a still-visible, blurred version of the real screen, so the switch feels instant.',
      },
      {
        law: "Postel's Law",
        note: 'The dynamic field is visually flagged and explained, so an edit cannot accidentally break what updates on its own.',
      },
      {
        law: 'Law of Proximity',
        note: 'Caption, schedule and source sit in one column. Image and its controls sit in the other.',
      },
    ],
  },
  {
    id: 'desktop-disconnected',
    device: 'desktop',
    order: 4,
    title: 'Disconnected',
    sourceFile: 'AutoCampaign-Disconnected.dc.html',
    image: '/images/prototype/desktop/04-disconnected.png',
    uxLaws: [
      {
        law: 'Zeigarnik Effect',
        note: 'Two connection rows sit visibly unfinished, prompting the one action left to complete setup.',
      },
      {
        law: 'Peak-End Rule',
        note: 'The empty queue ends on one clear next step, not a dead end.',
      },
      {
        law: 'Aesthetic-Usability Effect',
        note: 'Even a blocked state uses the same calm layout, so it reads as "not yet," not "broken."',
      },
    ],
  },
  {
    id: 'desktop-syncing',
    device: 'desktop',
    order: 5,
    title: 'Syncing',
    sourceFile: 'AutoCampaign-Loading.dc.html',
    image: '/images/prototype/desktop/05-syncing.png',
    uxLaws: [
      {
        law: 'Doherty Threshold',
        note: 'Progress bars and spinners give continuous feedback, so the wait never feels stalled.',
      },
      {
        law: "Jakob's Law",
        note: 'Skeleton loaders match the shape of the real content underneath, a pattern from every app people already use.',
      },
      {
        law: 'Law of Prägnanz',
        note: 'The loading state simplifies to bars and dots. Nothing else competes for attention while the user waits.',
      },
    ],
  },
  {
    id: 'desktop-connection-error',
    device: 'desktop',
    order: 6,
    title: 'Connection error',
    sourceFile: 'AutoCampaign-ConnectionError.dc.html',
    image: '/images/prototype/desktop/06-connection-error.png',
    uxLaws: [
      {
        law: "Postel's Law",
        note: 'The error names exactly what to check, calendar read permissions, not a generic failure message.',
      },
      {
        law: 'Zeigarnik Effect',
        note: '"Already-approved posts still publish" closes the open loop the error creates.',
      },
      {
        law: 'Von Restorff Effect',
        note: 'The failed connection is the only red element on the screen.',
      },
    ],
  },
  {
    id: 'desktop-draft-error',
    device: 'desktop',
    order: 7,
    title: 'Draft error',
    sourceFile: 'AutoCampaign-DraftError.dc.html',
    image: '/images/prototype/desktop/07-draft-error.png',
    uxLaws: [
      {
        law: 'Von Restorff Effect',
        note: 'One red card breaks the pattern of an otherwise normal queue, flagging exactly what needs attention.',
      },
      {
        law: "Postel's Law",
        note: 'Retry lives right on the failed card, not in a separate settings screen.',
      },
      {
        law: 'Selective Attention',
        note: 'The failure never blocks the two healthy drafts sitting right beside it.',
      },
    ],
  },

  // Mobile, same flow order: connected tabs, edit sheet, then edge cases.
  {
    id: 'mobile-approvals',
    device: 'mobile',
    order: 2,
    title: 'Approvals',
    sourceFile: 'Mobile-Approvals.dc.html',
    image: '/images/prototype/mobile/01-approvals.png',
    uxLaws: [
      {
        law: "Fitts's Law",
        note: 'Approve, the most-used action, gets the biggest target, closest to the thumb.',
      },
      {
        law: "Hick's Law",
        note: 'Every card offers three actions only, never more.',
      },
      {
        law: 'Law of Proximity',
        note: 'The pending count and the bulk-approve button share one row, so intent and action stay together.',
      },
    ],
  },
  {
    id: 'mobile-connections',
    device: 'mobile',
    order: 1,
    title: 'Connections',
    sourceFile: 'Mobile-Connections.dc.html',
    image: '/images/prototype/mobile/02-connections.png',
    uxLaws: [
      {
        law: "Jakob's Law",
        note: 'A settings-style list of connected accounts, the pattern from every app that has ever linked a service.',
      },
      {
        law: "Miller's Law",
        note: 'Only two connections shown, well under any limit on what a person tracks at once.',
      },
      {
        law: 'Aesthetic-Usability Effect',
        note: 'Consistent status pills make "connected" read as calm and certain.',
      },
    ],
  },
  {
    id: 'mobile-insights',
    device: 'mobile',
    order: 3,
    title: 'Insights',
    sourceFile: 'Mobile-Insights.dc.html',
    image: '/images/prototype/mobile/03-insights.png',
    uxLaws: [
      {
        law: 'Von Restorff Effect',
        note: 'Hard numbers and inferred numbers use different colors, so a click is never mistaken for a guess.',
      },
      {
        law: 'Law of Proximity',
        note: "Each post's metrics sit inside its own card, not a separate table to cross-reference.",
      },
      {
        law: "Miller's Law",
        note: 'Three stat tiles, not ten, keep the weekly summary readable at a glance.',
      },
    ],
  },
  {
    id: 'mobile-edit-draft',
    device: 'mobile',
    order: 4,
    title: 'Edit Draft',
    sourceFile: 'Mobile-EditDraft.dc.html',
    image: '/images/prototype/mobile/04-edit-draft.png',
    uxLaws: [
      {
        law: "Fitts's Law",
        note: 'Save sits full width at the top, one thumb-reach away on any screen size.',
      },
      {
        law: 'Doherty Threshold',
        note: 'The sheet slides in immediately. No loading state between tapping Edit and seeing the draft.',
      },
      {
        law: "Postel's Law",
        note: 'The dynamic caption field is called out with a note on what it does.',
      },
    ],
  },
  {
    id: 'mobile-disconnected-connections',
    device: 'mobile',
    order: 5,
    title: 'Disconnected, Connections',
    sourceFile: 'Mobile-Disconnected-Connections.dc.html',
    image: '/images/prototype/mobile/05-disconnected-connections.png',
    uxLaws: [
      {
        law: "Hick's Law",
        note: 'One button, one decision. Instagram waits until Punchpass connects, so there is nothing else to choose yet.',
      },
      {
        law: 'Zeigarnik Effect',
        note: 'The greyed-out second row signals unfinished setup without distracting from step one.',
      },
      {
        law: "Jakob's Law",
        note: 'Connect buttons look and behave like any first-time OAuth flow.',
      },
    ],
  },
  {
    id: 'mobile-disconnected-approvals',
    device: 'mobile',
    order: 6,
    title: 'Disconnected, Approvals',
    sourceFile: 'Mobile-Disconnected-Approvals.dc.html',
    image: '/images/prototype/mobile/06-disconnected-approvals.png',
    uxLaws: [
      {
        law: 'Peak-End Rule',
        note: 'An empty queue still ends in one clear next action, not a blank screen.',
      },
      {
        law: 'Aesthetic-Usability Effect',
        note: 'The same icon and card style as every other empty state, so nothing here reads as an error.',
      },
      {
        law: 'Law of Common Region',
        note: 'Icon, message, and button are grouped in one centered block, read as a single unit.',
      },
    ],
  },
  {
    id: 'mobile-disconnected-insights',
    device: 'mobile',
    order: 7,
    title: 'Disconnected, Insights',
    sourceFile: 'Mobile-Disconnected-Insights.dc.html',
    image: '/images/prototype/mobile/07-disconnected-insights.png',
    uxLaws: [
      {
        law: 'Zeigarnik Effect',
        note: '"No insights yet" plus a clear cause keeps the loop open until the user connects.',
      },
      {
        law: 'Consistency',
        note: 'Reuses the same empty-state layout as Approvals, so the pattern is only learned once.',
      },
      {
        law: 'Aesthetic-Usability Effect',
        note: 'A calm icon and short line of copy over a stark blank page.',
      },
    ],
  },
  {
    id: 'mobile-syncing',
    device: 'mobile',
    order: 8,
    title: 'Syncing, Connections',
    sourceFile: 'Mobile-Loading-Connections.dc.html',
    image: '/images/prototype/mobile/08-syncing-connections.png',
    uxLaws: [
      {
        law: 'Doherty Threshold',
        note: 'Live status text turns a silent wait into visible progress.',
      },
      {
        law: "Jakob's Law",
        note: 'Spinner and progress bar pairing is the exact pattern used by booking and payment apps everywhere.',
      },
      {
        law: 'Law of Prägnanz',
        note: 'Two simple rows. Nothing else competes while the sync runs.',
      },
    ],
  },
  {
    id: 'mobile-connection-error-connections',
    device: 'mobile',
    order: 9,
    title: 'Connection error, Connections',
    sourceFile: 'Mobile-ConnectionError-Connections.dc.html',
    image: '/images/prototype/mobile/09-connection-error-connections.png',
    uxLaws: [
      {
        law: "Postel's Law",
        note: 'The retry button and the exact fix both live inside the failed row.',
      },
      {
        law: 'Von Restorff Effect',
        note: 'A red-tinted card is the only color break on the screen.',
      },
      {
        law: 'Selective Attention',
        note: "Instagram's healthy status stays visible right below the error, so one failure does not read as a full outage.",
      },
    ],
  },
  {
    id: 'mobile-connection-error-approvals',
    device: 'mobile',
    order: 10,
    title: 'Connection error, Approvals',
    sourceFile: 'Mobile-ConnectionError-Approvals.dc.html',
    image: '/images/prototype/mobile/10-connection-error-approvals.png',
    uxLaws: [
      {
        law: 'Zeigarnik Effect',
        note: '"Already-approved posts still publish" resolves the anxiety the error creates.',
      },
      {
        law: 'Peak-End Rule',
        note: 'The screen ends on a single retry action, not a wall of explanation.',
      },
      {
        law: 'Aesthetic-Usability Effect',
        note: 'Same layout as every other blocked state, so the user already knows what to do here.',
      },
    ],
  },
  {
    id: 'mobile-draft-error',
    device: 'mobile',
    order: 11,
    title: 'Draft error, Approvals',
    sourceFile: 'Mobile-DraftError-Approvals.dc.html',
    image: '/images/prototype/mobile/11-draft-error-approvals.png',
    uxLaws: [
      {
        law: 'Von Restorff Effect',
        note: 'One red card among two normal ones makes the failure easy to spot and easy to isolate.',
      },
      {
        law: 'Selective Attention',
        note: 'The failure sits inside its own card, so it never blocks approving the two healthy drafts.',
      },
      {
        law: "Fitts's Law",
        note: 'Retry this draft is a full-width tap target inside the card itself.',
      },
    ],
  },
];

export const screensByDevice = (device: Device) =>
  screens.filter((s) => s.device === device).sort((a, b) => a.order - b.order);

export type StoryId = 'connections' | 'approvals' | 'insights' | 'edit';
export type EdgeId = 'disconnected' | 'loading' | 'error';

export type CategoryCard = {
  id: string;
  label: string;
  description: string;
};

// Shared across devices: a user story is the same regardless of which surface it's viewed on.
export const storyCards: CategoryCard[] = [
  { id: 'connections', label: 'Connections', description: 'Seamlessly connect my Instagram and booking app.' },
  { id: 'approvals', label: 'Approval Queue', description: 'Quickly review, approve, edit or skip the suggested posts.' },
  { id: 'insights', label: 'Insights', description: 'Track performance of my posts.' },
  { id: 'edit', label: 'Edit Draft', description: 'Adjust the caption, schedule, or image before it goes out.' },
];

export const edgeCards: CategoryCard[] = [
  { id: 'disconnected', label: 'Disconnected', description: "Prompts reconnecting when an account isn't linked." },
  { id: 'loading', label: 'Loading', description: 'Shows sync progress while accounts and posts load.' },
  { id: 'error', label: 'Error', description: 'Flags exactly what failed and how to retry it.' },
];

export function categorizeScreen(screen: Screen): { story: StoryId[]; edge: EdgeId | null } {
  const id = screen.id;

  let edge: EdgeId | null = null;
  if (id.includes('disconnected')) edge = 'disconnected';
  else if (id.includes('syncing')) edge = 'loading';
  else if (id.includes('connection-error') || id.includes('draft-error')) edge = 'error';

  const story: StoryId[] = [];
  if (screen.device === 'desktop') {
    // The desktop Feature Page covers all three primary tabs in one screen.
    if (id.includes('auto-campaign')) story.push('connections', 'approvals', 'insights');
    else if (id.includes('edit-draft')) story.push('edit');
  } else {
    if (id.includes('approvals')) story.push('approvals');
    else if (id.includes('connections')) story.push('connections');
    else if (id.includes('insights')) story.push('insights');
    else if (id.includes('edit-draft')) story.push('edit');
  }

  return { story, edge };
}
