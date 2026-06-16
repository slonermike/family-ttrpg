# Dev Session Log
## Rjocht Campaign — Family TTRPG Project

Sessions are logged in reverse-chronological order (newest first).

---

## 2026-06-16 — Items as First-Class Entities + Print Queue

**Summary:** Converted items from 4 aggregate markdown tables into 46 individual slug-able entity files following the NPC/Enemy pattern. Added an Items tab with browsing, filtering, and full detail pages. Built a print queue system analogous to the encounter queue — "Add to Print" stages items; `/print` renders a printable card grid via `window.print()`. Fixed a latent bug where inline `:npc[slug]`, `:enemy[slug]`, and `:item[slug]` directives never rendered as pills because `remark-directive` v4 uses `textDirective` (not `inlineDirective`) for inline syntax. Scrubbed all world markdown files to replace freehand item name mentions with `:item[slug]` directives.

### Key Changes

- **Deleted** 4 aggregate item files (`consumables.md`, `weapons.md`, `legendaries.md`, `story-items.md`) and **created** 46 individual `world/items/item-[slug].md` files — one per item; slug = filename minus `item-` prefix
- Frontmatter schema: `name`, `type` (consumable|weapon|armor|legendary|story), `category?` (consumables only), `tagline`, `effect`, `consumable: boolean`; body = lore/GM notes → `description`; item holder state is NOT tracked here (lives in session debriefs only)
- Created `src/types/item.ts` — `Item` interface and `PrintItem { id, base: Item, qty }` for the print queue
- Created `src/data/items.ts` — `import.meta.glob` loader; exports `items[]` and `itemMap`
- Created `src/store/printSlice.ts` — `addItem` deduplicates by slug and increments qty (vs encounter queue which duplicates with labels); `setQty`, `removeItem`, `clearPrint`; `usePrint` with `useShallow`
- Created `src/components/ItemCard.tsx` — type badge colors (consumable=sky, weapon=orange, armor=slate, legendary=purple, story=emerald); rose "CONSUMABLE" badge; "+ Add" button calls `onAdd(item)` without navigation; exports `typeStyle`/`typeLabel` reused by ItemPage
- Created `src/components/ItemPage.tsx` — mirrors EnemyPage; effect in amber-tinted box; fixed bottom "+ Add to Print" → adds then navigates to `/print`
- Created `src/components/ItemsView.tsx` — type filter pills, search on name/effect/tagline, grouped by type with collapsible sections, float button for print count
- Created `src/components/PrintView.tsx` — screen: qty `−/+`, remove ✕, Clear, Print buttons; print layout (`print:hidden`/`print:block`): 3-column grid, `aspect-square` cards for cutting, `break-inside-avoid`
- Updated `src/App.tsx` — added `/items`, `/items/:slug`, `/print` routes; 3-tab bar (World | Items | Monsters); tab bar hidden on `/encounter` and `/print`; `lastItemsPath` tracking
- Updated `src/types/location.ts` — added `items?: string[]` to `Scene` interface (covers both Location and Region scenes)
- Updated `src/components/LocationsView.tsx` — `SceneSection` resolves `scene.items[]` to amber pills alongside NPC pills; amber pill style with ◆ prefix, links to `/items/:slug`
- **Bug fix** in `src/lib/remarkGmBlocks.ts` — changed `node.type === 'inlineDirective'` to `node.type === 'textDirective'`; `remark-directive` v4 uses `textDirective` for inline `:name[content]` syntax; the old name never matched, silently breaking all inline pills (npc, enemy, item) — they only ever worked via YAML arrays
- Updated `src/components/MarkdownBody.tsx` — added `ItemPill` component (amber, ◆ icon, links to `/items/:slug`), registered `'item-pill'` in components
- **World scrub** — updated item references in: `npc-jorik.md`, `npc-jasper.md`, `npc-margrave.md`, `npc-constance.md`, `npc-dorogh.md`, `npc-lisel.md`, `hidden-grove/index.md`, `the-reaches/index.md`, `rjocht/index.md`, `amber-hollow/index.md`, `boss-dorogh-stage2.md`; added `items: [slug]` YAML array to scene frontmatter where the item is the scene hinge (Pineapple Tribe → pineapple-scepter; Harvest Festival → joriks-blessing)
- Updated `world/CLAUDE.md` — added Item frontmatter schema; added `items: string[]` to Region and Location scene schemas; added `:item[slug]` to inline directives section
- Updated `src/CLAUDE.md` — added `items.ts`, `item.ts`, all three new routes, and `printSlice.ts`

