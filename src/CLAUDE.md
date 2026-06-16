# GM Tool SPA — Technical Reference

Loaded when working on files in `src/`.

---

## Stack

- **Vite + React 18 + TypeScript** — React Router v7 for URL-based navigation
- **Tailwind CSS v4** — dark theme; amber accents; `bg-gray-950` base
- **react-markdown** — custom remark plugin (`src/lib/remarkGmBlocks.ts`) parses `[!NARRATION]` / `[!DIALOG]` blockquote prefixes; renderer styles them as sky/amber boxes
- **gray-matter** — custom Vite plugin parses markdown frontmatter at build time
- **Zustand 5** — two slices: `appSlice` (filter only), `encounterSlice` (combat state)
- **Deployed on Vercel** — auto-deploy on push to main; no backend

---

## Zustand Slices

- `appSlice.ts` — filter state only
- `encounterSlice.ts` — combat encounter state (enemies added to combat tracker)
- `printSlice.ts` — print queue state (items staged for `window.print()`)

---

## Data Flow

```
world/**/*.md
  → Vite plugin (gray-matter) transforms frontmatter + body
  → import.meta.glob (eager) loads all modules at build time
  → src/data/*.ts maps to typed arrays/maps
  → components consume via direct import (no fetch, no API)
```

Key loaders:
- `src/data/regions.ts` — glob: `/world/regions/*/index.md`
- `src/data/locations.ts` — glob: `/world/locations/*/index.md`
- `src/data/npcs.ts` — glob: `/world/npcs/*.md`; exports `npcMap` keyed by slug
- `src/data/enemies.ts` — glob: `/world/enemies/*.md`; exports `enemies` array and `enemyMap` keyed by slug
- `src/data/items.ts` — glob: `/world/items/item-*.md`; exports `items` array and `itemMap` keyed by slug

Slug is always derived from the filename or directory name — not stored in frontmatter.

---

## Data Hierarchy

```
Region  (src/types/region.ts)
├── scenes: Scene[]       ← regional scene library; reusable, not route-locked
└── [locations filtered by region slug]

Location  (src/types/location.ts)
├── region: string        ← slug ref to parent region
└── scenes: Scene[]

Scene  (inline in Region or Location)
├── type: SceneType       ← 'explorable' | 'event' | 'combat' | 'approach'
└── tagline: string       ← required GM hook
```

---

## TypeScript Types

```
src/types/
  region.ts     — Region interface
  location.ts   — Location, Scene, SceneType, PlannedEncounter, PlannedEnemy
  npc.ts        — Npc interface
  enemy.ts      — Enemy, EncounterEnemy interfaces
  item.ts       — Item, PrintItem interfaces
```

---

## Navigation

React Router v7 — all navigation is URL-based.

```
/                            → redirect to /world
/world                       → RegionView (list)
/world/:regionSlug           → RegionDetailRoute
/world/:regionSlug/:locSlug  → LocationDetailRoute
/npc/:slug                   → NpcPage  (was NpcOverlay)
/items                       → ItemsView (list with type filter + search)
/items/:slug                 → ItemPage (detail with + Add to Print)
/print                       → PrintView (staged items + window.print(); tab bar hidden here)
/monsters                    → MonsterManual
/monsters/:slug              → EnemyPage (was EnemyOverlay)
/encounter                   → EncounterView (tab bar hidden here)
```

- `RegionView` (default) and `RegionDetailRoute` (named) are both exported from `RegionView.tsx`
- `LocationDetailRoute` is a named export from `LocationsView.tsx`; `LocationDetail` is prop-driven
- NPC pills in scenes/markdown are `<Link to="/npc/:slug">` — no store dispatch
- Enemy pills in markdown are `<Link to="/monsters/:slug">`
- Item pills in markdown are `<Link to="/items/:slug">`
- Tab bar shows "World" / "Items" / "Monsters"; hidden on `/encounter` and `/print`

---

## GM-First UX Standard

Every entity page surfaces narration and dialog immediately. Content order, always:

1. **Tagline** — first line after the name; always visible; never omit
2. **Voice** (NPCs only) — immediately after tagline; gets the GM speaking
3. **Narration / dialog** — blockquote-styled; the words to say at the table
4. **GM notes** — what's in motion, what to watch for (amber left-border treatment)
5. **Stats, history, metadata** — below the fold; dimmed prose styling

Location overview (historical body text) renders last, visually subdued. Scenes come first.

---

## Zustand Patterns

- One slice per domain — `appSlice.ts`, `encounterSlice.ts`
- Always export selector functions: `export const selectView = (s) => s.view`
- Use `useShallow` for selectors that return arrays or objects
- `useEffect` is last resort — prefer store side effects or ref callbacks
