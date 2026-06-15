# CLAUDE.md — Co-GM Operating Manual
## Rjocht Campaign: Dawn of the Third Age

This file tells Claude everything needed to assist with session prep, debriefs, and world maintenance — without being re-briefed each session.

---

## Project Overview

A custom lightweight family TTRPG designed for kids ages 9-13 (primary: 9-13 fantasy fans; secondary: younger siblings who participate loosely). Sessions run ~2 hours. The tone is heroic fantasy — slightly silly, deeply earnest.

Core mechanic: **d20 + 2d6 (pick higher)**, or 2d6 stacked if specified. Nat 20 = cinematic auto-success. Nat 1 = spectacular failure.

Players carry ability cards (MIGHT, AGILITY, INSIGHT, WIT, HEART, CREATION) plus a Bearer of the Blade (7th role). Damage = flipping an ability card face-down. Both cards down = incapacitated (items only). All cards and armor restore at end of battle. Only cards explicitly marked CONSUMABLE are permanently removed.

Full rules: [mechanics.md](mechanics.md)
Tone, inspiration, thematic framework: [framework.md](framework.md)
Ability use cases: [ability-reference.md](ability-reference.md)

---

## Directory Structure

```
family-ttrpg/
├── CLAUDE.md                       ← this file
├── framework.md                    ← design philosophy, Fruits of Spirit, Drachan, Deep Magic
├── ability-reference.md            ← six abilities with use cases across all contexts
├── mechanics.md                    ← full rules: core mechanic, combat, damage, healing, loot
├── world/
│   ├── npcs/                       ← transcendent NPCs only (appear across locales)
│   │   └── npc-elder-greymane.md
│   ├── enemies/                    ← generic/reusable enemies; unique enemies go with location
│   │   ├── enemy-l1-goblin-scout.md
│   │   ├── enemy-l1-shadow-minion.md
│   │   ├── enemy-l2-shadow-wolf.md
│   │   └── enemy-l2-corrupted-guard.md
│   ├── items/
│   │   ├── consumables.md          ← standard items; CONSUMABLE flag on permanently-removed ones
│   │   ├── weapons.md              ← weapons (+d6 to rolls) and armor
│   │   ├── legendaries.md          ← persistent and consumable legendaries
│   │   └── story-items.md          ← Blade of Righteous Judgment, Strange Bun, Merchant's ID
│   └── locations/
│       ├── hidden-grove/
│       │   └── index.md            ← opening ceremony location, Elder Greymane, Spirit of Life
│       ├── crossroads-inn/
│       │   ├── index.md
│       │   └── npc-jasper.md       ← merchant, Joy returning, East Market Gate intel
│       └── rjocht/
│           ├── index.md            ← city overview, districts, entry points, post-liberation state
│           ├── npc-jorik.md        ← blacksmith, eastern district, Faithfulness/Goodness, voice: Hagrid
│           ├── npc-merra.md        ← herb seller, Kindness/Gentleness, voice: Mrs. Potts
│           ├── npc-finn.md         ← street urchin, Joy/Loyalty, voice: Aladdin
│           ├── npc-brother-aldric.md ← Peace/Patience, voice: Gandalf
│           ├── npc-captain-rothgar.md ← conflicted guard, redemption arc, voice: Javert
│           ├── npc-seraphine.md    ← fortune teller, genuine Insight but Selfish Ambition, voice: Esmeralda/Trelawney
│           ├── npc-margrave.md     ← merchant, Pride/Boastfulness, voice: Gaston
│           ├── npc-constance.md    ← imprisoned knight, Faithfulness, key Dorogh intel
│           ├── npc-tam.md          ← young gate guard, East Market Gate
│           ├── npc-beren.md        ← older gate guard, East Market Gate
│           ├── npc-minors.md       ← Greta, Thomas, Pike, Sister Mabel, Pip & Wren
│           └── boss-dorogh.md      ← two-phase boss; full dialogue; corrupted human, not demon
├── printables/                     ← all PDFs; input for bootstrap only; markdown is now canon
└── sessions/
    └── YYYY-MM-DD/
        ├── prep.md                 ← generated before session
        └── debrief.md              ← written after session; Party State section is authoritative
```

**File naming:**
- `npc-[name].md` — NPC files
- `enemy-l[tier]-[name].md` — generic enemies (l1 = weakest)
- `boss-[name].md` — bosses and mini-bosses (location-anchored)