### Key Decisions

- **46 individual files over 4 tables**: same pattern as NPCs/enemies; each item is independently addressable, slug-able, and routable; no shared index file needed
- **No `current_holder` in item frontmatter**: game state (who holds what) lives only in `sessions/*/debrief.md` Party State; item files describe the item, not its location in play
- **Print queue deduplicates**: `addItem` checks for existing slug and increments qty — print semantics are "N copies of this card" not "N separate entries"; differs intentionally from encounter queue
- **Dual item reference support**: `items: [slug]` in scene YAML (amber pill in SceneSection) AND `:item[slug]` directive in prose (amber pill in MarkdownBody); both render identically; "support both where possible"
- **`aspect-square` for print cards**: Tailwind `aspect-ratio: 1/1` gives cards equal height and width; user specified "minimum height the same as the width"

### Challenges

- **`textDirective` vs `inlineDirective`**: `remark-directive` v4 changed the node type for inline `:name[content]` from `inlineDirective` to `textDirective`. The old check never matched, so all inline pills silently no-oped. Traced via `node_modules/mdast-util-directive/lib/index.js`. Fix was a one-word change; also retroactively corrects npc and enemy inline pills.
- **`<div> cannot appear as descendant of <p>` warning**: initially suspected `ItemPill` div-inside-p nesting; root cause was the `textDirective` bug — `ItemPill` wasn't being called at all. DOM warning was a red herring for diagnosis.

### Opportunities Identified

- **`:enemy[l1-carp-mermaid]`** referenced in `the-reaches/index.md` gm_notes — a new enemy that doesn't have a stat block yet
- **Inline pills in `<p>` tags**: pill elements (`<Link>` wrapping a div) rendered inside paragraph elements technically violates HTML nesting; switching pills to `<span>`/`display:inline-block` would be spec-compliant
- **Print layout polish**: 3-column grid is functional; could add cut-line borders or card-stock sizing CSS for physical printing
- **Item "found in" backlinks**: item detail pages have no indication of which scenes contain them; could derive from world data at build time

---

## 2026-06-14 — GM Tool SPA: Locations View & NPC Reference

**Summary:** Added a Locations tab to the GM Tool SPA. Location folders drive the grouping; each location's `index.md` defines scenes via frontmatter, each scene lists NPC slugs. Tapping an NPC chip opens a full-screen overlay with the NPC's markdown rendered. Established a blockquote convention for narration (text the GM speaks aloud), rendered as a distinct callout box. Installed `react-markdown` and `@tailwindcss/typography`.

### Key Changes

- Added `scenes` frontmatter to all three `world/locations/*/index.md` files — each scene has `name`, `description` (player-facing + narration), `gm_notes` (private GM info), `npcs` (slug list), and optional `encounters` (future one-click combat setup)
- Added frontmatter to `world/locations/rjocht/npc-minors.md` (was prose-only, broke the loader)
- Fixed YAML parse errors in 5 NPC files where `fruit: null — Flesh: ...` used an unquoted em dash — now quoted strings
- Created `src/types/npc.ts` and `src/types/location.ts` — full type definitions including `PlannedEncounter`/`PlannedEnemy` stubs for future one-click encounter launch
- Created `src/data/npcs.ts` — builds a global `npcMap` from two globs: `world/locations/**/npc-*.md` and `world/npcs/*.md`; transcendent NPCs (Elder Greymane) resolve correctly even when referenced from a different location's scene
- Created `src/data/locations.ts` — loads `world/locations/*/index.md`, derives slug from folder name, sorts visited locations first
- Created `src/components/MarkdownBody.tsx` — shared ReactMarkdown wrapper; overrides blockquote rendering with a "Narration" callout (slate bg, sky border, italic text); used everywhere markdown is rendered
- Created `src/components/NpcOverlay.tsx` — slide-up sheet over a dimmed backdrop; shows name, role, status, fruit, voice callout, full markdown body; closes on Escape or backdrop tap
- Created `src/components/LocationsView.tsx` — location card list → location detail (GM Overview from body + collapsible scene sections); each scene shows description, GM notes (amber left-border treatment), NPC chips, and encounter stubs
- Updated `src/store/appSlice.ts` — added `'locations'` to `View` type
- Updated `src/App.tsx` — added two-tab bottom nav (Monsters / Locations); encounter view still accessed via FAB from Monster Manual, full-screens without tab bar

