# Auto Campaign

A concept for Adobe Express: turn a solo business owner's booking calendar into a self-running social campaign she only has to approve.

This repository is the case study site for that work. Two views, toggled at the top:

- **Discovery**: who the user is, where her current flow breaks, what she expects instead.
- **Prototype**: 18 screens across desktop and mobile, each framed by the user story and edge case it answers.

Design system is bundled in-app at `/design-system.html`, opened from the Prototype view.

---

## The bet

Sonal teaches yoga in Mumbai. She runs the classes, the marketing, the bookings, and the follow-up. She has maybe 90 seconds between sessions.

The obvious AI answer is a better generator: describe a post, get a post. That solves the wrong bottleneck. Watching the actual loop, the expensive parts are upstream and downstream of generation:

1. **Deciding what to post.** Hours of scrolling for reference and trends.
2. **Making it.** Every post starts from an empty canvas or a template that makes her look like everyone else.
3. **Posting and knowing if it worked.** Inconsistent schedule, manual tracking, no feedback loop.

Generation only touches step 2. So the bet here is different: **her calendar already knows what to post about.** An empty Saturday 9am slot is a marketing brief. A class that fills every week is a proven hook.

Auto Campaign reads the booking platform, generates a week of drafts timed against real inventory, and puts them in a queue. Her job changes from *creating* to *approving*.

That reframes the design problem. This is not a generation surface. It is an agent with a review step, and agents are judged on different things than generators.

---

## Decisions and tradeoffs

### Approval queue as the trust primitive

Nothing publishes without a human yes.

An off-brand post on a personal brand is asymmetrically expensive. One bad post costs more than ten good posts earn. Full autonomy is the more impressive demo and the wrong first version.

**Tradeoff:** the queue adds friction to a product whose whole pitch is removing friction. Mitigated by making approval a one-tap action with bulk approve, and by never asking her to review the same thing twice. Autonomy is something the system earns later, once she has approved enough drafts to trust the pattern.

### States are the product, not the polish

Of 18 screens, 4 are the happy path. The other 14 are disconnected, syncing, connection failure, and generation failure, across both form factors.

That ratio is deliberate. A generator is defined by its output. An agent is defined by what it does when it cannot act. If Punchpass stops responding at 2am, the product's entire credibility rests on a screen most design work treats as a leftover.

Every blocked state answers three questions in a fixed order: what broke, what it means for work already in flight, and the single action that fixes it. "Posts you have already approved will still publish" does more for trust than any amount of visual craft on the happy path.

**Tradeoff:** depth over breadth. No template picker, no brand kit, no multi-platform fan-out. Those are real gaps. They are also the parts of this problem that are already solved elsewhere.

### Splitting connection errors from draft errors

These started as one screen showing both failures at once. That was incoherent on inspection: if the booking platform is not connected, drafts cannot generate, so a combined error implies a state the system cannot actually reach.

Split into two screens with a clear causal order. Connection failure blocks generation. Generation failure is isolated to a single draft and never blocks the healthy ones beside it.

Small fix, but it is the kind that only surfaces when you build the states out and try to walk between them.

### Hard data and inferred data are visually distinct

The design system carries two separate tokens, `data-hard` and `data-inferred`, and Insights uses them to separate measured numbers from estimated ones. Link clicks are counted. "~14 intent DMs" is inferred.

Presenting an inference with the same confidence as a measurement is the fastest way to lose a user who checks. Encoding that distinction as a **token** rather than a per-screen decision means it holds everywhere by default.

### Mobile is a different job, not a smaller screen

Mobile drops the desktop entry point entirely, replaces breadcrumbs with a three-item tab bar, and picks its default tab from system state: Connections when nothing is linked, Approvals once it is.

On desktop she is setting things up. On mobile she is triaging between classes. Same feature, different verb.

**Tradeoff:** two layout systems to maintain instead of one responsive one. Worth it. A responsive collapse of the desktop screen would have put setup affordances in front of someone who has 90 seconds and only wants to approve three drafts.

### Two design languages, held apart on purpose

