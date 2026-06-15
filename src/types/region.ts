import type { Scene } from './location'

export interface Region {
  name: string
  tagline: string
  description: string
  scenes: Scene[]
  slug: string
}
