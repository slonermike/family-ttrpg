---
name: Carpe Diem Island
type: island-shrine
status: unvisited
region: the-reaches
tagline: A tiny island shooting a beam of light into the sky — and a fish-woman who won't let you near it.
npcs_present: []
connected_to: [The Reaches]
scenes:
  - name: The Carp Mermaid's Crossing
    type: event
    tagline: A shallow stream, an impossible guardian, and a demand that makes no sense — until it does.
    description: |-
      The road dips to a shallow stream — knee-deep, smooth stones on the bottom. Easy crossing, normally.

      In the middle stands a figure. From the waist up: entirely carp — round goggle eyes, green-gold scales, fins, the whole fish. Below the waist: plastic legs, perfectly pink, knees that don't bend, tiny pointed feet planted in the streambed.

      She hasn't moved. She's watching you with enormous fish eyes.

      On the far side of the stream: the island. She is between you and it.

      > [!DIALOG]
      > **Carp Mermaid:** "You may not pass."

      A pause. Her enormous jaw opens slightly, revealing a wall of needle fangs.

      > [!DIALOG]
      > **Carp Mermaid:** "Bring me something. It must be clean. It must be beautiful. It must also be stinky. All three at once. Do not bring me something dirty. Do not bring me something merely beautiful. Do not bring me something merely stinky. Do not try to cross."

      Another pause.

      > [!DIALOG]
      > **Carp Mermaid:** "I will bite you."
    gm_notes: |-
      **The demand:** "Clean, beautiful, and stinky — all three at once." The "clean" requirement is the key guardrail: it rules out anything gross or dirty, and steers the table toward strong-smelling things that are also genuinely lovely. This is intentionally open-ended — let the players invent the answer. Some directions it can go:
      - A freshly washed garlic braid woven with wildflowers
      - A perfect wheel of aged cheese with a clean, golden rind
      - A single ripe durian — exotic, spiky, beautiful in its way, and unmistakably stinky
      - A bundle of rosemary and lavender left in the sun until the herbs are at peak pungency
      - Anything the players describe with enough creativity and commitment

      **What doesn't work:**
      - :item[strange-bun] — *"That is not beautiful."* She says this flatly, with fish eyes, and waits.
      - Anything dirty or gross — *"That is not clean."* Same delivery.
      - Anything merely stinky — *"No."*
      - Anything merely beautiful — *"No. Did you not listen?"*

      **If they try to cross anyway:** Roll :enemy[l1-carp-mermaid] attack vs. the crossing player's defense. On a hit, that player is paralyzed face-down in six inches of water. She does this calmly and resumes her original posture.

      **If they attack her:** She retreats to the center of the stream and fights back. She cannot be Heart-checked while in combat — she's doing a job, not having feelings about it.

      **When she accepts an offering:** She considers it with her enormous eyes for a long moment. Sets it carefully beside her. Steps aside.

      > [!DIALOG]
      > **Carp Mermaid:** "...Yes. That is the thing. You may cross."

      She does not explain further. She does not thank you.
    npcs: []
    encounters:
      - name: Crossing the Stream
        enemies:
          - slug: l1-carp-mermaid
            count: 1
  - name: The Island Interior
    type: explorable
    tagline: Whatever is firing that beam into the sky is here — and so is the Club.
    description: |-
      The island is small enough to cross in ten steps. Smooth stones, a few tufts of grass, and at the center: a stone pedestal, waist-high, with the :item[floppy-fish-club] lying on top of it.

      The beam of light shoots straight up from the pedestal — brilliant white, perfectly vertical, visible for miles in every direction.

      The Club does not appear to be the source. It is flopped limply over the edge of the pedestal. It looks like it washed up here by accident.
    gm_notes: |-
      The beam's origin is the pedestal itself — ancient stone, covered in faded glyphs. What put it here and why it fires a beam of light are not explained. The Carp Mermaid doesn't know. Nobody knows.

      The :item[floppy-fish-club] looks completely unimpressive. Let the party underestimate it. If they try to test it, it will not bend, tear, burn, or break under any circumstances they can devise. When swung, it hits harder than it has any right to.

      Picking it up ends the beam. The pedestal goes dark and silent.
    items:
      - floppy-fish-club
    npcs: []
    encounters: []
---

A tiny island in a shallow stream, visible from the road by the pillar of white light it fires straight into the sky. Nobody knows what it is or why it's there. The Carp Mermaid has been guarding the crossing for a very long time.
