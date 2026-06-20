---
name: Glenrith
width: 32
height: 24
cellSize: 56
layers:
  - id: terrain
    name: Terrain
    entities:
      - label: Cavern Exit
        icon: "🕳️"
        color: "#1e293b"
        link: "location:cavern-of-blackest-shadows"
        content: |
          The western mouth of the Cavern of Blackest Shadows opens here, above the slope. The Darkened Ridge and The Reaches lie beyond the eastern passage.
        cells: [[30, 8], [31, 8], [31, 9]]
      - label: Swamp of Putrid Stank
        icon: "🐸"
        color: "#4d7c0f"
        link: "location:swamp-of-putrid-stank"
        content: |
          It smells exactly as bad as the name suggests. The old causeways are the only safe crossing — find the stone markers just above waterline.

          Something large moves through the deep center. It has decided you are uninteresting.
        cells: [[10, 12], [11, 12], [12, 12], [13, 12], [14, 12], [15, 12], [16, 12], [10, 13], [11, 13], [12, 13], [13, 13], [14, 13], [15, 13], [16, 13], [17, 13], [10, 14], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14], [16, 14], [11, 15], [12, 15], [13, 15], [14, 15], [15, 15], [12, 16], [13, 16], [14, 16]]
      - label: Caedreth (KAY-dreth)
        icon: "🌳"
        color: "#a3e635"
        link: "location:caedreth"
        content: |
          A whole town built in the ancient trees above the swamp. Fish-drying racks, rope bridges, people who are warm once you've earned it.

          They know the causeways. They know "the old anger" in the cave. They call the thing in the deep water the Lurker and fish around it.
        cells: [[4, 4], [5, 4], [6, 4], [4, 5], [5, 5], [5, 6]]
  - id: encounters
    name: Encounters
    entities:
      - label: The Deep One
        icon: "〰️"
        color: "#365314"
        content: |
          A long, slow ripple crosses the swamp when something below passes through. Large. Old. It has looked at every traveler who ever crossed this swamp and decided they were uninteresting.

          **If provoked:** Another ripple, moving away toward the deeper center. It is leaving. It finds you extremely uninteresting.
        cells: [[13, 14], [14, 14], [15, 14], [13, 15], [14, 15]]
---

The wetlands west of the Darkened Ridge. Older than Rjocht, wetter than anywhere, and mostly ignored by whatever shadow Dorogh has cast over the east. The Swamp of Putrid Stank fills the center. The people of Caedreth live above it all and watch.
