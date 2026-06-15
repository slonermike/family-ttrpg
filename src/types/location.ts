export type SceneType = 'explorable' | 'event' | 'combat' | 'approach'

export interface PlannedEnemy {
  slug: string
  count: number
}

export interface PlannedEncounter {
  name: string
  enemies: PlannedEnemy[]
}

export interface Scene {
  name: string
  type: SceneType
  tagline: string
  description: string
  gm_notes?: string
  npcs: string[]
  encounters?: PlannedEncounter[]
}

export interface Location {
  name: string
  type: string
  status: string
  visited_session?: number
  region: string
  tagline: string
  description: string
  scenes: Scene[]
  slug: string
}
