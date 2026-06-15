# Session Workflows

---

## Prep Workflow

When asked to **prepare session N**:

1. Read the most recent `sessions/*/debrief.md` — especially the **Party State** section
2. Read [framework.md](../framework.md) for tone, thematic principles, and story arc
3. Check relevant `world/locations/` files for NPC roster, enemy availability, and location state
4. Check `world/items/story-items.md` for anything party-held that may be relevant
5. Generate `sessions/YYYY-MM-DD/prep.md` using the template below

### prep.md Template

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

## Debrief Workflow

When asked to **write a debrief** (without a transcript):

1. Ask the GM to describe key moments in whatever form is easiest — typed notes, voice-to-text paste, bullet points
2. Write `sessions/YYYY-MM-DD/debrief.md` using the template below
3. Update any `world/` files whose state changed (NPC status, items gained/lost, location visited)
4. Update the Party State table in `CLAUDE.md`

### debrief.md Template

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

### Post-Game Questions (run live with players after session)

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
