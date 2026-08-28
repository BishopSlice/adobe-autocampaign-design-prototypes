# Auto Campaign

A concept for Adobe Express: turn a solo business owner's booking calendar into a self-running social campaign she only has to approve.

This repo holds the site presenting that work. **Announcement** pitches the feature the way Adobe would, with the user and her frictions in a modal. **Prototype** holds 18 screens across desktop and mobile. The design system opens in-app.

## The bet

Sonal teaches yoga in Mumbai. She runs the classes, the marketing, and the bookings, with maybe 90 seconds between sessions.

Her calendar already holds the answer. An empty Saturday 9am slot is a marketing brief. So the system reads her booking platform, drafts a week of posts against real inventory, and queues them. Her job shifts from creating to approving.

## Process

**1. Pick one user, not a segment**
Goal: a constraint sharp enough to settle arguments.
Options: a composite of small business types, or one named person.
Chose one. "Sonal has 90 seconds between classes" settles a debate faster than any persona deck.

**2. Find the real bottleneck**
Goal: aim the AI at the expensive part.
Options: a better generator, or automate the decision upstream of it.
Chose upstream. Her hard parts are deciding what to post and knowing if it worked. Generation sits between them and was never the constraint.

**3. Systematize before drawing**
Goal: one source of truth for both the prototype and the site.
Options: design screens first and extract patterns later, or tokens upfront.
Chose upfront. Tokens came from real Express surfaces into `docs/design.md`, so changing a value changes both.

**4. Review, not autonomy**
Goal: prove the loop is worth building.
Options: a generation surface with prompt controls, or an approval queue.
Chose the queue. An off-brand post costs more than a good one earns, so nothing publishes without a yes.

**5. Build every blocked state**
Goal: make the agent credible when it cannot act.
Options: ship the four happy-path screens, or all of them.
Chose all. 14 of 18 screens are disconnected, syncing, or failed. An agent is defined by what it does at 2am when the calendar stops responding.

**6. Present it in code**
Goal: show the work, not a picture of it.
Options: static comps, or a real front end.
Chose code. Motion is part of the argument: autoplay that yields to any input, rotating sets at fixed heights so nothing reflows, hover swapped for a timer where there is no pointer.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

React 18, Vite 5, TypeScript, Tailwind 3.

```
src/
  data/
    persona.ts       user, journey stages, expected outcomes
    screens.ts       18 screens: source artboard, image path, story and edge-case mapping
  components/
    DiscoveryPage.tsx    persona, frictions, outcomes, entry to the prototype
    JourneyMap.tsx       three-stage friction cards, auto-advancing
    PrototypePage.tsx    device toggle, screen tags, story and edge-case context
    ScreenCarousel.tsx   stacked carousel, autoplay yields to any interaction
    ScreenImage.tsx      image with labeled placeholder fallback
    Modal.tsx            focus-trapped dialog, hosts the design system
    Reveal.tsx           intersection-observer reveal, honors reduced motion
```

Colors, radius, and type come from `tailwind.config.js`, mapped from the same tokens the prototype screens use.

Screen exports live at the paths named in `src/data/screens.ts`. Drop a PNG at one and it replaces that screen's placeholder. The `sourceFile` field names the artboard it came from.
