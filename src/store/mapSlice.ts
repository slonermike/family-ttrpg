import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MapViewState {
  offset: { x: number; y: number }
  zoom: number
}

const DEFAULT_VIEW: MapViewState = { offset: { x: 0, y: 0 }, zoom: 1 }

interface MapStore {
  views: Record<string, MapViewState>
  setView: (slug: string, state: MapViewState) => void
}

export const useMapStore = create<MapStore>()(
  persist(
    (set) => ({
      views: {},
      setView: (slug, state) =>
        set((s) => ({ views: { ...s.views, [slug]: state } })),
    }),
    { name: 'ttrpg-map-views' }
  )
)

export const selectMapView = (slug: string) => (s: MapStore) =>
  s.views[slug] ?? DEFAULT_VIEW

export { DEFAULT_VIEW }