### Key Decisions

- **File structure is source of truth for locations**: folder = location slug, `index.md` defines scenes. No separate config file needed.
- **Global NPC map from two sources**: NPCs live in `world/locations/**/` (location-specific) or `world/npcs/` (transcendent). Both are merged into one map at build time. Scene frontmatter references slugs (`elder-greymane`) and the map resolves them regardless of source path.
- **Blockquote = narration convention**: `>` in any markdown field (description, gm_notes, NPC body) renders as a distinct "Narration" callout — the GM's words to players. Plain prose = GM reference/context. Keeps the two modes visually separated at a glance.
- **Scene `description` vs `gm_notes`**: `description` is orientation + spoken narration. `gm_notes` is private — NPC levers, mechanical notes, what's really in motion. Amber left-border visually separates GM-only content.
- **`encounters` on scenes are data-only for now**: `PlannedEncounter` and `PlannedEnemy` types exist, the frontmatter is written (e.g., Keep Entrance: 2× corrupted-guard), and the stubs render as text labels. One-click launch will connect to existing `addEnemy` in encounterSlice when that feature is ready.
- **Encounter tab is not a top-level tab**: Encounter view is transient/working state, not a primary destination. Keeping it FAB-accessed from Monster Manual matches the existing UX and avoids over-promoting a view the GM doesn't need until combat starts.

### Challenges

- `@tailwindcss/typography` was not installed — `prose` classes did nothing, markdown rendered as flat unstyled text. Installed the plugin and registered it via `@plugin "@tailwindcss/typography"` in `index.css` (Tailwind v4 CSS-first config).
- 5 NPC files had YAML-invalid em dashes in the `fruit` field (`null — Flesh: X`). These were latent bugs the new glob loader surfaced. All quoted.

### Opportunities Identified

- **One-click encounter launch from scenes**: Data is in place. Need a button in `SceneSection` that calls `addEnemy` for each `PlannedEnemy` in the scene's `encounters` array and switches view to `'encounter'`.
- **Encounter slugs need normalization**: `PlannedEnemy.slug` references enemy file names (e.g., `corrupted-guard`) but `enemies.ts` loads by display name. Need a slug field on `Enemy` or a lookup map before launch can work.
- **Boss Dorogh is not in the NPC or enemy reference**: `boss-dorogh.md` lives in `world/locations/rjocht/` but is neither a `npc-*.md` nor in `world/enemies/`. It won't appear in either view. Decide: add to locations as a `boss-*.md` glob, or move to `world/enemies/`.
- **NPC overlay is read-only**: Could add a "status" toggle (active → imprisoned → dead) that persists in session state. Useful during play.
- **Location status is static**: The `status` field on locations (e.g., `occupied-by-Dorogh`) could change mid-campaign. No update mechanism yet.

---

## 2026-06-14 — GM Tool SPA: Monster Manual & Encounter Tracker

**Summary:** Built the React + TypeScript + Vite SPA from scratch. Delivered a monster manual with location grouping, collapsible sections, and filter with text highlighting, feeding into a live encounter tracker with HP tracking, armor toggling, editable labels, notes, and duplicate/remove controls. Added Zustand for state management following the SpaceLab slice pattern.

### Key Changes

