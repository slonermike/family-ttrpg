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
  description: string
  scenes: Scene[]
  slug: string
}
