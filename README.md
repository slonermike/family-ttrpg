# Dawn of the Third Age — Family TTRPG

A custom tabletop RPG system and GM tool built for a family campaign with kids ages 9–13. Heroic fantasy, slightly silly, deeply earnest.

## What's here

Two things live in this repo:

**1. The world** — all campaign content as plain markdown in `world/`. Regions, locations, scenes, NPCs, enemies, and items. These files are the source of truth for everything that happens at the table.

**2. The GM tool** — a React SPA (`src/`) that renders the world content into a fast, browsable reference for running sessions. No backend; all content is bundled at build time.

## System

Core mechanic: **d20 + 2d6 (pick higher)**, or 2d6 stacked. Nat 20 = cinematic auto-success. Nat 1 = spectacular failure. Damage = flipping an ability card face-down. All cards restore at end of battle.

Full rules: [mechanics.md](mechanics.md) | Tone and Deep Magic: [framework.md](framework.md)

## GM Tool

```
npm install
npm run dev
```

Built with Vite + React 18 + TypeScript + Tailwind CSS v4. Deployed on Vercel; auto-deploys on push to `main`.

**Routes:**
- `/world` — regions and locations
- `/items` — item compendium with print queue
- `/monsters` — enemy manual
- `/encounter` — live combat tracker

## Content structure

```
world/
  regions/     ← geographic containers
  locations/   ← named places with scenes
  npcs/        ← NPCs that appear across locations
  enemies/     ← reusable enemies
  items/       ← weapons, consumables, legendaries, story items
sessions/
  YYYY-MM-DD/
    prep.md    ← generated before session
    debrief.md ← written after; Party State section is authoritative
```

See [CLAUDE.md](CLAUDE.md) for the full operating manual and [world/CLAUDE.md](world/CLAUDE.md) for content authoring conventions.
