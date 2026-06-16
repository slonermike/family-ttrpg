export interface Enemy {
  slug: string
  name: string
  tier: 'l1' | 'l2' | 'boss'
  location?: string | string[]
  hp: number
  armor: boolean
  defense_threshold: number
  attack_threshold: number
  resistances: string[]
  reinforcements: boolean
  loot_drop: string
  unique_items: string[]
  description: string
}

export interface EncounterEnemy {
  id: string
  base: Enemy
  label: string
  currentHp: number
  armorIntact: boolean
  notes: string
}
