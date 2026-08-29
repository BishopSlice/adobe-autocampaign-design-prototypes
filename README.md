# Auto Campaign

A concept for Adobe Express: turn a solo business owner's booking calendar into a self-running social campaign she only has to approve.

This repo holds the site presenting that work. **Announcement** pitches the feature the way Adobe would, with the user and her frictions in a modal. **Prototype** holds 18 screens across desktop and mobile. The design system opens in-app.

## The bet

Sonal teaches yoga in Mumbai. She runs the classes, the marketing, and the bookings, with maybe 90 seconds between sessions.

Her calendar already holds the answer. An empty Saturday 9am slot is a marketing brief. So the system reads her booking platform, drafts a week of posts against real inventory, and queues them. Her job shifts from creating to approving.

## Process

### Stage 1: Feature discovery

**Customer segment value.** Solo business owners whose calendar is their revenue. One segment rather than a composite, so the constraint stays sharp.

**Persona.** Sonal, teaching yoga in Mumbai, 90 seconds between classes. A named person settles a debate faster than a deck.

**Pain points.** Deciding what to post, and knowing whether it worked. Generation sits between the two and was never the bottleneck.

**Expected outcomes.** Save time, grow reach, convert more. Booking rate is the number that matters, not likes.

**User stories.** Connect, approve, track. The same three words now run through the announcement, the story cards and the mobile tabs.

### Stage 2: Iterate with coding agents and a design canvas

**Design systems.** Tokens lifted from real Express surfaces into `docs/design.md` before any screen existed, so the prototype and the site read from one source.

**Design taste.** Judged output against that system instead of taking the first pass. Blocked states got the same care as the happy path: 14 of 18 screens are disconnected, syncing, or failed.

**Editing and regeneration.** Explored on the canvas, where a structure is cheap to throw away. Three mobile directions existed before one was chosen.

**Frontend and UI engineering.** Built in React so motion is part of the argument. Rotating sets sit at fixed heights so nothing reflows, and hover swaps for a timer where there is no pointer.

**Copywriting.** Adobe's own voice, checked against how Content Scheduler was announced. Second person, plain headline, one verb triplet.

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
