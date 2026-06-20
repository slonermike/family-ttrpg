import type { MapFile, MapEntity } from '../types/map'

export type EntityGrid = ReadonlyMap<string, MapEntity>

export function buildEntityGrid(map: MapFile, visibleLayerIds: ReadonlySet<string>): EntityGrid {
  const grid = new Map<string, MapEntity>()
  for (const layer of map.layers) {
    if (!visibleLayerIds.has(layer.id)) continue
    for (const entity of layer.entities) {
      for (const [x, y] of entity.cells) {
        grid.set(`${x},${y}`, entity)
      }
    }
  }
  return grid
}

export function screenToCell(
  clientX: number,
  clientY: number,
  canvasRect: DOMRect,
  offset: { x: number; y: number },
  zoom: number,
  cellSize: number
): { x: number; y: number } {
  return {
    x: Math.floor((clientX - canvasRect.left - offset.x) / zoom / cellSize),
    y: Math.floor((clientY - canvasRect.top - offset.y) / zoom / cellSize),
  }
}