---

## Session Prep Workflow

When asked to **prepare session N**:

1. Read the most recent `sessions/*/debrief.md` — especially the **Party State** section (current items, ability status, location)
2. Read [framework.md](framework.md) for tone, thematic principles, and story arc
3. Check relevant `world/locations/` files for NPC roster, enemy availability, and location state
4. Check `world/items/story-items.md` for anything party-held that may be relevant
5. Generate `sessions/YYYY-MM-DD/prep.md` with these sections:

### prep.md Structure

```markdown
# Session [N] Prep — [Date]

## Opening Hook
[In medias res opening — 2-3 GM-spoken sentences maximum. Drop them into action or tension.
No lore dumps. No "last time..." recaps beyond one sentence.]

## Scene Sketches (2-3 scenes)
[Not rails — prepare NPCs/situations, not outcomes. Each sketch: location, who is present,
what is in motion, what the players might want or need. Leave exits open in all directions.]

### Scene 1: [Name]
**Location:** 
**Active NPCs:** [name — fruit — voice — status]
**What's in motion:**
**Non-combat resolution available:** [yes/no — what it looks like]
**Combat option:** [enemy file reference if applicable]

## NPC Roster This Session
| Name | Voice | Fruit | Status | Notes |
|------|-------|-------|--------|-------|

## Encounter
[One combat encounter with enemy file reference. Include stat block from enemy file.
At least one encounter this session should offer a non-combat path.]

## Moral Choice Seed
[A situation where players face a genuine choice — not a trap, not a test with a right answer.
Something where kindness, patience, or mercy is *available* but not required.]

## Eucatastrophe Seed
[One image or moment held in reserve — a turn of grace if things go dark or players need a lift.
Do not force it. Have it ready.]

## Deep Magic Prompts
[2-3 narration beats where the world responds to goodness. Keep it physical: warmth, light,
animals calming, fog thinning, flowers opening. Never name or explain the magic.]
```

---

## Session Debrief Workflow

When asked to **write a debrief** (without a transcript):
1. Ask the GM to describe key moments in whatever form is easiest — typed notes, voice-to-text paste, bullet points
2. Write `sessions/YYYY-MM-DD/debrief.md` using the template below
3. Update any `world/` files whose state changed (NPC status, items gained/lost, location visited)

### debrief.md Structure

```markdown
# Session [N] Debrief — [Date]
## [Campaign Title]

---

## What Happened
[Chronological — major beats, key decisions, dice moments]

## Standout Moments
[Player-invented beats, Nat 20s, surprising solutions, memorable character moments]

## What Worked / What to Improve
[Short, honest, forward-looking. Not a post-mortem — just tuning.]

## World State Changes
[NPCs met, items acquired or spent, locations visited, lore revealed]

## Party State
[THIS SECTION IS AUTHORITATIVE. Update after every session.]

| Player | Character | Abilities | Items |
|--------|-----------|-----------|-------|
| [name] | [char]    | [ability 1 + ability 2] | [item list] |

Notes: [HP damage carried over, active conditions, anything unusual]
**Current location:** [where the party is at end of session]

## Next Session Seeds
[3 threads worth pulling — not planned scenes, just live tensions or questions]

1. 
2. 
3. 
```

### Post-Game Questions (from scene 8 — use during live debrief with players)
- "What was your favorite moment?"
- "What did you learn about your character?"
- "Would you want to play again?"
- Acknowledge specific awesome moments by name
- Praise creative solutions and teamwork

---

## Transcript Debrief Workflow (Future)

When given a `transcript.md` from a session recording:
1. Scan for: player decisions, NPC dialogue, dice outcomes, lore reveals, moral moments
2. Extract key moments chronologically
3. Map to debrief template above automatically
4. Flag:
   - Nat 20 / Nat 1 moments
   - Moral choices and what the players chose
   - Deep Magic moments (world responding to goodness)
   - Unexpected player solutions
   - Items gained or spent
5. Generate debrief draft + updated Party State

---

## Design Principles

Apply these to all generated content — prep, narration, NPCs, encounters:

