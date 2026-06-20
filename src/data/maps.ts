import type { MapFile } from '../types/map'

const modules = import.meta.glob('/world/maps/*.md', { eager: true })

export const maps: MapFile[] = Object.entries(modules).map(([path, mod]) => {
  const slug = path.split('/').pop()!.replace('.md', '')
  return { ...(mod as { default: Omit<MapFile, 'slug'> }).default, slug }
})

export const mapMap: Record<string, MapFile> = Object.fromEntries(maps.map(m => [m.slug, m]))
