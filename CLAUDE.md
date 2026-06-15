# CLAUDE.md — Co-GM Operating Manual
## Rjocht Campaign: Dawn of the Third Age

This file tells Claude everything needed to assist with session prep, debriefs, and world maintenance — without being re-briefed each session. Detailed references live in subdirectory CLAUDE.md files and `docs/`.

---

## Project Overview

A custom lightweight family TTRPG for kids ages 9-13. Sessions run ~2 hours. Tone: heroic fantasy — slightly silly, deeply earnest.

Core mechanic: **d20 + 2d6 (pick higher)**, or 2d6 stacked. Nat 20 = cinematic auto-success. Nat 1 = spectacular failure. Damage = flipping an ability card face-down. All cards restore at end of battle.

- Full rules: [mechanics.md](mechanics.md)
- Tone, Fruits of Spirit, Deep Magic: [framework.md](framework.md)
- Ability use cases: [ability-reference.md](ability-reference.md)
- Design principles (story, tone, NPC/enemy rules): [docs/design-principles.md](docs/design-principles.md)
- Session prep and debrief templates: [docs/session-workflows.md](docs/session-workflows.md)

---

## Directory Structure

```
family-ttrpg/
├── CLAUDE.md                  ← this file (slim operating manual)
├── framework.md               ← tone, Fruits of Spirit, Drachan, Deep Magic
├── mechanics.md               ← full rules
├── ability-reference.md       ← six abilities with use cases
├── docs/
│   ├── design-principles.md  ← story rules, tone, NPC/enemy design
│   ├── session-workflows.md  ← prep and debrief templates
│   └── roadmap.md            ← future goals
├── world/
│   ├── CLAUDE.md             ← world data conventions, frontmatter schemas
│   ├── regions/              ← geographic containers (region → locations → scenes)
│   ├── locations/            ← named places within a region; each has scenes[]
│   ├── enemies/              ← generic/reusable enemies
│   ├── npcs/                 ← transcendent NPCs (appear across locales)
│   └── items/                ← consumables, weapons, legendaries, story items
├── src/
│   └── CLAUDE.md             ← SPA architecture, data model, GM-first UX standard
├── printables/               ← PDFs; bootstrap input only; markdown is canon
└── sessions/
    └── YYYY-MM-DD/
        ├── prep.md           ← generated before session
        └── debrief.md        ← written after; Party State section is authoritative
```

---

## Session Workflows

Full templates: [docs/session-workflows.md](docs/session-workflows.md)

**Prep session N:**
1. Read most recent `sessions/*/debrief.md` Party State
2. Read [framework.md](framework.md) for tone and arc
3. Check relevant `world/locations/` and `world/items/story-items.md`
4. Generate `sessions/YYYY-MM-DD/prep.md`

**Write debrief:**
1. Ask GM to describe what happened (any format)
2. Generate `sessions/YYYY-MM-DD/debrief.md`
3. Update any `world/` files whose state changed
4. Update Party State table below

---

## World Data Canon

**Source hierarchy:**
1. `sessions/*/debrief.md` Party State — authoritative on current state
2. `world/` markdown files — canonical world data
3. `printables/` PDFs — bootstrap input only; do not edit

See [world/CLAUDE.md](world/CLAUDE.md) for frontmatter schemas and file naming.

---

## Party (Current as of Session 1 End)

| Player | Character | Abilities | Items |
|--------|-----------|-----------|-------|
| Joey | MuhDude | Bearer of the Blade | Blade of Righteous Judgment, Merchant's ID |
| Krystle | Ruby | Agility + Insight | Smoke Bomb, Throwing Knife, Axe, Ward Stone, **Bow of Desperate Flame** (legendary), Arrow of Splitting |
| Toni | [name TBD] | Insight + Heart | Greater Healing Potion, Strange Bun, Armor, Torch |
| Lilly | [name TBD] | Creation + Wit | Elixir of Swiftness, Healer's Kit, Daggers |

**Current location:** Inside the gates of Rjocht. Have not yet reached Jorik.
**Session 1 ended:** Party is in the city, unexplored. Dorogh is still in power.

*Update this table from the most recent debrief after each session.*