### Story & Structure
- **In medias res openings preferred** — no lore dumps. Drip-feed world info through NPCs and discovery.
- **Prepare situations, not outcomes** — NPCs and locations have agendas; players determine what happens.
- **At least one encounter per session should offer a non-combat resolution path.** This party gravitates toward creative solutions; those paths must exist.
- **Consequences from player choices, not GM punishment.** If they attract attention, attention comes. Keep it logical, not arbitrary.
- **Nat 20 = cinematic success moment.** Narrate it as a hero moment regardless of difficulty. Nat 1 = spectacular failure, also narrated fully.

### Enemies and Mercy

**Shadow/demonic entities** (Shadow Minions, Shadow Wolves, constructs of living darkness): These have no soul to redeem. They are extensions of Drachan's will. No mercy path available — they cannot be reasoned with or restored.

**Corrupted humans** (Dorogh, future generals and mini-bosses): These were people once. They may have room for a merciful ending — but it requires combat to get there. You cannot talk them down before the fight.

Rules for corrupted human encounters:
- Combat must bring them to the point of vulnerability first
- At 0 HP, do **not** tell players they must deliver the killing blow — create space for them to ask "is there another way?"
- Some corrupted humans will reject redemption and prefer death (Dorogh: *"Do it. Please."*)
- Some may accept it — this should be a real possibility for future encounters
- The Blade's killing blow **can itself be the merciful act**: it breaks Drachan's hold and releases the person inside. Dorogh dies remembering the gardens. That is mercy given, not withheld.
- Constance's words are the model: *"Remember he wasn't always a monster. Show him mercy at the end if you can. Let him remember what he was."*

### Tone
- **Heroic, slightly silly, earnest** — ages 9-13. Humor lives inside the heroic frame; it doesn't undercut it.
- **Virtues are organic, never stated.** The world responds to goodness (warmth, light, nature reacting). NPCs demonstrate their fruit through behavior — never say "this NPC embodies Kindness." Show Kindness.
- **Deep Magic stays subtext.** Woven into narration. Never explained. Kids experience it as physical sensation and world-response.
- **The Blade-Bearer has a burden.** Give MuhDude spotlight moments. The party exists partly to protect and support the Bearer. This dynamic should surface naturally.
- **Eucatastrophe: build toward it.** When things go darkest, grace breaks through unexpectedly. Hold one in reserve each session.

### NPC Design
- Every NPC embodies a Fruit of the Spirit or Flesh — one or two, expressed through behavior.
- Voice casting: reference the named voices in NPC files. Hold to them; kids recognize consistency.
- NPCs have their own agendas — they are not quest dispensers. They want things, fear things, have histories.

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

**Notable:**
- Ruby (Krystle) holds the Bow of Desperate Flame — a high-risk/high-reward legendary. Her call on when to use it is a significant moment waiting to happen.
- Merchant's ID origin is unconfirmed — likely from the Margrave/Blade Gambit encounter. May be used as a pass through checkpoints.
- Strange Bun ended up with Toni rather than MuhDude — either traded or starting loadout was adapted in play.

---

## World Data Canon

**Source hierarchy:**
1. `sessions/*/debrief.md` Party State section — authoritative on current state
2. `world/` markdown files — canonical world data; single source of truth
3. PDFs in `printables/` — bootstrap input only; no longer authoritative; do not edit them

When world state changes (NPC freed, item used, location visited, lore revealed), update the relevant `world/` file. The PDF source does not change.

---

## Future Goals

### Print Pipeline
Print view built into the SPA — printable card sheets (ability cards, item/weapon cards, GM reference) accessible via browser print dialog. Markdown frontmatter → generated print-ready cards.

### Digital GM Tool
React + TypeScript + Vite SPA deployed on Vercel (auto-deploy on push to main). No backend — world data loaded as static assets at build time. Combat state is transient (in-memory). Mobile-first; uses larger screen real estate where it doesn't significantly complicate the app.

Features:
- Combat encounter generator + live HP/status tracker per enemy
- NPC + location reference viewer (locale → NPCs, searchable)
- Encounter designer (pick enemy mix, see stats, track in real time)
- Printables viewer (ability cards, item/weapon cards, GM reference)
- World data sourced from markdown frontmatter, parsed at build time into TypeScript types

### Audio Pipeline
Record session → `transcript.md` → automated debrief (see Transcript Debrief Workflow above).

### Location Mapping
Simple ASCII or SVG diagrams for key locations (Rjocht districts, fortress keep layout).
