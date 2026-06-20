export interface Item {
  slug: string
  name: string
  type: 'consumable' | 'weapon' | 'armor' | 'legendary' | 'story' | 'tool-of-justice'
  category?: string
  tagline: string
  effect: string
  consumable: boolean
  description: string
}

export interface PrintItem {
  id: string
  base: Item
  qty: number
}
