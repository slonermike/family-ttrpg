import type { Region } from '../types/region'

const modules = import.meta.glob<{ default: Region }>('/world/regions/*/index.md', { eager: true })

function slugFromPath(path: string): string {
  const parts = path.split('/')
  return parts[parts.length - 2]
}

export const regions: Region[] = Object.entries(modules)
  .map(([path, mod]) => ({
    ...mod.default,
    slug: slugFromPath(path),
    scenes: mod.default.scenes ?? [],
  }))
  .sort((a, b) => a.name.localeCompare(b.name))
