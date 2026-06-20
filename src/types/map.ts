export interface MapEntity {
  cells: [number, number][]
  label: string
  icon?: string
  color?: string
  link?: string     // "location:slug" | "npc:slug" | "region:slug" | "item:slug"
  content?: string  // markdown rendered in the click overlay
}

export interface MapLayer {
  id: string
  name: string
  visible?: boolean
  entities: MapEntity[]
}

export interface MapFile {
  slug: string
  name: string
  description: string
  width: number
  height: number
  cellSize?: number
  layers: MapLayer[]
}
