# Dev Session Log
## Rjocht Campaign — Family TTRPG Project

Sessions are logged in reverse-chronological order (newest first).

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
