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

- `world/npcs/npc-[name].md` — ALL NPC files live here; slug = filename minus `npc-` prefix and `.md`
- `world/enemies/enemy-l[tier]-[name].md` — generic/reusable enemies (l1 = weakest, l2 = mid)
- `world/enemies/boss-[name].md` — bosses (slug strips `boss-` prefix)
- `world/regions/[slug]/index.md` — region files
- `world/locations/[slug]/index.md` — location files

Enemy slugs are derived from filename: `enemy-l2-corrupted-guard.md` → `l2-corrupted-guard`; `boss-dorogh-stage1.md` → `dorogh-stage1`.

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
    items: string[]      # item slugs (renders item pill buttons in the SPA)
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
    items: string[]      # item slugs (renders item pill buttons in the SPA)
    encounters:
      - name: string
        enemies:
          - slug: string
            count: number
```

### NPC (`world/npcs/npc-[name].md`)

NPCs are first-class world entities — not nested under locations. To move an NPC (e.g. Jorik relocates to Amber Hollow), update the `location` field in their file. The slug stays the same; all scene `npcs: [slug]` references keep working.

```yaml
name: string
tagline: string          # one sentence; how to use this NPC right now
role: string
location: string         # current location slug (e.g. rjocht, amber-hollow); update when NPC moves
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

### Item (`world/items/item-[name].md`)

Items are first-class entities. Slug = filename minus `item-` prefix and `.md`. Item holder state is tracked in `sessions/*/debrief.md`, not here.

```yaml
name: string
type: consumable | weapon | armor | legendary | story
category?: string        # consumables only: healing | combat | social | utility | nature | luck
tagline: string          # one-line flavor description
effect: string           # mechanical effect (shown prominently on item card)
consumable: boolean      # true = permanently removed after use
```

Body text = lore, GM notes. Becomes `description` field.

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

---

## Inline Slug References

Use inline directives to reference NPCs or enemies anywhere in markdown. The SPA renders them as clickable pills that open an overlay.

**NPC pill** — opens the NPC overlay:
```
Talk to :npc[jorik] before heading to the keep.
```

**Enemy pill** — opens the enemy overlay (with "Add to Encounter" button):
```
Two :enemy[l2-corrupted-guard] flank the entrance.
```

**Item pill** — links to the item detail page:
```
The party finds a :item[healing-potion] behind the barrel.
```

**Map pill** — links to a map page:
```
See :map[the-reaches] for the full overworld layout.
```

Slugs match the filenames: `npc-jorik.md` → `jorik`; `enemy-l2-corrupted-guard.md` → `l2-corrupted-guard`; `boss-dorogh-stage1.md` → `dorogh-stage1`; `item-healing-potion.md` → `healing-potion`; `world/maps/the-reaches.md` → `the-reaches`.

These work in any markdown field: `description`, `gm_notes`, NPC body text, region/location body text.

---

## Map Files (`world/maps/SLUG.md`)

Maps live in `world/maps/`. Slug = filename minus `.md`. Referenceable as `:map[slug]` in any markdown.

```yaml
name: string
width: number          # grid cells wide
height: number         # grid cells tall
cellSize: number       # optional; pixels per cell (default 48)
layers:
  - id: string         # unique within the map
    name: string       # shown in layer toggle panel
    visible: boolean   # optional; default true
    entities:
      - label: string
        cells: [[x, y], ...]   # global grid coords; 0,0 = top-left
        icon: string           # optional emoji overlaid at centroid
        color: string          # optional hex (e.g. "#f59e0b"); tints the blob shape
        link: string           # optional "type:slug" (location/npc/region/item/map)
        content: string        # optional markdown shown in click overlay
```

Body text = map overview description (shown on the map list card).

Entity `content` supports all markdown conventions: `[!NARRATION]`, `[!DIALOG]`, `:npc[]`, `:enemy[]`, `:item[]`, `:map[]`, `:::details[...]`.
