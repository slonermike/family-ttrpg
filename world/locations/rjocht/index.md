---
name: Rjocht
type: fortress-city
status: occupied-by-Dorogh
visited_session: 1
region: the-reaches
tagline: A city that forgot what color looks like — every NPC is a window into what was lost.
npcs_present: [Jorik, Merra, Finn, Brother Aldric, Captain Rothgar, Seraphine, Margrave, Constance, Tam, Beren]
connected_to: [Trading Road, Crossroads Inn, Dorogh Keep]
scenes:
  - name: East Market Gate
    type: approach
    tagline: Two exhausted guards who don't want trouble — find the human thread and they crack.
    description: |-
      The traders' gate. Two guards, a worn booth, a list of permitted goods on a board no one reads anymore.

      > The wall ahead is older stone, patched in places. Two men at a booth — not soldiers, exactly. One glances at you, then looks away. The other doesn't look up at all. Behind them, through the gate, you can see the city.
    gm_notes: |-
      **Tam** is the soft spot — young, scared, wants it to be over. His sister's kids haven't had meat in two weeks. Find a human thread and he cracks.

      **Beren** follows once Tam doesn't object. He has no loyalty to Dorogh, just exhaustion. He won't be the one to make an enemy of travelers Tam has already quietly approved.

      **Merchant's ID** is automatic — no roll, no eye contact, Tam waves them through.

      If combat starts here, it takes one round before a runner goes to the Market District patrol.
    npcs: [tam, beren]

  - name: Eastern District
    type: explorable
    tagline: The first choice — Jorik's hammer ahead, the market's noise to the west; let the party decide.
    description: |-
      The gate closes behind them. The street ahead is narrow — older stone, quieter. The eastern district.

      > You're inside. The gate closes behind you. The street ahead is narrow — older stone, less foot traffic than you expected. To the west you can already hear it: cart wheels, flat voices, the thud of crates being stacked. The market. But ahead, closer, there's something else. A hammer ringing. Metal on metal, steady and unhurried. Someone is still working.
    gm_notes: |-
      **The fork.** Two paths from here — let them choose, don't push.

      **Follow the hammer (Jorik):** Quieter. Safer. He's an ally, he won't ask questions, and he carries everything the party needs to understand the human cost of what's happening in this city. Good first stop if they want to regroup before wading into the market.

      **Head toward the noise (Market District):** More exposed. More NPCs. More information available, but also more guards. Merra, Finn, Seraphine, Margrave — all of them are there.

      **Jorik** is a safe return point at any time. If the party needs to rest or pass information, he's where they come back to.

      When Jorik speaks, slow down. Give his words space. He doesn't give tactical information — he gives human cost information. What the city used to be. Who the people are. What's been lost.
    npcs: [jorik]

  - name: Market District
    type: explorable
    tagline: A city that forgot what color looks like — every NPC here is a window into what was lost.
    description: |-
      The heart of the city, hollowed out. Stalls with permitted goods only — plain food, plain clay pots. No color. No decoration. *Beauty has been declared a form of rebellion.*

      > The market is open. That's the thing — it's open, people are moving through it, there are stalls and sounds of transaction. But there's no smell. No spices, no flowers, no warm bread. The stalls have plain clay pots and plain root vegetables and nothing else. Nobody is talking to anyone they don't have to.
    gm_notes: |-
      **Merra** knows everyone's name. If the party is kind to her, she remembers — and she has things tucked away she doesn't show everyone.

      **Finn** is everywhere. He'll help if treated like a person, not a tool. That's the trigger. Watch for it and give it room.

      **Seraphine** has already spotted the Blade. Her reaction is more than she's letting on — she recognized it immediately. That's a thread worth pulling.

      **Brother Aldric** sits by the old well near the east end of the market. Guards leave him alone out of superstition. He is not a source of information — he is a source of stillness before hard things.

      **Margrave** knows more than he lets on and will sell information if he thinks there's something in it for him. His pride is the lever.
    npcs: [merra, finn, brother-aldric, seraphine, margrave, minors]

  - name: Dorogh's Keep
    type: combat
    tagline: The endgame — don't engage until Constance's intel is in hand and the party is at full strength.
    description: |-
      Heavy iron-banded doors flanked by Corrupted Guards. Cold inside — torches that pull shadows rather than push them. Stone stairs lead up to the throne room. The basement entrance is to the left of the main doors.

      > The keep is at the end of the street. Iron-banded doors, tall enough for two people walking side by side. Two guards flank the entrance — they are not watching for trouble the way men watch for trouble. They are watching the way things watch when they no longer need to be afraid. And then — before you reach the doors — you notice a barred window at ground level, to the left. Something moves behind it.
    gm_notes: |-
      **Constance's window** is at ground level, visible before the party reaches the doors. This is the discovery moment — give it space. Don't rush past it.

      **2 Corrupted Guards** flank the door at all times. These are not conscripts — they are extensions of Dorogh's will. No mercy path.

      **Rothgar** patrols the perimeter on a rough 20-minute rotation. He is the wildcard: competent, not Corrupted, still has agency. He can make judgment calls the guards cannot.

      **Rothgar redemption trigger:** seeing Constance look at him, or being forced to choose between Dorogh's order and something undeniable. If it happens, he opens a door. Turns away at the right moment. Does not ring the alarm when he should.

      **Dorogh is inside.** Do not engage the boss without the party at full strength and Constance's intelligence in hand.
    npcs: [captain-rothgar, constance]
    encounters:
      - name: Keep Entrance
        enemies:
          - slug: corrupted-guard
            count: 2
---

A fortress city that was once beautiful. Towers that used to gleam now look like teeth. The walls are massive, dark stone — more like a cage than protection.

A thick gray fog has hung over the city for so long the people have forgotten what sunlight looks like. They say it arrived when Dorogh did.

No music. No children playing in the streets. The market sells only plain food — potatoes, carrots, turnips. The potter makes only plain clay pots. No color, no decoration, nothing beautiful. Beauty has been declared a form of rebellion.

People walk with heads down and move fast. Guards patrol in pairs. Nobody looks at anyone.

## Districts

### Market District
Central area. Stalls with permitted goods only. Merra sells herbs here when she can. Finn moves through this area constantly. Seraphine keeps a corner stall. Margrave runs a proper merchant operation.

### Eastern District
Near the inner wall, quieter, less guard presence. Jorik's smithy is here. People who need real help find their way to this district.

### Dorogh's Keep
Heavy iron-banded doors flanked by Corrupted Guards. Basement cell has a barred window at ground level — Constance is here. Inside: cold, dark, torches that burn dim and pull shadows rather than push them. Stone stairs to the throne room above.

## Entry Points

**East Market Gate** — Traders' gate. Guarded by Tam and Beren (conscripted, not true believers). Heart or Wit roll 12+ to talk through. Merchant's ID is an automatic pass.

**Main Gates** — 4-6 Corrupted Soldiers. Do not attempt without extreme preparation.

**Other** — The party entered via an unconventional route in session 1 (through the forest/gate sprint, Nat 20 roll).

## Post-Campaign State

After Dorogh's fall, the fog lifts within minutes. Color returns to the market. Children appear as if from nowhere. Constance breaks her chains and leads the citizens out of hiding. Jorik is among the first out the door.

Drachan feels it the moment Dorogh falls. This city is free, but the campaign makes clear: there are other cities.