- Scaffolded Vite + React + TypeScript project at repo root (package.json, vite.config.ts, tsconfig files, index.html, .gitignore)
- Added Vite build-time transform plugin (`mdFrontmatter` in vite.config.ts): parses `*.md` frontmatter in Node.js via gray-matter (devDep), outputs each file as a typed JS module — solves the browser `Buffer` issue permanently and aligns with "world data parsed at build time"
- Created `src/types/enemy.ts` — `Enemy` and `EncounterEnemy` interfaces
- Created `src/data/enemies.ts` — 4-line loader using `import.meta.glob`
- Created `src/components/EnemyCard.tsx` — stat badges (DEF/ATK/HP/ARMOR/RESISTS) with color-coded contrast; `filter` prop drives text highlighting
- Created `src/components/MonsterManual.tsx` — enemies grouped by `location` field, collapsible sections (General Use open by default), filter input, highlight propagated to cards
- Created `src/components/EncounterEntry.tsx` — interactive HP dots, armor toggle, inline editable label, notes field, duplicate/remove; `useEffect` replaced with ref callback
- Created `src/components/EncounterView.tsx` — renders encounter list, "+ Add Enemy" opens MonsterManual as overlay
- Created `src/store/encounterSlice.ts` — Zustand slice: encounter list, addEnemy, updateEntry, duplicateEntry, removeEntry; `useEncounter()` custom hook with `useShallow`
- Created `src/store/appSlice.ts` — Zustand slice: view ('manual' | 'encounter'), filter string; both persist across view switches
- Simplified `src/App.tsx` to 7 lines — reads view from store, renders component
- Created `world/enemies/boss-dorogh-stage1.md` and `boss-dorogh-stage2.md` — stat blocks for Phase 1 (DEF 24, resists all but Insight) and Phase 2 (DEF 20, resists Agility only); location: Rjocht

### Key Decisions

- **Vite transform plugin over browser parsing**: gray-matter works in Node.js; the earlier approach of importing `.md` as raw strings and parsing in the browser hit Node's `Buffer` API. Build-time transform is the correct pattern — each `.md` file becomes a typed module.
- **Multi-location support**: `location` field accepts `string | string[]`. An enemy can appear in multiple location groups. Absence of the field = General Use.
- **Zustand slice-per-domain pattern**: Matches SpaceLab conventions exactly — separate `State` and `Actions` interfaces, `create<State & Actions>()`, exported selector functions, `useShallow` for array selectors, no prop drilling.
- **useEffect is last resort**: One `useEffect` violation in the initial build (focus management on label input) was replaced with a ref callback (`ref={(el) => el?.focus()}`). This is now the documented standard for this project.
- **Filter persists in store**: Filter string lives in `appSlice`, not MonsterManual local state — survives view switches.
- **Collapsible sections open state is local**: The open/closed state of location groups is local to MonsterManual (not the store) because it's purely presentational and does not need to persist.
- **Filter forces sections open**: When a search query is active, all matching groups display regardless of collapsed state.

### Challenges

- `gray-matter` uses `Buffer` (via js-yaml) which doesn't exist in the browser — hit this at first run. Resolved by moving parsing to the Vite plugin rather than polyfilling.
- Vite 6 deprecated `as: 'raw'` in glob options in favor of `query: '?raw', import: 'default'` — caught during build, fixed before shipping.

### Opportunities Identified

- **Constance is not in the enemy list** — she's referenced in `boss-dorogh.md` but has no stat block. If the party can fight alongside or against her, she needs an enemy file.
- **NPC reference viewer** is the next logical SPA feature — same Vite plugin pattern, glob `world/locations/**/*.md` and `world/npcs/*.md`
- **Session/location context**: Could add a "current location" selector that filters the manual to only show enemies relevant to that location
- **Encounter persistence**: Currently in-memory only (intentional). If sessions run long, consider `localStorage` via Zustand persist middleware
- **Dev log entry**: Commit message emoji convention from SpaceLab should be adopted here too (check last 5 commits before committing)

---

## 2026-06-14 — Foundation Extraction & Operating Manual

