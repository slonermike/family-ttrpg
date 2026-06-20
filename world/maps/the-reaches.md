---
name: The Reaches
width: 32
height: 24
cellSize: 56
layers:
  - id: terrain
    name: Terrain
    entities:
      - label: Rjocht
        icon: "🏰"
        color: "#f59e0b"
        link: "location:rjocht"
        content: |
          The fortified capital of the Reaches. Dorogh holds power here now — the guards are corrupted, the streets are watched.

          :npc[jorik] still works the smithy near the east gate. He's one of the few left who hasn't bent the knee.
        cells: [[13,9],[14,9],[15,9],[16,9],[17,9],[13,10],[14,10],[15,10],[16,10],[17,10],[13,11],[14,11],[15,11],[16,11],[17,11],[14,12],[15,12],[16,12],[15,13]]
      - label: Amber Hollow
        icon: "🌲"
        color: "#4ade80"
        link: "location:amber-hollow"
        content: |
          A small village a half-day's walk from Rjocht. The fog doesn't reach as thick here.

          :npc[elder-greymane] can be found at the village well most mornings.
        cells: [[6,14],[7,14],[8,14],[6,15],[7,15],[7,16]]
      - label: Hidden Grove
        icon: "🌿"
        color: "#86efac"
        link: "location:hidden-grove"
        content: |
          A sacred place few know about. The fog seems to thin here, just slightly.
        cells: [[26,2],[27,2],[28,2],[26,3],[27,3],[27,4]]
      - label: Crossroads Inn
        icon: "🍺"
        color: "#a78bfa"
        link: "location:crossroads-inn"
        content: |
          The only neutral ground between Rjocht and the outlying villages. :npc[merra] runs the place and knows more than she lets on.
        cells: [[21,6],[22,6]]
      - label: Darkened Ridge
        icon: "⛰️"
        color: "#475569"
        link: "location:darkened-ridge"
        content: |
          A steep, cold ridge at the western edge of the Reaches. Harder to climb than it looks.

          :npc[murn] waits at the top — a small blind creature whose friend never came back from the cave above.
        cells: [[0,10],[1,10],[2,10],[0,11],[1,11],[2,11],[0,12],[1,12],[0,13],[1,13]]
      - label: Cavern of Blackest Shadows
        icon: "🕳️"
        color: "#1e293b"
        link: "location:cavern-of-blackest-shadows"
        content: |
          A cave above the Darkened Ridge. Pitch dark. Something large lives in the deep part — it can't see, but it can hear everything.

          :npc[goob] is stranded inside. :enemy[boss-blind-anger] holds :item[illuminating-truth] without knowing it.
        cells: [[0,7],[1,7],[2,7],[0,8],[1,8]]
      - label: Carpe Diem Island
        icon: "🐟"
        color: "#38bdf8"
        link: "location:carpe-diem-island"
        content: |
          A tiny island shooting a beam of white light straight into the sky. A figure stands in the stream between you and it.

          :enemy[l1-carp-mermaid] guards the crossing. The :item[floppy-fish-club] waits on the pedestal inside.
        cells: [[9,10],[10,10],[9,11]]
  - id: encounters
    name: Patrol Encounters
    entities:
      - label: Dorogh's Road Patrol
        icon: "⚔️"
        color: "#ef4444"
        content: |
          Two :enemy[l2-corrupted-guard] patrol the main road between Rjocht and the crossroads at dawn and dusk.

          **Trigger:** Party travels the road openly during patrol hours.
        cells: [[18,8],[19,8]]
---

The contested reaches surrounding Rjocht. Since Dorogh seized power, the fog has thickened and the roads are watched. Three settlements remain — barely.
