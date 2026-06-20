# TODO — Family TTRPG Project

---

## Map System
- [x] Design map format and frontmatter schema (`world/maps/SLUG.md`, layers/entities/cells)
- [x] Add map view to GM Tool SPA (`/maps`, `/maps/:slug`, Maps tab, zoom/pan canvas, blob-tile entity shapes, layer toggles, entity overlay, position persistence)
- [x] Wire `:map[slug]` inline directive pill
- [ ] **BUG: entity click → overlay not opening** — entities render (blob tiles, correct positions), click fires, no console errors, but the `rounded-t-xl` overlay panel never appears. Likely event propagation issue in `MapCanvas.tsx` (`handleCanvasClick` calling `setSelectedEntity(null)` racing with entity's `stopPropagation`). Needs debugger or targeted repro.
- [ ] Run full verification pass once overlay bug is fixed
- [ ] Create maps for Rjocht, Hidden Grove, and Crossroads Inn (overworld `the-reaches.md` is done as sample)
- [ ] Update CLAUDE.md directory structure to include `world/maps/` and `.claude/`

## CI/CD — Reference Validation
- [ ] Write validation script to check cross-document references (NPC slugs, enemy refs, item names, frontmatter keys)
- [ ] Wire script into an npm `validate` command and a GitHub Actions workflow on push/PR

## Future Goals (from CLAUDE.md)
- [ ] Print pipeline — printable card sheets from markdown frontmatter via browser print *(ItemsView + PrintView already done; this is about cards for abilities/enemies)*
- [ ] Transcript debrief workflow — session recording → automated debrief draft
