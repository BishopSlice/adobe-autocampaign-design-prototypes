# Auto Campaign, portfolio site

A real React + Vite + Tailwind project. Two pages, toggled at the top: **Discovery** (the user, her pains, her expected outcomes) and **Prototype** (a carousel of the actual Auto Campaign screens, desktop and mobile, with the top 3 UX laws behind each one).

## Run it

```bash
cd portfolio-site
npm install
npm run dev
```

Opens at `http://localhost:5173`. `npm run build` produces a static `dist/` folder you can deploy anywhere (Vercel, Netlify, GitHub Pages).

## Project structure

```
src/
  data/
    persona.ts   Sonal's bio, quote, journey stages, outcomes
    screens.ts   all 18 prototype screens: title, source file, image path, UX laws
  components/
    DiscoveryPage.tsx    persona header + outcomes
    JourneyMap.tsx        the 3-stage scroll-reveal frictions map
    PrototypePage.tsx     feature intro, device toggle, design-system link, tag filter
    ScreenCarousel.tsx    the auto-advancing stacked screen carousel
    ScreenImage.tsx        image with a labeled placeholder fallback
    PageToggle.tsx, icons.tsx    shared chrome
```

Colors, radius, and type all come from `tailwind.config.js`, mapped straight from the tokens in `docs/design.md` (the same tokens the prototype itself uses). The prototype screens are **not redesigned** here. This site is a wrapper around them.

## Adding images

Nothing in this project needs images to run. Every image slot has a labeled placeholder (persona photo, each screen) that renders until a real file shows up at the expected path. Two kinds of images to add:

### 1. Sonal's photo

Drop a photo at:

```
public/images/persona/sonal.jpg
```

If you're using a different format (`.png`, `.webp`), update the `photo` path in `src/data/persona.ts` to match.

### 2. The 18 prototype screens

These need to be exported from the canvas we built earlier: **[the published prototype](https://claude.ai/code/artifact/5c9c82fd-40c0-4deb-8ed2-967f5cbd44ab)**. Open it, expand each artboard, and use the toolbar's **Export → PNG**. Save each export with the exact filename below, into the matching folder under `public/images/prototype/`.

**Desktop** (`public/images/prototype/desktop/`)

| File | Artboard in the canvas |
|---|---|
| `01-home.png` | Main.dc.html — Home |
| `02-auto-campaign.png` | AutoCampaign.dc.html — Auto Campaign |
| `03-edit-draft.png` | EditDraftModal.dc.html — Edit Draft |
| `04-disconnected.png` | AutoCampaign-Disconnected.dc.html |
| `05-syncing.png` | AutoCampaign-Loading.dc.html |
| `06-connection-error.png` | AutoCampaign-ConnectionError.dc.html |
| `07-draft-error.png` | AutoCampaign-DraftError.dc.html |

**Mobile** (`public/images/prototype/mobile/`)

| File | Artboard in the canvas |
|---|---|
| `01-approvals.png` | Mobile-Approvals.dc.html |
| `02-connections.png` | Mobile-Connections.dc.html |
| `03-insights.png` | Mobile-Insights.dc.html |
| `04-edit-draft.png` | Mobile-EditDraft.dc.html |
| `05-disconnected-connections.png` | Mobile-Disconnected-Connections.dc.html |
| `06-disconnected-approvals.png` | Mobile-Disconnected-Approvals.dc.html |
| `07-disconnected-insights.png` | Mobile-Disconnected-Insights.dc.html |
| `08-syncing-connections.png` | Mobile-Loading-Connections.dc.html |
| `09-connection-error-connections.png` | Mobile-ConnectionError-Connections.dc.html |
| `10-connection-error-approvals.png` | Mobile-ConnectionError-Approvals.dc.html |
| `11-draft-error-approvals.png` | Mobile-DraftError-Approvals.dc.html |

That table is also encoded in `src/data/screens.ts` (the `sourceFile` and `image` fields on each entry), so if you rename or reorder anything, update it there and both pages of the site follow.

Once a file lands at the right path, that screen's placeholder is replaced automatically. Nothing else needs to change.
