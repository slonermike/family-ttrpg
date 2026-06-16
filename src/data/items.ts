import type { Item } from '../types/item'

const modules = import.meta.glob<{ default: Item }>('/world/items/item-*.md', { eager: true })

function slugFromPath(path: string): string {
  const filename = path.split('/').pop() ?? ''
  return filename.replace(/^item-/, '').replace(/\.md$/, '')
}

export const items: Item[] = Object.entries(modules).map(([path, mod]) => ({
  ...mod.default,
  slug: slugFromPath(path),
}))

export const itemMap: Record<string, Item> = Object.fromEntries(
  items.map((i) => [i.slug, i])
)
