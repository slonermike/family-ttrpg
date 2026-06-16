import type { Npc } from '../types/npc'

const modules = import.meta.glob<{ default: Npc }>('/world/npcs/*.md', { eager: true })

function slugFromPath(path: string): string {
  const filename = path.split('/').pop() ?? ''
  return filename.replace(/^npc-/, '').replace(/\.md$/, '')
}

function toNpc(path: string, mod: { default: Npc }): Npc {
  return { ...mod.default, slug: slugFromPath(path) }
}

export const npcMap: Record<string, Npc> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [slugFromPath(path), toNpc(path, mod)])
)
