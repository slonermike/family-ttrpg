# Dev Session Log
## Rjocht Campaign — Family TTRPG Project

Sessions are logged in reverse-chronological order (newest first).

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
