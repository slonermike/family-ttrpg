---
name: Cavern of Blackest Shadows
type: cavern
status: unvisited
region: the-reaches
tagline: Pitch dark, cold, and something large is moving in it that cannot see — but can hear everything.
npcs_present: [Goob]
connected_to: [Darkened Ridge, Swamp of Putrid Stank]
scenes:
  - name: The Entrance
    type: explorable
    tagline: Whatever light you have, it ends here.
    description: |-
      The cave mouth is low and wide — you have to duck. Beyond it, the dark is absolute. Not dim. Not shadowy. The kind of dark where you hold your hand in front of your face and see nothing.

      > [!NARRATION]
      > The cold sharpens the moment you step inside. The stone floor is smooth and dry. Your footsteps come back to you from every direction.

      Something shifts, deep in the cave. Far away. You feel it through the floor more than hear it.
    gm_notes: |-
      **Light matters here.** Toni's character carries a :item[torch]. In the entrance chamber, the torch is enough — the party can see each other, the walls, the floor ahead. Beyond the first chamber, the cave opens up and the torch barely reaches.

      **Sound:** The cavern reflects everything. Speak loudly and it comes back from three directions. Whisper is safer. Blind Anger navigates entirely by sound — the party's noise level matters in the boss scene.

      **The cold:** MuhDude's Blade will be notably colder here than it was on the ridge. Don't call it out explicitly — describe the Blade if the bearer mentions it.
    npcs: []
    encounters: []
  - name: The Rockslide
    type: event
    tagline: You can hear him before you see him.
    description: |-
      The cave narrows, then opens into a high chamber. The floor drops away here — a gap, maybe eight feet across, where the stone gave way. Below: nothing you can see. The ceiling is fifteen feet up.

      On a ledge across the gap, above the drop, sits a small round creature. He has enormous ears. No eyes. He's been there long enough that he's made a small, neat pile of pebbles he found on the ledge.

      He hears you. His ears shoot forward.

      > [!DIALOG]
      > **Goob:** "...Murn?"

      A pause.

      > [!DIALOG]
      > **Goob:** "You're not Murn." Another pause. "But you smell like you came from where Murn is." His ears tilt. "Did Murn send you?"
    gm_notes: |-
      Goob is a Wumble — same species as Murn, slightly different ear shape (they have a long-running friendly disagreement about whether this matters). He's been on this ledge long enough to get bored, so he sorted pebbles. He is not panicking. He's just stuck.

      **He can't get down safely** — the ledge is above the gap. He could jump, but he can't see the far edge and he's correctly calculated that he might miss.

      **Rescue options:**
      - **Agility 12+:** Climb across to the ledge, help Goob down safely
      - **Might 10+:** Throw a rope; Goob grabs it and you lower him
      - **Creation 10+:** Improvise something — a bridge, a pulley, a catch
      - **Wit 12+:** Talk Goob through a route he can navigate himself with coaching

      **Goob helps:** He has excellent spatial awareness from sound. If someone's climbing toward him, he can say exactly where the handholds are — gives +2 to any Agility roll made to reach him.

      **When he's down:**

      > [!NARRATION]
      > The moment Goob's feet touch the floor he goes very still, ears rotating slowly. Then — from behind you, from the entrance direction, somehow — Murn is there. You didn't hear him come in. He must have followed anyway. They collide in a quivering, ear-tangling, quietly humming reunion that takes a full minute to resolve itself.

      > [!DIALOG]
      > **Goob:** "I knew you'd find someone."

      > [!DIALOG]
      > **Murn:** "I told you I would."

      They both look up at the party. Goob's ears are trembling.

      > [!DIALOG]
      > **Goob:** "There's something in the back of the cave. He's very loud when he breathes. He doesn't know I'm here. He's been here a long time." A pause. "I think he's angry about it."

      They don't stay. Something shifts in the deep cave. But they'll be back.
    npcs: [goob]
    encounters: []
  - name: The Deep Passage
    type: combat
    tagline: Stand still. Do not move. Do not drop anything.
    description: |-
      The passage narrows before it opens again. In the middle of it: something long and low-slung, lying across the path. It's not asleep. Its ears are moving.

      > [!NARRATION]
      > It doesn't react to you being there. It reacts to you moving. The moment someone shifts weight — just shifts weight — the head snaps around. The ears lock on. The whole body goes tight.
    gm_notes: |-
      One :enemy[l1-cavern-hound]. Full mechanics in the enemy file.

      **The core rule:** It attacks whoever moved last. Standing completely still means it cannot target you. Give this information to the players before they commit — the tension comes from choosing *who* moves and *when*, not from being surprised by the mechanic.

      **Encourage creative solutions:**
      - One player draws its attention while others flank (Agility to move quietly while it's focused = 12+)
      - Creation to roll a stone past it — buys one free round, then it ignores thrown objects
      - Wit 12+ to time a coordinated rush so only one player is exposed
      - Heart to coordinate silently (give each other +2 to their next roll this turn)

      **It does not pursue past the passage.** If the party retreats to The Rockslide chamber, it stops at the threshold and waits. It has territory. This is it.

      **Goob, if present, is extremely helpful here.** He knows its pattern — it was here when he was on the ledge. He can whisper exactly when it pauses between sweeps: one free action for any player during round 1 before initiative.
    npcs: []
    encounters:
      - name: The Deep Passage
        enemies:
          - slug: l1-cavern-hound
            count: 1
  - name: The Inner Chamber
    type: combat
    tagline: Pitch dark, no eyes on either side — except Murn and Goob know exactly where he is.
    description: |-
      The cave opens into a vast chamber. The torch barely touches the far walls.

      In the center: a shape. Hunched. Enormous. It breathes in long, slow pulls that move through the whole chamber. Around its neck, catching no light at all — except it does. A faint gleam. Like something inside it is trying to get out.

      It hasn't moved. It knows you're here.

      > [!NARRATION]
      > The breathing changes. Slower. Then it stands.

      :enemy[boss-blind-anger]
    gm_notes: |-
      This is the Blind Anger encounter. See :enemy[boss-blind-anger] for full stats and mechanics.

      **Suppressed light:** In Blind Anger's presence, the torch only throws light five feet. This is not magic — it's him. The chamber feels enormous because you can't see the walls. Players who expect their torch to illuminate the fight will need to adjust.

      **The locket:** Blind Anger wears a locket containing :item[illuminating-truth]. With only five feet of torch-light, spotting it requires **Insight or Wit 12+** as an action. The locket itself is not suppressed — it gleams faintly beyond the torch's reach. If a player specifically looks *past* the torch's edge into the dark, the threshold drops to **8+**.

      **The locket is retrieved** when Blind Anger is defeated — it falls when he falls.

      **If Murn and Goob are present:** They came back. They stand at the edge of the chamber — you can feel them more than see them, a small warmth at your back. They cannot fight. But they track Blind Anger's every move by sound, breath, and footfall. Each party member gets one free re-roll on any attack or defense roll this encounter. When you use it, describe what Murn or Goob whispered just before.

      **If Murn and Goob are NOT present** (party didn't rescue Goob): The darkness works against the party — Blind Anger's attack threshold is reduced by 2 (he's practiced; they're not). No re-rolls.

      **Sound and noise:** Players who yell, clash metal, or make significant noise give Blind Anger a +2 to his next attack. Players who move quietly, whisper, and coordinate can strip that back. This is a tone-setter, not a hard rule — use it to build drama.

      **After the fight:**

      > [!NARRATION]
      > He falls slowly. Not like something that gives up — like something that finally gets to rest. The chamber is very quiet.

      The locket is in your hands. It opens easily. Inside: a small light, like a candle flame that doesn't flicker. It doesn't need air. It just burns.

      > [!NARRATION]
      > And then — from behind you, from the dark — small warm shapes press against your legs. Murn on one side, Goob on the other. They don't say anything. They just stay there for a moment. Then they're gone.
    npcs: [goob, murn]
    items:
      - illuminating-truth
    encounters:
      - name: Blind Anger
        enemies:
          - slug: boss-blind-anger
            count: 1
---

A cave in the heights above the Darkened Ridge, deeper than it looks from outside. No light reaches the inner chambers. Something has lived here for a very long time, and it has had nothing to do with that time but be angry.

The Wumbles know about it. They don't go in.

The cave runs all the way through the ridge. The western mouth opens above the wetlands of Glenrith — a short drop to a slope, then trees, then the smell of the Swamp of Putrid Stank reaching up from below.