The prototype screens use a system derived from Adobe Express: neutral chrome, `#5B4FE0` accent, restrained. The surrounding case study uses an editorial palette and display type that Express would never ship.

That contrast is functional. A reader should never be unsure which pixels are the proposed product and which are the frame around it.

**Tradeoff:** two token sets in one config. Kept manageable by namespacing them (`earth.*` for the frame, semantic tokens for the product) so they cannot bleed into each other by accident.

---

## How it was built

The pipeline matters more than any single artifact, because the pipeline is what makes the next feature cheaper than this one.

```
Express screenshots
      ↓  extract, name, systematize
docs/design.md            single source of truth for tokens
      ↓                        ↓
18 .dc.html artboards     tailwind.config.js
      ↓  export                ↓
public/images/*.png  →   React case study site
      ↑
src/data/screens.ts  keeps every export traceable to its source artboard
```

**Tokens before screens.** The system was extracted from real Express surfaces and written down before any artboard existed. Both the prototype and this site read from it. Changing a value changes both. That is the difference between a design system and a style guide.

**Artboards as the exploration surface.** Fast to produce, fast to throw away, cheap enough to build all 14 edge cases instead of arguing about which two matter.

**Static exports, deliberately.** The artboards depend on a canvas runtime and cannot be embedded live. Rather than rebuild 18 screens as React components to preserve interactivity nobody would use in a case study, they are exported as PNGs. `src/data/screens.ts` holds the mapping from each image back to its source artboard, so the chain from token to pixel stays auditable.

**Real code for the frame.** The case study itself is React, TypeScript, and Tailwind rather than a static comp, because its whole argument is about motion and state: autoplay that yields to any interaction, hover choreography that reveals without reflowing, cross-fades between views. None of that can be evaluated honestly in a still image.

---

## Engineering notes

The front-end decisions worth calling out, because they are design decisions wearing a different hat.

**Single source of truth for interaction state.** Carousel autoplay pauses on *any* user input, not just clicks on the carousel. That required lifting `paused` out of the carousel and into the page, so tag chips, arrows, and pointer events all resolve to one flag. State that lives in the wrong component produces bugs that read as sloppiness.

**Cross-column alignment via shared grid lines.** On Discovery, two elements in different columns need to share an exact edge. Guessing margins against unmeasurable text heights is not a solution, it is a maintenance cost. Both columns render into one CSS grid, and the alignment falls out of a shared row boundary regardless of content height.

**Layout that fails loudly.** Both views fit one viewport at desktop with no scroll. A hard constraint like that turns every content addition into an explicit tradeoff instead of a silent scroll. Mobile is allowed to scroll, because forcing it there would mean cutting content that earns its place.

**Motion respects the user.** Every animation, reveal, autoplay, and auto-advance checks `prefers-reduced-motion` and degrades to a static equivalent.

**Graceful degradation on every image.** Persona photo and all 18 screens render labeled placeholders if a file is missing. The site never renders broken.

---

## Limits, and what I would do next

Stated plainly, because a case study that only lists wins is not a case study.

- **The screens are static.** Interaction is described and framed, not clickable. The honest next step is rebuilding the three highest-traffic screens as live React so the approve flow can actually be tested.
- **No model in the loop.** Generation quality, caption tone, and image selection are designed, not implemented. The hardest unsolved problem here is what a *bad* draft looks like and how the queue surfaces it.
- **Untested with real users.** Every claim about Sonal is reasoned from first principles, not from research. The approval queue in particular needs testing: my assumption that review feels safe rather than tedious is exactly the kind of assumption that dies on contact.
- **Trust is designed, not earned.** The system asks for calendar and social access on day one. A real version would stage that, proving value on read-only data before asking for permission to post.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

React 18, Vite 5, TypeScript, Tailwind 3. No runtime dependencies beyond React.

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

### Replacing screen exports

Drop a PNG at the path named in `src/data/screens.ts` and it replaces that screen's placeholder automatically. The `sourceFile` field on each entry names the artboard it came from. Rename or reorder there and both views follow.
