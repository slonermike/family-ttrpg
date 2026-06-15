import type { Location } from '../types/location'

const modules = import.meta.glob<{ default: Location }>('/world/locations/*/index.md', { eager: true })

function slugFromPath(path: string): string {
  const parts = path.split('/')
  return parts[parts.length - 2]
}

export const locations: Location[] = Object.entries(modules)
  .map(([path, mod]) => ({
    ...mod.default,
    slug: slugFromPath(path),
    scenes: mod.default.scenes ?? [],
  }))
  .sort((a, b) => {
    // visited locations first, then alpha
    const aV = a.visited_session ?? 999
    const bV = b.visited_session ?? 999
    return aV !== bV ? aV - bV : a.name.localeCompare(b.name)
  })
