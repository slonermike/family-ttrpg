import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { MapFile, MapEntity } from '../types/map'
import { useMapStore } from '../store/mapSlice'
import { locationMap } from '../data/locations'
import { MapEntityShape } from './MapEntityShape'
import MarkdownBody from './MarkdownBody'

const ZOOM_SPEED = 0.001
const MIN_ZOOM = 0.15
const MAX_ZOOM = 4.0
const DRAG_THRESHOLD = 4

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

function linkTarget(link: string): string {
  const [type, slug] = link.split(':')
  switch (type) {
    case 'npc': return `/npc/${slug}`
    case 'location': {
      const loc = locationMap[slug]
      return loc ? `/world/${loc.region}/${slug}` : '/world'
    }
    case 'region': return `/world/${slug}`
    case 'item': return `/items/${slug}`
    case 'map': return `/maps/${slug}`
    default: return '/'
  }
}

function linkLabel(link: string): string {
  const [type] = link.split(':')
  switch (type) {
    case 'npc': return 'View NPC'
    case 'location': return 'View Location'
    case 'region': return 'View Region'
    case 'item': return 'View Item'
    case 'map': return 'View Map'
    default: return 'Go to'
  }
}

interface MapCanvasProps {
  map: MapFile
}

export function MapCanvas({ map }: MapCanvasProps) {
  const cellSize = map.cellSize ?? 48
  const navigate = useNavigate()

  const { views, setView } = useMapStore()
  const hasSavedView = map.slug in views

  // When no saved view, compute fit-to-viewport on first render using a ref sentinel
  const initialViewComputed = useRef(false)
  const offsetRef = useRef(views[map.slug]?.offset ?? { x: 0, y: 0 })
  const zoomRef = useRef(views[map.slug]?.zoom ?? 1)
  const [, forceUpdate] = useState(0)
  const rerender = useCallback(() => forceUpdate(n => n + 1), [])

  const [layerVisibility, setLayerVisibility] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(map.layers.map(l => [l.id, l.visible !== false]))
  )
  const [selectedEntity, setSelectedEntity] = useState<MapEntity | null>(null)

  const canvasRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ startX: number; startY: number; startOffset: { x: number; y: number }; moved: boolean } | null>(null)
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map())
  const lastPinchDist = useRef<number | null>(null)

  // Compute fit-to-viewport initial view if no saved view exists
  useEffect(() => {
    if (hasSavedView || initialViewComputed.current) return
    initialViewComputed.current = true
    const el = canvasRef.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    const mapW = map.width * cellSize
    const mapH = map.height * cellSize
    const padding = 24
    const zoom = Math.min((width - padding * 2) / mapW, (height - padding * 2) / mapH, MAX_ZOOM)
    const clampedZoom = Math.max(zoom, MIN_ZOOM)
    const offset = {
      x: (width - mapW * clampedZoom) / 2,
      y: (height - mapH * clampedZoom) / 2,
    }
    offsetRef.current = offset
    zoomRef.current = clampedZoom
    rerender()
  }, [hasSavedView, map.width, map.height, cellSize, rerender])

  // Persist view on unmount and on change
  useEffect(() => {
    return () => {
      setView(map.slug, { offset: offsetRef.current, zoom: zoomRef.current })
    }
  }, [map.slug, setView])

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const oldZoom = zoomRef.current
      const newZoom = clamp(oldZoom * (1 - e.deltaY * ZOOM_SPEED), MIN_ZOOM, MAX_ZOOM)
      const ratio = newZoom / oldZoom
      const offset = offsetRef.current
      offsetRef.current = {
        x: e.clientX - (e.clientX - offset.x) * ratio,
        y: e.clientY - (e.clientY - offset.y) * ratio,
      }
      zoomRef.current = newZoom
      setView(map.slug, { offset: offsetRef.current, zoom: newZoom })
      rerender()
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [map.slug, setView, rerender])

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Right-click or two-finger touch → pan/zoom
    if (e.button === 2 || e.pointerType === 'touch') {
      e.currentTarget.setPointerCapture(e.pointerId)
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (pointers.current.size === 1) {
        drag.current = {
          startX: e.clientX,
          startY: e.clientY,
          startOffset: { ...offsetRef.current },
          moved: false,
        }
        lastPinchDist.current = null
      }
    }
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    const pts = Array.from(pointers.current.values())

    if (pts.length === 2) {
      // Pinch zoom
      const [a, b] = pts
      const dist = Math.hypot(b.x - a.x, b.y - a.y)
      if (lastPinchDist.current !== null) {
        const ratio = dist / lastPinchDist.current
        const midX = (a.x + b.x) / 2
        const midY = (a.y + b.y) / 2
        const oldZoom = zoomRef.current
        const newZoom = clamp(oldZoom * ratio, MIN_ZOOM, MAX_ZOOM)
        const zoomRatio = newZoom / oldZoom
        const offset = offsetRef.current
        offsetRef.current = {
          x: midX - (midX - offset.x) * zoomRatio,
          y: midY - (midY - offset.y) * zoomRatio,
        }
        zoomRef.current = newZoom
        setView(map.slug, { offset: offsetRef.current, zoom: newZoom })
        rerender()
      }
      lastPinchDist.current = dist
      drag.current = null
    } else if (pts.length === 1 && drag.current) {
      // Pan
      const dx = e.clientX - drag.current.startX
      const dy = e.clientY - drag.current.startY
      if (Math.hypot(dx, dy) > DRAG_THRESHOLD) drag.current.moved = true
      offsetRef.current = {
        x: drag.current.startOffset.x + dx,
        y: drag.current.startOffset.y + dy,
      }
      setView(map.slug, { offset: offsetRef.current, zoom: zoomRef.current })
      rerender()
    }
  }, [map.slug, setView, rerender])

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size === 0) {
      drag.current = null
      lastPinchDist.current = null
    }
  }, [])

  const handleCanvasClick = useCallback(() => {
    if (drag.current?.moved) return
    setSelectedEntity(null)
  }, [])

  const offset = offsetRef.current
  const zoom = zoomRef.current

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-950">
      {/* Zoomable canvas */}
      <div
        ref={canvasRef}
        className="absolute inset-0 select-none"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: `${cellSize * zoom}px ${cellSize * zoom}px`,
          backgroundPosition: `${offset.x}px ${offset.y}px`,
          touchAction: 'none',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onContextMenu={(e) => e.preventDefault()}
        onClick={handleCanvasClick}
      >
        {/* Inner transformed world */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transformOrigin: '0 0',
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            width: map.width * cellSize,
            height: map.height * cellSize,
          }}
        >
          {/* Map border */}
          <div
            className="absolute inset-0 border border-gray-700 pointer-events-none"
          />

          {/* Layers */}
          {map.layers.map((layer) => {
            if (!layerVisibility[layer.id]) return null
            return (
              <div key={layer.id} className="absolute inset-0">
                {layer.entities.map((entity, i) => (
                  <MapEntityShape
                    key={i}
                    entity={entity}
                    cellSize={cellSize}
                    selected={selectedEntity === entity}
                    onClick={() => setSelectedEntity(entity)}
                  />
                ))}
              </div>
            )
          })}

          {/* Icon overlays — pointer-events: none so they don't block entity clicks */}
          {map.layers.map((layer) => {
            if (!layerVisibility[layer.id]) return null
            return layer.entities.map((entity, i) => {
              if (!entity.icon) return null
              const xs = entity.cells.map(([x]) => x)
              const ys = entity.cells.map(([, y]) => y)
              const cx = (Math.min(...xs) + Math.max(...xs) + 1) / 2 * cellSize
              const cy = (Math.min(...ys) + Math.max(...ys) + 1) / 2 * cellSize
              return (
                <div
                  key={`icon-${layer.id}-${i}`}
                  className="absolute pointer-events-none flex items-center justify-center"
                  style={{
                    left: cx - cellSize * 0.4,
                    top: cy - cellSize * 0.4,
                    width: cellSize * 0.8,
                    height: cellSize * 0.8,
                    fontSize: cellSize * 0.5,
                    lineHeight: 1,
                  }}
                >
                  {entity.icon}
                </div>
              )
            })
          })}
        </div>
      </div>

      {/* Layer toggle panel — fixed top-right, outside transform */}
      <div className="absolute top-3 right-3 z-10 bg-gray-900/90 border border-gray-700 rounded-lg p-2 flex flex-col gap-1 min-w-[120px]">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1 px-1">Layers</p>
        {map.layers.map((layer) => (
          <label key={layer.id} className="flex items-center gap-2 cursor-pointer px-1 py-0.5 rounded hover:bg-gray-800">
            <input
              type="checkbox"
              checked={layerVisibility[layer.id] ?? true}
              onChange={(e) =>
                setLayerVisibility(v => ({ ...v, [layer.id]: e.target.checked }))
              }
              className="accent-amber-400"
            />
            <span className="text-sm text-gray-300">{layer.name}</span>
          </label>
        ))}
      </div>

      {/* Entity overlay — fixed to viewport, slides up from bottom */}
      {selectedEntity && (
        <>
          {/* Backdrop tap-to-close */}
          <div
            className="absolute inset-0 z-20"
            onClick={() => setSelectedEntity(null)}
          />
          <div className="absolute bottom-0 left-0 right-0 z-30 bg-gray-900 border-t border-gray-700 rounded-t-xl max-h-[60vh] overflow-y-auto animate-slide-up">
            {/* Header */}
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                {selectedEntity.icon && (
                  <span className="text-xl">{selectedEntity.icon}</span>
                )}
                <h2 className="text-base font-semibold text-white">{selectedEntity.label}</h2>
              </div>
              <button
                onClick={() => setSelectedEntity(null)}
                className="text-gray-500 hover:text-gray-300 text-xl leading-none px-1"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="px-4 py-3">
              {selectedEntity.content ? (
                <MarkdownBody>{selectedEntity.content}</MarkdownBody>
              ) : (
                <p className="text-gray-500 text-sm italic">No notes for this location.</p>
              )}
              {selectedEntity.link && (
                <button
                  onClick={() => navigate(linkTarget(selectedEntity.link!))}
                  className="mt-3 text-sm text-amber-400 hover:text-amber-300 font-medium"
                >
                  {linkLabel(selectedEntity.link)} →
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
