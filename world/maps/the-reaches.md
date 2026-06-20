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
        cells: [[24, 9], [25, 9], [26, 9], [24, 10], [25, 10], [26, 10], [25, 11]]
      - label: Amber Hollow
        icon: "🌲"
        color: "#4ade80"
        link: "location:amber-hollow"
        content: |
          A small village a half-day's walk from Rjocht. The fog doesn't reach as thick here.

          :npc[elder-greymane] can be found at the village well most mornings.
        cells: [[7, 13], [8, 13], [9, 13], [7, 14], [8, 14], [8, 15]]
      - label: Hidden Grove
        icon: "🌿"
        color: "#86efac"
        link: "location:hidden-grove"
        content: |
          A sacred place few know about. The fog seems to thin here, just slightly.
        cells: [[20, 5], [21, 5], [20, 6]]
      - label: Crossroads Inn
        icon: "🍺"
        color: "#a78bfa"
        link: "location:crossroads-inn"
        content: |
          The only neutral ground between Rjocht and the outlying villages. :npc[merra] runs the place and knows more than she lets on.
        cells: [[13, 16], [14, 16]]
      - label: Darkened Ridge
        icon: "⛰️"
        color: "#475569"
        link: "location:darkened-ridge"
        content: |
          A steep, cold ridge at the western edge of the Reaches. Harder to climb than it looks.

          :npc[murn] waits at the top — a small blind creature whose friend never came back from the cave above.
        cells: [[1, 11], [2, 11], [3, 11], [1, 12], [2, 12]]
      - label: Cavern of Blackest Shadows
        icon: "🕳️"
        color: "#1e293b"
        link: "location:cavern-of-blackest-shadows"
        content: |
          A cave above the Darkened Ridge. Pitch dark. Something large lives in the deep part — it can't see, but it can hear everything.

          :npc[goob] is stranded inside. :enemy[boss-blind-anger] holds :item[illuminating-truth] without knowing it.
        cells: [[1, 8], [2, 8], [1, 9]]
      - label: Carpe Diem Island
        icon: "🐟"
        color: "#38bdf8"
        link: "location:carpe-diem-island"
        content: |
          A tiny island shooting a beam of white light straight into the sky. A figure stands in the stream between you and it.

          :enemy[l1-carp-mermaid] guards the crossing. The :item[floppy-fish-club] waits on the pedestal inside.
        cells: [[17, 12], [18, 12], [17, 13]]
  - id: fog
    name: Fog of War
    entities:
      - label: The Deep Fog
        color: "#334155"
        content: |
          The unnatural fog that rolled in when Dorogh took power. It doesn't just obscure vision — it unsettles the mind. Travelers without a guide have been found wandering for days.
        cells: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 1], [1, 1], [2, 1], [27, 0], [28, 0], [29, 0], [30, 0], [31, 0], [27, 1], [28, 1], [29, 1], [30, 1], [31, 1], [0, 20], [1, 20], [2, 20], [0, 21], [1, 21], [0, 22], [29, 20], [30, 20], [31, 20], [30, 21], [31, 21], [31, 22]]
  - id: encounters
    name: Patrol Encounters
    entities:
      - label: Dorogh's Road Patrol
        icon: "⚔️"
        color: "#ef4444"
        content: |
          Two :enemy[l2-corrupted-guard] patrol the main road between Rjocht and the crossroads at dawn and dusk.

          **Trigger:** Party travels the road openly during patrol hours.
        cells: [[21, 11], [22, 11]]
      - label: Fog Wraith Territory
        icon: "👻"
        color: "#7c3aed"
        content: |
          The fog is thickest here. Something moves in it that isn't natural — not corrupted guards, but something older.

          **Encounter:** 1d4 Fog Wraiths (l1). They avoid firelight.
        cells: [[26, 3], [27, 3], [26, 4], [27, 4], [28, 3]]
---

The contested reaches surrounding Rjocht. Since Dorogh seized power, the fog has thickened and the roads are watched. Three settlements remain — barely.
