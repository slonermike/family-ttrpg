# World Data Conventions

Loaded when working on files in `world/`.

---

## Source Hierarchy

1. `sessions/*/debrief.md` Party State — authoritative on current state
2. `world/` markdown files — canonical world data; single source of truth
3. PDFs in `printables/` — bootstrap input only; no longer authoritative; do not edit them

When world state changes (NPC freed, item used, location visited, lore revealed), update the relevant `world/` file.

---

## File Naming

- `npc-[name].md` — NPC files (location-specific or in `world/npcs/` for transcendent)
- `enemy-l[tier]-[name].md` — generic/reusable enemies (l1 = weakest, l2 = mid, boss = boss)
- `boss-[name].md` — bosses and mini-bosses (location-anchored)
- `world/regions/[slug]/index.md` — region files
- `world/locations/[slug]/index.md` — location files

---

## Frontmatter Schemas

### Region (`world/regions/*/index.md`)

```yaml
name: string
tagline: string          # one sentence; how to present this region to a new GM
scenes:                  # reusable regional scene library
  - name: string
    type: explorable | event | combat | approach
    tagline: string
    description: string  # player-facing narration; use > blockquote for spoken text
    gm_notes: string
    npcs: string[]       # NPC slugs
    encounters:
      - name: string
        enemies:
          - slug: string
            count: number
```

Body text = region overview (becomes `description` field in TypeScript).

### Location (`world/locations/*/index.md`)

```yaml
name: string
type: string             # e.g. fortress-city, tavern, sacred-ground
status: string           # e.g. occupied-by-Dorogh, visited, inaccessible-after-ceremony
visited_session: number  # optional; session number first visited
region: string           # slug of parent region (e.g. the-reaches)
tagline: string          # one sentence GM hook
npcs_present: string[]   # display names of NPCs in this location
connected_to: string[]   # connected location names
scenes:
  - name: string
    type: explorable | event | combat | approach
    tagline: string
    description: string  # player-facing narration; use > blockquote for spoken text
    gm_notes: string
    npcs: string[]       # NPC slugs (used to render NPC buttons in the SPA)
    encounters:
      - name: string
        enemies:
          - slug: string
            count: number
```

### NPC (`npc-[name].md`)

```yaml
name: string
tagline: string          # one sentence; how to use this NPC right now
role: string
location: string         # e.g. rjocht/eastern-district
status: active | imprisoned | dead | missing
fruit: string            # Fruit of the Spirit or Flesh (e.g. Faithfulness / Goodness)
voice: string            # voice casting direction (e.g. "Hagrid — warm, gentle giant")
first_appeared: string   # optional; e.g. session_1, scene_5
relationships:           # optional
  - [target]: [description]
```

Body text = character description, GM notes, scene appearances, callbacks. This becomes the `description` field rendered in the NPC overlay.

### Enemy (`world/enemies/enemy-l[tier]-[name].md`)

```yaml
name: string
tier: l1 | l2 | boss
location: string         # optional; where typically found
hp: number
armor: boolean
defense_threshold: number
attack_threshold: number
resistances: string[]    # ability names, e.g. ["Heart", "Might"]
reinforcements: boolean
loot_drop: string        # "none" | "Roll X+ to draw Y Item" | "Automatic — ..."
unique_items: string[]
```

Body text = combat behavior, special notes. Becomes `description` field.

---

## Blockquote Convention

All GM-spoken content uses typed blockquotes. The type is explicit — `[!NARRATION]` or `[!DIALOG]` — so the renderer never has to guess.

**Narration** — rendered with sky border and "Narration" label:
```
> [!NARRATION]
> The streets get quieter. The hammer rings ahead — metal on metal, steady and unhurried.
```

**Dialog** — rendered with amber border, speaker name (`**Name:**`) highlighted:
```
> [!DIALOG]
> **Jorik:** "Still working." He sets the hammer down. "What do you need?"
```

Separate beats onto individual blocks so the GM can see exactly when to speak vs. act:
```
> [!DIALOG]
> **Jorik:** "Still working."

> [!NARRATION]
> He sets the hammer down, slow. Takes you in without rushing it.

> [!DIALOG]
> **Jorik:** "Sit down. Forge'll keep you warm." A pause. "What do you need?"
```

For NPC files, intro dialog goes at the **top of the body text**, before character description — it renders immediately after the Voice field in the NPC overlay.

GM notes go in `gm_notes` — never in `description`. Blockquotes in `gm_notes` are not shown in the player-facing overlay.

---

## Collapsible Sections

Use `:::details[Title]` / `:::` for any GM reference material that shouldn't clutter the primary view — backstory, lore, political context, relationship history. Collapsed by default.

```
:::details[GM Background]
He arrived in Rjocht three years before the fog came down.

> [!NARRATION]
> The forge was already his by then.
:::
```

Narration and dialog blocks inside a `:::details` section work normally. The section can hold any number of paragraphs, blockquotes, or nested sections.