**Summary:** First major working session. Extracted all canonical game data from PDFs into editable markdown source files, established the directory structure, and created the CLAUDE.md operating manual.

### Key Changes

- Created `mechanics.md` — full rules extracted from GM Master Reference PDF (core mechanic, combat flow, damage, healing, armor restoration, loot, difficulty thresholds, GM tips)
- Created `world/enemies/` — 4 generic enemy files: `enemy-l1-goblin-scout.md`, `enemy-l1-shadow-minion.md`, `enemy-l2-shadow-wolf.md`, `enemy-l2-corrupted-guard.md`
- Created `world/items/` — 4 item files: `consumables.md`, `weapons.md`, `legendaries.md`, `story-items.md`
- Created `world/locations/` — 3 location directories with index files (Hidden Grove, Crossroads Inn, Rjocht)
- Created 13 NPC files across locations: Jasper, Jorik, Merra, Finn, Brother Aldric, Rothgar, Seraphine, Margrave, Constance, Tam, Beren, Minors; plus Elder Greymane in `world/npcs/`
- Created `world/locations/rjocht/boss-dorogh.md` — full two-phase boss with complete scene 6-7 dialogue, milestone lines, eucatastrophe narration
- Created `CLAUDE.md` — co-GM operating manual with session prep/debrief workflows, design principles, party state, future goals
- Updated `sessions/2026-01-24/debrief.md` — added Party State section (all 4 players, items, current location)

### Key Decisions

- **Markdown is now canon; PDFs are input only.** When state conflicts between PDF draft and session debrief, the debrief wins. (Example: blacksmith is Jorik, not "Kael" as named in the scene 2 PDF.)
- **File naming conventions established:** `npc-[name].md`, `enemy-l[tier]-[name].md`, `boss-[name].md`. Generic enemies in `world/enemies/`; location-anchored bosses in their location folder; transcendent NPCs in `world/npcs/`.
- **Mercy/judgment design principle refined:** Shadow entities (Shadow Minions, Shadow Wolves) have no soul — no mercy path. Corrupted humans (Dorogh, future generals) can have redemptive endings but combat must come first. The Blade's killing blow can itself be the mercy — breaking Drachan's hold and letting them die as themselves. At 0 HP, players are not told they must strike; they discover whether the enemy accepts or rejects what they offer.
- **Armor rule clarified:** Armor flips face-down when hit, restores at end of battle. It is NOT permanently destroyed — only CONSUMABLE-marked cards are permanently removed.
- **"One combat max" is not a design principle** — it was an observation from session 1. The actual principle: at least one encounter per session should offer a non-combat resolution path.

### Challenges

- HEIC images of player loadouts couldn't be processed. Resolved by GM providing loadout data verbally.
- Scene 5 (`scene_5_imprisoned_knight.pdf`) was initially missed in the PDF inventory — discovered when auditing the printables directory. Read before writing Constance's file.

### Opportunities Identified

- **Merchant's ID** is undocumented — not in the standard item catalog. Acquisition circumstances from session 1 (likely the Margrave/Blade Gambit encounter) should be confirmed and its story-item entry updated.
- **Character names missing:** Toni's and Lilly's characters have no names yet. Should be resolved before or during session 2.
- **Captain Rothgar redemption arc** is established in his NPC file but not yet seeded into session prep. Could be a slow-burn thread across sessions 2-3.
- **Seraphine knows things:** Her file notes she has intel on Constance's location, guard patterns, and Dorogh's sleep. These could be used as paid intel hooks if the party visits her.
- **Weasel Band callback:** The session 1 weasel rescue was organic and thematic. No weasel NPC exists yet — could be a thread worth formalizing if the party seeks allies.
- **Digital GM tool:** Planned Vercel SPA (React + TypeScript + Vite) to serve as a combat tracker, NPC/location reference, and printables viewer. World data is now structured in frontmatter, ready for build-time parsing when development begins.
- **Minor NPCs (npc-minors.md):** Greta, Thomas, Pike, Sister Mabel, Pip & Wren are named but have minimal detail. Flesh out as the party explores Rjocht.
