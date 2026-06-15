# GM Tool SPA — Technical Reference

Loaded when working on files in `src/`.

---

## Stack

- **Vite + React 18 + TypeScript** — no routing library; view state machine via Zustand
- **Tailwind CSS v4** — dark theme; amber accents; `bg-gray-950` base
- **react-markdown** — custom remark plugin (`src/lib/remarkGmBlocks.ts`) parses `[!NARRATION]` / `[!DIALOG]` blockquote prefixes; renderer styles them as sky/amber boxes
- **gray-matter** — custom Vite plugin parses markdown frontmatter at build time
- **Zustand 5** — two slices: `appSlice` (view/filter), `encounterSlice` (combat state)
- **Deployed on Vercel** — auto-deploy on push to main; no backend

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
- `src/data/npcs.ts` — glob: `/world/locations/**/npc-*.md` + `/world/npcs/*.md`
- `src/data/enemies.ts` — glob: `/world/enemies/*.md`

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
```

---

## Navigation

`View = 'regions' | 'manual' | 'encounter'`

- `regions` — default; `RegionView` manages 3-level nav (list → region → location)
- `manual` — `MonsterManual`; can push to `encounter`
- `encounter` — `EncounterView`; full-screen overlay

`RegionView` exports `LocationCard`, `SceneSection`, `LocationDetail` for reuse.

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
