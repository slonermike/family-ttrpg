import type { Enemy } from '../types/enemy'

const modules = import.meta.glob<{ default: Enemy }>('/world/enemies/*.md', { eager: true })

export const enemies: Enemy[] = Object.values(modules).map((m) => m.default)
