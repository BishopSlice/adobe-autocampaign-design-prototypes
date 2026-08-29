# Auto Campaign

A concept for Adobe Express: turn a solo business owner's booking calendar into a self-running social campaign she only has to approve.

This repo holds the site presenting that work. **Announcement** pitches the feature the way Adobe would, with the user and her frictions in a modal. **Prototype** holds 18 screens across desktop and mobile.

## The bet

Sonal teaches yoga in Mumbai. She runs the classes, the marketing, and the bookings, with maybe 90 seconds between sessions.

Her calendar already holds the answer. An empty Saturday 9am slot is a marketing brief. So the system reads her booking platform, drafts a week of posts against real inventory, and queues them. Her job shifts from creating to approving.

## Process

### Stage 1: Feature discovery

**Customer segment value.** Solo business owners whose calendar is their revenue. One segment, not a composite, so the constraint stays sharp.

**Persona.** Sonal, teaching yoga in Mumbai, 90 seconds between classes. A named person settles a debate faster than a deck.

**Pain points.** Deciding what to post, and knowing whether it worked. Generation sits between the two and was never the bottleneck.

**Expected outcomes.** Save time, grow reach, convert more. Booking rate is the number that matters, not likes.

**User stories.** Connect, approve, track. The same three words run through the announcement, the story cards and the mobile tabs.

### Stage 2: Iterate with coding agents and a design canvas

**Design systems.** Read real Express surfaces and captured them as two mirrored files: `docs/design.md` holds the tokens an agent builds from, `docs/design.html` renders them live for a human. Names are semantic, so `on-primary` survives a palette change that `white` would not.

**Design taste.** Judged against named heuristics, not the first pass. Every blocked state says what broke, what survives it, and the one fix. One red element per screen, so the break is unmissable.

**Editing and regeneration.** Explored on a canvas, where a structure is cheap to throw away. Three mobile directions existed before one was chosen.

**Frontend and UI engineering.** Composition over configuration: one dialog shell and one rotator hook serve every surface that needs them. Hover swaps for a timer where there is no pointer to hover with. Contrast, focus order and keyboard paths hold from 320px up.

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
