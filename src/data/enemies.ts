import type { Enemy } from '../types/enemy'

const modules = import.meta.glob<{ default: Enemy }>('/world/enemies/*.md', { eager: true })

function slugFromPath(path: string): string {
  const filename = path.split('/').pop() ?? ''
  return filename.replace(/^enemy-/, '').replace(/\.md$/, '')
}

export const enemies: Enemy[] = Object.entries(modules).map(([path, mod]) => ({
  ...mod.default,
  slug: slugFromPath(path),
}))

export const enemyMap: Record<string, Enemy> = Object.fromEntries(
  enemies.map((e) => [e.slug, e])
)
