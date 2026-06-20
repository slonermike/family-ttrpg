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
          The western mouth of the Cavern of Blackest Shadows opens here, right at the swamp's edge. The Darkened Ridge and The Reaches lie beyond the eastern passage.
        cells: [[30, 11], [31, 11], [30, 12]]
      - label: Swamp of Putrid Stank
        icon: "🐸"
        color: "#4d7c0f"
        link: "location:swamp-of-putrid-stank"
        content: |
          It smells exactly as bad as the name suggests. The old causeways are the only safe crossing — find the stone markers just above waterline.

          Something large moves through the deep center. It has decided you are uninteresting.
        cells: [[23, 12], [24, 12], [25, 12], [26, 12], [27, 12], [28, 12], [29, 12], [23, 13], [24, 13], [25, 13], [26, 13], [27, 13], [28, 13], [29, 13], [30, 13], [23, 14], [24, 14], [25, 14], [26, 14], [27, 14], [28, 14], [29, 14], [24, 15], [25, 15], [26, 15], [27, 15], [28, 15], [25, 16], [26, 16], [27, 16]]
      - label: Caedreth (KAY-dreth)
        icon: "🌳"
        color: "#a3e635"
        link: "location:caedreth"
        content: |
          A whole town built in the ancient trees above the swamp. Fish-drying racks, rope bridges, people who are warm once you've earned it.

          They know the causeways. They know "the old anger" in the cave. They call the thing in the deep water the Lurker and fish around it.
        cells: [[20, 10], [21, 10], [22, 10], [23, 10], [24, 10], [20, 11], [21, 11], [22, 11], [23, 11], [24, 11], [20, 12], [21, 12], [22, 12], [20, 13], [21, 13], [22, 13]]
  - id: encounters
    name: Encounters
    entities:
      - label: The Deep One
        icon: "〰️"
        color: "#365314"
        content: |
          A long, slow ripple crosses the swamp when something below passes through. Large. Old. It has looked at every traveler who ever crossed this swamp and decided they were uninteresting.

          **If provoked:** Another ripple, moving away toward the deeper center. It is leaving. It finds you extremely uninteresting.
        cells: [[26, 14], [27, 14], [28, 14], [26, 15], [27, 15]]
---

The wetlands west of the Darkened Ridge. Older than Rjocht, wetter than anywhere, and mostly ignored by whatever shadow Dorogh has cast over the east. The Swamp of Putrid Stank fills the center. The people of Caedreth live above it all and watch.
