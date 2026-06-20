---
name: The Reaches
tagline: The campaign region — trading roads, ancient forest, and a city held in shadow.
scenes:
  - name: Goblin Ambush on the Trading Road
    type: combat
    tagline: Cowardly opportunists, not Dorogh's soldiers — the Blade goes cold first; use that.
    description: |-
      The road narrows. Forest presses close on both sides, late afternoon shadows stretching long across the path. Good country for an ambush.

      > The trees crowd in here — branches reaching across the road overhead. The light is going. And then MuhDude, you feel it: the Blade shifts in your hand. Not cold exactly. Cooler. Like something nearby is wrong.
    gm_notes: |-
      **The warning** is the Blade-bearer feeling the chill. Give that moment before anything else happens — let the party respond.

      **Spotting them first:** Blade-bearer (chill intensifies near dense brush), Insight 10+ (hostile intent), Wit 10+ (movement/weapons in bushes), Creation 10+ (disturbed nature). If spotted:
      - Avoid entirely — Agility, move quietly, bypass
      - Ambush the ambushers — surprise, first attack auto-succeeds
      - Call out — might negotiate or intimidate them off
      - Prepare — normal combat, not surprised

      **If they don't notice:** crude arrows from the bushes; cackling laughter; four goblins burst onto the road. Lead goblin: *"Your coin or your lives, travelers! Drop your packs and run, or we'll take EVERYTHING!"*

      **Talking them down is still on the table after combat starts:** Heart ("We don't want to fight you!"), Wit ("There are six of us, four of you — bad odds!"), or offer something (a :item[honeycake]). They might take it and leave. Or get greedy.

      **Behavior:** When 2+ are down, remaining goblins may flee — *"Last goblin's eyes go wide. Drops weapon and runs screaming!"* Let players choose to chase or let go. That's the mercy moment.

      **Transition out:** *"The way is clear. Rjocht looms ahead — you can see its walls in the distance, dark against the sky. The Blade grows colder with each step forward."*
    npcs: []
    encounters:
      - name: Ambush
        enemies:
          - slug: goblin-scout
            count: 4
  - name: The Pineapple Tribe
    type: event
    tagline: A clearing full of tiny fierce people who will either chase you off with spears or hail you as their king.
    description: |-
      You hear it before you see it — drumbeats, deep and steady for something so small, thumping through the trees. And voices, dozens of them, chanting together.

      > [!NARRATION]
      > *"Bring us our king and bring him now! Bring us our king and bring him now!"*
      >
      > Over and over. Getting louder as you push through the brush.

      The trees open into a clearing ringed with tiny spears stuck in the earth, points up. Beyond them, a village of thatch-and-bark huts no taller than your knee. The whole tribe is dancing around a bonfire — dozens of small yellow-green figures, their spiky crowns catching the firelight — chanting, stomping, eyes closed. They haven't noticed you yet.

      Then one guard turns around.

      > [!NARRATION]
      > The drumming stutters. Stops. Every pineapple person freezes and stares at you.

      > [!DIALOG]
      > **Pineapple Guard:** "HALT. This is the sacred clearing. Turn back, giants — or face the wrath of the Spined Ones."
    gm_notes: |-
      **If the party tries to enter without a costume:** The whole tribe erupts. Spears poke at ankles (they can barely reach). No real damage, but the party cannot pass — a hundred tiny determined pineapple people is surprisingly effective. They'll back off if the party retreats.

      **If anyone attacks:** Don't roll combat. The tribe simply swarms — a living tide of tiny bodies, climbing boots, grabbing fingers, piling on with astonishing coordinated weight — and carries the offender bodily out of the clearing. Sets them down outside the spear ring. Resumes chanting. No injuries. No anger. Just removal.

      **If anyone is wearing a giant pineapple costume:** The guards freeze. Spears drop. A ripple runs through the crowd — gasps, whispered awe. Then the nearest guard drops to one knee. Then another. Then the whole village, in a slow wave.

      > [!NARRATION]
      > A hush falls over the clearing. Then, from the back of the village, a tiny elder emerges — ancient and wrinkled, wearing the wisest pineapple crown you've ever seen. He raises his tiny staff and his voice carries more than it should.

      > [!DIALOG]
      > **Elder Thornspike:** "THE GREAT PINEAPPLE HAS RETURNED. It is as the old songs foretold. Hail! HAIL!"

      > [!NARRATION]
      > The entire village erupts in tiny cheering. Someone produces a tiny trumpet. It is the smallest and most triumphant sound you've ever heard.

      **Reward:** Elder Thornspike presents the :item[pineapple-scepter] with immense ceremony. A small feast follows (the food is surprisingly delicious, though small). The party may stay the night — warmth, safety, and a hundred tiny guards watching over them.

      **The costume:** It doesn't need to be elaborate. They might stitch together yellow cloth and straw, find a novelty item from a merchant, or just commit to a bush with leaves tucked in. Keep it fun — the tribe's enthusiasm is proportional to how committed the party is to the bit.

      **Diplomatic option (no costume):** Wit 12+ establishes contact — the guard agrees to "send a message to the elder." The elder emerges and offers a deal: *"You may have the Scepter... if you bring us one (1) real pineapple."* Resolution left to the GM.
    npcs: []
    items:
      - pineapple-scepter
    encounters: []
  - name: Carpe Diem Island (Approach)
    type: approach
    tagline: Something out in the wetlands is firing a beam of light straight into the sky.
    description: |-
      Off the road, through a thin stand of trees: a beam of brilliant white light, perfectly vertical, shooting up from somewhere low in the wetlands. Doesn't flicker. Doesn't move. Has probably been there a while.

      > [!NARRATION]
      > It's coming from a small island in a stream. Easy to reach — the water looks knee-deep. There's something on the island. Someone is standing in the stream between you and it.
    gm_notes: |-
      This is the hook for :map[carpe-diem-island]. Full scene detail is there.

      The beam is visible from a significant distance — the party may have seen it from the road before they know what it is. It cuts off the moment the :item[floppy-fish-club] is lifted from the pedestal.
    npcs: []
    encounters: []
---

The working region for the current campaign — the territory between the Hidden Grove, the Crossroads Inn, and the occupied city of Rjocht.

Trading roads connect the settlements, narrowing where the old forest pushes in. Merchants move through quickly. People heading to Rjocht don't linger anywhere they don't have to.

The shadow of Drachan's corruption is strongest at Rjocht but seeps outward — the animals are uneasy, the fog lingers past dawn, and travelers move with their eyes down.
