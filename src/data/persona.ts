export const persona = {
  name: 'Sonal',
  age: 29,
  role: 'Yoga studio owner | Solopreneur',
  photo: '/images/persona/sonal.jpg',
  bio: [
    'Sonal is a certified yoga professional. For the past year, she has been committed to building a community of yoga enthusiasts in Mumbai.',
    'She uses Instagram to get her clients. She has had a solid start and now wants to scale her business.',
  ],
};

export type JourneyStage = {
  id: string;
  stage: string;
  title: string;
  friction: string;
};

export const journey: JourneyStage[] = [
  {
    id: 'curate',
    stage: 'Stage 1',
    title: 'Curate content to post',
    friction:
      'She spends hours every day scrolling for content to post on. Despite the effort, she has no way to tell if any of it works.',
  },
  {
    id: 'create',
    stage: 'Stage 2',
    title: 'Creating posts from scratch',
    friction:
      'Every post starts from scratch. Reusing the same templates risks her brand looking generic and boring on Instagram.',
  },
  {
    id: 'post',
    stage: 'Stage 3',
    title: 'Posting and Tracking',
    friction:
      'The first two frictions stop her from posting on a regular schedule. She tracks what worked by hand, trying to repeat it.',
  },
];

export type Outcome = {
  id: string;
  label: string;
  description: string;
};

export const outcomes: Outcome[] = [
  {
    id: 'save-time',
    label: 'Save Time',
    description: 'Spend significantly lesser time on content, and focus more on her classes.',
  },
  {
    id: 'grow-reach',
    label: 'Grow Reach',
    description: 'Post on-brand content consistently to grow her audience, and track what works.',
  },
  {
    id: 'convert-more',
    label: 'Convert More',
    description: 'Fill out her calendar more. Increase the overall booking percentage.',
  },
];

export const feature = {
  title: 'Auto Campaign',
  summary:
    'Express turns your booking calendar into a continuous campaign that boosts customer conversion.',
};
