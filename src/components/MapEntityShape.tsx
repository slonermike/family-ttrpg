import { useMemo } from 'react'
import type { MapEntity } from '../types/map'
import { BLOB_ATLAS_COLS, BLOB_TILE_PX, BlobTileIndex, BlobTileRotation } from '../rendering/blobTiles'
import { computeNeighborMask } from '../rendering/computeNeighborMask'

const TILESET_URL = '/blob_tileset_terrain.png'

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '')
  const int = parseInt(clean, 16)
  return {
    r: ((int >> 16) & 255) / 255,
    g: ((int >> 8) & 255) / 255,
    b: (int & 255) / 255,
  }
}

interface MapEntityShapeProps {
  entity: MapEntity
  cellSize: number
  selected: boolean
  hovered: boolean
}

export function MapEntityShape({ entity, cellSize, selected, hovered }: MapEntityShapeProps) {
  const scale = cellSize / BLOB_TILE_PX
  const atlasPx = BLOB_ATLAS_COLS * BLOB_TILE_PX * scale

  const minX = Math.min(...entity.cells.map(([x]) => x))
  const minY = Math.min(...entity.cells.map(([, y]) => y))
  const localCells = entity.cells.map(([x, y]) => ({ x: x - minX, y: y - minY }))

  const width = Math.max(...localCells.map(c => c.x)) + 1
  const height = Math.max(...localCells.map(c => c.y)) + 1

  const occupied = useMemo(() => {
    const s = new Set<string>()
    for (const c of localCells) s.add(`${c.x},${c.y}`)
    return s
  }, [entity.cells]) // eslint-disable-line react-hooks/exhaustive-deps

  const color = entity.color ?? '#6b7280'
  const { r, g, b } = hexToRgb(color)
  const filterId = `esf-${Math.round(r * 255)}-${Math.round(g * 255)}-${Math.round(b * 255)}`
  const matrixValues = `0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  0 0 0 1 0`

  return (
    <div
      style={{
        position: 'absolute',
        left: minX * cellSize,
        top: minY * cellSize,
        width: width * cellSize,
        height: height * cellSize,
        opacity: hovered && !selected ? 0.75 : 1,
        animation: selected ? 'gentle-pulse 2s ease-in-out infinite' : undefined,
        pointerEvents: 'none',
      }}
    >
      <svg width={0} height={0} style={{ position: 'absolute' }}>
        <defs>
          <filter id={filterId} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values={matrixValues} />
          </filter>
        </defs>
      </svg>
      {localCells.map((cell) => {
        const mask = computeNeighborMask(occupied, cell.x, cell.y)
        const tileIndex = BlobTileIndex[mask]
        const rotation = BlobTileRotation[mask]
        const col = tileIndex % BLOB_ATLAS_COLS
        const row = Math.floor(tileIndex / BLOB_ATLAS_COLS)

        return (
          <div
            key={`${cell.x},${cell.y}`}
            style={{
              position: 'absolute',
              left: cell.x * cellSize,
              top: cell.y * cellSize,
              width: cellSize,
              height: cellSize,
              backgroundImage: `url('${TILESET_URL}')`,
              backgroundSize: `${atlasPx}px ${atlasPx}px`,
              backgroundPosition: `-${col * cellSize}px -${row * cellSize}px`,
              transform: rotation ? `rotate(${rotation * 90}deg)` : undefined,
              filter: `url(#${filterId})`,
            }}
          />
        )
      })}
    </div>
  )
}
