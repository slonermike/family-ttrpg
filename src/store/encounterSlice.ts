import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import type { Enemy, EncounterEnemy } from '../types/enemy'

interface EncounterState {
  encounter: EncounterEnemy[]
}

interface EncounterActions {
  addEnemy: (enemy: Enemy) => void
  updateEntry: (id: string, updated: EncounterEnemy) => void
  duplicateEntry: (id: string) => void
  removeEntry: (id: string) => void
}

export const useEncounterStore = create<EncounterState & EncounterActions>()((set) => ({
  encounter: [],

  addEnemy: (enemy) =>
    set((s) => {
      const sameBase = s.encounter.filter((e) => e.base.name === enemy.name)
      const label = sameBase.length > 0 ? `${enemy.name} ${sameBase.length + 1}` : enemy.name
      return {
        encounter: [
          ...s.encounter,
          {
            id: crypto.randomUUID(),
            base: enemy,
            label,
            currentHp: enemy.hp,
            armorIntact: enemy.armor,
            notes: '',
          },
        ],
      }
    }),

  updateEntry: (id, updated) =>
    set((s) => ({ encounter: s.encounter.map((e) => (e.id === id ? updated : e)) })),

  duplicateEntry: (id) =>
    set((s) => {
      const original = s.encounter.find((e) => e.id === id)
      if (!original) return s
      const sameBase = s.encounter.filter((e) => e.base.name === original.base.name)
      const newEntry: EncounterEnemy = {
        id: crypto.randomUUID(),
        base: original.base,
        label: `${original.base.name} ${sameBase.length + 1}`,
        currentHp: original.base.hp,
        armorIntact: original.base.armor,
        notes: '',
      }
      const idx = s.encounter.findIndex((e) => e.id === id)
      const next = [...s.encounter]
      next.splice(idx + 1, 0, newEntry)
      return { encounter: next }
    }),

  removeEntry: (id) =>
    set((s) => ({ encounter: s.encounter.filter((e) => e.id !== id) })),
}))

export const selectEncounter = (s: EncounterState & EncounterActions) => s.encounter
export const selectAliveCount = (s: EncounterState & EncounterActions) =>
  s.encounter.filter((e) => e.currentHp > 0).length

export const useEncounter = () => useEncounterStore(useShallow(selectEncounter))
