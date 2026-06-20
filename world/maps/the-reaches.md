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
        cells: [[14, 10], [15, 10], [16, 10], [14, 11], [15, 11], [16, 11], [15, 9]]
      - label: Amber Hollow
        icon: "🌲"
        color: "#4ade80"
        link: "location:amber-hollow"
        content: |
          A small village a half-day's walk from Rjocht. The fog doesn't reach as thick here.

          :npc[elder-greymane] can be found at the village well most mornings.
        cells: [[5, 14], [6, 14], [7, 14], [5, 15], [6, 15], [6, 13]]
      - label: Hidden Grove
        icon: "🌿"
        color: "#86efac"
        link: "location:hidden-grove"
        content: |
          A sacred place few know about. The fog seems to thin here, just slightly.
        cells: [[22, 6], [23, 6], [22, 7]]
      - label: Crossroads Inn
        icon: "🍺"
        color: "#a78bfa"
        link: "location:crossroads-inn"
        content: |
          The only neutral ground between Rjocht and the outlying villages. :npc[merra] runs the place and knows more than she lets on.
        cells: [[10, 16], [11, 16]]
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
        cells: [[12, 13], [13, 13]]
      - label: Fog Wraith Territory
        icon: "👻"
        color: "#7c3aed"
        content: |
          The fog is thickest here. Something moves in it that isn't natural — not corrupted guards, but something older.

          **Encounter:** 1d4 Fog Wraiths (l1). They avoid firelight.
        cells: [[25, 3], [26, 3], [25, 4], [26, 4], [27, 3]]
---

The contested reaches surrounding Rjocht. Since Dorogh seized power, the fog has thickened and the roads are watched. Three settlements remain — barely.
